const modelController = (() => {
    "use strict";

    function Income(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    function Expense(id, description, value) {
        Income.apply(this, [id, description, value]);
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    function addItem(type, description, value) {
        let newItem = null;
        let lastIndex = null;
        let ID = 0;

        // Установка ID
        if (data.allItems[type].length) {
            lastIndex = data.allItems[type].length - 1;
            ID = data.allItems[type][lastIndex].id + 1;
        }

        // Создание ноового объекта в зависимости от типа добавляемой записи
        if (type === "inc") {
            newItem = new Income(ID, description, parseFloat(value));
        } else if (type === "exp") {
            newItem = new Expense(ID, description, parseFloat(value));
        }

        // Записываем "запись" в структуру данных, переменную data
        data.allItems[type].push(newItem);

        return newItem;
    }

    function deleteItem(type, id) {
        // Получение индекса удаляемого элмента
        const index = data.allItems[type].findIndex((item) => item.id === id);
        
        // Проверка найден ли элемент для удаления
        if (index !== -1) {
            // Удалить элемент с найденным индексом
            data.allItems[type].splice(index, 1);
        }
    }

    function calculateTotalSum(type) {
        let sum = 0;

        data.allItems[type].forEach((item) => {
            sum += item.value;
        });

        return sum;
    }

    function calculateBudget() {
        // Подсчет всех доходов
        data.total.inc = calculateTotalSum("inc");

        // Подсчет всех расходов
        data.total.exp = calculateTotalSum("exp");

        data.budget = data.total.inc - data.total.exp;

        // Подсчет % для расходов
        if (data.total.inc > 0) {
            data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
        } else {
            data.percentage = -1;
        }
    }

    function getBudget() {
        return {
            budget: data.budget,
            totalInc: data.total.inc,
            totalExp: data.total.exp,
            percentage: data.percentage,
        };
    }

    function calculatePercentages() {
        data.allItems.exp.forEach((item) => {
            item.calcPercentage(data.total.inc);
        });
    }

    function getAllIdsAndPercentages() {
        return data.allItems.exp.map((item) => [item.id, item.percentage]);
    }

    const data = {
        allItems: {
            inc: [],
            exp: [],
        },
        total: {
            inc: 0,
            exp: 0,
        },
        budget: 0,
        percentage: -1,
    };

    function test() {
        console.log(data);
    }

    return {
        addItem,
        test,
        calculateBudget,
        getBudget,
        deleteItem,
        calculatePercentages,
        getAllIdsAndPercentages,
    };
})();
