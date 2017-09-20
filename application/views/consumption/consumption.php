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
<input type="text" class='hidden' id="editId" value="<?php echo $editId;?>">
<?php
}
?>
<link rel="stylesheet"
	href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

<div id="pageId" class="container" style="display: none">consumption</div>
<form>
	<div class="container">
		<div id="consumptionContainer" class="form-horizontal">
			<div class="col-lg-12">
				<center>
					<h3>
						CONSUMPTION <span id="consumptionId"></span> <input
							style="display: none" type="text" name="LINE_consumptionId"
							id="consumptionIdTxt"> <input style="display: none" type="text"
							name="consumptionType" id="consumptionType" value="regular">
					</h3>
					<input type="text" class="hidden" id="oldId">
				</center>
			</div>
			<div class="col-lg-12">
				<div class="form-group" style="display: none">
					<label for="poNo" class="col-lg-2 control-label"><h4>consumption #</h4></label>
					<div class="col-lg-2">
						<input id="id" name="id" type="text" class="form-control">
					</div>
				</div>


				<hr>
			</div>
			<div class="col-lg-6">
				<div class="form-group">
					<label for="poNo" class="col-lg-4 control-label">Narration</label>
					<div class="col-lg-8">
						<input type="text" name="consumptionNarration"
							class="form-control" id="consumptionNarration" placeholder="">
					</div>
				</div>
			</div>
			<div class="col-lg-6 ">

				<div class="form-group">
					<label for="poNo" class="col-lg-4 control-label">Date</label>
					<div class="col-lg-8">
						<input onkeyup="getDateNumber('consumptionDate','entryDate');" id="consumptionDate"
							name="consumptionDate" type="text" class="form-control"> <input
							type="text" id="entryDate" name="entryDate">
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
				<!-- 				<input type="submit" id="submit" value="Save consumption" -->
				<!-- 					class="btn btn-primary"> -->
			</div>
		</div>
		<div class="col-lg-12">
			<a onclick="addNewLine();" class="btn btn-primary">+ Add item</a>
		</div>
	</div>
	<div class="col-lg-12" style="height: 100px;"></div>
	<div class="moreInfo" class="container-fluid" style="color: black">
		<p style="padding: 1%">
			<b> Total number of Items: <span id="totalItems">0</span> | Total
				amount: <span id="totalAmount">0</span> <span class="pull-right""> <input
					type="submit" value="Save consumption" class="btn btn-primary">
			</span>
			</b>
		</p>
	</div>
</form>
<?php
$this->load->view ( 'includes/defaultFooter' );
?>
<script src="<?php echo JS_PATH?>consumption.js"></script>
<script>
// $("#baseErpHeader").hide();
// $("#baseErpFooter").hide();

$(function() {
    $( "#consumptionDate" ).datepicker();
      $( "#consumptionDate" ).datepicker( "option", "dateFormat", "dd/mm/yy" );
      
  });

</script>
