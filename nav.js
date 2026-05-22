/* nav.js — inject nav + footer into every page */
(function(){
  const currentPage = location.pathname.split('/').pop().replace('.html','') || 'index';

  const pages = [
    { id:'index',    label:'index',     href:'index.html' },
    { id:'systems',  label:'systems',   href:'systems.html' },
    { id:'casestudy',label:'case study',href:'casestudy.html' },
    { id:'stack',    label:'stack',     href:'stack.html' },
    { id:'contact',  label:'contact',   href:'contact.html' },
  ];

  const navLinks = pages.map(p =>
    `<a class="nav-link${p.id===currentPage?' active':''}" href="${p.href}">${p.label}</a>`
  ).join('');

  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  document.body.insertAdjacentHTML('afterbegin', `
    <nav id="site-nav">
      <a class="nav-brand" href="index.html">
        <div class="nav-brand-dot"></div>
        TAHMID.DEV
      </a>
      <div class="nav-links">${navLinks}</div>
      <div class="nav-right">
        <div class="nav-clock" id="nav-clock">00:00:00 UTC</div>
        <div class="nav-badge">available</div>
        <button class="theme-toggle" id="theme-toggle">${savedTheme === 'light' ? '[dark]' : '[light]'}</button>
      </div>
    </nav>
  `);

  document.body.insertAdjacentHTML('beforeend', `
    <footer id="site-footer">
      <div class="footer-left">
        <div class="footer-item">node<span>tahmid-dev-prod</span></div>
        <div class="footer-item">school<span>TMU · CE · 2028</span></div>
        <div class="footer-item">location<span>toronto, ca</span></div>
      </div>
      <div class="footer-links">
        <a href="https://github.com/TahmidEhsan" target="_blank">github</a>
        <a href="https://linkedin.com/in/tahmide" target="_blank">linkedin</a>
        <a href="mailto:tahmid.ehsan@torontomu.ca">email</a>
        <a href="https://drive.google.com/file/d/1FpR7--g1Dq0NJvpyK1-gQ79gv53-cJZ3/view" target="_blank">resume ↗</a>
      </div>
    </footer>
  `);

  function tick(){
    const d = new Date();
    const el = document.getElementById('nav-clock');
    if(el) el.textContent = d.toUTCString().split(' ')[4] + ' UTC';
  }
  tick(); setInterval(tick, 1000);

  document.getElementById('theme-toggle').addEventListener('click', function(){
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    this.textContent = next === 'light' ? '[dark]' : '[light]';
  });
})();
