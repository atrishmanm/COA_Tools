/* Computer Organization & Architecture Tools - JavaScript Functions */
/* Advanced algorithms for number system conversion, arithmetic, and code conversions */

// Tab Management
function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
  }
  const tabs = document.getElementsByClassName("tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
  
  // Initialize stack calculator when 8086 tab is opened
  if (tabName === '8086-stack') {
    console.log('8086 tab opened, initializing...');
    // Add a small delay to ensure DOM elements are ready
    setTimeout(() => {
      initStackCalculator();
    }, 100);
  }
  
  // Initialize memory viewer when Memory Viewer tab is opened
  if (tabName === 'memory-viewer') {
    console.log('Memory Viewer tab opened, initializing...');
    setTimeout(() => {
      initMemoryViewer();
    }, 100);
  }
}

// Number Converter Functions
function parseBase(val, customId) {
  if (val === 'custom') {
    const custom = document.getElementById(customId).value;
    return parseInt(custom, 10);
  }
  return parseInt(val, 10);
}

// Custom base functionality is now handled by the dropdown selection logic

document.getElementById('convertForm').onsubmit = function(e) {
  e.preventDefault();
  const number = document.getElementById('inputNumber').value.trim();
  let fromBase = document.getElementById('fromBase').value;
  let toBase = document.getElementById('toBase').value;
  fromBase = fromBase === 'custom' ? document.getElementById('customFromBase').value : fromBase;
  toBase = toBase === 'custom' ? document.getElementById('customToBase').value : toBase;
  fromBase = parseInt(fromBase, 10);
  toBase = parseInt(toBase, 10);
  if (!number) return;
  if (isNaN(fromBase) || fromBase < 2 || fromBase > 36) {
    alert('Invalid source base!');
    return;
  }
  if (isNaN(toBase) || toBase < 2 || toBase > 36) {
    alert('Invalid target base!');
    return;
  }
  try {
    const { result, steps } = convertNumberWithSteps(number, fromBase, toBase);
    document.getElementById('result').style.display = '';
    document.getElementById('result').textContent = result;
    document.getElementById('steps').style.display = '';
    document.getElementById('steps').innerHTML = steps.map(s => `<div class="step">${s}</div>`).join('');
  } catch (err) {
    document.getElementById('result').style.display = '';
    document.getElementById('result').textContent = 'Error: ' + err.message;
    document.getElementById('steps').style.display = 'none';
  }
};

function convertNumberWithSteps(number, fromBase, toBase) {
  const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const clean = number.replace(/^0[box]/i, '').toUpperCase();
  // Validate input
  for (let c of clean) {
    if (!DIGITS.slice(0, fromBase).includes(c)) {
      throw new Error(`Invalid digit '${c}' for base ${fromBase}`);
    }
  }
  // Convert to decimal
  let decimal = 0;
  let steps = [];
  if (fromBase !== 10) {
    let sumParts = [];
    for (let i = 0; i < clean.length; i++) {
      const digit = DIGITS.indexOf(clean[clean.length - 1 - i]);
      const part = `${clean[clean.length - 1 - i]} × ${fromBase}^${i} = ${digit * Math.pow(fromBase, i)}`;
      sumParts.push(part);
      decimal += digit * Math.pow(fromBase, i);
    }
    steps.push(`To Decimal: ${sumParts.join(' + ')} = <b>${decimal}</b>`);
  } else {
    decimal = parseInt(clean, 10);
    steps.push(`Input is already decimal: <b>${decimal}</b>`);
  }
  // Convert from decimal to target base
  if (toBase !== 10) {
    let q = decimal;
    let remainders = [];
    let divSteps = [];
    while (q > 0) {
      let rem = q % toBase;
      divSteps.push(`${q} ÷ ${toBase} = ${Math.floor(q/toBase)}, remainder ${rem} (${DIGITS[rem]})`);
      remainders.unshift(DIGITS[rem]);
      q = Math.floor(q / toBase);
    }
    steps.push(...divSteps);
    steps.push(`Read remainders from bottom to top: <b>${remainders.join('')}</b>`);
    return { result: remainders.length ? remainders.join('') : '0', steps };
  } else {
    return { result: decimal.toString(), steps };
  }
}

// Grey Code Converter
function convertGreyCode() {
  const input = document.getElementById('greyInput').value.trim();
  const type = document.getElementById('greyType').value;
  const result = document.getElementById('greyResult');
  
  if (!input) return;
  
  try {
    let output, steps = [];
    
    if (type === 'grey-to-binary') {
      output = greyToBinary(input);
      steps = [`Grey Code: ${input}`, `Binary: <b>${output}</b>`];
    } else {
      output = binaryToGrey(input);
      steps = [`Binary: ${input}`, `Grey Code: <b>${output}</b>`];
    }
    
    result.innerHTML = steps.join('<br>');
    result.style.display = 'block';
  } catch (err) {
    result.innerHTML = 'Error: ' + err.message;
    result.style.display = 'block';
  }
}

function greyToBinary(grey) {
  if (!/^[01]+$/.test(grey)) throw new Error('Invalid Grey code');
  let binary = grey[0];
  for (let i = 1; i < grey.length; i++) {
    binary += (parseInt(binary[i-1]) ^ parseInt(grey[i])).toString();
  }
  return binary;
}

function binaryToGrey(binary) {
  if (!/^[01]+$/.test(binary)) throw new Error('Invalid binary');
  let grey = binary[0];
  for (let i = 1; i < binary.length; i++) {
    grey += (parseInt(binary[i-1]) ^ parseInt(binary[i])).toString();
  }
  return grey;
}

// BCD Converter
function convertBCD() {
  const input = document.getElementById('bcdInput').value.trim();
  const type = document.getElementById('bcdType').value;
  const result = document.getElementById('bcdResult');
  
  if (!input) return;
  
  try {
    let output, steps = [];
    
    if (type === 'bcd-to-decimal') {
      output = bcdToDecimal(input);
      steps = [`BCD: ${input}`, `Decimal: <b>${output}</b>`];
    } else {
      output = decimalToBCD(input);
      steps = [`Decimal: ${input}`, `BCD: <b>${output}</b>`];
    }
    
    result.innerHTML = steps.join('<br>');
    result.style.display = 'block';
  } catch (err) {
    result.innerHTML = 'Error: ' + err.message;
    result.style.display = 'block';
  }
}

function bcdToDecimal(bcd) {
  if (!/^[01]+$/.test(bcd)) throw new Error('Invalid BCD');
  if (bcd.length % 4 !== 0) throw new Error('BCD must be in groups of 4 bits');
  
  let decimal = '';
  for (let i = 0; i < bcd.length; i += 4) {
    const group = bcd.substr(i, 4);
    const digit = parseInt(group, 2);
    if (digit > 9) throw new Error('Invalid BCD digit: ' + group);
    decimal += digit.toString();
  }
  return decimal;
}

function decimalToBCD(decimal) {
  if (!/^\d+$/.test(decimal)) throw new Error('Invalid decimal number');
  
  let bcd = '';
  for (let digit of decimal) {
    const binary = parseInt(digit).toString(2).padStart(4, '0');
    bcd += binary;
  }
  return bcd;
}

// Excess-3 Converter
function convertExcess3() {
  const input = document.getElementById('excess3Input').value.trim();
  const type = document.getElementById('excess3Type').value;
  const result = document.getElementById('excess3Result');
  
  if (!input) return;
  
  try {
    let output, steps = [];
    
    if (type === 'excess3-to-binary') {
      output = excess3ToBinary(input);
      steps = [`Excess-3: ${input}`, `Binary: <b>${output}</b>`];
    } else {
      output = binaryToExcess3(input);
      steps = [`Binary: ${input}`, `Excess-3: <b>${output}</b>`];
    }
    
    result.innerHTML = steps.join('<br>');
    result.style.display = 'block';
  } catch (err) {
    result.innerHTML = 'Error: ' + err.message;
    result.style.display = 'block';
  }
}

function excess3ToBinary(excess3) {
  if (!/^[01]+$/.test(excess3)) throw new Error('Invalid Excess-3 code');
  if (excess3.length % 4 !== 0) throw new Error('Excess-3 must be in groups of 4 bits');
  
  let binary = '';
  for (let i = 0; i < excess3.length; i += 4) {
    const group = excess3.substr(i, 4);
    const digit = parseInt(group, 2) - 3;
    if (digit < 0 || digit > 9) throw new Error('Invalid Excess-3 digit: ' + group);
    binary += digit.toString(2).padStart(4, '0');
  }
  return binary;
}

function binaryToExcess3(binary) {
  if (!/^[01]+$/.test(binary)) throw new Error('Invalid binary');
  if (binary.length % 4 !== 0) throw new Error('Binary must be in groups of 4 bits');
  
  let excess3 = '';
  for (let i = 0; i < binary.length; i += 4) {
    const group = binary.substr(i, 4);
    const digit = parseInt(group, 2) + 3;
    if (digit > 15) throw new Error('Invalid binary digit for Excess-3: ' + group);
    excess3 += digit.toString(2).padStart(4, '0');
  }
  return excess3;
}

// ASCII Converter
function convertASCII() {
  const input = document.getElementById('asciiInput').value.trim();
  const type = document.getElementById('asciiType').value;
  const result = document.getElementById('asciiResult');
  
  if (!input) return;
  
  try {
    let output, steps = [];
    
    if (type === 'text-to-ascii') {
      const codes = [];
      for (let char of input) {
        codes.push(char.charCodeAt(0));
      }
      output = codes.join(' ');
      steps = [`Text: "${input}"`, `ASCII Codes: <b>${output}</b>`];
    } else {
      const codes = input.split(/\s+/).map(code => parseInt(code));
      output = codes.map(code => String.fromCharCode(code)).join('');
      steps = [`ASCII Codes: ${input}`, `Text: "<b>${output}</b>"`];
    }
    
    result.innerHTML = steps.join('<br>');
    result.style.display = 'block';
  } catch (err) {
    result.innerHTML = 'Error: ' + err.message;
    result.style.display = 'block';
  }
}

// Generate ASCII Table
function generateASCIITable() {
  const table = document.getElementById('asciiTable');
  let html = '<table style="width: 100%; font-size: 0.75rem;"><tr><th>Char</th><th>ASCII</th><th>Hex</th><th>Bin</th></tr>';
  
  for (let i = 32; i <= 126; i++) {
    const char = String.fromCharCode(i);
    const hex = i.toString(16).toUpperCase().padStart(2, '0');
    const bin = i.toString(2).padStart(7, '0');
    html += `<tr><td>${char}</td><td>${i}</td><td>${hex}</td><td>${bin}</td></tr>`;
  }
  
  html += '</table>';
  table.innerHTML = html;
}

// Parity Calculator
function calculateParity() {
  const input = document.getElementById('parityInput').value.trim();
  const type = document.getElementById('parityType').value;
  const result = document.getElementById('parityResult');
  
  if (!input) return;
  if (!/^[01]+$/.test(input)) {
    result.innerHTML = 'Error: Invalid binary data';
    result.style.display = 'block';
    return;
  }
  
  const ones = input.split('').filter(bit => bit === '1').length;
  const parityBit = (type === 'even') ? (ones % 2).toString() : ((ones + 1) % 2).toString();
  const dataWithParity = input + parityBit;
  
  const steps = [
    `Data: ${input}`,
    `Number of 1s: ${ones}`,
    `Parity Type: ${type.charAt(0).toUpperCase() + type.slice(1)}`,
    `Parity Bit: <b>${parityBit}</b>`,
    `Data with Parity: <b>${dataWithParity}</b>`
  ];
  
  result.innerHTML = steps.join('<br>');
  result.style.display = 'block';
}

// Binary Arithmetic Calculator
function calculateBinaryArithmetic() {
  const num1 = document.getElementById('binNum1').value.trim();
  const num2 = document.getElementById('binNum2').value.trim();
  const op = document.getElementById('operation').value;
  const result = document.getElementById('binaryArithmeticResult');
  
  if (!num1 || !num2) return;
  if (!/^[01]+$/.test(num1) || !/^[01]+$/.test(num2)) {
    result.innerHTML = 'Error: Invalid binary numbers';
    result.style.display = 'block';
    return;
  }
  
  const dec1 = parseInt(num1, 2);
  const dec2 = parseInt(num2, 2);
  let decResult, opSymbol;
  
  switch(op) {
    case 'add':
      decResult = dec1 + dec2;
      opSymbol = '+';
      break;
    case 'subtract':
      decResult = dec1 - dec2;
      opSymbol = '-';
      break;
    case 'multiply':
      decResult = dec1 * dec2;
      opSymbol = '×';
      break;
    case 'divide':
      if (dec2 === 0) {
        result.innerHTML = 'Error: Division by zero';
        result.style.display = 'block';
        return;
      }
      decResult = Math.floor(dec1 / dec2);
      opSymbol = '÷';
      break;
  }
  
  const binResult = decResult.toString(2);
  
  const steps = [
    `${num1} (${dec1}) ${opSymbol} ${num2} (${dec2})`,
    `Decimal: ${dec1} ${opSymbol} ${dec2} = ${decResult}`,
    `Binary Result: <b>${binResult}</b>`
  ];
  
  result.innerHTML = steps.join('<br>');
  result.style.display = 'block';
}

// Complement Calculator
function calculateComplement() {
  const input = document.getElementById('complementInput').value.trim();
  const type = document.getElementById('complementType').value;
  const result = document.getElementById('complementResult');
  
  if (!input) return;
  if (!/^[01]+$/.test(input)) {
    result.innerHTML = 'Error: Invalid binary number';
    result.style.display = 'block';
    return;
  }
  
  let steps = [`Original: ${input}`];
  
  // 1's complement
  const onesComp = input.split('').map(bit => bit === '0' ? '1' : '0').join('');
  steps.push(`1's Complement: ${onesComp}`);
  
  if (type === 'twos') {
    // 2's complement = 1's complement + 1
    const twosComp = (parseInt(onesComp, 2) + 1).toString(2).padStart(input.length, '0');
    steps.push(`2's Complement: ${onesComp} + 1 = <b>${twosComp}</b>`);
  } else {
    steps.push(`Result: <b>${onesComp}</b>`);
  }
  
  result.innerHTML = steps.join('<br>');
  result.style.display = 'block';
}

// BCD Arithmetic
function calculateBCDArithmetic() {
  const num1 = document.getElementById('bcdArithNum1').value.trim();
  const num2 = document.getElementById('bcdArithNum2').value.trim();
  const op = document.getElementById('bcdOperation').value;
  const result = document.getElementById('bcdArithmeticResult');
  
  if (!num1 || !num2) return;
  if (!/^[01]+$/.test(num1) || !/^[01]+$/.test(num2)) {
    result.innerHTML = 'Error: Invalid BCD numbers';
    result.style.display = 'block';
    return;
  }
  
  try {
    const dec1 = bcdToDecimal(num1);
    const dec2 = bcdToDecimal(num2);
    let decResult;
    
    if (op === 'add') {
      decResult = (parseInt(dec1) + parseInt(dec2)).toString();
    } else {
      decResult = (parseInt(dec1) - parseInt(dec2)).toString();
      if (parseInt(decResult) < 0) {
        result.innerHTML = 'Error: Negative result not supported in BCD';
        result.style.display = 'block';
        return;
      }
    }
    
    const bcdResult = decimalToBCD(decResult);
    
    const steps = [
      `BCD 1: ${num1} (Decimal: ${dec1})`,
      `BCD 2: ${num2} (Decimal: ${dec2})`,
      `Operation: ${dec1} ${op === 'add' ? '+' : '-'} ${dec2} = ${decResult}`,
      `BCD Result: <b>${bcdResult}</b>`
    ];
    
    result.innerHTML = steps.join('<br>');
    result.style.display = 'block';
  } catch (err) {
    result.innerHTML = 'Error: ' + err.message;
    result.style.display = 'block';
  }
}

// 8086 Stack Calculator Variables and Functions
let stackMemory = [];
let currentDisplay = '0';
let operationHistory = [];  // Track operations for display
const MAX_STACK_SIZE = 50;

// CPU Registers simulation
let registers = {
  AX: 0,    // Accumulator
  BX: 0,    // Base
  CX: 0,    // Counter  
  DX: 0,    // Data
  SP: MAX_STACK_SIZE  // Stack Pointer (starts at top)
};

// Flags Register simulation
let flags = {
  ZF: 0,    // Zero Flag
  CF: 0,    // Carry Flag
  SF: 0,    // Sign Flag
  OF: 0,    // Overflow Flag
  PF: 0,    // Parity Flag
  AF: 0     // Auxiliary Carry Flag
};

// Performance Metrics
let performanceMetrics = {
  totalOperations: 0,
  startTime: Date.now(),
  lastOperationTime: 0
};

// Assembly Code Storage
let assemblyCodeLines = [
  '; 8086 Assembly Code',
  '; Generated automatically from operations',
  ''
];

// Initialize stack calculator
function initStackCalculator() {
  console.log('Initializing 8086 stack processor...');
  
  // Initialize processor state
  stackMemory = [];
  currentDisplay = '0';
  operationHistory = [];
  
  // Reset registers
  registers = {
    AX: 0,
    BX: 0, 
    CX: 0,
    DX: 0,
    SP: MAX_STACK_SIZE
  };
  
  // Reset flags
  flags = {
    ZF: 0,
    CF: 0,
    SF: 0,
    OF: 0,
    PF: 0,
    AF: 0
  };
  
  // Reset performance metrics
  performanceMetrics = {
    totalOperations: 0,
    startTime: Date.now(),
    lastOperationTime: 0
  };
  
  // Reset assembly code
  assemblyCodeLines = [
    '; 8086 Assembly Code',
    '; Generated automatically from operations',
    ''
  ];
  
  updateDisplay();
  updateStackDisplay();
  updateStackSize();
  updateRegistersDisplay();
  updateFlagsDisplay();
  updatePerformanceMetrics();
  updateAssemblyDisplay();
  initInlineMemoryViewer();
  updateSignedRepresentations();
  
  // Initialize stack animation
  initStackAnimation();
  
  console.log('8086 processor initialized');
}

// Stack Calculator Functions
function inputNumber(number) {
  console.log('inputNumber called with:', number);
  
  if (currentDisplay === '0') {
    currentDisplay = number;
  } else {
    currentDisplay += number;
  }
  
  // Store in AX register for display
  registers.AX = parseInt(currentDisplay);
  
  updateDisplay();
  updateRegistersDisplay();
  addToHistory(`Input: ${currentDisplay}`);
  
  console.log('Current input:', currentDisplay, 'AX:', registers.AX);
}

// Backspace function
function backspace() {
  console.log('Backspace called, current display:', currentDisplay);
  
  if (currentDisplay !== '0' && currentDisplay.length > 1) {
    currentDisplay = currentDisplay.slice(0, -1);
  } else {
    currentDisplay = '0';
  }
  
  // Update AX register
  registers.AX = parseInt(currentDisplay);
  
  updateDisplay();
  updateRegistersDisplay();
  addToHistory(`Backspace: ${currentDisplay}`);
  
  console.log('After backspace:', currentDisplay, 'AX:', registers.AX);
}

