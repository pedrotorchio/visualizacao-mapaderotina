declare var d3;
import Scales from '../specs/Scales';
import {D3Tooltip, D3TimeAxis, D3Component, D3TaskAxis} from '.';

export class D3GanttComponent extends D3Component{
  static type:string = 'gantt';
  width:number;
  height:number;
  padding:number;
  top:number = 0;
  left:number = 0;
  root:any;
  gantt:any;

  constructor(private data){
    super(D3GanttComponent.type);
  }

  public placeIn(svg){
    super.placeIn(svg);

    this.init();

    return this;
  }

  public init(){
    let scales  = new Scales(this);

    let xScale = scales.getXScale();
    let yScale = scales.getYScale();
    let wScale = scales.getWidthScale();
    let hScale = scales.getHeightScale();
    let cScale = scales.getClassScale();
    let dScale = scales.getColorScale();

    this.getElement()
    .selectAll('.task-bar')
    .data(this.data).enter()
    .append('rect')
    .attr('y', 0)
    .attr('x', 0)
    .attr('class', cScale)
    .attr('transform', d=>{
      let time = d.inicio;
          time = xScale(time);
      let task = d.taskName;
          task = yScale(task);

      return `translate(${time}, ${task})`;
    })
    .attr('fill', dScale)
    .attr('height', hScale)
    .attr('width', d=>wScale(d.duracao))
    .call(D3Tooltip.getCallable());

    this.call(new D3TimeAxis(xScale, 'time-axis'));
    this.call(new D3TaskAxis(yScale, 'task-axis'));

    return this;
  }
}
