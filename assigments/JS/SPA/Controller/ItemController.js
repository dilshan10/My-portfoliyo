$('#txtItemID').focus();

const ItemIDregEx = /^(I00-)[0-9]{3}$/;
const ItemNameregEx = /^[A-z/ ]{5,30}$/;
const ItemQtyOnHandregEx = /^[0-9./]{1,}$/;
const ItemPriceregEx = /^[0-9.]{3,}$/;

let ItemVali = [];

ItemVali.push({reg:ItemIDregEx,field:$('#txtItemID'),error:'Item Code is Not match To Valied Patten:I00-001'});
ItemVali.push({reg:ItemNameregEx,field:$('#txtItemName'),error:'Item Name is Not match To Valied Patten'});
ItemVali.push({reg:ItemQtyOnHandregEx,field:$('#txtQTY'),error:'Item Qty is Not match To Valied Patten'});
ItemVali.push({reg:ItemPriceregEx,field:$('#txtPrice'),error:'Item price is Not match To Valied Patten'});

$('#txtItemID,#txtItemName,#txtQTY,#txtPrice').on('keyup',function () {
    checkValied();
});

$('#txtItemID,#txtItemName,#txtQTY,#txtPrice').on('keyup',function () {
    checkValied();
});

function checkValied() {
    let error = 0;
    for (let validation of ItemVali){
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
        $("#btnItem").attr('disabled',true);
        $("#btnDelete").attr('disabled',true);
        $("#btnItemUpdate").attr('disabled',true);
    }else{
        $("#btnItem").attr('disabled',false);
        $("#btnDelete").attr('disabled',false);
        $("#btnItemUpdate").attr('disabled',false);
    }
}

function clear() {
    $('#tblItem').empty();
}
function loadAllItems(){
    clear();
    for (var i of ItemDetails){

        $('#tblItem').append('<tr><td>'+i.id+'</td><td>'+i.name+'</td><td>'+i.Qty+'</td><td>'+i.price+'</td></tr>')
    }
}

$('#btnItem').click(function () {
    let ItemId = $('#txtItemID').val();
    let ItemName = $('#txtItemName').val();
    let Qty = $('#txtQTY').val();
    let price = $('#txtPrice').val();

    item = {
        id :ItemId,
        name:ItemName,
        Qty:Qty,
        price:price
    }

    ItemDetails.push(item);
    loadAllItems();
    bindRowClickEvents();
    setItemCount();
    LordAllItemForOption();
    ClearTextFields()
    CreateId();
});

$('#btn-clear1').click(function () {
    $('#tblItem').empty();
})

function bindRowClickEvents(){
    $('#tblItem>tr').click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let Qty = $(this).children(":eq(2)").text();
        let price = $(this).children(":eq(3)").text();

        $('#txtItemID').val(id);
        $('#txtItemName').val(name);
        $('#txtQTY').val(Qty);
        $('#txtPrice').val(price);
    })
}

function clickRmove() {
    $('#tblItem>tr').dblclick(function () {
        $(this).remove()
    })
}

$(document).keydown(function (event) {
    if (event.key == "Tab"){
        event.preventDefault()
    }
});

$('#txtItemID').keydown(function (event) {
    if (event.key=="Enter" && check(ItemIDregEx,$('#txtItemID'))) {
        focusText($('#txtItemName'));
    }
});
$('#txtItemName').keydown(function (event) {
    if (event.key=="Enter" && check(ItemNameregEx,$('#txtItemName'))) {
        focusText($('#txtQTY'));
    }
});
$('#txtQTY').keydown(function (event) {
    if (event.key=="Enter" && check(ItemQtyOnHandregEx,$('#txtQTY'))) {
        focusText($('#txtPrice'));
    }
});
$('#txtPrice').keydown(function (event) {
    if (event.key=="Enter" && check(ItemPriceregEx,$('#txtPrice'))) {
        $('#btnItem').focus();
    }
});

$('#btnItemclear').click(function () {
    ClearTextFields();
})

function ClearTextFields() {
    $('#txtItemName,#txtQTY,#txtPrice').val("");
    checkValied()
}

$('#btnSearchItem').click(function () {
    let typedId = $('#SearchItem').val();
    let item = SearchItem(typedId);
    if (item != null){
        setTextfieldValues(item.id, item.name, item.Qty, item.price);
    }else {
        alert(typedId+"Not Used...");
        setTextfieldValues("","","","");
    }
});


function setTextfieldValues(id, name, Qty, price) {
    $("#txtItemID").val(id);
    $("#txtItemName").val(name);
    $("#txtQTY").val(Qty);
    $("#txtPrice").val(price);
}


function SearchItem(ItemId) {
    for ( let item of ItemDetails){
        if (item.id == ItemId){
            return item;
        }
    }
    return null;
}

$('#btnDelete').click(function () {
    let typedId = $('#txtItemID').val();

    let option = confirm("do you want to delete the Item..!")
    if (option){
        if (DeleteItem(typedId)) {
            alert("Item Deleted Successfully !")
            setTextfieldValues("","","","");
        }else{
            alert("Item Not Delete..!")
        }
    }
});

function DeleteItem(ItemId) {
    let Item = SearchItem(ItemId);
    if (Item != null){
        let index = ItemDetails.indexOf(Item);
        ItemDetails.splice(index,1);
        loadAllItems();
        return true
    }else {
        return false;
    }
}

$('#btnItemUpdate').click(function () {
    let typedId = $('#txtItemID').val();
    if (UpdateItem(typedId)){
        alert("Item Update Successfully !")
        setTextfieldValues("","","","")
    }else {
        alert("Not Updated..")
    }
});

function UpdateItem(ItemId) {
    let customer = SearchItem(ItemId);
    if (customer != null){
        customer.id = $('#txtItemID').val();
        customer.name = $('#txtItemName').val();
        customer.Qty = $('#txtQTY').val();
        customer.price = $('#txtPrice').val();
        loadAllItems();
        return true;
    }else {
        return false;
    }
}

function CreateId() {
    if (ItemDetails.length != 0){
        let item = ItemDetails[ItemDetails.length - 1];
        let newItemID = CreateItemID(item.id);
        $('#txtItemID').val(newItemID)
    }else{
        $('#txtItemID').val("I00-001")
    }
}

function CreateItemID(itemid) {
    let sepitemId = itemid.split("-");
    let setitemid = parseInt(sepitemId[1]);
    let newitemindex = setitemid+1;
    if (newitemindex<10){
        let newitemid = "I00-00"+newitemindex;
        return newitemid;
    }else if(newindex<100){
        let newitemid = "I00-0"+newitemindex;
        return newitemid;
    }else {
        let  newitemid = "I00-"+newitemindex;
        return newitemid;
    }
}