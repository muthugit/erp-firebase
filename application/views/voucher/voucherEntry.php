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
<input type="text" class='hidden' id="editId"
	value="<?php echo $editId;?>">
<?php
}
?>
<link rel="stylesheet"
	href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

<div id="pageId" class="container" style="display: none">voucher</div>
<form>
	<div class="container">
		<div id="productionContainer" class="form-horizontal">
			<div class="col-lg-12">
				<center>
					<h3>
						Voucher [<?php echo $type;?>] <span id="productionId"></span> <input
							style="display: none" type="text" name="LINE_productionId"
							id="productionIdTxt"> <input style="display: none" type="text"
							name="productionType" id="productionType" value="regular">
					</h3>
					<input type="text" class="hidden" id="oldId">
				</center>
			</div>
			<div class="col-lg-12">
				<div class="form-group" style="display: none">
					<label for="poNo" class="col-lg-2 control-label"><h4>production #</h4></label>
					<div class="col-lg-2">
						<input id="id" name="id" type="text" class="form-control">
					</div>
				</div>
				<hr>
			</div>
			<div class="col-lg-6">
				<div class="form-group">
					<label for="poNo" class="col-lg-4 control-label">Account name</label>
					<div class="col-lg-8">
						<input type="text" name="accountName" class="form-control"
							id="accountName" value="<?php echo urldecode($accName);?>" placeholder="">
					</div>
				</div>
				<div class="form-group hidden ">
					<label for="poNo" class="col-lg-4 control-label">Account id</label>
					<div class="col-lg-8">
						<input type="text" name="accountName" class="form-control"
							id="accountName" value="<?php echo urldecode($accId);?>" placeholder="">
					</div>
				</div>
				<div class="form-group">
					<label for="poNo" class="col-lg-4 control-label">Amount</label>
					<div class="col-lg-8">
						<input type="text" name="netAmount" class="form-control"
							id="netAmount" value="<?php echo $amount;?>" placeholder="">
					</div>
				</div>
				<div class="form-group">
					<label for="poNo" class="col-lg-4 control-label">Against</label>
					<div class="col-lg-8">
						<input type="text" name="against" class="form-control"
							id="against" value="<?php echo $recordType;?>" placeholder="">
					</div>
				</div>
				<div class="form-group">
					<label for="poNo" class="col-lg-4 control-label">Against Reference</label>
					<div class="col-lg-8">
						<input type="text" name="againstRef" class="form-control"
							id="againstRef" value="<?php echo $recordId;?>" placeholder="">
					</div>
				</div>
				<div class="form-group">
					<label for="poNo" class="col-lg-4 control-label">Narration</label>
					<div class="col-lg-8">
						<input type="text" name="voucherNarration" class="form-control"
							id="voucherNarration" placeholder="">
					</div>
				</div>
			</div>
			<div class="col-lg-6 ">

				<div class="form-group">
					<label for="poNo" class="col-lg-4 control-label">Date</label>
					<div class="col-lg-8">
						<input onkeyup="getDateNumber('productionDate','entryDate');"
							id="productionDate" name="productionDate" type="text"
							class="form-control"> <input type="text" id="entryDate"
							name="entryDate">
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-lg-12" style="height: 100px;"></div>
	<div class="moreInfo" class="container-fluid" style="color: black">
		<p style="padding: 1%">
			<span class="pull-right""> <input
					type="submit" value="Save production" class="btn btn-primary">
			</span>
			</b>
		</p>
	</div>
</form>
<?php
$this->load->view ( 'includes/defaultFooter' );
?>
<script src="<?php echo JS_PATH?>production.js"></script>
<script>
// $("#baseErpHeader").hide();
// $("#baseErpFooter").hide();

$(function() {
    $( "#productionDate" ).datepicker();
      $( "#productionDate" ).datepicker( "option", "dateFormat", "dd/mm/yy" );
      
  });

</script>
