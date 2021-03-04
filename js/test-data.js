const generateTestData = (() => {
    "use strict"

    function ExampleItem (type, description, sum) {
        this.type = type;
        this.description = description;
        this.sum = sum;
    }

    const testData = [
        new ExampleItem("inc", "Зарплата", 1245),
        new ExampleItem("inc", "Фриланс", 820),
        new ExampleItem("inc", "Партнерская программа", 110),
        new ExampleItem("inc", "Продажи digital", 90),
        new ExampleItem("exp", "Рента", 400),
        new ExampleItem("exp", "Бензин", 60),
        new ExampleItem("exp", "Продукты", 300),
        new ExampleItem("exp", "Развлечения", 100)
    ]

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function insertInUi () {
        const random = getRandomInt(testData.length);
        const randomItem = testData[random];

        document.querySelector("#input__type").value = randomItem.type;
        document.querySelector("#input__description").value = randomItem.description;
        document.querySelector("#input__value").value = randomItem.sum;
    }

    return {
        insertInUi
    }

})()

generateTestData.insertInUi();