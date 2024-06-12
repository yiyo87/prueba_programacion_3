window.addEventListener("load",()=>{
    //document.getElementById("btnEnviar").addEventListener("click",validar);//debo completar con la funcion que corresponde a cada id 
    document.getElementById("btnContraste").addEventListener("click",cambiarContraste);
    document.getElementById("btnFuente").addEventListener("click",cambiarFuenteTamano);//debo completar con la funcion que corresponde para cada id 
})

function cambiarContraste(){
    let eBody = document.body;
    let fondo = eBody.style.backgroundColor;
    let eH1 = document.getElementsByClassName("titulo");
    //console.log(eH1);
    //console.log(eH1[0]);
    //console.log(eH1[1]);
    let inputs = document.getElementsByTagName("input");
    console.log(inputs)
    
    //console.log(fondo);
    if(fondo == "black"){
        eBody.style.backgroundColor = "cadetblue";
        for (let index = 0; index < eH1.length; index++) {
            const element = eH1[index];
            element.style.color = "cadetblue";
        }

        for (let index = 0; index < inputs.length; index++) {
            const element = inputs[index];
            element.style.borderColor = "purple";
        }
        //eH1[0].style.color = "purple";
        //eH1[1].style.color = "purple";
    }else{
        eBody.style.backgroundColor = "black";
        for (let index = 0; index < eH1.length; index++) {
            const element = eH1[index];
            element.style.color = "black";
        }

        
        for (let index = 0; index < inputs.length; index++) {
            const element = inputs[index];
            element.style.borderColor = "black";
        }
        // eH1[0].style.color = "black";
        //eH1[1].style.color = "black";
    }
    
}

function cambiarFuenteTamano(){
    var element = document.getElementById("titulo");//tomo el elemento que seria el h1 con el id titulo1
    element.classList.toggle("cambioFuente");// se aplica el metodo toggle para poder hacer y deshacer la funcion junto con la clae de css
    element.classList.toggle("cambioFuente2");
}



