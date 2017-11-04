declare var d3 : any;
import Statistics from './Statistics';
import Informer from './Informer';

export default class Selection{
  private static instance = null;
  selected:any = [];
  statistics:Statistics = null;
  private constructor(){}
  public static getInstance(){
    if(Selection.instance == null)
      Selection.instance = new Selection();

    return Selection.instance;
  }
  public toggleSelection(task){
    let informer = Informer.getInstance('#informer');

    let index = this.exists(task);

    if(index !== -1)
      this.deselect(index);
    else
      this.select(task);

    let count = this.selected.length;

    if(count > 0)
    {
      let stats = this.statistics.getData();
      informer.setTitle(`${count} Atividades`);
      informer.setSubtitle(`${stats.inicio} - ${stats.fim}`);
    }else
      informer.hide();

    return index == -1 ? true : false;
  }
  public exists(task){
    let index = this.selected.findIndex(item=>item.id == task.id);
    console.log(index);

    if(index === undefined)
      index = -1;

    return index;
  }
  public select(task){
    this.selected.push(task);
    this.statistics = Statistics.newInstance(this.selected);

    this.getDomElement(task.id).classed('selected', true);

    return this;
  }
  public deselect(index){

    let id = this.selected[index].id;

    this.selected.splice(index, 1);
    this.statistics = Statistics.newInstance(this.selected);

    this.getDomElement(id).classed('selected', false);


    return this;
  }
  public getStatistics(){
    return this.statistics.getData();
  }
  private getDomElement(taskid){
    return d3.select(`rect#rect-${taskid}`);
  }
}
