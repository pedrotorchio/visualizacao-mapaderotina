declare var d3;

import D3Visualization from './components/D3Visualization';
import App from './App';
import * as $ from 'jquery';

let app = new App('#cabecalho');
let informerShown = true;

$(()=>{

  $('.slideInBtn').on('click', function(){
    let target = $(this).attr('data-target');
    console.log(target);
    $('nav').addClass('hidden');
    $(target).addClass('shown');
  });
  $('.slideInContent').on('click', function(){
    $(this).removeClass('shown');
    $('nav').removeClass('hidden');
  })

  d3.json('/assets/tasks-joão.json', data=>{
    app.setData(data);
    app.updateCharts();
  });
});
