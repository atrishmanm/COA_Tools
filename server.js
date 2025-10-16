/* ============================================
   COA_Tools Backend Server
   Node.js + Express Backend for Educational Tools
   ============================================ */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// Data storage paths
const DATA_DIR = path.join(__dirname, 'data');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');
const SAVED_STATES_FILE = path.join(DATA_DIR, 'saved_states.json');

// Initialize data directory and files
async function initializeDataStore() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    // Initialize files if they don't exist
    const files = [
      { path: SESSIONS_FILE, default: {} },
      { path: ANALYTICS_FILE, default: { totalVisits: 0, toolUsage: {}, conversions: [] } },
      { path: SAVED_STATES_FILE, default: {} }
    ];
    
    for (const file of files) {
      try {
        await fs.access(file.path);
      } catch {
        await fs.writeFile(file.path, JSON.stringify(file.default, null, 2));
      }
    }
    
    console.log('✅ Data store initialized');
  } catch (error) {
    console.error('❌ Error initializing data store:', error);
  }
}

// Helper function to read JSON file
async function readJSON(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

// Helper function to write JSON file
async function writeJSON(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

// Generate unique session ID
function generateSessionId() {
  return crypto.randomBytes(16).toString('hex');
}

/* ============================================
   API ENDPOINTS
   ============================================ */

// Home route - Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    message: 'COA_Tools Backend is running',
    timestamp: new Date().toISOString()
  });
});

/* ============================================
   SESSION MANAGEMENT
   ============================================ */

// Create new session
app.post('/api/session/create', async (req, res) => {
  const sessionId = generateSessionId();
  const sessions = await readJSON(SESSIONS_FILE) || {};
  
  sessions[sessionId] = {
    id: sessionId,
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    stackHistory: [],
    operationCount: 0,
    toolsUsed: []
  };
  
  await writeJSON(SESSIONS_FILE, sessions);
  
  res.json({ 
    success: true, 
    sessionId,
    message: 'Session created successfully'
  });
});

// Get session data
app.get('/api/session/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  const sessions = await readJSON(SESSIONS_FILE) || {};
  
  if (!sessions[sessionId]) {
    return res.status(404).json({ 
      success: false, 
      message: 'Session not found' 
    });
  }
  
  res.json({ 
    success: true, 
    session: sessions[sessionId] 
  });
});

// Update session activity
app.post('/api/session/:sessionId/activity', async (req, res) => {
  const { sessionId } = req.params;
  const { tool, operation } = req.body;
  
  const sessions = await readJSON(SESSIONS_FILE) || {};
  
  if (!sessions[sessionId]) {
    return res.status(404).json({ 
      success: false, 
      message: 'Session not found' 
    });
  }
  
  sessions[sessionId].lastActive = new Date().toISOString();
  sessions[sessionId].operationCount++;
  
  if (tool && !sessions[sessionId].toolsUsed.includes(tool)) {
    sessions[sessionId].toolsUsed.push(tool);
  }
  
  if (operation) {
    sessions[sessionId].stackHistory.push({
      timestamp: new Date().toISOString(),
      operation
    });
  }
  
  await writeJSON(SESSIONS_FILE, sessions);
  
  res.json({ 
    success: true, 
    message: 'Session updated' 
  });
});

/* ============================================
   SAVE/LOAD CALCULATOR STATES
   ============================================ */

// Save calculator state
app.post('/api/state/save', async (req, res) => {
  const { name, state } = req.body;
  
  if (!name || !state) {
    return res.status(400).json({ 
      success: false, 
      message: 'Name and state are required' 
    });
  }
  
  const savedStates = await readJSON(SAVED_STATES_FILE) || {};
  const stateId = generateSessionId();
  
  savedStates[stateId] = {
    id: stateId,
    name,
    state,
    createdAt: new Date().toISOString(),
    shareUrl: `${req.protocol}://${req.get('host')}/api/state/load/${stateId}`
  };
  
  await writeJSON(SAVED_STATES_FILE, savedStates);
  
  res.json({ 
    success: true, 
    stateId,
    shareUrl: savedStates[stateId].shareUrl,
    message: 'State saved successfully' 
  });
});

// Load calculator state
app.get('/api/state/load/:stateId', async (req, res) => {
  const { stateId } = req.params;
  const savedStates = await readJSON(SAVED_STATES_FILE) || {};
  
  if (!savedStates[stateId]) {
    return res.status(404).json({ 
      success: false, 
      message: 'State not found' 
    });
  }
  
  res.json({ 
    success: true, 
    state: savedStates[stateId] 
  });
});

// List all saved states
app.get('/api/state/list', async (req, res) => {
  const savedStates = await readJSON(SAVED_STATES_FILE) || {};
  const stateList = Object.values(savedStates).map(s => ({
    id: s.id,
    name: s.name,
    createdAt: s.createdAt,
    shareUrl: s.shareUrl
  }));
  
  res.json({ 
    success: true, 
    states: stateList 
  });
});

// Delete saved state
app.delete('/api/state/:stateId', async (req, res) => {
  const { stateId } = req.params;
  const savedStates = await readJSON(SAVED_STATES_FILE) || {};
  
  if (!savedStates[stateId]) {
    return res.status(404).json({ 
      success: false, 
      message: 'State not found' 
    });
  }
  
  delete savedStates[stateId];
  await writeJSON(SAVED_STATES_FILE, savedStates);
  
  res.json({ 
    success: true, 
    message: 'State deleted successfully' 
  });
});

/* ============================================
   ANALYTICS & STATISTICS
   ============================================ */

