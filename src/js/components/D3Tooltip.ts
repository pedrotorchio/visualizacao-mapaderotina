declare var d3 : any;
import Informative from '../lib/Informative';
import {D3Component, iD3Callable} from '.';
import Selection from '../specs/Selection';
import Statistics from '../specs/Statistics';

export class D3Tooltip extends Informative{
  locked:boolean = false;
  private static instance = null;

  private constructor(){
    super('#tooltip');
    this.element.classed('tooltip', true);
  }
  public static getInstance(){
    if(D3Tooltip.instance == null)
      D3Tooltip.instance = new D3Tooltip();

      return D3Tooltip.instance;
  }

  public isLocked(){
    return this.locked;
  }

  public showIn(x, y){
    super.show();

    this.element
      .style('left', `${x + 15}px`)
      .style('top', `${y + 15}px`)

      return this;
  }
  public lock(){
    this.locked = true;
  }
  public unlock(){
    this.locked = false;
  }
  public static getCallable(){
    return D3Tooltip.callable;
  }
  private static callable(selection){

    let tip = D3Tooltip.getInstance();
    let stats = Statistics.getInstance();
    selection
    .on('mousemove', d=>{
      if(tip.isLocked()) return;

      let dados = [];

      if(d.categoriaName)
        dados.push(d.categoriaName);
      if(d.duracao)
        dados.push(`${d.duracao}min`);
      if(d.companhiaName)
        dados.push(d.companhiaName);
      if(d.simultaneaName)
        dados.push(d.simultaneaName);
      if(d.localName)
        dados.push(d.localName);
      if(d.independencia)
        dados.push(`Independência: ${d.independencia}`);

      tip
        .clear()
        .setTitle(`${d.taskName}`)
        .setSubtitle(`${d.inicio}-${d.fim}`)
        .addList(dados)
        .showIn(d3.event.pageX, d3.event.pageY);
    })
    .on('mouseout', d => {
      if(tip.isLocked()) return;

      tip
        .hide();
    })
  }
}
