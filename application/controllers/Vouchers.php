<?php
defined ( 'BASEPATH' ) or exit ( 'No direct script access allowed' );
class Vouchers extends CI_Controller {
	public function __construct() {
		parent::__construct ();
		$this->load->helper ( 'url' );
	}
	public function index() {
		$this->load->view ( "vouchersHome" );
	}
	public function entry($type, $recordType = null, $recordId=null, $accName=null, $accId=null,$amount=null) {
		$data ['type'] = $type;
		$data ['recordType'] = $recordType;
		$data ['recordId'] = $recordId;
		$data ['accName'] = $accName;
		$data ['accId'] = $accId;
		$data ['amount'] = $amount;
		$this->load->view ( "voucher/voucherEntry", $data );
	}
	public function voucherAgainst($type, $invoiceId, $partyId, $partyType) {
		$data ['type'] = $type;
		$data ['invoiceId'] = $invoiceId;
		$data ['partyId'] = $partyId;
		$data ['partyType'] = $partyType;
		$this->load->view ( "voucher/voucherEntry", $data );
	}
}
