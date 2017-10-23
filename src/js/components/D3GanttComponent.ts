declare var d3;
import D3Subcomponent from './D3Subcomponent';
import Sizes from './iSizes';

export default class D3GanttComponent extends D3Subcomponent{
  static type:string = 'gantt';

  constructor(name:string, data:any[]){
    super(name, D3GanttComponent.type, data);
  }

  public configRects(callback:(any)=>any){

    callback.bind(this)(
      this.getElement()
        .selectAll('.task-bar')
        .data(this.data).enter()
        .append('rect')
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('y', 0)
        .attr('x', 0)
      );

      return this;
  }

}
