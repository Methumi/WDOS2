
window.onload = function() {
    const orderItems = JSON.parse(localStorage.getItem('cartItems'));

    if (orderItems && orderItems.length > 0) {
        const orderSummaryTable = document.getElementById('orderSummaryTable').getElementsByTagName('tbody')[0];
        let totalPrice = 0;

        orderItems.forEach(item => {
            const newRow = orderSummaryTable.insertRow();
            newRow.innerHTML = `
                <td>${item.product}</td>
                <td>${item.category}</td>
                <td>${item.weight}</td>
                <td>${item.quantity}</td>
                <td>Rs.${item.price}</td>
                <td>Rs.${item.total}</td>
            `;
            totalPrice += item.total;
        });

        document.getElementById('totalPrice').innerText = `Rs.${totalPrice}`;
    } else {
        alert('No order details found.');
    }
};

function goBack() {
    window.history.back();
}

document.getElementById('payButton').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent the form from submitting

    const fieldsFilled = validateFields(); // Function to check if all required fields are filled

    if (fieldsFilled) {
        const currentDate = new Date();
        const deliveryDate = new Date(currentDate);
        
        // Assuming a delivery time of 3 days from the current date
        deliveryDate.setDate(currentDate.getDate() + 3);

        // Formatting the delivery date (customize the format as needed)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDeliveryDate = deliveryDate.toLocaleDateString(undefined, options);

        alert(`Thank you for your purchase! Your delivery date is ${formattedDeliveryDate}.`);

        // Optionally, clear the form or redirect to another page
        // document.querySelector('form').reset();
        // window.location.href = "some-other-page.html";
    } else {
        alert('Please fill out all required fields before proceeding.');
    }
});

function validateFields() {
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    for (let i = 0; i < requiredFields.length; i++) {
        if (!requiredFields[i].value) {
            requiredFields[i].focus(); // Focus on the first empty field
            return false;
        }
    }
    return true;
}

    