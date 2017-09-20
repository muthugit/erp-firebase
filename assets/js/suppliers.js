function loadData(id) {
	$("#oldId").val(supplierObj[id].child);
	$("#id").val(supplierObj[id].id);
	$("#supplierName").val(supplierObj[id].supplierName);
	$("#emailId").val(supplierObj[id].emailId);
	$("#mobileNumber").val(supplierObj[id].mobileNumber);
	$("#phoneNumber").val(supplierObj[id].phoneNumber);
	$("#address").val(supplierObj[id].address);
	
	$("#submitButton").val("Update " + supplierObj[id].supplierName);
}