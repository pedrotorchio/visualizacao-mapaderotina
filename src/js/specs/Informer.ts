declare var d3 : any;
import Informative from '../lib/Informative';

export default class Informer extends Informative{
  private static instance = null;

  private constructor(){
    super('#informer');
  }

  public static getInstance(element?){
    if(Informer.instance == null)
      Informer.instance = new Informer();

    return Informer.instance;
  }

}
