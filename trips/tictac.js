function mang() {
	
	var kast1, kast2, kast3, kast4, kast5, kast6, kast7, kast8, kast9;
	kast1 = document.getElementById("kast1").value;
	kast2 = document.getElementById("kast2").value;
	kast3 = document.getElementById("kast3").value;
	kast4 = document.getElementById("kast4").value;
	kast5 = document.getElementById("kast5").value;
	kast6 = document.getElementById("kast6").value;
	kast7 = document.getElementById("kast7").value;
	kast8 = document.getElementById("kast8").value;
	kast9 = document.getElementById("kast9").value;

	if ((kast1 == 'x' || kast1 == 'X') && (kast2 == 'x' ||
		kast2 == 'X') && (kast3 == 'x' || kast3 == 'X')) {
		document.getElementById('print')
			.innerHTML = "Mängija X võitis";
		document.getElementById("kast4").disabled = true;
		document.getElementById("kast5").disabled = true;
		document.getElementById("kast6").disabled = true;
		document.getElementById("kast7").disabled = true;
		document.getElementById("kast8").disabled = true;
		document.getElementById("kast9").disabled = true;
		Swal.fire('Mängija X võitis', 'Naudi oma võitu kuningas');
	}
	else if ((kast1 == 'x' || kast1 == 'X') && (kast4 == 'x' ||
		kast4 == 'X') && (kast7 == 'x' || kast7 == 'X')) {
		document.getElementById('print')
			.innerHTML = "Mängija X võitis";
		document.getElementById("kast2").disabled = true;
		document.getElementById("kast3").disabled = true;
		document.getElementById("kast5").disabled = true;
		document.getElementById("kast6").disabled = true;
		document.getElementById("kast8").disabled = true;
		document.getElementById("kast9").disabled = true;
		Swal.fire('Mängija X võitis', 'Naudi oma võitu kuningas');
	}
	else if ((kast7 == 'x' || kast7 == 'X') && (kast8 == 'x' ||
		kast8 == 'X') && (kast9 == 'x' || kast9 == 'X')) {
		document.getElementById('print')
			.innerHTML = "Mängija X võitis";
		document.getElementById("kast1").disabled = true;
		document.getElementById("kast2").disabled = true;
		document.getElementById("kast3").disabled = true;
		document.getElementById("kast4").disabled = true;
		document.getElementById("kast5").disabled = true;
		document.getElementById("kast6").disabled = true;
		Swal.fire('Mängija X võitis', 'Naudi oma võitu kuningas');
		
	}
	else if ((kast3 == 'x' || kast3 == 'X') && (kast6 == 'x' ||
		kast6 == 'X') && (kast9 == 'x' || kast9 == 'X')) {
		document.getElementById('print')
			.innerHTML = "Mängija X võitis";
		document.getElementById("kast1").disabled = true;
		document.getElementById("kast2").disabled = true;
		document.getElementById("kast4").disabled = true;
		document.getElementById("kast5").disabled = true;
		document.getElementById("kast7").disabled = true;
		document.getElementById("kast8").disabled = true;
		Swal.fire('Mängija X võitis', 'Naudi oma võitu kuningas')
	}
	else if ((kast1 == 'x' || kast1 == 'X') && (kast5 == 'x' ||
		kast5 == 'X') && (kast9 == 'x' || kast9 == 'X')) {
		document.getElementById('print')
			.innerHTML = "Mängija X võitis";
		document.getElementById("kast2").disabled = true;
		document.getElementById("kast3").disabled = true;
		document.getElementById("kast4").disabled = true;
		document.getElementById("kast6").disabled = true;
		document.getElementById("kast7").disabled = true;
		document.getElementById("kast8").disabled = true;
		Swal.fire('Mängija X võitis', 'Naudi oma võitu kuningas');
	}
	else if ((kast3 == 'x' || kast3 == 'X') && (kast5 == 'x' ||
		kast5 == 'X') && (kast7 == 'x' || kast7 == 'X')) {
		document.getElementById('print')
			.innerHTML = "Mängija X võitis";
		document.getElementById("kast1").disabled = true;
		document.getElementById("kast2").disabled = true;
		document.getElementById("kast4").disabled = true;
		document.getElementById("kast6").disabled = true;
		document.getElementById("kast8").disabled = true;
		document.getElementById("kast9").disabled = true;
		Swal.fire('Mängija X võitis', 'Naudi oma võitu kuningas');
	}
	else if ((kast2 == 'x' || kast2 == 'X') && (kast5 == 'x' ||
		kast5 == 'X') && (kast8 == 'x' || kast8 == 'X')) {
		document.getElementById('print')
			.innerHTML = "Mängija X võitis";
		document.getElementById("kast1").disabled = true;
		document.getElementById("kast3").disabled = true;
		document.getElementById("kast4").disabled = true;
		document.getElementById("kast6").disabled = true;
		document.getElementById("kast7").disabled = true;
		document.getElementById("kast9").disabled = true;
		Swal.fire('Mängija X võitis', 'Naudi oma võitu kuningas');
	}
	else if ((kast4 == 'x' || kast4 == 'X') && (kast5 == 'x' ||
		kast5 == 'X') && (kast6 == 'x' || kast6 == 'X')) {
		document.getElementById('print')
			.innerHTML = "Mängija X võitis";
		document.getElementById("kast1").disabled = true;
		document.getElementById("kast2").disabled = true;
		document.getElementById("kast3").disabled = true;
		document.getElementById("kast7").disabled = true;
		document.getElementById("kast8").disabled = true;
		document.getElementById("kast9").disabled = true;
		Swal.fire('Mängija X võitis', 'Naudi oma võitu kuningas');
	}

	else if ((kast1 == 'O' || kast1 == 'O') && (kast2 == 'O' ||
		kast2 == 'O') && (kast3 == 'O' || kast3 == 'O')) {
		document.getElementById('print')
			.innerHTML = "Mängija O võitis";
		document.getElementById("kast4").disabled = true;
		document.getElementById("kast5").disabled = true;
		document.getElementById("kast6").disabled = true;
		document.getElementById("kast7").disabled = true;
		document.getElementById("kast8").disabled = true;
		document.getElementById("kast9").disabled = true;
		Swal.fire('Mängija O võitis', 'Naudi oma võitu kuningas');
	}
	else if ((kast1 == 'O' || kast1 == 'O') && (kast4 == 'O' ||
		kast4 == 'O') && (kast7 == 'O' || kast7 == 'O')) {
		document.getElementById('print')
			.innerHTML = "Mängija O võitis";
		document.getElementById("kast2").disabled = true;
		document.getElementById("kast3").disabled = true;
		document.getElementById("kast5").disabled = true;
		document.getElementById("kast6").disabled = true;
		document.getElementById("kast8").disabled = true;
		document.getElementById("kast9").disabled = true;
		Swal.fire('Mängija O võitis', 'Naudi oma võitu kuningas');
	}
	else if ((kast7 == 'O' || kast7 == 'O') && (kast8 == 'O' ||
		kast8 == 'O') && (kast9 == 'O' || kast9 == 'O')) {
		document.getElementById('print')
			.innerHTML = "Mängija O võitis";
		document.getElementById("kast1").disabled = true;
		document.getElementById("kast2").disabled = true;
		document.getElementById("kast3").disabled = true;
		document.getElementById("kast4").disabled = true;
		document.getElementById("kast5").disabled = true;
		document.getElementById("kast6").disabled = true;
		Swal.fire('Mängija O võitis', 'Naudi oma võitu kuningas');
	}
	else if ((kast3 == 'O' || kast3 == 'O') && (kast6 == 'O' ||
		kast6 == 'O') && (kast9 == 'O' || kast9 == 'O')) {
		document.getElementById('print')
			.innerHTML = "Mängija O võitis";
		document.getElementById("kast1").disabled = true;
		document.getElementById("kast2").disabled = true;
		document.getElementById("kast4").disabled = true;
		document.getElementById("kast5").disabled = true;
		document.getElementById("kast7").disabled = true;
		document.getElementById("kast8").disabled = true;
		Swal.fire('Mängija O võitis', 'Naudi oma võitu kuningas');
	}
	else if ((kast1 == 'O' || kast1 == 'O') && (kast5 == 'O' ||
		kast5 == 'O') && (kast9 == 'O' || kast9 == 'O')) {
		document.getElementById('print')
			.innerHTML = "Mängija O võitis";
		document.getElementById("kast2").disabled = true;
		document.getElementById("kast3").disabled = true;
		document.getElementById("kast4").disabled = true;
		document.getElementById("kast6").disabled = true;
		document.getElementById("kast7").disabled = true;
		document.getElementById("kast8").disabled = true;
		Swal.fire('Mängija O võitis', 'Naudi oma võitu kuningas');
	}
	else if ((kast3 == 'O' || kast3 == 'O') && (kast5 == 'O' ||
		kast5 == 'O') && (kast7 == 'O' || kast7 == 'O')) {
		document.getElementById('print')
			.innerHTML = "Mängija O võitis";
		document.getElementById("kast1").disabled = true;
		document.getElementById("kast2").disabled = true;
		document.getElementById("kast4").disabled = true;
		document.getElementById("kast6").disabled = true;
		document.getElementById("kast8").disabled = true;
		document.getElementById("kast9").disabled = true;
		Swal.fire('Mängija O võitis', 'Naudi oma võitu kuningas');
	}
	else if ((kast2 == 'O' || kast2 == 'O') && (kast5 == 'O' ||
		kast5 == 'O') && (kast8 == 'O' || kast8 == 'O')) {
		document.getElementById('print')
			.innerHTML = "Mängija O võitis";
		document.getElementById("kast1").disabled = true;
		document.getElementById("kast3").disabled = true;
		document.getElementById("kast4").disabled = true;
		document.getElementById("kast6").disabled = true;
		document.getElementById("kast7").disabled = true;
		document.getElementById("kast9").disabled = true;
		Swal.fire('Mängija O võitis', 'Naudi oma võitu kuningas');
	}
	else if ((kast4 == 'O' || kast4 == 'O') && (kast5 == 'O' ||
		kast5 == 'O') && (kast6 == 'O' || kast6 == 'O')) {
		document.getElementById('print')
			.innerHTML = "Mängija O võitis";
		document.getElementById("kast1").disabled = true;
		document.getElementById("kast2").disabled = true;
		document.getElementById("kast3").disabled = true;
		document.getElementById("kast7").disabled = true;
		document.getElementById("kast8").disabled = true;
		document.getElementById("kast9").disabled = true;
		Swal.fire('Mängija O võitis', 'Naudi oma võitu kuningas');
	}

	else if ((kast1 == 'X' || kast1 == 'O') && (kast2 == 'X'
		|| kast2 == 'O') && (kast3 == 'X' || kast3 == 'O') &&
		(kast4 == 'X' || kast4 == 'O') && (kast5 == 'X' ||
		kast5 == 'O') && (kast6 == 'X' || kast6 == 'O') &&
		(kast7 == 'X' || kast7 == 'O') && (kast8 == 'X' ||
		kast8 == 'O') && (kast9 == 'X' || kast9 == 'O')) {
			document.getElementById('print')
				.innerHTML = "Viik";
			Swal.fire('Viik', 'Nautige oma viiki, kuningad');
	}
	else {

		if (tootab == 1) {
			document.getElementById('print')
				.innerHTML = "Mängija X kord";
		}
		else {
			document.getElementById('print')
				.innerHTML = "Mängija O kord";
		}
	}
}

