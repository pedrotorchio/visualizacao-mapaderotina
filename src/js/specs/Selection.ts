declare var d3 : any;
import Statistics from './Statistics';
import Informer from './Informer';

export default class Selection{
  private static instance = null;
  selected:any = [];
  statistics:Statistics = null;
  currTask:any = null;
  private constructor(){

  }
  public static getInstance(){
    if(Selection.instance == null)
      Selection.instance = new Selection();

    return Selection.instance;
  }
  public toggleSelection(task = null){
    let informer = Informer.getInstance('#informer').clear();

    if(task !== null){
      let index = this.exists(task);

      if(index !== -1)
        this.deselect(index);
      else
        this.select(task);
    }
    else{
      this.currTask = null;
      this.dispatch('all');
    }

    this.inform();

    return this;
  }
  public exists(task){
    let index = this.selected.findIndex(item=>item.id == task.id);

    if(index === undefined)
      index = -1;

    return index;
  }
  public select(task){
    this.selected.push(task);

    this.currTask = this.getDomElement(task.id).classed('selected', true);
    this.dispatch('select');
    return this;
  }
  public deselect(index){

    let id = this.selected[index].id;

    this.selected.splice(index, 1);

    this.currTask = this.getDomElement(id).classed('selected', false);

    this.dispatch('deselect');

    return this;
  }
  public getStatistics(){
    let stats = null;
    if(this.selected.length > 0)
      this.statistics = Statistics.newInstance(this.selected);
    else
      this.statistics = Statistics.getInstance();

    return this.statistics.getData();
;
  }
  private getDomElement(taskid){
    return d3.select(`rect#rect-${taskid}`);
  }
  private categoriasList(stats:any){
    let list = [];
    stats.catList.forEach(cat => {
      let count = stats.catCount[cat];
      let duracao = stats.catDuration[cat];

      list.push(`${cat}: ${count}, ${Statistics.min2hrStr(duracao)}`);
    });
    return list;
  }
  private independenciaList(stats){
    let iSum = 0;
    let iCount = 0;
    let list = [];
    let dura = stats.duracao;
    for(var i = 1 ; i <= 7 ; i++){
      let ind = `${i}`;
      if(stats.independenciaCount[ind] !== undefined)
      {
        let count = stats.independenciaCount[ind];
        let durat = stats.independenciaDuration[ind];
        let duraS = Statistics.min2hrStr(durat);

        list.push(`${ind}: ${count}, ${duraS} (${(durat*100/dura).toFixed(1)}%)`);

        iCount += durat;
        iSum += durat * i;
      }
    }
    list.push(`Média: ${(iSum/iCount).toFixed(1)}`);

    return list;
  }

  private passividadeList(stats){
    let dura = stats.duracao;
    let list = [];

    ['Ativo', 'Passivo'].forEach(pas => {

      if(stats.passividadeCount[pas] !== undefined)
      {
        let count = stats.passividadeCount[pas];
        let durat = stats.passividadeDuration[pas];
        let duraS = Statistics.min2hrStr(durat);

        list.push(`${pas}: ${count}, ${duraS} (${(durat*100/dura).toFixed(1)}%)`);
      }
    });

    return list;
  }
  private inform(){
    let informer = Informer.getInstance('#informer');
    let stats = this.getStatistics();
    let duracao = Statistics.min2hrStr(stats.duracao);
    let count = this.selected.length || stats.taskNumber;

    informer.addList(
            this.categoriasList(stats),
            'CATEGORIAS');

    informer.addList(
            this.independenciaList(stats),
            'INDEPENDÊNCIA');

    informer.addList(
            this.passividadeList(stats),
            'PASSIVIDADE');

    informer.setTitle(`${count} Atividades`);
    informer.setSubtitle(duracao);

    return this;
  }
  private dispatch(action){
    let event = new CustomEvent('toggleSelection', {
      detail: {
        stats:this.getStatistics(),
        task: this.currTask,
        action
      },
      bubbles: true,
      cancelable: false
    });

    document.getElementsByTagName('body')[0].dispatchEvent(event);

    return this;
  }
}
