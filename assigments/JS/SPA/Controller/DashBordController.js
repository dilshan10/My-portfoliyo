$('#Home').css("display", "block");
$('#CustomerForm').css("display", "none");
$('#ItemForm').css("display", "none");
$('#PlaceOrderForm').css("display", "none");
//-------------------------------------------------
$("#HomeBtn").click(function(){
    $("#Home").css("display", "block");
    $("#CustomerForm").css("display", "none");
    $('#ItemForm').css("display", "none");
    $('#PlaceOrderForm').css("display", "none");
});
//-------------------------------------------------
$('#CustomerBtn').click(function () {
    $('#Home').css("display", "none");
    $('#CustomerForm').css("display", "block");
    $('#ItemForm').css("display", "none");
    $('#PlaceOrderForm').css("display", "none");
});
$('#ItemBtn').click(function () {
    $('#Home').css("display", "none");
    $('#CustomerForm').css("display", "none");
    $('#ItemForm').css("display","block");
    $('#PlaceOrderForm').css("display", "none");
});
$('#OrdersBtn').click(function () {
    $('#Home').css("display", "none");
    $('#CustomerForm').css("display", "none");
    $('#ItemForm').css("display","none");
    $('#PlaceOrderForm').css("display", "block");
});
//-----------------------------------------------------
function setCustomerCount() {
    $('#CustometCount').text(CustomerDetails.length);
};
function setItemCount() {
    $('#ItemCount').text(ItemDetails.length);
};
function setOrderCount() {
    $('#OrderCount').text(OrderDetails.length);
}