function algusesse() {
	location.reload();
	document.getElementById('kast1').value = '';
	document.getElementById("kast2").value = '';
	document.getElementById("kast3").value = '';
	document.getElementById("kast4").value = '';
	document.getElementById("kast5").value = '';
	document.getElementById("kast6").value = '';
	document.getElementById("kast7").value = '';
	document.getElementById("kast8").value = '';
	document.getElementById("kast9").value = '';

}

tootab = 1;
function valik1() {
	if (tootab == 1) {
		document.getElementById("kast1").value = "X";
		document.getElementById("kast1").disabled = true;
		tootab = 0;
	}
	else {
		document.getElementById("kast1").value = "O";
		document.getElementById("kast1").disabled = true;
		tootab = 1;
	}
}

function valik2() {
	if (tootab == 1) {
		document.getElementById("kast2").value = "X";
		document.getElementById("kast2").disabled = true;
		tootab = 0;
	}
	else {
		document.getElementById("kast2").value = "O";
		document.getElementById("kast2").disabled = true;
		tootab = 1;
	}
}

function valik3() {
	if (tootab == 1) {
		document.getElementById("kast3").value = "X";
		document.getElementById("kast3").disabled = true;
		tootab = 0;
	}
	else {
		document.getElementById("kast3").value = "O";
		document.getElementById("kast3").disabled = true;
		tootab = 1;
	}
}

