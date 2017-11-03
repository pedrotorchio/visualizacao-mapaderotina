declare var d3 : any;

import {D3Component, iD3Callable} from '.';

export class D3Tooltip{
  selection; ul; h1; h2;
  private static instance = null;
  private constructor(){
    this.selection = d3.select('#tooltip');
    this.ul = this.selection.select('ul');
    this.h1 = this.selection.select('h1');
    this.h2 = this.selection.select('h2');
  }
  public static getInstance(){
    if(D3Tooltip.instance == null)
      D3Tooltip.instance = new D3Tooltip();

      return D3Tooltip.instance;
  }
  public setTitle(title:string){
    this.h1.html(title);

    return this;

  }
  public setSubtitle(title:string){
    this.h2.html(title);

    return this;

  }
  public listItems(array){

    array.forEach(item => {
      this.ul.append('li').html(item);
    })

    return this;

  }
  public show(x, y){
    this.selection
      .style('left', `${x}px`)
      .style('top', `${y}px`)
      .classed('shown', true);
      return this;
  }
  public hide(){
    this.h1.html('');
    this.h2.html('');
    this.ul.html('');
    this.selection
      .classed('shown', false);

      return this;
  }
  public static getCallable(){
    return D3Tooltip.callable;
  }
  private static callable(selection){

    let tip = D3Tooltip.getInstance();

    selection
    .on('mouseover', d=>{
      let dados = [`${d.duracao}min`]
      if(d.companhiaName)
        dados.push(d.companhiaName);
      if(d.simultaneaName)
        dados.push(d.simultaneaName);
      if(d.localName)
        dados.push(d.localName);
      if(d.independencia)
        dados.push(`Independência: ${d.independencia}%`);

      tip
        .setTitle(`${d.taskName} ${d.horario}`)
        .setSubtitle(d.categoriaName)
        .listItems(dados)
        .show(d3.event.pageX, d3.event.pageY);
    })
    .on('mouseout', d => {
      tip
        .hide();
    })
  }
}
