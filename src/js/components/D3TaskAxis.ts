declare var d3 : any;
import {D3AxisComponent, D3Component} from '.';

export class D3TaskAxis extends D3AxisComponent{
  protected getAxis(element:D3Component){
    let taskAxis = d3.axisLeft(this.scale)
      .tickSize(-element.getDrawWidth());

    return taskAxis;
  }
  protected getXTranslate(element:D3Component):number{
    let edges = element.getDrawEdges();

    return edges.left;
  }
  protected getYTranslate(element:D3Component):number{

    return 0;
  }
}
