<?php
defined ( 'BASEPATH' ) or exit ( 'No direct script access allowed' );
class Report extends CI_Controller {
	public function __construct() {
		parent::__construct ();
		$this->load->helper ( 'url' );
	}
	public function index() {
		$this->load->view ( "reportHome" );
	}
	public function stock($fromDate=null, $toDate=null) {
		$data ['fromDate'] = $fromDate;
		$data ['toDate'] = $toDate;
		if ($fromDate != null && $toDate != null)
			$this->load->view ( "report/stock",$data );
		else
			echo ("You're in wrong place");
	}
}
