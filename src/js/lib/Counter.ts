export default class Counter{
  titulo:string;
  startTime;
  endTime;
  constructor(titulo:string, start:boolean = true){
    this.titulo = titulo;
    if(start)
      this.start();
  }
  start(){
    console.groupCollapsed(this.titulo);
    this.startTime = performance.now();
  }
  end(){
    this.endTime   = performance.now();

    console.info(
      `${this.titulo} levou ${(this.endTime - this.startTime).toFixed(3)}ms`
    );
    console.groupEnd();
  }
}
