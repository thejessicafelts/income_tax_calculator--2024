# 2024 Income Tax Calculator

This project is a web-based income tax calculator designed for the 2024 tax year. It calculates federal income taxes, Michigan state income taxes, and other payroll deductions like OASDI and Medicare taxes. The application uses a simple HTML, CSS, and JavaScript stack.

---

## Features

- **Tax Calculation**:
  - Federal income tax calculations based on the 2024 tax brackets.
  - Michigan state income tax calculations.
  - Payroll taxes, including OASDI and Medicare.

- **Dynamic Form**:
  - Select filing year.
  - Choose filing status.
  - Specify the filing state.
  - Input annual income for real-time calculations.

- **Responsive Design**:
  - Mobile and desktop-friendly layout.
  - Styled with a modern UI.

---

## File Structure

### Files Included

1. **HTML** (`index.html`)
   - Defines the structure and layout of the tax calculator form.

2. **CSS** (`main.css`)
   - Provides styling for the form and layout.

3. **JavaScript** (`main.js`)
   - Handles form submission, input validation, and tax calculations.

4. **Markdown** (`2024Brackets.md`)
   - Contains the detailed federal tax brackets for reference.

---

## Usage

### Requirements
To run this project, you need a web browser.

### Steps
1. Clone the repository.
2. Open `index.html` in any modern web browser.
3. Fill out the form by:
   - Selecting the filing year.
   - Choosing a filing status.
   - Selecting the filing state.
   - Entering your annual income.
4. Submit the form to view calculated taxes and deductions.

---

## Federal Income Tax Brackets

### Filing Single

| Tax Rate | Taxable Income Bracket        | Tax Owed                                                |
|----------|-------------------------------|--------------------------------------------------------|
| 10%      | up to $11,600.00              | 10% of taxable income                                  |
| 12%      | $11,601.00 to $47,150.00      | $1,160.00 + 12% of the amount over $11,600.00         |
| 22%      | $47,151.00 to $100,525.00     | $5,426.00 + 22% of the amount over $47,150.00         |
| 24%      | $100,526.00 to $191,950.00    | $17,168.50 + 24% of the amount over $100,525.00       |
| 32%      | $191,951.00 to $243,725.00    | $39,110.50 + 32% of the amount over $191,950.00       |
| 35%      | $243,726.00 to $609,350.00    | $55,678.50 + 35% of the amount over $243,725.00       |
| 37%      | $609,351.00 or more           | $183,647.25 + 37% of the amount over $609,350.00      |

---

### Married, Filing Jointly

| Tax Rate | Taxable Income Bracket        | Tax Owed                                                |
|----------|-------------------------------|--------------------------------------------------------|
| 10%      | up to $23,200.00              | 10% of taxable income                                  |
| 12%      | $23,201.00 to $94,300.00      | $2,320.00 + 12% of the amount over $23,200.00         |
| 22%      | $94,301.00 to $201,050.00     | $10,852.00 + 22% of the amount over $94,300.00        |
| 24%      | $201,051.00 to $383,900.00    | $34,337.00 + 24% of the amount over $201,050.00       |
| 32%      | $383,901.00 to $487,450.00    | $78,221.00 + 32% of the amount over $383,900.00       |
| 35%      | $487,451.00 to $731,200.00    | $111,357.00 + 35% of the amount over $487,450.00      |
| 37%      | $731,201.00 or more           | $196,667.50 + 37% of the amount over $731,200.00      |

---

### Married, Filing Separately

| Tax Rate | Taxable Income Bracket        | Tax Owed                                                |
|----------|-------------------------------|--------------------------------------------------------|
| 10%      | up to $11,600.00              | 10% of taxable income                                  |
| 12%      | $11,601.00 to $47,150.00      | $1,160.00 + 12% of the amount over $11,600.00         |
| 22%      | $47,151.00 to $100,525.00     | $5,426.00 + 22% of the amount over $47,150.00         |
| 24%      | $100,526.00 to $191,950.00    | $17,168.50 + 24% of the amount over $100,525.00       |
| 32%      | $191,951.00 to $243,725.00    | $39,110.50 + 32% of the amount over $191,950.00       |
| 35%      | $243,726.00 to $365,600.00    | $55,678.50 + 35% of the amount over $243,725.00       |
| 37%      | $365,601.00 or more           | $98,334.75 + 37% of the amount over $365,600.00       |

---

### Head of Household

| Tax Rate | Taxable Income Bracket        | Tax Owed                                                |
|----------|-------------------------------|--------------------------------------------------------|
| 10%      | up to $16,550.00              | 10% of taxable income                                  |
| 12%      | $16,551.00 to $63,100.00      | $1,655.00 + 12% of the amount over $16,550.00         |
| 22%      | $63,101.00 to $100,500.00     | $7,241.00 + 22% of the amount over $63,100.00         |
| 24%      | $100,501.00 to $191,950.00    | $15,469.00 + 24% of the amount over $100,500.00       |
| 32%      | $191,951.00 to $243,700.00    | $37,417.00 + 32% of the amount over $191,950.00       |
| 35%      | $243,701.00 to $609,350.00    | $53,977.00 + 35% of the amount over $243,700.00       |
| 37%      | $609,351.00 or more           | $181,954.50 + 37% of the amount over $609,350.00      |

---

## Technologies Used

- **HTML**: Form structure.
- **CSS**: Styling and responsiveness.
- **JavaScript**: Logic for calculations and input validation.

---

## Contributions

This project was made with ❤️ by **thejessicafelts**. Contributions and improvements are welcome!

