declare var d3;

var p = Math.PI*2; 


//******************** DADOS E VARIAVEIS DE TESTE	******************** 
/*
var independenciaCount = [{"classe":2,"duracao":30},{"classe":4,"duracao":525},{"classe":6,"duracao":165}
,{"classe":7,"duracao":200},{"classe":3,"duracao":60},{"classe":5,"duracao":45}]; // exemplo de dados para a pizza de independencia

var passividadeCount = [{"classe":1,"duracao":615},{"classe":0,"duracao":410}]; // exemplo de dados para a pizza de passividade


var duo = ['#cb181d','#084594']; // exemplo de cores para a pizza de passividade [azul,vermelho]
var Bluescale = ['#eff3ff','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#084594']; // exemplo de escala para a pizza de independencia

var svgtest1 = d3.select("body").append("svg").attr("width",500).attr("height", 500);
var svgtest2 = d3.select("body").append("svg").attr("width",500).attr("height", 500);
*/





var pizza_generica = function(canvas, dataset, couleur, raio) // funçao generica de construçao de
{
	var total = 0;
	for (var i = dataset.length - 1; i >= 0; i--) {
		total = total + dataset[i].duracao // pra calcular percentagens
	};

	var group = canvas.append("g")
					 .attr("transform","translate("+(raio+20)+","+(raio+20)+")"); // centrar a pizza no canvas

 	var portions = dataset.length;

 	var div2 = d3.select("body").append("div").attr("class","vizu");

 	var arc = d3.arc()
 	.innerRadius(0).outerRadius(raio);

 	var pie = d3.pie()
    .value(function(d){return d.duracao;});

	var arcs = group.selectAll(".arc")
	    .data(pie(dataset))
	    .enter()
	        .append("g")
	        .attr("class", "arc");


    arcs.append("path")
    	.style("fill", function(d,i){
    		if (portions == 2) // caso da pizza de passividade : sao apenas 2 porçoes
    		{	
	    		if(dataset[i].classe == 1)
		    		{ return couleur[1];}
		    	else if (dataset[i].classe == 0) {return couleur[0];}
    		}
    		else // caso de uma pizza de independencia
    		{
    			return couleur[(dataset[i].classe-1)];
    		}
    	})
    	.style("stroke","white")
    	.transition()
    	.delay(function(d,i) {
    		return i * 300; })
    	.duration(300)
    	.attrTween('d',function(d) {
    		var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
    		return function(t){
    			d.endAngle = i(t);
    			return arc(d);
    		}
    	});


	d3.selectAll("path").on("mousemove", function(d) {
		div2.style("left",d3.event.pageX+10+"px");
		div2.style("top",d3.event.pageY-25+"px");
		div2.style("display", "inline-block");
		div2.html(((d.data.duracao / total)*100).toPrecision(3) + "%");
	});

	d3.selectAll("path").on("mouseout", function(d){
		div2.style("display","none");
	});

	    
	arcs.append("text")
	    .attr("transform", function(d){return "translate(" + arc.centroid(d) + ")";})
	    .attr("text-anchor", "middle")
	    .transition().delay(600)
	    .style("font-weight","bold")
	    .text(function(d,i){
		    if (portions == 2) // pizza de passividade
		    { 
		    	if(dataset[i].classe == 1)
		    		{
		    			return "Ativo";
		    		}
		    		else
		    		{
		    			return "Passivo";
		    		}
			}
			else // pizza de independencia
			{
				return dataset[i].classe;
			}
		});
}


//TESTES
/*
pizza_generica(svgtest1,independenciaCount, Bluescale, 180);
pizza_generica(svgtest2,passividadeCount, duo, 180);
*/


pizza_generica(svgContainer, data, colorScale, ray); // chamar a funçao 

// as funçoes pizza_independencia e pizza_passividade nao mais existem
//********** depois dessa linea nao fiz alteraçoes *************//



function convertIndependenciaData(data){
  let arrayData = [];

  if(Array.isArray(data)){

    return data;
  }else{

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
          var value = data[key];
          arrayData.push({
            independencia: key,
            duracao: value
          });
      }
    }
  }

  return arrayData;
}
// pizza_generica(independenciaCount, passividadeCount, 200, 100, colorScale1a7blue);

export {pizza_generica, pizza_independencia, pizza_passividade, colorScale1a7blue, convertIndependenciaData};
