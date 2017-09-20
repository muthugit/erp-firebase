function loadData(id) {
	$("#oldId").val(customerObj[id].child);
	$("#id").val(customerObj[id].id);
	$("#customerName").val(customerObj[id].customerName);
	$("#emailId").val(customerObj[id].emailId);
	$("#mobileNumber").val(customerObj[id].mobileNumber);
	$("#phoneNumber").val(customerObj[id].phoneNumber);
	$("#address").val(customerObj[id].address);
	
	$("#cstNumber").val(customerObj[id].cstNumber);
	$("#cstNumberDated").val(customerObj[id].cstNumberDated);
	$("#rcNumber").val(customerObj[id].rcNumber);
	$("#tinNumber").val(customerObj[id].tinNumber);
	$("#exLicNumber").val(customerObj[id].exLicNumber);
	
	$("#submitButton").val("Update " + customerObj[id].customerName);
}