const products = {
    fruits: [
        { name: "Apple", weight: "1Kg", price: 2020 },
        { name: "Banana", weight: "1Kg", price: 270 },
        { name: "Orange", weight: "1Kg", price: 1830 },
        { name: "Papaya", weight: "1Kg", price: 170 },
        { name: "Grapes", weight: "1Kg", price: 5250 },
        { name: "Watermelon", weight: "1Kg", price: 320 },
    ],
    vegetables: [
        { name: "Pumkin", weight: "200g", price: 350 },
        { name: "Broccoli", weight: "100g", price: 200 },
        { name: "Beetroot", weight: "250g", price: 345 },
        { name: "Potato", weight: "1kg", price: 550 },
        { name: "Tomato", weight: "100g", price: 190 },
        { name: "Cucumber", weight: "250g", price: 170 },
    ],
    dairy: [
        { name: "Milk", weight: "1L", price: 600 },
        { name: "Cheese", weight: "200g", price: 1250 },
        { name: "Yogurt", weight: "80ml", price: 80 },
        { name: "Butter", weight: "100g", price: 675 },
        { name: "Whipped Cream", weight: "250g", price: 1950 },
        { name: "Ice cream", weight: "1L", price: 1350 },
    ],
    meat: [
        { name: "Chicken", weight: "1kg", price: 1980 },
        { name: "Beef", weight: "1kg", price: 3450 },
        { name: "Fish", weight: "1kg", price: 2200 },
        { name: "Prawns", weight: "1kg", price: 1450 },
    ],
    baking: [
        { name: "Flour", weight: "1kg", price: 1250 },
        { name: "Sugar", weight: "1kg", price: 850 },
        { name: "Baking Powder", weight: "200g", price: 320 },
        { name: "Yeast", weight: "100g", price: 150 },
        { name: "Chocolate Chips", weight: "100g", price: 540 },
        { name: "Tea", weight: "100g", price: 620 },
    ],
};

const quantityOptions = [1, 2, 3, 4, 5];

window.onload = function() {
    Object.keys(products).forEach(category => {
        const productSelect = document.getElementById(`${category}-product`);
        products[category].forEach(product => {
            const option = document.createElement('option');
            option.value = product.name;
            option.innerText = product.name;
            productSelect.appendChild(option);
        });

        const quantitySelect = document.getElementById(`${category}-quantity`);
        quantityOptions.forEach(quantity => {
            const option = document.createElement('option');
            option.value = quantity;
            option.innerText = quantity;
            quantitySelect.appendChild(option);
        });
    });
};

function addItemToCart(category) {
    const productSelect = document.getElementById(`${category}-product`);
    const weightSelect = document.getElementById(`${category}-weight`);
    const quantitySelect = document.getElementById(`${category}-quantity`);

    const product = productSelect.value;
    const quantity = quantitySelect.value;

    const weight = (category === 'dairy' || category === 'baking') ? '0' : weightSelect.value;

    const productInfo = products[category].find(p => p.name === product);
    const price = productInfo.price;
    const total = price * quantity;

    const cartTable = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
    const newRow = cartTable.insertRow();

    if (category === 'dairy' || category === 'baking') {
        weightSelect.disabled = true;
    }

    newRow.innerHTML = `
        <td>${product}</td>
        <td>${category}</td>
        <td>${weight}</td>
        <td>${quantity}</td>
        <td>Rs.${price}</td>
        <td>Rs.${total}</td>
        <td><button onclick="removeItem(this)">Remove</button></td>
    `;

    updateTotalPrice();
    alert(`${product} has been added to the cart!`);
}

const cartItemsKey = 'cartItems';
const favoritesKey = 'favorites';

// Add item to cart
function addItemToCart(category) {
    const productSelect = document.getElementById(`${category}-product`);
    const weightSelect = document.getElementById(`${category}-weight`);
    const quantitySelect = document.getElementById(`${category}-quantity`);

    const product = productSelect.value;
    const quantity = quantitySelect.value;
    const weight = (category === 'dairy' || category === 'baking') ? '0' : weightSelect.value;

    const productInfo = products[category].find(p => p.name === product);
    const price = productInfo.price;
    const total = price * quantity;

    const cartTable = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
    const newRow = cartTable.insertRow();

    newRow.innerHTML = `
        <td>${product}</td>
        <td>${category}</td>
        <td>${weight}</td>
        <td>${quantity}</td>
        <td>Rs.${price}</td>
        <td>Rs.${total}</td>
        <td><button onclick="removeItem(this)">Remove</button></td>
    `;

    // Save to localStorage
    saveCartItems();

    updateTotalPrice();
    alert(`${product} has been added to the cart!`);
}

// Save cart items to localStorage
function saveCartItems() {
    const cartTable = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
    const rows = cartTable.getElementsByTagName('tr');
    const items = [];

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const item = {
            product: cells[0].innerText,
            category: cells[1].innerText,
            weight: cells[2].innerText,
            quantity: cells[3].innerText,
            price: parseInt(cells[4].innerText.replace('Rs.', '')),
            total: parseInt(cells[5].innerText.replace('Rs.', ''))
        };
        items.push(item);
    }

    localStorage.setItem(cartItemsKey, JSON.stringify(items));
}

// Add all cart items to favorites
function addToFavorites() {
    const items = JSON.parse(localStorage.getItem(cartItemsKey));

    if (items && items.length > 0) {
        localStorage.setItem(favoritesKey, JSON.stringify(items));
        alert('All cart items have been added to favorites!');
    } else {
        alert('No items in cart to add to favorites.');
    }
}

// Apply favorites to the form and cart
function applyFavorites() {
    const favoriteItems = JSON.parse(localStorage.getItem(favoritesKey));

    if (favoriteItems && favoriteItems.length > 0) {
        // Clear current cart
        const cartTable = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
        cartTable.innerHTML = '';

        // Add favorite items to cart
        favoriteItems.forEach(item => {
            const newRow = cartTable.insertRow();
            newRow.innerHTML = `
                <td>${item.product}</td>
                <td>${item.category}</td>
                <td>${item.weight}</td>
                <td>${item.quantity}</td>
                <td>Rs.${item.price}</td>
                <td>Rs.${item.total}</td>
                <td><button onclick="removeItem(this)">Remove</button></td>
            `;
        });

        updateTotalPrice();
        alert('Favorites have been applied to the cart!');
    } else {
        alert('No favorite items found!');
    }
}

function removeItem(button) {
    const row = button.parentNode.parentNode;
    row.remove();
    updateTotalPrice();
}

function updateTotalPrice() {
    const cartTable = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
    const rows = cartTable.getElementsByTagName('tr');
    let totalPrice = 0;

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const itemTotal = parseInt(cells[5].innerText.replace('Rs.', ''));
        totalPrice += itemTotal;
    }

    document.getElementById('totalPrice').innerText = `Rs.${totalPrice}`;
}
