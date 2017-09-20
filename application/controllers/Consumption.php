<?php
defined ( 'BASEPATH' ) or exit ( 'No direct script access allowed' );
class Consumption extends CI_Controller {
	public function __construct() {
		parent::__construct ();
		$this->load->helper ( 'url' );
	}
	public function index() {
		$this->load->view ( "consumptionHome" );
	}
	public function edit($id) {
		$data ['editId'] = $id;
		$this->load->view ( "consumption/consumption", $data );
	}
	public function entry() {
		$this->load->view ( "consumption/consumption" );
	}
}
