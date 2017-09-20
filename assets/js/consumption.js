var itemInfo = [];
var itemsDetailsByName = [];
var itemsDetailsById = [];
var itemsDetailsBySku = [];
var SupplierData = [];
var lineNumber = 0;
showConsumptionList();
showConsumptionTable();
var isEdit = false;
generateId();
if (isEdit == true) {
	loadConsumption(editId);
}

function generateId() {
	var id = 0;
	if ($("#editId").val() > 0) {
		editId = $("#editId").val();
		id = editId;
		setId('consumption', id);
		isEdit = true;
	} else {
		console.log('ddd');
		var itemDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
				+ "/consumption/");
		itemDb.on("value", function(snapshot) {
			id = snapshot.numChildren() + 1;
			setId('consumption', id);
			$(".progress").hide();
		});
	}
}

function supplierDropDown() {

	$("#supplierName").autocomplete(
			{
				minLength : 0,
				source : SupplierData,
				focus : function(event, ui) {
					$("#supplierName").val(ui.item.lable);
					return false;
				},
				select : function(event, ui) {
					SupplierDetails = ui.item.SupplierName + " (Id: "
							+ ui.item.id + ")<br>" + ui.item.email + "<br>"
							+ ui.item.mobileNumber + "<br>" + ui.item.address;
					$("#supplierId").val(ui.item.id);
					$("#supplierName").val(ui.item.SupplierName);
					$("#supplierDetails").html(SupplierDetails);
					return false;
				}
			}).autocomplete("instance")._renderItem = function(ul, item) {
		return $("<li>").append(
				"<a>" + item.SupplierName + " (" + item.mobileNumber + ")<br>"
						+ item.id + "</a>").appendTo(ul);
	};
}

function getSupplierInformation() {
	var SupplierDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/suppliers/");
	SupplierDb.orderByValue().on(
			"child_added",
			function(snapshot, childKey) {
				SupplierInfo = snapshot.exportVal();
				var address = SupplierInfo.address;
				a = {
					label : SupplierInfo.supplierName + " ("
							+ SupplierInfo.mobileNumber + ")",
					SupplierName : SupplierInfo.supplierName,
					id : SupplierInfo.id,
					email : SupplierInfo.emailId,
					mobileNumber : SupplierInfo.mobileNumber,
					address : (address),
				};
				console.log(a);
				SupplierData.push(a);
			});
}

$(function() {
//	addNewLine();
	getSupplierInformation();
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
		<input type="hidden" class="consumptionIdTxt"  value="'
			+ $("#consumptionId").html()
			+ '" name="LINE_'
			+ lineNumber
			+ '_consumptionId">\
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
			+ '" type="hidden" placeholder="DATE" class="entryDate">\
			<input id="'
			+ uom
			+ '"\
			name="'
			+ uom
			+ '" type="text" class="form-control">\
			</td>\
		<td><input id="'
			+ amount
			+ '"\
			name="'
			+ amount
			+ '" type="text" class="form-control"></td>\
	</tr>';
	$("#tableRows").append(newRow);
	getDateNumber("consumptionDate");
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
}

function showConsumptionList() {
	console.log("Printing consumptions");
	var consumptionDb = new Firebase("https://baseerp.firebaseio.com/"
			+ companyId + "/consumption/");
	consumptionDb
			.orderByValue()
			.on(
					"child_added",
					function(snapshot, childKey) {
						var consumptionInfo = snapshot.exportVal();
						consumptionDb.on("value", function(snapshot) {
							$("#consumptionCount").html(
									snapshot.numChildren() + " entries");
						});
						listValue = '<span class="list-group col-xs-12 col-sm-2 ">\
							<span class="list-group-item">#'
								+ consumptionInfo.id
								+ '\
			<h5 class="list-group-item-heading">'
								+ consumptionInfo.consumptionDate
								+ '</h5>\
			<a href="'
								+ baseUrl
								+ 'consumption/edit/'
								+ consumptionInfo.id
								+ '" class="btn btn-link btn-sm">View / Edit</a>\
								</span></span>';
						$("#consumptionList").append(listValue);
						$(".progress").hide();
					});
}
function showConsumptionTable() {
	var consumptionDb = new Firebase("https://baseerp.firebaseio.com/"
			+ companyId + "/consumption/");
	consumptionDb.on("child_added", function(snapshot, childKey) {
		console.log("Table view");
		var consumptionInfo = snapshot.exportVal();
		tableValue = "<tr> \
						<td>" + consumptionInfo.id
				+ "</td>\
						<td>" + consumptionInfo.consumptionDate
				+ "</td>\
						<td>--" + +"</td></tr>";
		$("#consumptionTable").append(tableValue);
	});
}

function loadConsumption(id) {
	console.log("Loading consumption: " + id);
	var consumptionDb = new Firebase("https://baseerp.firebaseio.com/"
			+ companyId + "/consumption");
	consumptionDb.orderByChild("id").equalTo(id).on(
			"child_added",
			function(snapshot) {
				consumptionInfo = snapshot.exportVal();
				$("#oldId").val(snapshot.key());
				$("#consumptionNarration").val(
						consumptionInfo.consumptionNarration);
				$("#consumptionDate").val(consumptionInfo.consumptionDate);
				$("#entryDate").val(consumptionInfo.entryDate);
			});
	var consumptionLineDb = new Firebase("https://baseerp.firebaseio.com/"
			+ companyId + "/consumptionLine");
	var inc = 0;
	consumptionLineDb.orderByChild("consumptionId").equalTo(id).on(
			"child_added",
			function(snapshot) {
				inc++;
				consumptionLineInfo = snapshot.exportVal();
				var line = addNewLine();
				oldLineItems.push(snapshot.key());
				$("#LINE_" + line + "_sku").val(consumptionLineInfo.sku);
				$("#LINE_" + line + "_entryDate").val(
						consumptionLineInfo.entryDate);
				$("#LINE_" + line + "_id").val(consumptionLineInfo.id);
				$("#LINE_" + line + "_consumptionId").val(
						consumptionLineInfo.consumptionId);
				$("#LINE_" + line + "_itemName").val(
						consumptionLineInfo.itemName);
				$("#LINE_" + line + "_qty").val(consumptionLineInfo.qty);
				$("#LINE_" + line + "_price").val(consumptionLineInfo.price);
				$("#LINE_" + line + "_uom").val(consumptionLineInfo.uom);
				priceCalc(line);
				$(".progress").hide();
			});
}