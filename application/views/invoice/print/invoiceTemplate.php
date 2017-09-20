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
	font-size: 12px;
}
</style>
<?php
$this->load->view ( 'includes/defaultHeader' );
?>
<input type="hidden" name="invoiceId" id="invoiceId"
	value="<?php echo $invoiceId;?>">
<div class="invoicePrint container">
	<div class="row">
		<div class="col-xs-12">
			<div class="invoice-title">
				<h2>Company Name</h2>
				<h3 class="pull-right">
					Invoice # <span id="invoiceIdPrint"></span>
				</h3>
			</div>
			Address<br> of the company<br>
			<hr>
			<div class="row">
				<div class="col-xs-6">
					<address>
						<strong>Billed To:</strong><br> <span id="printCustomerName"></span><br>
						<span id="printCustomerAddress"></span>
					</address>
				</div>
				<div class="col-xs-6 text-right">
					<strong>Invoice Date: <span id="printInvoiceDate"></span></strong>
					<address>
						<strong>Other details</strong><br> <span
							id="printCustomerOtherDetails"></span>
					</address>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h3 class="panel-title">
						<strong>Order summary</strong>
					</h3>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-condensed">
							<thead>
								<tr>
									<td><strong>Item</strong></td>
									<td class="text-center"><strong>Price</strong></td>
									<td class="text-center"><strong>Quantity</strong></td>
									<td class="text-right"><strong>Totals</strong></td>
								</tr>
							</thead>
							<tbody id="printLineItems">
								<tr>
									<td class="no-line"></td>
									<td class="no-line"></td>
									<td class="no-line text-center"><strong>Shipping</strong></td>
									<td class="no-line text-right">$15</td>
								</tr>
								<tr>
									<td class="no-line"></td>
									<td class="no-line"></td>
									<td class="no-line text-center"><strong>Total</strong></td>
									<td class="no-line text-right">$685.99</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
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
			
			var invoiceInfo = snapshot.exportVal();
			$("#invoiceIdPrint").html(invoiceInfo.id);
			$("#printInvoiceDate").html(invoiceInfo.invoiceDate);
			invoiceCustomerData.orderByChild("id").equalTo(invoiceInfo.customerId).on("child_added",
					function(invoiceCustomerSnapShot){
				console.log("Invoice id: "+invoiceId);
					var customerInfo = invoiceCustomerSnapShot.exportVal();
					$("#printCustomerName").html(customerInfo.customerName);
					
					$("#printCustomerAddress").html(customerInfo.address.replace(/\r\n/g, "<br />"));
					
				});
			invoiceLineData.orderByChild("invoiceId").equalTo(invoiceInfo.id).on("child_added",
				function(lineSnapShot){
				var invoiceLineInfo = lineSnapShot.exportVal();
				var tableRow="<tr>\
					<td>"+invoiceLineInfo.sku+"</td>\
					<td class='text-right'>"+invoiceLineInfo.price+"</td>\
					<td class='text-right'>"+invoiceLineInfo.qty+"</td>\
					<td class='text-right'>"+invoiceLineInfo.amount+"</td>\
					</tr>";
				$("#printLineItems").prepend(tableRow);
			});
		});
</script>