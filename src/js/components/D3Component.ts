import {iD3Callable} from '.';

export class D3Component{
  static type:string = 'component';

  width:number;
  height:number;
  padding:number;
  top:number = 0;
  left:number = 0;

  root:any;
  subroot:any;

  constructor(protected id:string, protected classes:string = ''){

  }

  public setSize(width:number, height:number, padding:number = 15){
    this.width = width;
    this.height = height;
    this.padding = padding;
    return this;
  }
  public setPosition(left:number, top:number){
    this.top = top;
    this.left = left;
    return this;
  }
  public placeIn(svg){
    this.root = svg;
    this.subroot = svg
    .append('g')
    .attr('id', this.id).attr('class', this.classes)

    return this;
  }
  public getRoot(){
    return this.root;
  }
  public getElement(){
    return this.subroot;
  }
  public call(callable:iD3Callable){
    callable.action(this);
  }

  getDrawEdges(){
    let left:number = this.left + this.padding;
    let right:number = left + this.getDrawWidth();
    let top:number = this.top + this.padding;
    let bottom:number = top + this.getDrawHeight();

    return { left, right, top, bottom };
  }
  getDrawWidth(fraction:number = 1)
  {
    return (this.width - 2*this.padding) * fraction;
  }
  getDrawHeight(fraction:number = 1){
    return (this.height - 2*this.padding) * fraction;
  }
}
