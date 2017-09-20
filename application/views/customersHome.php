<?php
$this->load->view ( 'includes/defaultHeader' );
?>
<div id="pageId" style="display: none">customers</div>
<div class="container-fluid"
	style="background-color: #f1f1f1; color: black">
	<div class=" col-sm-12">
		<h4>
			CUSTOMERS
			<button onclick="showSideNav();addNewItem()" class="btn btn-success btn-sm">
				<i class="fa fa-plus-circle"></i> Add new
			</button>
			<span class="pull-right" id="customersCount"></span>
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
			<div id="customersList" class="col-sm-12"></div>
		</div>
		<div id="tableView" class="col-sm-12 table-responsive">
			<table class="table table-striped col-sm-12">
				<thead>
					<tr>
						<th>Customer ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Contace number</th>
						<th>Mobile number</th>
						<th>Balance</th>
					</tr>
				</thead>
				<tbody id="customersTable">
				</tbody>
			</table>
		</div>
	</div>
</div>
<div id="sideNav" class="sideNav" style="">
	<span class="sideNavTitle">Add New customer</span> <span
		onclick="hideSideNav();" class="sideNavCloseBtn pull-right"><i
		class="fa fa-times"></i></span>
	<hr>
	<form id="insertTab" class="pgInsertTab form-group col-lg-12">
		<input id="oldId" type="hidden">
		<div class="form-group">
			<label for="poNo" class="col-lg-4 control-label">Customer ID</label>
			<div class="col-lg-8">
				<input required="required" name="id" id="id"
					class="form-control col-sm-2" type="text"
					placeholder="Enter customer id" />
			</div>
		</div>
		<br>
		<div class="form-group">
			<label for="poNo" class="col-lg-4 control-label">Customer Name</label>
			<div class="col-lg-8">
				<input required="required" id="customerName" name="customerName"
					class="form-control" type="text" placeholder="Enter customer name" />
			</div>
		</div>
		<br>
		<div class="form-group">
			<label for="poNo" class="col-lg-4 control-label">Email ID</label>
			<div class="col-lg-8">
				<input name="emailId" id="emailId" class="form-control col-sm-2" type="text"
					placeholder="Email id" />
			</div>
		</div>
		<br>
		<div class="form-group">
			<label for="poNo" class="col-lg-4 control-label">Phone Number</label>
			<div class="col-lg-8">
				<input name="phoneNumber" id="phoneNumber" class="form-control col-sm-2" type="text"
					placeholder="Contact number" />
			</div>
		</div>
		<br>
		<div class="form-group">
			<label for="poNo" class="col-lg-4 control-label">Mobile Number</label>
			<div class="col-lg-8">
				<input name="mobileNumber" id="mobileNumber" class="form-control col-sm-2" type="text"
					placeholder="Mobile number" />
			</div>
		</div>

		<br>
		<div class="form-group">
			<label for="poNo" class="col-lg-4 control-label">CST Number</label>
			<div class="col-lg-8">
				<input name="cstNumber" id="cstNumber" class="form-control col-sm-2" type="text"
					placeholder="CST Number" />
			</div>
		</div>
		<br>
		<div class="form-group">
			<label for="poNo" class="col-lg-4 control-label">CST Number dtd.</label>
			<div class="col-lg-8">
				<input name="cstNumberDated" id="cstNumberDated" class="form-control col-sm-2"
					type="text" placeholder="CST Number date" />
			</div>
		</div>
		<br>
		<div class="form-group">
			<label for="poNo" class="col-lg-4 control-label">RC Number</label>
			<div class="col-lg-8">
				<input name="rcNumber" id="rcNumber" class="form-control col-sm-2" type="text" />
			</div>
		</div>
		<br>
		<div class="form-group">
			<label for="poNo" class="col-lg-4 control-label">TIN Number</label>
			<div class="col-lg-8">
				<input name="tinNumber" id="tinNumber" class="form-control col-sm-2" type="text" />
			</div>
		</div>
		<br>
		<div class="form-group">
			<label for="poNo" class="col-lg-4 control-label">Ex. Lic. Number</label>
			<div class="col-lg-8">
				<input name="exLicNumber" id="exLicNumber" class="form-control col-sm-2" type="text" />
			</div>
		</div>
		<br>
		<div class="form-group">
			<label for="poNo" class="col-lg-4 control-label">Organisation Address</label>
			<div class="col-lg-8">
				<textarea rows="3" name="address" id="address" class="form-control"
					placeholder="Organisation Address" cols=""></textarea>
			</div>
		</div>

		<div class="col-lg-12" style="padding-top: 3%">
			<center>
				<input id="submitButton" type="submit" value="Add customer" class="btn btn-primary">
			</center>
		</div>
	</form>
</div>
<?php
$this->load->view ( 'includes/defaultFooter' );
?>
<script src="<?php echo JS_PATH?>customers.js"></script>