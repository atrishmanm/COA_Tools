# Computer Organization & Architecture Tools

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/atrishmanm/COA_Tools.svg)](https://github.com/atrishmanm/COA_Tools/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/atrishmanm/COA_Tools.svg)](https://github.com/atrishmanm/COA_Tools/network)
[![GitHub issues](https://img.shields.io/github/issues/atrishmanm/COA_Tools.svg)](https://github.com/atrishmanm/COA_Tools/issues)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/atrishmanm/COA_Tools/graphs/commit-activity)

A comprehensive, open-source web-based toolkit for computer science students, educators, and professionals working with number systems, binary operations, digital logic concepts, and microprocessor simulations. This interactive educational tool provides multiple converters, calculators, and a realistic 8086 processor stack simulator essential for Computer Organization & Architecture coursework and research.

> **🎓 Educational Tool** | **📚 Academic Resource** | **💻 No Installation Required** | **🖥️ 8086 Processor Simulation**

## 📑 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Use Cases](#-use-cases)
- [Technical Details](#️-technical-details)
- [Features Overview](#-features-overview)
- [Citation](#-citation)
- [Contributing](#-contributing)
- [License](#-license)
- [Author & Maintainer](#-author--maintainer)
- [Links & Resources](#-links--resources)

## 🌟 Features

### �️ 8086 Stack Calculator ⭐ **NEW**
- **Authentic 8086 Processor Simulation**: Real microprocessor architecture emulation
- **Stack-Based Operations**: PUSH, POP, PEEK operations with 50-element stack capacity
- **Register Management**: Live AX, BX, CX, DX, and SP register displays
- **Arithmetic Operations**: Addition, Subtraction, Multiplication, Division, and Modulo
- **Operation History**: Real-time tracking of all processor operations
- **Interactive Keypad**: Professional calculator interface with backspace functionality
- **Error Handling**: Stack overflow/underflow protection with user alerts
- **Step-by-Step Guide**: Horizontal instruction cards for easy learning

### �📊 Number System Converter
- Convert between any number bases (2-36)
- Supports Binary, Octal, Decimal, and Hexadecimal
- Custom base conversion with step-by-step solutions
- Detailed conversion process visualization

### 🔧 Code Converters
- **Grey Code ↔ Binary**: Convert between Grey code and binary representations
- **BCD ↔ Decimal**: Binary Coded Decimal conversion with validation
- **Excess-3 ↔ Binary**: Excess-3 code conversion for digital systems

### 🔢 Signed Numbers Representations ⭐ **NEW**
- **Sign-Magnitude**: 7-bit magnitude with 1-bit sign representation (-127 to +127)
- **1's Complement**: Bitwise inversion for negative numbers (-127 to +127)
- **2's Complement**: Industry-standard signed number system (-128 to +127)
- **Bidirectional Conversion**: Input decimal or 8-bit binary, get all three representations
- **Step-by-Step Explanations**: Detailed breakdown of each conversion method
- **Educational Comparison**: Learn why 2's complement is the standard in modern CPUs

## 🖥️ 8086 Stack Calculator - Detailed Guide

### What Makes It Special
The 8086 Stack Calculator is a faithful simulation of the Intel 8086 microprocessor's stack-based arithmetic operations. Unlike traditional calculators, this tool operates exactly like the real 8086 processor, making it an invaluable educational resource for understanding microprocessor architecture.

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

## 🚀 Quick Start

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
├── README.md           # Documentation (this file)
└── LICENSE             # MIT License
```

## 💡 Use Cases

- **Students**: Perfect for Computer Organization & Architecture assignments, 8086 assembly language learning, and understanding signed number representations
- **Educators**: Teaching aid for digital logic, number systems, signed arithmetic, and microprocessor architecture
- **Professionals**: Quick reference tool for embedded systems development, stack-based calculations, and binary data handling
- **Self-learners**: Interactive way to understand binary operations, processor behavior, and how computers represent negative numbers
- **Assembly Programmers**: Practice 8086 stack operations and signed arithmetic in a safe simulation environment

## 🎯 Key Benefits

- ✅ **No Installation Required**: Pure HTML/CSS/JavaScript implementation
- ✅ **Authentic 8086 Simulation**: Real processor behavior with register management
- ✅ **Signed Number Mastery**: Understand how computers represent negative numbers with all three methods
- ✅ **Step-by-Step Solutions**: Learn the process, not just the answer
- ✅ **Interactive Stack Operations**: Visual stack memory with real-time updates
- ✅ **Mobile Responsive**: Works on all device sizes with optimized layouts
- ✅ **Offline Capable**: No internet connection needed after download
- ✅ **Educational Focus**: Designed for learning and understanding computer architecture concepts
- ✅ **Error Validation**: Input validation with helpful error messages and stack protection

## 🛠️ Technical Details

### Built With
- **HTML5**: Structure and semantic markup
- **CSS3**: Modern styling with gradients and animations
- **Vanilla JavaScript**: All calculations and interactions
- **Google Fonts**: Poppins font family for modern typography

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Features Overview

| Tool | Input | Output | Features |
|------|-------|--------|----------|
| **8086 Stack Calculator** | Numbers & Operations | Stack + Registers | Real processor simulation, PUSH/POP/PEEK |
| Number Converter | Any base number | Converted number + steps | Base 2-36, custom bases |
| Grey Code | Binary/Grey | Grey/Binary | Bidirectional conversion |
| BCD Converter | BCD/Decimal | Decimal/BCD | 4-bit group validation |
| ASCII Converter | Text/ASCII codes | ASCII codes/Text | Full character support |
| Parity Calculator | Binary data | Data + parity bit | Even/Odd parity |
| Binary Arithmetic | Two binary numbers | Result + steps | All basic operations |
| **Signed Numbers** | Decimal/Binary | All 3 representations | Sign-Mag, 1's Comp, 2's Comp with steps |
| BCD Arithmetic | Two BCD numbers | BCD result | Addition/Subtraction |

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
- **8086 Processor Simulation**: Learn real microprocessor architecture and stack operations
- **Signed Number Representations**: Master all three methods (Sign-Magnitude, 1's Complement, 2's Complement)
- **Shows conversion steps**: Better understanding of number system transformations and signed arithmetic
- **Stack-based computing**: Understand how processors manage memory and arithmetic
- **Register management**: Learn how CPUs use registers for temporary storage
- **Assembly language preparation**: Practice concepts used in 8086 assembly programming and signed operations
- **Validates inputs**: Helpful error messages with stack protection mechanisms and range validation
- **Provides reference materials**: ASCII table, complement comparisons, and step-by-step operation guides
- **Explains the logic**: Behind each operation, processor behavior, and why 2's complement is industry standard
- **Suitable for all levels**: Both beginners and advanced computer science students

## 🤝 Contributing

Feel free to contribute to this project! Some ideas:
- **Expand 8086 simulation**: Add more processor instructions and features
- **Additional processors**: Implement 8085, 80286, or other microprocessor simulations
- **More number system converters**: IEEE 754 floating-point, other signed representations
- **Enhanced signed numbers**: Add 16-bit, 32-bit, and 64-bit signed number support
- **Floating-point representations**: Add IEEE 754 single and double precision converters
- **Enhanced stack operations**: Implement more complex stack-based algorithms
- **Keyboard shortcuts**: Add hotkey support for faster calculator operation
- **Save/Load functionality**: Allow users to save stack states and operations
- **Assembly code generation**: Generate actual 8086 assembly code from operations
- **Improve mobile responsiveness**: Enhanced touch interface for tablets and phones

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