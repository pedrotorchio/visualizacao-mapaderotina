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
    this.startTime = performance.now();
  }
  end(){
    this.endTime   = performance.now();

    console.info(
      `${this.titulo}:${this.endTime - this.startTime}ms`
    );
  }
}
