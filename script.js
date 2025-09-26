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
  
  // Close dropdowns when clicking outside
  document.onclick = function(e) {
    if (!e.target.closest('.modern-dropdown')) {
      document.querySelectorAll('.modern-dropdown').forEach(function(d) {
        d.classList.remove('open');
      });
      // Remove all scroll listeners when closing dropdowns
      const allDropdowns = ['fromBaseWrapper', 'toBaseWrapper', 'greyTypeWrapper', 'bcdTypeWrapper', 'excess3TypeWrapper', 'asciiTypeWrapper', 'parityTypeWrapper', 'operationWrapper', 'complementTypeWrapper', 'bcdOperationWrapper'];
      // Note: We can't easily remove specific listeners here, but they'll be cleaned up when dropdowns are reopened
    }
  };
  
  console.log('All dropdowns initialized successfully!');
});