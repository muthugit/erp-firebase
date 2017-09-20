var baseUrl = "/";
var erpMain = new Firebase("https://baseerp.firebaseio.com");
var companyDb = new Firebase("https://baseerp.firebaseio.com/" + companyId);
var itemDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
		+ "/items/");

var transactionKey = "";
var oldLedgerId = "";

var companyId;
var oldLineItems = [];
var pageId = $("#pageId").html();
var currentFY = "2015-16";

companyId = localStorage["companyId"];
if (companyId == "" || companyId == null || companyId == undefined) {
	if (pageId != "index") {
		$("#body").hide();
		window.location.href = "index";
	}
} else {
	if (pageId == "index") {
		$("#body").hide();
		window.location.href = "dashboard";
	}
}

// FORM SUBMISSION BEGINS
var $form = $('form');
$form.submit(function(event) {

	isExistingItem = false;
	pageId = $("#pageId").html();

	event.preventDefault();
	var data = $form.serializeArray().filter(function(k) {
		return $.trim(k.value) != "";
	});
	var dataIP = {};
	var dataMetaIP = {};
	var invoiceItemIP = {};
	var totalLineItems = 0;
	var currentLine = 0;
	var invoiceObj = {};
	var invoiceArray = [];
	if (pageId == "companyInfo") {
		var companyRef = new Firebase("https://baseerp.firebaseio.com/"
				+ companyId + "/" + pageId);
		companyRef.remove();
		dataIP["companyId"] = companyId;
	}

	if ($("#oldId").val() != '') {
		var removeOldData = new Firebase("https://baseerp.firebaseio.com/"
				+ companyId + "/" + pageId + "/" + $("#oldId").val());
		removeOldData.remove();
		isExistingItem = true;
		jQuery.each(oldLineItems, function(i, val) {
			var removeOldLineItems = new Firebase(
					"https://baseerp.firebaseio.com/" + companyId + "/"
							+ pageId + "Line/" + val);
			removeOldLineItems.remove();
		});
	}
	var transId = "";
	var ledgerId = "";

	if ($("#netAmount").val() > 0) {
		// SAVING A TRANSACTION AND DELETING OLD TRANSACTION
		transId = saveTransaction();
	}
	if (pageId == "customers" || pageId == "suppliers") {
		ledgerId = createLedger();
	}

	$.each(data, function(i, field) {
		var idColumn = '';
		if (field.name == 'id') {
			idColumn = field.value;
			dataMetaIP["id"] = idColumn;
		}
		if (field.name.startsWith("META_")) {
			var METAName = field.name.substring(5, field.name.length);
			dataMetaIP[METAName] = field.value;
		} else if (field.name.startsWith("LINE_")) {

			var invoiceLine = field.name.substring(5, field.name.length);
			var invoiceLineItemContainer = invoiceLine.split("_");
			var invoiceLineItemNumber = invoiceLineItemContainer[0];
			var invoiceLineItemKey = invoiceLineItemContainer[1];
			if (currentLine == invoiceLineItemNumber) {
				invoiceObj[invoiceLineItemKey] = field.value;
			} else {
				dataIP['totalLineItems'] = totalLineItems;
				totalLineItems++;
				invoiceArray.push(invoiceObj);
				if (currentLine != 0) {
					invoiceObj = Object.create(null);
					invoiceObj[invoiceLineItemKey] = field.value;
				}
				currentLine = invoiceLineItemNumber;
			}
		} else {
			console.log("Field Name: " + field.name);
			dataIP[field.name] = field.value;
		}
	});
	invoiceArray.push(invoiceObj);
	if (transactionKey != "") {
		dataIP["transactionKey"] = transactionKey;
	}
	if (ledgerId != '') {
		dataIP['ledgerId'] = ledgerId;
	}
	var submissionsRef = new Firebase("https://baseerp.firebaseio.com/"
			+ companyId + "/" + pageId);
	submissionsRef.push(dataIP, function(err) {
		if (err) {
			window.alert('Error when submitting data: ' + err.message);
		} else {
			var metaCount = getObjCount(dataMetaIP);
			var invoiceItemCount = invoiceArray.length;
			if (metaCount > 1) {
				var submissionsSubRef = new Firebase(
						"https://baseerp.firebaseio.com/" + companyId + "/"
								+ pageId + "Meta/");
				submissionsSubRef.push(dataMetaIP, function(err) {
					if (err) {
						window.alert('Error when submitting meta data: '
								+ err.message);
					}
				});
			}
			if (invoiceItemCount >= 1) {
				var submissionsSubRef = new Firebase(
						"https://baseerp.firebaseio.com/" + companyId + "/"
								+ pageId + "Line/");
				jQuery.each(invoiceArray, function(i, val) {
					submissionsSubRef.push(val, function(err) {
						if (err) {
							window.alert('Error when submitting meta data: '
									+ err.message);
						} else {
							// location.reload();
						}
					});
				});
				// location.reload();
				var redirectId = pageId;
				if (pageId == 'invoice') {
					redirectId = 'sales';
				}
				window.open(baseUrl + redirectId, "_self");
			}
		}
	});

	window.alert('Data inserted successfully!');

	$form[0].reset();
	hideSideNav();

});
// FORM SUBMISSION ENDS

