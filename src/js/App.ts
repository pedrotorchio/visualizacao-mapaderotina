declare var d3;
import * as $ from 'jquery';
import Sizes from './components/iSizes';
import Visualization from './components/D3Visualization';
import Gantt from './components/D3GanttComponent';
import Counter from './lib/Counter';
import * as specs from './specs';


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

    let fWidth = specs.getSizes('width') as number;
    let fHeight = specs.getSizes('height') as number;
    let fPadding = specs.getSizes('padding') as number;

    svg
      .placeIn('#app')
      .setSizes(specs.getSizes() as Sizes);

    gantt
      .placeIn(svg)
      .setSizes({
        width:  fWidth *.6,
        height: fHeight *.8,
        padding: fPadding
      })
      .setPosition({
        left: 0,
        top: 0
      })
      .configRects(specs.configRects);

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

      data.tasks = specs.reconfigureTasks(data.tasks, this.dictionary);

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
