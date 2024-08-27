//Globale counter
let counter = 0;

function counterUp() {
    let currentCount = counter;
    counter++;
    return currentCount;
}

function counterReset() {
    counter = 0;
}

//Header und footer
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

//Menu
function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < BellaVita.length; i++) {
        menuSectionLoop(i);
    }
}

function menuSectionLoop(i) {
    const menuSection = BellaVita[i];
    const foodType = menuSection['foodType'];
    const items = menuSection['typeItems'];
    const img = menuSection['typeImg'];
    content.innerHTML += menuCardSectionHtml(foodType, img);

    for (let x = 0; x < items.length; x++) {
        menuCardLoop(x, items, i);
    }
}

function menuCardSectionHtml(foodType, img) {
    return `
    <h2 id="${foodType}">${foodType}</h2>
    <img src="${img}" class="menu_section_img">
    `;
}

function menuCardLoop(x, items, i) {
    const menuCard = items[x];
    content.innerHTML += menuCardLoopHtml(i, x, menuCard);
}

function menuCardLoopHtml(i, x, menuCard) {
    return `
    <div class="dishcard" onclick="addToBasket(${i}, ${x})">
        <div class="dishcard_firstrow">
            <span>${menuCard['name']}</span>
            <span>${menuCard['price']} €</span>
        </div>
        <span>${menuCard['description']}</span>
    </div>
    `
}

//Basket
function renderBasket() {
    let basket = document.getElementById('basket');

    basket.innerHTML = '';

    for (let i = 0; i < basketContents.length; i++) {
        BasketLoop(i);
    }

    counterReset();
    renderDeliverySwitch();
    returnBasketSum();
}

function BasketLoop(i) {
    const basketCard = basketContents[i];
    const multiply = basketCard['amount'] * basketCard['price'];
    let itemPosition = counterUp();
    basket.innerHTML += BasketLoopHtml(basketCard, itemPosition, multiply);
}

function BasketLoopHtml(basketCard, itemPosition, multiply) {
    return `
        <div class="basket_card">
            <div class="basket_card_first">
                <div>
                    <span>${basketCard['amount']}</span>
                    <span>${basketCard['name']}</span>
                </div>
                <span>${multiply} €</span>
            </div>
            <div class="basket_card_second">
            <div>
                <img src="assets/icons/plus.png" class="basket_icon" onclick="increaseAmount(${itemPosition})">
                <img src="assets/icons/minus.png" class="basket_icon" onclick="decreaseAmount(${itemPosition})">
            </div>
            <div>
                <img src="assets/icons/bin.png" class="basket_icon" onclick="removeFromBasket(${itemPosition})">
            </div>
        </div>
        `
}

function renderDeliverySwitch() {
    if (deliveryCheck[0] == true) {
        delivery_switch.innerHTML = `
        <div class="delivery_switch">
        <button id="delivery" class="button_on" onclick="delivery()">Lieferung</button>
        <button id="take_away" class="button_off" onclick="takeAway()">Abholung</button>
        </div>
        <span>Lieferkosten 2,50 €</span>
    `;
    } else {
        delivery_switch.innerHTML = `
        <div class="delivery_switch">
        <button id="delivery" class="button_off" onclick="delivery()">Lieferung</button>
        <button id="take_away" class="button_on" onclick="takeAway()">Abholung</button>
        </div>
    `;
    }
}

function increaseAmount(x) {
    let basketItem = basketContents[x];
    basketItem['amount']++;
    renderBasket();
    saveBasket();
}

function decreaseAmount(i) {
    let basketItem = basketContents[i];

    if (basketItem['amount'] == 1) {
        basketContents.splice(i, 1);
    } else {
        basketItem['amount']--;
    }

    renderBasket();
    saveBasket();
}

function removeFromBasket(i) {
    basketContents.splice(i, 1);

    renderBasket();
    saveBasket();
}

function addToBasket(i, x) {
    let menuSection = BellaVita[i];
    let items = menuSection['typeItems'];
    let menuItem = items[x];
    let checkBasketItems = basketContents.find(Item => Item.name === menuItem['name']);
    let itemPosition = basketContents.findIndex(Item => Item.name === menuItem['name'])

    if (checkBasketItems) {
        increaseAmount(itemPosition);
    } else {
        basketContents.push({
            name: menuItem.name,
            amount: menuItem.amount,
            price: menuItem.price
        });
    }

    addedNotification(menuItem);
    renderBasket();
    saveBasket();
}

function addedNotification(menuItem) {
    added_notification.innerHTML = `
        ${menuItem['name']} hinzugefügt!
        `;
    document.getElementById("added_notification").classList.remove("d-none");

    setTimeout(() => {
        document.getElementById("added_notification").classList.add("d-none");
    }, 2000);
}

function saveBasket() {
    localStorage.setItem('basket', JSON.stringify(basketContents));
}

function loadBasket() {
    let savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
        basketContents = JSON.parse(savedBasket);
    }
    renderBasket();
    render();
}

function delivery() {
    document.getElementById("take_away").classList.remove("button_on");
    document.getElementById("delivery").classList.remove("button_off");
    document.getElementById("delivery").classList.add("button_on");
    document.getElementById("take_away").classList.add("button_off");
    deliveryCheck.splice(0, 1);
    deliveryCheck.push(true);
    renderBasket();
    saveBasket();
}

function takeAway() {
    document.getElementById("take_away").classList.remove("button_off");
    document.getElementById("delivery").classList.remove("button_on");
    document.getElementById("delivery").classList.add("button_off");
    document.getElementById("take_away").classList.add("button_on");
    deliveryCheck.splice(0, 1);
    deliveryCheck.push(false);
    renderBasket();
    saveBasket();
}

function returnBasketSum() {
    let sum = calcBasketSum();
    let deliveryfee = addDeliveryCost();
    result = sum + deliveryfee;

    basket_sum.innerHTML = `
            <h2> Summe ${result} €</h2>
                `;
}

function calcBasketSum() {
    let sum = 0;

    for (let i = 0; i < basketContents.length; i++) {
        const row = basketContents[i];
        sum += row.price * row.amount;
    }

    return sum;
}

function addDeliveryCost() {
    if (deliveryCheck[0] == true) {
        let deliveryCost = 2.5;
        return deliveryCost;
    } else {
        let deliveryCost = 0;
        return deliveryCost;
    }
}

function sendOrder() {
    openDialog();
    basketContents = [];
    renderBasket();
}

function closeDialog() {

}

function openDialog() {
    document.getElementById("dialog").classList.remove("d-none");
}

function closeDialog() {
    document.getElementById("dialog").classList.add("d-none");
}

//responsive basket
function showBasket() {
    document.getElementById("basket_wrapper").className = 'basket_wrapper_mobile';
    document.getElementById("hide_basket").className = 'hide_basket';
    document.getElementById("show_basket").className = 'd-none';
}

function hideBasket() {
    document.getElementById("basket_wrapper").className = 'basket_wrapper';
    document.getElementById("hide_basket").className = 'd-none';
    document.getElementById("show_basket").className = 'show_basket';
}