function createLedger() {
	var accountName = '';
	if (oldLedgerId != undefined && oldLedgerId != '') {
		var oldLedgerRef = new Firebase("https://baseerp.firebaseio.com/"
				+ companyId + "/ledgers/" + oldLedgerId);
		oldLedgerRef.remove();
	}
	if (pageId == "customers") {
		accountName = $("#customerName").val();
	} else if (pageId == "suppliers") {
		accountName = $("#supplierName").val();
	}
	var ledgerData = {};
	ledgerData['id'] = $("#id").val();
	ledgerData['group'] = pageId;
	ledgerData['accountName'] = accountName;

	var submissionsRef = new Firebase("https://baseerp.firebaseio.com/"
			+ companyId + "/ledgers");
	var ledgerId = submissionsRef.push(ledgerData, function(err) {
		if (err) {
			window.alert('Error when submitting data: ' + err.message);
			return null;
		} else {

		}
	});
	return ledgerId.key();

}

function saveTransaction() {
	if (transactionKey != undefined && transactionKey != '') {
		var oldTransRef = new Firebase("https://baseerp.firebaseio.com/"
				+ companyId + "/transactions/" + transactionKey);
		oldTransRef.remove();
	}
	fromAccountType = $("#fromAccountType").val();
	fromAccountId = $("#fromAccountId").val();
	toAccountId = $("#toAccountId").val();
	toAccountType = $("#toAccountType").val();
	transDate = $("#transDate").val();
	narration = $("#narration").val();
	if (narration == null || narration == undefined || narration == "") {
		narration = "[Auto generated] An entry of " + pageId;
	}

	if (pageId == "invoice") {
		fromAccountType = "invoice";
		fromAccountId = $("#id").val();
		toAccountId = $("#customerId").val();
		toAccountType = "customers";
		transDate = $("#invoiceDate").val();
	} else if (pageId == "purchase") {
		fromAccountType = "suppliers";
		fromAccountId = $("#supplierId").val();
		toAccountId = $("#id").val();
		toAccountType = "purchase";
		transDate = $("#purchaseDate").val();
	}
	var transactionData = {};
	transactionData['type'] = pageId;
	transactionData['fromAccountId'] = fromAccountId;
	transactionData['fromAccountType'] = fromAccountType;
	transactionData['toAccountId'] = toAccountId;
	transactionData['toAccountType'] = toAccountType;
	transactionData['transDate'] = transDate;
	transactionData['entryDate'] = $("#entryDate").val();
	transactionData['amount'] = $("#netAmount").val();
	transactionData['narration'] = narration;

	var submissionsRef = new Firebase("https://baseerp.firebaseio.com/"
			+ companyId + "/transactions");
	var transId = submissionsRef.push(transactionData, function(err) {
		if (err) {
			window.alert('Error when submitting data: ' + err.message);
		} else {

		}
	});
	transactionKey = transId.key();
	return transId.key();
}

$(document).ready(function() {
	generateId(pageId);
	if (pageId == "items") {
		showItemCount();
		showItemTable();
		showItemList();
	} else if (pageId == "suppliers") {
		showSupplierCount();
		showSuppliersTable();
		showSuppliersList();
	} else if (pageId == "customers") {
		showCustomerCount();
		showCustomersTable();
		showCustomersList();
	} else if (pageId = "consumption") {
		listMaterialsForEntry();
	}
});

