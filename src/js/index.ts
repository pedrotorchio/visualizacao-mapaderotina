declare var d3;

import D3Visualization from './components/D3Visualization';
import App from './App';

let APP = new App();
APP.onPageReady(function(){
  fakeuserinputevent();
});

function fakeuserinputevent(){
  d3.json('/assets/tasks-joão.json', data=>{
    APP.setData(data);
  });
}
