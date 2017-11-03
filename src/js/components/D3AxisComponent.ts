declare var d3;
import {D3Component, iD3Callable} from '.';

export abstract class D3AxisComponent implements iD3Callable{
  static type:string = 'axis';

  constructor(protected scale, protected id:string, protected classes:string = ''){}

  action(element:D3Component){
    let axis = this.getAxis(element);

    let x = this.getXTranslate(element);
    let y = this.getYTranslate(element);

    element.getRoot()
    .append('g')
    .attr('id', this.id)
    .attr('class', `axis ${this.classes}`)
    .attr('transform', `translate(${x}, ${y})`)
    .call(axis);

    return this;
  }
  protected abstract getAxis(element:D3Component);
  protected abstract getXTranslate(element:D3Component):number;
  protected abstract getYTranslate(element:D3Component):number;
}
