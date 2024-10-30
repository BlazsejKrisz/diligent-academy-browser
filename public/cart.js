function createElement(tag, className, content = '', attributes = {}) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    return element;
}

function addItemDetails(itemName, itemPrice, itemImageSrc) {
    const itemDetails = createElement('div', 'item-details');
    itemDetails.appendChild(createElement('img', 'item-image', '', { src: itemImageSrc, alt: 'shop item picture' }));
    itemDetails.appendChild(createElement('p', 'item-name', itemName));
    itemDetails.appendChild(createElement('p', 'item-price', `${itemPrice.toFixed(2)}`));
    return itemDetails;
}

function addItemQuantity(itemId, itemPrice, updateTotal) {
    const itemQuantity = createElement('div', 'item-quantity');
    const quantityValue = createElement('span', 'quantity-value', '1');

    const increaseButton = createElement('button', 'quantity-modifier button', '+', { id: 'quantity-increase' });
    increaseButton.addEventListener('click', () => {
        const currentQuantity = parseInt(quantityValue.textContent);
        if (currentQuantity < 30) {
            quantityValue.textContent = currentQuantity + 1;
            updateTotal();
        }
    });

    const decreaseButton = createElement('button', 'quantity-modifier button', '-', { id: 'quantity-decrease' });
    decreaseButton.addEventListener('click', () => {
        const currentQuantity = parseInt(quantityValue.textContent);
        if (currentQuantity > 0) { 
            quantityValue.textContent = currentQuantity - 1;
            updateTotal();
        }
    });

    itemQuantity.append(decreaseButton, quantityValue, increaseButton);
    return itemQuantity;
}

function addRemoveButton(cartItem, updateTotal) {
    const removeButton = createElement('button', 'remove-item-button button', 'Remove');

    removeButton.addEventListener('click', () => {
        const itemSeparator = cartItem.nextElementSibling;
        cartItem.remove();
        if (itemSeparator && itemSeparator.tagName === 'HR') {
            itemSeparator.remove();
        }
        updateTotal();
    });
    return removeButton;
}

function addCartItem(itemId, itemName, itemPrice, itemImageSrc) {
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const cartItem = createElement('div', 'cart-item', '', { id: itemId });

    const updateTotal = calculateTotal; 

    cartItem.append(
        addItemDetails(itemName, itemPrice, itemImageSrc),
        addItemQuantity(itemId, itemPrice, updateTotal),
        addRemoveButton(cartItem, updateTotal)
    );
    cartItemsContainer.append(cartItem, createElement('hr'));

    updateTotal();
}

function calculateTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let totalAmount = 0;

    cartItems.forEach(item => {
        const itemPrice = parseFloat(item.querySelector('.item-price').textContent);
        const itemQuantity = parseInt(item.querySelector('.quantity-value').textContent);
        totalAmount += price * quantity;
    });

    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}

function removeCartItem(itemId) {
        //TODO
}


addCartItem("1", "Strawberry Tea", 15.00, "test.jpg");
addCartItem("2", "Green Tea", 20.00, "test.jpg");
