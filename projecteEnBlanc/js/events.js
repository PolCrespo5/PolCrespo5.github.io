function validarForm() {
    let numPersones = document.getElementById("persones").value;
    let compte = document.getElementById("compte").value;
    let servei = document.getElementById("servei").value;
    
    return mostrarRespostes(numPersones, compte, servei);
}

function mostrarRespostes(numPersones, compte, servei) {
		
    const propinaMin = 0.5;
    let preuTotal;
    switch (servei) {
        case "acceptable":
            preuTotal = compte * 5 / 100;
            break;
        case "genial":
            preuTotal = compte * 10 / 100;
            break;  
        default:
            preuTotal = compte;
            break;
    }
    if (preuTotal / numPersones < propinaMin) {
        alert("El preu de la propina és de: " + propinaMin + "€");
    } else {
    		preuIndPropina = preuTotal/numPersones;
        alert("El preu de la propina és de: " + preuIndPropina.toFixed(2) + "€");
    }
    return false;
}