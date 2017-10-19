declare var d3;
import D3Visualization from './components/D3Visualization';
import Gantt from './components/D3GanttComponent';


export default class App{
  data:any[];
  meta;
  dictionary;

  constructor(){
    this.data = [];
    this.meta = {};

    this.dictionary = {};

    this.updateDictionary();
  }
  updateDictionary(){

    d3.json('/assets/dictionary.json', data=>{
      console.log('Carregando Dicionário');
      this.dictionary = data;
      console.log(data);
    });
  }
  updateCharts(){
    console.log('Gerando visualizações');

    // this.___generateGantt();
  }
  ___generateContainer(){
    // let timeFormat = this.dictionary.format.hora;
    // let horaScale = this.___getHoraScale();
    // let dimensions = this.getDimensions();
    // let container = new D3Visualization({
    //   width: dimensions.width,
    //   height: dimensions.height,
    //   padding: dimensions.padding
    // },'#app', 'diary');
    //
    //   container.setPadding(dimensions.padding)
    //            .setAxis('bottom', ()=>{
    //               return d3.axisBottom(horaScale)
    //                        .tickFormat(d3.timeFormat(timeFormat));
    //             })
    //            .showGrid();
    //
    //   return container;
  }
  // ___generateGantt(){
  //   let sizes = this.getDimensions();
  //   let horaScale = this.___getHoraScale();
  //
  //   this.svg = d3.select('#app')
  //     .append('svg')
  //     .classed('visualization', true)
  //     .attr('width', sizes.width)
  //     .attr('height', sizes.height);
  //
  //   this.g  = this.svg
  //     .append('g')
  //     .attr('width', sizes.width - 2*sizes.padding)
  //     .attr('height', sizes.height - 2*sizes.padding)
  //     .attr('tranform', `translate(${sizes.padding}, ${sizes.padding})`)
  //     .attr('class','element-root');
  //
  //   this.svg
  //     .selectAll('.task')
  //     .data(this.data).enter()
  //     .append('rect')
  //     .attr('rx', 5)
  //     .attr('ry', 5)
  //     .attr('class', d=>{
  //         let classe = 'undefined';
  //         switch(d.classe){
  //           case 0:
  //             classe ='passivo';
  //             break;
  //           case 1:
  //             classe = 'ativo';
  //           break;
  //         }
  //         return classe;
  //     })
  //     .attr('y', 0)
  //     .attr('transform', d=>{
  //       return `translate(0, ${d.task*40})`;
  //     })
  //     .attr('height', 40)
  //     .attr('width', 100);
  // }
  // ___getCategoriaScale(){
  //   let categorias = this.dictionary.categoria;
  //   let colorScale = d3.scaleLinear()
  //       .domain([0, categorias.length-1])
  //       .range(['#00B9FA', '#F95002'])
  //       .interpolate(d3.interpolateHcl);
  //
  //   return colorScale;
  // }
  // ___getHoraScale(){
  //   let sizes  = this.getDimensions();
  //   let width  = sizes.width - 2*sizes.padding;
  //
  //   let domain = [this.data[0], this.data.slice(-1)[0]];
  //
  //   return d3.scaleTime()
  //             .domain(domain)
  //             .range([0, width])
  //             .clamp(true);
  // }
  //
  // getDimensions(){
  //   let doc       = this.___getDocumentDimensions();
  //   let padding   = 5;
  //   let width     = doc.width-20*padding;
  //   let height    = doc.height-20*padding;
  //   let barHeight = 4*padding;
  //   return {
  //
  //     width,
  //     height,
  //     padding,
  //     barHeight
  //   };
  // }

  init(){

  }
  setData(data){
    /**
     * desencadeia a geração da visualização
     */
    data.tasks = this._reconfigureTasks(data.tasks);

    console.log('Dados recebidos');
    console.log(data);

    // this.___setTimeDiary(data.tasks);
    // this.___setMetaData(data.meta);

    this.updateCharts();
  }
  private _reconfigureTasks(tasks){
    /** reformata array de atividades
      *
      */

    let format:string;
        format = this.dictionary.format.hora;
        format = d3.timeParse(format);

    tasks.map(task=>{
      task = this._getDictionaryMeta(task);
      // task.inicio = format(task.inicio);

      // // randomicamente setar se ativo (1) ou passivo (0)
      // task.classe = Math.round(Math.random()*100)%2;

      return task;
    });
    tasks = tasks.sort((a,b)=>a.inicio-b.inicio);

    return tasks;
  }
  private _getDictionaryMeta(task){
    let dictionary               = this.dictionary;
    let taskName:string          = dictionary.task[task.task];
    let localName:string         = dictionary.local[task.local];
    let companhiaName:string     = dictionary.companhia[task.companhia];
    let dependenciaName:string   = dictionary.dependencia[task.dependencia];
    let simultaneaName:string    = dictionary.task[task.simultanea] || '';

    let categoria = dictionary.categoria.filter(categoria=>{
      let taskId:number = parseInt(task.task);
      return categoria.tasks.includes(taskId);
    });
    console.log(categoria);
    let categoriaName     = categoria.titulo;

    // $.extend(task, {
    //   taskName,
    //   localName,
    //   companhiaName,
    //   dependenciaName,
    //   categoriaName
    // });
    return task;
  }
  // ___setTimeDiary(diary){
  //   this.data = diary;
  // }
  // ___setMetaData(meta){
  //   this.meta = meta;
  // }
  // ___getDocumentDimensions(){
  //   let height = Math.max($(document).height(), $(window).height());
  //   let width = Math.max($(document).width(), $(window).width());
  //
  //   return {
  //     height,
  //     width
  //   };
  // }
}
