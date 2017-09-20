function loadData(id) {
	console.log(itemObj[id].child);
	$("#oldId").val(itemObj[id].child);
	$("#id").val(itemObj[id].id);
	$("#sku").val(itemObj[id].sku);
	$("#itemName").val(itemObj[id].itemName);
	$("#itemCost").val(itemObj[id].itemCost);
	$("#itemStock").val(itemObj[id].itemStock);
	$("#itemType").val(itemObj[id].itemType);
	$("#itemUom").val(itemObj[id].itemUom);
	$("#submitButton").val("Update " + itemObj[id].itemName);
}