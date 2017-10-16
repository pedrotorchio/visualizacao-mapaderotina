/*
 * WRAPPER para tags SVG
 */

export default class D3Visualization{

  constructor(width = 500, height = 500, context = 'body', name = ''){

    console.log(`Criando visualização ${name} em ${context}`);

    this.name = name;
    this.width = width;
    this.height = height;
    this.context = context;

    this.generateSvg();

  }
  generateSvg(){
    this.svg = d3.select(this.context)
      .append('svg')
      .attr('id', this.name)
      .classed('visualization', true)
      .attr('width', this.width)
      .attr('height', this.height);

    this.g  = this.svg
      .append('g');


    return this;
  }
  svg(){
    return this.svg;
  }

}
