# 🚀 Quick Start - Backend in 5 Minutes

## Prerequisites
✅ Node.js installed ([Download](https://nodejs.org/))

## Start Server (Choose One)

### Option 1: Easy Start (Windows)
```
Double-click: start-server.bat
```

### Option 2: Command Line
```bash
npm install
npm start
```

## Connect Frontend
Add this line to `index.html` before `</body>`:
```html
<script src="api-client.js"></script>
```

## Test
Open: `http://localhost:3000` or `test-backend.html`

## API Endpoints (localhost:3000/api)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Check status |
| `/session/create` | POST | New session |
| `/state/save` | POST | Save calculator state |
| `/state/load/:id` | GET | Load saved state |
| `/state/list` | GET | List all states |
| `/analytics` | GET | Get statistics |
| `/convert` | POST | Number conversion |
| `/binary/arithmetic` | POST | Binary math |
| `/assembly/save` | POST | Share assembly code |
| `/assembly/:id` | GET | Load assembly |

## Example: Save State

```javascript
// Request
POST /api/state/save
{
  "name": "My Calculation",
  "state": { "stack": [1, 2, 3] }
}

// Response
{
  "success": true,
  "stateId": "abc123...",
  "shareUrl": "http://localhost:3000/api/state/load/abc123..."
}
```

## Example: Number Conversion

```javascript
// Request
POST /api/convert
{
  "number": "1010",
  "fromBase": 2,
  "toBase": 16
}

// Response
{
  "success": true,
  "result": "A",
  "decimal": 10
}
```

## Troubleshooting

**Port in use?**
```bash
# Change PORT in server.js
const PORT = 3001;
```

**Dependencies error?**
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

**CORS error?**
```javascript
// Frontend must use http://localhost:3000
// NOT file:///
```

## Files Created

- ✅ `server.js` - Backend server
- ✅ `api-client.js` - Frontend integration
- ✅ `package.json` - Dependencies
- ✅ `start-server.bat` - Windows launcher
- ✅ `test-backend.html` - Test interface
- ✅ `API.md` - Full API docs
- ✅ `BACKEND_SETUP.md` - Setup guide
- ✅ `BACKEND_COMPLETE.md` - Summary

## New Features Added

💾 **Save/Load** - Persist calculator states  
📊 **Analytics** - Track usage statistics  
🔗 **Sharing** - Share states and assembly code  
🔄 **Sessions** - Track user sessions  
🌐 **API** - Server-side conversions  

## Stop Server
Press `Ctrl+C` in terminal

## Need Help?
- Check `BACKEND_SETUP.md` for detailed guide
- Check `API.md` for API documentation
- Test with `test-backend.html`

---
**Made with ❤️ for COA_Tools**
