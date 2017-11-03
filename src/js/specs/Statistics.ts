declare var d3 : any;
import Counter from '../lib/Counter';

export default class Statistics{
  private static instance:Statistics = null;
  statistics:any = {};

  private constructor(private data){
    let count = new Counter('Extrair Estatísticas');
      this.extractStatistics();
    count.end();
  }
  public static getInstance(data?){
    if(Statistics.instance == null)
      if(data == undefined)
        throw 'Statistics: falta dados';
      else
        Statistics.instance = new Statistics(data);

    return Statistics.instance;
  }
  public getData(){
    return this.statistics;
  }
  private extractStatistics(){

    this.taskStatistics();
    this.dayBoundaries();

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
    console.log(data);
    let forma = d3.timeFormat("%H:%M");
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
}
