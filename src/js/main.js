import D3Visualization from './components/D3Visualization';
import App from './App';

let APP = new App();

APP.onDoneLoading((data)=>{
  console.log(data);
});
let ganttContainer = new D3Visualization(500, 500, '#app', 'gantt');
