declare var d3;
import Sizes from './iSizes';
import D3Subcomponent from './D3Subcomponent';

export default class D3Component{
  protected name:string;
  protected type:string;
  protected sizes:Sizes;
  protected root;
  protected element;

  constructor(name:string, type:string, root:string){
    this.name = name;
    this.type = type;
    this.root = root;
  }

  classed(classes:string, set?:boolean){
    if(set == undefined)
      this.getRoot()
        .classed(classes);

    else
      this.getRoot()
        .classed(classes, set);

    return this;
  }
  setSizes(sizes:Sizes){
    this.sizes = sizes;
    return this;
  }
  getSizes(which?:string){
    let sizes = this.sizes, tmp;

    if(which !== undefined && (tmp = sizes[which]) !== undefined)
      sizes = tmp;

    return sizes;
  }
  getDrawEdges(){

    let sizes = this.getSizes();

    return {
      left: sizes.padding,
      top: sizes.padding,
      right: sizes.width - sizes.padding,
      bottom: sizes.height - sizes.padding
    }
  }
  getDrawSizes(which?:string){
    let sizes:Sizes  = this.getSizes();
    let width:number = sizes.width - 2*sizes.padding;
    let height:number = sizes.height - 2*sizes.padding;
    let drawSizes:Sizes = {
      width,
      height
    };
    if(which !== undefined)
      return drawSizes[which];

    return drawSizes;
  }
  getRoot(){
    return this.root;
  }
  getElement(){
    return this.element;
  }
  node(){
    return this.getRoot().node();
  }

  placeIn(context:string|D3Component){
    let target;
    if(typeof context === "string")
      target = d3.select(context);
    else
      target = context.getElement();

    this.element = target.append(this.root)
      .attr('id', this.name)
      .attr('class', this.type);

    return this;
  }
}
