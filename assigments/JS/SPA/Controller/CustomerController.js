$('#txtCustID').focus();


const custIDregEx = /^(C00-)[0-9]{3}$/;
const custNameregEx = /^[A-z/ ]{5,30}$/;
const custAddresssregEx = /^[0-9 A-z. ,/]{5,}$/;
const custTellregEx = /^[0-9]{10}$/;

let CustomerVali = [];

CustomerVali.push({reg:custIDregEx,field:$('#txtCustomerID'),error:'Customer Id is not match to Valied Patten :C00-001'});
CustomerVali.push({reg:custNameregEx,field: $('#txtCustomerName'),error:'Customer Name is Not match To Valied Patten :Chathuranga dilshan'});
CustomerVali.push({reg:custAddresssregEx,field:$('#txtCustomerAddress'),error:'Customer Address is Not match To Valied Patten:103/2,kaluthara,kalauthara'});
CustomerVali.push({reg:custTellregEx,field:$('#txtCustomerTelNumber'),error:'Customer Tell-Number is Not match To Valied Patten:+94 0764512369'});

$('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerTelNumber').on('keyup',function () {
    checkValiedCustomer();
});

$('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerTelNumber').on('blur',function () {
    checkValiedCustomer();
});

function checkValiedCustomer() {
    let error = 0;
    for (let validation of CustomerVali){
        if(validation.reg.test(validation.field.val())){
            textSuccess(validation.field,"");
        }else {
            error = error+1;
            setTextError(validation.field,validation.error);
        }
    }
    setButtonState1(error);
}

function check(regex,field) {
    let inputValue = field.val();
    return regex.test(inputValue) ? true : false;
}

function setTextError(field,error) {
    if (field.val().length <= 0) {
        defaulText(field,"");
    } else {
        field.css('border', '2px solid red');
        field.parent().children('span').text(error);
    }
}

function textSuccess(field,error) {
    if (field.val().length <= 0){
        defaulText(field,"");
    }else {
        field.css('border','2px solid green');
        field.parent().children('span').text(error);
    }
}

function defaulText(field,error) {
    field.css('border','2px solid red');
    field.parent().children('span').text(error);
}

function focusText(field) {
    field.focus();
}

function setButtonState1(value){
    if (value>0){
        $("#btnCustomer").attr('disabled',true);
        $("#btnCusDelete").attr('disabled',true)
        $("#btnUpdate").attr('disabled',true);
    }else{
        $("#btnCustomer").attr('disabled',false);
        $("#btnCusDelete").attr('disabled',false);
        $("#btnUpdate").attr('disabled',false);
    }
}

function cleartable() {
    $('#tblCustomer1').empty();
}
function loadAllCustomer(){
    cleartable();
    for (var i of CustomerDetails){
        $('#tblCustomer1').append('<tr><td>'+i.id+'</td><td>'+i.name+'</td><td>'+i.Address+'</td><td>'+i.telnum+'</td></tr>')
    }
}

$('#btnCustomer').click(function () {

    let custId = $('#txtCustomerID').val();
    let CustName = $('#txtCustomerName').val();
    let CustAddress = $('#txtCustomerAddress').val();
    let Custtell = $('#txtCustomerTelNumber').val();

    Customer = {
        id :custId,
        name:CustName,
        Address:CustAddress,
        telnum:Custtell
    }

    CustomerDetails.push(Customer);
    loadAllCustomer();
    bindRowClickEvents();
    clickRemove();
    LordAllCustomerForOption();
    setCustomerCount();
    ClearTextFieldsCust();
    getLastID();
});

