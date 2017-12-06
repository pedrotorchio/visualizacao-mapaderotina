declare var d3;

var p = Math.PI*2;


//var color = ['#fb9a99','#6a3d9a','#e31a1c','#fdbf6f','#1f78b4','#b2df8a','#ff7f00','#33a02c','#ffff99','#cab2d6','#a6cee3','#b15928']

// EXEMPLOS DE DATASET RECEBIDOS
var independenciaCount = [{'independencia':2,'duracao':30},{'independencia':4,'duracao':525},{'independencia':6,'duracao':165}
,{'independencia':7,'duracao':200},{'independencia':3,'duracao':60},{'independencia':5,'duracao':45}];
var passividadeCount = [{'classe':1,'duracao':615},{'classe':0,'duracao':410}];


var Redscale = ['#fee5d9','#fcbba1','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#99000d'];
var Bluescale = ['#eff3ff','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#084594'];
var colorScale1a7blue = d3.scaleOrdinal().domain([1,2,3,4,5,6,7]).range(Bluescale);

var Ray = 180; // o rayo das pizzas

var pizza_independencia = function(canvas, dataset, where_x, where_y, colorScale){
	var total = 0;
	for (var i = dataset.length - 1; i >= 0; i--) {
		total = total + dataset[i].duracao;
	};

	var group = canvas.append('g')
					 .attr('transform','translate('+where_x+','+where_y+')');

 	var portions = dataset.length;

 	var div1 = d3.select('body').append('div').attr('class','vizu');


 	var arc = d3.arc()
 	.innerRadius(0).outerRadius(Ray);

 	var pie = d3.pie()
    .value(function(d){
      return d.duracao;
    });

	var arcs = group.selectAll('.arc')
	    .data(pie(dataset))
	    .enter()
	        .append('g')
	        .attr('class', 'arc');


	arcs.append('path').attr('class','path1')
	    .style('fill', function(d,i){
        return Bluescale[(dataset[i].independencia-1)];
      })
	    .style('stroke','white')
	    .transition()
    	.delay(function(d,i) {
    		return i * 200;
      })
    	.duration(200)
    	.attrTween('d',function(d) {
    		var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
    		return function(t){
    			d.endAngle = i(t);
    			return arc(d);
    		};
    	});

	arcs.append('text')
	    .attr('transform', function(d){
        return 'translate(' + arc.centroid(d) + ')';
      })
	    .attr('text-anchor', 'middle')
	    .transition().delay(1000)
	    .style('font-weight','bold')
	    .text(function(d,i){
        return dataset[i].independencia;
      });

	d3.selectAll('.path1').on('mousemove', function(d) {
		div1.style('left',d3.event.pageX+10+'px');
		div1.style('top',d3.event.pageY-25+'px');
		div1.style('display', 'inline-block');
		div1.html('<b>Nivel :</b>'+'<br>'+(d.data.independencia) + '<br>'+((d.data.duracao / total)*100).toPrecision(3) + '%');
	});

	d3.selectAll('.path1').on('mouseout', function(d){
		div1.style('display','none');
	});


	var colorLegend = d3.legendColor()
		.labelFormat(d3.format('.0f'))
		.title('Niveis de independencia').titleWidth(100)
		.scale(colorScale)
		.shapePadding(5).shapeWidth(50)
		.shapeHeight(20).labelOffset(12);

	canvas.append('g').attr('transform','translate('+(where_x+Ray+30)+',40)').call(colorLegend).transition().delay(300);
};

var pizza_passividade = function(canvas, dataset, where_x, where_y){
	var total = dataset[0].duracao + dataset[1].duracao;

	var group = canvas.append('g')
					 .attr('transform','translate('+where_x+','+where_y+')');

 	var portions = dataset.length;

 	var div2 = d3.select('body').append('div').attr('class','vizu');


 	var arc = d3.arc()
 	.innerRadius(0).outerRadius(Ray);

 	var pie = d3.pie()
    .value(function(d){
      return d.duracao;
    });

	var arcs = group.selectAll('.arc')
	    .data(pie(dataset))
	    .enter()
	        .append('g')
	        .attr('class', 'arc');


    arcs.append('path')
    	.style('fill', function(d,i){
      		if(dataset[i].classe == 1){
            return Bluescale[6];
          }else if (dataset[i].classe == 0) {
            return Redscale[5];
          }
	    	})
    	.style('stroke','white')
    	.transition()
    	.delay(function(d,i) {
    		return i * 300;
      })
    	.duration(300)
    	.attrTween('d',function(d) {
    		var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
    		return function(t){
    			d.endAngle = i(t);
    			return arc(d);
    		};
    	});


	d3.selectAll('path').on('mousemove', function(d) {
		div2.style('left',d3.event.pageX+10+'px');
		div2.style('top',d3.event.pageY-25+'px');
		div2.style('display', 'inline-block');
		div2.html(((d.data.duracao / total)*100).toPrecision(3) + '%');
	});

	d3.selectAll('path').on('mouseout', function(d){
		div2.style('display','none');
	});


	arcs.append('text')
	    .attr('transform', function(d){
        return 'translate(' + arc.centroid(d) + ')';
      })
	    .attr('text-anchor', 'middle')
	    .transition().delay(600)
	    .style('font-weight','bold')
	    .text(function(d,i){
	    	if(dataset[i].classe == 1){
	    			return 'Ativo';
	    		}else{
	    			return 'Passivo';
	    		}
	    	});
};




var pizza_generica = function(canvas, dataset_ind, dataset_pass, where_x, where_y, colorScale){
	var svglobal = d3.select('body')
				 .append('svg')
				 .attr('width',1000)
				 .attr('height',500)
				 .append('g')
				 .attr('transform','translate('+where_x+','+where_y+')'); // position of the svg element

	where_x =+ 20; // reset positionning for the pizzas inside svg element
	where_y =+ 100;

	pizza_independencia(canvas, dataset_ind,where_x,where_y, colorScale);

	pizza_passividade(canvas, dataset_pass,(where_x+550),where_y); // 550px between the center of both pizzas
};
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
