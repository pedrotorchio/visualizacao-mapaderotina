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

    this.taskStatistics();
    this.dayBoundaries();
    console.log(this.statistics)

  }
  private taskStatistics(){
    let data = this.data;

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
        this.statistics.taskList.push({
          id:task.task,
          name:task.taskName
        });

      this.statistics.catCount[catName] = 1 + (this.statistics.catCount[catName] || 0)
      this.statistics.taskCount[taskName] = 1 + (this.statistics.taskCount[taskName] || 0)
    })
  }
  private dayBoundaries(){
    // Arredondar hora inicial pra baixo
    let data = this.data;
    const c = 1000 * 60 * 60;
    let inicio = this.data[0].inicio.getTime();
        inicio = Math.round(inicio/c) * c;
        inicio = new Date(inicio);

    let fim    = data.slice(-1)[0];
        fim    = fim.inicio.getTime() + fim.duracao * (60 * 1000); // inicio + duracao
        fim    = Math.ceil(fim/c) * c;
        fim    = new Date(fim);

    this.statistics['dayStartMin'] = inicio;
    this.statistics['dayEndMin']   = fim;

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

    return d3.scaleTime()
              .domain(domain)
              .range(range);

  }

  getYScale(){
    let drawEdges = this.component.getDrawEdges();
    let sizes  = this.component.getSizes();
    let domain = this.statistics.taskList.map(t=>t.name);
    let range  = [drawEdges.top, drawEdges.bottom];

    return d3.scaleBand()
              .domain(domain)
              .range(range);
  }
  getWidthScale(){
    let drawSizes = this.component.getDrawSizes();
    let diff   = this.ms2min(this.statistics['dayEndMin'].getTime() - this.statistics['dayStartMin'].getTime());
    let domain = [0, diff]
    let range  = [0, drawSizes.width];

    return d3.scaleLinear()
              .domain(domain)
              .range(range);
  }
  getHeightScale(){
    let drawHeight = this.component.getDrawSizes().height;
    let taskCount   = this.statistics.taskList.length;

    return ()=>drawHeight/(taskCount);
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