// Make functions globally accessible
window.inputNumber = inputNumber;
window.backspace = backspace;

function inputOperation(operation) {
  console.log('8086 Operation:', operation);
  
  if (stackMemory.length < 2) {
    addToHistory(`Error: Need 2 values on stack for ${operation}`);
    alert(`Stack Underflow! Need at least 2 values on stack for ${operation} operation.\nCurrent stack size: ${stackMemory.length}`);
    return;
  }
  
  // POP two values from stack (8086 style)
  const secondOperand = stackMemory.pop();  // Top of stack (second operand)
  const firstOperand = stackMemory.pop();   // Second from top (first operand)
  
  // Update stack pointer
  registers.SP += 2;
  
  let result;
  let operationStr;
  
  // Store operands in registers for processing
  registers.BX = firstOperand;
  registers.CX = secondOperand;
  
  switch(operation) {
    case '+':
      result = firstOperand + secondOperand;
      operationStr = `ADD: ${firstOperand} + ${secondOperand} = ${result}`;
      addAssemblyCode(`POP BX         ; BX = ${secondOperand}`);
      addAssemblyCode(`POP AX         ; AX = ${firstOperand}`);
      addAssemblyCode(`ADD AX, BX     ; AX = AX + BX`);
      addAssemblyCode(`PUSH AX        ; Push result`);
      addAssemblyCode('');
      break;
    case '-':
      result = firstOperand - secondOperand;
      operationStr = `SUB: ${firstOperand} - ${secondOperand} = ${result}`;
      addAssemblyCode(`POP BX         ; BX = ${secondOperand}`);
      addAssemblyCode(`POP AX         ; AX = ${firstOperand}`);
      addAssemblyCode(`SUB AX, BX     ; AX = AX - BX`);
      addAssemblyCode(`PUSH AX        ; Push result`);
      addAssemblyCode('');
      break;
    case '*':
      result = firstOperand * secondOperand;
      operationStr = `MUL: ${firstOperand} × ${secondOperand} = ${result}`;
      addAssemblyCode(`POP BX         ; BX = ${secondOperand}`);
      addAssemblyCode(`POP AX         ; AX = ${firstOperand}`);
      addAssemblyCode(`MUL BX         ; AX = AX * BX`);
      addAssemblyCode(`PUSH AX        ; Push result`);
      addAssemblyCode('');
      break;
    case '/':
      if (secondOperand === 0) {
        stackMemory.push(firstOperand, secondOperand);
        registers.SP -= 2;
        addToHistory('Error: Division by zero');
        alert('Division by zero error!');
        return;
      }
      result = Math.floor(firstOperand / secondOperand);
      operationStr = `DIV: ${firstOperand} ÷ ${secondOperand} = ${result}`;
      addAssemblyCode(`POP BX         ; BX = ${secondOperand}`);
      addAssemblyCode(`POP AX         ; AX = ${firstOperand}`);
      addAssemblyCode(`XOR DX, DX     ; Clear DX`);
      addAssemblyCode(`DIV BX         ; AX = AX / BX`);
      addAssemblyCode(`PUSH AX        ; Push result`);
      addAssemblyCode('');
      break;
    case 'MOD':
      if (secondOperand === 0) {
        stackMemory.push(firstOperand, secondOperand); // Restore stack
        registers.SP -= 2;
        addToHistory('Error: Division by zero');
        alert('Division by zero error!');
        return;
      }
      result = firstOperand % secondOperand;
      operationStr = `MOD: ${firstOperand} % ${secondOperand} = ${result}`;
      addAssemblyCode(`POP BX         ; BX = ${secondOperand}`);
      addAssemblyCode(`POP AX         ; AX = ${firstOperand}`);
      addAssemblyCode(`XOR DX, DX     ; Clear DX`);
      addAssemblyCode(`DIV BX         ; AX = quotient, DX = remainder`);
      addAssemblyCode(`PUSH DX        ; Push remainder`);
      addAssemblyCode('');
      break;
    default:
      stackMemory.push(firstOperand, secondOperand); // Restore stack
      registers.SP -= 2;
      return;
  }
  
  // Update flags based on result
  updateFlags(result, firstOperand, secondOperand, operation);
  
  // Update performance
  updatePerformanceMetrics();
  
  // Store result in AX and push back to stack
  registers.AX = result;
  stackMemory.push(result);
  registers.SP--;
  
  currentDisplay = result.toString();
  
  updateDisplay();
  updateStackDisplay();
  updateStackSize();
  updateRegistersDisplay();
  addToHistory(operationStr);
  
  console.log('8086 Operation completed:', operationStr);
}

// Make functions globally accessible
window.inputOperation = inputOperation;

function calculateResult() {
  // In 8086 mode, this just shows the top of stack
  if (stackMemory.length === 0) {
    addToHistory('Stack is empty');
    alert('Stack is empty!');
    return;
  }
  
  const topValue = stackMemory[stackMemory.length - 1];
  currentDisplay = topValue.toString();
  registers.AX = topValue;
  
  updateDisplay();
  updateRegistersDisplay();
  addToHistory(`Display top of stack: ${topValue}`);
  
  console.log('Showing top of stack:', topValue);
}

// Make all calculator functions globally accessible
window.calculateResult = calculateResult;

function pushToStack() {
  if (stackMemory.length >= MAX_STACK_SIZE) {
    addToHistory('Stack Overflow!');
    alert('Stack Overflow! Maximum ' + MAX_STACK_SIZE + ' elements allowed.');
    return;
  }
  
  const value = parseInt(currentDisplay);
  if (isNaN(value)) {
    addToHistory('Invalid number for PUSH');
    alert('Invalid number!');
    return;
  }
  
  // Check if animation mode is enabled
  if (stackAnimationState.enabled) {
    // Queue animation instead of immediate execution
    queueAnimation('PUSH', value);
  }
  
  // 8086 PUSH operation
  stackMemory.push(value);
  registers.SP--;  // Stack pointer decreases (stack grows downward)
  registers.DX = value;  // Store last pushed value in DX
  
  // Sync with Memory Viewer (write to stack segment)
  if (typeof memoryViewerState !== 'undefined' && memoryViewerState.memory) {
    const stackBase = memoryViewerState.segmentRegisters.SS * 16 + 0xFFFF;
    const stackAddr = stackBase - ((stackMemory.length - 1) * 2);
    
    if (stackAddr > 0 && stackAddr < memoryViewerState.memory.length) {
      memoryViewerState.memory[stackAddr] = value & 0xFF;           // Low byte
      memoryViewerState.memory[stackAddr - 1] = (value >> 8) & 0xFF; // High byte
      memoryViewerState.writtenAddresses.add(stackAddr);
      memoryViewerState.writtenAddresses.add(stackAddr - 1);
      
      // If memory viewer is visible and on stack segment, refresh
      if (memoryViewerState.selectedSegment === 'stack') {
        setTimeout(() => renderMemoryGrid(), 100);
      }
    }
  }
  
  // Generate assembly code
  addAssemblyCode(`MOV AX, ${value}    ; Load value into AX`);
  addAssemblyCode(`PUSH AX        ; Push AX onto stack`);
  addAssemblyCode('');
  
  // Update flags
  updateFlags(value, 0, 0, '');
  
  // Update performance
  updatePerformanceMetrics();
  
  addToHistory(`PUSH ${value} → Stack`);
  console.log('PUSH operation:', value, 'Stack size:', stackMemory.length);
  
  // Clear display for next input
  currentDisplay = '0';
  registers.AX = 0;
  
  updateDisplay();
  updateStackDisplay('push');  // Add push animation
  updateStackSize();
  updateRegistersDisplay();
}

function popFromStack() {
  if (stackMemory.length === 0) {
    addToHistory('Stack Underflow!');
    alert('Stack Underflow! Stack is empty.');
    return;
  }
  
  // Check if animation mode is enabled
  if (stackAnimationState.enabled) {
    // Queue animation instead of immediate execution
    queueAnimation('POP', null);
  }
  
  // 8086 POP operation
  const value = stackMemory.pop();
  registers.SP++;  // Stack pointer increases (stack shrinks)
  registers.AX = value;  // Store popped value in AX
  
  // Sync with Memory Viewer (clear from stack segment)
  if (typeof memoryViewerState !== 'undefined' && memoryViewerState.memory) {
    const stackBase = memoryViewerState.segmentRegisters.SS * 16 + 0xFFFF;
    const stackAddr = stackBase - (stackMemory.length * 2);
    
    if (stackAddr > 0 && stackAddr < memoryViewerState.memory.length) {
      memoryViewerState.memory[stackAddr] = 0x00;     // Clear low byte
      memoryViewerState.memory[stackAddr - 1] = 0x00;  // Clear high byte
      
      // If memory viewer is visible and on stack segment, refresh
      if (memoryViewerState.selectedSegment === 'stack') {
        setTimeout(() => renderMemoryGrid(), 100);
      }
    }
  }
  
  currentDisplay = value.toString();
  
  // Generate assembly code
  addAssemblyCode(`POP AX         ; Pop value from stack`);
  addAssemblyCode(`; AX = ${value}`);
  addAssemblyCode('');
  
  // Update flags
  updateFlags(value, 0, 0, '');
  
  // Update performance
  updatePerformanceMetrics();
  
  addToHistory(`POP ${value} ← Stack`);
  console.log('POP operation:', value, 'Stack size:', stackMemory.length);
  
  updateDisplay();
  updateStackDisplay();
  updateStackSize();
  updateRegistersDisplay();
}

function peekStack() {
  if (stackMemory.length === 0) {
    addToHistory('Stack is empty');
    alert('Stack is empty!');
    return;
  }
  
  // 8086 PEEK operation (non-destructive read)
  const topValue = stackMemory[stackMemory.length - 1];
  currentDisplay = topValue.toString();
  registers.AX = topValue;
  
  addToHistory(`PEEK: Top of stack = ${topValue}`);
  console.log('PEEK operation:', topValue);
  
  updateDisplay();
  updateStackDisplay('peek');  // Add highlight animation
  updateRegistersDisplay();
}

function clearDisplay() {
  currentDisplay = '0';
  registers.AX = 0;
  updateDisplay();
  updateRegistersDisplay();
  addToHistory('Clear display');
}

function clearStack() {
  stackMemory = [];
  registers.SP = MAX_STACK_SIZE;
  operationHistory = [];
  updateStackDisplay();
  updateStackSize();
  updateRegistersDisplay();
  addToHistory('Stack cleared');
  console.log('Stack and history cleared');
}

function clearAll() {
  clearDisplay();
  clearStack();
  addToHistory('System reset');
}

function updateDisplay() {
  console.log('updateDisplay called with:', currentDisplay);
  const displayElement = document.getElementById('displayRegister');
  if (displayElement) {
    displayElement.textContent = currentDisplay;
    console.log('Display updated successfully');
  } else {
    console.error('Display register element not found!');
  }
  
  // Update Signed Number Representations
  updateSignedRepresentations();
}

function updateStackDisplay(animationType = 'none') {
  const stackContent = document.getElementById('stackContent');
  
  if (!stackContent) {
    console.error('Stack content element not found!');
    return;
  }
  
  if (stackMemory.length === 0) {
    stackContent.innerHTML = '<div class="stack-empty-message">Stack Empty</div>';
  } else {
    let html = '';
    for (let i = stackMemory.length - 1; i >= 0; i--) {
      const isTop = i === stackMemory.length - 1;
      let animationClass = '';
      
      // Add animation class to the top item
      if (isTop && animationType !== 'none') {
        if (animationType === 'push') {
          animationClass = 'push-animation';
        } else if (animationType === 'peek') {
          animationClass = 'highlight-animation';
        }
      }
      
      html += `<div class="stack-item ${isTop ? 'stack-top' : ''} ${animationClass}">${stackMemory[i]}</div>`;
    }
    stackContent.innerHTML = html;
  }
  
  // Update Memory Viewer to reflect stack changes
  updateMemoryViewer();
}

function updateStackSize() {
  const stackSizeDisplay = document.getElementById('stackSizeDisplay');
  const stackElementCount = document.getElementById('stackElementCount');
  
  if (stackSizeDisplay) {
    stackSizeDisplay.textContent = stackMemory.length;
  } else {
    console.error('Stack size display element not found!');
  }
  
  if (stackElementCount) {
    stackElementCount.textContent = `${stackMemory.length}/${MAX_STACK_SIZE}`;
  } else {
    console.error('Stack element count element not found!');
  }
}

// New function to update register display
function updateRegistersDisplay() {
  // Update individual register displays if they exist
  const elements = {
    'regAX': registers.AX,
    'regBX': registers.BX, 
    'regCX': registers.CX,
    'regDX': registers.DX,
    'regSP': registers.SP
  };
  
  for (const [id, value] of Object.entries(elements)) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }
  
  console.log('Registers:', registers);
}

// Update Flags Register Display
function updateFlagsDisplay() {
  console.log('updateFlagsDisplay called with flags:', flags);
  
  const flagElements = {
    'flagZero': flags.ZF,
    'flagCarry': flags.CF,
    'flagSign': flags.SF,
    'flagOverflow': flags.OF,
    'flagParity': flags.PF,
    'flagAuxiliary': flags.AF
  };
  
  for (const [id, value] of Object.entries(flagElements)) {
    const element = document.getElementById(id);
    if (element) {
      const statusSpan = element.querySelector('.flag-status');
      if (statusSpan) {
        statusSpan.textContent = value;
        console.log(`Updated ${id} to ${value}`);
      } else {
        console.error(`Status span not found for ${id}`);
      }
      // Add 'active' class if flag is set
      if (value === 1) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    } else {
      console.error(`Element not found: ${id}`);
    }
  }
  
  console.log('Flags display updated');
}

// Calculate and update flags based on result
function updateFlags(result, operand1 = 0, operand2 = 0, operation = '') {
  console.log('updateFlags called:', { result, operand1, operand2, operation });
  
  // Zero Flag: Set if result is 0
  flags.ZF = (result === 0) ? 1 : 0;
  
  // Sign Flag: Set if result is negative (bit 15 is 1)
  flags.SF = (result < 0) ? 1 : 0;
  
  // Parity Flag: Set if number of 1 bits in lower 8 bits is even
  const lowerByte = Math.abs(result) & 0xFF;
  const ones = lowerByte.toString(2).split('1').length - 1;
  flags.PF = (ones % 2 === 0) ? 1 : 0;
  
  // Carry Flag: Set if unsigned overflow
  if (operation === '+') {
    flags.CF = ((operand1 + operand2) > 65535) ? 1 : 0;
  } else if (operation === '-') {
    flags.CF = (operand1 < operand2) ? 1 : 0;
  } else {
    flags.CF = 0;
  }
  
  // Overflow Flag: Set if signed overflow
  const max16bit = 32767;
  const min16bit = -32768;
  flags.OF = (result > max16bit || result < min16bit) ? 1 : 0;
  
  // Auxiliary Carry Flag: Set if carry from bit 3 to bit 4
  if (operation === '+') {
    flags.AF = (((operand1 & 0xF) + (operand2 & 0xF)) > 0xF) ? 1 : 0;
  } else if (operation === '-') {
    flags.AF = (((operand1 & 0xF) - (operand2 & 0xF)) < 0) ? 1 : 0;
  } else {
    flags.AF = 0;
  }
  
  console.log('Flags updated:', flags);
  updateFlagsDisplay();
}

// Update Performance Metrics
function updatePerformanceMetrics() {
  performanceMetrics.totalOperations++;
  performanceMetrics.lastOperationTime = Date.now() - performanceMetrics.startTime;
  
  const totalOpsElement = document.getElementById('totalOperations');
  const stackUsageElement = document.getElementById('stackUsage');
  const execTimeElement = document.getElementById('execTime');
  
  if (totalOpsElement) {
    totalOpsElement.textContent = performanceMetrics.totalOperations;
  }
  
  if (stackUsageElement) {
    const usage = Math.round((stackMemory.length / MAX_STACK_SIZE) * 100);
    stackUsageElement.textContent = usage + '%';
  }
  
  if (execTimeElement) {
    execTimeElement.textContent = performanceMetrics.lastOperationTime + 'ms';
  }
}

// Add Assembly Code Line
function addAssemblyCode(instruction) {
  assemblyCodeLines.push(instruction);
  
  // Keep only last 20 lines (plus header)
  if (assemblyCodeLines.length > 23) {
    assemblyCodeLines = [
      assemblyCodeLines[0],
      assemblyCodeLines[1],
      assemblyCodeLines[2],
      ...assemblyCodeLines.slice(-20)
    ];
  }
  
  updateAssemblyDisplay();
}

// Update Assembly Code Display
function updateAssemblyDisplay() {
  const assemblyElement = document.getElementById('assemblyCode');
  if (assemblyElement) {
    assemblyElement.innerHTML = assemblyCodeLines.map((line, index) => {
      let className = 'asm-line';
      if (line.startsWith(';')) {
        className += ' comment';
      } else if (line.includes(':')) {
        className += ' label';
      } else if (line.trim().length > 0) {
        className += ' instruction';
      }
      return `<div class="${className}">${line}</div>`;
    }).join('');
    
    // Auto-scroll to bottom
    assemblyElement.scrollTop = assemblyElement.scrollHeight;
  }
}

// Copy Assembly Code to Clipboard
function copyAssemblyCode() {
  const codeText = assemblyCodeLines.join('\n');
  navigator.clipboard.writeText(codeText).then(() => {
    alert('Assembly code copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy:', err);
    alert('Failed to copy assembly code');
  });
}

// Clear Assembly Code
function clearAssemblyCode() {
  assemblyCodeLines = [
    '; 8086 Assembly Code',
    '; Generated automatically from operations',
    ''
  ];
  updateAssemblyDisplay();
  addToHistory('Assembly code cleared');
}

// Function to add operation to history
function addToHistory(operation) {
  operationHistory.push(`${new Date().toLocaleTimeString()}: ${operation}`);
  
  // Keep only last 10 operations
  if (operationHistory.length > 10) {
    operationHistory.shift();
  }
  
  // Update history display if element exists
  const historyElement = document.getElementById('operationHistory');
  if (historyElement) {
    historyElement.innerHTML = operationHistory.map(op => 
      `<div class="history-item">${op}</div>`
    ).join('');
    
    // Scroll to bottom
    historyElement.scrollTop = historyElement.scrollHeight;
  }
}

