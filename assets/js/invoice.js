var itemInfo = [];
var itemsDetailsByName = [];
var itemsDetailsById = [];
var itemsDetailsBySku = [];
var customerData = [];
var lineNumber = 0;
var isEdit = false;
var editId = 0;

showInvoiceList();
showInvoiceTable();

// showView('tableView');

generateId();
if (isEdit == true) {
	loadInvoice(editId);
}

function generateId() {
	var id = 0;
	if ($("#editId").val() > 0) {
		editId = $("#editId").val();
		id = editId;
		setId('invoice', id);
		isEdit = true;
	} else {
		var itemDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
				+ "/invoice/");
		itemDb.on("value", function(snapshot) {
			id = snapshot.numChildren() + 1;
			setId('invoice', id);
		});
	}
}

function loadInvoice(id) {
	console.log("Loading Invoice: " + id);
	var invoiceDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/invoice");
	invoiceDb.orderByChild("id").equalTo(id).on("child_added",
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
				transactionKey = invoiceInfo.transactionKey;

				$("#entryDate").val(invoiceInfo.entryDate);

				if (invoiceInfo.taxValue) {
					$("#taxValue").val(invoiceInfo.taxValue);
				}
				$("#printBtn").css("display", 'block');
			});

	var invoiceLineDb = new Firebase("https://baseerp.firebaseio.com/"
			+ companyId + "/invoiceLine");
	invoiceLineDb.orderByChild("invoiceId").equalTo(id).on(
			"child_added",
			function(snapshot) {
				invoiceLineInfo = snapshot.exportVal();
				var line = addNewLine();
				oldLineItems.push(snapshot.key());
				$("#LINE_" + line + "_entryDate")
						.val(invoiceLineInfo.entryDate);
				$("#LINE_" + line + "_invoiceId")
						.val(invoiceLineInfo.invoiceId);
				$("#LINE_" + line + "_id").val(invoiceLineInfo.id);
				$("#LINE_" + line + "_sku").val(invoiceLineInfo.sku);
				$("#LINE_" + line + "_itemName").val(invoiceLineInfo.itemName);
				$("#LINE_" + line + "_qty").val(invoiceLineInfo.qty);
				$("#LINE_" + line + "_price").val(invoiceLineInfo.price);
				$("#LINE_" + line + "_uom").val(invoiceLineInfo.uom);
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
	if (isEdit == false) {
		// addNewLine();
	}
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
	entryDate = "LINE_" + lineNumber + "_entryDate";
	id = "LINE_" + lineNumber + "_id";
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
		<td><input id="'
			+ entryDate
			+ '"\
			name="'
			+ entryDate
			+ '" type="hidden" placeholder="DATE" class="entryDate">\
			<input onfocus="itemDropDown('
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
			+ lineNumber
			+ ');" id="'
			+ price
			+ '"\
			name="'
			+ price
			+ '" type="text" class="form-control"></td>\
		<td><input id="'
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
	getDateNumber("invoiceDate");
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
	taxAmount = (parseFloat($("#taxValue").val()) / 100) * subTotal;
	discountAmount = discountAmount.toFixed(2);
	shippingAmount = shippingAmount.toFixed(2);
	taxAmount = taxAmount.toFixed(2);

	var netAmount = parseFloat(subTotal) + parseFloat(shippingAmount)
			+ parseFloat(taxAmount);
	if (isNaN(netAmount))
		netAmount = 0;
	netAmount = netAmount.toFixed(2);

	$("#subTotalText").html("Rs. " + (subTotal));
	$("#discountAmount").val(discountAmount);
	$("#discountAmountText").html("Rs." + discountAmount);
	$("#shippingAmount").val(shippingAmount);
	$("#shippingAmountText").html("Rs." + shippingAmount);
	$("#taxAmount").val(taxAmount);
	$("#taxAmountText").html("Rs." + taxAmount);
	$("#netAmount").val(netAmount);
	$("#netAmountText").html("Rs." + netAmount);
}

function showInvoiceList() {
	console.log("Printing invoices");
	var invoiceDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/invoice/");
	invoiceDb
			.orderByValue()
			.on(
					"child_added",
					function(snapshot, childKey) {
						var invoiceInfo = snapshot.exportVal();
						invoiceDb.on("value", function(snapshot) {
							$("#invoiceCount").html(
									snapshot.numChildren() + " entries");
						});
						listValue = '<span class="list-group col-xs-12 col-sm-4 ">\
							<span style="background-color:#F5F5F5" class="list-group-item">#'
								+ invoiceInfo.id
								+ '\
			<h5 class="list-group-item-heading">'
								+ invoiceInfo.customerName
								+ '</h5>\
			<i class="fa fa-calendar"></i> '
								+ invoiceInfo.invoiceDate
								+ '<br>Rs. '
								+ invoiceInfo.netAmount
								+ '\
			<br><a target="" class="btn btn-blue btn-link btn-sm" href="sales/edit/'
								+ invoiceInfo.id
								+ '/'
								+ invoiceInfo.invoiceType
								+ '">View</a>\
								<a target="_blank" class="btn  btn-link btn-sm" href="sales/invoicePrint/'
								+ invoiceInfo.id
								+ '/'
								+ invoiceInfo.invoiceType
								+ '">Print</a>\
								<a target="_blank" class="btn  btn-link btn-sm" href="vouchers/entry/payment/invoice/'
								+ invoiceInfo.id
								+ '/'
								+ invoiceInfo.customerName
								+ "/"
								+ invoiceInfo.customerId
								+ "/"
								+ invoiceInfo.netAmount
								+ '">Payment</a>\
								</span>\
								</span>';
						$("#invoiceList").append(listValue);
					});
}
function showInvoiceTable() {
	var invoiceDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/invoice/");
	invoiceDb.on("child_added", function(snapshot, childKey) {
		console.log("Table view");
		var invoiceInfo = snapshot.exportVal();
		tableValue = "<tr> \
						<td>" + invoiceInfo.id + "</td>\
						<td>"
				+ invoiceInfo.customerName + "</td>\
						<td>"
				+ invoiceInfo.netAmount
				+ "</td>\
						<td><a target='blank' href=" + baseUrl
				+ "sales/invoicePrint/" + invoiceInfo.id + "/"
				+ invoiceInfo.invoiceType + ">Print</a></tr>";
		$("#invoiceTable").append(tableValue);
		$(".progress").hide();
	});

}

function openPrint(id, invoiceType) {
	window.open(baseUrl + 'sales/invoicePrint/' + id + '/' + invoiceType,
			'window name', 'window settings')
}