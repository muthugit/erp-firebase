var companyDb = new Firebase("https://baseerp.firebaseio.com/" + companyId
		+ "/companyInfo");
companyDb.orderByValue().on("child_added", function(snapshot, childKey) {
	companyInfo = snapshot.exportVal();
	$("#companyId").val(companyInfo.companyId);
	$("#companyName").val(companyInfo.companyName);
	$("#emailId").val(companyInfo.emailId);
	$("#address").val(companyInfo.address);
});