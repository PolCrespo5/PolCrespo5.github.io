function validarForm() {
    let numPersones = document.getElementById("persones").value;
    let compte = document.getElementById("compte").value;
    let servei = document.querySelector('input[name="servei"]:checked').value;
    
  
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
        alert("El preu de la propina és de: " + preuTotal/numPersones + "€");
    }
}