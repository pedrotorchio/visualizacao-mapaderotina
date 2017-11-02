declare var d3;
import * as $ from 'jquery';
import Sizes from './components/iSizes';
import Visualization from './components/D3Visualization';
import Gantt from './components/D3GanttComponent';
import Axis from './components/D3AxisComponent';
import Counter from './lib/Counter';
import Scales from './specs/Scales';
import Formatter from './specs/Formatter';
import Config from './specs/Config';


export default class App{
  private diary:any[];
  private meta;
  private dictionary;
  private dictionaryUrl:string = '/assets/dictionary.json';

  constructor(){
    this.diary = [];
    this.meta = {};

    this.dictionary = {};

    this.updateDictionary();
  }
  updateDictionary(){
    let time = new Counter('Carregar dicionario');

    d3.json(this.dictionaryUrl, data=>{
      console.log('Carregando Dicionário');
      this.dictionary = data;
      console.log(data);

      time.end();
    });
  }
  updateCharts(){
    let time = new Counter('Gerar visualizações');

    let svg = new Visualization('gantt-chart');
    let gantt = new Gantt('main', this.diary);

    let fWidth = Config.sizes.width;
    let fHeight = Config.sizes.height;
    let fPadding = Config.sizes.padding;
    let leftPaneWidth = 80;
    let scales  = new Scales(gantt);

    svg
      .placeIn('#app')
      .setSizes(Config.sizes);

    gantt
      .placeIn(svg)
      .setSizes({
        width:  fWidth-leftPaneWidth,
        height: fHeight,
        padding: fPadding
      })
      .setPosition({
          left: leftPaneWidth,
          top: 0
      })
      .configRects(function(rects){
          let xScale = scales.getXScale();
          let yScale = scales.getYScale();
          let wScale = scales.getWidthScale();
          let height = scales.getHeightScale();

          rects
            .attr('class', d=>scales.getClass(d))
            .attr('transform', d=>{
              let time = d.inicio;
                  time = xScale(time);
              let task = d.taskName;
                  task = yScale(task);

              return `translate(${time}, ${task})`;
            })
            .attr('height', height)
            .attr('width', d=>wScale(d.duracao))
      });
    let ganttSizes = gantt.getSizes();
    let taskAxis = d3.axisLeft(scales.getYScale())
    // fwidth - leftpanewidth - padding
      .tickSize(-(fWidth - leftPaneWidth - 2*fPadding));
    let hourAxis = d3.axisBottom(scales.getXScale())
      .ticks(d3.timeMinute.every(30))
      .tickSize(-560)
      .tickFormat(d3.timeFormat('%H:%M'));

    let ganttsizes = gantt.getSizes();

    svg.getElement()
      .append('g')
      .attr('id', 'task-axis')
      .attr('class', 'axis')
      .attr('transform', `translate(${leftPaneWidth + ganttsizes.padding}, 0)`)
      .call(taskAxis)

    svg.getElement()
      .append('g')
      .attr('id', 'hour-axis')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${fHeight-fPadding})`)
      .call(hourAxis)

    time.end();
  }
  /*****
   *
   * SETDATA
   *
   ****/
    setData(data){
      /**
       * desencadeia a geração da visualização
       */
      let time  = new Counter('Setar dados');
      let formatter = new Formatter(data.tasks, this.dictionary);

      data.tasks = formatter.getFormattedTasks();

      console.log('Dados recebidos');
      console.log(data);

      this.setDiary(data.tasks);
      this.setMeta(data.meta);

      time.end();
      this.updateCharts();

      return this;
    }
    private setDiary(diary:any[]){
      this.diary = diary;
    }
    private setMeta(meta:any){
      this.meta = meta;
    }
  }
