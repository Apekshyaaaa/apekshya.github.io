const projects = {
  weed: {
    kicker: 'RESEARCH IN PROGRESS · 2026', title: 'Transferability of UAV-based weed detection models',
    summary: 'A systematic literature review investigating whether computer-vision weed detection models generalize across different fields, seasons, and crop growth stages.',
    details: 'Using structured database searches, deduplication, PRISMA-guided screening, and explicit inclusion and exclusion criteria to review empirical studies of UAV imagery and weed detection. The review pays particular attention to evaluation design, dataset characteristics, and evidence of transfer to new settings.',
    tags: ['UAV imagery','Machine learning','Systematic review','PRISMA'], status: 'STATUS: ONGOING RESEARCH — NO FINAL RESULTS CLAIMED'
  },
  mapping: {
    kicker: 'APPLIED MAPPING · GEOVATION NEPAL', title: 'Crop health mapping with UAV and GIS',
    summary: 'Geospatial products and vegetation-index analysis designed to characterize crop conditions and support location-specific agricultural management.',
    details: 'As an Agriculture Associate at Geovation Nepal, I worked with multispectral UAV imagery, NDVI/EVI, orthomosaics, and georeferenced mapping products across three field sites. The work supported visual interpretation of crop conditions and mapping for site-specific recommendations.',
    tags: ['ArcGIS','Multispectral imagery','NDVI / EVI','Orthomosaics'], status: 'STATUS: PROFESSIONAL PROJECT · NOV 2025–FEB 2026'
  },
  orchard: {
    kicker: 'UNDERGRADUATE THESIS · NEPAL', title: 'Acid lime orchard management in Nawalpur',
    summary: 'An assessment of orchard management under diverse intercultural practices in Madhyabindu, Nawalpur.',
    details: 'For my B.Sc. Agriculture thesis at Agriculture and Forestry University, I studied acid lime growers and their orchard management practices, including irrigation, pest management, and crop-care constraints. The study used farmer survey data to understand practical management challenges.',
    tags: ['Field survey','Horticulture','Agricultural management','Nepal'], status: 'STATUS: UNDERGRADUATE THESIS · COMPLETED'
  },
  potato: {
    kicker: 'PUBLISHED RESEARCH · 2025', title: 'Production economics of potato farming',
    summary: 'A study of production economics and marketing analysis of potato farming in Changunarayan, Bhaktapur.',
    details: 'This first-author publication examines the farm-level economics and marketing of potato production in Nepal. Published in Food and Agri Economics Review, 5(1), 34–41 (2025), with A. Dallakoti and D. Sapkota.',
    tags: ['Agricultural economics','Marketing','Potato','Published'], status: 'STATUS: PUBLISHED · FOOD AND AGRI ECONOMICS REVIEW, 2025'
  }
};
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');menuToggle.setAttribute('aria-expanded', 'false');
}));
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(item => {const active = item === button;item.classList.toggle('is-active',active);item.setAttribute('aria-pressed',String(active));});
  document.querySelectorAll('.project-card').forEach(card => {card.hidden = category !== 'all' && card.dataset.category !== category;});
}));
const dialog = document.getElementById('projectDialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];if(!project) return;
  document.getElementById('dialogKicker').textContent = project.kicker;
  document.getElementById('dialogTitle').textContent = project.title;
  document.getElementById('dialogSummary').textContent = project.summary;
  document.getElementById('dialogDetails').textContent = project.details;
  document.getElementById('dialogStatus').textContent = project.status;
  document.getElementById('dialogTags').replaceChildren(...project.tags.map(tag=>{const span=document.createElement('span');span.textContent=tag;return span;}));
  dialog.showModal();
}));
document.getElementById('dialogClose')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => {if(event.target === dialog) dialog.close();});
document.getElementById('year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
} else {document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));}
