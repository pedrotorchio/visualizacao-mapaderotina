import Selection from '../specs/Selection';

export class D3SelectionClick{


  private constructor(){}
  public static getCallable(){
    return D3SelectionClick.callable;
  }
  private static callable(element){
    let selection = Selection.getInstance();


    element
      .on('click', (d, index, group)=>{

        selection.toggleSelection(d);

        console.log(selection.getStatistics());
      });
  }
}
