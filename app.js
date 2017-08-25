//Budget Controller
var budgetController = (function () {

    var Expenses = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });
        data.total[type] = sum;
    }
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: -1
    }

    return {
        addItem: function (type, desc, val) {
            var newItem, ID;
            if (data.allItems[type].length > 0)
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            else
                ID = 0;

            if (type === 'inc')
                newItem = new Income(ID, desc, val);
            else if (type === 'exp')
                newItem = new Expenses(ID, desc, val);
            data.allItems[type].push(newItem);
            return newItem;
        },

        calculateBudget: function () {
            calculateTotal('inc');
            calculateTotal('exp');
            data.budget = data.total.inc - data.total.exp;
            if(data.total.inc >0)
            data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
            else
                data.percentage=-1;
        },

        getBudget: function () {
            return {
                displayPerc: data.percentage,
                displayBudget: data.budget,
                displayTotalInc: data.total.inc,
                displayTotalExp: data.total.exp
            };
        }
    };



})();


//UI Controller
var uiController = (function () {
    var uiStrings = {
        typeString: '.add__type',
        descstring: '.add__description',
        valueString: '.add__value',
        btnString: '.add__btn',
        incString: '.income__list',
        expString: '.expenses__list'

    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(uiStrings.typeString).value,
                desc: document.querySelector(uiStrings.descstring).value,
                value: parseFloat(document.querySelector(uiStrings.valueString).value)
            };
        },
        getUiStrings: function () {
            return uiStrings;
        },
        addItemToUi: function (newItem, type) {
            var html, element;

            if (type === 'exp') {
                element = uiStrings.expString;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'inc') {
                element = uiStrings.incString;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            html = html.replace('%id%', newItem.id);
            html = html.replace('%description%', newItem.description);
            html = html.replace('%value%', newItem.value);
            document.querySelector(element).insertAdjacentHTML('beforeend', html);
            //Clear fields
            document.querySelector(uiStrings.valueString).value = "";
            document.querySelector(uiStrings.descstring).value = "";
            document.querySelector(uiStrings.descstring).focus();

        }
    };



})();


//Global Controller
var controller = (function (budgetCntrl, uiCntrl) {

    var eventListener = function () {
        var getUiStrings = uiCntrl.getUiStrings();
        document.querySelector(getUiStrings.btnString).addEventListener('click', addNewItem);
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13)
                addNewItem();
        });
    };

    var updateBudget = function () {
        //4. Calculate budget
        budgetCntrl.calculateBudget();
        //5. return the budget
        var budget=budgetCntrl.getBudget();
        console.log(budget);
        //6. update Budget UI
    };

    var addNewItem = function () {
        var ui, budget;
        //1. Get input
        ui = new uiCntrl.getInput();

        if (ui.desc !== "" && !isNaN(ui.value) && ui.value > 0) {
            //2. Add item to budget controller
            budget = new budgetCntrl.addItem(ui.type, ui.desc, ui.value);
            //3. Add item to UI
            item = new uiCntrl.addItemToUi(budget, ui.type);
            //4.update budget
            updateBudget();
        }

    };


    return {
        init: function () {
            console.log('setup');
            eventListener();
        }
    };
})(budgetController, uiController);

controller.init();
