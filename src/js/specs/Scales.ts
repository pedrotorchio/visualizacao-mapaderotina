declare var d3;
import Statistics from './Statistics';

export default class Scales{

  statistics:any = {};
  constructor(private component){
      this.statistics = Statistics.getInstance().getData();
  }

  getXScale(){
    let drawEdges = this.component.getDrawEdges();

    let inicio = this.statistics.dayStartMin;
    let fim    = this.statistics.dayEndMin;

    let domain = [inicio,fim];
    let range  = [drawEdges.left, drawEdges.right];

    return d3.scaleTime()
              .domain(domain)
              .range(range);

  }

  getYScale(){
    let drawEdges = this.component.getDrawEdges();
    let domain = this.statistics.taskList.map(t=>t.name);
    let range  = [drawEdges.top, drawEdges.bottom];

    return d3.scaleBand()
              .domain(domain)
              .range(range);
  }
  getWidthScale(){
    let width = this.component.getDrawWidth();
    let diff   = this.ms2min(this.statistics['dayEndMin'].getTime() - this.statistics['dayStartMin'].getTime());
    let domain = [0, diff]
    let range  = [0, width];

    return d3.scaleLinear()
              .domain(domain)
              .range(range);
  }
  getHeightScale(){
    let drawHeight = this.component.getDrawHeight();
    let taskCount   = this.statistics.taskList.length;

    return ()=>drawHeight/(taskCount);
  }
  getClassScale(){
    return this.getClass;
  }
  getColorScale(){
    let colorScale = d3.scaleLinear()
      .domain([0, 100]);

    return task=>{
      console.log(task.classe);
      if(task.classe == 1)
        colorScale.range(['red', '#ffcccc']);

      else if(task.classe == 0)
        colorScale.range(['blue', '#ccccff']);

      else
        colorScale.range(['black', '#e6e6e6']);

      return colorScale((task.independencia ? task.independencia : 50))
    }
  }
  private independencia01(independencia0100){
    return independencia0100/100;
  }
  private getClass(task){
    let classe = 'undefined ';

    switch(task.classe){
      case 0:
        classe ='passivo ';
        break;
      case 1:
        classe = 'ativo ';
      break;
    }


    classe += `${task.taskName} `;
    classe += `${task.categoriaName} `;
    classe += `${task.companhiaName} `;
    classe += `${task.localName} `;
    classe += `${task.dependenciaName} `;
    classe += `${task.simultaniaName} `;

    return classe;
  }
  ms2min(ms){
    return ms / (60000);
  }
}
