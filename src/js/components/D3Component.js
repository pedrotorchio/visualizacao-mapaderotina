export default class D3Component{
  constructor(){
    this.root    = null;

    this.___create();
  }
  ___create(){
    this.root = d3.select('body')
      .append('g').remove();
  }
}
