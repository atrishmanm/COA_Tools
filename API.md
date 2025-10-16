# COA_Tools Backend API

Backend server for Computer Organization & Architecture Tools with session management, state persistence, and analytics.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the server
npm start

# For development (with auto-reload)
npm run dev
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Health Check
- **GET** `/api/health` - Check if server is running

### Session Management
- **POST** `/api/session/create` - Create new user session
- **GET** `/api/session/:sessionId` - Get session data
- **POST** `/api/session/:sessionId/activity` - Update session activity

### Save/Load States
- **POST** `/api/state/save` - Save calculator state
  ```json
  {
    "name": "My Calculation",
    "state": {
      "stack": [1, 2, 3],
      "registers": { "AX": 5, "BX": 10 }
    }
  }
  ```
- **GET** `/api/state/load/:stateId` - Load saved state
- **GET** `/api/state/list` - List all saved states
- **DELETE** `/api/state/:stateId` - Delete saved state

### Analytics
- **POST** `/api/analytics/track` - Track tool usage
  ```json
  {
    "tool": "8086-calculator",
    "action": "conversion",
    "data": { "operation": "add" }
  }
  ```
- **GET** `/api/analytics` - Get analytics summary

### Number Conversions
- **POST** `/api/convert` - Convert number between bases
  ```json
  {
    "number": "1010",
    "fromBase": 2,
    "toBase": 16
  }
  ```

### Binary Arithmetic
- **POST** `/api/binary/arithmetic` - Perform binary operations
  ```json
  {
    "operand1": "1010",
    "operand2": "0101",
    "operation": "add"
  }
  ```
  Operations: `add`, `subtract`, `multiply`, `divide`

### Assembly Code Sharing
- **POST** `/api/assembly/save` - Save assembly code
  ```json
  {
    "code": "MOV AX, 5\nPUSH AX",
    "description": "My Assembly Code"
  }
  ```
- **GET** `/api/assembly/:codeId` - Load assembly code

## 📂 Data Storage

All data is stored in the `data/` directory:
- `sessions.json` - User sessions
- `analytics.json` - Usage statistics
- `saved_states.json` - Saved calculator states
- `assembly_*.txt` - Shared assembly code files

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 3000)

Create a `.env` file:
```env
PORT=3000
```

## 🌐 Frontend Integration

### Example: Save Calculator State
```javascript
async function saveState() {
  const response = await fetch('http://localhost:3000/api/state/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'My Calculation',
      state: {
        stack: currentStack,
        registers: currentRegisters
      }
    })
  });
  
  const data = await response.json();
  console.log('Share URL:', data.shareUrl);
}
```

### Example: Track Analytics
```javascript
async function trackUsage() {
  await fetch('http://localhost:3000/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tool: '8086-calculator',
      action: 'operation',
      data: { operation: 'push' }
    })
  });
}
```

### Example: Load Saved State
```javascript
async function loadState(stateId) {
  const response = await fetch(`http://localhost:3000/api/state/load/${stateId}`);
  const data = await response.json();
  
  if (data.success) {
    restoreState(data.state.state);
  }
}
```

## 🔒 Security Notes

This is an educational backend. For production use:
- Add authentication (JWT, OAuth)
- Implement rate limiting
- Add input validation middleware
- Use environment variables for sensitive data
- Enable HTTPS
- Add database instead of JSON files
- Implement user permissions

## 📊 Features

✅ Session Management  
✅ State Persistence  
✅ Analytics Tracking  
✅ Number System Conversions API  
✅ Binary Arithmetic API  
✅ Assembly Code Sharing  
✅ CORS Enabled  
✅ Error Handling  
✅ File-based Storage  

## 🛠️ Development

### File Structure
```
COA_Tools/
├── server.js           # Main server file
├── package.json        # Dependencies
├── data/              # Data storage directory
│   ├── sessions.json
│   ├── analytics.json
│   └── saved_states.json
└── API.md             # This file
```

### Adding New Endpoints

```javascript
// In server.js
app.post('/api/my-endpoint', async (req, res) => {
  try {
    // Your logic here
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

## 📝 License

MIT License - See LICENSE file for details

## 👤 Author

Atrishman Mukherjee  
GitHub: [@atrishmanm](https://github.com/atrishmanm)

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.
