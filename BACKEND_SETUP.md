# 🚀 COA_Tools Backend Setup Guide

## Overview

The backend adds powerful features to COA_Tools:
- 💾 **Save/Load States** - Persist calculator states and share them
- 📊 **Analytics** - Track usage statistics and popular tools
- 🔗 **Assembly Sharing** - Share assembly code with unique URLs
- 🔄 **Session Management** - Track user sessions and history
- 🌐 **API Access** - Server-side number conversions and calculations

## Prerequisites

### 1. Install Node.js

**Windows:**
1. Download from [nodejs.org](https://nodejs.org/)
2. Run the installer (choose LTS version)
3. Verify installation:
   ```cmd
   node --version
   npm --version
   ```

**macOS:**
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Fedora
sudo dnf install nodejs npm
```

## Quick Start

### Method 1: Automated Start (Windows)

1. **Double-click** `start-server.bat`
2. The script will:
   - Check Node.js installation
   - Install dependencies automatically
   - Start the server
3. Open browser to `http://localhost:3000`

### Method 2: Manual Setup (All Platforms)

```bash
# 1. Navigate to project directory
cd COA_Tools

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

### Method 3: Development Mode (Auto-reload)

```bash
# Install development dependencies
npm install

# Start with auto-reload
npm run dev
```

## Connecting Frontend to Backend

### Option 1: Include API Client (Recommended)

Add this line to your `index.html` before the closing `</body>` tag:

```html
<script src="api-client.js"></script>
```

This will automatically:
- Create user sessions
- Add Save/Load buttons
- Track analytics
- Enable backend features

### Option 2: Manual Integration

```javascript
// Initialize session
const response = await fetch('http://localhost:3000/api/session/create', {
  method: 'POST'
});
const { sessionId } = await response.json();

// Save state
await fetch('http://localhost:3000/api/state/save', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'My Calculation',
    state: { stack: [1, 2, 3] }
  })
});
```

## Features

### 1. Save/Load Calculator States

**Save:**
- Click "💾 Save State" button
- Enter a name for your state
- Get a shareable URL
- URL is automatically copied to clipboard

**Load:**
- Click "📂 Load State" button
- Choose from list or paste state ID
- Calculator restores to saved state

### 2. Share Assembly Code

**Share:**
- Generate assembly code in calculator
- Click "📝 Share Assembly" button
- Enter description
- Get shareable URL

**Load:**
- Use the share URL
- Assembly code loads automatically

### 3. View Analytics

- Click "📊 Analytics" button
- See total visits, popular tools
- Track your usage patterns

### 4. API Endpoints

All endpoints are documented in `API.md`

**Base URL:** `http://localhost:3000/api`

Popular endpoints:
- `POST /session/create` - Create session
- `POST /state/save` - Save state
- `GET /state/load/:id` - Load state
- `GET /analytics` - Get statistics
- `POST /convert` - Number conversion
- `POST /binary/arithmetic` - Binary math

## File Structure

```
COA_Tools/
├── server.js           # Backend server
├── api-client.js       # Frontend integration
├── package.json        # Dependencies
├── start-server.bat    # Windows startup script
├── API.md             # API documentation
├── BACKEND_SETUP.md   # This file
└── data/              # Data storage (auto-created)
    ├── sessions.json
    ├── analytics.json
    ├── saved_states.json
    └── assembly_*.txt
```

## Troubleshooting

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/macOS
lsof -ti:3000 | xargs kill
```

Or change port in server.js:
```javascript
const PORT = process.env.PORT || 3001; // Change to 3001
```

### Dependencies Won't Install

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and retry
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

Make sure:
1. Backend server is running
2. Frontend uses `http://localhost:3000` (not file://)
3. CORS is enabled in server.js (already configured)

### Backend Not Connecting

1. Check if server is running:
   ```bash
   curl http://localhost:3000/api/health
   ```

2. Check browser console for errors

3. Verify API_BASE_URL in api-client.js:
   ```javascript
   const API_BASE_URL = 'http://localhost:3000/api';
   ```

## Configuration

### Environment Variables

Create `.env` file:
```env
PORT=3000
NODE_ENV=development
```

### CORS Settings

In `server.js`, modify CORS if needed:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Data Storage Location

By default, data is stored in `./data/`

To change:
```javascript
const DATA_DIR = path.join(__dirname, 'custom-data-folder');
```

## Production Deployment

### Using Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create coa-tools-backend

# Deploy
git push heroku main

# Open
heroku open
```

### Using Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
```

### Environment Variables for Production

```env
PORT=3000
NODE_ENV=production
DATABASE_URL=your_database_url  # If using database
```

### Security for Production

1. **Add Authentication:**
   ```javascript
   const jwt = require('jsonwebtoken');
   
   function authenticate(req, res, next) {
     const token = req.headers.authorization;
     // Verify token
     next();
   }
   
   app.use('/api', authenticate);
   ```

2. **Add Rate Limiting:**
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   });
   
   app.use('/api', limiter);
   ```

3. **Use Database:**
   Replace JSON files with MongoDB/PostgreSQL:
   ```javascript
   const mongoose = require('mongoose');
   mongoose.connect(process.env.DATABASE_URL);
   ```

4. **Enable HTTPS:**
   ```javascript
   const https = require('https');
   const fs = require('fs');
   
   const options = {
     key: fs.readFileSync('key.pem'),
     cert: fs.readFileSync('cert.pem')
   };
   
   https.createServer(options, app).listen(443);
   ```

## Testing

### Test Health Check

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "message": "COA_Tools Backend is running",
  "timestamp": "2025-10-16T..."
}
```

### Test Session Creation

```bash
curl -X POST http://localhost:3000/api/session/create
```

### Test State Save

```bash
curl -X POST http://localhost:3000/api/state/save \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","state":{"stack":[1,2,3]}}'
```

## Performance Tips

1. **Enable Compression:**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Add Caching:**
   ```javascript
   const cache = require('node-cache');
   const myCache = new cache({ stdTTL: 600 });
   ```

3. **Use PM2 for Production:**
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 startup
   pm2 save
   ```

## Support

### Common Issues

| Issue | Solution |
|-------|----------|
| Port in use | Change PORT in server.js |
| Module not found | Run `npm install` |
| CORS error | Check server is running on port 3000 |
| Can't save state | Check `data/` folder permissions |
| Backend offline | Frontend still works without backend |

### Getting Help

1. Check `API.md` for endpoint details
2. Check browser console for errors
3. Check server logs in terminal
4. Open an issue on GitHub

## Updating

```bash
# Pull latest changes
git pull

# Update dependencies
npm update

# Restart server
npm start
```

## Uninstalling

```bash
# Stop server (Ctrl+C)

# Remove dependencies
rm -rf node_modules

# Remove data (optional)
rm -rf data

# Keep the code
```

## Credits

- **Author:** Atrishman Mukherjee
- **License:** MIT
- **Technologies:** Node.js, Express, CORS

## Next Steps

1. ✅ Install Node.js
2. ✅ Run `npm install`
3. ✅ Start server with `npm start`
4. ✅ Add `<script src="api-client.js"></script>` to index.html
5. ✅ Test save/load functionality
6. 🎉 Enjoy enhanced features!

---

**Made with ❤️ for Computer Science Education**

*For more details, see `API.md`*
