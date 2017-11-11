declare var d3 : any;
import Counter from '../lib/Counter';

export default class Statistics{
  private static instance:Statistics = null;
  statistics:any = {};

  private constructor(private data){
    let count = new Counter('Extrair Estatísticas');
      this.extractStatistics();

      console.log(this.statistics);

    count.end();
  }
  public static min2hrStr(min){
    let hr:any = Math.floor(min/60);
        hr = hr > 0 ? `${hr}h` : '';
    let mn:any = min%60;
        mn = mn > 0 ? `${mn}min` : '';

    return hr + mn;
  }
  public static newInstance(data){
    let newinstance = null;

    if(data.length == 0)
      newinstance = Statistics.getInstance();
    else
      newinstance = new Statistics(data);

    return newinstance;
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

    this.order();
    this.taskStatistics();
    this.dayBoundaries();

  }

  private order(){
    this.data = this.data.sort((a,b)=>a.horario-b.horario);
  }

  private taskStatistics(){
    let data = this.data;

    this.statistics.catList = [];
    this.statistics.taskList = [];
    let taskListAux:any = [];
    this.statistics.taskNumber = data.length;
    this.statistics.duracao = 0;

    data.forEach(task=>{
      this.statistics.duracao += task.duracao;

      let catName = task.categoriaName;
      let taskName = task.taskName;
      let independencia = `${task.independencia}`;
      let passividadeName = task.passividade;

      this.addDuracao('catDuration', catName, task.duracao);
      this.addDuracao('taskDuration', taskName, task.duracao);
      this.addDuracao('independenciaDuration', independencia, task.duracao);
      this.addDuracao('passividadeDuration', passividadeName, task.duracao);

      this.incrementCount('passividadeCount', passividadeName);
      this.incrementCount('taskCount', taskName);
      this.incrementCount('catCount', catName);
      this.incrementCount('independenciaCount', independencia);

      if(!this.statistics.catList.includes(task.categoriaName))
        this.statistics.catList.push(task.categoriaName);

      if(!taskListAux.includes(task.task))
        this.statistics.taskList.push({
          id:task.task,
          name:task.taskName
        });
      taskListAux.push(task.task);
    });
    // calcular media da independencia
    // contar classe
  }
  private incrementCount(stat, name){
    if(this.statistics[stat] === undefined)
      this.statistics[stat] = {};

    let last  = (this.statistics[stat][name] || 0);
    this.statistics[stat][name] = 1 + last;
  }
  private addDuracao(stat, name, duracao){
    if(this.statistics[stat] === undefined)
      this.statistics[stat] = {};

    let last = (this.statistics[stat][name] || 0);
    this.statistics[stat][name] = duracao + last;
  }
  private dayBoundaries(){

    // Arredondar hora inicial pra baixo
    let data = this.data;

    const c = 1000 * 60 * 60;
    let inicio = this.data[0]
        this.statistics.inicio = inicio.inicio;
        inicio = inicio.horario.getTime();
        inicio = Math.round(inicio/c) * c;
        inicio = new Date(inicio);

    let fim    = data.slice(-1)[0];
        this.statistics.fim = fim.fim;
        fim    = fim.horario.getTime() + fim.duracao * (60 * 1000);
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
