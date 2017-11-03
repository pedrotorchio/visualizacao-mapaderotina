declare var d3;
import Scales from '../specs/Scales';
import D3Tooltip from './D3Tooltip';

export class D3GanttComponent{
  static type:string = 'gantt';
  width:number;
  height:number;
  padding:number;
  top:number = 0;
  left:number = 0;
  root:any;
  gantt:any;
  constructor(private data){}
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
    this.gantt = svg
    .append('g')
    .attr('id', 'gantt').attr('class', 'visualization')

    this.configRects();

    return this;
  }
  public configRects(){
    let scales  = new Scales(this, this.data);

    let xScale = scales.getXScale();
    let yScale = scales.getYScale();
    let wScale = scales.getWidthScale();
    let hScale = scales.getHeightScale();
    let cScale = scales.getClassScale();
    let tooltip = D3Tooltip.getInstance();

    this.gantt
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
    .attr('height', hScale)
    .attr('width', d=>wScale(d.duracao))
    .on('mouseover', d=>{

      let dados = [`${d.duracao}min`]
      if(d.companhiaName)
        dados.push(d.companhiaName);
      if(d.simultaneaName)
        dados.push(d.simultaneaName);
      if(d.localName)
        dados.push(d.localName);
      if(d.dependenciaName)
        dados.push(d.dependenciaName);

      tooltip
        .setTitle(`${d.taskName} ${d.horario}`)
        .setSubtitle(d.categoriaName)
        .listItems(dados)
        .show(d3.event.pageX, d3.event.pageY);
    })
    .on('mouseout', d => {
      tooltip
        .hide();
    })

    this.axis(yScale, xScale);

    return this;
  }

  private axis(yscale, xscale){
    this.taskAxis(yscale);
    this.timeAxis(xscale);
  }
  private taskAxis(yscale){
    let edges = this.getDrawEdges();
    let taskAxis = d3.axisLeft(yscale)
      .tickSize(-this.getDrawWidth());

    this.root
      .append('g')
      .attr('id', 'task-axis')
      .attr('class', 'axis')
      .attr('transform', `translate(${edges.left}, 0)`)
      .call(taskAxis)
  }
  private timeAxis(xscale){
    let edges = this.getDrawEdges();
    let height = this.getDrawHeight();

    let hourAxis = d3.axisBottom(xscale)
      .ticks(d3.timeMinute.every(30))
      .tickSize(-height)
      .tickFormat(d3.timeFormat('%H:%M'));


      this.root
        .append('g')
        .attr('id', 'time-axis')
        .attr('class', 'axis')
        .attr('transform', `translate(0, ${edges.bottom})`)
        .call(hourAxis)
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
