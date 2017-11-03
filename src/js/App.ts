declare var d3;
import * as $ from 'jquery';
import Counter from './lib/Counter';
import Statistics from './specs/Statistics';
import Formatter from './specs/Formatter';
import {Gantt} from './Gantt';


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

    new Gantt(this.diary, '#app');

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
    }
  }
