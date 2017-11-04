declare var d3 : any;

export default class Informer{

  protected element; protected ul; protected h1; protected h2;

  protected constructor(selector){

    this.element = d3.select(selector);
    this.ul = this.element.select('ul');
    this.h1 = this.element.select('h1');
    this.h2 = this.element.select('h2');
  }

  public setTitle(title:string){
    this.element.select('h1').html(title);
    return this;
  }
  public setSubtitle(title:string){
    this.element.select('h2').html(title);
    return this;
  }
  public listItems(array){
    this.ul.html('');
    array.forEach(item => {
      this.ul.append('li').html(item);
    })

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
    this.ul.html('');

    return this;
  }
  public hide(){

    this.element
      .classed('shown', false);

    // this.clear();

      return this;
  }
}
