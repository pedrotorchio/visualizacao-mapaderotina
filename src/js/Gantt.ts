declare var d3: any;

import {D3Visualization, D3GanttComponent} from './components';

export default class Gantt{

  width:number = 1000;
  height:number = 600;
  padding:number = 10;

  constructor(private data:any, private context:string){
    this.rebuild();
  }
  rebuild(){

    const GANTT_WIDTH_FRACTION = .9;


    let svg = new D3Visualization(this.context, this.width, this.height)
        .makeSvg();
    let gantt = new D3GanttComponent(this.data)
        .setSize(
          this.getDrawWidth(GANTT_WIDTH_FRACTION),
          this.getDrawHeight()
        )
        .setPosition(
          this.getDrawWidth(1-GANTT_WIDTH_FRACTION),
          0
        )
        .placeIn(svg);

  }

  getDrawWidth(fraction:number = 1)
  {
    return (this.width - 2*this.padding) * fraction;
  }
  getDrawHeight(fraction:number = 1){
    return (this.height - 2*this.padding) * fraction;
  }
}
