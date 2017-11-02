declare var d3;
import * as $ from 'jquery';

export default class Formatter{
  protected tasks;
  protected dictionary;

  constructor(tasks, dictionary){
    this.tasks = tasks;
    this.dictionary = dictionary;
  }

  getFormattedTasks(){
    let tasks = this.tasks;
    let dictionary = this.dictionary;

    /** reformata array de atividades
      *
      */
    let format;
        format = dictionary.format.hora;
        format = d3.timeParse(format);

    tasks.map(task=>{
      // pegar nomes das variaveis
      task = this.getDictionaryMeta(task);
      // parsear inicio em objecto Date
      task.inicio = format(task.inicio);

      return task;
    });
    // ordenar por hora de inicio
    tasks = tasks.sort((a,b)=>a.inicio-b.inicio);

    return tasks;
  }
  private getDictionaryMeta(task){
    let dictionary = this.dictionary;

      let taskName:string          = dictionary.task[task.task] || '';
      let localName:string         = dictionary.local[task.local] || '';
      let companhiaName:string     = dictionary.companhia[task.companhia] || '';
      let dependenciaName:string   = dictionary.dependencia[task.dependencia] || '';
      let simultaneaName:string    = dictionary.task[task.simultanea] || '';
      let categoriaName:string     = this.getCategoriaForTaskId(task.task) || '';

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
  private getCategoriaForTaskId(taskId:number):string{

    let categoria = this.dictionary.categoria.filter(
      categoria=>categoria.tasks.includes(taskId)
    )[0];

    return categoria.titulo;
  }
}
