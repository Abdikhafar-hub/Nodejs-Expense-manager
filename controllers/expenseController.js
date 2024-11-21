let expenses = [
    { id: 1, description: 'Groceries', amount: 50, user: 'testuser' },
    { id: 2, description: 'Transport', amount: 20, user: 'testuser' }
];

exports.getExpenses = (req, res) => {
    const userExpenses = expenses.filter(expense => expense.user === req.user.username);
    res.json(userExpenses);
};

exports.addExpense = (req, res) => {
    const { description, amount } = req.body;

    if (!description || !amount) {
        return res.status(400).json({ message: 'Description and amount are required' });
    }

    const newExpense = {
        id: expenses.length + 1,
        description,
        amount,
        user: req.user.username
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
};

exports.updateExpense = (req, res) => {
    const { id } = req.params;
    const { description, amount } = req.body;

    const expense = expenses.find(e => e.id === parseInt(id) && e.user === req.user.username);
    if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
    }

    if (description) expense.description = description;
    if (amount) expense.amount = amount;

    res.json(expense);
};

exports.deleteExpense = (req, res) => {
    const { id } = req.params;
    expenses = expenses.filter(e => e.id !== parseInt(id) || e.user !== req.user.username);
    res.status(204).end();
};
