function validarForm() {
    let numPersones = document.getElementById("persones").value;
    let edat = document.getElementById("compte").value;
    let animal = document.querySelector('input[name="servei"]:checked').value;
    
  
    return mostrarRespostes(numPersones + edat + animal);
  }