// Make all calculator functions globally accessible
window.pushToStack = pushToStack;
window.popFromStack = popFromStack;
window.peekStack = peekStack;
window.clearDisplay = clearDisplay;
window.clearStack = clearStack;
window.clearAll = clearAll;
window.copyAssemblyCode = copyAssemblyCode;
window.clearAssemblyCode = clearAssemblyCode;

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
  generateASCIITable();
  
  console.log('DOM loaded, initializing dropdowns...');
  
  // Initialize dropdowns with simple, bulletproof approach
  function initDropdown(wrapperId) {
    console.log('Initializing dropdown:', wrapperId);
    
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) {
      console.error('Wrapper not found:', wrapperId);
      return;
    }
    
    const button = wrapper.querySelector('.dropdown-selected');
    const list = wrapper.querySelector('.dropdown-list');
    const textSpan = wrapper.querySelector('.selected-text');
    const hiddenInput = wrapper.querySelector('input[type="hidden"]');
    
    console.log('Elements found:', {
      button: !!button,
      list: !!list,
      textSpan: !!textSpan,
      hiddenInput: !!hiddenInput
    });
    
    if (!button || !list || !textSpan || !hiddenInput) {
      console.error('Missing elements in dropdown:', wrapperId);
      return;
    }
    
    // Function to position dropdown intelligently
    function positionDropdown() {
      if (wrapper.classList.contains('open')) {
        // Reset styles first
        list.style.maxHeight = '';
        list.style.overflowY = '';
        
        const rect = button.getBoundingClientRect();
        const listRect = list.getBoundingClientRect();
        const dropdownHeight = list.scrollHeight + 20; // Add padding
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        let top, left;
        
        // Check if dropdown fits below the button
        if (rect.bottom + dropdownHeight <= viewportHeight - 10) {
          // Position below
          top = rect.bottom + 4;
          list.style.maxHeight = 'none';
          list.style.overflowY = 'visible';
        } else if (rect.top - dropdownHeight >= 10) {
          // Position above
          top = rect.top - dropdownHeight - 4;
          list.style.maxHeight = 'none';
          list.style.overflowY = 'visible';
        } else {
          // Position below with scroll if more space below
          if (viewportHeight - rect.bottom > rect.top) {
            top = rect.bottom + 4;
            list.style.maxHeight = (viewportHeight - rect.bottom - 20) + 'px';
          } else {
            // Position above with scroll
            top = 10;
            list.style.maxHeight = (rect.top - 20) + 'px';
          }
          list.style.overflowY = 'auto';
        }
        
        // Check horizontal positioning
        if (rect.left + rect.width <= viewportWidth - 10) {
          left = rect.left;
        } else {
          left = Math.max(10, viewportWidth - rect.width - 10);
        }
        
        list.style.top = top + 'px';
        list.style.left = left + 'px';
        list.style.width = rect.width + 'px';
      }
    }
    
    // Click to toggle dropdown
    button.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Button clicked for:', wrapperId);
      
      // Close other dropdowns
      document.querySelectorAll('.modern-dropdown').forEach(function(d) {
        if (d !== wrapper) d.classList.remove('open');
      });
      
      // Toggle this one
      wrapper.classList.toggle('open');
      
      // Position dropdown after opening
      if (wrapper.classList.contains('open')) {
        positionDropdown();
        
        // Add scroll listener to reposition on scroll
        window.addEventListener('scroll', positionDropdown);
        window.addEventListener('resize', positionDropdown);
      } else {
        // Remove scroll listeners when closed
        window.removeEventListener('scroll', positionDropdown);
        window.removeEventListener('resize', positionDropdown);
      }
      
      console.log('Dropdown is now:', wrapper.classList.contains('open') ? 'OPEN' : 'CLOSED');
    };
    
    // Click on options
    const options = list.querySelectorAll('li');
    options.forEach(function(option) {
      option.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const value = option.getAttribute('data-value');
        console.log('Option clicked:', value, option.textContent);
        
        // Update display
        textSpan.textContent = option.textContent;
        hiddenInput.value = value;
        
        // Update selected state
        options.forEach(function(opt) { opt.classList.remove('selected'); });
        option.classList.add('selected');
        
        // Handle custom input
        const customInputId = 'custom' + hiddenInput.id.charAt(0).toUpperCase() + hiddenInput.id.slice(1);
        const customInput = document.getElementById(customInputId);
        if (customInput) {
          customInput.style.display = value === 'custom' ? 'block' : 'none';
        }
        
        // Close dropdown and remove scroll listeners
        wrapper.classList.remove('open');
        window.removeEventListener('scroll', positionDropdown);
        window.removeEventListener('resize', positionDropdown);
      };
    });
    
    console.log('Dropdown fully initialized:', wrapperId);
  }
  
  // Initialize all dropdowns
  initDropdown('fromBaseWrapper');
  initDropdown('toBaseWrapper');
  initDropdown('greyTypeWrapper');
  initDropdown('bcdTypeWrapper');
  initDropdown('excess3TypeWrapper');
  initDropdown('asciiTypeWrapper');
  initDropdown('parityTypeWrapper');
  initDropdown('operationWrapper');
  initDropdown('complementTypeWrapper');
  initDropdown('bcdOperationWrapper');
  initDropdown('signMagInputTypeWrapper');
  initDropdown('onesCompInputTypeWrapper');
  initDropdown('twosCompInputTypeWrapper');
  initDropdown('singleInputTypeWrapper');
  initDropdown('doubleInputTypeWrapper');
  
  // Close dropdowns when clicking outside
  document.onclick = function(e) {
    if (!e.target.closest('.modern-dropdown')) {
      document.querySelectorAll('.modern-dropdown').forEach(function(d) {
        d.classList.remove('open');
      });
      // Remove all scroll listeners when closing dropdowns
      const allDropdowns = ['fromBaseWrapper', 'toBaseWrapper', 'greyTypeWrapper', 'bcdTypeWrapper', 'excess3TypeWrapper', 'asciiTypeWrapper', 'parityTypeWrapper', 'operationWrapper', 'complementTypeWrapper', 'bcdOperationWrapper', 'signMagInputTypeWrapper', 'onesCompInputTypeWrapper', 'twosCompInputTypeWrapper', 'singleInputTypeWrapper', 'doubleInputTypeWrapper'];
      // Note: We can't easily remove specific listeners here, but they'll be cleaned up when dropdowns are reopened
    }
  };
  
  console.log('All dropdowns initialized successfully!');
  
  // Initialize stack calculator variables
  console.log('Initializing stack calculator on page load...');
  if (typeof stackMemory === 'undefined') {
    console.log('Stack calculator not initialized, initializing now...');
    initStackCalculator();
  }
});

// ========================================
// MEMORY VIEWER FUNCTIONS
// ========================================

// Initialize Inline Stack Memory Viewer (16 memory locations from FFFFH to FFF0H)
function initInlineMemoryViewer() {
  // Simple inline grid for 8086 Stack tab
  const memoryGridSimple = document.querySelector('.memory-grid-simple');
  
  const gridsToInit = [memoryGridSimple].filter(g => g !== null);
  
  gridsToInit.forEach(grid => {
    grid.innerHTML = '';
    
    // Create 16 memory cells (FFFFH down to FFF0H)
    for (let i = 0; i < 16; i++) {
      const address = (0xFFFF - (i * 2)).toString(16).toUpperCase();
      const memoryCell = document.createElement('div');
      memoryCell.className = 'memory-cell';
      memoryCell.dataset.address = address;
      
      memoryCell.innerHTML = `
        <div class="memory-address">${address}H</div>
        <div class="memory-value">----</div>
        <div class="memory-status">Empty</div>
      `;
      
      grid.appendChild(memoryCell);
    }
  });
  
  updateMemoryViewer();
}

// Update Memory Viewer to reflect current stack state
function updateMemoryViewer() {
  // Update simple inline grid
  const memoryGridSimple = document.querySelector('.memory-grid-simple');
  
  const gridsToUpdate = [memoryGridSimple].filter(g => g !== null);
  
  gridsToUpdate.forEach(grid => {
    const memoryCells = grid.querySelectorAll('.memory-cell');
  
  memoryCells.forEach((cell, index) => {
    const address = cell.dataset.address;
    const addressValue = parseInt(address, 16);
    const valueDiv = cell.querySelector('.memory-value');
    const statusDiv = cell.querySelector('.memory-status');
    
    // Calculate stack position
    const stackIndex = Math.floor((0xFFFF - addressValue) / 2);
    const currentSP = registers.SP;
    const maxIndex = MAX_STACK_SIZE;
    
    // Reset classes
    cell.className = 'memory-cell';
    
    // Check if this location contains stack data
    if (stackIndex < stackMemory.length && stackMemory[stackIndex] !== undefined) {
      cell.classList.add('occupied');
      valueDiv.textContent = stackMemory[stackIndex].toString(16).toUpperCase().padStart(4, '0') + 'H';
      statusDiv.textContent = 'Occupied';
      
      // Check if this is the current SP position
      if (currentSP === (maxIndex - stackIndex)) {
        cell.classList.remove('occupied');
        cell.classList.add('stack-pointer');
        statusDiv.textContent = 'SP → ' + currentSP.toString(16).toUpperCase() + 'H';
      }
    } else {
      valueDiv.textContent = '----';
      statusDiv.textContent = 'Empty';
    }
  });
  }); // Close gridsToUpdate.forEach
}

// ========================================
// SIGNED NUMBER REPRESENTATIONS FUNCTIONS
// ========================================

// Convert decimal to Sign-Magnitude (8-bit)
function toSignMagnitude(decimal) {
  if (decimal === 0) return '0000 0000';
  
  const isNegative = decimal < 0;
  const magnitude = Math.abs(decimal);
  
  if (magnitude > 127) return 'Overflow';
  
  let binary = magnitude.toString(2).padStart(7, '0');
  let signBit = isNegative ? '1' : '0';
  
  let result = signBit + binary;
  return result.slice(0, 4) + ' ' + result.slice(4);
}

// Convert decimal to 1's Complement (8-bit)
function toOnesComplement(decimal) {
  if (decimal === 0) return '0000 0000';
  
  if (decimal > 127 || decimal < -127) return 'Overflow';
  
  if (decimal > 0) {
    let binary = decimal.toString(2).padStart(8, '0');
    return binary.slice(0, 4) + ' ' + binary.slice(4);
  } else {
    // Negative: invert all bits of positive
    let positive = Math.abs(decimal).toString(2).padStart(8, '0');
    let inverted = '';
    for (let bit of positive) {
      inverted += bit === '0' ? '1' : '0';
    }
    return inverted.slice(0, 4) + ' ' + inverted.slice(4);
  }
}

// Convert decimal to 2's Complement (8-bit)
function toTwosComplement(decimal) {
  if (decimal > 127 || decimal < -128) return 'Overflow';
  
  if (decimal >= 0) {
    let binary = decimal.toString(2).padStart(8, '0');
    return binary.slice(0, 4) + ' ' + binary.slice(4);
  } else {
    // Negative: invert bits and add 1
    let positive = Math.abs(decimal).toString(2).padStart(8, '0');
    let inverted = '';
    for (let bit of positive) {
      inverted += bit === '0' ? '1' : '0';
    }
    
    // Add 1
    let carry = 1;
    let result = '';
    for (let i = 7; i >= 0; i--) {
      let sum = parseInt(inverted[i]) + carry;
      result = (sum % 2) + result;
      carry = Math.floor(sum / 2);
    }
    
    return result.slice(0, 4) + ' ' + result.slice(4);
  }
}

// Update Signed Number Representations display (for 8086 tab - simple version)
function updateSignedRepresentations() {
  const value = parseInt(currentDisplay) || 0;
  
  // Update Sign-Magnitude
  const signMagSection = document.getElementById('signMagnitudeValue');
  if (signMagSection) {
    signMagSection.querySelector('.value-display').textContent = toSignMagnitude(value);
    signMagSection.querySelector('.value-display-dec').textContent = value;
  }
  
  // Update 1's Complement
  const onesCompSection = document.getElementById('onesComplementValue');
  if (onesCompSection) {
    onesCompSection.querySelector('.value-display').textContent = toOnesComplement(value);
    onesCompSection.querySelector('.value-display-dec').textContent = value;
  }
  
  // Update 2's Complement
  const twosCompSection = document.getElementById('twosComplementValue');
  if (twosCompSection) {
    twosCompSection.querySelector('.value-display').textContent = toTwosComplement(value);
    twosCompSection.querySelector('.value-display-dec').textContent = value;
  }
}

// Sign-Magnitude Converter
function convertSignMagnitude() {
  const input = document.getElementById('signMagInput');
  const inputType = document.getElementById('signMagInputType').value;
  const inputValue = input.value.trim();
  
  if (!inputValue) {
    alert('Please enter a value');
    return;
  }
  
  let value, result, isNegative, absValue, magnitude7bit, signBit;
  
  if (inputType === 'decimal') {
    // Input is decimal
    value = parseInt(inputValue);
    if (isNaN(value) || value < -127 || value > 127) {
      alert('Please enter a valid number between -127 and 127');
      return;
    }
    
    isNegative = value < 0;
    absValue = Math.abs(value);
    magnitude7bit = absValue.toString(2).padStart(7, '0');
    signBit = isNegative ? '1' : '0';
    result = signBit + magnitude7bit;
  } else {
    // Input is binary
    const binary = inputValue.replace(/\s/g, '');
    if (!/^[01]{8}$/.test(binary)) {
      alert('Please enter a valid 8-bit binary number (e.g., 10000101)');
      return;
    }
    
    signBit = binary[0];
    magnitude7bit = binary.slice(1);
    isNegative = signBit === '1';
    absValue = parseInt(magnitude7bit, 2);
    value = isNegative ? -absValue : absValue;
    result = binary;
  }
  
  // Display result
  const resultDiv = document.getElementById('signMagResult');
  resultDiv.innerHTML = `
    <div style="font-size: 1.25rem; font-weight: 700; color: #6366f1; font-family: 'Courier New', monospace;">
      ${result.slice(0, 4)} ${result.slice(4)}
    </div>
    <div style="margin-top: 0.5rem; font-size: 0.9rem; color: #374151;">Decimal: ${value} | Binary: ${result}</div>
  `;
  resultDiv.style.display = 'block';
  
  // Display detailed steps
  const stepsDiv = document.getElementById('signMagSteps');
  let stepsHTML = '';
  
  if (inputType === 'decimal') {
    stepsHTML = `<div class="step"><strong>Input:</strong> ${value}₁₀</div>`;
    
    stepsHTML += `<div class="step"><strong>Step 1: Determine the sign</strong><br>`;
    stepsHTML += `Value ${value} is ${isNegative ? 'negative' : 'positive'}, so sign bit = <span style="color: #dc2626; font-weight: 700;">${signBit}</span></div>`;
    
    stepsHTML += `<div class="step"><strong>Step 2: Get absolute value</strong><br>`;
    stepsHTML += `|${value}| = ${absValue}</div>`;
    
    stepsHTML += `<div class="step"><strong>Step 3: Convert magnitude to 7-bit binary</strong><br>`;
    stepsHTML += `${absValue}₁₀ = <span style="color: #059669; font-weight: 700;">${magnitude7bit}</span>₂`;
    if (absValue > 0) {
      stepsHTML += `<br><small style="color: #6b7280;">Division method: ${absValue} ÷ 2 repeatedly</small>`;
    }
    stepsHTML += `</div>`;
    
    stepsHTML += `<div class="step"><strong>Step 4: Combine sign bit + magnitude</strong><br>`;
    stepsHTML += `<span style="color: #dc2626; font-weight: 700;">${signBit}</span> + <span style="color: #059669; font-weight: 700;">${magnitude7bit}</span> = <span style="background: #e0e7ff; padding: 0.2rem 0.5rem; border-radius: 0.25rem; font-family: 'Courier New', monospace;">${result}</span><br>`;
    stepsHTML += `<small style="color: #6b7280;">↑ sign bit (MSB) | magnitude (7 bits) ↑</small></div>`;
  } else {
    stepsHTML = `<div class="step"><strong>Input:</strong> ${result}₂</div>`;
    
    stepsHTML += `<div class="step"><strong>Step 1: Identify sign bit (MSB)</strong><br>`;
    stepsHTML += `Sign bit = <span style="color: #dc2626; font-weight: 700;">${signBit}</span> → ${isNegative ? 'Negative number' : 'Positive number'}</div>`;
    
    stepsHTML += `<div class="step"><strong>Step 2: Extract magnitude (7 bits)</strong><br>`;
    stepsHTML += `Magnitude bits: <span style="color: #059669; font-weight: 700;">${magnitude7bit}</span>₂</div>`;
    
    stepsHTML += `<div class="step"><strong>Step 3: Convert magnitude to decimal</strong><br>`;
    stepsHTML += `${magnitude7bit}₂ = ${absValue}₁₀`;
    if (absValue > 0) {
      stepsHTML += `<br><small style="color: #6b7280;">Positional notation: powers of 2</small>`;
    }
    stepsHTML += `</div>`;
    
    stepsHTML += `<div class="step"><strong>Step 4: Apply sign</strong><br>`;
    stepsHTML += `Result = ${isNegative ? '-' : '+'}${absValue} = <span style="background: #e0e7ff; padding: 0.2rem 0.5rem; border-radius: 0.25rem; font-weight: 700;">${value}</span>₁₀</div>`;
  }
  
  stepsHTML += `<div class="step"><strong>📝 Note:</strong> Sign-Magnitude range is -(2⁷-1) to +(2⁷-1) = <strong>-127 to +127</strong><br>`;
  stepsHTML += `<small style="color: #6b7280;">⚠️ Has two representations for zero: +0 (00000000) and -0 (10000000)</small></div>`;
  
  stepsDiv.innerHTML = stepsHTML;
  stepsDiv.style.display = 'block';
}

