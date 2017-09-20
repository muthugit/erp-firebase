<?php
$this->load->view ( 'includes/defaultHeader' );
?>
<div id="pageId" style="display: none">items</div>
<div class="container-fluid"
	style="background-color: #f1f1f1; color: black">
	<div class=" col-sm-12">
		<h4>
			ITEMS
			<button onclick="showSideNav();addNewItem()" class="btn btn-success btn-sm">
				<i class="fa fa-plus-circle"></i> Add new
			</button>
			<span class="pull-right" id="itemsCount"></span>
		</h4>
	</div>
</div>
<center>
	<div class="form-group">
		<input type="text" style="width: 50%" placeholder="Search items"
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
			<div id="itemsList" class="col-sm-12"></div>
		</div>
		<div id="tableView" class="col-sm-12 table-responsive">
			<table class="table table-striped col-sm-12">
				<thead>
					<tr>
						<th>Item ID</th>
						<th>Item Name</th>
						<th>Type</th>
						<th>UOM</th>
						<th>Cost per unit</th>
						<th>In stock</th>
						<th>Stock value</th>
					</tr>
				</thead>
				<tbody id="itemsTable">
				</tbody>
			</table>
		</div>
	</div>
</div>
<div id="sideNav" class="sideNav" style="">
	<span class="sideNavTitle">Add New Product</span> <span
		onclick="hideSideNav();" class="sideNavCloseBtn pull-right"><i
		class="fa fa-times"></i></span>
	<hr>
	<form id="insertTab" class="pgInsertTab form-group col-sm-12">
		<input id="oldId" type="hidden"> <input required="required" name="id"
			id="id" class="form-control col-sm-2" type="text"
			placeholder="Enter product id" /> <input required="required"
			name="sku" id="sku" class="form-control col-sm-2" type="text"
			placeholder="Enter product sku" /> <input required="required"
			id="itemName" name="itemName" class="form-control" type="text"
			placeholder="Enter product name" /> <input name="itemCost"
			id="itemCost" class="form-control col-sm-2" type="text"
			placeholder="Cost per unit" /> <select name="itemType" id="itemType"
			class="form-control">
			<option value="">Select Product type</option>
			<option value="Product">Product</option>
			<option value="Material">Material</option>
		</select> <select required="required" name="itemUom" id="itemUom"
			class="form-control">
			<option value="">Select Unit of Measurement</option>
			<option value="piece">Piece</option>
			<option value="kg">KG</option>
		</select> <input id="itemStock" name="itemStock" class="form-control"
			type="number" step="any" placeholder="Enter stock available" /> <span
			class="col-sm-12"> <br>
			<center>
				<input id="submitButton" type="submit" value="Create item" class="btn btn-primary">
			</center>
		</span>
	</form>
</div>
<?php
$this->load->view ( 'includes/defaultFooter' );
?>
<script src="<?php echo JS_PATH?>items.js"></script>