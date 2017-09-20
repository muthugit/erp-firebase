<?php
$this->load->view ( 'includes/defaultHeader' );
?>
<style>
.table>thead>tr>th,.table>tbody>tr>th,.table>tfoot>tr>th,.table>thead>tr>td,.table>tbody>tr>td,.table>tfoot>tr>td
	{
	border-top: 0px solid #dddddd;
}
}
</style>
<?php
if (isset ( $editId )) {
	?>
<input type="hidden" id="editId" value="<?php echo $editId;?>">
<?php
}
?>
<link rel="stylesheet"
	href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

<div id="pageId" class="container" style="display: none">invoice</div>
<form>
	<div class="container">
		<div id="invoiceContainer" class="form-horizontal">
			<div class="col-lg-12">

				<center>
					<h3>
						INVOICE <span id="invoiceId"></span> <input style="display: none"
							type="text" name="LINE_invoiceId" id="invoiceIdTxt"> <input
							style="display: none" type="text" name="invoiceType"
							id="invoiceType" value="regular">
					</h3>
					<input type="text" class="hidden" id="oldId">
				</center>
			</div>
			<div class="col-lg-12">
				<div class="form-group" style="display: none">
					<label for="poNo" class="col-lg-2 control-label"><h4>Invoice #</h4></label>
					<div class="col-lg-2">
						<input id="id" name="id" type="text" class="form-control">
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
							placeholder="Enter customer keyword"> <input name="customerName"
							onfocus="customerDropDown();" type="text" class="form-control"
							id="customerName" placeholder="Enter customer keyword"> <span
							id="customerDetails"></span>
					</div>
				</div>
			</div>
			<div class="col-lg-6 ">
				<div class="form-group">
					<label for="poNo" class="col-lg-4 control-label">PO Number</label>
					<div class="col-lg-8">
						<input type="text" name="poNo" class="form-control" id="poNo"
							placeholder="PO Number">
					</div>
				</div>
				<div class="form-group">
					<label for="poNo" class="col-lg-4 control-label">Date</label>
					<div class="col-lg-8">
						<input onkeyup="getDateNumber('invoiceDate','entryDate');"
							onchange="getDateNumber('invoiceDate','entryDate');"
							id="invoiceDate" name="invoiceDate" type="text"
							class="form-control"> <input type="text" id="entryDate"
							name="entryDate">
					</div>
				</div>
			</div>
			<div class="col-lg-12">
				<br>
			</div>
			<div class="col-lg-12 table-responsive">
				<table class="table table-striped col-sm-12">
					<tr>
						<th width="4%">Product ID</th>
						<th width="20%">Description</th>
						<th width="5%">Quantity</th>
						<th width="8%">Price</th>
						<th width="8%">Per</th>
						<th width="10%">Amount</th>
					</tr>
					<tbody id="tableRows">
					</tbody>
				</table>


				<hr>
				<!-- 				<input type="submit" id="submit" value="Save invoice" -->
				<!-- 					class="btn btn-primary"> -->
			</div>
		</div>
		<div class="col-lg-12">
			<a onclick="addNewLine();" class="btn btn-primary">+ Add item</a>
			<hr>
			<div class="col-lg-5"></div>
			<div class="col-lg-7 well" style="background-color: #ddd)">
				<legend>Billing Information</legend>
				<table style="font-size: 14px">
					<tr>
						<th width="40%"></th>
						<th width="20%"></th>
						<th width="20%"></th>
						<th class="text-right" width="30%"></th>
					</tr>
					<tr>
						<td><b>Sub total</b></td>
						<td><center>. . .</center></td>
						<td></td>
						<td class="text-right"><b><span id="lineTotalText"></span> <input
								name="lineTotal" type="hidden" class="form-control"
								id="lineTotal"> </b></td>
					</tr>
					<tr>
						<td>LESS: Discount</td>
						<td><select onchange="calcBill();" class="form-control"
							id="discountBy" name="discountBy" style="width: 100%" class=""><option
									value="percentage">%</option>
								<option value="amount">Rs.</option></select></td>
						<td><input onkeyup="calcBill();" name="discountValue"
							id="discountValue" type="text"
							class="text-center col-lg-1 form-control" /><input
							name="discountAmount" type="hidden" id="discountAmount"></td>
						<td class="text-right"><span id="discountAmountText" /></td>
					</tr>
					<tr>
						<td><b>Sub total (After discount)</b></td>
						<td></td>
						<td><center>. . .</center></td>
						<td class="text-right"><b><span id="subTotalText"></span></b></td>
					</tr>
					<tr>
						<td>Shipping & Packaging</td>
						<td><select onchange="calcBill();" class="form-control"
							name="shippingCalcBy" id="shippingCalcBy" style="width: 100%"
							class=""><option value="percentage">%</option>
								<option value="amount">Rs.</option></select></td>
						<td><input onkeyup="calcBill();" name="shippingValue"
							id="shippingValue" type="text" class="text-center form-control" />
							<input name="shippingAmount" type="hidden" id="shippingAmount"></td>
						<td class="text-right"><span id="shippingAmountText" /></td>
					</tr>
					<tr>
						<td>Sales Tax</td>
						<td><select onchange="calcBill();" id="taxValue" name="taxValue"
							class="form-control" style="width: 100%" class=""><option
									value="0">No Tax</option>
								<option value="12.5">VAT 12.5%</option>
								<option value="10.5">10.5%</option></select></td>
						<td><input name="taxAmount" id="taxAmount" type="text"
							class="col-lg-1 text-center hidden form-control" /></td>
						<td class="text-right"><span id="taxAmountText" /></td>
					</tr>
					<tr>
						<td><b>Total</b></td>
						<td>.....</td>
						<td>.....</td>
						<td class="text-right"><input id="netAmount" name="netAmount"
							type="hidden" class="col-lg-1 text-right form-control" /><b><span
								id="netAmountText" /></b></td>
					</tr>
				</table>
			</div>
		</div>
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
</form>
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
