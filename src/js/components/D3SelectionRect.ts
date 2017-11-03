import {iD3Callable, D3Component} from '.';
export class D3SelectionRect implements iD3Callable{
  element = null;
  previousElement = null;
	currentY		= 0;
	currentX		= 0;
	originX			= 0;
	originY			= 0;

  setElement(el){
    this.previousElement = this.element;
    this.element = el;
  }
  getNewAttr(){
    let cX = this.currentX;
    let cY = this.currentY;
    let oX = this.originX;
    let oY = this.originY;

    let x = cX < oX ? cX : oX;
    let y = cY < oY ? cY : oY;

    let width = Math.abs(cX-oX);
    let height = Math.abs(cY-oY);

    return {x, y, width, height};
  }
  getCurrentAttr(){
    let x = +this.element.attr('x');
    let y = +this.element.attr('y');
    let width = +this.element.attr('width');
    let height = +this.element.attr('height');

    return {x,y,width,height};
  }
  init(x,y){
    this.originX = x;
    this.originY = y;
    this.update(x,y)
  }
  update(x,y){
    this.currentX = x;
    this.currentY = y;

    this.element.attr(this.getNewAttr());
  }
  focus(){
    this.element
        .style('stroke', 'red')
        .style('stroke-width', '2.5');
  }
  remove(){
    this.element.remove();
    this.element = null;
  }
  removePrevious(){
    if(this.previousElement)
      this.previousElement.remove();
  }
  action(component:D3Component){
    this.element = component.getRoot().append('rect')
        .attr({x: 0, y:0,width:0,height:0})
        .classed('selection', true);
  }
}
