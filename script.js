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

// Reveals are enhancement only: content stays visible if JS fails.
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

  // Make inquiry wording clearly non-binding/free on German pages.
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

  // Add styling without changing the existing page CSS file structure.
  const style=document.createElement('style');
  style.id='sd-ux-20260822';
  style.textContent=`
    .sd-reviews{background:#f5f6f7;color:#0a1118}
    .sd-review-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-items:stretch}
    .sd-review-card{display:flex;flex-direction:column;min-height:245px;padding:28px;border:1px solid #dde3e8;border-radius:18px;background:#fff;box-shadow:0 14px 34px rgba(15,31,46,.07);transition:.2s ease}
    .sd-review-card:hover{transform:translateY(-3px);box-shadow:0 22px 45px rgba(15,31,46,.12)}
    .sd-review-card.featured{border-top:4px solid #f5b301}
    .sd-review-stars{font-size:22px;letter-spacing:3px;color:#f5b301;margin-bottom:18px;line-height:1}
    .sd-review-card strong{font-size:20px;letter-spacing:-.025em;margin-bottom:10px}
    .sd-review-card p{font-size:13px;color:#6b7885;margin:0 0 20px}
    .sd-review-card .review-link{margin-top:auto;font-size:12px;font-weight:800;color:#071019}
    .sd-social-row{margin-top:22px;padding:20px 22px;border-radius:16px;background:#071019;color:#fff;display:flex;align-items:center;justify-content:space-between;gap:20px}
    .sd-social-copy{display:grid;gap:3px}.sd-social-copy strong{font-size:16px}.sd-social-copy span{font-size:11px;color:#9eabb8}
    .sd-social-links{display:flex;gap:9px;flex-wrap:wrap;justify-content:flex-end}
    .sd-social-link{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:0 14px;border-radius:999px;border:1px solid rgba(255,255,255,.16);font-size:11px;font-weight:800;color:#fff}
    .sd-social-link.instagram{background:linear-gradient(115deg,#6a35c7,#cf3168,#e48c2f);border:0}
    .sd-social-link.facebook{background:#1877f2;border:0}.sd-social-link.pending{opacity:.45;cursor:default}
    .sd-rating-mini{display:inline-flex;align-items:center;gap:8px;margin-top:14px;padding:7px 10px;border-radius:999px;background:rgba(255,255,255,.08);font-size:11px;font-weight:800;color:#fff}
    .sd-rating-mini b{color:#f5b301;letter-spacing:1px}
    @media(max-width:900px){.sd-review-grid{grid-template-columns:1fr 1fr}.sd-review-card.featured{grid-column:1/-1}.sd-social-row{align-items:flex-start;flex-direction:column}.sd-social-links{justify-content:flex-start}}
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
      .sd-review-grid{grid-template-columns:1fr}.sd-review-card.featured{grid-column:auto}.sd-review-card{min-height:0;padding:22px}
      .sd-reviews .section-head{text-align:left;margin-left:0}.sd-reviews .section-head h2{font-size:32px!important}
      .sd-social-links{width:100%}.sd-social-link{width:100%}
    }
  `;
  document.head.appendChild(style);

  // Shorten all mobile inquiry forms to the four fields requested.
  // Hidden desktop fields remain in the DOM and continue to work on larger screens.

  if(!en){
    // Small 5/5 proof near the first hero CTA on the homepage.
    const heroActions=$('.page-hero .hero-actions');
    if(heroActions && !$('.sd-rating-mini')){
      const rating=document.createElement('a');
      rating.className='sd-rating-mini';
      rating.href='https://www.google.com/maps/search/?api=1&query=SD%20Flughafentransfer%20Skyline%20Drive%20GmbH';
      rating.target='_blank';rating.rel='noopener';
      rating.innerHTML='<b>★★★★★</b><span>5,0 / 5 bei Google · Rezensionen ansehen</span>';
      heroActions.insertAdjacentElement('afterend',rating);
    }

    // Reviews/social section only on the German homepage.
    const isHome=location.pathname==='/' || location.pathname.endsWith('/index.html') || location.pathname.endsWith('/sd/');
    const main=$('main');
    if(isHome && main && !$('#bewertungen')){
      const section=document.createElement('section');
      section.className='section sd-reviews';
      section.id='bewertungen';
      section.innerHTML=`
        <div class="wrap">
          <div class="section-head">
            <span class="eyebrow">Kundenbewertungen</span>
            <h2>5,0 / 5 Sterne bei Google.</h2>
            <p>Lesen Sie die aktuellen Erfahrungen unserer Fahrgäste direkt auf unserem Google-Unternehmensprofil.</p>
          </div>
          <div class="sd-review-grid">
            <a class="sd-review-card featured" href="https://www.google.com/maps/search/?api=1&query=SD%20Flughafentransfer%20Skyline%20Drive%20GmbH" target="_blank" rel="noopener">
              <div class="sd-review-stars" aria-label="5 von 5 Sternen">★★★★★</div>
              <strong>5,0 / 5 bei Google</strong>
              <p>Öffnen Sie unser Google-Unternehmensprofil und lesen Sie die aktuellen Kundenrezensionen.</p>
              <span class="review-link">Google Rezensionen ansehen →</span>
            </a>
            <a class="sd-review-card" href="https://www.google.com/maps/search/?api=1&query=SD%20Flughafentransfer%20Skyline%20Drive%20GmbH" target="_blank" rel="noopener">
              <div class="sd-review-stars" aria-label="5 von 5 Sternen">★★★★★</div>
              <strong>Erfahrungen unserer Fahrgäste</strong>
              <p>Transparenter Preis vor der Buchung, direkter Kontakt und eine entspannte Fahrt zum Flughafen.</p>
              <span class="review-link">Alle Rezensionen öffnen →</span>
            </a>
            <a class="sd-review-card" href="https://g.page/r/CQssm-DfUmlzECA/review" target="_blank" rel="noopener">
              <div class="sd-review-stars" aria-label="5 Sterne">★★★★★</div>
              <strong>Schon mit uns gefahren?</strong>
              <p>Teilen Sie Ihre Erfahrung direkt auf Google und helfen Sie anderen Fahrgästen bei der Auswahl.</p>
              <span class="review-link">Google Bewertung abgeben →</span>
            </a>
          </div>
          <div class="sd-social-row">
            <div class="sd-social-copy"><strong>Folgen Sie Skyline Drive</strong><span>Fahrzeuge, Einblicke und Neuigkeiten rund um unseren Flughafentransfer.</span></div>
            <div class="sd-social-links">
              <a class="sd-social-link instagram" href="https://www.instagram.com/Skylinedrive_Frankfurt/" target="_blank" rel="noopener">Instagram · @Skylinedrive_Frankfurt</a>
              <span class="sd-social-link facebook pending" title="Facebook-Profil-Link noch nicht hinterlegt">Facebook</span>
            </div>
          </div>
        </div>`;
      main.appendChild(section);
    }
  }
})();
