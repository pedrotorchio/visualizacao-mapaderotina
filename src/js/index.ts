declare var d3;

import D3Visualization from './components/D3Visualization';
import App from './App';
import * as $ from 'jquery';

let app = new App();

$(()=>{
  d3.json('/assets/tasks-joão.json', data=>{
    app.setData(data);
  });
});