function bindRowClickEvents1() {
    $("#tblCustomer1>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let telnum = $(this).children(":eq(3)").text();

        $('#txtCustomerID').val(id);
        $('#txtCustomerName').val(name);
        $('#txtCustomerAddress').val(address);
        $('#txtCustomerTell').val(telnum);

    });
}
function clickRemove() {
    $('#tblCustomer1>tr').dblclick(function () {
        $(this).remove();
    })
}
$(document).keydown(function (event) {
    if (event.key == "Tab"){
        event.preventDefault()
    }
});
$('#txtCustomerID').keydown(function (event) {
    if (event.key=="Enter" && check(custIDregEx,$('#txtCustomerID'))){
        focusText($("#txtCustomerName"));
    }
});
$('#txtCustomerName').keydown(function (event) {
    if (event.key=="Enter" && check(custNameregEx,$('#txtCustomerName'))){
        focusText($("#txtCustomerAddress"));
    }
});
$('#txtCustomerAddress').keydown(function (event) {
    if (event.key=="Enter" && check(custAddresssregEx,$('#txtCustomerAddress'))) {
        $('#txtCustomerTelNumber').focus()
    }
});
$('#txtCustomerTelNumber').keydown(function (event) {
    if (event.key=="Enter" && check(custTellregEx,$('#txtCustomerTellNumber'))) {
        $('#btnCustomer').focus()
    }
});

$('#btnCustclear').click(function () {
    console.log("fire");
    ClearTextFieldsCust();
});

function ClearTextFieldsCust() {
    $('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerTelNumber').val("");
    checkValied()
}


$('#btnSearchCust').click(function () {
    let typedId = $('#SearchCust').val();
    let cust = SearchCustomer(typedId);
    if (cust != null){
        setTextfieldValuesCust(cust.id, cust.name, cust.Address, cust.telnum);
    }else {
        alert(typedId+"Not Used...");
        setTextfieldValuesCust("","","","");
    }
});


function setTextfieldValuesCust(id, name, Address, telnum) {
    $("#txtCustomerID").val(id);
    $("#txtCustomerName").val(name);
    $("#txtCustomerAddress").val(Address);
    $("#txtCustomerTelNumber").val(telnum);
}


function SearchCustomer(CustId) {
    for ( let customer of CustomerDetails){
        if (customer.id == CustId){
            return customer;
        }
    }
    return null;
}

$('#btnCusDelete').click(function () {
    let typedId = $('#txtCustomerID').val();
    let option = confirm("Do you Want To delete The Customer ..!");
    if (option){
        if (DeleteCustomer(typedId)) {
            alert("Customer Deleted Successfully !")
            setTextfieldValuesCust("","","","");
        }else {
            alert("Customer not delete");
        }
    }
});

function DeleteCustomer(CustId) {
    let customer = SearchCustomer(CustId);
    if (customer != null){
        let index = CustomerDetails.indexOf(customer);
        CustomerDetails.splice(index,1);
        loadAllCustomer();
        return true
    }else {
        return false;
    }
}

$('#btnUpdate').click(function () {
    let typedId = $('#txtCustomerID').val();
    if (UpdateCustomer(typedId)){
        alert("Customer Update Successfully !")
        setTextfieldValuesCust("","","","")
    }else {
        alert("Not Updated..")
    }
});

function UpdateCustomer(custId) {
    let customer = SearchCustomer(custId);
    if (customer != null){
        customer.id = $('#txtCustomerID').val();
        customer.name = $('#txtCustomerName').val();
        customer.Address = $('#txtCustomerAddress').val();
        customer.telnum = $('#txtCustomerTelNumber').val();
        loadAllCustomer();
        return true;
    }else {
        return false;
    }
}
function getLastID() {
    if (CustomerDetails.length != 0) {
        let cust = CustomerDetails[CustomerDetails.length - 1];
        let newCustID = CreateID(cust.id);
        $('#txtCustomerID').val(newCustID);
    }else{
        $('#txtCustomerID').val("C00-001");
    }
}

function CreateID(custid) {
    let sepId = custid.split("-");
    let setid = parseInt(sepId[1]);
    let newindex = setid+1;
    if (newindex<10){
        let newid = "C00-00"+newindex;
        return newid;
    }else if(newindex<100){
        let newid = "C00-0"+newindex;
        return newid;
    }else {
        let  newid = "C00-"+newindex;
        return newid;
    }
}
