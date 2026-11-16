'use strict';
const menuButton = document.getElementById('menu-button');
const nav = document.getElementById('nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); menuButton.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();
const progress = document.getElementById('progress');
let queued = false;
function scrollProgress() {
  if (queued) return; queued = true;
  requestAnimationFrame(() => {
    const length = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${length > 0 ? window.scrollY / length : 0})`;
    queued = false;
  });
}
window.addEventListener('scroll', scrollProgress, {passive:true}); scrollProgress();
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {entry.target.classList.add('visible'); observer.unobserve(entry.target);}
}), {threshold:.09});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const projects = {
  mapping:{label:'GIS · UAV · GEOVATION NEPAL',title:'Mapping from above.',description:'During my work with Geovation Nepal, I worked with agricultural UAV imagery and geospatial mapping products, including vegetation indices and field mapping. This experience helped connect my agricultural background with practical remote sensing applications.',tools:['ArcGIS Pro','UAV imagery','NDVI / EVI','GIS mapping','Geospatial analysis']},
  lime:{label:'UNDERGRADUATE THESIS · AFU, NEPAL',title:'Back to the roots.',description:'My undergraduate thesis examined acid lime orchard management under different intercultural practices in Madhyabindu, Nawalparasi East, Nepal. The study used a population census and examined agricultural management practices and constraints.',tools:['Field research','Population census','Survey analysis','Agricultural science','Research writing']}
};
const dialog = document.getElementById('project-dialog');
const close = document.getElementById('close-dialog');
let previouslyFocused = null;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click',()=>{
  const p=projects[button.dataset.project]; if(!p) return;
  previouslyFocused = document.activeElement;
  document.getElementById('modal-label').textContent = p.label;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-description').textContent = p.description;
  document.getElementById('modal-pills').replaceChildren(...p.tools.map(t => {const tag=document.createElement('span');tag.textContent=t;return tag;}));
  dialog.showModal();
}));
close.addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
dialog.addEventListener('close',()=>previouslyFocused?.focus());