// Track tool usage
app.post('/api/analytics/track', async (req, res) => {
  const { tool, action, data } = req.body;
  
  const analytics = await readJSON(ANALYTICS_FILE) || {
    totalVisits: 0,
    toolUsage: {},
    conversions: []
  };
  
  analytics.totalVisits++;
  
  if (tool) {
    if (!analytics.toolUsage[tool]) {
      analytics.toolUsage[tool] = 0;
    }
    analytics.toolUsage[tool]++;
  }
  
  if (action === 'conversion' && data) {
    analytics.conversions.push({
      timestamp: new Date().toISOString(),
      tool,
      ...data
    });
    
    // Keep only last 1000 conversions
    if (analytics.conversions.length > 1000) {
      analytics.conversions = analytics.conversions.slice(-1000);
    }
  }
  
  await writeJSON(ANALYTICS_FILE, analytics);
  
  res.json({ 
    success: true, 
    message: 'Analytics tracked' 
  });
});

// Get analytics summary
app.get('/api/analytics', async (req, res) => {
  const analytics = await readJSON(ANALYTICS_FILE) || {
    totalVisits: 0,
    toolUsage: {},
    conversions: []
  };
  
  res.json({ 
    success: true, 
    analytics: {
      totalVisits: analytics.totalVisits,
      toolUsage: analytics.toolUsage,
      recentConversions: analytics.conversions.slice(-10),
      popularTools: Object.entries(analytics.toolUsage)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([tool, count]) => ({ tool, count }))
    }
  });
});

/* ============================================
   NUMBER SYSTEM CONVERSIONS API
   ============================================ */

// Convert number between bases
app.post('/api/convert', (req, res) => {
  const { number, fromBase, toBase } = req.body;
  
  if (!number || !fromBase || !toBase) {
    return res.status(400).json({ 
      success: false, 
      message: 'Number, fromBase, and toBase are required' 
    });
  }
  
  try {
    const decimalValue = parseInt(number, fromBase);
    if (isNaN(decimalValue)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid number for given base' 
      });
    }
    
    const result = decimalValue.toString(toBase).toUpperCase();
    
    res.json({ 
      success: true, 
      result,
      decimal: decimalValue,
      steps: {
        input: number,
        fromBase,
        toBase,
        decimalIntermediate: decimalValue,
        finalResult: result
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Conversion error',
      error: error.message 
    });
  }
});

// Binary arithmetic operations
app.post('/api/binary/arithmetic', (req, res) => {
  const { operand1, operand2, operation } = req.body;
  
  if (!operand1 || !operand2 || !operation) {
    return res.status(400).json({ 
      success: false, 
      message: 'Operand1, operand2, and operation are required' 
    });
  }
  
  try {
    const num1 = parseInt(operand1, 2);
    const num2 = parseInt(operand2, 2);
    
    if (isNaN(num1) || isNaN(num2)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid binary numbers' 
      });
    }
    
    let result;
    switch (operation) {
      case 'add':
        result = num1 + num2;
        break;
      case 'subtract':
        result = num1 - num2;
        break;
      case 'multiply':
        result = num1 * num2;
        break;
      case 'divide':
        result = Math.floor(num1 / num2);
        break;
      default:
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid operation' 
        });
    }
    
    res.json({ 
      success: true, 
      result: result.toString(2),
      decimal: result,
      operand1Decimal: num1,
      operand2Decimal: num2
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Calculation error',
      error: error.message 
    });
  }
});

/* ============================================
   ASSEMBLY CODE SHARING
   ============================================ */

// Save assembly code
app.post('/api/assembly/save', async (req, res) => {
  const { code, description } = req.body;
  
  if (!code) {
    return res.status(400).json({ 
      success: false, 
      message: 'Assembly code is required' 
    });
  }
  
  const codeId = generateSessionId();
  const assemblyFile = path.join(DATA_DIR, `assembly_${codeId}.txt`);
  
  try {
    await fs.writeFile(assemblyFile, code);
    
    const metadata = {
      id: codeId,
      description: description || 'Untitled',
      createdAt: new Date().toISOString(),
      shareUrl: `${req.protocol}://${req.get('host')}/api/assembly/${codeId}`
    };
    
    res.json({ 
      success: true, 
      ...metadata
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save assembly code',
      error: error.message 
    });
  }
});

// Load assembly code
app.get('/api/assembly/:codeId', async (req, res) => {
  const { codeId } = req.params;
  const assemblyFile = path.join(DATA_DIR, `assembly_${codeId}.txt`);
  
  try {
    const code = await fs.readFile(assemblyFile, 'utf8');
    res.json({ 
      success: true, 
      code 
    });
  } catch (error) {
    res.status(404).json({ 
      success: false, 
      message: 'Assembly code not found' 
    });
  }
});

/* ============================================
   ERROR HANDLING
   ============================================ */

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'API endpoint not found' 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: err.message 
  });
});

/* ============================================
   SERVER STARTUP
   ============================================ */

async function startServer() {
  await initializeDataStore();
  
  app.listen(PORT, () => {
    console.log('\n' + '='.repeat(50));
    console.log('🚀 COA_Tools Backend Server Started');
    console.log('='.repeat(50));
    console.log(`📡 Server running on: http://localhost:${PORT}`);
    console.log(`🏠 Frontend: http://localhost:${PORT}/`);
    console.log(`❤️  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`📊 Analytics: http://localhost:${PORT}/api/analytics`);
    console.log('='.repeat(50) + '\n');
  });
}

// Start the server
startServer().catch(console.error);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n🛑 SIGINT received, shutting down gracefully...');
  process.exit(0);
});
