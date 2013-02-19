$(document).ready(function () {
    var numPreguntas=0;
    var aciertos=0;
    var index = 1;
    var i = 0;
    
	var soluciones = [];
	
    $.get("datos.xml", function (xml) {

		$(xml).find('pregunta').each(function(){

		    //enunciados[numPre]=$(this).find("enunciado").text();	    
		    var enunciado = $(this).find("enunciado").text();
			var opciones = [];

			$(this).find("opcion").each(function(){
		    	opciones.push($(this).text());		    	
		    });

			var sol = $(this).find("solucion").text();
			sol=sol.replace(/\n/gi,"");
			sol=sol.replace(/\t/gi,"");
			soluciones.push(sol);

			opciones=desordenar(opciones);

			$("#preguntas").append('<br><div id="preg'+index+'" class="pregunta"><span class="enunciado">'+enunciado+'</span><form action=""><input type="radio" name="respuesta'+index+'" value="a">'+opciones[0]+'<br><input type="radio" name="respuesta'+index+'" value="b">'+opciones[1]+'<br><input type="radio" name="respuesta'+index+'" value="c">'+opciones[2]+'<br><input type="radio" name="respuesta'+index+'" value="d">'+opciones[3]+'<br></form><span id="solu'+index+'" class="solu"></span></div>');	
			index++;
			numPreguntas++;
		});
	});
 
	$("#preguntas").append('<button id="resultados">Calcular resultados</button>');
	
  	$('#resultados').click(function() {
  		aciertos=0;
 		
  		for (i=0;i<numPreguntas;i++) {
    		if ($("input[name='respuesta"+(i+1)+"']:checked").val()==soluciones[i]){
    			$("#preg"+(i+1)).removeClass("incorrecta");
    			$("#preg"+(i+1)).addClass("correcta");
    			$("#preg"+(i+1)).unbind('mouseenter mouseleave');
    			aciertos++;
    		}
    		else{
    			$("#preg"+(i+1)).removeClass("correcta");
    			$("#preg"+(i+1)).addClass("incorrecta");
    			$("#preg"+(i+1)).hover(
								function () {
									var aux = $(this).attr('id');
	           						aux = aux.substring(4);
									$("#solu"+aux).text("Solucion: "+soluciones[aux-1]);
									$("#solu"+aux).show();
								},
								function () {
									var aux = $(this).attr('id');
	           						aux = aux.substring(4);
									//$('#solu').remove();
							  		$("#solu"+aux).text("");
							  		$("#solu"+aux).hide();
								});
    		}
    	}
    	var porcentaje = ((aciertos/numPreguntas)*100);
    	porcentaje = Math.round(porcentaje*100)/100;
    	alert("Has acertado:"+aciertos+" preguntas de "+numPreguntas+"\nTienes un "+porcentaje+"% de aciertos");
  	});

    function desordenar(opciones){
    	var succes = 0;
		var posiciones = [ 0,0,0,0 ];
		var opcionesAleatorias = [];

		var numSol = 0;

		switch(soluciones[index-1]){
			case 'a':
				numSol = 0;
				break;

			case 'b':
				numSol = 1;
				break;
			case 'c':
				numSol = 2;
				break;

			case 'd':
				numSol = 3;
				break;
		}

		do{
			var randomNum = Math.floor(Math.random()*4);

			// empty tile found!
			if (posiciones[randomNum] == 0){
				opcionesAleatorias.push(opciones[randomNum]);
				if (randomNum==numSol){
					switch(succes){
						case 0:
							soluciones[index-1]='a';
							break;

						case 1:
							soluciones[index-1]='b';
							break;
						case 2:
							soluciones[index-1]='c';
							break;

						case 3:
							soluciones[index-1]='d';
							break;
					}
				}
				succes++;
				posiciones[randomNum] = 1;
			}
		}
		while (succes < 4);

		return opcionesAleatorias;

    }
});
	
