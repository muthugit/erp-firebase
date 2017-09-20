<?php
defined ( 'BASEPATH' ) or exit ( 'No direct script access allowed' );
class Sales extends CI_Controller {
	public function __construct() {
		parent::__construct ();
		$this->load->helper ( 'url' );
	}
	public function index() {
		$this->load->view ( "salesHome" );
	}
	public function invoice($invoiceType = null) {
		if ($invoiceType == null) {
			$this->load->view ( "/invoice/regularInvoice" );
		} elseif ($invoiceType == "cracker") {
			$this->load->view ( "/invoice/crackerInvoice" );
		}
	}
	public function edit($id, $invoiceType) {
		$data ['editId'] = $id;
		if ($invoiceType == null || $invoiceType=="regular") {
			$this->load->view ( "/invoice/regularInvoice", $data );
		} elseif ($invoiceType == "cracker") {
			$this->load->view ( "/invoice/crackerInvoice", $data );
		}
	}
	public function invoicePrint($invoiceId, $formatId = null) {
		$data ['invoiceId'] = $invoiceId;
		if ($formatId == "cracker") {
			$this->load->view ( "invoice/print/invoiceCrackerTemplate", $data );
		} else {
			$this->load->view ( "invoice/print/invoiceTemplate", $data );
		}
	}
}
