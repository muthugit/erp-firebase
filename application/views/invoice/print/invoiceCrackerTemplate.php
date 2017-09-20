<style>
.invoice-title h2,.invoice-title h3 {
	display: inline-block;
}

.table>tbody>tr>.no-line {
	border-top: none;
}

.table>thead>tr>.no-line {
	border-bottom: none;
}

.table>tbody>tr>.thick-line {
	border-top: 2px solid;
}

table {
	font-size: 10px;
}

tr {
	height: 5px;
}

@media print {
	html,body {
		display: block;
		font-family: "Consolas";
		margin: 0;
	}
}
</style>
<?php
$this->load->view ( 'includes/blankHeader' );
?>
<input type="hidden" name="invoiceId" id="invoiceId"
	value="<?php echo $invoiceId;?>">
<input type="hidden" id="totalAmountNumber">
<div class="invoicePrint container" style="padding-top: 65px">
	<table width="753">
		<tr>
			<td width="710"></td>
			<td><b><span id="invoiceIdPrint" /></b></td>
		</tr>
		<tr>
			<td></td>
			<td><b><span id="printInvoiceDate" /></b></td>
		</tr>
	</table>
	<table width="753" style="padding-top: 14px">
		<tr>
			<td width="450px"><span id="printCustomerName"></span><br> <span
				id="printCustomerAddress"></span></td>
			<td><span id="cstNumber"></span><br> <span id="cstNumberDated"></span>
				<span id="rcNumber"></span><br> <span id="tinNumber"></span><br> <span
				id="poNumber"></span></td>
		</tr>
	</table>
	<div style="top: 25px; position: relative; height: 305px">
		<table width="753" id="printLineItems">
		</table>
	</div>
	<table width="753">
		<tr>
			<td>
				<table>
					<tr>
						<td width="100px"></td>
						<td><span id="modeOfTransport"></span></td>
					</tr>
					<tr>
						<td width="120px"></td>
						<td><span id="motorVehicleRegnNo"></span></td>
					</tr>
					<tr>
						<td width="100px"></td>
						<td width="100px"><span id="despatchFrom"></span></td>
						<td><span id="despatchTo"></span></td>
					</tr>
					<tr>
						<td width="100px"></td>
						<td><span id="rlrNo"></span></td>
					</tr>

				</table>
			</td>
			<td>
				<table width="100%" style="font-size: 8px;">

					<tr style="height: 5px;"></tr>
					<tr>
						<td style="text-align: right;"><span id="subTotal"></span></td>
					</tr>
					<tr>
						<td style="text-align: right;"><span id="discount"></span></td>
					</tr>
					<tr>
						<td style="text-align: right;"><span id="shipping"></span></td>
					</tr>
					<tr>
						<td style="text-align: right;"><span id="mahamai"></span></td>
					</tr>
					<tr>
						<td style="text-align: right;"><span id="insurance"></span></td>
					</tr>
					<tr>
						<td style="text-align: right;"><span id="tax"></span></td>
					</tr>
					<tr>
						<td style="text-align: right;"><b><span id="netAmount"></span></b></td>
					</tr>
				</table>
			</td>
		</tr>

	</table>
	<span style="font-size: 12px; padding-top: 8px; padding-left: 30px"
		id="netAmountText"></span>
</div>

<?php
$this->load->view ( 'includes/defaultFooter' );
?>
<script src="<?php echo JS_PATH?>invoice.js"></script>
<script>
$("#baseErpHeader").hide();
$("#baseErpFooter").hide();
var companyDb = new Firebase("https://baseerp.firebaseio.com/" + companyId);
var invoiceData=new Firebase("https://baseerp.firebaseio.com/" + companyId+"/invoice");
var invoiceLineData=new Firebase("https://baseerp.firebaseio.com/" + companyId+"/invoiceLine");
var invoiceCustomerData=new Firebase("https://baseerp.firebaseio.com/" + companyId+"/customers");
var invoiceId=$("#invoiceId").val();

invoiceData.orderByChild("id").equalTo(invoiceId).on(
		"child_added",
		function(snapshot) {
			var discountBy="";
			var invoiceInfo = snapshot.exportVal();
			if(invoiceInfo.discountBy=="percentage"){
				discountBy="%";
			}else{
				discountBy="Rs.";
			}
			if(invoiceInfo.shippingCalcBy=="percentage"){
				shipBy="%";
			}else{
				shipBy="Rs.";
			}
			$("#invoiceIdPrint").html(invoiceInfo.id);
			$("#printInvoiceDate").html(invoiceInfo.invoiceDate);
			$("#poNumber").html(invoiceInfo.poNo);
			$("#modeOfTransport").html(invoiceInfo.modeOfTransport);
			$("#motorVehicleRegnNo").html(invoiceInfo.motorVehicleRegnNo);
			$("#despatchFrom").html(invoiceInfo.despatchFrom);
			$("#despatchTo").html(invoiceInfo.despatchTo);
			$("#rlrNo").html(invoiceInfo.rlrNo);
			$("#subTotal").html(invoiceInfo.lineTotal);
			$("#discount").html("("+invoiceInfo.discountValue+discountBy+") "+invoiceInfo.discountAmount);
			$("#shipping").html("("+invoiceInfo.shippingValue+shipBy+") "+invoiceInfo.shippingAmount);
			$("#mahamai").html(invoiceInfo.mahamaiAmount);
			$("#insurance").html(invoiceInfo.insuranceAmount);
			$("#netAmount").html(invoiceInfo.netAmount);
			$("#totalAmountNumber").val(invoiceInfo.netAmount);
			numberToText("totalAmountNumber", "netAmountText");
			$("#tax").html("("+invoiceInfo.taxValue+"%) "+invoiceInfo.taxAmount);
			invoiceCustomerData.orderByChild("id").equalTo(invoiceInfo.customerId).on("child_added",
					function(invoiceCustomerSnapShot){
				console.log("Invoice id: "+invoiceId);
					var customerInfo = invoiceCustomerSnapShot.exportVal();
					$("#printCustomerName").html(customerInfo.customerName);
					$("#cstNumber").html(customerInfo.cstNumber);
					$("#cstNumberDated").html(customerInfo.cstNumberDated);
					$("#tinNumber").html(customerInfo.tinNumber);
					$("#printCustomerAddress").html(customerInfo.address.replace(/\r\n/g, "<br />"));
					
				});
			invoiceLineData.orderByChild("invoiceId").equalTo(invoiceInfo.id).on("child_added",
				function(lineSnapShot){
				var invoiceLineInfo = lineSnapShot.exportVal();
				var tableRow="<tr>\
					<td width='95px'>"+invoiceLineInfo.caseNo+"</td>\
					<td width='40px'>"+invoiceLineInfo.caseCs+"</td>\
					<td width='270px'>"+invoiceLineInfo.itemName+"</td>\
					<td width='40px'>"+invoiceLineInfo.caseCCS+"</td>\
					<td width='70px'>"+invoiceLineInfo.qty+"</td>\
					<td width='45px' style='text-align: right;'>"+invoiceLineInfo.price+"</td>\
					<td width='70px' style='padding-left:12px'>"+invoiceLineInfo.uom+"</td>\
					<td style='text-align: right;'>"+invoiceLineInfo.amount+"</td>\
					</tr>";
				$("#printLineItems").prepend(tableRow);
				
				
			});
		});
</script>