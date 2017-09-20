function numberToText(input, output) {
	var finalWord1 = test_value(input, output);
	var finalWord2 = "";
	var val = document.getElementById(input).value;
	var actual_val = document.getElementById(input).value;
	document.getElementById(input).value = val;
	if (val.indexOf('.') != -1) {
		val = val.substring(val.indexOf('.') + 1, val.length);
		if (val.length == 0 || val.length == '00' || val == '00') {
			finalWord2 = "zero paisa only";
		} else {
			document.getElementById(input).value = val;
			finalWord2 = test_value(input, output) + " paisa only";
		}
		document.getElementById(output).innerHTML = finalWord1 + " Rupees and "
				+ finalWord2;
	} else {
		// finalWord2 = " Zero paisa only";
		document.getElementById(output).innerHTML = finalWord1 + " Rupees Only";
	}
	document.getElementById(input).value = actual_val;
}

function test_value(input, output) {
	var junkVal = document.getElementById(input).value;
	junkVal = Math.floor(junkVal);
	var obStr = new String(junkVal);
	numReversed = obStr.split("");
	actnumber = numReversed.reverse();
	if (Number(junkVal) >= 0) {
		// do nothing
	} else {
		alert('wrong Number cannot be converted');
		return false;
	}
	if (Number(junkVal) == 0) {
		document.getElementById(output).innerHTML = obStr + ''
				+ 'Rupees Zero Only';
		return false;
	}
	if (actnumber.length > 9) {
		alert('Oops!!!! the Number is too big to covertes');
		return false;
	}
	var iWords = [ "Zero", " One", " Two", " Three", " Four", " Five", " Six",
			" Seven", " Eight", " Nine" ];
	var ePlace = [ "Ten", " Eleven", " Twelve", " Thirteen", " Fourteen",
			" Fifteen", " Sixteen", " Seventeen", " Eighteen", "Nineteen" ];
	var tensPlace = [ "dummy", " Ten", " Twenty", " Thirty", " Forty",
			" Fifty", " Sixty", " Seventy", " Eighty", " Ninety" ];
	var iWordsLength = numReversed.length;
	var totalWords = "";
	var inWords = new Array();
	var finalWord = "";
	j = 0;
	for (i = 0; i < iWordsLength; i++) {
		switch (i) {
		case 0:
			if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
				inWords[j] = '';
			} else {
				inWords[j] = iWords[actnumber[i]];
			}
			inWords[j] = inWords[j];
			break;
		case 1:
			tens_complication();
			break;
		case 2:
			if (actnumber[i] == 0) {
				inWords[j] = '';
			} else if (actnumber[i - 1] != 0 && actnumber[i - 2] != 0) {
				inWords[j] = iWords[actnumber[i]] + ' Hundred and';
			} else {
				inWords[j] = iWords[actnumber[i]] + ' Hundred';
			}
			break;
		case 3:
			if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
				inWords[j] = '';
			} else {
				inWords[j] = iWords[actnumber[i]];
			}
			if (actnumber[i + 1] != 0 || actnumber[i] > 0) {
				inWords[j] = inWords[j] + " Thousand";
			}
			break;
		case 4:
			tens_complication();
			break;
		case 5:
			if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
				inWords[j] = '';
			} else {
				inWords[j] = iWords[actnumber[i]];
			}
			inWords[j] = inWords[j] + " Lakh";
			break;
		case 6:
			tens_complication();
			break;
		case 7:
			if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
				inWords[j] = '';
			} else {
				inWords[j] = iWords[actnumber[i]];
			}
			inWords[j] = inWords[j] + " Crore";
			break;
		case 8:
			tens_complication();
			break;
		default:
			break;
		}
		j++;
	}

	function tens_complication() {
		if (actnumber[i] == 0) {
			inWords[j] = '';
		} else if (actnumber[i] == 1) {
			inWords[j] = ePlace[actnumber[i - 1]];
		} else {
			inWords[j] = tensPlace[actnumber[i]];
		}
	}
	inWords.reverse();
	for (i = 0; i < inWords.length; i++) {
		finalWord += inWords[i];
	}
	return finalWord;
}