// 1's Complement Converter
function convertOnesComplement() {
  const input = document.getElementById('onesCompInput');
  const inputType = document.getElementById('onesCompInputType').value;
  const inputValue = input.value.trim();
  
  if (!inputValue) {
    alert('Please enter a value');
    return;
  }
  
  let value, result, isNegative, absValue, positive8bit;
  
  if (inputType === 'decimal') {
    // Input is decimal
    value = parseInt(inputValue);
    if (isNaN(value) || value < -127 || value > 127) {
      alert('Please enter a valid number between -127 and 127');
      return;
    }
    
    isNegative = value < 0;
    absValue = Math.abs(value);
    positive8bit = absValue.toString(2).padStart(8, '0');
    
    result = positive8bit;
    if (isNegative) {
      result = '';
      for (let bit of positive8bit) {
        result += bit === '0' ? '1' : '0';
      }
    }
  } else {
    // Input is binary
    const binary = inputValue.replace(/\s/g, '');
    if (!/^[01]{8}$/.test(binary)) {
      alert('Please enter a valid 8-bit binary number (e.g., 11111010)');
      return;
    }
    
    result = binary;
    isNegative = binary[0] === '1';
    
    if (isNegative) {
      // Invert to get positive
      positive8bit = '';
      for (let bit of binary) {
        positive8bit += bit === '0' ? '1' : '0';
      }
      absValue = parseInt(positive8bit, 2);
      value = -absValue;
    } else {
      positive8bit = binary;
      value = parseInt(binary, 2);
      absValue = value;
    }
  }
  
  // Display result
  const resultDiv = document.getElementById('onesCompResult');
  resultDiv.innerHTML = `
    <div style="font-size: 1.25rem; font-weight: 700; color: #6366f1; font-family: 'Courier New', monospace;">
      ${result.slice(0, 4)} ${result.slice(4)}
    </div>
    <div style="margin-top: 0.5rem; font-size: 0.9rem; color: #374151;">Decimal: ${value} | Binary: ${result}</div>
  `;
  resultDiv.style.display = 'block';
  
  // Display detailed steps
  const stepsDiv = document.getElementById('onesCompSteps');
  let stepsHTML = '';
  
  if (inputType === 'decimal') {
    stepsHTML = `<div class="step"><strong>Input:</strong> ${value}₁₀</div>`;
    
    stepsHTML = `<div class="step"><strong>Step 1: Convert absolute value to 8-bit binary</strong><br>`;
    stepsHTML += `|${value}| = ${absValue}₁₀ = <span style="color: #059669; font-weight: 700;">${positive8bit}</span>₂`;
    if (absValue > 0) {
      stepsHTML += `<br><small style="color: #6b7280;">Using standard binary conversion</small>`;
    }
    stepsHTML += `</div>`;
    
    if (isNegative) {
      stepsHTML += `<div class="step"><strong>Step 2: Determine sign</strong><br>`;
      stepsHTML += `Value ${value} is <strong>negative</strong>, so we apply 1's complement (invert all bits)</div>`;
      
      stepsHTML += `<div class="step"><strong>Step 3: Invert each bit</strong><br>`;
      stepsHTML += `Positive: <code style="background: #f3f4f6; padding: 0.2rem 0.4rem; border-radius: 0.3rem;">${positive8bit}</code><br>`;
      stepsHTML += `<small style="color: #6b7280;">Flip: 0→1, 1→0</small><br>`;
      stepsHTML += `1's Comp: <code style="background: #dcfce7; padding: 0.2rem 0.4rem; border-radius: 0.3rem; color: #059669; font-weight: 700;">${result}</code></div>`;
      
      stepsHTML += `<div class="step"><strong>✓ Final Result</strong><br>`;
      stepsHTML += `${value}₁₀ = <span style="background: #e0e7ff; padding: 0.2rem 0.5rem; border-radius: 0.25rem; font-family: 'Courier New', monospace; font-weight: 700;">${result}</span>₂</div>`;
    } else {
      stepsHTML += `<div class="step"><strong>Step 2: Determine sign</strong><br>`;
      stepsHTML += `Value ${value} is <strong>positive</strong>, no inversion needed</div>`;
      
      stepsHTML += `<div class="step"><strong>✓ Final Result</strong><br>`;
      stepsHTML += `${value}₁₀ = <span style="background: #e0e7ff; padding: 0.2rem 0.5rem; border-radius: 0.25rem; font-family: 'Courier New', monospace; font-weight: 700;">${result}</span>₂<br>`;
      stepsHTML += `<small style="color: #6b7280;">Positive numbers are same in all representations</small></div>`;
    }
  } else {
    stepsHTML = `<div class="step"><strong>Input:</strong> ${result}₂</div>`;
    
    stepsHTML += `<div class="step"><strong>Step 1: Check MSB (Most Significant Bit)</strong><br>`;
    stepsHTML += `MSB = <span style="color: #dc2626; font-weight: 700;">${result[0]}</span> → ${isNegative ? '<strong>Negative</strong> number' : '<strong>Positive</strong> number'}</div>`;
    
    if (isNegative) {
      stepsHTML += `<div class="step"><strong>Step 2: Invert all bits to decode</strong><br>`;
      stepsHTML += `Given: <code style="background: #f3f4f6; padding: 0.2rem 0.4rem; border-radius: 0.3rem;">${result}</code><br>`;
      stepsHTML += `<small style="color: #6b7280;">Flip: 0→1, 1→0</small><br>`;
      stepsHTML += `Result: <code style="background: #dcfce7; padding: 0.2rem 0.4rem; border-radius: 0.3rem; font-weight: 700;">${positive8bit}</code></div>`;
      
      stepsHTML += `<div class="step"><strong>Step 3: Convert to decimal</strong><br>`;
      stepsHTML += `${positive8bit}₂ = ${absValue}₁₀</div>`;
      
      stepsHTML += `<div class="step"><strong>Step 4: Apply negative sign</strong><br>`;
      stepsHTML += `Result = -${absValue} = <strong>${value}</strong></div>`;
    } else {
      stepsHTML += `<div class="step"><strong>Step 2: Convert to decimal directly</strong><br>`;
      stepsHTML += `${result}₂ = ${value}₁₀</div>`;
    }
  }
  
  stepsHTML += `<div class="step"><strong>Note:</strong> Range is -(2⁷-1) to +(2⁷-1) = <strong>-127 to +127</strong><br>`;
  stepsHTML += `<small style="color: #6b7280;">⚠️ Has two zeros: +0 (00000000) and -0 (11111111)</small></div>`;
  
  stepsDiv.innerHTML = stepsHTML;
  stepsDiv.style.display = 'block';
}

// 2's Complement Converter
function convertTwosComplement() {
  const input = document.getElementById('twosCompInput');
  const inputType = document.getElementById('twosCompInputType').value;
  const inputValue = input.value.trim();
  
  if (!inputValue) {
    alert('Please enter a value');
    return;
  }
  
  let value, result, isNegative, absValue, positive8bit, inverted = '';
  
  if (inputType === 'decimal') {
    // Input is decimal
    value = parseInt(inputValue);
    if (isNaN(value) || value < -128 || value > 127) {
      alert('Please enter a valid number between -128 and 127');
      return;
    }
    
    isNegative = value < 0;
    absValue = Math.abs(value);
    positive8bit = absValue.toString(2).padStart(8, '0');
    
    result = positive8bit;
    
    if (isNegative) {
      // Invert bits
      for (let bit of positive8bit) {
        inverted += bit === '0' ? '1' : '0';
      }
      // Add 1
      let carry = 1;
      result = '';
      for (let i = 7; i >= 0; i--) {
        let sum = parseInt(inverted[i]) + carry;
        result = (sum % 2) + result;
        carry = Math.floor(sum / 2);
      }
    }
  } else {
    // Input is binary
    const binary = inputValue.replace(/\s/g, '');
    if (!/^[01]{8}$/.test(binary)) {
      alert('Please enter a valid 8-bit binary number (e.g., 11111011)');
      return;
    }
    
    result = binary;
    isNegative = binary[0] === '1';
    
    if (isNegative) {
      // Subtract 1
      let carry = 1;
      let minusOne = '';
      for (let i = 7; i >= 0; i--) {
        let diff = parseInt(binary[i]) - carry;
        if (diff < 0) {
          diff = 1;
          carry = 1;
        } else {
          carry = 0;
        }
        minusOne = diff + minusOne;
      }
      
      // Invert to get positive
      positive8bit = '';
      for (let bit of minusOne) {
        positive8bit += bit === '0' ? '1' : '0';
      }
      absValue = parseInt(positive8bit, 2);
      value = -absValue;
      inverted = minusOne;
    } else {
      positive8bit = binary;
      value = parseInt(binary, 2);
      absValue = value;
    }
  }
  
  // Display result
  const resultDiv = document.getElementById('twosCompResult');
  resultDiv.innerHTML = `
    <div style="font-size: 1.25rem; font-weight: 700; color: #6366f1; font-family: 'Courier New', monospace;">
      ${result.slice(0, 4)} ${result.slice(4)}
    </div>
    <div style="margin-top: 0.5rem; font-size: 0.9rem; color: #374151;">Decimal: ${value} | Binary: ${result}</div>
  `;
  resultDiv.style.display = 'block';
  
  // Display detailed steps
  const stepsDiv = document.getElementById('twosCompSteps');
  let stepsHTML = '';
  
  if (inputType === 'decimal') {
    stepsHTML = `<div class="step"><strong>Input:</strong> ${value}₁₀</div>`;
    
    stepsHTML += `<div class="step"><strong>Step 1: Convert absolute value to 8-bit binary</strong><br>`;
    stepsHTML += `|${value}| = ${absValue}₁₀ = <span style="color: #059669; font-weight: 700;">${positive8bit}</span>₂`;
    if (absValue > 0) {
      stepsHTML += `<br><small style="color: #6b7280;">Using standard binary conversion</small>`;
    }
    stepsHTML += `</div>`;
    
    if (isNegative) {
      stepsHTML += `<div class="step"><strong>Step 2: Determine sign</strong><br>`;
      stepsHTML += `Value ${value} is <strong>negative</strong>, apply 2's complement (invert + add 1)</div>`;
      
      stepsHTML += `<div class="step"><strong>Step 3: Invert all bits (1's complement)</strong><br>`;
      stepsHTML += `Positive: <code style="background: #f3f4f6; padding: 0.2rem 0.4rem; border-radius: 0.3rem;">${positive8bit}</code><br>`;
      stepsHTML += `<small style="color: #6b7280;">Flip: 0→1, 1→0</small><br>`;
      stepsHTML += `Inverted: <code style="background: #fef3c7; padding: 0.2rem 0.4rem; border-radius: 0.3rem; color: #92400e; font-weight: 700;">${inverted}</code></div>`;
      
      stepsHTML += `<div class="step"><strong>Step 4: Add 1 to get 2's complement</strong><br>`;
      stepsHTML += `<pre style="font-family: 'Courier New', monospace; margin: 0.5rem 0;">  ${inverted}\n+ 00000001\n──────────\n  <span style="color: #059669; font-weight: 700;">${result}</span></pre>`;
      stepsHTML += `<small style="color: #6b7280;">Binary addition with carry propagation</small></div>`;
      
      stepsHTML += `<div class="step"><strong>✓ Final Result</strong><br>`;
      stepsHTML += `${value}₁₀ = <span style="background: #e0e7ff; padding: 0.2rem 0.5rem; border-radius: 0.25rem; font-family: 'Courier New', monospace; font-weight: 700;">${result}</span>₂</div>`;
    } else {
      stepsHTML += `<div class="step"><strong>Step 2: Determine sign</strong><br>`;
      stepsHTML += `Value ${value} is <strong>positive</strong>, no conversion needed</div>`;
      
      stepsHTML += `<div class="step"><strong>✓ Final Result</strong><br>`;
      stepsHTML += `${value}₁₀ = <span style="background: #e0e7ff; padding: 0.2rem 0.5rem; border-radius: 0.25rem; font-family: 'Courier New', monospace; font-weight: 700;">${result}</span>₂<br>`;
      stepsHTML += `<small style="color: #6b7280;">Positive numbers are identical in all representations</small></div>`;
    }
  } else {
    stepsHTML = `<div class="step"><strong>Input:</strong> ${result}₂</div>`;
    
    stepsHTML += `<div class="step"><strong>Step 1: Check MSB (Most Significant Bit)</strong><br>`;
    stepsHTML += `MSB = <span style="color: #dc2626; font-weight: 700;">${result[0]}</span> → ${isNegative ? '<strong>Negative</strong> number' : '<strong>Positive</strong> number'}</div>`;
    
    if (isNegative) {
      stepsHTML += `<div class="step"><strong>Step 2: Subtract 1 from binary</strong><br>`;
      stepsHTML += `<pre style="font-family: 'Courier New', monospace; margin: 0.5rem 0;">  ${result}\n- 00000001\n──────────\n  <span style="font-weight: 700;">${inverted}</span></pre></div>`;
      
      stepsHTML += `<div class="step"><strong>Step 3: Invert all bits</strong><br>`;
      stepsHTML += `After -1: <code style="background: #f3f4f6; padding: 0.2rem 0.4rem; border-radius: 0.3rem;">${inverted}</code><br>`;
      stepsHTML += `<small style="color: #6b7280;">Flip: 0→1, 1→0</small><br>`;
      stepsHTML += `Inverted: <code style="background: #dcfce7; padding: 0.2rem 0.4rem; border-radius: 0.3rem; font-weight: 700;">${positive8bit}</code></div>`;
      
      stepsHTML += `<div class="step"><strong>Step 4: Convert to decimal</strong><br>`;
      stepsHTML += `${positive8bit}₂ = ${absValue}₁₀</div>`;
      
      stepsHTML += `<div class="step"><strong>✓ Final Result</strong><br>`;
      stepsHTML += `Result = <span style="background: #e0e7ff; padding: 0.2rem 0.5rem; border-radius: 0.25rem; font-weight: 700;">-${absValue}</span> = <strong>${value}₁₀</strong></div>`;
    } else {
      stepsHTML += `<div class="step"><strong>Step 2: Convert to decimal directly</strong><br>`;
      stepsHTML += `${result}₂ = ${value}₁₀<br>`;
      stepsHTML += `<small style="color: #6b7280;">Positive numbers are same in all representations</small></div>`;
    }
  }
  
  stepsHTML += `<div class="step"><strong>📝 Note:</strong> 2's Complement range is -2⁷ to +(2⁷-1) = <strong>-128 to +127</strong><br>`;
  stepsHTML += `<small style="color: #6b7280;">✅ Only one zero representation (00000000), can represent -128 uniquely!</small></div>`;
  
  stepsDiv.innerHTML = stepsHTML;
  stepsDiv.style.display = 'block';
}

// IEEE 754 Single Precision (32-bit) Converter
function convertSinglePrecision() {
  const inputType = document.getElementById('singleInputType').value;
  const input = document.getElementById('singleInput').value.trim();
  const resultDiv = document.getElementById('singleResult');
  const stepsDiv = document.getElementById('singleSteps');

  if (!input) {
    alert('Please enter a value');
    return;
  }

  resultDiv.style.display = 'none';
  stepsDiv.style.display = 'none';
  
  try {
    if (inputType === 'decimal') {
      convertDecimalToSingle(parseFloat(input), resultDiv, stepsDiv);
    } else {
      convertSingleToDecimal(input, resultDiv, stepsDiv);
    }
  } catch (error) {
    alert('Invalid input: ' + error.message);
  }
}

// Convert Decimal to IEEE 754 Single Precision
function convertDecimalToSingle(decimal, resultDiv, stepsDiv) {
  let stepsHTML = '<h4 style="color: #6366f1; font-size: 0.9rem;">Conversion Steps:</h4>';
  
  // Handle special cases
  if (decimal === 0) {
    const signBit = Object.is(decimal, -0) ? '1' : '0';
    const ieee754 = signBit + '00000000' + '00000000000000000000000';
    displaySingleResult(ieee754, '0.0', resultDiv, stepsDiv, stepsHTML + 
      `<div style="background: #f0f9ff; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
        <strong>Zero:</strong> Sign=${signBit}, Exponent=00000000, Mantissa=00000000000000000000000
      </div>`);
    return;
  }

  if (!isFinite(decimal)) {
    const signBit = decimal > 0 ? '0' : '1';
    const ieee754 = signBit + '11111111' + '00000000000000000000000';
    displaySingleResult(ieee754, decimal > 0 ? '+Infinity' : '-Infinity', resultDiv, stepsDiv, stepsHTML + 
      `<div style="background: #fef3c7; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
        <strong>Infinity:</strong> Sign=${signBit}, Exponent=11111111 (all 1s), Mantissa=00000000000000000000000 (all 0s)
      </div>`);
    return;
  }

  if (isNaN(decimal)) {
    const ieee754 = '0' + '11111111' + '10000000000000000000000';
    displaySingleResult(ieee754, 'NaN', resultDiv, stepsDiv, stepsHTML + 
      `<div style="background: #fee2e2; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
        <strong>NaN:</strong> Exponent=11111111 (all 1s), Mantissa≠0
      </div>`);
    return;
  }

  // Step 1: Determine sign
  const signBit = decimal < 0 ? '1' : '0';
  const absValue = Math.abs(decimal);
  stepsHTML += `<div style="background: #fef2f2; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 1: Sign Bit</strong><br/>
    ${decimal} is ${decimal < 0 ? 'negative' : 'positive'} → Sign = <span style="color: #ef4444; font-weight: 700;">${signBit}</span>
  </div>`;

  // Step 2: Convert to binary
  const intPart = Math.floor(absValue);
  const fracPart = absValue - intPart;
  
  let intBinary = intPart === 0 ? '0' : intPart.toString(2);
  let fracBinary = '';
  let tempFrac = fracPart;
  
  for (let i = 0; i < 50 && tempFrac !== 0; i++) {
    tempFrac *= 2;
    if (tempFrac >= 1) {
      fracBinary += '1';
      tempFrac -= 1;
    } else {
      fracBinary += '0';
    }
  }
  
  stepsHTML += `<div style="background: #f0fdf4; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 2: Convert to Binary</strong><br/>
    Integer part: ${intPart} = <span style="color: #059669;">${intBinary}</span><br/>
    Fractional part: 0.${fracPart.toString().split('.')[1] || '0'} ≈ <span style="color: #059669;">0.${fracBinary}</span>
  </div>`;

  // Step 3: Normalize
  let exponent = 0;
  let mantissa = '';
  
  if (intPart >= 1) {
    exponent = intBinary.length - 1;
    mantissa = intBinary.substring(1) + fracBinary;
  } else {
    let firstOne = fracBinary.indexOf('1');
    exponent = -(firstOne + 1);
    mantissa = fracBinary.substring(firstOne + 1);
  }
  
  const normalizedBinary = `1.${mantissa.substring(0, 30)}`;
  stepsHTML += `<div style="background: #eff6ff; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 3: Normalize</strong><br/>
    ${intBinary}.${fracBinary} = ${normalizedBinary} × 2<sup>${exponent}</sup>
  </div>`;

  // Step 4: Calculate biased exponent
  const biasedExponent = exponent + 127;
  const exponentBits = biasedExponent.toString(2).padStart(8, '0');
  
  stepsHTML += `<div style="background: #dbeafe; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 4: Biased Exponent</strong><br/>
    Exponent: ${exponent} + Bias(127) = ${biasedExponent}<br/>
    Binary: <span style="color: #3b82f6; font-weight: 700;">${exponentBits}</span>
  </div>`;

  // Step 5: Extract mantissa
  const mantissaBits = mantissa.padEnd(23, '0').substring(0, 23);
  
  stepsHTML += `<div style="background: #d1fae5; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 5: Mantissa (23 bits)</strong><br/>
    After "1." : <span style="color: #10b981; font-weight: 700;">${mantissaBits}</span>
  </div>`;

  // Final IEEE 754 representation
  const ieee754 = signBit + exponentBits + mantissaBits;
  displaySingleResult(ieee754, decimal.toString(), resultDiv, stepsDiv, stepsHTML);
}

