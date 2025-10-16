/* ============================================
   COA_Tools API Client
   Frontend integration with backend server
   ============================================ */

// Configuration
const API_BASE_URL = 'http://localhost:3000/api';
let currentSessionId = null;

// Initialize session on page load
async function initializeSession() {
  try {
    const response = await fetch(`${API_BASE_URL}/session/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await response.json();
    
    if (data.success) {
      currentSessionId = data.sessionId;
      console.log('✅ Session created:', currentSessionId);
      
      // Store in localStorage
      localStorage.setItem('coa_session_id', currentSessionId);
    }
  } catch (error) {
    console.warn('⚠️ Backend not available, running in offline mode');
  }
}

// Track tool usage
async function trackToolUsage(tool, action = 'use', data = {}) {
  if (!currentSessionId) return;
  
  try {
    // Track in session
    await fetch(`${API_BASE_URL}/session/${currentSessionId}/activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tool, operation: action })
    });
    
    // Track in analytics
    await fetch(`${API_BASE_URL}/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tool, action, data })
    });
  } catch (error) {
    console.warn('Failed to track usage:', error);
  }
}

// Save calculator state
async function saveCalculatorState(name, state) {
  try {
    const response = await fetch(`${API_BASE_URL}/state/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, state })
    });
    
    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        stateId: data.stateId,
        shareUrl: data.shareUrl,
        message: 'State saved! Share URL copied to clipboard.'
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to save state. Backend may be offline.'
    };
  }
}

// Load calculator state
async function loadCalculatorState(stateId) {
  try {
    const response = await fetch(`${API_BASE_URL}/state/load/${stateId}`);
    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        state: data.state.state,
        name: data.state.name
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to load state'
    };
  }
}

// List all saved states
async function listSavedStates() {
  try {
    const response = await fetch(`${API_BASE_URL}/state/list`);
    const data = await response.json();
    
    if (data.success) {
      return data.states;
    }
  } catch (error) {
    console.warn('Failed to list states:', error);
    return [];
  }
}

// Save assembly code
async function saveAssemblyCode(code, description = 'Untitled') {
  try {
    const response = await fetch(`${API_BASE_URL}/assembly/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, description })
    });
    
    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        codeId: data.id,
        shareUrl: data.shareUrl,
        message: 'Assembly code saved!'
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to save assembly code'
    };
  }
}

// Load assembly code
async function loadAssemblyCode(codeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/assembly/${codeId}`);
    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        code: data.code
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to load assembly code'
    };
  }
}

// Get analytics
async function getAnalytics() {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics`);
    const data = await response.json();
    
    if (data.success) {
      return data.analytics;
    }
  } catch (error) {
    console.warn('Failed to get analytics:', error);
    return null;
  }
}

// Convert number using backend
async function serverConvert(number, fromBase, toBase) {
  try {
    const response = await fetch(`${API_BASE_URL}/convert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number, fromBase, toBase })
    });
    
    const data = await response.json();
    
    if (data.success) {
      return data;
    }
  } catch (error) {
    console.warn('Backend conversion failed, using client-side');
    return null;
  }
}

