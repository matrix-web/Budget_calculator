const viewController = (() => {
    "use strict";

    const DOMStrings = {
        form: "#budget-form",
        inputType: "#input__type",
        inputDescription: "#input__description",
        inputValue: "#input__value",
        incomeContainer: "#income__list",
        expenseContainer: "#expenses__list",
        budgetLabel: "#budget-value",
        incomeLabel: "#income-label",
        expensesLabel: "#expense-label",
        expensesPercentLabel: "#expense-percent-label",
        budgetTable: "#budget-table",
        yearLabel: "#year",
        monthLabel: "#month",
    };

    function getDOMStrings () {
        return DOMStrings;
    }

    function getInput () {
        return {
            type: document.querySelector(DOMStrings.inputType).value.trim(),
            description: document.querySelector(DOMStrings.inputDescription).value.trim(),
            value: document.querySelector(DOMStrings.inputValue).value.trim()
        };
    }

    function formatNumber (num, type) {
        const [int, dec] = Math.abs(num).toFixed(2).split(".");
        const formatExp = /\B(?=(\d{3})+(?!\d))/g;
        let newInt = int.replace(formatExp, ",");
        let resultNumber = ""

        if (type === "inc") {
            resultNumber = `+ ${newInt}.${dec} \u20BD`;
        } else if (type === "exp") {
            resultNumber = `- ${newInt}.${dec} \u20BD`;
        }

        return resultNumber;
    }

    function renderListItem (type, obj) {
        let containerElement = null;
        let html = null;
        let newHtml = null;

        switch (type) {
            case "inc":
                containerElement = DOMStrings.incomeContainer;
                html = `
                    <li id="inc-%id%" class="budget-list__item item item--income">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">%value%</div>
                            <button class="item__remove">
                                <img
                                    src="./img/circle-green.svg"
                                    alt="delete"
                                />
                            </button>
                        </div>
                    </li>`;
                    break;
            case "exp":
                containerElement = DOMStrings.expenseContainer;
                html = `
                    <li id="exp-%id%" class="budget-list__item item item--expense">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">
                                %value%
                                <div class="item__badge">
                                    <div class="item__percent badge badge--dark">
                                        0%
                                    </div>
                                </div>
                            </div>
                            <button class="item__remove">
                                <img src="./img/circle-red.svg" alt="delete" />
                            </button>
                        </div>
                    </li>
                    `;
                    break;
        }

        newHtml = html.replace("%id%", obj.id);
        newHtml = newHtml.replace("%description%", obj.description);
        newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

        document
        .querySelector(containerElement);
        .insertAdjacentHTML("beforeend", newHtml);
    }

    function clearFileds() {
        const inputDescription = document.querySelector(DOMStrings.inputDescription);
        const inputValue = document.querySelector(DOMStrings.inputValue);

        inputDescription.value = "";
        inputValue.value = "";
        inputDescription.focus();
    }

    function updateBudget(obj) {
        let type = null;
        const budgetLabel = document.querySelector(DOMStrings.budgetLabel);

        if (obj.budget >= 0) {
            type = "inc";
        } else {
            type = "exp";
        }

        if (obj.budget > 0 || obj.budget < 0) {
            budgetLabel.innerText = formatNumber(obj.budget, type);
        } else {
            budgetLabel.innerText = obj.budget + " \u20BD";
        }

        document.querySelector(DOMStrings.incomeLabel).innerText = formatNumber(obj.totalInc, "inc");
        document.querySelector(DOMStrings.expensesLabel).innerText = formatNumber(obj.totalExp, "exp");

        if (obj.percentage > 0) {
            document.querySelector(DOMStrings.expensesPercentLabel).innerText = obj.percentage + "%";
        } else {
            document.querySelector(DOMStrings.expensesPercentLabel).innerText = "--";
        }
    }

    function deleteListItem (itemID) {
        document.querySelector(`#${itemID}`).remove();
    }

    function updateItemsPercentages (items) {
        items.forEach(item => {
            const el = document.getElementById(`exp-${item[0]}`).querySelector(".item__percent");
            
            if (item[1] >= 0) {
                // Если есть - то показываем блок с %
                el.parentElement.style.display = "block";
                // Меняем контент внутри бейджа с процентами
                el.innerText = `${item[1]}%`;
            } else {
                // Если нет - то скрываем бейдж с процентами
                el.parentElement.style.display = "none";
            }
        })
    }

    function displayDate () {
        const now = new Date();
        const months = [
            "Январь", "Февраль", "Март",
            "Апрель", "Май", "Июнь",
            "Июль", "Август","Сентябрь",
            "Октябрь", "Ноябрь", "Декабрь",
        ];
        const year = now.getFullYear();
        const month = months[now.getMonth()];

        document.querySelector(DOMStrings.yearLabel).innerText = year;
        document.querySelector(DOMStrings.monthLabel).innerText = month;
    }

    return {
        getDOMStrings,
        getInput,
        renderListItem,
        clearFileds,
        updateBudget,
        deleteListItem,
        updateItemsPercentages,
        displayDate,
    };
})();