// Convert IEEE 754 Single Precision to Decimal
function convertSingleToDecimal(binary, resultDiv, stepsDiv) {
  if (!/^[01]{32}$/.test(binary)) {
    throw new Error('Binary must be exactly 32 bits (0s and 1s)');
  }

  let stepsHTML = '<h4 style="color: #6366f1; font-size: 0.9rem;">Conversion Steps:</h4>';
  
  // Extract components
  const signBit = binary[0];
  const exponentBits = binary.substring(1, 9);
  const mantissaBits = binary.substring(9, 32);
  
  stepsHTML += `<div style="background: #f3f4f6; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 1: Extract Bits</strong><br/>
    Sign: <span style="color: #ef4444; font-weight: 700;">${signBit}</span> |
    Exponent: <span style="color: #3b82f6; font-weight: 700;">${exponentBits}</span> |
    Mantissa: <span style="color: #10b981; font-weight: 700;">${mantissaBits}</span>
  </div>`;

  const exponentValue = parseInt(exponentBits, 2);
  
  // Check special cases
  if (exponentValue === 255) {
    const isZeroMantissa = mantissaBits === '00000000000000000000000';
    if (isZeroMantissa) {
      const result = signBit === '0' ? '+Infinity' : '-Infinity';
      displaySingleResult(binary, result, resultDiv, stepsDiv, stepsHTML + 
        `<div style="background: #fef3c7; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
          <strong>Infinity Detected:</strong> Exponent = 255, Mantissa = 0
        </div>`);
    } else {
      displaySingleResult(binary, 'NaN', resultDiv, stepsDiv, stepsHTML + 
        `<div style="background: #fee2e2; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
          <strong>NaN Detected:</strong> Exponent = 255, Mantissa ≠ 0
        </div>`);
    }
    return;
  }

  if (exponentValue === 0 && mantissaBits === '00000000000000000000000') {
    const result = signBit === '0' ? '+0' : '-0';
    displaySingleResult(binary, result, resultDiv, stepsDiv, stepsHTML + 
      `<div style="background: #f0f9ff; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
        <strong>Zero Detected:</strong> All bits are 0 except possibly sign
      </div>`);
    return;
  }

  // Calculate actual exponent
  const actualExponent = exponentValue - 127;
  stepsHTML += `<div style="background: #dbeafe; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 2: Calculate Exponent</strong><br/>
    ${exponentValue} - Bias(127) = <span style="color: #3b82f6; font-weight: 700;">${actualExponent}</span>
  </div>`;

  // Calculate mantissa value
  let mantissaValue = 1.0; // Implied leading 1
  for (let i = 0; i < mantissaBits.length; i++) {
    if (mantissaBits[i] === '1') {
      mantissaValue += Math.pow(2, -(i + 1));
    }
  }
  
  stepsHTML += `<div style="background: #d1fae5; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 3: Calculate Mantissa</strong><br/>
    1.${mantissaBits} = <span style="color: #10b981; font-weight: 700;">${mantissaValue.toFixed(10)}</span>
  </div>`;

  // Calculate final value
  const decimalValue = (signBit === '1' ? -1 : 1) * mantissaValue * Math.pow(2, actualExponent);
  
  stepsHTML += `<div style="background: #f3f4f6; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 4: Final Calculation</strong><br/>
    ${signBit === '1' ? '-' : '+'}${mantissaValue.toFixed(6)} × 2<sup>${actualExponent}</sup> = <span style="font-weight: 700;">${decimalValue}</span>
  </div>`;

  displaySingleResult(binary, decimalValue.toString(), resultDiv, stepsDiv, stepsHTML);
}

// Display Single Precision Result
function displaySingleResult(ieee754, decimal, resultDiv, stepsDiv, stepsHTML) {
  const signBit = ieee754[0];
  const exponentBits = ieee754.substring(1, 9);
  const mantissaBits = ieee754.substring(9, 32);
  
  // Calculate hex representation
  const hex = parseInt(ieee754, 2).toString(16).toUpperCase().padStart(8, '0');
  
  resultDiv.innerHTML = `
    <h4 style="color: #6366f1; font-size: 0.9rem; margin-bottom: 0.5rem;">Result:</h4>
    <div style="background: #f9fafb; padding: 0.8rem; border-radius: 0.5rem; border: 1px solid #e5e7eb; margin-bottom: 0.5rem;">
      <div style="font-size: 0.85rem; margin-bottom: 0.5rem;"><strong>Decimal:</strong> <span style="color: #059669; font-weight: 700;">${decimal}</span></div>
      <div style="font-size: 0.75rem; margin-bottom: 0.5rem; word-break: break-all; font-family: 'Courier New', monospace;">
        <strong>IEEE 754:</strong> 
        <span style="color: #ef4444; font-weight: 700;">${signBit}</span>
        <span style="color: #3b82f6; font-weight: 700;">${exponentBits}</span>
        <span style="color: #10b981; font-weight: 700;">${mantissaBits}</span>
      </div>
      <div style="font-size: 0.75rem; font-family: 'Courier New', monospace;">
        <strong>Hexadecimal:</strong> <span style="color: #7c3aed; font-weight: 700;">0x${hex}</span>
      </div>
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4rem; font-size: 0.75rem;">
      <div style="background: #fef2f2; padding: 0.4rem; border-radius: 0.4rem; text-align: center;">
        <div style="color: #ef4444; font-weight: 700;">Sign</div>
        <div style="font-family: 'Courier New', monospace;">${signBit}</div>
      </div>
      <div style="background: #eff6ff; padding: 0.4rem; border-radius: 0.4rem; text-align: center;">
        <div style="color: #3b82f6; font-weight: 700;">Exponent (8)</div>
        <div style="font-family: 'Courier New', monospace;">${exponentBits}</div>
      </div>
      <div style="background: #f0fdf4; padding: 0.4rem; border-radius: 0.4rem; text-align: center;">
        <div style="color: #10b981; font-weight: 700;">Mantissa (23)</div>
        <div style="font-family: 'Courier New', monospace; font-size: 0.7rem;">${mantissaBits}</div>
      </div>
    </div>`;
  
  resultDiv.style.display = 'block';
  stepsDiv.innerHTML = stepsHTML;
  stepsDiv.style.display = 'block';
}

// IEEE 754 Double Precision (64-bit) Converter
function convertDoublePrecision() {
  const inputType = document.getElementById('doubleInputType').value;
  const input = document.getElementById('doubleInput').value.trim();
  const resultDiv = document.getElementById('doubleResult');
  const stepsDiv = document.getElementById('doubleSteps');

  if (!input) {
    alert('Please enter a value');
    return;
  }

  resultDiv.style.display = 'none';
  stepsDiv.style.display = 'none';
  
  try {
    if (inputType === 'decimal') {
      convertDecimalToDouble(parseFloat(input), resultDiv, stepsDiv);
    } else {
      convertDoubleToDecimal(input, resultDiv, stepsDiv);
    }
  } catch (error) {
    alert('Invalid input: ' + error.message);
  }
}

// Convert Decimal to IEEE 754 Double Precision
function convertDecimalToDouble(decimal, resultDiv, stepsDiv) {
  let stepsHTML = '<h4 style="color: #6366f1; font-size: 0.9rem;">Conversion Steps:</h4>';
  
  // Handle special cases
  if (decimal === 0) {
    const signBit = Object.is(decimal, -0) ? '1' : '0';
    const ieee754 = signBit + '00000000000'.padEnd(12, '0') + '0000000000000000000000000000000000000000000000000000';
    displayDoubleResult(ieee754, '0.0', resultDiv, stepsDiv, stepsHTML + 
      `<div style="background: #f0f9ff; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
        <strong>Zero:</strong> All bits are 0
      </div>`);
    return;
  }

  if (!isFinite(decimal)) {
    const signBit = decimal > 0 ? '0' : '1';
    const ieee754 = signBit + '11111111111' + '0000000000000000000000000000000000000000000000000000';
    displayDoubleResult(ieee754, decimal > 0 ? '+Infinity' : '-Infinity', resultDiv, stepsDiv, stepsHTML + 
      `<div style="background: #fef3c7; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
        <strong>Infinity:</strong> Exponent = all 1s, Mantissa = all 0s
      </div>`);
    return;
  }

  if (isNaN(decimal)) {
    const ieee754 = '0' + '11111111111' + '1000000000000000000000000000000000000000000000000000';
    displayDoubleResult(ieee754, 'NaN', resultDiv, stepsDiv, stepsHTML + 
      `<div style="background: #fee2e2; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
        <strong>NaN:</strong> Exponent = all 1s, Mantissa ≠ 0
      </div>`);
    return;
  }

  // Step 1: Determine sign
  const signBit = decimal < 0 ? '1' : '0';
  const absValue = Math.abs(decimal);
  stepsHTML += `<div style="background: #fef2f2; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 1: Sign Bit</strong><br/>
    ${decimal} is ${decimal < 0 ? 'negative' : 'positive'} → Sign = <span style="color: #ef4444; font-weight: 700;">${signBit}</span>
  </div>`;

  // Step 2: Convert to binary
  const intPart = Math.floor(absValue);
  const fracPart = absValue - intPart;
  
  let intBinary = intPart === 0 ? '0' : intPart.toString(2);
  let fracBinary = '';
  let tempFrac = fracPart;
  
  for (let i = 0; i < 60 && tempFrac !== 0; i++) {
    tempFrac *= 2;
    if (tempFrac >= 1) {
      fracBinary += '1';
      tempFrac -= 1;
    } else {
      fracBinary += '0';
    }
  }
  
  stepsHTML += `<div style="background: #f0fdf4; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 2: Convert to Binary</strong><br/>
    Integer: ${intPart} = ${intBinary}<br/>
    Fractional: 0.${fracPart.toString().split('.')[1] || '0'} ≈ 0.${fracBinary.substring(0, 20)}...
  </div>`;

  // Step 3: Normalize
  let exponent = 0;
  let mantissa = '';
  
  if (intPart >= 1) {
    exponent = intBinary.length - 1;
    mantissa = intBinary.substring(1) + fracBinary;
  } else {
    let firstOne = fracBinary.indexOf('1');
    exponent = -(firstOne + 1);
    mantissa = fracBinary.substring(firstOne + 1);
  }
  
  stepsHTML += `<div style="background: #eff6ff; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 3: Normalize</strong><br/>
    1.${mantissa.substring(0, 20)}... × 2<sup>${exponent}</sup>
  </div>`;

  // Step 4: Calculate biased exponent
  const biasedExponent = exponent + 1023;
  const exponentBits = biasedExponent.toString(2).padStart(11, '0');
  
  stepsHTML += `<div style="background: #dbeafe; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 4: Biased Exponent</strong><br/>
    ${exponent} + Bias(1023) = ${biasedExponent}<br/>
    Binary: <span style="color: #3b82f6; font-weight: 700;">${exponentBits}</span>
  </div>`;

  // Step 5: Extract mantissa
  const mantissaBits = mantissa.padEnd(52, '0').substring(0, 52);
  
  stepsHTML += `<div style="background: #d1fae5; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 5: Mantissa (52 bits)</strong><br/>
    <span style="color: #10b981; font-family: 'Courier New', monospace; font-size: 0.7rem;">${mantissaBits}</span>
  </div>`;

  // Final IEEE 754 representation
  const ieee754 = signBit + exponentBits + mantissaBits;
  displayDoubleResult(ieee754, decimal.toString(), resultDiv, stepsDiv, stepsHTML);
}

// Convert IEEE 754 Double Precision to Decimal
function convertDoubleToDecimal(binary, resultDiv, stepsDiv) {
  if (!/^[01]{64}$/.test(binary)) {
    throw new Error('Binary must be exactly 64 bits (0s and 1s)');
  }

  let stepsHTML = '<h4 style="color: #6366f1; font-size: 0.9rem;">Conversion Steps:</h4>';
  
  // Extract components
  const signBit = binary[0];
  const exponentBits = binary.substring(1, 12);
  const mantissaBits = binary.substring(12, 64);
  
  stepsHTML += `<div style="background: #f3f4f6; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 1: Extract Bits</strong><br/>
    Sign: <span style="color: #ef4444;">${signBit}</span> | 
    Exponent (11): <span style="color: #3b82f6; font-family: 'Courier New', monospace;">${exponentBits}</span><br/>
    Mantissa (52): <span style="color: #10b981; font-family: 'Courier New', monospace; font-size: 0.7rem;">${mantissaBits}</span>
  </div>`;

  const exponentValue = parseInt(exponentBits, 2);
  
  // Check special cases
  if (exponentValue === 2047) {
    const isZeroMantissa = /^0+$/.test(mantissaBits);
    if (isZeroMantissa) {
      const result = signBit === '0' ? '+Infinity' : '-Infinity';
      displayDoubleResult(binary, result, resultDiv, stepsDiv, stepsHTML + 
        `<div style="background: #fef3c7; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
          <strong>Infinity Detected</strong>
        </div>`);
    } else {
      displayDoubleResult(binary, 'NaN', resultDiv, stepsDiv, stepsHTML + 
        `<div style="background: #fee2e2; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
          <strong>NaN Detected</strong>
        </div>`);
    }
    return;
  }

  if (exponentValue === 0 && /^0+$/.test(mantissaBits)) {
    displayDoubleResult(binary, signBit === '0' ? '+0' : '-0', resultDiv, stepsDiv, stepsHTML + 
      `<div style="background: #f0f9ff; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
        <strong>Zero Detected</strong>
      </div>`);
    return;
  }

  // Calculate actual exponent
  const actualExponent = exponentValue - 1023;
  stepsHTML += `<div style="background: #dbeafe; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 2: Exponent</strong><br/>
    ${exponentValue} - Bias(1023) = ${actualExponent}
  </div>`;

  // Calculate mantissa value
  let mantissaValue = 1.0;
  for (let i = 0; i < mantissaBits.length; i++) {
    if (mantissaBits[i] === '1') {
      mantissaValue += Math.pow(2, -(i + 1));
    }
  }
  
  stepsHTML += `<div style="background: #d1fae5; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 3: Mantissa</strong> = ${mantissaValue.toFixed(15)}
  </div>`;

  // Calculate final value
  const decimalValue = (signBit === '1' ? -1 : 1) * mantissaValue * Math.pow(2, actualExponent);
  
  stepsHTML += `<div style="background: #f3f4f6; padding: 0.6rem; border-radius: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
    <strong>Step 4: Result</strong> = ${signBit === '1' ? '-' : '+'}${mantissaValue.toFixed(10)} × 2<sup>${actualExponent}</sup> = <strong>${decimalValue}</strong>
  </div>`;

  displayDoubleResult(binary, decimalValue.toString(), resultDiv, stepsDiv, stepsHTML);
}

// Display Double Precision Result
function displayDoubleResult(ieee754, decimal, resultDiv, stepsDiv, stepsHTML) {
  const signBit = ieee754[0];
  const exponentBits = ieee754.substring(1, 12);
  const mantissaBits = ieee754.substring(12, 64);
  
  // Calculate hex representation
  const hex = BigInt('0b' + ieee754).toString(16).toUpperCase().padStart(16, '0');
  
  resultDiv.innerHTML = `
    <h4 style="color: #6366f1; font-size: 0.9rem; margin-bottom: 0.5rem;">Result:</h4>
    <div style="background: #f9fafb; padding: 0.8rem; border-radius: 0.5rem; border: 1px solid #e5e7eb; margin-bottom: 0.5rem;">
      <div style="font-size: 0.85rem; margin-bottom: 0.5rem;"><strong>Decimal:</strong> <span style="color: #059669; font-weight: 700;">${decimal}</span></div>
      <div style="font-size: 0.7rem; margin-bottom: 0.5rem; word-break: break-all; font-family: 'Courier New', monospace;">
        <strong>IEEE 754:</strong><br/>
        <span style="color: #ef4444; font-weight: 700;">${signBit}</span>
        <span style="color: #3b82f6; font-weight: 700;">${exponentBits}</span>
        <span style="color: #10b981; font-weight: 700;">${mantissaBits}</span>
      </div>
      <div style="font-size: 0.75rem; font-family: 'Courier New', monospace;">
        <strong>Hexadecimal:</strong> <span style="color: #7c3aed; font-weight: 700;">0x${hex}</span>
      </div>
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4rem; font-size: 0.75rem;">
      <div style="background: #fef2f2; padding: 0.4rem; border-radius: 0.4rem; text-align: center;">
        <div style="color: #ef4444; font-weight: 700;">Sign</div>
        <div style="font-family: 'Courier New', monospace;">${signBit}</div>
      </div>
      <div style="background: #eff6ff; padding: 0.4rem; border-radius: 0.4rem; text-align: center;">
        <div style="color: #3b82f6; font-weight: 700;">Exponent (11)</div>
        <div style="font-family: 'Courier New', monospace;">${exponentBits}</div>
      </div>
      <div style="background: #f0fdf4; padding: 0.4rem; border-radius: 0.4rem; text-align: center;">
        <div style="color: #10b981; font-weight: 700;">Mantissa (52)</div>
        <div style="font-family: 'Courier New', monospace; font-size: 0.65rem;">${mantissaBits.substring(0, 26)}<br/>${mantissaBits.substring(26)}</div>
      </div>
    </div>`;
  
  resultDiv.style.display = 'block';
  stepsDiv.innerHTML = stepsHTML;
  stepsDiv.style.display = 'block';
}

// ============================================
// BOOTH'S MULTIPLICATION ALGORITHM
// ============================================

let boothState = {
  M: 0,           // Multiplicand
  Q: 0,           // Multiplier
  A: 0,           // Accumulator
  Q1: 0,          // Q-1 bit
  bitWidth: 8,    // Bit width
  steps: [],      // History of all steps
  currentStep: 0, // Current step index
  complete: false, // Whether calculation is complete
  navigationMode: false, // Whether in step-by-step navigation mode
  viewStep: 0     // Current step being viewed in navigation
};

// Convert number to signed binary representation
function toSignedBinary(num, bits) {
  if (num >= 0) {
    return num.toString(2).padStart(bits, '0');
  } else {
    // Two's complement for negative numbers
    const positive = Math.abs(num);
    const binary = positive.toString(2).padStart(bits, '0');
    let inverted = '';
    for (let i = 0; i < binary.length; i++) {
      inverted += binary[i] === '0' ? '1' : '0';
    }
    let result = parseInt(inverted, 2) + 1;
    return result.toString(2).padStart(bits, '0');
  }
}

// Convert signed binary to decimal
function fromSignedBinary(binary) {
  if (binary[0] === '0') {
    return parseInt(binary, 2);
  } else {
    // Negative number in two's complement
    let inverted = '';
    for (let i = 0; i < binary.length; i++) {
      inverted += binary[i] === '0' ? '1' : '0';
    }
    return -(parseInt(inverted, 2) + 1);
  }
}

// Arithmetic right shift (preserves sign bit)
function arithmeticRightShift(a, q, q1, bits) {
  const signBit = a[0];
  const newQ1 = q[q.length - 1];
  const newQ = a[a.length - 1] + q.substring(0, q.length - 1);
  const newA = signBit + a.substring(0, a.length - 1);
  return { a: newA, q: newQ, q1: newQ1 };
}

// Add two binary numbers
function addBinary(a, b, bits) {
  const aNum = fromSignedBinary(a);
  const bNum = fromSignedBinary(b);
  const sum = aNum + bNum;
  return toSignedBinary(sum, bits);
}

// Subtract two binary numbers
function subtractBinary(a, b, bits) {
  const aNum = fromSignedBinary(a);
  const bNum = fromSignedBinary(b);
  const diff = aNum - bNum;
  return toSignedBinary(diff, bits);
}

// Initialize Booth's algorithm
function initializeBooths(multiplicand, multiplier, bitWidth) {
  boothState.M = parseInt(multiplicand);
  boothState.Q = parseInt(multiplier);
  boothState.bitWidth = bitWidth;
  boothState.A = 0;
  boothState.Q1 = 0;
  boothState.currentStep = 0;
  boothState.complete = false;
  boothState.steps = [];

  const mBinary = toSignedBinary(boothState.M, bitWidth);
  const qBinary = toSignedBinary(boothState.Q, bitWidth);
  const aBinary = toSignedBinary(boothState.A, bitWidth);

  // Initial state
  boothState.steps.push({
    step: 0,
    bits: qBinary[bitWidth - 1] + '0',
    operation: 'Initialize',
    A: aBinary,
    Q: qBinary,
    Q1: '0',
    explanation: `Initialize: A = ${'0'.repeat(bitWidth)}, Q = ${qBinary}, Q-1 = 0, M = ${mBinary}`
  });

  return true;
}

