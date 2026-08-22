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
    .sd-reviews{background:#f5f6f7;color:#0a1118}
    .sd-reviews .section-head{margin-bottom:32px}
    .sd-google-rating{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:14px;font-size:15px;color:#202b36}
    .sd-google-rating .stars,.sd-review-stars{color:#f5b301;letter-spacing:3px}
    .sd-review-slider{position:relative;max-width:920px;margin:0 auto;padding:0 66px}
    .sd-review-stage{position:relative;min-height:350px}
    .sd-review-slide{display:none;min-height:330px;background:#fff;border:1px solid #dde3e8;border-top:5px solid #071019;border-radius:18px;padding:42px 48px;box-shadow:0 18px 50px rgba(15,31,46,.09);text-align:center;align-items:center;justify-content:center;flex-direction:column}
    .sd-review-slide.is-active{display:flex}
    .sd-review-stars{font-size:26px;line-height:1;margin-bottom:24px}
    .sd-review-slide blockquote{margin:0 auto 28px;max-width:720px;font-size:20px;line-height:1.55;color:#4e5a66}
    .sd-review-slide strong{font-size:19px;color:#071019}
    .sd-review-slide .review-meta{margin-top:5px;font-size:12px;color:#8c98a3}
    .sd-review-nav{position:absolute;top:47%;transform:translateY(-50%);z-index:3;width:46px;height:46px;border:1px solid #dce2e7;border-radius:50%;background:#fff;color:#071019;font-size:30px;cursor:pointer;box-shadow:0 8px 26px rgba(15,31,46,.1)}
    .sd-review-nav.prev{left:4px}.sd-review-nav.next{right:4px}
    .sd-review-dots{display:flex;justify-content:center;gap:7px;margin-top:18px}
    .sd-review-dot{width:8px;height:8px;border:0;border-radius:50%;padding:0;background:#c9d0d6;cursor:pointer}
    .sd-review-dot.is-active{background:#071019}
    .sd-social-row{margin-top:30px;padding:20px 22px;border-radius:16px;background:#071019;color:#fff;display:flex;align-items:center;justify-content:space-between;gap:20px}
    .sd-social-copy{display:grid;gap:3px}.sd-social-copy strong{font-size:16px}.sd-social-copy span{font-size:11px;color:#9eabb8}
    .sd-social-links{display:flex;gap:9px;flex-wrap:wrap;justify-content:flex-end}
    .sd-social-link{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:0 14px;border-radius:999px;border:1px solid rgba(255,255,255,.16);font-size:11px;font-weight:800;color:#fff}
    .sd-social-link.instagram{background:linear-gradient(115deg,#6a35c7,#cf3168,#e48c2f);border:0}
    .sd-social-link.facebook{background:#1877f2;border:0}.sd-social-link.pending{opacity:.45;cursor:default}
    @media(max-width:900px){.sd-social-row{align-items:flex-start;flex-direction:column}.sd-social-links{justify-content:flex-start}}
    @media(max-width:680px){
      .inquiry-card .field:has([name="child_seats"]),
      .inquiry-card .field:has([name="luggage"]),
      .inquiry-card .field:has([name="flight"]),
      .inquiry-card .return-trip{display:none!important}
      .inquiry-card .form-grid{grid-template-columns:1fr 1fr!important}
      .inquiry-card .field.wide{grid-column:1/-1!important}
      .inquiry-card{padding:18px!important}
      .card-head{margin-bottom:14px!important}.card-head h2{font-size:20px!important}.card-head p{font-size:10px!important}
      .form-assurance{justify-content:center!important}
      .sd-review-slider{padding:0 38px}.sd-review-stage{min-height:405px}.sd-review-slide{padding:30px 20px;min-height:385px}.sd-review-slide blockquote{font-size:16px}.sd-review-stars{font-size:22px}.sd-review-nav{width:34px;height:34px;font-size:24px}.sd-review-nav.prev{left:0}.sd-review-nav.next{right:0}
      .sd-reviews .section-head{text-align:left;margin-left:0}.sd-reviews .section-head h2{font-size:32px!important}.sd-google-rating{justify-content:flex-start;flex-wrap:wrap}
      .sd-social-links{width:100%}.sd-social-link{width:100%}
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

  const isHome=en
    ? (location.pathname.endsWith('/en/') || location.pathname.endsWith('/en/index.html'))
    : (location.pathname==='/' || location.pathname.endsWith('/index.html'));

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

  const main=$('main');
  if(isHome && main && !$('#kundenbewertungen') && !$('#customer-reviews')){
    const section=document.createElement('section');
    section.className='section sd-reviews';
    section.id=en?'customer-reviews':'kundenbewertungen';
    const slides=reviews.map(([name,text],i)=>`<article class="sd-review-slide${i===0?' is-active':''}" data-review-slide><div class="sd-review-stars" aria-label="${en?'5 out of 5 stars':'5 von 5 Sternen'}">★★★★★</div><blockquote>${text}</blockquote><strong>${name}</strong><span class="review-meta">${en?'Google review · 5 stars':'Google Rezension · 5 Sterne'}</span></article>`).join('');
    section.innerHTML=`
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">${en?'Customer reviews':'Kundenbewertungen'}</span>
          <h2>${en?'What our customers say':'Was unsere Kunden sagen'}</h2>
          <p class="sd-google-rating"><span class="stars">★★★★★</span><strong>${en?'5/5 stars on Google':'5/5 Sterne bei Google'}</strong></p>
        </div>
        <div class="sd-review-slider" data-review-slider>
          <button class="sd-review-nav prev" type="button" data-review-prev aria-label="${en?'Previous review':'Vorherige Rezension'}">‹</button>
          <div class="sd-review-stage">${slides}</div>
          <button class="sd-review-nav next" type="button" data-review-next aria-label="${en?'Next review':'Nächste Rezension'}">›</button>
          <div class="sd-review-dots" data-review-dots></div>
        </div>
        <div class="sd-social-row">
          <div class="sd-social-copy"><strong>${en?'Follow Skyline Drive':'Folgen Sie Skyline Drive'}</strong><span>${en?'Vehicles, updates and airport-transfer insights.':'Fahrzeuge, Einblicke und Neuigkeiten rund um unseren Flughafentransfer.'}</span></div>
          <div class="sd-social-links">
            <a class="sd-social-link instagram" href="https://www.instagram.com/Skylinedrive_Frankfurt/" target="_blank" rel="noopener">Instagram · @Skylinedrive_Frankfurt</a>
            <span class="sd-social-link facebook pending" title="${en?'Facebook profile link not added yet':'Facebook-Profil-Link noch nicht hinterlegt'}">Facebook</span>
          </div>
        </div>
      </div>`;
    main.appendChild(section);

    const slider=$('[data-review-slider]',section);
    const slidesEls=$$('[data-review-slide]',slider);
    const dotsWrap=$('[data-review-dots]',slider);
    let index=0,timer;
    const dots=slidesEls.map((_,i)=>{
      const b=document.createElement('button');
      b.type='button';b.className='sd-review-dot'+(i===0?' is-active':'');
      b.setAttribute('aria-label',`${en?'Show review':'Rezension anzeigen'} ${i+1}`);
      b.addEventListener('click',()=>show(i,true));dotsWrap.appendChild(b);return b;
    });
    function show(i,restart=false){
      index=(i+slidesEls.length)%slidesEls.length;
      slidesEls.forEach((s,n)=>s.classList.toggle('is-active',n===index));
      dots.forEach((d,n)=>d.classList.toggle('is-active',n===index));
      if(restart)start();
    }
    function start(){clearInterval(timer);timer=setInterval(()=>show(index+1),6000)}
    $('[data-review-prev]',slider).addEventListener('click',()=>show(index-1,true));
    $('[data-review-next]',slider).addEventListener('click',()=>show(index+1,true));
    slider.addEventListener('mouseenter',()=>clearInterval(timer));
    slider.addEventListener('mouseleave',start);
    start();
  }
})();
