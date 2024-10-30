// HTML এলিমেন্ট খুঁজে বের করা
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const addExpenseButton = document.getElementById("add-expense-button");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");

// মোট খরচ এবং খরচ তালিকার ভেরিয়েবল
let total = 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// খরচগুলো লোড করা
function loadExpenses() {
  expenses.forEach(expense => {
    addExpenseToDOM(expense.name, expense.amount);
    total += expense.amount;
  });
  totalAmount.innerText = total.toFixed(2);
}

// খরচ যুক্ত করে Local Storage আপডেট করা
function addExpense() {
  const expenseName = expenseNameInput.value.trim();
  const expenseAmount = parseFloat(expenseAmountInput.value);

  if (expenseName === "" || isNaN(expenseAmount) || expenseAmount <= 0) {
    alert("Please enter a valid expense name and amount.");
    return;
  }

  const expense = { name: expenseName, amount: expenseAmount };
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  addExpenseToDOM(expenseName, expenseAmount);

  total += expenseAmount;
  totalAmount.innerText = total.toFixed(2);

  expenseNameInput.value = "";
  expenseAmountInput.value = "";
}

// খরচ DOM-এ যোগ করা
function addExpenseToDOM(name, amount) {
  const expenseItem = document.createElement("li");
  expenseItem.classList.add("expense-item");
  expenseItem.innerHTML = `
    ${name}: ৳ ${amount.toFixed(2)}
    <button class="delete-button">Delete</button>
  `;

  const deleteButton = expenseItem.querySelector(".delete-button");
  deleteButton.addEventListener("click", function() {
    deleteExpense(expenseItem, amount);
  });

  expenseList.appendChild(expenseItem);
}

// খরচ ডিলিট করা এবং Local Storage আপডেট করা
function deleteExpense(expenseItem, amount) {
  expenseList.removeChild(expenseItem);

  total -= amount;
  totalAmount.innerText = total.toFixed(2);

  expenses = expenses.filter(expense => expense.amount !== amount || expense.name !== expenseItem.innerText.split(':')[0].trim());
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// বাটনের ইভেন্ট লিসেনার যোগ করা
addExpenseButton.addEventListener("click", addExpense);

// পেজ লোড হলে খরচগুলো লোড করা
loadExpenses();
