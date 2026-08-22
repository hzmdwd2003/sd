const v13=document.createElement('link');v13.rel='stylesheet';v13.href=(location.pathname.includes('/en/')?'../':'')+'v13.css?v=13';document.head.appendChild(v13);
const SD={whatsapp:'491786287358'};
const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const isEN=()=>document.documentElement.lang.toLowerCase().startsWith('en');

function waText(form){
  const f=new FormData(form);
  const en=isEN();
  const lines=en?[
    'Hello SD Airport Transfer, I would like to request a transfer.',
    `Pickup: ${f.get('pickup')||''}`,`Destination: ${f.get('destination')||''}`,
    `Date/time: ${f.get('datetime')||''}`,`Passengers: ${f.get('passengers')||''}`,
    `Child seats: ${f.get('child_seats')||''}`,
    `Luggage: ${f.get('luggage')||''}`,`Flight number: ${f.get('flight')||''}`
  ]:[
    'Hallo SD Flughafentransfer, ich möchte eine Fahrt anfragen.',
    `Abholort: ${f.get('pickup')||''}`,`Ziel: ${f.get('destination')||''}`,
    `Datum/Uhrzeit: ${f.get('datetime')||''}`,`Personen: ${f.get('passengers')||''}`,
    `Kindersitze: ${f.get('child_seats')||''}`,
    `Gepäck: ${f.get('luggage')||''}`,`Flugnummer: ${f.get('flight')||''}`
  ];
  if(f.get('return_pickup')||f.get('return_destination')||f.get('return_datetime')){
    lines.push('',en?'Return trip:':'Rückfahrt:',
      `${en?'Pickup':'Abholort'}: ${f.get('return_pickup')||''}`,
      `${en?'Destination':'Ziel'}: ${f.get('return_destination')||''}`,
      `${en?'Date/time':'Datum/Uhrzeit'}: ${f.get('return_datetime')||''}`,
      `${en?'Flight number':'Flugnummer'}: ${f.get('return_flight')||''}`);
  }
  return lines.join('\n');
}

$$('[data-whatsapp]').forEach(a=>{
  const msg=isEN()?'Hello SD Airport Transfer, I would like to request a transfer.':'Hallo SD Flughafentransfer, ich möchte eine Fahrt anfragen.';
  a.href=`https://wa.me/${SD.whatsapp}?text=${encodeURIComponent(msg)}`;
  a.target='_blank';a.rel='noopener';
});

$$('[data-inquiry-form]').forEach(form=>{
  const d=form.querySelector('[data-return-trip]');
  d?.addEventListener('toggle',()=>{
    if(!d.open)return;
    const p=form.querySelector('[name=pickup]')?.value||'';
    const z=form.querySelector('[name=destination]')?.value||'';
    const rp=form.querySelector('[name=return_pickup]');
    const rz=form.querySelector('[name=return_destination]');
    if(rp&&!rp.value)rp.value=z;if(rz&&!rz.value)rz.value=p;
  });
  form.addEventListener('submit',e=>{
    e.preventDefault();
    window.open(`https://wa.me/${SD.whatsapp}?text=${encodeURIComponent(waText(form))}`,'_blank','noopener');
  });
});

if('IntersectionObserver' in window){
  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-visible')}),{threshold:.08});
  $$('.reveal,.vehicle-card').forEach(x=>obs.observe(x));
}else{
  $$('.reveal,.vehicle-card').forEach(x=>x.classList.add('is-visible'));
}

const nav=$('[data-nav]'),toggle=$('[data-nav-toggle]');
toggle?.addEventListener('click',()=>nav?.classList.toggle('is-open'));

