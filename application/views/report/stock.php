<?php
$this->load->view ( 'includes/defaultHeader' );
?>

<div id="pageId" style="display: none">stock</div>
<input type="hidden" id="fromEntryDate" name="fromEntryDate" value="<?php echo $fromDate;?>">
<input type="hidden" id="toEntryDate" name="toEntryDate" value="<?php echo $toDate;?>">
<div class="container-fluid"
	style="background-color: #f1f1f1; color: black">
	<div class=" col-sm-12">
		<h4>Stock Report</h4>
	</div>
</div>
<div class="container">
	<div class="container">
		<div class="pgContainer" style="padding-top: 1%">
			<div id="listView">
				<div id="stockList" class="col-sm-12"></div>
			</div>
			<div id="" class="col-sm-12 table-responsive">
				<table class="table table-striped col-sm-12">
					<thead>
						<tr>
							<th>Item ID</th>
							<th>Item Name</th>
							<th>Type</th>
							<th>UOM</th>
							<th>Opening</th>
							<th>Purchase (+)</th>
							<th>Production (+)</th>
							<th>Sales (-)</th>
							<th>Consumption (-)</th>
							<th>Closing</th>
						</tr>
					</thead>
					<tbody id="stockTable">
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<?php
$this->load->view ( 'includes/defaultFooter' );
?>
<script src="<?php echo JS_PATH?>stock.js"></script>
<script>

</script>