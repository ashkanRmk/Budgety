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

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            totalInc: 0,
            totalExp: 0
        }
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

    };



})();


//UI Controller
var uiController = (function () {
    var uiStrings = {
        typeString: '.add__type',
        descstring: '.add__description',
        valueString: '.add__value',
        btnString: '.add__btn',
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(uiStrings.typeString).value,
                desc: document.querySelector(uiStrings.descstring).value,
                value: document.querySelector(uiStrings.valueString).value
            };
        },
        getUiStrings: function () {
            return uiStrings;
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

    var addNewItem = function () {
        var ui,budget;
        //1. Get input
        ui=new uiCntrl.getInput();
        //2. Add item to budget controller
        budget=new budgetCntrl.addItem(ui.type,ui.desc,ui.value);
        
        //3. Add item to UI

        //4. Calculate budget

        //5. update Budget UI
    };


    return {
        init: function () {
            console.log('setup');
            eventListener();
        }
    };
})(budgetController, uiController);

controller.init();
