var itemInfo = [];
var itemsDetailsByName = [];
var itemsDetailsById = [];
var itemsDetailsBySku = [];
var customerData = [];
var lineNumber = 0;
var isEdit = false;
var editId = 0;

generateId();
if (isEdit == true) {
	loadInvoice(editId);
}

function generateId() {
	var id = 0;
	console.log("DDD");
	if ($("#editId").val() > 0) {
		editId = $("#editId").val();
		id = editId;
		setId('invoice', id);
		isEdit = true;
	} else {
		console.log('ddd');
		var itemDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
				+ "/invoice/");
		itemDb.on("value", function(snapshot) {
			id = snapshot.numChildren() + 1;
			setId('invoice', id);
			$(".progress").hide();
		});
	}
}

function loadInvoice(id) {
	console.log("Loading Invoice: " + id);
	var invoiceDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/invoice");
	invoiceDb.orderByChild("id").equalTo(id).on(
			"child_added",
			function(snapshot) {
				invoiceInfo = snapshot.exportVal();
				$("#oldId").val(snapshot.key());
				$("#customerId").val(invoiceInfo.customerId);
				$("#customerName").val(invoiceInfo.customerName);
				$("#poNo").val(invoiceInfo.poNo);
				$("#invoiceDate").val(invoiceInfo.invoiceDate);
				$("#discountBy").val(invoiceInfo.discountBy);
				$("#discountValue").val(invoiceInfo.discountValue);
				$("#shippingCalcBy").val(invoiceInfo.shippingCalcBy);
				$("#shippingValue").val(invoiceInfo.shippingValue);
				$("#mahamaiCalcBy").val(invoiceInfo.mahamaiCalcBy);
				$("#mahamaiValue").val(invoiceInfo.mahamaiValue);
				$("#insuranceCalcBy").val(invoiceInfo.insuranceCalcBy);
				$("#insuranceValue").val(invoiceInfo.insuranceValue);
				$("#modeOfTransport").val(invoiceInfo.modeOfTransport);

				$("#motorVehicleRegnNo").val(invoiceInfo.motorVehicleRegnNo);
				$("#despatchFrom").val(invoiceInfo.despatchFrom);
				$("#despatchTo").val(invoiceInfo.despatchTo);
				$("#rlrNo").val(invoiceInfo.rlrNo);
				transactionKey = invoiceInfo.transactionKey;

				if (invoiceInfo.taxValue) {
					$("#taxValue").val(invoiceInfo.taxValue);
				}
				$("#printBtn").css("display", 'inline-block');
				$("#printBtn").attr("href",
						baseUrl + "sales/invoicePrint/" + id + "/cracker");
			});
	var invoiceLineDb = new Firebase("https://baseerp.firebaseio.com/"
			+ companyId + "/invoiceLine");
	var inc = 0;
	invoiceLineDb.orderByChild("invoiceId").equalTo(id).on(
			"child_added",
			function(snapshot) {
				inc++;
				invoiceLineInfo = snapshot.exportVal();
				var line = addNewLine();
				oldLineItems.push(snapshot.key());
				$("#LINE_" + line + "_sku").val(invoiceLineInfo.sku);
				$("#LINE_" + line + "_entryDate")
						.val(invoiceLineInfo.entryDate);
				$("#LINE_" + line + "_id").val(invoiceLineInfo.id);
				$("#LINE_" + line + "_invoiceId")
						.val(invoiceLineInfo.invoiceId);
				$("#LINE_" + line + "_itemName").val(invoiceLineInfo.itemName);
				$("#LINE_" + line + "_qty").val(invoiceLineInfo.qty);
				$("#LINE_" + line + "_price").val(invoiceLineInfo.price);
				$("#LINE_" + line + "_uom").val(invoiceLineInfo.uom);
				$("#LINE_" + line + "_caseNo").val(invoiceLineInfo.caseNo);
				$("#LINE_" + line + "_caseCs").val(invoiceLineInfo.caseCs);
				$("#LINE_" + line + "_caseCCS").val(invoiceLineInfo.caseCCS);
				priceCalc(line);
				$(".progress").hide();
			});
}

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
			$("#" + prefix + "caseNo").focus();
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
	entryDate = "LINE_" + lineNumber + "_entryDate";
	id = "LINE_" + lineNumber + "_id";
	caseNo = "LINE_" + lineNumber + "_caseNo";
	caseCs = "LINE_" + lineNumber + "_caseCs";
	caseCCs = "LINE_" + lineNumber + "_caseCCS";
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
			+ '" type="text" class="form-control">\
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
			+ '" type="hidden" class="form-control"></td>\
			<td><input class="form-control" type="text" id="'
			+ caseNo
			+ '" name="'
			+ caseNo
			+ '"></td>\
			<td><input class="form-control" type="text" id="'
			+ caseCs
			+ '" name="'
			+ caseCs
			+ '" onkeyup="calcCaseQty('
			+ lineNumber
			+ ')"></td>\
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
			<td><input class="form-control" type="text" id="'
			+ caseCCs
			+ '" name="'
			+ caseCCs
			+ '" onkeyup="calcCaseQty('
			+ lineNumber
			+ ')"></td>\
		<td><input onkeyup="priceCalc('
			+ lineNumber
			+ ');" id="'
			+ qty
			+ '"\
			name="'
			+ qty
			+ '" type="text" class="form-control"></td>\
		<td><input onkeyup="priceCalc('
			+ lineNumber
			+ ');" id="'
			+ price
			+ '"\
			name="'
			+ price
			+ '" type="text" class="form-control"></td>\
		<td><input id="'
			+ entryDate
			+ '"\
			name="'
			+ entryDate
			+ '" type="text" placeholder="DATE" class="hidden entryDate"><input id="'
			+ uom
			+ '"\
			name="'
			+ uom
			+ '" type="text" class="form-control"></td>\
		<td><input id="'
			+ amount
			+ '"\
			name="'
			+ amount
			+ '" type="text" class="form-control"></td>\
	</tr>';
	$("#tableRows").append(newRow);
	getDateNumber('invoiceDate', 'entryDate');
	return lineNumber;
}