// Execute one step of Booth's algorithm
function executeBoothStep() {
  if (boothState.complete || boothState.currentStep >= boothState.bitWidth) {
    boothState.complete = true;
    return false;
  }

  const bits = boothState.bitWidth;
  const lastStep = boothState.steps[boothState.steps.length - 1];
  
  let A = lastStep.A;
  let Q = lastStep.Q;
  let Q1 = lastStep.Q1;
  const M = toSignedBinary(boothState.M, bits);

  const q0 = Q[bits - 1];
  const q_1 = Q1;
  const bitPair = q0 + q_1;

  let operation = '';
  let explanation = '';

  // Determine operation based on Q0 and Q-1
  if (bitPair === '10') {
    // Subtract M from A
    A = subtractBinary(A, M, bits);
    operation = 'A = A - M';
    explanation = `Q Q-1 = 10 → Subtract M from A: ${lastStep.A} - ${M} = ${A}`;
  } else if (bitPair === '01') {
    // Add M to A
    A = addBinary(A, M, bits);
    operation = 'A = A + M';
    explanation = `Q Q-1 = 01 → Add M to A: ${lastStep.A} + ${M} = ${A}`;
  } else {
    // No operation
    operation = 'No Operation';
    explanation = `Q Q-1 = ${bitPair} → No arithmetic operation needed`;
  }

  // Arithmetic right shift
  const shifted = arithmeticRightShift(A, Q, Q1, bits);
  A = shifted.a;
  Q = shifted.q;
  Q1 = shifted.q1;

  explanation += ` → Shift right: A Q Q-1 = ${A} ${Q} ${Q1}`;

  boothState.currentStep++;
  boothState.steps.push({
    step: boothState.currentStep,
    bits: bitPair,
    operation: operation,
    A: A,
    Q: Q,
    Q1: Q1,
    explanation: explanation
  });

  if (boothState.currentStep >= bits) {
    boothState.complete = true;
  }

  return true;
}

// Calculate Booth's algorithm (show overview - all steps at once)
function calculateBooths() {
  const multiplicand = document.getElementById('boothMultiplicand').value.trim();
  const multiplier = document.getElementById('boothMultiplier').value.trim();
  const bitWidth = parseInt(document.getElementById('boothBitWidth').value);

  if (!multiplicand || !multiplier) {
    alert('Please enter both multiplicand and multiplier');
    return;
  }

  const m = parseInt(multiplicand);
  const q = parseInt(multiplier);

  if (isNaN(m) || isNaN(q)) {
    alert('Please enter valid numbers');
    return;
  }

  // Check if numbers fit in bit width
  const maxValue = Math.pow(2, bitWidth - 1) - 1;
  const minValue = -Math.pow(2, bitWidth - 1);

  if (m > maxValue || m < minValue || q > maxValue || q < minValue) {
    alert(`Numbers must be between ${minValue} and ${maxValue} for ${bitWidth}-bit representation`);
    return;
  }

  // Initialize
  initializeBooths(multiplicand, multiplier, bitWidth);

  // Execute all steps
  while (!boothState.complete) {
    executeBoothStep();
  }

  // Show overview with last step
  boothState.navigationMode = false;
  boothState.viewStep = boothState.steps.length - 1;
  displayBoothResults();
  
  // Show navigate button
  document.getElementById('navigateStepsBtn').style.display = 'flex';
  document.getElementById('stepNavControls').style.display = 'none';
}

// Start navigating through steps one by one
function navigateSteps() {
  if (boothState.steps.length === 0) {
    alert('Please calculate first!');
    return;
  }
  
  boothState.navigationMode = true;
  boothState.viewStep = 0;
  
  // Show navigation controls
  document.getElementById('stepNavControls').style.display = 'block';
  document.getElementById('navigateStepsBtn').style.display = 'none';
  
  // Update UI
  displayBoothResults();
  
  // Smooth scroll to show navigation controls at top of screen
  setTimeout(() => {
    const navControls = document.getElementById('stepNavControls');
    if (navControls) {
      navControls.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}

// Go to next step in navigation
function nextStep() {
  if (boothState.viewStep < boothState.steps.length - 1) {
    boothState.viewStep++;
    addStepTransitionEffect();
    displayBoothResults();
  }
}

// Go to previous step in navigation
function previousStep() {
  if (boothState.viewStep > 0) {
    boothState.viewStep--;
    addStepTransitionEffect();
    displayBoothResults();
  }
}

// Add visual effect when changing steps
function addStepTransitionEffect() {
  // Pulse effect on registers
  const registerCards = ['registerACard', 'registerQCard', 'registerQ1Card', 'registerMCard'];
  registerCards.forEach(id => {
    const card = document.getElementById(id);
    if (card) {
      card.classList.add('register-highlight');
      setTimeout(() => {
        card.classList.remove('register-highlight');
      }, 2000);
    }
  });
  
  // Flash effect on step info
  const stepInfo = document.getElementById('boothStepInfo');
  if (stepInfo) {
    stepInfo.style.animation = 'none';
    setTimeout(() => {
      stepInfo.style.animation = 'slideInUp 0.5s ease-out';
    }, 10);
  }
}

// Update register with color-coded binary digits
function updateRegisterWithAnimation(elementId, binaryValue) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  // Split binary into individual bits with color coding
  const bits = binaryValue.split('');
  let coloredHTML = '';
  bits.forEach((bit, index) => {
    const color = bit === '1' ? '#059669' : '#6366f1';
    const opacity = bit === '1' ? '1' : '0.6';
    coloredHTML += `<span style="color: ${color}; opacity: ${opacity}; transition: all 0.3s;">${bit}</span>`;
  });
  
  element.innerHTML = coloredHTML;
}

// Format explanation with highlighting
function formatExplanation(text) {
  // Highlight binary numbers
  text = text.replace(/([01]{4,})/g, '<span style="background: #dbeafe; padding: 0.15rem 0.4rem; border-radius: 0.25rem; font-family: \'Courier New\', monospace; font-weight: 700; color: #1e40af;">$1</span>');
  
  // Highlight operations
  text = text.replace(/(Add|Subtract|Shift right|Initialize)/g, '<span style="color: #8b5cf6; font-weight: 700;">$1</span>');
  
  // Highlight register names
  text = text.replace(/\b([AQM])\b/g, '<span style="background: #fef3c7; padding: 0.1rem 0.3rem; border-radius: 0.25rem; font-weight: 700; color: #92400e;">$1</span>');
  
  // Highlight Q Q-1 patterns
  text = text.replace(/(Q Q-1 = [01]{2})/g, '<span style="background: #6366f1; color: white; padding: 0.2rem 0.5rem; border-radius: 0.375rem; font-weight: 700;">$1</span>');
  
  return text;
}

// Display Booth's algorithm results
function displayBoothResults() {
  const resultDiv = document.getElementById('boothResult');
  const registersDiv = document.getElementById('boothRegisters');
  const stepInfoDiv = document.getElementById('boothStepInfo');
  const historyDiv = document.getElementById('boothHistory');
  const tableBody = document.getElementById('boothTableBody');

  // Show sections
  registersDiv.style.display = 'block';
  stepInfoDiv.style.display = 'block';
  historyDiv.style.display = 'block';

  // Determine which step to show
  const stepIndex = boothState.navigationMode ? boothState.viewStep : boothState.steps.length - 1;
  const currentState = boothState.steps[stepIndex];
  const bits = boothState.bitWidth;

  // Update navigation controls if in navigation mode
  if (boothState.navigationMode) {
    document.getElementById('navCurrentStep').textContent = boothState.viewStep;
    document.getElementById('navTotalSteps').textContent = boothState.steps.length - 1;
    
    // Update progress bar
    const progress = (boothState.viewStep / (boothState.steps.length - 1)) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // Enable/disable buttons
    document.getElementById('prevBtn').disabled = boothState.viewStep === 0;
    document.getElementById('nextBtn').disabled = boothState.viewStep === boothState.steps.length - 1;
    
    document.getElementById('prevBtn').style.opacity = boothState.viewStep === 0 ? '0.5' : '1';
    document.getElementById('nextBtn').style.opacity = boothState.viewStep === boothState.steps.length - 1 ? '0.5' : '1';
  }

  // Update registers with visual formatting
  updateRegisterWithAnimation('registerA', currentState.A);
  updateRegisterWithAnimation('registerQ', currentState.Q);
  updateRegisterWithAnimation('registerQ1', currentState.Q1);
  updateRegisterWithAnimation('registerM', toSignedBinary(boothState.M, bits));

  // Update step info with enhanced formatting
  document.getElementById('currentStepNum').textContent = currentState.step;
  document.getElementById('currentBits').textContent = currentState.bits || '--';
  
  // Color code operation
  const opElement = document.getElementById('currentOperation');
  opElement.textContent = currentState.operation;
  if (currentState.operation.includes('Add')) {
    opElement.style.color = '#10b981';
  } else if (currentState.operation.includes('Subtract')) {
    opElement.style.color = '#ef4444';
  } else {
    opElement.style.color = '#6366f1';
  }
  
  // Enhanced explanation with formatting
  const explanation = currentState.explanation;
  document.getElementById('stepExplanation').innerHTML = formatExplanation(explanation);

  // Update history table (only show steps up to current in navigation mode)
  tableBody.innerHTML = '';
  const stepsToShow = boothState.navigationMode ? 
    boothState.steps.slice(0, stepIndex + 1) : 
    boothState.steps;
  
  stepsToShow.forEach(step => {
    const row = document.createElement('tr');
    const isCurrentStep = step.step === currentState.step;
    
    // Enhanced styling for current step
    if (isCurrentStep) {
      row.style.background = 'linear-gradient(90deg, #dbeafe 0%, #eff6ff 100%)';
      row.style.transform = 'scale(1.02)';
      row.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
      row.style.borderLeft = '4px solid #3b82f6';
    } else {
      row.style.background = 'white';
    }
    
    row.style.transition = 'all 0.3s ease';
    row.style.cursor = 'pointer';
    
    // Color code operation
    let operationColor = '#374151';
    let operationBg = 'transparent';
    if (step.operation.includes('Add')) {
      operationColor = '#10b981';
      operationBg = isCurrentStep ? '#d1fae5' : 'transparent';
    } else if (step.operation.includes('Subtract')) {
      operationColor = '#ef4444';
      operationBg = isCurrentStep ? '#fee2e2' : 'transparent';
    } else if (step.operation.includes('Initialize')) {
      operationColor = '#6366f1';
      operationBg = isCurrentStep ? '#e0e7ff' : 'transparent';
    }
    
    row.innerHTML = `
      <td style="padding: 0.75rem; border: 1px solid #e5e7eb; text-align: center; font-weight: ${isCurrentStep ? '800' : '600'}; font-size: ${isCurrentStep ? '1.05rem' : '0.9rem'}; color: ${isCurrentStep ? '#3b82f6' : '#374151'}; font-family: 'Poppins', sans-serif;">${step.step}</td>
      <td style="padding: 0.75rem; border: 1px solid #e5e7eb; text-align: center; font-weight: 800; color: #3b82f6; font-size: ${isCurrentStep ? '1.2rem' : '0.95rem'}; font-family: 'Courier New', monospace; background: ${isCurrentStep ? '#eff6ff' : 'white'};">${step.bits || '--'}</td>
      <td style="padding: 0.75rem; border: 1px solid #e5e7eb; text-align: center; font-weight: ${isCurrentStep ? '700' : '600'}; color: ${operationColor}; background: ${operationBg}; font-size: ${isCurrentStep ? '0.95rem' : '0.85rem'}; font-family: 'Poppins', sans-serif;">${step.operation}</td>
      <td style="padding: 0.75rem; border: 1px solid #e5e7eb; text-align: center; color: #f59e0b; font-family: 'Courier New', monospace; font-size: ${isCurrentStep ? '0.95rem' : '0.85rem'}; font-weight: ${isCurrentStep ? '700' : '600'};">${step.A}</td>
      <td style="padding: 0.75rem; border: 1px solid #e5e7eb; text-align: center; color: #3b82f6; font-family: 'Courier New', monospace; font-size: ${isCurrentStep ? '0.95rem' : '0.85rem'}; font-weight: ${isCurrentStep ? '700' : '600'};">${step.Q}</td>
      <td style="padding: 0.75rem; border: 1px solid #e5e7eb; text-align: center; color: #ec4899; font-family: 'Courier New', monospace; font-size: ${isCurrentStep ? '0.95rem' : '0.85rem'}; font-weight: ${isCurrentStep ? '700' : '600'};">${step.Q1}</td>
    `;
    
    // Add hover effect
    row.addEventListener('mouseenter', function() {
      if (!isCurrentStep) {
        this.style.background = '#f9fafb';
        this.style.transform = 'scale(1.01)';
      }
    });
    
    row.addEventListener('mouseleave', function() {
      if (!isCurrentStep) {
        this.style.background = 'white';
        this.style.transform = 'scale(1)';
      }
    });
    
    tableBody.appendChild(row);
  });

  // Show final result if at last step
  const isLastStep = stepIndex === boothState.steps.length - 1;
  if (boothState.complete && isLastStep) {
    const finalA = currentState.A;
    const finalQ = currentState.Q;
    const combinedBinary = finalA + finalQ;
    const result = fromSignedBinary(combinedBinary);
    const expected = boothState.M * boothState.Q;

    resultDiv.style.display = 'block';
    document.getElementById('boothFinalResult').innerHTML = `
      <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">
        ${boothState.M} × ${boothState.Q} = <span style="color: #047857; font-size: 1.5rem; font-weight: 700;">${result}</span>
      </div>
      <div style="font-size: 0.9rem; color: #059669; margin-bottom: 0.25rem;">
        Binary: <span style="font-family: 'Courier New', monospace; font-weight: 600;">${combinedBinary}</span>
      </div>
      <div style="font-size: 0.85rem; color: #047857;">
        (A: ${finalA} | Q: ${finalQ})
      </div>
      <div style="font-size: 0.9rem; color: ${result === expected ? '#10b981' : '#ef4444'}; margin-top: 0.5rem; font-weight: 600;">
        ${result === expected ? '✅ Correct!' : '⚠️ Verification: ' + expected}
      </div>
    `;
  } else {
    resultDiv.style.display = 'none';
  }
}

// Reset Booth's algorithm
function resetBooths() {
  boothState = {
    M: 0,
    Q: 0,
    A: 0,
    Q1: 0,
    bitWidth: 8,
    steps: [],
    currentStep: 0,
    complete: false,
    navigationMode: false,
    viewStep: 0
  };

  document.getElementById('boothResult').style.display = 'none';
  document.getElementById('boothRegisters').style.display = 'none';
  document.getElementById('boothStepInfo').style.display = 'none';
  document.getElementById('boothHistory').style.display = 'none';
  document.getElementById('stepNavControls').style.display = 'none';
  document.getElementById('navigateStepsBtn').style.display = 'none';
  document.getElementById('boothMultiplicand').value = '';
  document.getElementById('boothMultiplier').value = '';
}

// =============================================================================
// STACK ANIMATION MODULE
// =============================================================================

// Stack Animation State
let stackAnimationState = {
  enabled: true,            // Animation mode on/off (enabled by default)
  animationQueue: [],       // Queue of operations to animate
  isAnimating: false,       // Currently animating
  isPaused: false,          // Animation paused
  speed: 1,                 // Animation speed multiplier
  visualStack: [],          // Visual representation of stack
  totalOps: 0,              // Total operations count
  pushCount: 0,             // PUSH operations count
  popCount: 0,              // POP operations count
  currentOperation: null    // Current operation being animated
};

// Initialize Stack Animation
function initStackAnimation() {
  console.log('Stack Animation initialized');
  // Reset state
  stackAnimationState.visualStack = [];
  stackAnimationState.animationQueue = [];
  stackAnimationState.totalOps = 0;
  stackAnimationState.pushCount = 0;
  stackAnimationState.popCount = 0;
  stackAnimationState.currentOperation = null;
  updateAnimationInfo();
}

// Sync visual stack with actual stack
function syncVisualStack() {
  stackAnimationState.visualStack = [...stackMemory];
  renderStackVisual();
}

// Render Stack Visual
function renderStackVisual() {
  const container = document.getElementById('stackVisualContainer');
  
  if (stackAnimationState.visualStack.length === 0) {
    container.innerHTML = `
      <div class="stack-empty-state">
        <span class="empty-icon">📭</span>
        <p>Stack is empty. Perform PUSH operations to see animation.</p>
      </div>
    `;
    return;
  }
  
  let html = '';
  const currentSP = MAX_STACK_SIZE - stackAnimationState.visualStack.length;
  
  // Render each stack element (from top to bottom)
  for (let i = stackAnimationState.visualStack.length - 1; i >= 0; i--) {
    const memoryAddr = MAX_STACK_SIZE - i - 1;
    const value = stackAnimationState.visualStack[i];
    const isTopOfStack = (i === stackAnimationState.visualStack.length - 1);
    
    html += `
      <div class="stack-block ${isTopOfStack ? 'active' : ''}" data-index="${i}">
        <div class="memory-addr">FFF${(0xF - memoryAddr).toString(16).toUpperCase()}H</div>
        <div class="stack-data">${value}</div>
        <div class="sp-indicator ${isTopOfStack ? 'active' : ''}">${isTopOfStack ? 'SP ➜' : ''}</div>
      </div>
    `;
  }
  
  container.innerHTML = html;
  updateAnimationInfo();
}

// Queue Animation Operation
function queueAnimation(type, data) {
  stackAnimationState.animationQueue.push({ type, data });
  updateQueueDisplay();
  
  // Start processing queue if not already animating
  if (!stackAnimationState.isAnimating && !stackAnimationState.isPaused) {
    processAnimationQueue();
  }
}

// Process Animation Queue
async function processAnimationQueue() {
  if (stackAnimationState.animationQueue.length === 0) {
    stackAnimationState.isAnimating = false;
    stackAnimationState.currentOperation = null;
    updateQueueDisplay();
    return;
  }
  
  if (stackAnimationState.isPaused) {
    return;
  }
  
  stackAnimationState.isAnimating = true;
  const operation = stackAnimationState.animationQueue.shift();
  stackAnimationState.currentOperation = operation.type;
  updateQueueDisplay();
  
  // Execute animation based on type
  if (operation.type === 'PUSH') {
    await animatePush(operation.data);
  } else if (operation.type === 'POP') {
    await animatePop();
  }
  
  stackAnimationState.totalOps++;
  updateAnimationInfo();
  
  // Continue processing queue
  setTimeout(() => processAnimationQueue(), 100);
}

// Animate PUSH Operation
async function animatePush(value) {
  const baseDuration = 500 / stackAnimationState.speed;
  
  // Update counts
  stackAnimationState.pushCount++;
  
  // Add to visual stack
  stackAnimationState.visualStack.push(value);
  
  // Render with animation
  renderStackVisual();
  
  // Highlight new element
  await sleep(baseDuration * 0.1);
  const blocks = document.querySelectorAll('.stack-block');
  if (blocks.length > 0) {
    const topBlock = blocks[0];
    const dataEl = topBlock.querySelector('.stack-data');
    dataEl.classList.add('push-anim');
    
    // Wait for animation to complete
    await sleep(baseDuration * 0.9);
    dataEl.classList.remove('push-anim');
  }
}

// Animate POP Operation
async function animatePop() {
  const baseDuration = 500 / stackAnimationState.speed;
  
  if (stackAnimationState.visualStack.length === 0) {
    return;
  }
  
  // Update counts
  stackAnimationState.popCount++;
  
  // Highlight element being popped
  const blocks = document.querySelectorAll('.stack-block');
  if (blocks.length > 0) {
    const topBlock = blocks[0];
    const dataEl = topBlock.querySelector('.stack-data');
    dataEl.classList.add('pop-anim');
    
    // Wait for animation
    await sleep(baseDuration);
  }
  
  // Remove from visual stack
  stackAnimationState.visualStack.pop();
  
  // Re-render
  renderStackVisual();
}

// Update Animation Info Panel
function updateAnimationInfo() {
  document.getElementById('animTotalOps').textContent = stackAnimationState.totalOps;
  document.getElementById('animPushCount').textContent = stackAnimationState.pushCount;
  document.getElementById('animPopCount').textContent = stackAnimationState.popCount;
  document.getElementById('animStackHeight').textContent = stackAnimationState.visualStack.length;
}

// Update Queue Display
function updateQueueDisplay() {
  document.getElementById('queueCount').textContent = stackAnimationState.animationQueue.length;
  document.getElementById('currentOperation').textContent = stackAnimationState.currentOperation || 'None';
}

// Play Animation
function playAnimation() {
  if (stackAnimationState.animationQueue.length === 0) {
    return;
  }
  
  stackAnimationState.isPaused = false;
  document.getElementById('playBtn').style.display = 'none';
  document.getElementById('pauseBtn').style.display = 'inline-flex';
  
  processAnimationQueue();
}

// Pause Animation
function pauseAnimation() {
  stackAnimationState.isPaused = true;
  document.getElementById('playBtn').style.display = 'inline-flex';
  document.getElementById('pauseBtn').style.display = 'none';
}

// Step Forward (manual step)
function stepForward() {
  if (stackAnimationState.animationQueue.length === 0) {
    return;
  }
  
  stackAnimationState.isPaused = true;
  processAnimationQueue();
}

// Reset Animation
function resetAnimation() {
  // Clear queue
  stackAnimationState.animationQueue = [];
  stackAnimationState.isAnimating = false;
  stackAnimationState.isPaused = false;
  stackAnimationState.currentOperation = null;
  
  // Reset buttons
  document.getElementById('playBtn').style.display = 'inline-flex';
  document.getElementById('pauseBtn').style.display = 'none';
  
  // Sync with actual stack
  syncVisualStack();
  updateQueueDisplay();
}

// Change Animation Speed
function changeAnimationSpeed(speed) {
  stackAnimationState.speed = parseFloat(speed);
}

// Helper: Sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Make functions globally accessible
window.playAnimation = playAnimation;
window.pauseAnimation = pauseAnimation;
window.stepForward = stepForward;
window.resetAnimation = resetAnimation;
window.changeAnimationSpeed = changeAnimationSpeed;

// =============================================================================
// MEMORY VIEWER MODULE
// =============================================================================

// Memory Viewer State
let memoryViewerState = {
  memory: new Uint8Array(1048576),  // 1MB memory (1024 * 1024 bytes)
  currentAddress: 0x0000,           // Current viewing address
  viewRows: 16,                     // Number of rows to display
  bytesPerRow: 16,                  // Bytes per row (16 for hex editor style)
  selectedSegment: 'data',          // Current segment (data, code, stack, extra)
  viewMode: 'hex',                  // Display format: 'hex', 'dec', 'bin', 'ascii'
  editingCell: null,                // Currently editing cell {address, element}
  searchResults: [],                // Array of addresses matching search
  currentSearchIndex: -1,           // Current position in search results
  inspectedAddress: null,           // Address being inspected in data type viewer
  segmentRegisters: {
    CS: 0x0000,  // Code Segment
    DS: 0x0000,  // Data Segment
    SS: 0xFFFF,  // Stack Segment (starts at top)
    ES: 0x0000   // Extra Segment
  },
  operationHistory: [],             // History of read/write operations
  highlightAddress: null,           // Address to highlight after navigation
  totalReads: 0,                    // Total read operations
  totalWrites: 0,                   // Total write operations
  lastAccessTime: null,             // Timestamp of last access
  writtenAddresses: new Set()       // Track which addresses have been written
};

// ===== FORMAT CONVERSION FUNCTIONS =====

// Format a memory byte value according to the current view mode
function formatMemoryValue(byte, mode) {
  switch(mode) {
    case 'hex':
      return byte.toString(16).toUpperCase().padStart(2, '0');
    case 'dec':
      return byte.toString(10).padStart(3, ' ');
    case 'bin':
      return byte.toString(2).padStart(8, '0');
    case 'ascii':
      return (byte >= 32 && byte <= 126) ? String.fromCharCode(byte) : '.';
    default:
      return byte.toString(16).toUpperCase().padStart(2, '0');
  }
}

// Parse a value string back to a byte (0-255) based on the view mode
function parseValueFromMode(str, mode) {
  str = str.trim();
  let value;
  
  switch(mode) {
    case 'hex':
      // Remove 0x prefix if present
      str = str.replace(/^0x/i, '');
      value = parseInt(str, 16);
      break;
    case 'dec':
      value = parseInt(str, 10);
      break;
    case 'bin':
      // Remove 0b prefix if present
      str = str.replace(/^0b/i, '');
      value = parseInt(str, 2);
      break;
    case 'ascii':
      // Take first character and get its code
      value = str.length > 0 ? str.charCodeAt(0) : 0;
      break;
    default:
      value = parseInt(str, 16);
  }
  
  // Validate range
  if (isNaN(value) || value < 0 || value > 255) {
    return null;
  }
  
  return value;
}

// Set the memory view mode
function setViewMode(mode) {
  const validModes = ['hex', 'dec', 'bin', 'ascii'];
  if (!validModes.includes(mode)) {
    console.error('Invalid view mode:', mode);
    return;
  }
  
  // Update state
  memoryViewerState.viewMode = mode;
  
  // Update button styles
  document.querySelectorAll('.view-mode-btn').forEach(btn => {
    btn.classList.remove('active');
    const btnMode = btn.id.replace('viewMode', '').toLowerCase();
    if (btnMode === mode) {
      btn.classList.add('active');
    }
  });
  
  // Re-render memory grid with new format
  renderMemoryGrid();
  
  console.log(`View mode changed to: ${mode}`);
}

// Initialize Memory Viewer
function initMemoryViewer() {
  console.log('Memory Viewer initialized');
  
  // Initialize memory with zeros
  memoryViewerState.memory.fill(0);
  
  // Set initial segment addresses
  memoryViewerState.segmentRegisters.DS = 0x0000;  // Data starts at 0
  memoryViewerState.segmentRegisters.CS = 0x1000;  // Code starts at 4KB
  memoryViewerState.segmentRegisters.SS = 0xFFFF;  // Stack at top
  memoryViewerState.segmentRegisters.ES = 0x2000;  // Extra at 8KB
  
  // Update displays
  updateSegmentRegisterDisplay();
  renderMemoryGrid();
  updateMemoryStats();
  
  console.log('Memory initialized: 1MB address space ready');
}

// Render Memory Grid
function renderMemoryGrid() {
  const tbody = document.getElementById('memoryTableBody');
  if (!tbody) return;
  
  const startAddr = memoryViewerState.currentAddress;
  const rows = memoryViewerState.viewRows;
  const bytesPerRow = memoryViewerState.bytesPerRow;
  
  let html = '';
  
  for (let row = 0; row < rows; row++) {
    const rowAddr = startAddr + (row * bytesPerRow);
    
    // Skip if address exceeds memory size
    if (rowAddr >= memoryViewerState.memory.length) break;
    
    // Check if this row contains the highlight address
    const shouldHighlight = memoryViewerState.highlightAddress !== null && 
                           memoryViewerState.highlightAddress >= rowAddr && 
                           memoryViewerState.highlightAddress < rowAddr + bytesPerRow;
    
    html += shouldHighlight ? '<tr class="highlight-row">' : '<tr>';
    
    // Address column
    html += `<td class="memory-address-cell">0x${rowAddr.toString(16).toUpperCase().padStart(4, '0')}</td>`;
    
    // Data columns (16 bytes)
    let asciiChars = '';
    for (let col = 0; col < bytesPerRow; col++) {
      const addr = rowAddr + col;
      
      if (addr < memoryViewerState.memory.length) {
        const value = memoryViewerState.memory[addr];
        const formattedValue = formatMemoryValue(value, memoryViewerState.viewMode);
        const hexValue = value.toString(16).toUpperCase().padStart(2, '0');
        const isWritten = memoryViewerState.writtenAddresses.has(addr);
        const cellClass = isWritten ? 'memory-data-cell written' : 'memory-data-cell';
        
        // Add both click and double-click handlers
        html += `<td class="${cellClass}" onclick="readMemoryCell(${addr})" ondblclick="makeMemoryCellEditable(event, ${addr})" title="Address: 0x${addr.toString(16).toUpperCase()}\nValue: 0x${hexValue} (${value})\nDouble-click to edit">${formattedValue}</td>`;
        
        // Build ASCII representation (always for ASCII column)
        const char = (value >= 32 && value <= 126) ? String.fromCharCode(value) : '.';
        asciiChars += char;
      } else {
        html += '<td class="memory-data-cell">--</td>';
        asciiChars += ' ';
      }
    }
    
    // ASCII column
    html += `<td class="memory-ascii-cell">${asciiChars}</td>`;
    
    html += '</tr>';
  }
  
  tbody.innerHTML = html;
  
  // Update address display
  const endAddr = startAddr + (rows * bytesPerRow) - 1;
  document.getElementById('currentAddressDisplay').textContent = `0x${startAddr.toString(16).toUpperCase().padStart(4, '0')}`;
  document.getElementById('addressRangeDisplay').textContent = 
    `0x${startAddr.toString(16).toUpperCase().padStart(4, '0')} - 0x${endAddr.toString(16).toUpperCase().padStart(4, '0')}`;
  
  // Update Memory Map if it exists
  if (window.updateCurrentViewIndicator) {
    window.updateCurrentViewIndicator();
  }
}

// Read Memory Cell (for display/inspection)
function readMemoryCell(address) {
  if (address < 0 || address >= memoryViewerState.memory.length) {
    alert('Invalid memory address!');
    return;
  }
  
  const value = memoryViewerState.memory[address];
  memoryViewerState.totalReads++;
  memoryViewerState.lastAccessTime = new Date();
  
  // Add to history
  addMemoryOperation('READ', address, null, value);
  
  // Visual feedback
  highlightMemoryCell(address, 'read');
  
  // Update stats
  updateMemoryStats();
  
  // Update data type inspector
  updateDataTypeInspector(address);
  
  // Show info
  alert(`Memory Read\n\nAddress: 0x${address.toString(16).toUpperCase()}\nValue: 0x${value.toString(16).toUpperCase().padStart(2, '0')} (${value} decimal)\nASCII: ${(value >= 32 && value <= 126) ? String.fromCharCode(value) : 'N/A'}`);
}

// Make Memory Cell Editable (double-click handler)
function makeMemoryCellEditable(event, address) {
  // Prevent the single-click event from firing
  event.stopPropagation();
  
  // Don't allow editing if already editing another cell
  if (memoryViewerState.editingCell !== null) {
    return;
  }
  
  const cell = event.target;
  const currentValue = memoryViewerState.memory[address];
  const formattedValue = formatMemoryValue(currentValue, memoryViewerState.viewMode);
  
  // Save editing state
  memoryViewerState.editingCell = { address, element: cell };
  
  // Add editing class
  cell.classList.add('editing');
  
  // Create input element
  const input = document.createElement('input');
  input.type = 'text';
  input.value = formattedValue;
  input.style.width = '100%';
  input.style.textAlign = 'center';
  input.style.fontFamily = "'Courier New', monospace";
  input.style.fontSize = 'inherit';
  input.style.border = 'none';
  input.style.background = 'transparent';
  input.style.padding = '0';
  
  // Handle Enter key (save)
  input.onkeydown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveMemoryCellEdit(address, input.value, cell);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelMemoryCellEdit(cell);
    }
  };
  
  // Handle blur (save on losing focus)
  input.onblur = () => {
    setTimeout(() => {
      if (memoryViewerState.editingCell !== null) {
        saveMemoryCellEdit(address, input.value, cell);
      }
    }, 100);
  };
  
  // Replace cell content with input
  cell.innerHTML = '';
  cell.appendChild(input);
  input.focus();
  input.select();
  
  console.log(`Editing cell at address 0x${address.toString(16).toUpperCase()}`);
}