function valik4() {
	if (tootab == 1) {
		document.getElementById("kast4").value = "X";
		document.getElementById("kast4").disabled = true;
		tootab = 0;
	}
	else {
		document.getElementById("kast4").value = "O";
		document.getElementById("kast4").disabled = true;
		tootab = 1;
	}
}

function valik5() {
	if (tootab == 1) {
		document.getElementById("kast5").value = "X";
		document.getElementById("kast5").disabled = true;
		tootab = 0;
	}
	else {
		document.getElementById("kast5").value = "O";
		document.getElementById("kast5").disabled = true;
		tootab = 1;
	}
}

function valik6() {
	if (tootab == 1) {
		document.getElementById("kast6").value = "X";
		document.getElementById("kast6").disabled = true;
		tootab = 0;
	}
	else {
		document.getElementById("kast6").value = "O";
		document.getElementById("kast6").disabled = true;
		tootab = 1;
	}
}

function valik7() {
	if (tootab == 1) {
		document.getElementById("kast7").value = "X";
		document.getElementById("kast7").disabled = true;
		tootab = 0;
	}
	else {
		document.getElementById("kast7").value = "O";
		document.getElementById("kast7").disabled = true;
		tootab = 1;
	}
}

function valik8() {
	if (tootab == 1) {
		document.getElementById("kast8").value = "X";
		document.getElementById("kast8").disabled = true;
		tootab = 0;
	}
	else {
		document.getElementById("kast8").value = "O";
		document.getElementById("kast8").disabled = true;
		tootab = 1;
	}
}

function valik9() {
	if (tootab == 1) {
		document.getElementById("kast9").value = "X";
		document.getElementById("kast9").disabled = true;
		tootab = 0;
	}
	else {
		document.getElementById("kast9").value = "O";
		document.getElementById("kast9").disabled = true;
		tootab = 1;
	}
}
