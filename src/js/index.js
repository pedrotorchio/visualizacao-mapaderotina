import D3Visualization from './components/D3Visualization';
import App from './App';
import $ from 'jquery';

let APP = new App();
APP.onPageReady(function(){
  fakeuserinputevent();
});

function fakeuserinputevent(){
  d3.json('/assets/tasks-joão.json', data=>{
    APP.setData(data);
  });
}