// Save Memory Cell Edit
function saveMemoryCellEdit(address, valueStr, cell) {
  const newValue = parseValueFromMode(valueStr, memoryViewerState.viewMode);
  
  if (newValue === null) {
    alert(`Invalid value for ${memoryViewerState.viewMode.toUpperCase()} mode!\n\nPlease enter a valid value (0-255).`);
    cancelMemoryCellEdit(cell);
    return;
  }
  
  // Write the new value
  const success = writeMemory(address, newValue);
  
  if (success) {
    console.log(`Memory cell at 0x${address.toString(16).toUpperCase()} updated to ${newValue}`);
  }
  
  // Clear editing state
  memoryViewerState.editingCell = null;
  cell.classList.remove('editing');
  
  // Re-render grid
  renderMemoryGrid();
}

// Cancel Memory Cell Edit
function cancelMemoryCellEdit(cell) {
  memoryViewerState.editingCell = null;
  cell.classList.remove('editing');
  renderMemoryGrid();
  console.log('Edit cancelled');
}

// ===== MEMORY SEARCH FUNCTIONS =====

// Update Format Hint
function updateFormatHint() {
  const searchFormat = document.getElementById('searchFormat');
  const formatHint = document.getElementById('formatHint');
  
  if (!formatHint) return;
  
  const hints = {
    hex: 'Examples: FF, A5, 3E, 00',
    dec: 'Examples: 255, 165, 62, 0',
    bin: 'Examples: 11111111, 10100101',
    ascii: 'Examples: Hello, World, A'
  };
  
  formatHint.textContent = hints[searchFormat.value] || 'Select a format';
}

// Search Memory for Value
function searchMemory() {
  const searchInput = document.getElementById('searchInput');
  const searchFormat = document.getElementById('searchFormat');
  const searchValue = searchInput.value.trim();
  
  if (!searchValue) {
    alert('Please enter a search value!');
    return;
  }
  
  // Parse search value based on format
  const format = searchFormat.value;
  const byteValue = parseValueFromMode(searchValue, format);
  
  if (byteValue === null) {
    alert(`Invalid ${format.toUpperCase()} value!\n\nPlease enter a valid value (0-255).`);
    return;
  }
  
  // Search through memory
  memoryViewerState.searchResults = [];
  for (let addr = 0; addr < memoryViewerState.memory.length; addr++) {
    if (memoryViewerState.memory[addr] === byteValue) {
      memoryViewerState.searchResults.push(addr);
    }
  }
  
  // Update UI
  const searchResultsDiv = document.getElementById('searchResults');
  const searchResultText = document.getElementById('searchResultText');
  
  if (memoryViewerState.searchResults.length > 0) {
    memoryViewerState.currentSearchIndex = 0;
    searchResultText.textContent = `Found ${memoryViewerState.searchResults.length} match${memoryViewerState.searchResults.length > 1 ? 'es' : ''} for value ${searchValue}`;
    searchResultsDiv.style.display = 'block';
    
    // Navigate to first result
    goToSearchResult(0);
  } else {
    searchResultText.textContent = `No matches found for value ${searchValue}`;
    searchResultsDiv.style.display = 'block';
  }
  
  console.log(`Search complete: ${memoryViewerState.searchResults.length} matches found`);
}

