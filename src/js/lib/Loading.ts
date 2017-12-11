export function startLoading(selector:string){
  
  document.querySelector(selector)
          .classList.add('loading');
}
export function endLoading(selector:string){
  document.querySelector(selector)
          .classList.remove('loading');
}
