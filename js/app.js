var calculadora = {
	visor: document.getElementById("display"),
	valorVisor: "0",
	operacion: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultado: 0,
	auxTeclaIgual: false,
	
	init: (function(){
		this.asignarBotones(".tecla");
		this.asignarValorBotones();
	}),

	asignarBotones: function(selector){
		var x = document.querySelectorAll(selector)
		for (var i = 0 ; i < x.length; i++) {
			x[i].onmouseover = this.evUpButton
			x[i].onmouseleave = this.evDownButton
		};
	},

	evUpButton: function(event){
		calculadora.upButton(event.target);
	},

	evDownButton: function(event){
		calculadora.downButton(event.target);
	},

	downButton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
			elemento.style.width = "21%";
			elemento.style.height = "62px";
		}
	},
	
	upButton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
			elemento.style.width = "22%";
			elemento.style.height = "62.91px";
		}
	},

// asigna el valor a cada tecla
	asignarValorBotones: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.nuevoNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.nuevoNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.nuevoNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.nuevoNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.nuevoNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.nuevoNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.nuevoNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.nuevoNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.nuevoNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.nuevoNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.on_c();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.numeroDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.calcularResultado();});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.tipOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.tipOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.tipOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.tipOperacion("+");});
	},

//se reestablece los valores al oprimir la tecla on/c
	on_c: function(){
		this.valorVisor = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.auxTeclaIgual = false;
		this.ultimoValor = 0;
		this.actualizarVisor();
	},

	//Se ingresan los valores que no superen los 8 caracteres

		nuevoNumero: function(valor){
		if (this.valorVisor.length < 8) {
		
			if (this.valorVisor=="0") {
				this.valorVisor = "";
				this.valorVisor = this.valorVisor + valor;
			} else {
				this.valorVisor = this.valorVisor + valor;
			}
		this.actualizarVisor();
		}
	},

//agrega el punto a los valores decimales
		numeroDecimal: function(){
		if (this.valorVisor.indexOf(".")== -1) {
			if (this.valorVisor == ""){
				this.valorVisor = this.valorVisor + "0.";
			} else {
				this.valorVisor = this.valorVisor + ".";
			}
			this.actualizarVisor();
		}
	},

// define el operador seleccionado
	tipOperacion: function(oper){
		this.primerValor = parseFloat(this.valorVisor);
		this.valorVisor = "";
		this.operacion = oper;
		this.auxTeclaIgual = false;
		this.actualizarVisor();
	},

// efectua el llamado a la funcion realizarOperacion y muestra el resultado en la pantalla
		calcularResultado: function(){

		if(!this.auxTeclaIgual){ 
			this.segundoValor = parseFloat(this.valorVisor);
			this.ultimoValor = this.segundoValor;
			this.realizarOperacion(this.primerValor, this.segundoValor, this.operacion);
		
		} else {
			this.realizarOperacion(this.primerValor, this.ultimoValor, this.operacion);
		}
	
		this.primerValor = this.resultado;
		this.valorVisor = "";
	
		if (this.resultado.toString().length < 9){
			this.valorVisor = this.resultado.toString();
		} else {
			this.valorVisor = this.resultado.toString().slice(0,8) + "...";
		}
	
		this.auxTeclaIgual = true;		
		this.actualizarVisor();
	
	},

// Realiza la operacion 
	realizarOperacion: function(primerValor, segundoValor, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(primerValor + segundoValor);
			break;
			case "-": 
				this.resultado = eval(primerValor - segundoValor);
			break;
			case "*": 
				this.resultado = eval(primerValor * segundoValor);
			break;
			case "/": 
				this.resultado = eval(primerValor / segundoValor);
			break;
		}
	},


// Actualiza la vista de la pantalla
	actualizarVisor: function(){
		this.visor.innerHTML = this.valorVisor;
	}
}


calculadora.init();