// Go to Specific Search Result
function goToSearchResult(index) {
  if (memoryViewerState.searchResults.length === 0) return;
  
  const addr = memoryViewerState.searchResults[index];
  
  // Navigate to address
  memoryViewerState.currentAddress = Math.floor(addr / memoryViewerState.bytesPerRow) * memoryViewerState.bytesPerRow;
  memoryViewerState.highlightAddress = addr;
  
  // Re-render grid
  renderMemoryGrid();
  
  // Update search result text
  const searchResultText = document.getElementById('searchResultText');
  searchResultText.textContent = `Match ${index + 1} of ${memoryViewerState.searchResults.length} at address 0x${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

// Go to Next Search Result
function goToNextSearchResult() {
  if (memoryViewerState.searchResults.length === 0) return;
  
  memoryViewerState.currentSearchIndex = (memoryViewerState.currentSearchIndex + 1) % memoryViewerState.searchResults.length;
  goToSearchResult(memoryViewerState.currentSearchIndex);
}

// Go to Previous Search Result
function goToPreviousSearchResult() {
  if (memoryViewerState.searchResults.length === 0) return;
  
  memoryViewerState.currentSearchIndex--;
  if (memoryViewerState.currentSearchIndex < 0) {
    memoryViewerState.currentSearchIndex = memoryViewerState.searchResults.length - 1;
  }
  goToSearchResult(memoryViewerState.currentSearchIndex);
}

// Clear Search
function clearSearch() {
  memoryViewerState.searchResults = [];
  memoryViewerState.currentSearchIndex = -1;
  memoryViewerState.highlightAddress = null;
  
  document.getElementById('searchResults').style.display = 'none';
  document.getElementById('searchInput').value = '';
  
  renderMemoryGrid();
  console.log('Search cleared');
}

// ===== DATA TYPE INSPECTOR FUNCTIONS =====

// Update Data Type Inspector with address info
function updateDataTypeInspector(address) {
  memoryViewerState.inspectedAddress = address;
  
  const inspectorDiv = document.getElementById('dataTypeInspector');
  inspectorDiv.style.display = 'block';
  
  // Update address
  document.getElementById('inspectorAddress').textContent = `0x${address.toString(16).toUpperCase().padStart(5, '0')}`;
  
  // Unsigned byte
  const byte = memoryViewerState.memory[address];
  document.getElementById('inspectorByte').textContent = `${byte} (0x${byte.toString(16).toUpperCase().padStart(2, '0')})`;
  
  // Signed byte (-128 to 127)
  const signedByte = byte > 127 ? byte - 256 : byte;
  document.getElementById('inspectorSignedByte').textContent = `${signedByte}`;
  
  // 16-bit word (little-endian)
  if (address + 1 < memoryViewerState.memory.length) {
    const word = memoryViewerState.memory[address] | (memoryViewerState.memory[address + 1] << 8);
    document.getElementById('inspectorWord').textContent = `${word} (0x${word.toString(16).toUpperCase().padStart(4, '0')})`;
    
    // 16-bit word (big-endian)
    const wordBE = (memoryViewerState.memory[address] << 8) | memoryViewerState.memory[address + 1];
    document.getElementById('inspectorWordBE').textContent = `${wordBE} (0x${wordBE.toString(16).toUpperCase().padStart(4, '0')})`;
  } else {
    document.getElementById('inspectorWord').textContent = 'N/A';
    document.getElementById('inspectorWordBE').textContent = 'N/A';
  }
  
  // 32-bit dword
  if (address + 3 < memoryViewerState.memory.length) {
    const dword = memoryViewerState.memory[address] | 
                  (memoryViewerState.memory[address + 1] << 8) |
                  (memoryViewerState.memory[address + 2] << 16) |
                  (memoryViewerState.memory[address + 3] << 24);
    document.getElementById('inspectorDWord').textContent = `${dword >>> 0} (0x${(dword >>> 0).toString(16).toUpperCase().padStart(8, '0')})`;
    
    // Float (32-bit IEEE 754)
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint8(0, memoryViewerState.memory[address]);
    view.setUint8(1, memoryViewerState.memory[address + 1]);
    view.setUint8(2, memoryViewerState.memory[address + 2]);
    view.setUint8(3, memoryViewerState.memory[address + 3]);
    const floatVal = view.getFloat32(0, true); // true = little-endian
    document.getElementById('inspectorFloat').textContent = floatVal.toFixed(6);
  } else {
    document.getElementById('inspectorDWord').textContent = 'N/A';
    document.getElementById('inspectorFloat').textContent = 'N/A';
  }
  
  // ASCII string (up to 16 characters or null-terminated)
  let str = '"';
  for (let i = 0; i < 16 && address + i < memoryViewerState.memory.length; i++) {
    const b = memoryViewerState.memory[address + i];
    if (b === 0) break; // Null-terminated
    str += (b >= 32 && b <= 126) ? String.fromCharCode(b) : '.';
  }
  str += '"';
  document.getElementById('inspectorString').textContent = str;
  
  console.log(`Data type inspector updated for address 0x${address.toString(16).toUpperCase()}`);
}

// ===== MEMORY FILL FUNCTIONS =====

// Show Memory Fill Dialog
function showMemoryFillDialog() {
  document.getElementById('memoryFillDialog').style.display = 'flex';
  document.getElementById('fillStartAddress').focus();
}

// Close Memory Fill Dialog
function closeMemoryFillDialog() {
  document.getElementById('memoryFillDialog').style.display = 'none';
  document.getElementById('fillStartAddress').value = '';
  document.getElementById('fillEndAddress').value = '';
  document.getElementById('fillValue').value = '';
}

// Execute Memory Fill
function executeMemoryFill() {
  const startAddrStr = document.getElementById('fillStartAddress').value.trim();
  const endAddrStr = document.getElementById('fillEndAddress').value.trim();
  const valueStr = document.getElementById('fillValue').value.trim();
  
  if (!startAddrStr || !endAddrStr || !valueStr) {
    alert('Please fill in all fields!');
    return;
  }
  
  // Parse addresses
  const startAddr = parseInt(startAddrStr.replace(/^0x/i, ''), 16);
  const endAddr = parseInt(endAddrStr.replace(/^0x/i, ''), 16);
  
  // Parse value
  const value = parseInt(valueStr.replace(/^0x/i, ''), 16);
  
  // Validate
  if (isNaN(startAddr) || startAddr < 0 || startAddr >= memoryViewerState.memory.length) {
    alert('Invalid start address!');
    return;
  }
  
  if (isNaN(endAddr) || endAddr < 0 || endAddr >= memoryViewerState.memory.length) {
    alert('Invalid end address!');
    return;
  }
  
  if (startAddr > endAddr) {
    alert('Start address must be less than or equal to end address!');
    return;
  }
  
  if (isNaN(value) || value < 0 || value > 255) {
    alert('Invalid fill value (must be 0-255)!');
    return;
  }
  
  // Fill memory
  const count = fillMemoryRange(startAddr, endAddr, value);
  
  // Close dialog
  closeMemoryFillDialog();
  
  // Show success message
  alert(`Memory Fill Complete!\n\nFilled ${count} bytes from 0x${startAddr.toString(16).toUpperCase()} to 0x${endAddr.toString(16).toUpperCase()} with value 0x${value.toString(16).toUpperCase().padStart(2, '0')}`);
  
  // Navigate to start address
  memoryViewerState.currentAddress = Math.floor(startAddr / memoryViewerState.bytesPerRow) * memoryViewerState.bytesPerRow;
  memoryViewerState.highlightAddress = startAddr;
  
  renderMemoryGrid();
}

// Fill Memory Range
function fillMemoryRange(startAddr, endAddr, value) {
  let count = 0;
  
  for (let addr = startAddr; addr <= endAddr; addr++) {
    if (addr < memoryViewerState.memory.length) {
      memoryViewerState.memory[addr] = value;
      memoryViewerState.writtenAddresses.add(addr);
      count++;
    }
  }
  
  // Update stats
  memoryViewerState.totalWrites += count;
  memoryViewerState.lastAccessTime = new Date();
  
  // Add to history
  addMemoryOperation('FILL', startAddr, null, value);
  
  // Update displays
  updateMemoryStats();
  
  console.log(`Filled ${count} bytes with value ${value}`);
  return count;
}

// Write Memory
function writeMemory(address, value) {
  if (address < 0 || address >= memoryViewerState.memory.length) {
    alert('Invalid memory address!');
    return false;
  }
  
  if (value < 0 || value > 255) {
    alert('Value must be a byte (0-255)!');
    return false;
  }
  
  const oldValue = memoryViewerState.memory[address];
  memoryViewerState.memory[address] = value;
  memoryViewerState.writtenAddresses.add(address);
  memoryViewerState.totalWrites++;
  memoryViewerState.lastAccessTime = new Date();
  
  // Add to history
  addMemoryOperation('WRITE', address, oldValue, value);
  
  // Visual feedback
  highlightMemoryCell(address, 'write');
  
  // Update displays
  renderMemoryGrid();
  updateMemoryStats();
  
  // Update data type inspector if this address is being inspected
  if (memoryViewerState.inspectedAddress === address || 
      (memoryViewerState.inspectedAddress !== null && 
       address >= memoryViewerState.inspectedAddress && 
       address < memoryViewerState.inspectedAddress + 4)) {
    updateDataTypeInspector(memoryViewerState.inspectedAddress);
  }
  
  return true;
}

// Highlight Memory Cell with Animation
function highlightMemoryCell(address, type) {
  // This is handled by CSS classes in renderMemoryGrid
  // Re-render to show animation
  setTimeout(() => {
    renderMemoryGrid();
  }, 500);
}

// Add Memory Operation to History
function addMemoryOperation(type, address, oldValue, newValue) {
  const operation = {
    type: type,
    address: address,
    oldValue: oldValue,
    newValue: newValue,
    timestamp: new Date().toLocaleTimeString()
  };
  
  memoryViewerState.operationHistory.unshift(operation);
  
  // Keep only last 50 operations
  if (memoryViewerState.operationHistory.length > 50) {
    memoryViewerState.operationHistory.pop();
  }
  
  updateHistoryDisplay();
}

// Update History Display
function updateHistoryDisplay() {
  const historyLog = document.getElementById('memoryHistoryLog');
  if (!historyLog) return;
  
  if (memoryViewerState.operationHistory.length === 0) {
    historyLog.innerHTML = `
      <div class="history-empty">
        <span style="font-size: 2rem;">📝</span>
        <p>No memory operations yet. Perform read/write operations to see history.</p>
      </div>
    `;
    return;
  }
  
  let html = '';
  memoryViewerState.operationHistory.forEach(op => {
    const operationClass = op.type === 'WRITE' ? 'write-operation' : 'read-operation';
    const operationIcon = op.type === 'WRITE' ? '✍️' : '📖';
    
    let details = `${operationIcon} <strong>${op.type}</strong> at 0x${op.address.toString(16).toUpperCase().padStart(4, '0')}`;
    
    if (op.type === 'WRITE') {
      details += ` | ${op.oldValue.toString(16).toUpperCase().padStart(2, '0')} → ${op.newValue.toString(16).toUpperCase().padStart(2, '0')}`;
    } else {
      details += ` | Value: ${op.newValue.toString(16).toUpperCase().padStart(2, '0')}`;
    }
    
    html += `
      <div class="history-item ${operationClass}">
        <span>${details}</span>
        <span style="font-size: 0.75rem; color: #64748b;">${op.timestamp}</span>
      </div>
    `;
  });
  
  historyLog.innerHTML = html;
  
  // Update count
  const countBadge = document.querySelector('.history-count');
  if (countBadge) {
    countBadge.textContent = `${memoryViewerState.operationHistory.length} operation${memoryViewerState.operationHistory.length !== 1 ? 's' : ''}`;
  }
}

// Update Memory Statistics
function updateMemoryStats() {
  document.getElementById('totalReads').textContent = memoryViewerState.totalReads;
  document.getElementById('totalWrites').textContent = memoryViewerState.totalWrites;
  document.getElementById('memoryUsed').textContent = `${memoryViewerState.writtenAddresses.size} bytes`;
  document.getElementById('lastAccess').textContent = memoryViewerState.lastAccessTime 
    ? memoryViewerState.lastAccessTime.toLocaleTimeString() 
    : 'Never';
}

// Switch Segment
function switchSegment(segment) {
  memoryViewerState.selectedSegment = segment;
  
  // Update button states
  document.querySelectorAll('.segment-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`segment${segment.charAt(0).toUpperCase() + segment.slice(1)}`).classList.add('active');
  
  // Jump to segment start address
  let targetAddress = 0;
  switch(segment) {
    case 'data':
      targetAddress = memoryViewerState.segmentRegisters.DS * 16;
      break;
    case 'code':
      targetAddress = memoryViewerState.segmentRegisters.CS * 16;
      break;
    case 'stack':
      targetAddress = memoryViewerState.segmentRegisters.SS * 16;
      break;
    case 'extra':
      targetAddress = memoryViewerState.segmentRegisters.ES * 16;
      break;
  }
  
  memoryViewerState.currentAddress = Math.min(targetAddress, memoryViewerState.memory.length - 256);
  renderMemoryGrid();
}

// Go to Address
function goToAddress() {
  const inputElement = document.getElementById('memoryAddressInput');
  const input = inputElement.value.trim();
  
  console.log('goToAddress called with input:', input);
  
  if (!input) {
    alert('Please enter an address!');
    return;
  }
  
  // Parse hex address (with or without 0x prefix)
  const cleanInput = input.replace(/^0x/i, '');
  const address = parseInt(cleanInput, 16);
  
  console.log('Parsed address:', address, 'from input:', cleanInput);
  
  if (isNaN(address)) {
    alert('Invalid hex address format! Please enter a hex number (e.g., 100 or 0x100)');
    return;
  }
  
  if (address < 0 || address >= memoryViewerState.memory.length) {
    alert(`Address out of range! Valid range: 0x00000 - 0x${(memoryViewerState.memory.length - 1).toString(16).toUpperCase().padStart(5, '0')}`);
    return;
  }
  
  // Align to row boundary (16-byte alignment)
  const alignedAddress = Math.floor(address / memoryViewerState.bytesPerRow) * memoryViewerState.bytesPerRow;
  memoryViewerState.currentAddress = alignedAddress;
  
  console.log('Navigating to aligned address:', alignedAddress.toString(16));
  
  // Store the target address for highlighting
  memoryViewerState.highlightAddress = address;
  
  renderMemoryGrid();
  
  // Remove highlight after animation
  setTimeout(() => {
    memoryViewerState.highlightAddress = null;
  }, 1500);
  
  // Visual feedback - no alert, just console
  console.log(`Jumped to address 0x${alignedAddress.toString(16).toUpperCase().padStart(5, '0')}`);
  
  // Clear input
  inputElement.value = '';
  inputElement.focus();
}

// Random Memory Access (for demo)
function randomMemoryAccess() {
  const maxAddr = memoryViewerState.memory.length - 256;
  const randomAddr = Math.floor(Math.random() * maxAddr);
  const alignedAddr = Math.floor(randomAddr / memoryViewerState.bytesPerRow) * memoryViewerState.bytesPerRow;
  
  console.log('🎲 Random navigation:', {
    randomAddr: '0x' + randomAddr.toString(16).toUpperCase(),
    alignedAddr: '0x' + alignedAddr.toString(16).toUpperCase()
  });
  
  memoryViewerState.currentAddress = alignedAddr;
  memoryViewerState.highlightAddress = alignedAddr;
  renderMemoryGrid();
  
  // Update address input to show where we landed
  const addressInput = document.getElementById('memoryAddressInput');
  if (addressInput) {
    addressInput.value = '0x' + alignedAddr.toString(16).toUpperCase();
  }
}

// Show Write Dialog
function showWriteDialog() {
  document.getElementById('writeMemoryDialog').style.display = 'flex';
  document.getElementById('writeAddressInput').focus();
}

// Close Write Dialog
function closeWriteDialog() {
  document.getElementById('writeMemoryDialog').style.display = 'none';
  document.getElementById('writeAddressInput').value = '';
  document.getElementById('writeValueInput').value = '';
}

// Execute Memory Write
function executeMemoryWrite() {
  const addrInput = document.getElementById('writeAddressInput').value.trim();
  const valueInput = document.getElementById('writeValueInput').value.trim();
  
  if (!addrInput || !valueInput) {
    alert('Please enter both address and value!');
    return;
  }
  
  // Parse hex address
  const cleanAddr = addrInput.replace(/^0x/i, '');
  const address = parseInt(cleanAddr, 16);
  
  // Parse hex value
  const cleanValue = valueInput.replace(/^0x/i, '');
  const value = parseInt(cleanValue, 16);
  
  if (isNaN(address) || isNaN(value)) {
    alert('Invalid hex format!');
    return;
  }
  
  if (writeMemory(address, value)) {
    closeWriteDialog();
    
    // Navigate to the written address
    const alignedAddr = Math.floor(address / memoryViewerState.bytesPerRow) * memoryViewerState.bytesPerRow;
    memoryViewerState.currentAddress = alignedAddr;
    renderMemoryGrid();
  }
}

// Clear Memory History
function clearMemoryHistory() {
  if (confirm('Clear all operation history?')) {
    memoryViewerState.operationHistory = [];
    updateHistoryDisplay();
  }
}

// Export Memory Data
function exportMemoryData() {
  // Export non-zero memory locations
  let exportData = 'Memory Dump\n';
  exportData += '='.repeat(50) + '\n\n';
  
  memoryViewerState.writtenAddresses.forEach(addr => {
    const value = memoryViewerState.memory[addr];
    exportData += `0x${addr.toString(16).toUpperCase().padStart(4, '0')}: 0x${value.toString(16).toUpperCase().padStart(2, '0')} (${value})\n`;
  });
  
  exportData += '\n' + '='.repeat(50) + '\n';
  exportData += `Total written addresses: ${memoryViewerState.writtenAddresses.size}\n`;
  exportData += `Total operations: ${memoryViewerState.operationHistory.length}\n`;
  
  // Download as file
  const blob = new Blob([exportData], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'memory_dump.txt';
  a.click();
  URL.revokeObjectURL(url);
}

// Update Segment Register Display
function updateSegmentRegisterDisplay() {
  document.getElementById('csRegister').textContent = `0x${memoryViewerState.segmentRegisters.CS.toString(16).toUpperCase().padStart(4, '0')}`;
  document.getElementById('dsRegister').textContent = `0x${memoryViewerState.segmentRegisters.DS.toString(16).toUpperCase().padStart(4, '0')}`;
  document.getElementById('ssRegister').textContent = `0x${memoryViewerState.segmentRegisters.SS.toString(16).toUpperCase().padStart(4, '0')}`;
  document.getElementById('esRegister').textContent = `0x${memoryViewerState.segmentRegisters.ES.toString(16).toUpperCase().padStart(4, '0')}`;
}

// Sync with Stack Operations (integration with 8086 Stack)
function syncMemoryWithStack() {
  if (!stackMemory || stackMemory.length === 0) return;
  
  // Calculate stack addresses (stack grows downward from SS:FFFF)
  const stackBase = memoryViewerState.segmentRegisters.SS * 16 + 0xFFFF;
  
  // Write stack contents to memory
  stackMemory.forEach((value, index) => {
    const stackAddr = stackBase - (index * 2); // 2 bytes per stack entry (word size)
    
    // Write value as 16-bit word (little-endian)
    if (stackAddr > 0 && stackAddr < memoryViewerState.memory.length) {
      memoryViewerState.memory[stackAddr] = value & 0xFF;           // Low byte
      memoryViewerState.memory[stackAddr - 1] = (value >> 8) & 0xFF; // High byte
      memoryViewerState.writtenAddresses.add(stackAddr);
      memoryViewerState.writtenAddresses.add(stackAddr - 1);
    }
  });
  
  // If memory viewer is on stack segment, refresh display
  if (memoryViewerState.selectedSegment === 'stack') {
    renderMemoryGrid();
  }
}

// Interactive Demo Function
async function demoWriteAndRead() {
  // Notify user
  const startDemo = confirm(
    '🎬 Welcome to Memory Viewer Demo!\n\n' +
    'This demo will:\n' +
    '1. Write "HELLO" to memory addresses 100-104\n' +
    '2. Navigate to address 100\n' +
    '3. Show you the written data\n\n' +
    'Ready to see how it works?'
  );
  
  if (!startDemo) return;
  
  // Step 1: Write HELLO
  const message = 'HELLO';
  let startAddress = 0x100;
  
  for (let i = 0; i < message.length; i++) {
    const charCode = message.charCodeAt(i);
    writeMemory(startAddress + i, charCode);
    await sleep(300); // Small delay for visual effect
  }
  
  // Step 2: Navigate to the address
  memoryViewerState.currentAddress = 0x100;
  memoryViewerState.highlightAddress = 0x100;
  renderMemoryGrid();
  
  // Step 3: Show success message
  setTimeout(() => {
    alert(
      '✅ Demo Complete!\n\n' +
      'Look at the memory grid:\n' +
      '• Green cells at address 0x0100-0x0104 contain "HELLO"\n' +
      '• Click any green cell to read its value\n' +
      '• Check "Operation History" on the right\n' +
      '• See statistics updated at the bottom\n\n' +
      'Now try writing your own data! 😊'
    );
    memoryViewerState.highlightAddress = null;
  }, 1500);
}

// Make functions globally accessible
window.initMemoryViewer = initMemoryViewer;
window.switchSegment = switchSegment;
window.goToAddress = goToAddress;
window.randomMemoryAccess = randomMemoryAccess;
window.showWriteDialog = showWriteDialog;
window.closeWriteDialog = closeWriteDialog;
window.executeMemoryWrite = executeMemoryWrite;
window.clearMemoryHistory = clearMemoryHistory;
window.exportMemoryData = exportMemoryData;
window.readMemoryCell = readMemoryCell;
window.demoWriteAndRead = demoWriteAndRead;

window.updateCurrentViewIndicator = updateCurrentViewIndicator;
