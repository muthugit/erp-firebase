<?php
defined ( 'BASEPATH' ) or exit ( 'No direct script access allowed' );
class Purchase extends CI_Controller {
	public function __construct() {
		parent::__construct ();
		$this->load->helper ( 'url' );
	}
	public function index() {
		$this->load->view ( "purchaseHome" );
	}
	public function purchase(){
		$this->load->view("purchase/purchase");
	}
	
	public function edit($id){
		$data['editId']=$id;
		$this->load->view("purchase/purchase",$data);
	}
}
