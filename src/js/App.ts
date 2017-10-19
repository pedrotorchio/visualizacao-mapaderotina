declare var d3;
import * as $ from 'jquery';
import D3Visualization from './components/D3Visualization';
import Gantt from './components/D3GanttComponent';


export default class App{
  diary:any[];
  meta;
  dictionary;
  dictionaryUrl:string = '/assets/dictionary.json';

  constructor(){
    this.diary = [];
    this.meta = {};

    this.dictionary = {};

    this.updateDictionary();
  }
  updateDictionary(){
    d3.json(this.dictionaryUrl, data=>{
      console.log('Carregando Dicionário');
      this.dictionary = data;
      console.log(data);
    });
  }
  


  /*****
   *
   * SETDATA
   *
   ****/
  setData(data):App{
    /**
     * desencadeia a geração da visualização
     */
    data.tasks = this._reconfigureTasks(data.tasks);

    console.log('Dados recebidos');
    console.log(data);

    this._setTimeDiary(data.tasks);
    this._setMetaData(data.meta);

    this.updateCharts();

    return this;
  }
  private _reconfigureTasks(tasks):any[]{
      /** reformata array de atividades
        *
        */
      let format;
          format = this.dictionary.format.hora;
          format = d3.timeParse(format);

      tasks.map(task=>{
        // pegar nomes das variaveis
        task = this._getDictionaryMeta(task);
        // parsear inicio em objecto Date
        task.inicio = format(task.inicio);
        // randomicamente setar se ativo (1) ou passivo (0)
        task.classe = Math.round(Math.random()*17)%4;

        return task;
      });
      // ordenar por hora de inicio
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
      let categoriaName:string     = this._getCategoriaForTaskId(task.task);

      $.extend(task, {
        taskName,
        localName,
        companhiaName,
        dependenciaName,
        categoriaName,
        simultaneaName
      });
      return task;
    }
    private _getCategoriaForTaskId(taskId:number):string{

      let categoria = this.dictionary.categoria.filter(
        categoria=>categoria.tasks.includes(taskId)
      )[0];

      return categoria.titulo;
    }
  updateCharts(){
    console.log('Gerando visualizações');

    // this.___generateGantt();
  }
  private _setTimeDiary(td:any[]){
    this.diary = td;
  }
  private _setMetaData(meta){
    this.meta = meta;
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
