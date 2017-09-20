var itemInfo = [];
var itemsDetailsByName = [];
var itemsDetailsById = [];
var itemsDetailsBySku = [];
var supplierData = [];
var lineNumber = 0;
var isEdit = false;
var editId = 0;

showpurchaseList();
showpurchaseTable();

// showView('tableView');

generateId();
if (isEdit == true) {
	loadpurchase(editId);
}

function generateId() {
	var id = 0;
	if ($("#editId").val() > 0) {
		editId = $("#editId").val();
		id = editId;
		setId('purchase', id);
		isEdit = true;
	} else {
		var itemDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
				+ "/purchase/");
		itemDb.on("value", function(snapshot) {
			id = snapshot.numChildren() + 1;
			setId('purchase', id);
		});
	}
}

function loadpurchase(id) {
	console.log("Loading purchase: " + id);
	var purchaseDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/purchase");
	purchaseDb.orderByChild("id").equalTo(id).on("child_added",
			function(snapshot) {
				purchaseInfo = snapshot.exportVal();
				$("#oldId").val(snapshot.key());
				$("#supplierId").val(purchaseInfo.supplierId);
				$("#supplierName").val(purchaseInfo.supplierName);
				$("#poNo").val(purchaseInfo.poNo);
				$("#purchaseDate").val(purchaseInfo.purchaseDate);
				$("#discountBy").val(purchaseInfo.discountBy);
				$("#discountValue").val(purchaseInfo.discountValue);
				$("#shippingCalcBy").val(purchaseInfo.shippingCalcBy);
				$("#shippingValue").val(purchaseInfo.shippingValue);
				transactionKey = invoiceInfo.transactionKey;
				if (purchaseInfo.taxValue) {
					$("#taxValue").val(purchaseInfo.taxValue);
				}
				$("#printBtn").css("display", 'block');
			});
	var purchaseLineDb = new Firebase("https://baseerp.firebaseio.com/"
			+ companyId + "/purchaseLine");
	purchaseLineDb.orderByChild("purchaseId").equalTo(id).on("child_added",
			function(snapshot) {
				purchaseLineInfo = snapshot.exportVal();
				var line = addNewLine();
				oldLineItems.push(snapshot.key());
				$("#LINE_" + line + "_entryDate").val(purchaseLineInfo.entryDate);
				$("#LINE_" + line + "_purchaseId").val(purchaseLineInfo.purchaseId);
				$("#LINE_" + line + "_id").val(purchaseLineInfo.id);
				$("#LINE_" + line + "_sku").val(purchaseLineInfo.sku);
				$("#LINE_" + line + "_itemName").val(purchaseLineInfo.itemName);
				$("#LINE_" + line + "_qty").val(purchaseLineInfo.qty);
				$("#LINE_" + line + "_price").val(purchaseLineInfo.price);
				$("#LINE_" + line + "_uom").val(purchaseLineInfo.uom);
				priceCalc(line);
				$(".progress").hide();
			});
}

function supplierDropDown() {

	$("#supplierName").autocomplete(
			{
				minLength : 0,
				source : supplierData,
				focus : function(event, ui) {
					$("#supplierName").val(ui.item.lable);
					return false;
				},
				select : function(event, ui) {
					supplierDetails = ui.item.supplierName + " (Id: "
							+ ui.item.id + ")<br>" + ui.item.email + "<br>"
							+ ui.item.mobileNumber + "<br>" + ui.item.address;
					$("#supplierId").val(ui.item.id);
					$("#supplierName").val(ui.item.supplierName);
					$("#supplierDetails").html(supplierDetails);
					return false;
				}
			}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append(
				"<a>" + item.supplierName + " (" + item.mobileNumber + ")<br>"
						+ item.id + "</a>").appendTo(ul);
	};
}

function getsupplierInformation() {
	var supplierDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/suppliers/");
	supplierDb.orderByValue().on(
			"child_added",
			function(snapshot, childKey) {
				supplierInfo = snapshot.exportVal();
				var address = supplierInfo.address;
				a = {
					label : supplierInfo.supplierName + " ("
							+ supplierInfo.mobileNumber + ")",
					supplierName : supplierInfo.supplierName,
					id : supplierInfo.id,
					email : supplierInfo.emailId,
					mobileNumber : supplierInfo.mobileNumber,
					address : (address),
				};
				supplierData.push(a);
			});
}

$(function() {
	if (isEdit == false) {
		// addNewLine();
	}
	getsupplierInformation();
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
		<input type="hidden" class="purchaseIdTxt"  value="'
			+ $("#purchaseId").html()
			+ '" name="LINE_'
			+ lineNumber
			+ '_purchaseId">\
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
	getDateNumber("purchaseDate");
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

function showpurchaseList() {
	console.log("Printing purchases");
	var purchaseDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/purchase/");
	purchaseDb
			.orderByValue()
			.on(
					"child_added",
					function(snapshot, childKey) {
						var purchaseInfo = snapshot.exportVal();
						purchaseDb.on("value", function(snapshot) {
							$("#purchaseCount").html(
									snapshot.numChildren() + " entries");
						});
						listValue = '<span class="list-group col-xs-12 col-sm-4 ">\
							<span style="background-color:#F5F5F5" class="list-group-item">#'
								+ purchaseInfo.id
								+ '\
			<h5 class="list-group-item-heading">'
								+ purchaseInfo.supplierName
								+ '</h5>\
			<i class="fa fa-calendar"></i> '
								+ purchaseInfo.purchaseDate
								+ '<br>Rs. '
								+ purchaseInfo.netAmount
								+ '\
			<br><a target="" class="btn btn-blue btn-link btn-sm" href="purchase/edit/'
								+ purchaseInfo.id
								+ '/'
								+ purchaseInfo.purchaseType
								+ '">View</a>\
								<a target="_blank" class="btn  btn-link btn-sm" href="purchase/purchasePrint/'
								+ purchaseInfo.id
								+ '/'
								+ purchaseInfo.purchaseType
								+ '">Print</a>\
								<a target="_blank" class="btn  btn-link btn-sm disabled" href="purchase/purchasePrint/'
								+ purchaseInfo.id
								+ '/'
								+ purchaseInfo.purchaseType
								+ '">Payment</a>\
								</span>\
								</span>';
						$("#purchaseList").append(listValue);
					});
}
function showpurchaseTable() {
	var purchaseDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/purchase/");
	purchaseDb.on("child_added", function(snapshot, childKey) {
		console.log("Table view");
		var purchaseInfo = snapshot.exportVal();
		tableValue = "<tr> \
						<td>" + purchaseInfo.id + "</td>\
						<td>"
				+ purchaseInfo.supplierName + "</td>\
						<td>"
				+ purchaseInfo.netAmount
				+ "</td>\
						<td><a target='blank' href=" + baseUrl
				+ "purchase/purchasePrint/" + purchaseInfo.id + "/"
				+ purchaseInfo.purchaseType + ">Print</a></tr>";
		$("#purchaseTable").append(tableValue);
		$(".progress").hide();
	});

}

function openPrint(id, purchaseType) {
	window.open(baseUrl + 'purchase/purchasePrint/' + id + '/' + purchaseType,
			'window name', 'window settings')
}