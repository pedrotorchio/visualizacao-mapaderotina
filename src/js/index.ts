declare var d3;
declare var firebase;

import D3Visualization from './components/D3Visualization';
import App from './App';
import * as $ from 'jquery';

let app = new App('#cabecalho');

$(()=>{
  d3.json('/assets/tasks-joão.json', data=>{
    app.setData(data);
    app.updateCharts();
  });
});
