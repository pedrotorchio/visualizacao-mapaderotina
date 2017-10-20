declare var d3;
import D3Subcomponent from '../components/D3Subcomponent';

export default class Scales{
  component:D3Subcomponent;
  data:any[];

  statistics:any = {
  };
  constructor(component:D3Subcomponent){
    this.component = component;
    this.data      = component.getData();

    this.extractStatistics();
  }
  private extractStatistics(){
    let data      = this.data;

    // Arredondar hora inicial pra baixo
    const c = 1000 * 60 * 60;
    let inicio = this.data[0].inicio.getTime();
        inicio = Math.round(inicio/c) * c;

    let fim    = data.slice(-1)[0];
        fim    = fim.inicio.getTime() + fim.duracao * (60 * 1000); // inicio + duracao
        fim    = Math.ceil(fim/c) * c;

    this.statistics['dayStartMin'] = this.ms2min(inicio);
    this.statistics['dayEndMin']   = this.ms2min(fim);

    this.statistics.catList = [];
    this.statistics.catCount = {};
    this.statistics.taskList = [];
    this.statistics.taskCount = {};

    data.forEach(task=>{
      let catName = task.categoriaName;
      let taskName = task.taskName;

      if(this.statistics.catCount[catName] === undefined)
        this.statistics.catList.push(task.categoriaName);
      if(this.statistics.taskCount[taskName] === undefined)
        this.statistics.taskList.push(task.task);

      this.statistics.catCount[catName] = 1 + (this.statistics.catCount[catName] || 0)
      this.statistics.taskCount[taskName] = 1 + (this.statistics.taskCount[taskName] || 0)
    })
  }
  private extractCategoriesList(){
    this.data.map(task=>{
      console.log(task);
    });
  }
  getXScale(){
    let drawEdges = this.component.getDrawEdges();

    let inicio = this.statistics.dayStartMin;
    let fim    = this.statistics.dayEndMin;

    let domain = [inicio,fim];
    let range  = [drawEdges.left, drawEdges.right];

    let xScale = d3.scaleTime()
                    .domain(domain)
                    .range(range);

    return (dateobj)=>xScale(this.ms2min(dateobj.getTime()));
  }

  getYScale(){
    let drawEdges = this.component.getDrawEdges();

    let domain = this.statistics.taskList;
    let range  = [drawEdges.top, drawEdges.bottom];

    return d3.scaleBand()
              .domain(domain)
              .range(range);
  }
  getWidthScale(){
    let drawSizes = this.component.getDrawSizes();
    let diff = this.statistics['dayEndMin'] - this.statistics['dayStartMin'];
    let domain = [0, diff]
    let range  = [0, drawSizes.width];

    return d3.scaleLinear()
              .domain(domain)
              .range(range);
  }
  getHeightScale(){


    return ()=>40;
  }
  getClass(task){
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
