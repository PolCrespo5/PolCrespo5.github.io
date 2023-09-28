function validarForm() {
    let numPersones = document.forms.myForm.persones.value;
    let compte = document.forms.myForm.compte.value;
    let servei = document.forms.myForm.servei.value;
    
    if (isNaN(compte)) {
    	return mostrarError();
    }
    if (numPersones == "") {
    	numPersones = 1;
    }
    return mostrarRespostes(numPersones, compte, servei);
}

function mostrarError() {
	alert("Omple els camps correctament!");
  return false;
}

function mostrarRespostes(numPersones, compte, servei) {
		
    const propinaMin = 0.50;
    const percentatgeAcceptable = 5;
    const percentatgeGenial = 10;
    let preuTotal;
    switch (servei) {
        case "acceptable":
            preuTotal = compte * (percentatgeAcceptable / 100);
            break;
        case "genial":
            preuTotal = compte * (percentatgeGenial / 100);
            break;  
        default:
            preuTotal = 0;
            break;
    }
    if (preuTotal / numPersones < propinaMin) {
        alert("El preu de la propina és de: " + propinaMin*numPersones + "€\nCada persona haurà de pagar: " + propinaMin + "€");
    } else {
    		preuIndPropina = preuTotal/numPersones;
        alert("El preu de la propina és de: " + preuTotal.toFixed(2) + "€\nCada persona haurà de pagar: " + preuIndPropina.toFixed(2) + "€");
    }
    document.forms.myForm.reset();
    return false;
}