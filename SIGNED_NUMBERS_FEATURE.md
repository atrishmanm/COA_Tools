# Signed Number Representations - Feature Implementation ✅

## 🎯 Feature Overview

Comprehensive visual comparison of **three signed number representation formats** used in computer systems, with real-time updates based on calculator input.

---

## 📐 Three Representation Methods

### 1. **Sign-Magnitude** ±
- **MSB = Sign bit** (0 = positive, 1 = negative)
- Remaining bits = magnitude
- **Example**: -7 = `1000 0111` (sign bit=1, magnitude=7)
- **Range (8-bit)**: -(2⁷-1) to +(2⁷-1) = -127 to +127
- **Special Case**: Two representations of zero (0000 0000 and 1000 0000)

### 2. **1's Complement** ⊕
- **Positive**: Normal binary
- **Negative**: Invert all bits of positive value
- **Example**: -7 = `1111 1000` (invert 0000 0111)
- **Range (8-bit)**: -(2⁷-1) to +(2⁷-1) = -127 to +127
- **Special Case**: Two representations of zero (0000 0000 and 1111 1111)

### 3. **2's Complement** ⊕₂ (8086 Standard)
- **Positive**: Normal binary
- **Negative**: Invert all bits + add 1
- **Example**: -7 = `1111 1001` (invert 0000 0111 → 1111 1000 + 1)
- **Range (8-bit)**: -2⁷ to +(2⁷-1) = -128 to +127
- **Advantage**: Only one representation of zero
- **Used by**: 8086, most modern processors

---

## 🎨 Visual Design

### **Section Layout:**
```
┌─────────────────────────────────────────────────┐
│    🔢 SIGNED NUMBER REPRESENTATIONS              │
│    Comparison of formats                         │
├──────────────┬──────────────┬───────────────────┤
│ Sign-Magnitude│ 1's Complement│ 2's Complement  │
│      ±       │       ⊕      │      ⊕₂          │
│              │              │  [8086 Uses This] │
├──────────────┼──────────────┼───────────────────┤
│ Binary: 0000 │ Binary: 0000 │ Binary: 0000     │
│ Decimal: 5   │ Decimal: 5   │ Decimal: 5       │
│ Range: ±127  │ Range: ±127  │ Range: -128~+127 │
└──────────────┴──────────────┴───────────────────┘

┌─────────────────────────────────────────────────┐
│    📊 Quick Comparison (8-bit)                   │
├─────────┬──────────┬──────────┬─────────────────┤
│ Decimal │ Sign-Mag │ 1's Comp │ 2's Comp        │
├─────────┼──────────┼──────────┼─────────────────┤
│   +7    │ 0000 0111│ 0000 0111│ 0000 0111       │
│   +1    │ 0000 0001│ 0000 0001│ 0000 0001       │
│    0    │ 0000 0000│ 0000 0000│ 0000 0000       │
│   -0    │ 1000 0000│ 1111 1111│ —               │
│   -1    │ 1000 0001│ 1111 1110│ 1111 1111       │
│   -7    │ 1000 0111│ 1111 1000│ 1111 1001       │
│  -128   │ —        │ —        │ 1000 0000       │
└─────────┴──────────┴──────────┴─────────────────┘
```

