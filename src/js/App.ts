declare var d3;


import Counter from './lib/Counter';
import Statistics from './specs/Statistics';
import Formatter from './specs/Formatter';
import {Gantt} from './Gantt';
import * as SS  from 'screen-size';
import Informative from './lib/Informative';
import Informer from './specs/Informer';
import {makePizzaToolTip, appendPizzaTo} from './lib/PizzaCreator';
import {startLoading, endLoading} from './lib/Loading';
import {D3Visualization} from './components/D3Visualization';
import Scales from './specs/Scales';

export default class App extends Informative{
  private diary:any[];
  private meta;
  private dictionary;
  private dictionaryUrl:string = 'assets/dictionary.json';

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
    Informer.getInstance().clear();
    let size = SS();

    let time = new Counter('Gerar visualizações');
    let context = '#app';
    startLoading(context);

    let appWidth = size.x*.8;

    let pizzaSide  = appWidth / 4;

    document.getElementById('pizzas-container').style.paddingLeft = `${appWidth*.05}px`;

    let pizza1Svg = new D3Visualization(
      '#pizza-1',
      pizzaSide,
      pizzaSide
    ).makeSvg();
    let pizza2vg = new D3Visualization(
      '#pizza-2',
      pizzaSide,
      pizzaSide
    ).makeSvg();
    let ganttContext = '#gantt-container';
    document.querySelector(ganttContext).innerHTML = '';

    new Gantt(this.diary, ganttContext)
        .setSize(appWidth, size.y*.4)

        .selectionCallback(ev=>{
          console.log('Gerando Independência Pizza');

          let data = ev.detail.stats.independenciaDuration;

          let color = Scales.getColorBlueScale();

          let pizza1 = this.makePizza('#pizza-1', 'Independência', data, {
            color: (ind)=>color(ind.key),
            side: pizzaSide,
            id: 'pizza-independencia'
          });
        })
        .selectionCallback(ev=>{
          console.log('Gerando Passividade Pizza');


          let data = ev.detail.stats.passividadeDuration;

          let color = Scales.getColorBlueScale();

          let pizza2 = this.makePizza('#pizza-2', 'Passividade', data, {
            color: (pass)=>{

              if(pass.key == 'Ativo')
                return 'blue';

              return 'red';
            },
            side: pizzaSide,
            id: 'pizza-passividade'
          });

        })
        .build();

    endLoading(context);
    this.loaded();
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

    public objectToArray(object){
      let resultingArray = [];
      for (var property in object) {
        if (object.hasOwnProperty(property)) {
            resultingArray.push({
              key: property,
              value: object[property]
            });
        }
      }
      return resultingArray;
    }
    public makePizza(context, title:string, data:any[], config){
      config.raio = config.side/2;

      document.querySelector(`${context} h3`).innerHTML = title;

      let svg    = d3.select(`${context} svg`);
          data   = this.objectToArray(data);
      let side   = config.side;



      let pizza = appendPizzaTo(svg, data, config);

      return pizza;
    }
    public loaded(){

    }
  }