function showTopNav() {
	$(".showTopNav").hide();
	$(".hideTopNav").show();
	$("#topNavigation").show(200);
}
function hideTopNav() {
	$(".showTopNav").show();
	$(".hideTopNav").hide();
	$("#topNavigation").hide(200);
}
function loginWithGoogle() {
	erpMain.authWithOAuthPopup("google", function(error, authData) {
		if (error) {
			alert("Login failed");
			localStorage.setItem("companyId", "");
			window.location.href = "index";
		} else {
			var authData = erpMain.getAuth();
			localStorage["companyId"] = authData.uid;
			companyId = localStorage["companyId"];
			window.location.href = "dashboard";
		}
	});
}
function logOut() {
	erpMain.unauth();
	localStorage.setItem("companyId", "");
	window.location.href = "index";
}

function showItemCount() {
	$("#itemsCount").html("loading");
	var itemDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/items/");
	itemDb.on("value", function(snapshot) {
		$("#itemsCount").html(snapshot.numChildren() + " items");
	});
}

function showSupplierCount() {
	$("#suppliersCount").html("loading");
	var itemDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/suppliers/");
	itemDb.on("value", function(snapshot) {
		$("#suppliersCount").html(snapshot.numChildren() + " suppliers");
	});
}

function showCustomerCount() {
	$("#customersCount").html("loading");
	var itemDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/customers/");
	itemDb.on("value", function(snapshot) {
		$("#customersCount").html(snapshot.numChildren() + " customers");
	});
}
var itemObj = {};
function showItemList() {

	var itemDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/items/");

	itemDb.on('child_removed', function(oldChildSnapshot) {
		$("#listId" + oldChildSnapshot.key()).hide();
	});

	itemDb
			.orderByValue()
			.on(
					"child_added",
					function(snapshot, childKey) {
						var itemInfo = snapshot.exportVal();
						itemDb.on("value", function(snapshot) {
							$("#itemsCount").html(
									snapshot.numChildren() + " items");
						});
						itemObj[itemInfo.id] = itemInfo;
						itemObj[itemInfo.id].child = snapshot.key();
						console.log("CHILD: " + snapshot.key());
						var stockValue = parseInt(itemInfo.itemStock)
								* parseInt(itemInfo.itemCost);
						if (itemInfo.itemType == "Material") {
							itemType = '<span class="label label-warning">Material</span>';
						} else {
							itemType = '<span class="label label-info">Product</span>';
						}
						listValue = '<span id="listId'
								+ snapshot.key()
								+ '" class="list-group col-xs-6 col-sm-2 "><a onclick="showSideNav();loadData('
								+ itemInfo.id
								+ ');"  href="#" class="list-group-item">\
			#'
								+ itemInfo.id
								+ '\
			<h5 class="list-group-item-heading">'
								+ itemInfo.itemName + '</h5>\
			Qty:'
								+ itemInfo.itemStock
								+ '<span class="pull-right">Rs.' + stockValue
								+ '</span>\
			<br>' + itemType
								+ ' \
			</a></span>';
						$("#itemsList").append(listValue);
						$(".progress").hide();
					});
}

var supplierObj = {};
function showSuppliersList() {
	var supplierDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/suppliers/");
	supplierDb.on('child_removed', function(oldChildSnapshot) {
		$("#listId" + oldChildSnapshot.key()).hide();
	});
	supplierDb
			.orderByValue()
			.on(
					"child_added",
					function(snapshot, childKey) {
						var supplierInfo = snapshot.exportVal();
						supplierDb.on("value", function(snapshot) {
							$("#suppliersCount").html(
									snapshot.numChildren() + " suppliers");
						});

						supplierObj[supplierInfo.id] = supplierInfo;
						supplierObj[supplierInfo.id].child = snapshot.key();
						// GET OLD LEDGER ID
						oldLedgerId = supplierInfo.ledgerId;

						listValue = '<span id="listId'
								+ snapshot.key()
								+ '" class="list-group col-xs-12 col-sm-4 "><a onclick="showSideNav();loadData('
								+ supplierInfo.id
								+ ');" href="#" class="list-group-item">\
			#'
								+ supplierInfo.id
								+ '\
			<h5 class="list-group-item-heading">'
								+ supplierInfo.supplierName
								+ '</h5>\
			<i class="fa fa-envelope"></i> '
								+ supplierInfo.emailId
								+ '<br><i class="fa fa-phone"></i> '
								+ supplierInfo.mobileNumber
								+ '\
			<br><span style="color:red"+></span>\
			</a></span>';
						$("#suppliersList").append(listValue);
					});
}

