declare var d3;
/**
 * WRAPPER PARA SVG
 */
export class D3Visualization{
    static root:string = 'svg';

    // private context:string;
    // private width:number;
    // private height:number;
    //
    constructor(private context:string, private width:number, private height:number){}

    public makeSvg(){
      return d3.select(this.context)
        .append(D3Visualization.root)

        .attr('width', this.width)
        .attr('height', this.height);
    }
    public getWidth(){
      return this.width;
    }
    public getHeight(){
      return this.height;
    }

}
