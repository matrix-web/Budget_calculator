const controller = ((budgetCtlr, uiCtrl) => {
  "use strict";

  function setupEventListeners() {
    const DOM = uiCtrl.getDOMStrings();
    document.querySelector(DOM.form).addEventListener("submit", controlAddItem);

    document.querySelector(DOM.budgetTable).addEventListener("click", controlDeleteItem);
  }

  // Обновление процентов у каждой записи
  function updatePercentages() {
    // 1. Посчитать проценты для каждой записи типа Expense
    budgetCtlr.calculatePercentages();

    // 2. Получение данные по процентам из модели
    const idsAndPercents = budgetCtlr.getAllIdsAndPercentages();

    // 3. Обновление UI с новыми процентами
    uiCtrl.updateItemsPercentages(idsAndPercents);
  }

  // Функиця срабатывающая при отправке формы
  function controlAddItem(event) {
    event.preventDefault();

    // 1. Получить данные из формы
    const input = uiCtrl.getInput();

    if (input.description.length !== 0 && !isNaN(input.value) && input.value > 0) {
      // 2. Добавить полученные данные в модель
      const newItem = budgetCtlr.addItem(
        input.type,
        input.description,
        input.value
      );

      //  отображение добавленных данных для проверки корректности работы
      budgetCtlr.test();

      // 3. Добавить "запись" в UI
      uiCtrl.renderListItem(input.type, newItem);
      uiCtrl.clearFileds();
      // Ввод в форму тестовых данных
      generateTestData.insertInUi();

      // 4. Посчитать бюджет
      updateBudget();

      // 5. Пересчет процентов
      updatePercentages();
    }
  }

  function controlDeleteItem(event) {
    if (event.target.closest(".item__remove")) {
      // Находим ID записи, которую надо удалить
      let itemID = event.target.closest("li.budget-list__item").id;
      const [type, ID] = itemID.split("-");

      // Удалить запись из модели
      budgetCtlr.deleteItem(type, parseInt(ID));

      // Удаление записи из шаблона
      uiCtrl.deleteListItem(itemID);

      // Перерасчет бюджета после удаления записи
      updateBudget();

      // Пересчет процентов
      updatePercentages();
    }
  }

  function updateBudget() {
    let budgetObject = null;

    // 1. Рассчитать бюджет в модели
    budgetCtlr.calculateBudget();

    // 2. Получить рассчитанный бюджет из модели
    budgetObject = budgetCtlr.getBudget();

    // 3. Отобразить бюджет в шаблоне
    uiCtrl.updateBudget(budgetObject);
  }

  function init() {
    console.log("App started!")
    setupEventListeners();
    uiCtrl.displayDate(),
      uiCtrl.updateBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: 0,
      });
  }

  return {
    init,
  };
})(modelController, viewController)

controller.init();
