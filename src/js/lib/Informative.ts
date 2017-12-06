declare var d3 : any;

export default class Informative{

  protected element; protected h1; protected h2; protected div;

  protected constructor(selector){

    this.element = d3.select(selector).classed('informative', true);
    this.h1 = this.element.select('h1');
    this.h2 = this.element.select('h2');
    this.div = this.element.select('div');
  }
  public addList(lis:any[], title?:string){

    if(title !== undefined){
      this.div.append('h3').html(title);
    }
    let ul = this.div.append('ul');

    lis.forEach(li=>{
      ul.append('li').html(li);
    });

    return this;
  }
  public setTitle(title:string){
    this.h1.html(title);
    return this;
  }
  public setSubtitle(title:string){
    this.h2.html(title);
    return this;
  }
  public setText(text:string){
    this.div.html(text);
    return this;
  }

  public show(){
    this.element
      .classed('shown', true);

      return this;
  }
  public clear(){
    this.h1.html('');
    this.h2.html('');
    this.div.html('');

    return this;
  }
  public hide(){

    this.element
      .classed('shown', false);

      return this;
  }
}
