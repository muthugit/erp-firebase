<?php
defined ( 'BASEPATH' ) or exit ( 'No direct script access allowed' );
class Production extends CI_Controller {
	public function __construct() {
		parent::__construct ();
		$this->load->helper ( 'url' );
	}
	public function index() {
		$this->load->view ( "productionHome" );
	}
	public function entry(){
		$this->load->view("production/production");
	}
	public function edit($id) {
		$data ['editId'] = $id;
		$this->load->view ( "production/production", $data );
	}
}
