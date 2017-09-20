<?php
$this->load->view ( 'includes/defaultHeader' );
?>

<link rel="stylesheet"
	href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

<div id="pageId" style="display: none">invoice</div>
<form>
	<div id="invoiceContainer" class="form-horizontal">
		<div class="col-lg-12">

			<div class="col-lg-12">
				<div class="col-lg-12">
					<center>
						<h3>
							INVOICE <span id="invoiceId"></span> <input style="display: none" type="text"
								name="LINE_invoiceId" id="invoiceIdTxt">
						</h3>
					</center>
				</div>

				<div class="col-lg-12">
					<div class="form-group" style="display: none">
						<label for="poNo" class="col-lg-2 control-label"><h4>Invoice #</h4></label>
						<div class="col-lg-2">
							<input id="id" name="id" type="text" class="form-control">
						</div>
					</div>
					<div class="form-group">
						<label for="poNo" class="col-lg-2 control-label">Date</label>
						<div class="col-lg-2">
							<input id="invoiceDate" name="invoiceDate" type="text"
								class="form-control">
						</div>
					</div>

					<hr>
				</div>
				<div class="col-lg-6">
					<div class="form-group">
						<label for="poNo" class="col-lg-1 control-label">To</label>
						<div class="col-lg-6">
							<input name="customerId" onfocus="customerDropDown();"
								type="hidden" class="form-control" id="customerId"
								placeholder="Enter customer keyword"> 
							<input name="customerName"
								onfocus="customerDropDown();" type="text" class="form-control"
								id="customerName" placeholder="Enter customer keyword"> <span
								id="customerDetails"></span>
						</div>
					</div>
				</div>
				<div class="col-lg-6 ">
					<div class="form-group">
						<label for="poNo" class="col-lg-4 control-label">Purchase Order
							Number</label>
						<div class="col-lg-8">
							<input type="text" name="poNo" class="form-control" id="poNo"
								placeholder="PO Number">
						</div>
					</div>
				</div>
				<div class="col-lg-12">
					<br>
				</div>
				<div class="col-lg-12 table-responsive">
					<table class="table  table-striped col-sm-12">
						<tr>
							<th width="4%">Product ID</th>
							<th width="15%">SKU</th>
							<th width="20%">Description</th>
							<th width="5%">Quantity</th>
							<th width="8%">Price</th>
							<th width="8%">Per</th>
							<th width="10%">Amount</th>
						</tr>
						<tbody id="tableRows">
						</tbody>
					</table>

				</div>
				<hr>
				<!-- 				<input type="submit" id="submit" value="Save invoice" -->
				<!-- 					class="btn btn-primary"> -->
			</div>


		</div>
	</div>
	<div class="col-lg-12">
		<a onclick="addNewLine();" class="btn btn-primary">+ Add item</a>
	</div>

	<div class="col-lg-12" style="height: 100px;"></div>
	<div class="moreInfo" class="container-fluid" style="color: black">
		<p style="padding: 1%">
			<b> Total number of Items: <span id="totalItems">0</span> | Total
				amount: <span id="totalAmount">0</span> <span class="pull-right""> <input
					type="submit" value="Save invoice" class="btn btn-primary">
			</span>
			</b>
		</p>
	</div>
	<div class="col-lg-12"></div>
</form>
</div>

<?php
$this->load->view ( 'includes/defaultFooter' );
?>
<script src="<?php echo JS_PATH?>invoice.js"></script>
<script>
// $("#baseErpHeader").hide();
// $("#baseErpFooter").hide();

$(function() {
    $( "#invoiceDate" ).datepicker();
      $( "#invoiceDate" ).datepicker( "option", "dateFormat", "dd/mm/yy" );
  });
</script>
