declare var d3;
import D3Component from './D3Component';
import Sizes from './iSizes';
/**
 * WRAPPER PARA SVG
 */
export default class D3Visualization extends D3Component{
    static type:string = 'visualization';
    static root:string = 'svg';


    constructor(name:string){
      super(name, D3Visualization.type, D3Visualization.root);
    }
    setSizes(sizes:Sizes){
      super.setSizes(sizes);
      this.resize();

      return this;
    }
    resize(){
      this.getElement()
        .attr('width', this.getSizes('width'))
        .attr('height', this.getSizes('height'));

      return this;
    }
}
