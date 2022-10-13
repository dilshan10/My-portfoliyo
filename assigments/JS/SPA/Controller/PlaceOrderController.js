$('#txtCustID').focus();


const ItemQTYregEx = /^[0-9.]{1,}$/;

let OrderVali = [];

OrderVali.push({reg:ItemQTYregEx,field:$('#OrderQTYOrder'),error:'Item Qty is not match to Valied Patten'});

$('#OrderQTYOrder').on('keyup',function () {
    checkValied();
});

$('#OrderQTYOrder').on('blur',function () {
    checkValied();
});

function checkValied() {
    let error = 0;
    for (let validation of OrderVali){
        if(validation.reg.test(validation.field.val())){
            textSuccess(validation.field,"");
        }else {
            error = error+1;
            setTextError(validation.field,validation.error);
        }
    }
    setButtonState(error);
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

function setButtonState(value){
    if (value>0){
        $("#btnAddItem").attr('disabled',true);
    }else{
        $("#btnAddItem").attr('disabled',false);
    }
}

function clar() {
    $('#tblOrderItems').empty();
}

function loadAllItem(){
    clar();
    for(var i of OrderItemDetails){
        $('#tblOrderItems').append('<tr><td></td><td>'+i.id+'</td><td>'+i.name+'</td><td>'+ i.Qty+'</td><td>'+i.price+'</td></tr>')
    }
}

$('#btnAddOrderItem').click(function () {
    let itemID = $('#selectItemID').val();
    let itemName = $('#ItemNameOrder').val();
    let itemQTY = $('#OrderQTYOrder').val();
    let itemPrice = $('#ItemPriceOrder').val();

    let Allprice = itemQTY * itemPrice;

    item ={
        id : itemID,
        name : itemName,
        Qty : itemQTY,
        price : Allprice
    }
    OrderItemDetails.push(item);
    loadAllItem();
    bindRowClickEvents();
    clickRemove();
    setTotal();
    clarItemfeilds();
})

function bindRowClickEvents() {
    $('#tblOrderItems>tr').click(function () {
        let id = $(this).children(":eq(1)").text();
        let name = $(this).children(":eq(2)").text();
        let qty = $(this).children(":eq(3)").text();
        let price = $(this).children(":eq(4)").text();

        $('#txtItemCode').val(id);
        $('#txtItemName').val(name);
        $('#txtOrderQTY').val(qty);
        $('#txtItemPrice').val(price);
    })
}

function clickRemove() {
    $('#tblOrderItems>tr').dblclick(function (event) {
        $(this).remove();
    })
}
$(document).keydown(function (event) {
    if (event.key == "Tab"){
        event.preventDefault()
    }
});
$('#OrderQTYOrder').keydown(function (event) {
    if (event.key=="Enter" && check(ItemQTYregEx, $('#OrderQTYOrder'))) {
        $('#btnAddOrderItem').focus();
    }
});

$('#btn-clear').click(function () {
    ClearTextFields();
});

function ClearTextFieldsPlace() {
    $('#Total,#SubTotal,#Balance,#Cash,#OrderID,#OrderDate,#CustNameOrder,#CustAddresOrder,#CustTellOrder,#ItemNameOrder,#QTYonHandOrder,#ItemPriceOrder,#OrderQTYOrder').val("");
    $('#tblOrderItems').empty();
}
function CustIDClear() {
    $('#selectCusID').empty();
}

function LordAllCustomerForOption() {
    CustIDClear();
    for (let cust of CustomerDetails){
        $('#selectCusID').append("<option>"+cust.id+"</option>")
    }
}

function ItemIdClear() {
    $('#selectItemID').empty();
}

function LordAllItemForOption() {
    ItemIdClear();
    for (let Item of ItemDetails){
        $('#selectItemID').append("<option>"+Item.id+"</option>");
    }
}

function setDateAndTime() {
    let date = new Date();
    $('#OrderDate').val(date);
}

$('#selectCusID').on('keyup',function (event) {
    let setId = $('#selectCusID').val();
    if (event.key == "Enter"){
        let cust = SearchCust(setId);
        if (cust != null){
            $('#CustNameOrder').val(cust.name);
            $('#CustAddresOrder').val(cust.Address);
            $('#CustTellOrder').val(cust.telnum);
            $('#selectItemID').focus();
        }
    }
});

function SearchCust(custId) {
    for (let cust of CustomerDetails){
        cust.id == custId;
        return cust;
    }
}

$('#selectItemID').on('keyup',function (event) {
    let setid = $('#selectItemID').val();
    if (event.key == "Enter"){
        let item = SearchItem(setid);
        $('#ItemNameOrder').val(item.name);
        $('#QTYonHandOrder').val(item.Qty);
        $('#ItemPriceOrder').val(item.price);
        $('#OrderQTYOrder').focus();
    }
});

function SearchItem(itemid) {
    for (let item of ItemDetails){
        item.id = itemid;
        return item;
    }
}

function setTotal() {
    let total = 0;
    for (let i of OrderItemDetails){
        let val = parseInt(i.price);
        total=total+val;
    }
    $('#Total').val(total);
}

function clarItemfeilds() {
    $('#ItemNameOrder,#QTYonHandOrder,#ItemPriceOrder,#OrderQTYOrder').val("");
}

$('#Discount').on('keyup',function (event) {
    if (event.key == "Enter") {
        let total = parseInt($('#Total').val());
        let discount = parseInt($('#Discount').val());
        let subtotal = total-discount;
        $('#SubTotal').val(subtotal);
        $('#Cash').focus();
    }
});

$('#Cash').on('keyup',function (event) {
    if (event.key == "Enter"){
        let mony = $('#Cash').val();
        let subtotal = $('#SubTotal').val();
        let bal = mony-subtotal;
        $('#Balance').val(bal);
        $('#Purchese').focus()
    }
});

$('#Purchese').click(function () {
    PlaceOrder();
    CreateNewOrderId()
});

function PlaceOrder() {
    console.log("fire 2");
    for (let i of OrderItemDetails){
        let orderid = $('#OrderID').val();
        let date = $('#OrderDate').val();
        let custid = $('#selectCusID').val();
        let itemid = i.id;
        let qty = i.Qty;
        let price = i.price;

        Order = {
            id: orderid,
            date: date,
            custid: custid,
            itemid: itemid,
            qty: qty,
            price: price,
        };
        OrderDetails.push(Order);
        setOrderCount();
        ClearTextFieldsPlace();
    }
}
function CreateNewOrderId() {
    if(OrderDetails.length != 0){
        let order = OrderDetails[OrderDetails.length - 1];
        let newOrderID = CreateOrderID(order.id);
        $('#OrderID').val(newOrderID);
    }else{
        $('#OrderID').val("R00-001");
    }
}
function CreateOrderID(oid) {
    let sId = oid.split("-");
    let setid = parseInt(sId[1]);
    let newOrindex = setid+1;
    if (newOrindex<10){
        let newOrid = "R00-00"+newOrindex;
        return newOrid;
    }else if(newindex<100){
        let newOrid = "R00-0"+newOrindex;
        return newOrid;
    }else {
        let  newOrid = "R00-"+newOrindex;
        return newOrid;
    }
}