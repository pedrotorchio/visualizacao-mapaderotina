declare var d3 : any;
export default class D3Tooltip{
  selection; ul; h1; h2;
  private static instance = null;
  private constructor(){
    this.selection = d3.select('#tooltip');
    this.ul = this.selection.select('ul');
    this.h1 = this.selection.select('h1');
    this.h2 = this.selection.select('h2');
  }
  public static getInstance(){
    if(D3Tooltip.instance == null)
      D3Tooltip.instance = new D3Tooltip();

      return D3Tooltip.instance;
  }
  public setTitle(title:string){
    this.h1.html(title);

    return this;

  }
  public setSubtitle(title:string){
    this.h2.html(title);

    return this;

  }
  public listItems(array){

    array.forEach(item => {
      this.ul.append('li').html(item);
    })

    return this;

  }
  public show(x, y){
    this.selection
      .style('left', `${x}px`)
      .style('top', `${y}px`)
      .classed('shown', true);
      return this;

  }
  public hide(){
    this.h1.html('');
    this.ul.html('');
    this.selection
      .classed('shown', false);

      return this;
  }
}
