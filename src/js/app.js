import $ from 'jquery';
import D3Visualization from './components/D3Visualization';

export default class App{
  constructor(){
    this.data = [];
    this.meta = {};

    this.dictionary = {};

    this.updateDictionary();
  }
  updateDictionary(){
    console.log('Carregando Dicionário');

    d3.json('/assets/dictionary.json', data=>{
      this.dictionary = data;
      console.log(data);
    });
  }
  updateCharts(){
    console.log('Gerando visualizações');

    this.___generateGantt();
  }
  ___generateGantt(){
    let dimensions = this.getDimensions();
    let container = new D3Visualization(dimensions.width, dimensions.height, '#app', 'diary');

    let horaScale = this.___getHoraScale(dimensions.width);
    let catScale  = this.___getCategoriaScale();

    var barHeight = 20;
    var gap = barHeight + 4;
    var topPadding = 75;
    var sidePadding = 75;

    this.___createGrid(sidePadding, topPadding, pageWidth, pageHeight);
    // this.drawRects(tasks, gap, topPadding, sidePadding, barHeight, colorScale, pageWidth, pageHeight);
    // vertLabels(gap, topPadding, sidePadding, barHeight, colorScale);
  }
  ___getCategoriaScale(){
    let categorias = this.dictionary.categoria;
    var colorScale = d3.scaleLinear()
        .domain([0, categorias.length])
        .range(["#00B9FA", "#F95002"])
        .interpolate(d3.interpolateHcl);

    return colorScale;
  }
  ___getHoraScale(width){
    let format = this.dictionary.format.hora;
    format = d3.timeParse(format);

    let domain = d3.extent(this.data, task=>{
      return task.hora;
    });

    return d3.scaleTime()
              .domain(domain)
              .range([0, width]);
  }
  ___createGrid(){
    let dimensions = this.___getDimensions();
    let theSidePad = dimensions.padding;
    // theSidePad, theTopPad, w, h

    var xAxis = d3.svg.axis()
        .scale(timeScale)
        .orient('bottom')
        .ticks(d3.time.days, 1)
        .tickSize(-h+theTopPad+20, 0, 0)
        .tickFormat(d3.time.format('%d %b'));

    var grid = svg.append('g')
        .attr('class', 'grid')
        .attr('transform', 'translate(' +theSidePad + ', ' + (h - 50) + ')')
        .call(xAxis)
        .selectAll("text")
                .style("text-anchor", "middle")
                .attr("fill", "#000")
                .attr("stroke", "none")
                .attr("font-size", 10)
                .attr("dy", "1em");

  }
  getDimensions(){
    return {
      width: 500,
      height: 500,
      padding: 75,
      barHeight: 20
    };
  }
  onPageReady(callback){
    $(()=>{

      this.init();
      callback.bind(this)();


    });
  }
  init(){

  }
  setData(data){
    /**
     * desencadeia a geração da visualização
     */
    console.log('Dados recebidos');
    console.log(data);

    this.___setTimeDiary(data.tasks);
    this.___setMetaData(data.meta);

    this.updateCharts();
  }
  ___setTimeDiary(diary){
    this.data = diary;
  }
  ___setMetaData(meta){
    this.meta = meta;
  }
}
