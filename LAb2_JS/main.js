// Массив транзакций
const transactions = [
  {
    transaction_id: 1,
    transaction_date: "2024-01-15",
    transaction_amount: 150,
    transaction_type: "debit",
    transaction_description: "Grocery shopping",
    merchant_name: "SuperMarket",
    card_type: "debit"
  },
  {
    transaction_id: 2,
    transaction_date: "2024-02-10",
    transaction_amount: 2000,
    transaction_type: "credit",
    transaction_description: "Salary",
    merchant_name: "Company",
    card_type: "debit"
  },
  {
    transaction_id: 3,
    transaction_date: "2024-02-20",
    transaction_amount: 300,
    transaction_type: "debit",
    transaction_description: "Electronics",
    merchant_name: "TechStore",
    card_type: "credit"
  }
];


// 1. Уникальные типы транзакций

function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map(t => t.transaction_type))];
}


// 2. Общая сумма транзакций

function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}


// 3. Сумма по дате (extra)

function calculateTotalAmountByDate(transactions, year, month, day) {
  return transactions
    .filter(t => {
      const date = new Date(t.transaction_date);

      return (!year || date.getFullYear() === year) &&
             (!month || date.getMonth() + 1 === month) &&
             (!day || date.getDate() === day);
    })
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}


// 4. По типу транзакции

function getTransactionByType(transactions, type) {
  return transactions.filter(t => t.transaction_type === type);
}


// 5. Диапазон дат

function getTransactionsInDateRange(transactions, startDate, endDate) {
  return transactions.filter(t => {
    const date = new Date(t.transaction_date);
    return date >= new Date(startDate) &&
           date <= new Date(endDate);
  });
}


// 6. По merchant name

function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(t =>
    t.merchant_name === merchantName
  );
}


// 7. Средняя сумма

function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;

  return calculateTotalAmount(transactions) / transactions.length;
}


// 8. Диапазон суммы

function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(t =>
    t.transaction_amount >= minAmount &&
    t.transaction_amount <= maxAmount
  );
}


// 9. Общая сумма debit

function calculateTotalDebitAmount(transactions) {
  return transactions
    .filter(t => t.transaction_type === "debit")
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}


// 10. Месяц с максимум транзакций

function findMostTransactionsMonth(transactions) {
  if (transactions.length === 0) return null;

  const count = {};

  transactions.forEach(t => {
    const month = new Date(t.transaction_date).getMonth() + 1;
    count[month] = (count[month] || 0) + 1;
  });

  return Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );
}


// 11. Месяц с максимум debit

function findMostDebitTransactionMonth(transactions) {
  if (transactions.length === 0) return null;

  const count = {};

  transactions
    .filter(t => t.transaction_type === "debit")
    .forEach(t => {
      const month = new Date(t.transaction_date).getMonth() + 1;
      count[month] = (count[month] || 0) + 1;
    });

  return Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );
}


// 12. Каких транзакций больше

function mostTransactionTypes(transactions) {
  const debit = transactions.filter(t => t.transaction_type === "debit").length;
  const credit = transactions.filter(t => t.transaction_type === "credit").length;

  if (debit > credit) return "debit";
  if (credit > debit) return "credit";
  return "equal";
}


// 13. До указанной даты

function getTransactionsBeforeDate(transactions, date) {
  return transactions.filter(t =>
    new Date(t.transaction_date) < new Date(date)
  );
}


// 14. По ID

function findTransactionById(transactions, id) {
  return transactions.find(t => t.transaction_id === id);
}


// 15. Только описания

function mapTransactionDescriptions(transactions) {
  return transactions.map(t => t.transaction_description);
}


// Тестирование


console.log("Unique types:", getUniqueTransactionTypes(transactions));
console.log("Total amount:", calculateTotalAmount(transactions));
console.log("Average:", calculateAverageTransactionAmount(transactions));
console.log("Debit total:", calculateTotalDebitAmount(transactions));
console.log("Most transaction month:", findMostTransactionsMonth(transactions));
console.log("Most debit month:", findMostDebitTransactionMonth(transactions));
console.log("Most type:", mostTransactionTypes(transactions));
console.log("Find ID=2:", findTransactionById(transactions, 2));