function priceCalc(lineNumber) {
	var price = parseFloat($("#LINE_" + lineNumber + "_price").val());
	var qty = parseFloat($("#LINE_" + lineNumber + "_qty").val());
	var total = parseFloat(price * qty);
	if (isNaN(total)) {
		total = 0;
	}
	$("#LINE_" + lineNumber + "_amount").val(total);
	calcTotal();
}

function calcTotal() {
	var totalAmount = 0;
	for (i = 1; i <= lineNumber; i++) {
		totalAmount = (parseFloat($("#LINE_" + i + "_amount").val()) + totalAmount);
	}
	if (isNaN(totalAmount))
		totalAmount = 0;
	totalAmount = totalAmount.toFixed(2);
	$("#totalAmount").html(totalAmount);
	$("#totalItems").html(lineNumber);
	$("#lineTotal").val(totalAmount);
	$("#lineTotalText").html("Rs. " + totalAmount);
	calcBill();
}

function calcBill() {
	console.log("Calculating bill");
	var lineTotal = parseFloat($("#lineTotal").val());
	var subTotal = 0;
	var discountAmount = 0;
	var shippingAmount = 0;
	var mahamaiAmount = 0;
	var insuranceAmount = 0;
	var taxAmount = 0;
	if ($("#discountBy").val() == "percentage")
		discountAmount = (parseFloat($("#discountValue").val()) / 100)
				* lineTotal;
	else
		discountAmount = parseFloat($("#discountValue").val());
	if (isNaN(discountAmount))
		discountAmount = 0;
	subTotal = (lineTotal - discountAmount).toFixed(2);
	if (isNaN(subTotal))
		subTotal = 0;
	if ($("#shippingCalcBy").val() == "percentage")
		shippingAmount = (parseFloat($("#shippingValue").val()) / 100)
				* subTotal;
	else
		shippingAmount = parseFloat($("#shippingValue").val());
	if (isNaN(shippingAmount))
		shippingAmount = 0;
	if ($("#mahamaiCalcBy").val() == "percentage")
		mahamaiAmount = (parseFloat($("#mahamaiValue").val()) / 100) * subTotal;
	else
		mahamaiAmount = parseFloat($("#mahamaiValue").val());
	if (isNaN(mahamaiAmount))
		mahamaiAmount = 0;
	if ($("#insuranceCalcBy").val() == "percentage")
		insuranceAmount = (parseFloat($("#insuranceValue").val()) / 100)
				* subTotal;
	else
		insuranceAmount = parseFloat($("#insuranceValue").val());
	if (isNaN(insuranceAmount))
		insuranceAmount = 0;

	discountAmount = discountAmount.toFixed(2);
	shippingAmount = shippingAmount.toFixed(2);
	taxAmount = (parseFloat($("#taxValue").val()) / 100)
			* (parseInt(subTotal) + parseInt(shippingAmount));
	mahamaiAmount = mahamaiAmount.toFixed(2);
	insuranceAmount = insuranceAmount.toFixed(2);
	taxAmount = taxAmount.toFixed(2);

	var netAmount = parseFloat(subTotal) + parseFloat(shippingAmount)
			+ parseFloat(mahamaiAmount) + parseFloat(insuranceAmount)
			+ parseFloat(taxAmount);
	if (isNaN(netAmount))
		netAmount = 0;
	netAmount = netAmount.toFixed(2);

	$("#subTotalText").html("Rs. " + (subTotal));
	$("#discountAmount").val(discountAmount);
	$("#discountAmountText").html("Rs." + discountAmount);
	$("#shippingAmount").val(shippingAmount);
	$("#shippingAmountText").html("Rs." + shippingAmount);
	$("#mahamaiAmount").val(mahamaiAmount);
	$("#mahamaiAmountText").html("Rs." + mahamaiAmount);
	$("#insuranceAmount").val(insuranceAmount);
	$("#insuranceAmountText").html("Rs." + insuranceAmount);
	$("#taxAmount").val(taxAmount);
	$("#taxAmountText").html("Rs." + taxAmount);
	$("#netAmount").val(netAmount);
	$("#netAmountText").html("Rs." + netAmount);
}

function calcCaseQty(id) {
	var cS = $("#LINE_" + id + "_caseCs").val();
	var cCS = $("#LINE_" + id + "_caseCCS").val();
	console.log(cS + "--" + cCS);
	var qty = 0;
	qty = (parseFloat(cS) * parseFloat(cCS));
	if (isNaN(qty))
		qty = 0;
	$("#LINE_" + id + "_qty").val(qty);
	priceCalc(id);
}