var customerObj = {};
function showCustomersList() {
	var customerDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/customers/");
	customerDb.on('child_removed', function(oldChildSnapshot) {
		$("#listId" + oldChildSnapshot.key()).hide();
	});

	customerDb
			.orderByValue()
			.on(
					"child_added",
					function(snapshot, childKey) {
						var customerInfo = snapshot.exportVal();
						customerDb.on("value", function(snapshot) {
							$("#customersCount").html(
									snapshot.numChildren() + " customers");
						});

						customerObj[customerInfo.id] = customerInfo;
						customerObj[customerInfo.id].child = snapshot.key();
						// GET OLD LEDGER ID
						oldLedgerId = customerInfo.ledgerId;

						listValue = '<span id="listId'
								+ snapshot.key()
								+ '" class="list-group col-xs-12 col-sm-4 "><a onclick="showSideNav();loadData('
								+ customerInfo.id
								+ ');" href="#" href="#" class="list-group-item">\
			#'
								+ customerInfo.id
								+ '\
			<h5 class="list-group-item-heading">'
								+ customerInfo.customerName
								+ '</h5>\
			<i class="fa fa-envelope"></i> '
								+ customerInfo.emailId
								+ '<br><i class="fa fa-phone"></i> '
								+ customerInfo.mobileNumber
								+ '\
			<br><span style="color:red"+>Balance to pay: Rs.300</span>\
			</a></span>';
						$("#customersList").append(listValue);
					});
}
function showItemTable() {
	var itemDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/items/");
	itemDb.on("child_added", function(snapshot, childKey) {
		var itemInfo = snapshot.exportVal();
		var stockValue = parseInt(itemInfo.itemStock)
				* parseInt(itemInfo.itemCost);
		tableValue = "<tr> \
						<td>" + itemInfo.id + "</td>\
						<td>"
				+ itemInfo.itemName + "</td>\
						<td>" + itemInfo.itemType
				+ "</td>\
						<td>" + itemInfo.itemUom + "</td>\
						<td>"
				+ itemInfo.itemCost + "</td>\
						<td>" + itemInfo.itemStock
				+ "</td>\
						<td>" + stockValue + "</td>\
						</tr>";
		$("#itemsTable").append(tableValue);
	});
}

function showSuppliersTable() {
	var supplierDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/suppliers/");
	supplierDb.on("child_added", function(snapshot, childKey) {
		var supplierInfo = snapshot.exportVal();
		// GET OLD LEDGER ID
		oldLedgerId = supplierInfo.ledgerId;

		tableValue = "<tr> \
						<td>" + supplierInfo.id
				+ "</td>\
						<td>" + supplierInfo.supplierName
				+ "</td>\
						<td>" + supplierInfo.emailId
				+ "</td>\
						<td>" + supplierInfo.contactNumber
				+ "</td>\
						<td>" + supplierInfo.mobileNumber
				+ "</td>\
						<td>5</td>\
						</tr>";
		$("#suppliersTable").append(tableValue);
	});
}

function showCustomersTable() {
	var customerDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/customers/");
	customerDb.on("child_added", function(snapshot, childKey) {
		var customerInfo = snapshot.exportVal();
		// GET OLD LEDGER ID
		oldLedgerId = customerInfo.ledgerId;

		tableValue = "<tr> \
						<td>" + customerInfo.id
				+ "</td>\
						<td>" + customerInfo.customerName
				+ "</td>\
						<td>" + customerInfo.emailId
				+ "</td>\
						<td>" + customerInfo.contactNumber
				+ "</td>\
						<td>" + customerInfo.mobileNumber
				+ "</td>\
						<td>5</td>\
						</tr>";
		$("#customersTable").append(tableValue);
	});
}

function callback() {
	setTimeout(function() {
		$("#effect:visible").removeAttr("style").fadeOut();
	}, 1000);
};

