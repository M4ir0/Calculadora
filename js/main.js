var display = document.getElementById("textBox"); //PANTALLA QUE MUESTRA EL TEXTO 
var number = document.getElementsByClassName("number"); //NUMERO
var basicOperation = document.getElementsByClassName("basicOperation"); //OPERACIONES BASICAS, +, -, *, /
var deleteAll = document.getElementById("borrarTodo"); //LIMPIAR EL DISPLAY
var deleteLast = document.getElementById("borrarUno"); //ELIMINAR EL ULTIMO VALOR DEL DISPLAY
var equals = document.getElementsByClassName("equals");
var dot = document.getElementById("dot");
var enabledDot = true; //CONTROL DEL PUNTO, SE HABILITA Y SE DESABILITA AL INGRESAR UNA OPERACION BASICA
var clearError = document.getElementById("clearError");
var saveResults = new Array(); //ALMACENAR LOS RESULTADOS PARA APLICAR AL BOTON {CE}

var percentage = document.getElementById("percentage");
var squareRoot = document.getElementById("squareRoot");
var exponent = document.getElementById("exponent");

var about = document.getElementById("about");

var operaciones_PRC = 0;
/*
    1 = PORCENTAJE
    2 = RAIZ CUADRADA
    3 = EXPONENTE
*/

//AGREGAR EVENTO "CLICK" A CADA UNO DE LOS NUMEROS Y AGREGAR EL NUMERO AL DISPLAY
for(var i = 0; i < number.length; i++){
    number[i].addEventListener('click', function(){
        console.log("Click sobre el boton -> " + this.value);
        display.value += this.value;
    });
}

deleteAll.addEventListener("click", function(){
    display.value = "";
});

deleteLast.addEventListener("click", function () {
    display.value = display.value.substring(0, display.value.length-1);
});

//AGREGAR SIGNOS BASICOS AL DISPLAY
for(var i = 0; i < basicOperation.length; i++){
    basicOperation[i].addEventListener('click', function(){
        if(display.value !== ""){ //NO AGREGAR SIGNO SI NO HAY VALORES EN EL DISPLAY

            if(!(display.value.indexOf("√") != -1)){
                console.log("accedio al if de la raiz cuadrada");
                if(display.value.substring(display.value.length-1) !== "+"&&
                display.value.substring(display.value.length-1) !== "-"&&
                display.value.substring(display.value.length-1) !== "X"&&
                display.value.substring(display.value.length-1) !== "/")//NO AGREGAR UN SIGNO MAS DE UNA VEZ SEGUIDA
                {
                    display.value += this.value;
                }
                else if(display.value.substring(display.value.length-1) == "+"||
                        display.value.substring(display.value.length-1) == "-"||
                        display.value.substring(display.value.length-1) == "X"||
                        display.value.substring(display.value.length-1) == "/"){

                        display.value = display.value.substring(0, display.value.length-1) + this.value
                }
            }
        }
    });
}

//AGREGAR PUNTO AL DISPLAY
dot.addEventListener("click", function(){
    
    //123.123.  = false
    //123       = false
    //123.123   = true

    var separadores = /[\+\-\*/]/;
    var valueTextBox = display.value.replace('X', '*');
    var numeros = valueTextBox.split(separadores);
    console.log(numeros);
    var expressionRegular = new RegExp("^[0-9]+[\.][0-9]+$");

    //for(var i = 0; i < numeros.length; i++){
        //EVALUAR SI UN NUMERO YA CUENTA CON UN PUNTO (1)
        //VERIFICAR QUE EL ULTIMO VALOR INGRSADO NO SEA UN PUNTO(2)
        if(/*1*/!expressionRegular.test(numeros[numeros.length-1]) && /*2*/valueTextBox.substring(valueTextBox.length-1) != '.')
        {
        
            if(display.value === ""){
                display.value = "0" + this.value;
            }else if(display.value.substring(display.value.length-1) == "+"||
                    display.value.substring(display.value.length-1) == "-"||
                    display.value.substring(display.value.length-1) == "X"||
                    display.value.substring(display.value.length-1) == "/")
            {
                display.value += "0" + this.value
            }else{
                display.value += this.value;
            }
            
            console.log("IF")
            //break; //SALIR DEL CICLO CUANDO EL PRIMERO VALOR NO TENGA UN PUNTO
        }else{
            console.log("ELSE");
        }
    //}

});

