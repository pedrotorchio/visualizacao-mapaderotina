declare var d3;

export function appendPizzaTo(canvas, data,config){
   // data = [{key, value}]

  let raio = config.raio || console.log('falta raio');
  let colorScale = config.color;
  let id = config.id || '';
  let classes = (config.classes || '') + ' pie';
  canvas.select('g').remove();
  canvas = canvas
    .append('g')
    .attr('id', id)
    .attr('class', classes)
    .attr('transform', 'translate(' + (raio) +  ',' + (raio) + ')');

  let arc = d3.arc()
              .innerRadius(0)
              .outerRadius(raio);
  let pie = d3.pie()
              .value(function(d){
                return d.value;
              })
              .sort(null);

  let arcs = canvas.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

      arcs
      .append('path')
      .attr('stroke', 'white')
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
    	})
      .attr('fill', function(d, i) {
        return colorScale(d.data, i);
      });

      arcs.append('text')
          .attr('transform', d=>`translate(${arc.centroid(d)})`)
          .attr('text-anchor', 'middle')
          .attr('fill', 'white')
          .attr('font-weight', '200')
          .transition()
          .delay(600)
          .text((d, i)=>d.data.key);

      makePizzaToolTip(canvas, data);

    	// arcs.append("text")
    	//     .attr("transform", function(d){return "translate(" + arc.centroid(d) + ")";})
    	//     .attr("text-anchor", "middle")
    	//     .transition().delay(600)
    	//     .style("font-weight","bold")
    	//     .text(function(d,i){
    	// 	    if (portions == 2) // pizza de passividade
    	// 	    {
    	// 	    	if(dataset[i].classe == 1)
    	// 	    		{
    	// 	    			return "Ativo";
    	// 	    		}
    	// 	    		else
    	// 	    		{
    	// 	    			return "Passivo";
    	// 	    		}
    	// 		}
    	// 		else // pizza de independencia
    	// 		{
    	// 			return dataset[i].classe;
    	// 		}
    	// 	});


        return arcs;

}
export function makePizzaToolTip(canvas, data){
  let total = 0;
  data.forEach(item => {
    total += item.value;
  });
  let id  = `${canvas.attr('id')}-tooltip`;

  let tip = d3.select('body')
              .append('div')
              .attr('id', '')
              .attr('class', 'tooltip');
  let h1  = tip.append('h1');
  let h2  = tip.append('h2');


  canvas.selectAll("path").on("mousemove", function(d) {
    tip.classed('shown', true);
    let x = d3.event.pageX + 15;
    let y = d3.event.pageY + 15;

    let value = (d.data.value * 100 / total).toFixed();
        value = `${value}%`;

    tip.style("left", `${x}px`);
    tip.style("top",`${y}px`);
    tip.style("display", "inline-block");


    h2.html(value);
  });
  canvas.selectAll("path").on("mouseout", function(d){
    tip.classed('shown', false);
  });
}
