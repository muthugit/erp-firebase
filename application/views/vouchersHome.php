<?php
$this->load->view ( 'includes/defaultHeader' );
?>
<div id="pageId" style="display: none">voucher</div>
<div class="container-fluid"
	style="background-color: #f1f1f1; color: black">
	<div class=" col-sm-12">
		<h4>
			VOUCHERS
			<a onclick="showSideNav()" href="<?php echo PJT_PATH;?>vouchers/entry/payment" class="btn btn-success btn-sm">
				<i class="fa fa-plus-circle"></i> Add new payment voucher
			</a>
			<a onclick="showSideNav()" href="<?php echo PJT_PATH;?>vouchers/entry/receipt" class="btn btn-success btn-sm">
				<i class="fa fa-plus-circle"></i> Add new receipt voucher
			</a>
			<span class="pull-right" id="voucherCount"></span>
		</h4>
	</div>
</div>
<center>
	<div class="form-group">
		<input type="text" style="width: 50%" placeholder="Search customers"
			class="form-control">
	</div>
</center>
<div class="moreInfo" class="container-fluid" style="color: black">
	<p style="padding: 1%">
		 <span
			class="pull-right"">
			<button onclick="showView('tableView');" class="btn btn-primary">
				<i class="fa fa-table"></i>
			</button>
			<button onclick="showView('listView');" class="btn btn-primary">
				<i class="fa fa-list"></i>
			</button>
		</span>
	</p>
</div>
<div class="container">
	<div class="pgContainer" style="padding-top: 1%">
		<div id="listView">
			<div id="voucherList" class="col-sm-12"></div>
		</div>
		<div id="tableView" class="col-sm-12 table-responsive">
			<table class="table table-striped col-sm-12">
				<thead>
					<tr>
						<th>Voucher ID</th>
						<th>Customer</th>
						<th>voucher value</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody id="voucherTable">
				</tbody>
			</table>
		</div>
	</div>
</div>
<?php
$this->load->view ( 'includes/defaultFooter' );
?>
<script src="<?php echo JS_PATH?>voucher.js"></script>