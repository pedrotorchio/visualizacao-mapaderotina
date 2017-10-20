declare var d3;
import * as $ from 'jquery';
import Sizes from './components/iSizes';
import Visualization from './components/D3Visualization';
import Gantt from './components/D3GanttComponent';
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

    svg
      .placeIn('#app')
      .setSizes(Config.sizes);



    gantt
      .placeIn(svg)
      .setSizes({
        width:  600,
        height: 500,
        padding: fPadding
      })
      .setPosition({
          left: 200,
          top: 0
      })
      .configRects(function(rects){
          let scales = new Scales(this);

          let xScale = scales.getXScale();
          let yScale = scales.getYScale();
          let wScale = scales.getWidthScale();
          let height = scales.getHeightScale();

          rects
            .attr('class', d=>scales.getClass(d))
            .attr('transform', d=>{
              let time = d.inicio;
                  time = xScale(time);
              let task = d.task;
                  task = yScale(task);

              return `translate(${time}, ${task})`;
            })
            .attr('height', height)
            .attr('width', d=>wScale(d.duracao))
      });

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
