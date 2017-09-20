<html>
<head>
<link rel="stylesheet" href="<?php echo CSS_PATH?>bootstrap.min.css">
<link rel="stylesheet" href="<?php echo CSS_PATH?>font-awesome.min.css">
<link rel="stylesheet" href="<?php echo CSS_PATH?>custom.css">

</head>

<style>
</style>
<body id="body">

	<div id="topNavigation" class="topNav">
		<a href="<?php echo base_url();?>items" class="btn btn-primary"> <i
			class="fa fa-anchor  fa-5x"></i>
			<hr> Items
		</a> <a href="<?php echo base_url();?>suppliers"
			class="btn btn-primary"> <i class="fa fa-anchor  fa-5x"></i>
			<hr> Suppliers
		</a> <a href="<?php echo base_url();?>customers"
			class="btn btn-primary"> <i class="fa fa-anchor  fa-5x"></i>
			<hr> Customers
		</a>
		<button class="btn btn-primary pull-right" onclick="logOut();">Logout</button>
	</div>
	<div class="mask"></div>
	<!-- 	<nav class=" navbar navbar-default"> -->

	<div id="baseErpHeader" class="container-fluid"
		style="background-color: #4285f4; color: white">
		<div class="">
			<a style="color: white" class="navbar-brand"
				href="<?php echo PJT_PATH;?>dashboard">BASE-ERP</a> <span
				class="pull-right showTopNav" style="padding-top: 20px;"><a
				style="color: white" onclick="showTopNav();" href="#"><i
					class="fa fa-chevron-circle-down fa-2x"></i> </a></span> <span
				style="display: none; padding-top: 20px;"
				class="pull-right hideTopNav"><a style="color: white"
				onclick="hideTopNav();" href="#"><i class="fa fa-chevron-circle-up fa-2x"></i>
			</a></span>

			</h4>
		</div>
	</div>
	<div class="progress">
		<div class="indeterminate"></div>
	</div>