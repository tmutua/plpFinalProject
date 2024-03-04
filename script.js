//DOCTORS PANEL
const complains=document.getElementById("complains");
const illnesshistory=document.getElementById("illnesshistory");
const medicalhistory=document.getElementById("medicalhistory");
const allergies=document.getElementById("allergies");
const impression=document.getElementById("impression");
const diagnosis=document.getElementById("diagnosis");
const drugs=document.getElementById("drugs");
const clinicalsummary=document.getElementById("clinicalsummary");
const diagnosisList=document.getElementById("addedDiagnosis");

function addComplain(){
    const complainList=document.getElementById("addedcomplains");
    if(complains.value ===""){
        alert("Enter complain first");
    }
    else{
        let complain=document.createElement("li");
        complain.textContent=complains.value;
        complainList.appendChild(complain);

        let removeButton=document.createElement("span");
        removeButton.textContent= "X";
        complain.appendChild(removeButton);
        
    }
    complains.value=""
}
function addAllergies(){
    const allergyList=document.getElementById("addedAllergies");
    if(allergies.value ===""){
        alert("Enter allergies first");
    }
    else{
        let allergy=document.createElement("li");
        allergy.textContent=allergies.value;
        allergyList.appendChild(allergy);

        let removeButton=document.createElement("span");
        removeButton.textContent= "X";
        allergy.appendChild(removeButton);
        
    }
    allergies.value=""
}
function addImpression(){
    const impressionList=document.getElementById("addedImpression");
    if(impression.value ===""){
        alert("Enter impression first");
    }
    else{
        let impress=document.createElement("li");
        impress.textContent=impression.value;
        impressionList.appendChild(impress);

        let removeButton=document.createElement("span");
        removeButton.textContent= "X";
        impress.appendChild(removeButton);
        
    }
    impression.value=""
}
function addDiagnosis(){
    
    if(diagnosis.value ===""){
        alert("Enter Diagnosis first");
    }
    else{
        let diagnosed=document.createElement("li");
        diagnosed.textContent=diagnosis.value;
        diagnosisList.appendChild(diagnosed);

        let removeButton=document.createElement("span");
        removeButton.textContent= "X";
        diagnosed.appendChild(removeButton);
        
    }
    diagnosis.value=""
    saveData();
}
function addIllnessHistory(){
    const illnessHistoryList=document.getElementById("addedIllnessHistoryData");
    if(illnesshistory.value ===""){
        alert("Enter illness history first");
    }
    else{
        let historyIllness=document.createElement("li");
        historyIllness.textContent=illnesshistory.value;
        illnessHistoryList.appendChild(historyIllness);

        let removeButton=document.createElement("span");
        removeButton.textContent= "X";
        historyIllness.appendChild(removeButton);
        
    }
    illnesshistory.value=""
}
function addClinicalSummary(){
    const csummaryList=document.getElementById("addedClinicalSummary");
    if(clinicalsummary.value ===""){
        alert("Enter clinical summary first");
    }
    else{
        csummaryList.innerHTML("hello")

        
    }
    clinicalsummary.value=""
}
function saveData(){
    localStorage.setItem("data",diagnosisList.innerHTML);
}
function showData(){
    let savedData=localStorage.getItem("data");

    if (savedData){
        diagnosisList.innerHTML=savedData;
    }
}
showData();
//DOCTOR PANEL ACTIONS

document.getElementById('requestTest').addEventListener('click',function(){
    document.getElementById('labrequest').style.display="block";
});
document.getElementById('requestRad').addEventListener('click',function(){
    document.getElementById('radrequest').style.display="block";
});
document.getElementById('requestTheatre').addEventListener('click',function(){
    document.getElementById('theatrerequest').style.display="block";
});
function closePopup(){
    document.getElementById('radrequest').style.display="none";
    document.getElementById('labrequest').style.display="none";
    document.getElementById('theatrerequest').style.display="none";
}


//BILLING
const dateTime=new Date().toISOString().slice(0,16);
document.getElementById('billdatetime').value=dateTime;

