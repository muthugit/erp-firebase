<?php
$this->load->view ( 'includes/defaultHeader' );
$this->load->view ( 'includes/calendarIncludes' );
?>
<div id="pageId" style="display: none">dashBoard</div>
<div class="container">
	<div id="erpNavigations">
		<div class="col-sm-6">
			<h3>MASTER RECORDS</h3>
			<span class="list-group col-xs-12 col-sm-4"><a href="items"
				class="list-group-item" style="height: 100px;"> Creat stock items
					<h5 class="list-group-item-heading">Items</h5>
			</a></span> <span class="list-group col-xs-12 col-sm-4"><a
				href="suppliers" class="list-group-item" style="height: 100px">
					Manage Suppliers
					<h5 class="list-group-item-heading">Suppliers</h5>
			</a></span> <span class="list-group col-xs-12 col-sm-4"><a
				href="customers" class="list-group-item" style="height: 100px">
					Manage Customers
					<h5 class="list-group-item-heading">Customers</h5>
			</a></span>
			<!-- <span class="list-group col-xs-12 col-sm-4"><a
				href="customers" class="list-group-item" style="height: 100px">
					Manage Customers
					<h5 class="list-group-item-heading">Tax</h5>
			</a></span> -->
		</div>
		<div class="col-sm-6">
			<h3>TRANSACTION ENTRIES</h3>
			<span class="list-group col-xs-12 col-sm-6"><a href="consumption"
				class="list-group-item" style="height: 100px">Raw material
					Consumption
					<h5 class="list-group-item-heading">Consumption</h5>
			</a></span> <span class="list-group col-xs-12 col-sm-6"><a
				href="production" class="list-group-item" style="height: 100px">Manufacturing
					stock
					<h5 class="list-group-item-heading">Production</h5>
			</a></span> <span class="list-group col-xs-12 col-sm-6"><a
				href="purchase" class="list-group-item" style="height: 100px">Buying
					from suppliers
					<h5 class="list-group-item-heading">Purchase</h5>
			</a></span><span class="list-group col-xs-12 col-sm-6"><a
				href="sales" class="list-group-item" style="height: 100px">Sales
					process
					<h5 class="list-group-item-heading">Sales</h5>
			</a></span>
		</div>
		<div class="col-sm-12">
			<h3>Reports</h3>
			<div class="col-sm-12 well">
				<center>
					<div class="form-group col-sm-4">
						<input type="text"
							onkeyup="getDateNumber('fromDate','fromEntryDate');changeLinks();"
							onchange="getDateNumber('fromDate','fromEntryDate');changeLinks();"
							id="fromDate" placeholder="Date from" class="form-control">
					</div>
					<div class="form-group col-sm-4">
						<input type="text"
							onkeyup="getDateNumber('toDate','toEntryDate');changeLinks();"
							onchange="getDateNumber('toDate','toEntryDate');changeLinks();"
							placeholder="Date to" id="toDate" class="form-control">
					</div>
				</center>
			</div>
			<span class="list-group col-xs-12 col-sm-4"><a onclick="checkDate();"
				id="inventoryLink" target="_blank" class="list-group-item"
				style="height: 100px">Inventory report
					<h5 class="list-group-item-heading">Stock</h5>
			</a></span>
		</div>
	</div>
	<input type="hidden" id="fromEntryDate"> <input type="hidden"
		id="toEntryDate">
</div>
<?php
$this->load->view ( 'includes/defaultFooter' );
?>
<script>
function checkDate(){
	if(!$("#fromEntryDate").val()>0 && !$("#toEntryDate").val()>0){
		alert("Please select the date range");
		$("#fromEntryDate").focus();
	}
}
function changeLinks(){
	var fromDate=$("#fromEntryDate").val();
	var toDate=$("#toEntryDate").val();
	$("#inventoryLink").attr("href", 'report/stock/'+fromDate+'/'+toDate);
}
$(".progress").hide();
</script>