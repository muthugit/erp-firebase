<?php
$this->load->view ( 'includes/defaultHeader' );
?>
<div id="pageId" style="display: none">suppliers</div>
<div class="container-fluid"
	style="background-color: #f1f1f1; color: black">
	<div class=" col-sm-12">
		<h4>
			SUPPLIERS
			<button onclick="showSideNav();addNewItem()" class="btn btn-success btn-sm">
				<i class="fa fa-plus-circle"></i> Add new
			</button>
			<span class="pull-right" id="suppliersCount"></span>
		</h4>
	</div>
</div>
<center>
	<div class="form-group">
		<input type="text" style="width: 50%" placeholder="Search suppliers"
			class="form-control">
	</div>
</center>
<div class="moreInfo" class="container-fluid" style="color: black">
	<p style="padding: 1%">
		Total number of Items: 2 | Total stock value: 50 <span
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
			<div id="suppliersList" class="col-sm-12"></div>
		</div>
		<div id="tableView" class="col-sm-12 table-responsive">
			<table class="table table-striped col-sm-12">
				<thead>
					<tr>
						<th>Supplier ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Contace number</th>
						<th>Mobile number</th>
						<th>Balance</th>
					</tr>
				</thead>
				<tbody id="suppliersTable">
				</tbody>
			</table>
		</div>
	</div>
</div>
<div id="sideNav" class="sideNav" style="">
	<span class="sideNavTitle">Add New Supplier</span> <span
		onclick="hideSideNav();" class="sideNavCloseBtn pull-right"><i
		class="fa fa-times"></i></span>
	<hr>
	<form id="insertTab" class="pgInsertTab form-group col-sm-12">
		<input id="oldId" type="hidden"> <input required="required" name="id"
			id="id" class="form-control col-sm-2" type="text"
			placeholder="Enter supplier id" /> <input required="required"
			id="supplierName" name="supplierName" class="form-control"
			type="text" placeholder="Enter supplier name" /> <input
			name="emailId" id="emailId" class="form-control col-sm-2" type="text"
			placeholder="Email id" /> <input name="phoneNumber" id="phoneNumber"
			class="form-control col-sm-2" type="text"
			placeholder="Contact number" /> <input name="mobileNumber"
			id="mobileNumber" class="form-control col-sm-2" type="text"
			placeholder="Mobile number" />
		<textarea name="address" id="address" rows="3" class="form-control"
			placeholder="Organisation Address" cols=""></textarea>
		<br>
		<center>
			<input id="submitButton" type="submit" value="Add supplier" class="btn btn-primary">
		</center>
		</span>
	</form>
</div>
<?php
$this->load->view ( 'includes/defaultFooter' );
?>
<script src="<?php echo JS_PATH?>suppliers.js"></script>