var options = {
	percent : 100
};

function showSideNav() {
	generateId(pageId);
	$(".mask").fadeIn();
	$('#sideNav').show("slide", {}, 500, callback);
	// $("#sideNav").effect("slide",500);
}
function hideSideNav() {
	$(".mask").fadeOut();
	$("#sideNav").hide("slide", {}, 500, callback);

}

function showView(whatToShow) {
	$("#tableView").hide();
	$("#listView").hide();
	$("#" + whatToShow).show();
}

function addNewItem() {
	$form[0].reset();
	generateId(pageId);
	$("#submitButton").val("Save");
}

function loadItems() {

}

function listMaterialsForEntry() {
	var itemDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/items/");
	itemDb.orderByChild("itemType").equalTo("Material").on(
			"child_added",
			function(snapshot) {
				var materialInfo = snapshot.exportVal();
				var itemToAdd = '<option value="' + materialInfo.id + '">'
						+ materialInfo.itemName + '\
			</option>';
				$("#materialDropdown").append(itemToAdd);
				var itemNames = '<input type="hidden" id="MAT-NAME'
						+ materialInfo.id + '" value="' + materialInfo.itemName
						+ '"/>';
				$("#itemInfo").append(itemNames);
			});

	var itemDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/consumptionMeta/");
	itemDb.orderByChild("id").equalTo("2").on("child_added",
			function(snapshot) {
				var consumptionInfo = snapshot.exportVal();
			});
}

function setId(what, id) {
	console.log("Setting: " + what);
	$("#id").val(parseInt(id));
	$("#" + what + "Id").html(parseInt(id));
	$("#" + what + "IdTxt").val(parseInt(id));
	$("." + what + "Txt").val(parseInt(id));
}

function generateId(what) {
	var itemDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
			+ "/" + what + "/");
	itemDb.on("value", function(snapshot) {
		$("#id").val(parseInt(snapshot.numChildren()) + 1);
		if (what == "consumption") {
			$("#consumptionId").html(parseInt(snapshot.numChildren() + 1));
			$("#consumptionIdTxt").val(parseInt(snapshot.numChildren() + 1));
			$(".consumptionIdTxt").val(parseInt(snapshot.numChildren() + 1));
		} else if (what == "production") {
			$("#productionId").html(parseInt(snapshot.numChildren() + 1));
			$("#productionIdTxt").val(parseInt(snapshot.numChildren() + 1));
			$(".productionIdTxt").val(parseInt(snapshot.numChildren() + 1));
		}

	});
}

$("#materialDropdown")
		.click(
				function() {
					if ($("#materialDropdown").val() != 0) {
						var id = $("#materialDropdown").val();
						var name = $("#MAT-NAME" + id).val();
						var itemToAdd = '<div class="form-group">\
	     <label for="inputEmail" class="col-lg-4 control-label">'
								+ name
								+ '</label>\
	     <div class="col-lg-2">\
	       <input type="number" step="any" class="form-control" id="MATERIAL-'
								+ id
								+ '-QTY" name="META_QTY_'
								+ id
								+ '" placeholder="'
								+ name
								+ '">\
	     </div>\
	   </div>';
						if (id != '' || id != 'undefined'
								|| name != 'undefined') {
							$("#materialDropdown option[value='" + id + "']")
									.remove();
							$("#listMaterialsForEntry").append(itemToAdd);
						}
					}
				});

function getObjCount(obj) {
	var c = 0;
	for ( var key in obj) {
		if (obj.hasOwnProperty(key))
			++c;
	}
	return c;
}

$("#entryDate").hide();

function getDateNumber(id, to) {
	var dateIp = $("#" + id).val();
	$('.entryDate').val(dateToNumber(dateIp));
	$("#" + to).val(dateToNumber(dateIp));
	console.log("ID: " + id + "--->" + to + '-->' + dateToNumber(dateIp));
}
function dateToNumber(dateIp) {
	var dateSplit = dateIp.split("/");
	var dateNumber = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
	return Number(dateNumber);
}

$(document).ready(function() {
	$("#fromDate").datepicker();
	$("#fromDate").datepicker("option", "dateFormat", "dd/mm/yy");

	$("#toDate").datepicker();
	$("#toDate").datepicker("option", "dateFormat", "dd/mm/yy");
});