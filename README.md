# Computer Organization & Architecture Tools

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/atrishmanm/COA_Tools.svg)](https://github.com/atrishmanm/COA_Tools/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/atrishmanm/COA_Tools.svg)](https://github.com/atrishmanm/COA_Tools/network)
[![GitHub issues](https://img.shields.io/github/issues/atrishmanm/COA_Tools.svg)](https://github.com/atrishmanm/COA_Tools/issues)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/atrishmanm/COA_Tools/graphs/commit-activity)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.18-blue.svg)](https://expressjs.com/)

A comprehensive, **full-stack** open-source web-based toolkit for computer science students, educators, and professionals working with number systems, binary operations, digital logic concepts, and microprocessor simulations. This interactive educational tool provides **13 powerful tools** including multiple converters, calculators, a realistic 8086 processor stack simulator with visual animations, a 1MB memory viewer, signed number representations, IEEE 754 floating-point, Booth's algorithm, **and a powerful Node.js backend** for state persistence, analytics, and API access.

> **🎓 Educational Tool** | **📚 Academic Resource** | **💻 No Installation Required** | **🖥️ 8086 Processor Simulation** | **🔧 Full-Stack Application** | **📡 RESTful API** | **🎬 Visual Animations** | **💾 State Persistence**

## 📑 Table of Contents

- [Features](#-features)
- [Backend API](#-backend-api-new)
- [Quick Start](#-quick-start)
- [Backend Setup](#-backend-setup)
- [Use Cases](#-use-cases)
- [Technical Details](#️-technical-details)
- [Tech Stack](#-tech-stack)
- [Features Overview](#-features-overview)
- [Citation](#-citation)
- [Contributing](#-contributing)
- [License](#-license)
- [Author & Maintainer](#-author--maintainer)
- [Links & Resources](#-links--resources)

## 🚀 All Available Tools

COA_Tools provides **13 comprehensive tools** for computer architecture learning:

1. **🖥️ 8086 Stack Calculator** - Real processor simulation with PUSH/POP/PEEK operations and visual animations
2. **🧠 Memory Viewer** - 1MB address space with segment registers, read/write operations, and memory dumps
3. **📊 Number System Converter** - Convert between any bases (2-36) with step-by-step solutions
4. **🔧 Grey Code Converter** - Bidirectional Grey code ↔ Binary conversion
5. **🔢 BCD Converter** - Binary Coded Decimal ↔ Decimal with validation
6. **⚡ Excess-3 Converter** - Self-complementing code conversion
7. **📝 ASCII Converter** - Text ↔ ASCII codes with reference table
8. **🔒 Parity Calculator** - Even/Odd parity bit generation for error detection
9. **🧮 Binary Arithmetic** - Add, Subtract, Multiply, Divide with step-by-step solutions
10. **±️ Signed Numbers** - Sign-Magnitude, 1's Complement, and 2's Complement representations
11. **🔬 IEEE 754 Float** - 32-bit floating-point representation with component breakdown
12. **⚙️ Booth's Algorithm** - Efficient signed multiplication with cycle-by-cycle execution
13. **📱 BCD Arithmetic** - BCD Addition/Subtraction with correction factors

## 🌟 Features

### 🖥️ 8086 Stack Calculator ⭐ **NEW**
- **Authentic 8086 Processor Simulation**: Real microprocessor architecture emulation
- **Stack-Based Operations**: PUSH, POP, PEEK operations with 50-element stack capacity
- **Real-Time Stack Animation** 🎬: Visual PUSH/POP animations with smooth transitions
- **Animation Controls**: Play, Pause, Step Forward, Reset, and Speed Control (0.5x - 2x)
- **Queue Management**: Sequential animation processing with live queue display
- **Register Management**: Live AX, BX, CX, DX, and SP register displays
- **Arithmetic Operations**: Addition, Subtraction, Multiplication, Division, and Modulo
- **Operation History**: Real-time tracking of all processor operations
- **Interactive Keypad**: Professional calculator interface with backspace functionality
- **Error Handling**: Stack overflow/underflow protection with user alerts
- **Step-by-Step Guide**: Horizontal instruction cards for easy learning
- **Visual Effects**: Color-coded operations (green for PUSH, red for POP), pulse animations

### 🧠 Memory Viewer ⭐ **NEW**
- **1MB Address Space**: Full 1048576 bytes of simulated memory (0x00000 - 0xFFFFF)
- **Segment-Based Navigation**: Switch between Data, Code, Stack, and Extra segments
- **Segment Registers**: Live CS, DS, SS, ES register displays with hex values
- **Hex Memory Grid**: 16-column table with Address + 16 data bytes + ASCII representation
- **Read/Write Operations**: Click cells to read, use dialog to write custom values
- **Operation History**: Track all memory access operations with timestamps
- **Visual Feedback**: Flash animations on read (blue) and write (green) operations
- **Statistics Tracking**: Total reads, writes, memory used, and last access time
- **Stack Integration**: Automatic synchronization with 8086 Stack Calculator
- **Address Navigation**: Jump to specific hex addresses or random locations
- **Export Functionality**: Download memory dump with all written addresses
- **Written Address Tracking**: Highlight cells that have been modified

### �📊 Number System Converter
- Convert between any number bases (2-36)
- Supports Binary, Octal, Decimal, and Hexadecimal
- Custom base conversion with step-by-step solutions
- Detailed conversion process visualization

### 🔧 Code Converters
- **Grey Code ↔ Binary**: Convert between Grey code and binary representations with bidirectional conversion
- **BCD ↔ Decimal**: Binary Coded Decimal conversion with 4-bit group validation
- **Excess-3 ↔ Binary**: Excess-3 code conversion for digital systems and self-complementing codes

### 🔢 Signed Numbers Representations ⭐ **NEW**
- **Sign-Magnitude**: 7-bit magnitude with 1-bit sign representation (-127 to +127)
- **1's Complement**: Bitwise inversion for negative numbers (-127 to +127)
- **2's Complement**: Industry-standard signed number system (-128 to +127)
- **Bidirectional Conversion**: Input decimal or 8-bit binary, get all three representations
- **Step-by-Step Explanations**: Detailed breakdown of each conversion method
- **Educational Comparison**: Learn why 2's complement is the standard in modern CPUs

### 🔬 IEEE 754 Floating Point ⭐ **NEW**
- **Single Precision (32-bit)**: Convert decimal numbers to IEEE 754 float representation
- **Sign, Exponent, Mantissa**: Complete breakdown of floating-point components
- **Hex Representation**: View the 32-bit hex value of your float
- **Normalization Process**: Step-by-step guide to float conversion
- **Binary Visualization**: See the exact bit pattern used in memory

### ⚙️ Booth's Algorithm ⭐ **NEW**
- **Binary Multiplication**: Efficient signed multiplication using Booth's algorithm
- **Step-by-Step Execution**: Watch each cycle of the Booth's algorithm process
- **Register Tracking**: Monitor AC (Accumulator), Q (Multiplier), and Q-1 registers
- **Operation History**: See every shift, add, and subtract operation
- **Visual Learning**: Understand why Booth's algorithm is faster for signed multiplication
- **Cycle-by-Cycle Breakdown**: Follow the algorithm through all iterations

## 🖥️ 8086 Stack Calculator - Detailed Guide

### What Makes It Special
The 8086 Stack Calculator is a faithful simulation of the Intel 8086 microprocessor's stack-based arithmetic operations. Unlike traditional calculators, this tool operates exactly like the real 8086 processor, making it an invaluable educational resource for understanding microprocessor architecture.

### 🎬 Stack Animation Feature ⭐ **NEW**
Experience stack operations come to life with real-time animations!

#### Visual Animation System
- **Live Stack Visualization**: See your stack elements with memory addresses (FFFFH - FFF0H)
- **Smooth PUSH Animations**: Watch data blocks slide in from top with green highlight
- **Smooth POP Animations**: See elements fade out with red highlight effect
- **SP Pointer Tracking**: Yellow indicator shows current Stack Pointer position
- **Color-Coded Operations**: Green for PUSH, Red for POP, Yellow for SP

#### Animation Controls
- **🎬 Show/Hide Animation**: Toggle button in header to access animation mode
- **🎥 Enable Animation Mode**: Activate to queue operations for animation
- **▶️ Play**: Auto-play queued animations sequentially
- **⏸️ Pause**: Pause animation processing mid-queue
- **⏭️ Step Forward**: Manually step through animations one at a time
- **🔄 Reset**: Clear queue and sync with actual stack
- **Speed Control**: Adjust animation speed (0.5x, 1x, 2x multipliers)

#### Information Panel
- **Total Operations**: Count of all PUSH and POP operations
- **PUSH Count**: Number of PUSH operations performed
- **POP Count**: Number of POP operations performed
- **Stack Height**: Current number of elements in visual stack
- **Queue Display**: Shows pending operations and current animation

#### Educational Benefits
- **Visual Learning**: See exactly how stack grows and shrinks
- **Memory Layout**: Understand memory addressing and SP movement
- **Operation Sequence**: Follow step-by-step execution flow
- **Performance Analysis**: Track operation counts and patterns
- **LIFO Principle**: Observe Last-In-First-Out behavior visually

### Key Components

#### 📊 **Register Management**
- **AX, BX, CX, DX**: General-purpose registers with real-time value display
- **SP (Stack Pointer)**: Tracks current stack position (starts at 50, decrements with PUSH)
- **Live Updates**: All registers update instantly during operations

#### 🔄 **Stack Operations**
- **PUSH**: Add numbers to the top of the stack (decrements SP)
- **POP**: Remove and retrieve the top stack element (increments SP)
- **PEEK**: View the top stack element without removing it
- **Stack Memory Visualization**: See your entire stack contents in real-time

#### ⚡ **Arithmetic Engine**
- **Addition (+)**: Pops two values, pushes sum
- **Subtraction (-)**: Pops two values, pushes difference (second - first)
- **Multiplication (×)**: Pops two values, pushes product
- **Division (/)**: Pops two values, pushes quotient (second ÷ first)
- **Modulo (MOD)**: Pops two values, pushes remainder

#### 🔧 **Professional Interface**
- **5×6 Keypad Layout**: Numbers (0-9), operations, and stack controls
- **Backspace (⌫)**: Edit current input with single-digit removal
- **Clear (C)**: Reset calculator and clear current input
- **Equals (=)**: Execute pending operations
- **Color-Coded Keys**: Different colors for numbers, operations, and stack functions

### How to Use (Step-by-Step)

```
Example: Calculate (5 + 3) × 2

1️⃣ Enter "5" → Press PUSH (5 goes to stack)
2️⃣ Enter "3" → Press PUSH (3 goes to stack)
3️⃣ Press "+" (adds 5+3=8, pushes 8 to stack)
4️⃣ Enter "2" → Press PUSH (2 goes to stack)  
5️⃣ Press "×" (multiplies 8×2=16, result on stack)
6️⃣ Press PEEK to view result (16)
```

### Educational Value
- **Understand Stack Architecture**: Learn how processors manage memory
- **Assembly Language Preparation**: Practice stack operations used in 8086 assembly
- **Error Handling**: Experience stack overflow/underflow conditions
- **Register Concepts**: See how processors use registers for temporary storage
- **Operation History**: Track every operation for learning and debugging

### 📝 ASCII Converter
- **Text ↔ ASCII**: Convert text to ASCII codes and vice versa
- **ASCII Reference Table**: Complete printable ASCII character reference
- Support for both individual characters and full text strings

### ⚡ Parity Calculator
- Even and Odd parity bit calculation
- Automatic parity bit generation for error detection
- Visual representation of parity checking process

### 🧮 Binary Arithmetic Calculator
- Addition, Subtraction, Multiplication, and Division
- Step-by-step binary arithmetic solutions
- Decimal equivalent calculations for verification



### 📱 BCD Arithmetic
- BCD Addition and Subtraction operations
- Proper BCD arithmetic with correction factors
- Validation of BCD format compliance

## � Backend API ⭐ **NEW**

### Full-Stack Architecture
COA_Tools now includes a **Node.js + Express backend** providing powerful server-side features!

### 🌟 Backend Features

#### 💾 **State Persistence**
- **Save Calculator States**: Save your calculator state with shareable URLs
- **Load Saved States**: Restore previously saved calculations
- **State Management**: List, view, and delete saved states
- **Share URLs**: Generate unique URLs to share calculator states with others

#### 📊 **Analytics & Statistics**
- **Usage Tracking**: Monitor tool usage patterns and popular features
- **Session Management**: Track user sessions and activity
- **Conversion Tracking**: Log and analyze number system conversions
- **Performance Metrics**: View total visits and operation counts

#### 🔗 **Assembly Code Sharing**
- **Save Assembly Code**: Share generated 8086 assembly code
- **Persistent Storage**: Assembly code saved with unique IDs
- **Easy Sharing**: Get shareable URLs for assembly programs

#### 🌐 **RESTful API**
- **Number Conversion API**: Server-side base conversions (2-36)
- **Binary Arithmetic API**: Add, subtract, multiply, divide binary numbers
- **JSON Responses**: Standard REST API with JSON format
- **CORS Enabled**: Ready for frontend integration

### API Endpoints

```javascript
// Base URL: http://localhost:3000/api

// Session Management
POST   /session/create          // Create new session
GET    /session/:id             // Get session data
POST   /session/:id/activity    // Update activity

// State Management
POST   /state/save              // Save calculator state
GET    /state/load/:id          // Load saved state
GET    /state/list              // List all states
DELETE /state/:id               // Delete state

// Analytics
POST   /analytics/track         // Track tool usage
GET    /analytics               // Get analytics summary

// Number Operations
POST   /convert                 // Convert between bases
POST   /binary/arithmetic       // Binary operations

// Assembly Sharing
POST   /assembly/save            // Save assembly code
GET    /assembly/:id             // Load assembly code
```

### Backend Tech Stack
- **Node.js** (v14+) - JavaScript runtime
- **Express** (v4.18) - Web framework
- **CORS** - Cross-origin resource sharing
- **File-based Storage** - JSON data persistence

### Quick Backend Start

```bash
# Install dependencies
npm install

# Start server
npm start

# Server runs on http://localhost:3000
```

See [BACKEND_SETUP.md](BACKEND_SETUP.md) for detailed setup instructions and [API.md](API.md) for complete API documentation.

## 🚀 Quick Start

### Prerequisites
- Any modern web browser (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- No additional software, plugins, or installations required for frontend
- Optional: Node.js v14+ for backend features (state persistence, analytics, API)

### Installation & Usage

#### Method 1: Direct Download (Frontend Only - 13 Tools)
```bash
# Clone the repository
git clone https://github.com/atrishmanm/COA_Tools.git
cd COA_Tools

# Open in browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

#### Method 2: Full-Stack Setup (Frontend + Backend)
```bash
# Clone the repository
git clone https://github.com/atrishmanm/COA_Tools.git
cd COA_Tools

# Install backend dependencies
npm install

# Start the backend server
npm start

# Open browser to http://localhost:3000
```

#### Method 3: GitHub Pages (Live Demo - Frontend Only)
Visit: `https://atrishmanm.github.io/COA_Tools/`

#### Method 4: Download ZIP
1. Click the green "Code" button above
2. Select "Download ZIP"
3. Extract and open `index.html`

### Using the Tools
1. **Select a Tool**: Click any of the 13 tabs (8086 Stack, Memory Viewer, converters, etc.)
2. **Enter Input**: Provide numbers, binary data, or values based on the tool
3. **View Results**: See step-by-step solutions, visual animations, and detailed breakdowns
4. **Explore Features**: 
   - Try PUSH/POP operations in 8086 Stack with visual animations
   - Read/Write memory in the Memory Viewer
   - Convert between number systems, Grey code, BCD, ASCII
   - Calculate signed numbers, IEEE 754 floats, Booth's multiplication
   - Enable backend for Save/Load state functionality

## �🚀 Quick Start

### Prerequisites
- Any modern web browser (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- No additional software, plugins, or installations required

### Installation & Usage

#### Method 1: Direct Download
```bash
# Clone the repository
git clone https://github.com/atrishmanm/COA_Tools.git
cd COA_Tools

# Open in browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

#### Method 2: GitHub Pages (Live Demo)
Visit: `https://atrishmanm.github.io/COA_Tools/`

#### Method 3: Download ZIP
1. Click the green "Code" button above
2. Select "Download ZIP"
3. Extract and open `index.html`

### File Structure
```
COA_Tools/
├── index.html          # Main application file
├── styles.css          # Styling and responsive design
├── script.js           # Core functionality and algorithms
├── server.js           # Backend server (Node.js + Express)
├── api-client.js       # Frontend-backend integration
├── package.json        # Backend dependencies
├── start-server.bat    # Windows server launcher
├── test-backend.html   # Backend API test interface
├── README.md           # Documentation (this file)
├── API.md              # API documentation
├── BACKEND_SETUP.md    # Backend setup guide
├── QUICK_START.md      # Quick reference guide
└── LICENSE             # MIT License
```

## 🔧 Backend Setup

### Prerequisites for Backend
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Quick Backend Start

```bash
# 1. Install dependencies
npm install

# 2. Start the backend server
npm start

# Server runs on http://localhost:3000
```

### Windows Quick Start
Double-click `start-server.bat` - it will automatically:
- Check Node.js installation
- Install dependencies
- Start the server

### Frontend Integration
Add this line to `index.html` before `</body>` to enable backend features:
```html
<script src="api-client.js"></script>
```

This adds Save/Load buttons, analytics tracking, and state sharing to your frontend!

### Backend Features in Action
- **Save States**: Click "💾 Save State" to save calculator state
- **Load States**: Click "📂 Load State" to restore saved states
- **Share**: Get unique URLs to share states with others
- **Analytics**: Track usage with "📊 Analytics" button

For detailed setup instructions, see [BACKEND_SETUP.md](BACKEND_SETUP.md)

## 💡 Use Cases

- **Students**: Perfect for Computer Organization & Architecture assignments, 8086 assembly language learning, and understanding signed number representations
- **Educators**: Teaching aid for digital logic, number systems, signed arithmetic, and microprocessor architecture
- **Professionals**: Quick reference tool for embedded systems development, stack-based calculations, and binary data handling
- **Self-learners**: Interactive way to understand binary operations, processor behavior, and how computers represent negative numbers
- **Assembly Programmers**: Practice 8086 stack operations and signed arithmetic in a safe simulation environment
- **Full-Stack Developers**: Learn backend API design, RESTful services, session management, and frontend-backend integration

## 🎯 Key Benefits

- ✅ **No Installation Required**: Pure HTML/CSS/JavaScript implementation
- ✅ **Full-Stack Architecture**: Learn both frontend and backend development
- ✅ **RESTful API**: Industry-standard API design with Express.js
- ✅ **Authentic 8086 Simulation**: Real processor behavior with register management
- ✅ **Signed Number Mastery**: Understand how computers represent negative numbers with all three methods
- ✅ **Step-by-Step Solutions**: Learn the process, not just the answer
- ✅ **Interactive Stack Operations**: Visual stack memory with real-time updates
- ✅ **State Persistence**: Save and share calculator states with unique URLs
- ✅ **Analytics Tracking**: Monitor usage patterns and tool performance
- ✅ **Mobile Responsive**: Works on all device sizes with optimized layouts
- ✅ **Offline Capable**: Frontend works without internet after download
- ✅ **Educational Focus**: Designed for learning and understanding computer architecture concepts
- ✅ **Error Validation**: Input validation with helpful error messages and stack protection

## � Tech Stack

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript**: Core calculations, DOM manipulation, and interactivity
- **Google Fonts**: Poppins font family for modern typography

### Backend
- **Node.js** (v14+): JavaScript runtime environment
- **Express.js** (v4.18): Web application framework
- **CORS**: Cross-Origin Resource Sharing support
- **body-parser**: Request body parsing middleware
- **File-based Storage**: JSON files for data persistence (sessions, analytics, states)

### Tools & Environment
- **npm**: Package management and dependency handling
- **Git**: Version control
- **RESTful API Design**: Industry-standard API architecture
- **Session Management**: User session tracking and state management

## 🛠️ Technical Details

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Features Overview

| Tool | Input | Output | Features |
|------|-------|--------|----------|
| **8086 Stack Calculator** | Numbers & Operations | Stack + Registers | Real processor simulation, PUSH/POP/PEEK, animations |
| **Memory Viewer** | Address/Value | Memory Grid + Stats | 1MB address space, segment navigation, R/W ops |
| **Number Converter** | Any base number | Converted number + steps | Base 2-36, custom bases, step-by-step |
| **Grey Code** | Binary/Grey | Grey/Binary | Bidirectional conversion with visualization |
| **BCD Converter** | BCD/Decimal | Decimal/BCD | 4-bit group validation and conversion |
| **Excess-3 Converter** | Excess-3/Binary | Binary/Excess-3 | Self-complementing code conversion |
| **ASCII Converter** | Text/ASCII codes | ASCII codes/Text | Full character support with reference table |
| **Parity Calculator** | Binary data | Data + parity bit | Even/Odd parity error detection |
| **Binary Arithmetic** | Two binary numbers | Result + steps | Add, Subtract, Multiply, Divide |
| **Signed Numbers** | Decimal/Binary | All 3 representations | Sign-Mag, 1's Comp, 2's Comp with steps |
| **IEEE 754 Float** | Decimal number | 32-bit float representation | Sign, Exponent, Mantissa breakdown |
| **Booth's Algorithm** | Two binary numbers | Multiplication result | Step-by-step signed multiplication |
| **BCD Arithmetic** | Two BCD numbers | BCD result | Addition/Subtraction with correction |

## 🎨 Design Features

- **Apple-inspired UI**: Clean, modern interface design with professional aesthetics
- **Gradient Backgrounds**: Attractive visual elements with processor-themed colors
- **Responsive Layout**: Optimized for all screen sizes with adaptive keypad layout
- **Tabbed Interface**: Easy navigation between tools with clear visual indicators
- **Animated Results**: Smooth transitions and real-time feedback
- **Dark/Light Contrast**: High readability with proper color schemes
- **Professional Keypad**: Color-coded buttons with hover effects and visual feedback
- **Real-time Updates**: Live register displays and stack visualization
- **Interactive Cards**: Horizontal instruction guide with modern card-based design

## 📚 Educational Value

This tool is designed with education in mind:
- **8086 Processor Simulation**: Learn real microprocessor architecture and stack operations with visual animations
- **Memory Management**: Understand 1MB address space, segment registers, and memory operations
- **Signed Number Representations**: Master all three methods (Sign-Magnitude, 1's Complement, 2's Complement)
- **IEEE 754 Floating Point**: Learn industry-standard float representation and normalization
- **Booth's Algorithm**: Understand efficient signed multiplication techniques
- **Code Converters**: Master Grey code, BCD, and Excess-3 representations
- **Shows conversion steps**: Better understanding of number system transformations and signed arithmetic
- **Stack-based computing**: Understand how processors manage memory and arithmetic operations
- **Register management**: Learn how CPUs use registers for temporary storage and addressing
- **Assembly language preparation**: Practice concepts used in 8086 assembly programming and signed operations
- **Visual Learning**: Animations and step-by-step breakdowns for complex operations
- **Validates inputs**: Helpful error messages with stack protection mechanisms and range validation
- **Provides reference materials**: ASCII table, complement comparisons, and step-by-step operation guides
- **Explains the logic**: Behind each operation, processor behavior, and why 2's complement is industry standard
- **Suitable for all levels**: From beginners to advanced computer architecture students

## 🤝 Contributing

Feel free to contribute to this project! Some ideas:
- **Expand 8086 simulation**: Add more processor instructions and advanced features
- **Additional processors**: Implement 8085, 80286, or ARM processor simulations
- **Enhanced floating-point**: Add double precision (64-bit) IEEE 754 support
- **More algorithms**: Division algorithms (restoring/non-restoring), Karatsuba multiplication
- **Enhanced signed numbers**: Add 16-bit, 32-bit, and 64-bit signed number support
- **Backend features**: Add database support, user accounts, saved sessions
- **Enhanced stack operations**: Implement more complex stack-based algorithms and function calls
- **Keyboard shortcuts**: Add hotkey support for faster calculator operation
- **Assembly code generation**: Generate actual 8086 assembly code from operations
- **Improve mobile responsiveness**: Enhanced touch interface for tablets and phones
- **Additional converters**: BCD arithmetic enhancement, packed BCD support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## � Citation

If you use this tool in your research, teaching, or academic work, please cite it as:

### BibTeX Citation
```bibtex
@software{mukherjee2025coa,
  author       = {Atrishman Mukherjee},
  title        = {{Computer Organization \& Architecture Tools: A Comprehensive Educational Toolkit}},
  year         = {2025},
  publisher    = {GitHub},
  journal      = {GitHub repository},
  howpublished = {\url{https://github.com/atrishmanm/COA_Tools}},
  version      = {v1.0}
}
```

### APA Citation
```
Mukherjee, A. (2025). Computer Organization & Architecture Tools: A Comprehensive Educational Toolkit (Version 1.0) [Computer software]. GitHub. https://github.com/atrishmanm/COA_Tools
```

### IEEE Citation
```
A. Mukherjee, "Computer Organization & Architecture Tools: A Comprehensive Educational Toolkit," GitHub, 2025. [Online]. Available: https://github.com/atrishmanm/COA_Tools
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute
- 🐛 **Report Bugs**: Open an issue with bug details
- 💡 **Suggest Features**: Propose new tools or improvements
- 📝 **Improve Documentation**: Help make instructions clearer
- 🔧 **Submit Code**: Fork, code, and create pull requests

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly across browsers
5. Commit: `git commit -am 'Add new feature'`
6. Push: `git push origin feature-name`
7. Submit a Pull Request

### Code Style
- Use consistent indentation (2 spaces)
- Comment complex algorithms
- Follow existing naming conventions
- Ensure cross-browser compatibility

## � License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Atrishman Mukherjee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 👤 Author & Maintainer

<div align="center">

**Atrishman Mukherjee**
<br>
*Computer Science Student*

[![GitHub](https://img.shields.io/badge/GitHub-atrishmanm-181717?style=flat&logo=github)](https://github.com/atrishmanm)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=flat&logo=gmail)](mailto:atrishmanm@gmail.com)

</div>

## 🔗 Links & Resources

- � **Live Demo**: [GitHub Pages](https://atrishmanm.github.io/COA_Tools/)
- 🐛 **Report Issues**: [GitHub Issues](https://github.com/atrishmanm/COA_Tools/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/atrishmanm/COA_Tools/discussions)
- 📋 **Project Board**: [GitHub Projects](https://github.com/atrishmanm/COA_Tools/projects)

## 🌟 Acknowledgments

- **Inspiration**: Computer Organization & Architecture coursework
- **Design**: Modern web design principles and Apple's Human Interface Guidelines
- **Community**: Feedback and contributions from students and educators
- **Libraries**: Google Fonts (Poppins), Pure HTML/CSS/JavaScript implementation

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/atrishmanm/COA_Tools)
![GitHub code size](https://img.shields.io/github/languages/code-size/atrishmanm/COA_Tools)
![GitHub last commit](https://img.shields.io/github/last-commit/atrishmanm/COA_Tools)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/atrishmanm/COA_Tools)

---

<div align="center">

### 📞 Support This Project

If you find this tool helpful for your studies or work, please consider:

⭐ **Star this repository** | 🍴 **Fork for your own use** | 📢 **Share with others** | 🐛 **Report issues**

**Made with ❤️ for the Computer Science Community**

*Happy Computing! 🚀*

</div>