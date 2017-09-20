var itemInfo = [];
var itemsDetailsByName = [];
var itemsDetailsById = [];
var itemsDetailsBySku = [];
var customerData = [];
var lineNumber = 0;

function customerDropDown() {

	$("#customerName").autocomplete(
			{
				minLength : 0,
				source : customerData,
				focus : function(event, ui) {
					$("#customerName").val(ui.item.lable);
					return false;
				},
				select : function(event, ui) {
					customerDetails = ui.item.customerName + " (Id: "
							+ ui.item.id + ")<br>" + ui.item.email + "<br>"
							+ ui.item.mobileNumber + "<br>" + ui.item.address;
					$("#customerId").val(ui.item.id);
					$("#customerName").val(ui.item.customerName);
					$("#customerDetails").html(customerDetails);
					return false;
				}
			}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append(
				"<a>" + item.customerName + " (" + item.mobileNumber + ")<br>"
						+ item.id + "</a>").appendTo(ul);
	};
}

function getCustomerInformation() {
	var customerDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/customers/");
	customerDb.orderByValue().on(
			"child_added",
			function(snapshot, childKey) {
				customerInfo = snapshot.exportVal();
				var address = customerInfo.address;
				a = {
					label : customerInfo.customerName + " ("
							+ customerInfo.mobileNumber + ")",
					customerName : customerInfo.customerName,
					id : customerInfo.id,
					email : customerInfo.emailId,
					mobileNumber : customerInfo.mobileNumber,
					address : (address),
				};
				customerData.push(a);
			});
}

$(function() {
	addNewLine();
	getCustomerInformation();
	getItemInformation();
});

function getItemInformation() {
	var itemDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/items/");
	itemDb.orderByValue().on("child_added", function(snapshot, childKey) {
		itemInfo = snapshot.exportVal();
		a = {
			label : itemInfo.itemName,
			id : itemInfo.id,
			sku : itemInfo.sku,
			itemName : itemInfo.itemName,
			type : itemInfo.itemType,
			price : itemInfo.itemCost,
			uom : itemInfo.itemUom
		};
		b = {
			label : itemInfo.id,
			id : itemInfo.id,
			sku : itemInfo.sku,
			itemName : itemInfo.itemName,
			type : itemInfo.itemType,
			price : itemInfo.itemCost,
			uom : itemInfo.itemUom
		};
		c = {
			label : itemInfo.sku,
			id : itemInfo.id,
			sku : itemInfo.sku,
			itemName : itemInfo.itemName,
			type : itemInfo.itemType,
			price : itemInfo.itemCost,
			uom : itemInfo.itemUom
		};
		itemsDetailsByName.push(a);
		itemsDetailsById.push(b);
		itemsDetailsBySku.push(c);
	});
}

function itemDropDown(divId, searchBy, prefix) {
	if (searchBy == 'itemName') {
		var data = itemsDetailsByName;
	} else if (searchBy == 'itemId') {
		var data = itemsDetailsById;
	} else if (searchBy == 'sku') {
		var data = itemsDetailsBySku;
	}

	$("#" + divId).autocomplete({
		minLength : 0,
		source : data,
		focus : function(event, ui) {
			$("#" + divId).val(ui.item.lable);
			return false;
		},
		select : function(event, ui) {
			$("#" + prefix + "itemName").val(ui.item.itemName);
			$("#" + prefix + "id").val(ui.item.id);
			$("#" + prefix + "sku").val(ui.item.sku);
			$("#" + prefix + "uom").val(ui.item.uom);
			$("#" + prefix + "price").val(ui.item.price);
			$("#" + prefix + "qty").focus();
			return false;
		}
	}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append(
				"<a>" + item.itemName + "<br>" + item.sku + "</a>")
				.appendTo(ul);
	};
}

function addNewLine() {
	lineNumber++;
	id = "LINE_" + lineNumber + "_id";
	id1 = "'" + id + "'";
	sku = "LINE_" + lineNumber + "_sku";
	sku1 = "'" + sku + "'";
	itemName = "LINE_" + lineNumber + "_itemName";
	itemName1 = "'" + itemName + "'";
	qty = "LINE_" + lineNumber + "_qty";
	price = "LINE_" + lineNumber + "_price";
	uom = "LINE_" + lineNumber + "_uom";
	amount = "LINE_" + lineNumber + "_amount";
	searchItemId = "'itemId'";
	searchSkuId = "'sku'";
	searchItemName = "'itemName'";
	prefix = "'LINE_" + lineNumber + "_'";
	newRow = '<tr>\
		<td>\
		<input type="hidden" class="invoiceIdTxt"  value="'
			+ $("#invoiceId").html()
			+ '" name="LINE_'
			+ lineNumber
			+ '_invoiceId">\
		<input onfocus="itemDropDown('
			+ id1
			+ ','
			+ searchItemId
			+ ','
			+ prefix
			+ ');"\
			id="'
			+ id
			+ '"\
			name="'
			+ id
			+ '" type="text" class="form-control"></td>\
		<td><input onfocus="itemDropDown('
			+ sku1
			+ ', '
			+ searchSkuId
			+ ','
			+ prefix
			+ ');"\
			id="'
			+ sku
			+ '"\
			name="'
			+ sku
			+ '" type="text" class="form-control"></td>\
		<td><input onfocus="itemDropDown('
			+ itemName1
			+ ', '
			+ searchItemName
			+ ','
			+ prefix
			+ ');"\
			id="'
			+ itemName
			+ '"\
			name="'
			+ itemName
			+ '" type="text" class="form-control"></td>\
		<td><input onkeyup="priceCalc('
			+ lineNumber
			+ ');" id="'
			+ qty
			+ '"\
			name="'
			+ qty
			+ '" type="text" class="form-control"></td>\
		<td><input onkeyup="priceCalc('
			+ lineNumber + ');" id="' + price + '"\
			name="' + price
			+ '" type="text" class="form-control"></td>\
		<td><input id="'
			+ uom + '"\
			name="' + uom
			+ '" type="text" class="form-control"></td>\
		<td><input id="'
			+ amount + '"\
			name="' + amount
			+ '" type="text" class="form-control"></td>\
	</tr>';
	$("#tableRows").append(newRow);
}

function priceCalc(lineNumber) {
	var price = parseInt($("#LINE_" + lineNumber + "_price").val());
	var qty = parseInt($("#LINE_" + lineNumber + "_qty").val());
	var total = parseInt(price * qty);
	if (isNaN(total)) {
		total = 0;
	}
	$("#LINE_" + lineNumber + "_amount").val(total);
	calcTotal();
}

function calcTotal() {
	var totalAmount = 0;
	for (i = 1; i <= lineNumber; i++) {
		totalAmount = parseInt($("#LINE_" + i + "_amount").val()) + totalAmount;
	}
	$("#totalAmount").html(totalAmount);
	$("#totalItems").html(lineNumber);
}