function changeBillItem(){
    var itemtype=document.getElementById('itemtype');
    var selectedItem=itemtype.options[itemtype.selectedIndex].value;
    var itemlabel=document.getElementById('itemlabel');
    var itemsearch=document.getElementById('itemname');

    if(selectedItem==="service"){
        itemlabel.textContent="Service Name";
        
    }else{
        itemlabel.textContent="Product Name";
    }
(function(){
        toggleInvoiceButton();
        toggleInvoiceButton();
    }());
}
function toggleInvoiceButton(){
    var saleType=document.getElementById('saletype').value;
    var invoiceButton=document.getElementById('invoiceButton');
    var cashpayLables=document.querySelector(".cashpay");
    if(saleType==='credit'){
        invoiceButton.style.display="inline-block";
        cashpayLables.style.display="none";
    }
    if (saleType==='cashsale'){
        invoiceButton.style.display="none";
    }
    else{
        invoiceButton.style.display="none";
        invoiceButton.style.display="block";
    }
}
function toggleRefrenceNumber(){
    var payMode=document.getElementById('paymode').value;
    var mobilePay=document.querySelector(".mobilePay");
    if(payMode ==="mobile"){
        mobilePay.style.display="block";
    }else{
        mobilePay.style.display="none";
    }
}
function addBillItem(){
    var billItem=document.getElementById('itemname').value;
    var dateBilled=document.getElementById('billdatetime').value;
    var billScheme=document.getElementById('scheme').value;
    var qty=parseInt(document.getElementById('salequantity').value);
    var rate=parseFloat(document.getElementById('unitprice').value);
    

   
    var table=document.getElementById('billItems');
    var row=table.insertRow(-1);

    var cell0=row.insertCell(0)
    var cell1=row.insertCell(1);
    var cell2=row.insertCell(2);
    var cell3=row.insertCell(3);
    var cell4=row.insertCell(4);
    var cell5=row.insertCell(5);
    var cell6=row.insertCell(6);
    
    var netAmount=rate*qty;
    document.getElementById("amount").value=netAmount;

    cell0.innerHTML='<input type="checkbox" onchange="calculateTotalAmount()">';
    cell1.innerHTML=billItem;
    cell2.innerHTML=dateBilled;
    cell3.innerHTML=billScheme;
    cell4.innerHTML=qty;
    cell5.innerHTML=rate;
    cell6.innerHTML=netAmount.toFixed(2);
    

    document.getElementById('itemname').value="";
    document.getElementById('billdatetime').value="";
    document.getElementById('scheme').value="";
    document.getElementById('salequantity').value="";
    document.getElementById('unitprice').value="";

    document.getElementById('successmsg').innerText="Bill item added successfully";

    
    function calculateTotalAmount(){
        var total=0.0;
        var checkboxes=document.querySelectorAll('#billItems input[type="checkbox"]:checked');
        checkboxes.forEach(function(checkbox){
            var row=checkbox.parentNode.parentNode;
            var netAmount=parseFloat(row.cells[6].innerText);
            total += netAmount;
        });
        document.getElementById("topay").value=total.toFixed(2);
    }
    function calculateChange(){
        var totalAmount=parseFloat(document.getElementById("topay").value);
        var amountTendered=parseFloat(document.getElementById("tendered").value);

        var changeAmount=amountTendered-totalAmount;
        document.getElementById("change").value=changeAmount.toFixed(2);
    }
    
    

    
    


}
//REGISTRATION
    
//ACTION MENU
function toggleActionMenu(){
    var actionDropdown=document.getElementById('actionContent');
    if(actionDropdown.style.display==="none" || actionDropdown.style.display===""){
        actionDropdown.style.display="block";
    }else{
        actionDropdown.style.display==="none" 
    }
}
window.onclick=function(event){
    if(!event.target.matches('.actionbtn')){
        var dropdowns=document.getElementsByClassName("actions-content");
        for(var i=0;i<dropdowns.length;i++){
            var openDropdown=dropdowns[i];
            if(openDropdown.style.display=="block"){
                openDropdown.style.display=="none";
            }
        }
    }
}