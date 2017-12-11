import {D3Visualization} from './components/D3Visualization';
import {D3GanttComponent} from './components/D3GanttComponent';
import {pizza_independencia, colorScale1a7blue, convertIndependenciaData, } from './lib/pizza';
export class Pizzas{

  width:number = 1024;
  height:number = 480;
  top:number = 0;
  left:number = 0;
  padding:number = 10;

  constructor(private data:any, private context:string){}

  build(){
    console.log('Gerando Pizzas');

    let svg = new D3Visualization(
      this.context,
      this.width,
      this.height
    ).makeSvg();

    let pizzaIndData = convertIndependenciaData(this.data.independencia);
  }
  setSize(width, height){
    this.width = width;
    this.height = height;

    return this;
  }
  getDrawWidth(fraction:number = 1)
  {
    return (this.width - 2*this.padding) * fraction;
  }
  getDrawHeight(fraction:number = 1){
    return (this.height - 2*this.padding) * fraction;
  }
  setPosition(x, y){
    this.top = y;
    this.left = x;
    return this;
  }
  selectionCallback(callback){
    document
      .getElementsByTagName('body')[0]
      .addEventListener('toggleSelection', callback);

    return this;
  }
}