// Binary arithmetic using backend
async function serverBinaryArithmetic(operand1, operand2, operation) {
  try {
    const response = await fetch(`${API_BASE_URL}/binary/arithmetic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operand1, operand2, operation })
    });
    
    const data = await response.json();
    
    if (data.success) {
      return data;
    }
  } catch (error) {
    console.warn('Backend arithmetic failed, using client-side');
    return null;
  }
}

/* ============================================
   UI INTEGRATION FUNCTIONS
   ============================================ */

// Add save/load buttons to calculator
function addSaveLoadButtons() {
  const container = document.querySelector('.tool-header') || document.querySelector('body');
  
  if (!container || document.getElementById('save-load-buttons')) return;
  
  const buttonContainer = document.createElement('div');
  buttonContainer.id = 'save-load-buttons';
  buttonContainer.style.cssText = `
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
    flex-wrap: wrap;
  `;
  
  buttonContainer.innerHTML = `
    <button onclick="handleSaveState()" style="padding: 0.6rem 1.2rem; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; font-size: 0.9rem;">
      💾 Save State
    </button>
    <button onclick="handleLoadState()" style="padding: 0.6rem 1.2rem; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; font-size: 0.9rem;">
      📂 Load State
    </button>
    <button onclick="handleSaveAssembly()" style="padding: 0.6rem 1.2rem; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; font-size: 0.9rem;">
      📝 Share Assembly
    </button>
    <button onclick="handleShowAnalytics()" style="padding: 0.6rem 1.2rem; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; font-size: 0.9rem;">
      📊 Analytics
    </button>
  `;
  
  container.appendChild(buttonContainer);
}

// Handle save state button click
async function handleSaveState() {
  const name = prompt('Enter a name for this state:', 'My Calculation');
  if (!name) return;
  
  // Get current state from calculator
  const state = {
    stack: typeof stack !== 'undefined' ? stack : [],
    registers: typeof registers !== 'undefined' ? registers : {},
    timestamp: new Date().toISOString()
  };
  
  const result = await saveCalculatorState(name, state);
  
  if (result.success) {
    // Copy share URL to clipboard
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(result.shareUrl);
    }
    alert(`✅ ${result.message}\n\nShare URL: ${result.shareUrl}`);
  } else {
    alert(`❌ ${result.message}`);
  }
}

// Handle load state button click
async function handleLoadState() {
  const states = await listSavedStates();
  
  if (states.length === 0) {
    alert('No saved states found');
    return;
  }
  
  let stateList = 'Select a state to load:\n\n';
  states.forEach((s, i) => {
    stateList += `${i + 1}. ${s.name} (${new Date(s.createdAt).toLocaleString()})\n`;
  });
  
  const choice = prompt(stateList + '\nEnter number or paste state ID:');
  if (!choice) return;
  
  let stateId;
  if (isNaN(choice)) {
    stateId = choice;
  } else {
    const index = parseInt(choice) - 1;
    if (index >= 0 && index < states.length) {
      stateId = states[index].id;
    }
  }
  
  const result = await loadCalculatorState(stateId);
  
  if (result.success) {
    // Restore state to calculator
    if (typeof stack !== 'undefined' && result.state.stack) {
      stack = result.state.stack;
    }
    if (typeof registers !== 'undefined' && result.state.registers) {
      registers = result.state.registers;
    }
    
    // Update UI if functions exist
    if (typeof updateStackDisplay === 'function') updateStackDisplay();
    if (typeof updateRegisters === 'function') updateRegisters();
    
    alert(`✅ Loaded: ${result.name}`);
  } else {
    alert(`❌ ${result.message}`);
  }
}

// Handle save assembly button click
async function handleSaveAssembly() {
  const code = typeof assemblyCodeLines !== 'undefined' 
    ? assemblyCodeLines.join('\n') 
    : prompt('Enter assembly code to share:');
    
  if (!code) return;
  
  const description = prompt('Enter description:', 'My Assembly Code');
  
  const result = await saveAssemblyCode(code, description);
  
  if (result.success) {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(result.shareUrl);
    }
    alert(`✅ ${result.message}\n\nShare URL: ${result.shareUrl}`);
  } else {
    alert(`❌ ${result.message}`);
  }
}

// Handle show analytics button click
async function handleShowAnalytics() {
  const analytics = await getAnalytics();
  
  if (!analytics) {
    alert('Analytics not available');
    return;
  }
  
  let message = '📊 COA Tools Analytics\n\n';
  message += `Total Visits: ${analytics.totalVisits}\n\n`;
  message += 'Most Popular Tools:\n';
  
  analytics.popularTools.forEach((t, i) => {
    message += `${i + 1}. ${t.tool}: ${t.count} uses\n`;
  });
  
  alert(message);
}

/* ============================================
   AUTO-TRACKING INTEGRATION
   ============================================ */

// Auto-track when switching tabs
const originalOpenTab = typeof openTab === 'function' ? openTab : null;
if (originalOpenTab) {
  window.openTab = function(evt, tabName) {
    originalOpenTab(evt, tabName);
    trackToolUsage(tabName, 'open');
  };
}

/* ============================================
   INITIALIZATION
   ============================================ */

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', async () => {
    await initializeSession();
    
    // Add save/load buttons after a short delay
    setTimeout(() => {
      addSaveLoadButtons();
    }, 1000);
  });
} else {
  initializeSession().then(() => {
    setTimeout(() => {
      addSaveLoadButtons();
    }, 1000);
  });
}

// Make functions globally accessible
window.saveCalculatorState = saveCalculatorState;
window.loadCalculatorState = loadCalculatorState;
window.trackToolUsage = trackToolUsage;
window.saveAssemblyCode = saveAssemblyCode;
window.loadAssemblyCode = loadAssemblyCode;
window.getAnalytics = getAnalytics;
window.handleSaveState = handleSaveState;
window.handleLoadState = handleLoadState;
window.handleSaveAssembly = handleSaveAssembly;
window.handleShowAnalytics = handleShowAnalytics;
