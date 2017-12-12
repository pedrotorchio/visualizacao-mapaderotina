declare var d3;

import D3Visualization from './components/D3Visualization';
import App from './App';
import * as $ from 'jquery';

let app = new App('#cabecalho');
let informerShown = true;

$(()=>{

  $('.slideInBtn').on('click', function(){
    let target = $(this).attr('data-target');
    navHide(target);
  });
  $('.slideInContent h1').on('click', function(){
    navShow();

  })

  d3.json('assets/pacientes.json', data=>{
    dataRecovered(data);
  });
});
function navHide(target){
  $('.slideInBtn').addClass('hidden');

  if(target)
    $(target).addClass('shown');
}
function navShow(){
  $('.slideInContent.shown').removeClass('shown');
  $('.slideInBtn.hidden').removeClass('hidden');
}
function pacienteSelect(){
  let select = $('#subject-switcher select');

}
function dataRecovered(data){
  let select = $('#subject-switcher select');
  data.forEach(paciente=>{
    let option = document.createElement('option');
        option.setAttribute('value', paciente.meta.nome);
        option.innerText = paciente.meta.nome;

    select.append(option);
  });
  select.on('change', function (){
    let nome = $(this).val();

    let pac = data.filter(d => d.meta.nome == nome).pop();

    app.setData(pac);
    app.updateCharts();
    $('nav [data-target="#informer"]').attr('data-use', '');
    navShow();
  })

}
