import Selection from '../specs/Selection';
import Informer from '../specs/Informer';

export class D3SelectionClick{


  private constructor(){}
  public static getCallable(){
    return D3SelectionClick.callable;
  }
  private static callable(element){
    let selection = Selection.getInstance();

    selection.toggleSelection();
    element
      .on('click', (d, index, group)=>{

        selection.toggleSelection(d);

      });
  }
}
