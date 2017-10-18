/*
 * WRAPPER para tags SVG
 */

export default class D3Visualization{

  constructor(sizes, context = 'body', name = ''){

    console.log(`Criando visualização ${name} em ${context}`);

    this.name = name;
    this.width = sizes.width || 500;
    this.height = sizes.height || this.width;
    this.padding = sizes.padding || 0;
    this.context = context;

    this.axis   = {
      left: null,
      right: null,
      top: null,
      bottom: null
    };

    this.generateSvg();
  }
  setPadding(padding){
    this.padding = padding;

    return this;
  }
  setAxis(which, handler){
    this.axis[which] = handler.bind(this)();

    this.showAxis(which);

    return this;
  }
  generateSvg(){
    this.svg = d3.select(this.context)
      .append('svg')
      .attr('id', this.name)
      .classed('visualization', true)
      .attr('width', this.width)
      .attr('height', this.height);

    this.g  = this.svg
      .append('g')
      .attr('width', this.width - this.padding)
      .attr('height', this.height - this.padding)
      .attr('tranform', `translate(${this.padding}, ${this.padding})`)
      .attr('class','element-root');


    return this;
  }
  svg(){
    return this.svg;
  }
  g(){
    return this.g;
  }
  append(/*D3Component*/ component){
    this.svg.append(component);
  }
  showAxis(which){
    console.log(`Montando eixo ${which}`);
    let translation = [];

    switch(which){
      case 'top':
        translation = [0, this.padding];
        break;
      case 'bottom':
        translation = [this.padding, this.height - 2*this.padding];
        break;
      case 'left':
        translation = [this.padding, 0];
        break;
      case 'right':
        translation = [this.width - 2*this.padding, 0];
    }
    this.svg
      .append('g')
      .attr('class', `${which}-axis`)
      .attr('transform', `translate(${translation[0]}, ${translation[1]})`)
      .transition()
      .call(this.axis[which]);
  }
  showGrid(){
    console.log('Criando Grid');

    // let thePadding  = this.padding;
    // let xAxis = this.axis['bottom'];
    //
    // var grid = this.svg
    //     .append('g')
    //     .attr('class', 'grid')
    //     .attr('id', 'axisbottom')
    //     .transition()
    //     .call(xAxis)
    //     .attr('transform', `translate(${this.padding},${this.height - this.padding*10})`)
    //     .selectAll('text')
    //       .style('text-anchor', 'middle')
    //       .attr('fill', '#000')
    //       .attr('stroke', 'none')
    //       .attr('font-size', 10)
    //       .attr('dy', '1em');

  }
  ___limitesUteis(){

  }
}
