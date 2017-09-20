var invoiceLineData = new Firebase("https://baseerp.firebaseio.com/"
		+ companyId + "/invoiceLine");
var consumptionLineData = new Firebase("https://baseerp.firebaseio.com/"
		+ companyId + "/consumptionLine");
var purchaseLineData = new Firebase("https://baseerp.firebaseio.com/"
		+ companyId + "/purchaseLine");
var productionLineData = new Firebase("https://baseerp.firebaseio.com/"
		+ companyId + "/productionLine");
var itemDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
		+ "/items/");
var fromDate = $("#fromEntryDate").val();
var toDate = $("#toEntryDate").val();
itemDb.on("child_added", function(snapshot, childKey) {
	var itemInfo = snapshot.exportVal();
	trackQty(itemInfo, consumptionLineData, 'consumption_' + itemInfo.id);
	trackQty(itemInfo, productionLineData, 'production_' + itemInfo.id);
	trackQty(itemInfo, invoiceLineData, 'sales_' + itemInfo.id);
	trackQty(itemInfo, purchaseLineData, 'purchase_' + itemInfo.id);
	tableValue = "<tr> \
						<td>" + itemInfo.id + "</td>\
						<td>"
			+ itemInfo.itemName + "</td>\
						<td>" + itemInfo.itemType
			+ "</td>\
						<td>" + itemInfo.itemUom
			+ "</td>\
						<td><span id='opening_" + itemInfo.id
			+ "'>0</span><span id='openingBuffer_" + itemInfo.id
			+ "'>0</span></td><td>" + "<span id='purchase_" + itemInfo.id
			+ "'>0</span>" + "</td>\
						<td>" + "<span id='production_"
			+ itemInfo.id + "'>0</span>" + "</td>\
						<td><span id='sales_"
			+ itemInfo.id + "'>0</span></td>\<td><span id='consumption_"
			+ itemInfo.id + "'>0</span></td>\
					<td><span id='closing_"
			+ itemInfo.id + "'>0</span>\
						</tr>";
	$("#stockTable").append(tableValue);
});

function calcOpening(itemInfo, qty) {
	var openingQty = $("#opening_" + itemInfo.id).html();
	openingQty = (parseFloat(openingQty) + parseFloat(qty)).toFixed(1);
	$("#opening_" + itemInfo.id).html(openingQty);

}

function calcClosing(itemInfo) {
	var openingBalance = parseFloat($("#opening_" + itemInfo.id).html());
	var consumption = parseFloat($("#consumption_" + itemInfo.id).html());
	var production = parseFloat($("#production_" + itemInfo.id).html());
	var sales = parseFloat($("#sales_" + itemInfo.id).html());
	var purchase = parseFloat($("#purchase_" + itemInfo.id).html());
	var closingQty = openingBalance + purchase + production - sales
			- consumption;
	$("#closing_" + itemInfo.id).html(closingQty.toFixed(2));
	$(".progress").hide();
}
function trackQty(itemInfo, whatLine, outputId) {
	var qty = 0;
	var openingQty = 0;
	whatLine.orderByChild("id").equalTo(itemInfo.id)
			.on(
					"child_added",
					function(snapShot) {
						var consumptionItemInfo = snapShot.exportVal();
						console.log("DB Date: " + consumptionItemInfo.entryDate
								+ " -- From Date: " + fromDate);
						if (consumptionItemInfo.entryDate >= fromDate
								&& consumptionItemInfo.entryDate <= toDate) {
							qty = parseFloat(qty)
									+ parseFloat(consumptionItemInfo.qty);
						} else if (consumptionItemInfo.entryDate < fromDate) {
							calcOpening(itemInfo, consumptionItemInfo.qty);
						}
						$("#" + outputId).html(parseFloat(qty).toFixed(2));
						calcClosing(itemInfo);
					});
}
