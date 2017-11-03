declare var d3 : any;
import {D3AxisComponent, D3Component} from '.';

export class D3TimeAxis extends D3AxisComponent{
  protected getAxis(element:D3Component){
    let height = element.getDrawHeight();

    let hourAxis = d3.axisBottom(this.scale)
      .ticks(d3.timeMinute.every(30))
      .tickSize(-height)
      .tickFormat(d3.timeFormat('%H:%M'));


    return hourAxis;
  }
  protected getXTranslate(element:D3Component):number{
    return 0;
  }
  protected getYTranslate(element:D3Component):number{
    let edges = element.getDrawEdges();
    return edges.bottom;
  }
}
