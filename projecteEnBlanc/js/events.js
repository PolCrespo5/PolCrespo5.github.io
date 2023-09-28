function validarForm() {
    let numPersones = document.getElementById("persones").value;
    let compte = document.getElementById("compte").value;
    let servei = document.getElementById("servei").value;
    
    if (isNaN(compte)) {
    	return mostrarError();
    }
    if (numPersones == "") {
    	numPersones = 1;
    }
    return mostrarRespostes(numPersones, compte, servei);
}

function isFloat(n){
  return Number(n) === n && n % 1 !== 0;
}

function mostrarError() {
	alert("Omple els camps correctament!");
  return false;
}

function mostrarRespostes(numPersones, compte, servei) {
		
    const propinaMin = 0.50;
    let preuTotal;
    switch (servei) {
        case "acceptable":
            preuTotal = compte * (5 / 100);
            break;
        case "genial":
            preuTotal = compte * (10 / 100);
            break;  
        default:
            preuTotal = compte * (0 / 100);
            break;
    }
    if (preuTotal / numPersones < propinaMin) {
        alert("El preu de la propina és de: " + propinaMin*numPersones + "€\nCada persona haurà de pagar: " + propinaMin + "€");
    } else {
    		preuIndPropina = preuTotal/numPersones;
        alert("El preu de la propina és de: " + preuTotal.toFixed(2) + "€\nCada persona haurà de pagar: " + preuIndPropina.toFixed(2) + "€");
    }
    document.getElementById("myForm").reset();
    return false;
}