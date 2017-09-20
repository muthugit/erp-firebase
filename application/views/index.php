<?php
$this->load->view ( 'includes/defaultHeader' );
?>
<div id="pageId" style="display: none">index</div>
<div class="breadcrumb">
	<a href="<?php echo base_url();?>">Home</a>
</div>
<div class="container">
	<center>
		<a target="blank"<button onclick="loginWithGoogle()"
				class="btn btn-primary btn-lg">Login with google</button></a>
	</center>
</div>
<?php
$this->load->view ( 'includes/defaultFooter' );
?>