equals[0].addEventListener("click", function(){
    
    switch(operaciones_PRC){
        case 1: //PORCENTAJE
            if(!existeSigno("+") && !existeSigno("-") && !existeSigno("X") && !existeSigno("/")){
                var numero = display.value.split("%");
                console.log(numero[0]*numero[1]/100);
                display.value = numero[0]*numero[1]/100;
            }else{
                alert("Debe ingresar un solo numero antes del %, ejemplo: 123%123");
                display.value = "";
            }
            operaciones_PRC = 0;
            break;
        case 2: //RAIZ CUADRADA
            var numero = display.value.split("√");
            console.log(numero);
            console.log(Math.sqrt(numero[1]));
            display.value = Math.sqrt(numero[1]);
            operaciones_PRC = 0;
            break;
        case 3: //EXPONENTE
            if(!existeSigno("+") && !existeSigno("-") && !existeSigno("X") && !existeSigno("/")){
                var numero = display.value.split("^");
                console.log(numero);
                console.log(Math.pow(numero[0], numero[1]));
                display.value = Math.pow(numero[0], numero[1]);
            }else{
                alert("Debe ingresar un solo numero antes del ^, ejemplo: 123^123");
                display.value = "";
            }
            operaciones_PRC = 0;
            break;
        default:
            var resultStringOperation = display.value.replace(/X/gi, "*");
            display.value = eval(resultStringOperation);    
            saveResults.push(display.value);    
        
    }

    /*if(operaciones_PRC == 1){
        
        var numeros = display.value.split("%");
        console.log(numeros[0]*numeros[1]/100);
        display.value = numeros[0]*numeros[1]/100;

    }else{
        var resultStringOperation = display.value.replace(/X/gi, "*");
        display.value = eval(resultStringOperation);    
        saveResults.push(display.value);
    }*/
});

//FUNCION PARA MOSTRAR EL ULTIMO RESULTADO, CASCADA.
clearError.addEventListener("click", function(){
    if(saveResults.length > 1){
        display.value = saveResults[saveResults.length-2];
        saveResults.pop();
    }
});

//PORCENTAJE
percentage.addEventListener("click", function(){
    if(!existeSigno("%")){
        if(!existeSigno("+") && !existeSigno("-") && !existeSigno("X") 
        && !existeSigno("/") && !existeSigno("√") && !existeSigno("^")){
            display.value += this.value;
            operaciones_PRC = 1;
        }else{
            alert("Debe ingresar un solo numero antes del %, ejemplo: 123%123");
            display.value = "";
            operaciones_PRC = 0;
        }
    }
});

//RAIZ CUADRADA
squareRoot.addEventListener("click", function(){
    if(display.value != null || display.value != ""){
        display.value = "";
    }
    display.value += this.value;
    operaciones_PRC = 2;
});

//EXPONENTE
exponent.addEventListener("click", function(){
    if(!existeSigno("^")){
        if(!existeSigno("+") && !existeSigno("-") && !existeSigno("X") 
        && !existeSigno("/") && !existeSigno("%") && !existeSigno("√")){
            display.value += "^";
            operaciones_PRC = 3;
        }else{
            alert("Debe ingresar un solo numero antes del ^, ejemplo: 123^123");
            display.value = "";
            operaciones_PRC = 0;
        }
    }
});

about.addEventListener("click", function(){
    alert("...By M4IR0...");
});

function existeSigno(signo){
    if(display.value.indexOf(signo) != -1){
        return true;
    }else{
        return false;
    }
}
