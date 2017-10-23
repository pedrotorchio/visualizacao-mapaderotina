declare var d3;
import D3Subcomponent from './D3Subcomponent';
import D3Component from './D3Component';

export default class D3AxisComponent extends D3Subcomponent{
  static type:string = 'axis';
  protected scale;
  protected type;
  protected axis;
  constructor(name:string, axis){
    super(`${name}-${D3AxisComponent.type}`, D3AxisComponent.type);
    this.axis = axis;
  }
  placeIn(context:string|D3Component){
    super.placeIn(context);

    this.getElement()
      .call(this.axis);

    return this;
  }
}
