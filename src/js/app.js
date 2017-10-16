import $ from 'jquery';

export default class App{
  constructor(){}

  onDoneLoading(callback){
    $(()=>{

      getTasks(callback);


    });
  }
  ___getTasks(callback){
    d3.json('');
  }
}
