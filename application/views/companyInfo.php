<?php
$this->load->view ( 'includes/defaultHeader' );
?>
<div id="pageId" style="display: none">companyInfo</div>
<div class="container-fluid"
	style="background-color: #f1f1f1; color: black">
	<div class=" col-sm-12">
		<h4>Company Info</h4>
	</div>
</div>
<div class="container">
	<form class="form-horizontal">
		<div class="form-group">
			<label for="entryId" class="col-lg-2 control-label">Company ID</label>
			<div class="col-lg-10">
				<input class="form-control" type="text" id="companyId"
					name="companyId" placeHolder="Loading...." disabled="disabled">
			</div>
		</div>
		<div class="form-group">
			<label for="entryId" class="col-lg-2 control-label">Company Name</label>
			<div class="col-lg-10">
				<input class="form-control" type="text" id="companyName"
					name="companyName" placeHolder="Enter Company Name">
			</div>
		</div>
		<div class="form-group">
			<label for="entryId" class="col-lg-2 control-label">E-Mail ID</label>
			<div class="col-lg-10">
				<input class="form-control" type="text" id="emailId" name="emailId"
					placeHolder="Enter email ID">
			</div>
		</div>
		<div class="form-group">
			<label for="entryId" class="col-lg-2 control-label">E-Mail ID</label>
			<div class="col-lg-10">
				<textarea rows="3" id="address" name="address" class="form-control"
					placeholder="Organisation Address" cols=""></textarea>
			</div>
		</div>

		<center>
			<input type="submit" value="Save" class="btn btn-primary">
		</center>
	</form>
</div>
<?php
$this->load->view ( 'includes/defaultFooter' );
?>
<script src="<?php echo JS_PATH?>settings.js"></script>
