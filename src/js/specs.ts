// declare var d3;
// import Sizes from './components/iSizes';
// import * as $ from 'jquery';
//
// let statistics = {};
//
// export function reconfigureTasks(tasks:any[], dictionary){
//   /** reformata array de atividades
//     *
//     */
//   let format;
//       format = dictionary.format.hora;
//       format = d3.timeParse(format);
//
//   let catUnique = {}
//   function extract(task){
//     if(catUnique[task.categoria] !== undefined)
//     {
//
//     }
//   }
//   tasks.map(task=>{
//     // pegar nomes das variaveis
//     task = getDictionaryMeta(task, dictionary);
//     // parsear inicio em objecto Date
//     task.inicio = format(task.inicio);
//     // randomicamente setar se ativo (1) ou passivo (0)
//     task.classe = Math.round(Math.random()*17)%4 === 0? 0 : 1;
//
//     return task;
//   });
//   // ordenar por hora de inicio
//   tasks = tasks.sort((a,b)=>a.inicio-b.inicio);
//
//   return tasks;
// }
// function getDictionaryMeta(task, dictionary){
//
//   let taskName:string          = dictionary.task[task.task];
//   let localName:string         = dictionary.local[task.local];
//   let companhiaName:string     = dictionary.companhia[task.companhia];
//   let dependenciaName:string   = dictionary.dependencia[task.dependencia];
//   let simultaneaName:string    = dictionary.task[task.simultanea] || '';
//   let categoriaName:string     = getCategoriaForTaskId(task.task, dictionary);
//
//   $.extend(task, {
//     taskName,
//     localName,
//     companhiaName,
//     dependenciaName,
//     categoriaName,
//     simultaneaName
//   });
//   return task;
// }
// function getCategoriaForTaskId(taskId:number, dictionary):string{
//
//   let categoria = dictionary.categoria.filter(
//     categoria=>categoria.tasks.includes(taskId)
//   )[0];
//
//   return categoria.titulo;
// }
// export function configRects(rects){
//   let xScale = getXScale(this.getDrawEdges(), this.getData())
//   let yScale;
//   let wScale = 100;
//   let height = 50;
//
//   rects
//     .attr('class', d=>ativoOrPassivo(d.classe))
//     .attr('transform', d=>{
//       let time = d.inicio.getTime();
//           time = xScale(time);
//       return `translate(${time}, ${d.task*40})`;
//     })
//     .attr('height', height)
//     .attr('width', wScale)
// }
//
// export function getSizes(which?:string):Sizes | number{
//   let width = 800;
//   let height = 600;
//   let padding = 5;
//
//   let sizes:any = {
//     width,
//     height,
//     padding
//   }, tmp;
//
//   if(which !== undefined && (tmp = sizes[which]) !== undefined)
//     sizes = tmp as number;
//
//   return sizes;
// }
//
// function ativoOrPassivo(cod){
//   let classe = 'undefined';
//   switch(cod){
//     case 0:
//       classe ='passivo';
//       break;
//     case 1:
//       classe = 'ativo';
//     break;
//   }
//   return classe;
// }