### **Color Scheme:**
- **Background**: Purple gradient (#312e81 → #1e1b4b)
- **Cards**: Dark purple with violet borders
- **Active Card** (2's Complement): Highlighted with purple glow
- **Badge**: "8086 Uses This" in gradient purple
- **Text**: Light purple/white for readability

---

## 🔧 Technical Implementation

### **HTML Structure:**
```html
<div class="signed-number-section">
  <!-- Header -->
  <h4>🔢 SIGNED NUMBER REPRESENTATIONS</h4>
  
  <!-- Three Cards Grid -->
  <div class="signed-representations-grid">
    <!-- Sign-Magnitude Card -->
    <div class="representation-card sign-magnitude">
      <div class="repr-header">±</div>
      <div class="repr-value">Binary: 0000 0000</div>
    </div>
    
    <!-- 1's Complement Card -->
    <div class="representation-card ones-complement">...</div>
    
    <!-- 2's Complement Card (Active) -->
    <div class="representation-card twos-complement active">
      <span class="active-badge">8086 Uses This</span>
      ...
    </div>
  </div>
  
  <!-- Comparison Table -->
  <div class="comparison-table">
    <table class="repr-table">...</table>
  </div>
</div>
```

### **JavaScript Functions:**

```javascript
// Convert to Sign-Magnitude
function toSignMagnitude(decimal) {
  // MSB = sign bit, remaining = magnitude
  const signBit = decimal < 0 ? '1' : '0';
  const magnitude = Math.abs(decimal).toString(2).padStart(7, '0');
  return signBit + magnitude;
}

// Convert to 1's Complement
function toOnesComplement(decimal) {
  if (decimal >= 0) return toBinary(decimal);
  // Negative: invert all bits
  let positive = toBinary(Math.abs(decimal));
  return invertBits(positive);
}

// Convert to 2's Complement
function toTwosComplement(decimal) {
  if (decimal >= 0) return toBinary(decimal);
  // Negative: invert bits + add 1
  let onesComp = invertBits(toBinary(Math.abs(decimal)));
  return addOne(onesComp);
}

// Update display in real-time
function updateSignedRepresentations() {
  const value = parseInt(currentDisplay) || 0;
  // Updates all three cards with current value
  document.getElementById('signMagnitudeValue').textContent = toSignMagnitude(value);
  document.getElementById('onesComplementValue').textContent = toOnesComplement(value);
  document.getElementById('twosComplementValue').textContent = toTwosComplement(value);
}
```

### **CSS Styling:**
```css
.signed-number-section {
  background: linear-gradient(135deg, #312e81, #1e1b4b);
  border-radius: 1.5rem;
  padding: 1.5rem;
  border: 2px solid rgba(139, 92, 246, 0.4);
}

.representation-card {
  background: rgba(30, 27, 75, 0.6);
  border: 2px solid rgba(167, 139, 250, 0.3);
  transition: transform 0.3s ease;
}

.representation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(139, 92, 246, 0.3);
}

.representation-card.active {
  border-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.15);
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
}
```

---

## 📊 Comparison Table Features

### **Included Examples:**
| Decimal | Sign-Magnitude | 1's Complement | 2's Complement |
|---------|----------------|----------------|----------------|
| **+7**  | 0000 0111      | 0000 0111      | 0000 0111      |
| **+1**  | 0000 0001      | 0000 0001      | 0000 0001      |
| **0**   | 0000 0000      | 0000 0000      | 0000 0000      |
| **-0**  | 1000 0000 ⚠️   | 1111 1111 ⚠️   | — (No -0) ✅   |
| **-1**  | 1000 0001      | 1111 1110      | 1111 1111      |
| **-7**  | 1000 0111      | 1111 1000      | 1111 1001      |
| **-128**| — (overflow)   | — (overflow)   | 1000 0000 ✅   |

### **Key Insights:**
- ⚠️ Sign-Magnitude & 1's Complement have **two zeros** (inefficient)
- ✅ 2's Complement has **only one zero** (efficient)
- ✅ 2's Complement can represent **-128** (one extra negative value)
- 🎯 Modern processors use **2's Complement** for these advantages

---

## 🎓 Educational Value

### **Concepts Demonstrated:**
1. **Binary Representation**: How numbers are stored in memory
2. **Sign Bit**: MSB indicates positive/negative
3. **Bit Inversion**: 1's complement operation
4. **Addition Logic**: Why 2's complement is superior
5. **Range Calculations**: Why ranges differ between systems
6. **Historical Context**: Evolution of number representation

### **Learning Outcomes:**
- ✅ Understand three major signed number formats
- ✅ Convert between decimal and binary representations
- ✅ Recognize 8086 uses 2's complement
- ✅ Appreciate advantages of 2's complement
- ✅ Calculate ranges for different bit widths
- ✅ Identify special cases (dual zeros, overflow)

---

## 🚀 Real-Time Updates

### **Update Triggers:**
- Entering numbers on keypad
- PUSH operation
- POP operation
- Arithmetic operations
- Result calculations
- Display changes

### **Update Flow:**
```
User Input → currentDisplay changes
     ↓
updateDisplay() called
     ↓
updateSignedRepresentations() called
     ↓
Calculate 3 representations
     ↓
Update DOM elements
     ↓
Visual update complete (animated)
```

---

## 🎯 Advantages of 2's Complement (Why 8086 Uses It)

### 1. **Single Zero Representation**
- Sign-Magnitude: `0000 0000` and `1000 0000`
- 1's Complement: `0000 0000` and `1111 1111`
- **2's Complement: `0000 0000` only** ✅

### 2. **Simpler Addition Circuit**
- Same circuit for signed and unsigned
- No special case for subtraction
- Just add and ignore overflow

### 3. **Extended Negative Range**
- Can represent -128 in 8-bit
- One extra negative value

### 4. **No End-Around Carry**
- 1's complement needs extra step
- 2's complement addition is direct

---

## 📱 Responsive Design

### **Desktop (>1024px):**
- Three cards side-by-side
- Full table with all columns

### **Tablet (768px - 1024px):**
- Single column card layout
- Compact table

### **Mobile (<768px):**
- Stacked cards
- Scrollable table
- Active badge repositioned

---

## 🎨 Visual Enhancements

### **Card Hover Effects:**
- Lift animation (translateY -2px)
- Shadow intensifies
- Border glows

### **Active Card (2's Complement):**
- Special purple glow
- "8086 Uses This" badge
- Highlighted border

### **Table Interactions:**
- Row hover highlighting
- Alternating row colors
- Sticky header (on scroll)

---

## 💡 Usage Example

```javascript
// Input: 5
updateSignedRepresentations(5)
→ Sign-Magnitude: 0000 0101
→ 1's Complement: 0000 0101
→ 2's Complement: 0000 0101

// Input: -5
updateSignedRepresentations(-5)
→ Sign-Magnitude: 1000 0101 (sign bit + magnitude)
→ 1's Complement: 1111 1010 (invert 0000 0101)
→ 2's Complement: 1111 1011 (invert + add 1)
```

---

## ✅ Feature Checklist

- ✅ Three representation cards
- ✅ Real-time binary conversion
- ✅ Decimal value display
- ✅ Range information
- ✅ Comparison table with 7 examples
- ✅ "8086 Uses This" badge
- ✅ Purple-themed design
- ✅ Responsive layout
- ✅ Hover animations
- ✅ Auto-updates with calculator
- ✅ Educational descriptions
- ✅ Monospace fonts for binary
- ✅ Color-coded sections

---

**Status**: ✅ **FULLY IMPLEMENTED**  
**Location**: Between Memory Viewer and Instructions  
**Updates**: Real-time with every calculator operation  
**Theme**: Purple gradient with violet accents  
**Developer**: Atrishman Mukherjee  
**Date**: October 15, 2025

---

## 🔮 Next Features to Implement:

4. **Booth's Algorithm Visualizer**
5. **Memory Map Visualizer**
6. **Cache Simulator**
7. **Instruction Pipeline**

**Progress**: 3/7 Advanced Features Complete! 🎉
