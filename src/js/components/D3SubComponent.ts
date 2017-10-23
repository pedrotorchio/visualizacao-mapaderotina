declare var d3;
import Sizes from './iSizes';
import D3Component from './D3Component';
import Position from './iPosition';

export default class D3Subcomponent extends D3Component{
  static root:string = 'g';

  protected data:any[] = [];
  protected handlers   = [];
  protected position:Position = {
    left: 0,
    top: 0
  };

  constructor(name:string, type:string, data?:any[]){
    super(name, type, D3Subcomponent.root);
    this.data = data;
  }
  setHandler(forwhat:string, callback){
    this.handlers[forwhat] = callback;

    return this;
  }
  getData(){
    return this.data;
  }
  setSizes(sizes:Sizes){
    super.setSizes(sizes);

    return this;
  }
  getHandler(forwhat:string){
    return this.handlers[forwhat];
  }
  getPosition(){
    return this.position;
  }
  setPosition(position:Position | ((Sizes)=>Position)){

    if(typeof position === 'object')
      this.position = position;
    else
      this.position = position(this.getDrawSizes());

    return this;
  }
  getDrawEdges(){
    let position = this.getPosition();
    let sizes = this.getSizes();

    return {
      left: position.left + sizes.padding,
      top: position.top + sizes.padding,
      right: position.left + sizes.width - sizes.padding,
      bottom: position.top + sizes.height - sizes.padding
    }
  }
}