/* UX / SOCIAL / REVIEWS / MOBILE FORM - 2026-08-22 */
(()=>{
  const en=isEN();

  if(!en){
    $$('a,button').forEach(el=>{
      const t=(el.textContent||'').trim();
      const map={
        'Jetzt anfragen':'Jetzt kostenlos anfragen',
        'Direkt per WhatsApp':'Kostenlos Ihre Fahrt anfragen',
        'Jetzt auf WhatsApp anfragen':'Kostenlos per WhatsApp anfragen',
        'Preis per WhatsApp anfragen':'Kostenlos Preis anfragen',
        'Fahrt anfragen':'Kostenlos Fahrt anfragen',
        'XL-Preis anfragen':'XL-Preis kostenlos anfragen'
      };
      if(map[t]) el.textContent=map[t];
    });
  }

  const style=document.createElement('style');
  style.id='sd-ux-20260822';
  style.textContent=`
    .sd-rating-mini{display:inline-flex;align-items:center;gap:8px;margin-top:14px;padding:7px 10px;border-radius:999px;background:rgba(255,255,255,.08);font-size:11px;font-weight:800;color:#fff}
    .sd-rating-mini b{color:#f5b301;letter-spacing:1px}
    .sd-reviews3{background:#f5f6f7;color:#0a1118}
    .sd-reviews3 .section-head{margin-bottom:34px}
    .sd-review-grid3{display:grid;grid-template-columns:1fr 1.18fr 1fr;gap:20px;align-items:stretch}
    .sd-review-card3{display:flex;flex-direction:column;min-height:330px;padding:30px;border:1px solid #dde3e8;border-radius:18px;background:#fff;box-shadow:0 14px 34px rgba(15,31,46,.07)}
    .sd-review-card3.featured{border-top:4px solid #f5b301}
    .sd-stars3{color:#f5b301;font-size:22px;letter-spacing:3px;margin-bottom:18px;line-height:1}
    .sd-review-card3 strong{font-size:20px;letter-spacing:-.025em;margin-bottom:10px;color:#071019}
    .sd-review-card3 p{font-size:13px;color:#6b7885;margin:0 0 20px}
    .sd-review-card3 .review-link{margin-top:auto;font-size:12px;font-weight:800;color:#071019}
    .sd-review-center3{position:relative;overflow:hidden;text-align:center;justify-content:center;padding:34px 46px}
    .sd-slide3{display:none;flex-direction:column;align-items:center;justify-content:center;min-height:250px}
    .sd-slide3.is-active{display:flex}
    .sd-slide3 .sd-stars3{font-size:25px;margin-bottom:20px}
    .sd-slide3 blockquote{margin:0 auto 22px;font-size:17px;line-height:1.55;color:#4d5965}
    .sd-slide3 strong{font-size:18px;margin:0;color:#071019}
    .sd-slide3 small{margin-top:4px;font-size:11px;color:#8c98a3}
    .sd-nav3{position:absolute;top:50%;transform:translateY(-50%);width:34px;height:34px;border:1px solid #dce2e7;border-radius:50%;background:#fff;color:#071019;font-size:24px;cursor:pointer;z-index:3;box-shadow:0 6px 18px rgba(7,16,25,.10)}
    .sd-nav3.prev{left:8px}.sd-nav3.next{right:8px}
    .sd-dots3{display:flex;justify-content:center;gap:6px;margin-top:14px}
    .sd-dot3{width:7px;height:7px;border:0;border-radius:50%;padding:0;background:#c9d0d6;cursor:pointer}.sd-dot3.is-active{background:#071019}
    .sd-social-row{margin-top:24px;padding:20px 22px;border-radius:16px;background:#071019;color:#fff;display:flex;align-items:center;justify-content:space-between;gap:20px}
    .sd-social-copy{display:grid;gap:3px}.sd-social-copy strong{font-size:16px}.sd-social-copy span{font-size:11px;color:#9eabb8}
    .sd-social-links{display:flex;gap:9px;flex-wrap:wrap;justify-content:flex-end}
    .sd-social-link{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:0 14px;border-radius:999px;border:1px solid rgba(255,255,255,.16);font-size:11px;font-weight:800;color:#fff}
    .sd-social-link.instagram{background:linear-gradient(115deg,#6a35c7,#cf3168,#e48c2f);border:0}
    .sd-social-link.facebook{background:#1877f2;border:0}.sd-social-link.pending{opacity:.45;cursor:default}
    @media(max-width:980px){.sd-review-grid3{grid-template-columns:1fr}.sd-review-card3{min-height:260px}.sd-review-center3{min-height:360px}.sd-social-row{align-items:flex-start;flex-direction:column}.sd-social-links{justify-content:flex-start}}
    @media(max-width:680px){
      .inquiry-card .field:has([name="child_seats"]),.inquiry-card .field:has([name="luggage"]),.inquiry-card .field:has([name="flight"]),.inquiry-card .return-trip{display:none!important}
      .inquiry-card .form-grid{grid-template-columns:1fr 1fr!important}.inquiry-card .field.wide{grid-column:1/-1!important}.inquiry-card{padding:18px!important}
      .card-head{margin-bottom:14px!important}.card-head h2{font-size:20px!important}.card-head p{font-size:10px!important}.form-assurance{justify-content:center!important}
      .sd-review-card3{padding:22px;min-height:0}.sd-review-center3{padding:28px 40px;min-height:390px}.sd-slide3 blockquote{font-size:15px}.sd-nav3{width:32px;height:32px;font-size:22px}
      .sd-reviews3 .section-head{text-align:left;margin-left:0}.sd-reviews3 .section-head h2{font-size:32px!important}.sd-social-links{width:100%}.sd-social-link{width:100%}
    }
  `;
  document.head.appendChild(style);

  const heroActions=$('.page-hero .hero-actions');
  if(heroActions && !$('.sd-rating-mini')){
    const rating=document.createElement('a');
    rating.className='sd-rating-mini';
    rating.href='https://www.google.com/maps/search/?api=1&query=SD%20Flughafentransfer%20Skyline%20Drive%20GmbH';
    rating.target='_blank';rating.rel='noopener';
    rating.innerHTML=en?'<b>★★★★★</b><span>5/5 on Google · Read reviews</span>':'<b>★★★★★</b><span>5/5 bei Google · Rezensionen ansehen</span>';
    heroActions.insertAdjacentElement('afterend',rating);
  }

  const isHome=en ? (location.pathname.endsWith('/en/') || location.pathname.endsWith('/en/index.html')) : (location.pathname==='/' || location.pathname.endsWith('/index.html'));
  if(!isHome) return;

  const reviews=[
    ['Mark K.','Pünktlich, höflich, preiswert. Kann Ich nur empfehlen.'],
    ['Pia K.','Alles Prima! Wir wurden pünktlich abgeholt. Die Fahrt war sehr angenehm in einem sauberen Auto mit einem netten und freundlichen Fahrer. Zudem war der Preis sehr fair und günstiger als alle anderen Angebote, die wir erhalten haben. Jederzeit wieder :)'],
    ['Ayman A.','Super Service, sehr zuverlässiges Personal. Kann Ich nur weiterempfehlen!'],
    ['Sher S.','Super Fahrservice und unkomplizierter Ablauf. Gerne wieder.'],
    ['Gokhan Kapusuz','Top Service! Immer Pünktlich, sehr freundliche Fahrer und gepflegte Fahrzeuge. Die Fahrten sind angenehm und zuverlässig. Absolut empfehlenswert- gerene wieder!'],
    ['Ali A.','Great Service. I needed a ride to the airport and i came across the website. The communication and planning was very quick and easy. The driver was also great.'],
    ['Helena K.','Leichtes Buchen sehr nette Fahrer einfach alles top.'],
    ['Victor B.','Sehr zufrieden, alles war super gerne wieder.'],
    ['M. Sher','Alles war top freundlich, professionell und eine rundum positive Erfahrung. Klare Empfehlung !'],
    ['Aryan S.','Empehlenswerter Chauffeurdienst. Leichte Buchung und Angenehmer Fahrer.']
  ];

  $('#kundenbewertungen')?.remove();
  $('#customer-reviews')?.remove();
  $('#bewertungen')?.remove();
  $('.reviews-section')?.remove();

  const slides=reviews.map(([name,text],i)=>`<article class="sd-slide3${i===0?' is-active':''}" data-slide3><div class="sd-stars3">★★★★★</div><blockquote>${text}</blockquote><strong>${name}</strong><small>${en?'Google review · 5 stars':'Google Rezension · 5 Sterne'}</small></article>`).join('');

  const section=document.createElement('section');
  section.className='section sd-reviews3';
  section.id=en?'customer-reviews':'kundenbewertungen';
  section.innerHTML=`<div class="wrap">
    <div class="section-head"><span class="eyebrow">${en?'Customer reviews':'Kundenbewertungen'}</span><h2>${en?'5/5 stars on Google':'5/5 Sterne bei Google'}</h2><p>${en?'Read what our passengers say about their airport transfer experience.':'Lesen Sie, was unsere Fahrgäste über ihren Flughafentransfer sagen.'}</p></div>
    <div class="sd-review-grid3">
      <a class="sd-review-card3 featured" href="https://www.google.com/maps/search/?api=1&query=SD%20Flughafentransfer%20Skyline%20Drive%20GmbH" target="_blank" rel="noopener">
        <div class="sd-stars3">★★★★★</div><strong>${en?'5/5 stars on Google':'5/5 Sterne bei Google'}</strong>
        <p>${en?'Open our Google business profile and read our customer reviews.':'Öffnen Sie unser Google-Unternehmensprofil und lesen Sie die aktuellen Kundenrezensionen.'}</p>
        <span class="review-link">${en?'View Google reviews →':'Google Rezensionen ansehen →'}</span>
      </a>
      <div class="sd-review-card3 sd-review-center3" data-slider3>
        <button class="sd-nav3 prev" type="button" data-prev3 aria-label="${en?'Previous review':'Vorherige Rezension'}">‹</button>
        <div>${slides}</div>
        <button class="sd-nav3 next" type="button" data-next3 aria-label="${en?'Next review':'Nächste Rezension'}">›</button>
        <div class="sd-dots3" data-dots3></div>
      </div>
      <a class="sd-review-card3" href="https://g.page/r/CQssm-DfUmlzECA/review" target="_blank" rel="noopener">
        <div class="sd-stars3">★★★★★</div><strong>${en?'Already travelled with us?':'Schon mit uns gefahren?'}</strong>
        <p>${en?'Share your experience on Google and help other passengers choose their airport transfer.':'Teilen Sie Ihre Erfahrung direkt auf Google und helfen Sie anderen Fahrgästen bei der Auswahl.'}</p>
        <span class="review-link">${en?'Leave a Google review →':'Google Bewertung abgeben →'}</span>
      </a>
    </div>
    <div class="sd-social-row"><div class="sd-social-copy"><strong>${en?'Follow Skyline Drive':'Folgen Sie Skyline Drive'}</strong><span>${en?'Vehicles, updates and airport-transfer insights.':'Fahrzeuge, Einblicke und Neuigkeiten rund um unseren Flughafentransfer.'}</span></div><div class="sd-social-links"><a class="sd-social-link instagram" href="https://www.instagram.com/Skylinedrive_Frankfurt/" target="_blank" rel="noopener">Instagram · @Skylinedrive_Frankfurt</a><span class="sd-social-link facebook pending">Facebook</span></div></div>
  </div>`;
  $('main')?.appendChild(section);

  const slider=$('[data-slider3]',section);
  const slideEls=$$('[data-slide3]',slider);
  const dotsWrap=$('[data-dots3]',slider);
  let idx=0,timer;
  const dots=slideEls.map((_,i)=>{const b=document.createElement('button');b.type='button';b.className='sd-dot3'+(i===0?' is-active':'');b.setAttribute('aria-label',`${en?'Show review':'Rezension anzeigen'} ${i+1}`);b.addEventListener('click',()=>show(i,true));dotsWrap.appendChild(b);return b});
  function show(i,restart=false){idx=(i+slideEls.length)%slideEls.length;slideEls.forEach((s,n)=>s.classList.toggle('is-active',n===idx));dots.forEach((d,n)=>d.classList.toggle('is-active',n===idx));if(restart)start()}
  function start(){clearInterval(timer);timer=setInterval(()=>show(idx+1),6000)}
  $('[data-prev3]',slider).addEventListener('click',()=>show(idx-1,true));
  $('[data-next3]',slider).addEventListener('click',()=>show(idx+1,true));
  slider.addEventListener('mouseenter',()=>clearInterval(timer));
  slider.addEventListener('mouseleave',start);
  start();
})();
