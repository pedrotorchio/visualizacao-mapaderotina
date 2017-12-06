
declare var d3;
import Counter from './lib/Counter';
import Statistics from './specs/Statistics';
import Formatter from './specs/Formatter';
import {Gantt} from './Gantt';
import {Pizzas} from './Pizzas';
import * as SS  from 'screen-size';
import Informative from './lib/Informative';


export default class App extends Informative{
  private diary:any[];
  private meta;
  private dictionary;
  private dictionaryUrl:string = '/assets/dictionary.json';

  constructor(selector){
    super(selector);

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
    let size = SS();
    let time = new Counter('Gerar visualizações');

    new Gantt(this.diary, '#app')
        .setSize(size.x*.9, size.y*.4)
        .selectionCallback(ev=>{
          console.log('Gerando Independência Pizza');
        })
        .selectionCallback(ev=>{
          console.log('Gerando Passividade Pizza');
        })
        .build();

    new Pizzas(Statistics.getInstance().getData().independenciaDuration, '#app')
        .setPosition(0, size.y)
        .build();


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

      this.extractStatistics();

      return this;
    }
    private extractStatistics(){
      Statistics.getInstance(this.diary);
    }
    private setDiary(diary:any[]){
      this.diary = diary;
    }
    private setMeta(meta:any){
      this.meta = meta;

      this.setTitle(meta.nome);
      this.setSubtitle(`${meta.idade} anos`);
    }
  }
