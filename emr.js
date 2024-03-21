//BILLING
function changeBillItem(){
    var itemType=document.getElementById('itemType');
    var selectedItem=itemType.options[itemType.selectedIndex].value;
    var itemLabel=document.getElementById('itemLabel');
    var itemSearch=document.getElementById('itemName');
    var itemList=document.getElementById('itemList');

    if(selectedItem==="service"){
        itemLabel.textContent="Service Name";
        itemSearch.removeEventListener('click',showProductList);
        itemSearch.addEventListener('click',showServiceList);
        itemList.removeEventListener('change',selectProduct);
        itemList.addEventListener('change',selectService);
    
        
    }else{
        itemLabel.textContent="Product Name";
        itemSearch.removeEventListener('click',showServiceList);
        itemSearch.addEventListener('click',showProductList);
        itemList.removeEventListener('change',selectService);
        itemList.addEventListener('change',selectProduct);
    }
    document.getElementById('itemList').options[document.getElementById('itemList').selectedIndex].text='';
}
// Initially set up event listener for product search
window.onload = function() {
    var input = document.getElementById("itemName");
    input.addEventListener('click', searchProduct);
  };

    function addItem() {
        var itemName = document.getElementById("itemName").value;
        var billDateTime = document.getElementById("billDateTime").value;
        var scheme = document.getElementById("scheme").value;
        var unitPrice = parseFloat(document.getElementById("unitPrice").value);
        var quantity = parseInt(document.getElementById("quantity").value);

        var table = document.getElementById("billItems");
        var row = table.insertRow(-1);

        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        var cell6 = row.insertCell(6);

        var netAmount = unitPrice * quantity;

        cell0.innerHTML = '<input type="checkbox" onchange="calculateTotalAmount()">';
        cell1.innerHTML = itemName;
        cell2.innerHTML = billDateTime;
        cell3.innerHTML = scheme;
        cell4.innerHTML = unitPrice;
        cell5.innerHTML = quantity;
        cell6.innerHTML = netAmount.toFixed(2);

        // Clear input fields after adding item
        document.getElementById("itemName").value = "";
        document.getElementById("billDateTime").value = "";
        document.getElementById("scheme").value = "";
        document.getElementById("unitPrice").value = "";
        document.getElementById("quantity").value = "";

        // Display success message
        document.getElementById("successMessage").innerText = "Bill item added successfully.";
    }
    function newBill(){
        document.getElementById("itemName").value = "";
        document.getElementById("billDateTime").value = "";
        document.getElementById("scheme").value = "";
        document.getElementById("unitPrice").value = "";
        document.getElementById("quantity").value = "";
    }

    
    function toggleInvoiceButton(){
    var saleType=document.getElementById('saleType').value;
    var invoiceButton=document.getElementById('invoiceButton');
    var cashpayLables=document.querySelector(".cashPay");
    if(saleType==='credit'){
        invoiceButton.style.display="inline-block";
        cashpayLables.style.display="none";
    }
    
    else{
        invoiceButton.style.display="none";
        cashpayLables.style.display="block";
        
    }
    (function(){
        toggleInvoiceButton();
    }());
}
    function toggleRefrenceNumber(){
    var payMode=document.getElementById('payMode').value;
    var mobilePay=document.querySelector(".mobilePay");
    if(payMode ==="mobile"){
        mobilePay.style.display="block";
    }else{
        mobilePay.style.display="none";
    }
}

    function calculateTotalAmount() {
        var total = 0.0;
        var checkboxes = document.querySelectorAll('#billItems input[type="checkbox"]:checked');
        checkboxes.forEach(function(checkbox) {
            var row = checkbox.parentNode.parentNode;
            var netAmount = parseFloat(row.cells[6].innerText);
            total += netAmount;
        });
        document.getElementById("totalAmount").value = total.toFixed(2);
    }

    function calculateChange() {
        var totalAmount = parseFloat(document.getElementById("totalAmount").value);
        var amountTendered = parseFloat(document.getElementById("amountTendered").value);
        var changeAmount = amountTendered - totalAmount;
        document.getElementById("changeAmount").value = changeAmount.toFixed(2);
    }
    function savePayment() {
        // Generate receipt
        var receipt = "Receipt\n\n";
        receipt += "Total Amount: $" + document.getElementById("totalAmount").value + "\n";
        receipt += "Amount Tendered: $" + document.getElementById("amountTendered").value + "\n";
        receipt += "Change Amount: $" + document.getElementById("changeAmount").value + "\n\n";
        receipt += "Thank you for your purchase!";
        
        // Open receipt in new window for printing
        var printWindow = window.open("", "_blank");
        printWindow.document.write(receipt);
        printWindow.document.close();
        printWindow.print();
    }
 
 