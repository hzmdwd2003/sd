
const SD={whatsapp:'4915229547574'};
const $=(s,c=document)=>c.querySelector(s);const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const isEN=()=>document.documentElement.lang.toLowerCase().startsWith('en');
function waText(form){const f=new FormData(form);const en=isEN();const lines=en?[
'Hello SD Airport Transfer, I would like to request a transfer.',`Pickup: ${f.get('pickup')||''}`,`Destination: ${f.get('destination')||''}`,`Date/time: ${f.get('datetime')||''}`,`Passengers: ${f.get('passengers')||''}`,`Luggage: ${f.get('luggage')||''}`,`Flight number: ${f.get('flight')||''}`
]:['Hallo SD Flughafentransfer, ich möchte eine Fahrt anfragen.',`Abholort: ${f.get('pickup')||''}`,`Ziel: ${f.get('destination')||''}`,`Datum/Uhrzeit: ${f.get('datetime')||''}`,`Personen: ${f.get('passengers')||''}`,`Gepäck: ${f.get('luggage')||''}`,`Flugnummer: ${f.get('flight')||''}`];if(f.get('return_pickup')||f.get('return_destination')||f.get('return_datetime')){lines.push('',en?'Return trip:':'Rückfahrt:',`${en?'Pickup':'Abholort'}: ${f.get('return_pickup')||''}`,`${en?'Destination':'Ziel'}: ${f.get('return_destination')||''}`,`${en?'Date/time':'Datum/Uhrzeit'}: ${f.get('return_datetime')||''}`,`${en?'Flight number':'Flugnummer'}: ${f.get('return_flight')||''}`)}return lines.join('\n')}
$$('[data-whatsapp]').forEach(a=>{const msg=isEN()?'Hello SD Airport Transfer, I would like to request a transfer.':'Hallo SD Flughafentransfer, ich möchte eine Fahrt anfragen.';a.href=`https://wa.me/${SD.whatsapp}?text=${encodeURIComponent(msg)}`;a.target='_blank';a.rel='noopener'});
$$('[data-inquiry-form]').forEach(form=>{const d=form.querySelector('[data-return-trip]');d?.addEventListener('toggle',()=>{if(!d.open)return;const p=form.querySelector('[name=pickup]')?.value||'';const z=form.querySelector('[name=destination]')?.value||'';const rp=form.querySelector('[name=return_pickup]');const rz=form.querySelector('[name=return_destination]');if(rp&&!rp.value)rp.value=z;if(rz&&!rz.value)rz.value=p});form.addEventListener('submit',e=>{e.preventDefault();window.open(`https://wa.me/${SD.whatsapp}?text=${encodeURIComponent(waText(form))}`,'_blank','noopener')})});
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-visible')}),{threshold:.12});$$('.reveal,.vehicle-card').forEach(x=>obs.observe(x));
const nav=$('[data-nav]'),toggle=$('[data-nav-toggle]');toggle?.addEventListener('click',()=>nav?.classList.toggle('is-open'));

// V7: sharp generated vehicle assets + subtle motion, without turning the site into a showroom.
const v7Asset=name=>(isEN()?'../assets/':'assets/')+name;
const setVehicleImg=(img,name,alt)=>{if(!img)return;img.src=v7Asset(name);img.alt=alt;img.decoding='async'};

function installV7Styles(){
  if($('#sd-v7-styles'))return;
  const style=document.createElement('style');
  style.id='sd-v7-styles';
  style.textContent=`
.hero-grid{min-height:620px;padding:72px 0 108px;overflow:visible}
.hero-copy{max-width:650px;position:relative;z-index:4}
.hero-drive-in{position:absolute;right:-140px;bottom:45px;width:min(760px,62vw);z-index:2;pointer-events:none;opacity:.92;filter:drop-shadow(0 34px 34px rgba(0,0,0,.34));animation:sdDriveIn 1.15s cubic-bezier(.18,.78,.22,1) .08s both;-webkit-mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,.52) 15%,#000 31%);mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,.52) 15%,#000 31%)}
.hero-drive-in img{width:100%;height:auto;object-fit:contain;filter:contrast(1.03) saturate(.92)}
@keyframes sdDriveIn{0%{transform:translate3d(170px,7px,0) scale(.985);opacity:0}70%{opacity:.94}100%{transform:translate3d(0,0,0) scale(1);opacity:.92}}
.hero-stats{z-index:5}
.service-card{background:#fff!important;color:#071019!important;border-color:#dfe4e8!important;transition:background .24s ease,color .24s ease,border-color .24s ease,transform .24s ease,box-shadow .24s ease}
.service-card:hover,.service-card:focus-within{background:#071019!important;color:#fff!important;border-color:#071019!important;transform:translateY(-4px);box-shadow:0 22px 48px rgba(7,16,25,.16)}
.service-visual{height:188px;background:linear-gradient(180deg,#edf0f2 0%,#fafbfb 100%)!important;transition:background .24s ease}
.service-visual img{width:94%;max-height:180px;object-fit:contain;transform:translateY(3px) scale(1);filter:drop-shadow(0 18px 20px rgba(6,15,22,.16));transition:transform .34s cubic-bezier(.2,.8,.2,1),filter .34s ease}
.service-card:hover .service-visual,.service-card:focus-within .service-visual{background:linear-gradient(180deg,#0e1d29 0%,#09141d 100%)!important}
.service-card:hover .service-visual img,.service-card:focus-within .service-visual img{transform:translateY(-2px) scale(1.045);filter:drop-shadow(0 22px 24px rgba(0,0,0,.36))}
.service-card .route{color:#778491!important;transition:color .24s ease}.service-card:hover .route,.service-card:focus-within .route{color:#aebbc7!important}
.service-card .service-meta span{border-color:#e0e5ea!important;color:#687686!important;transition:border-color .24s ease,color .24s ease}.service-card:hover .service-meta span,.service-card:focus-within .service-meta span{border-color:rgba(255,255,255,.16)!important;color:#c2ccd5!important}
.service-card .btn-dark{background:#071019;color:#fff;border-color:#071019;transition:background .24s ease,color .24s ease,border-color .24s ease}.service-card:hover .btn-dark,.service-card:focus-within .btn-dark{background:#fff;color:#071019;border-color:#fff}
.vehicle-card{min-height:330px;background:#0a1722;grid-template-columns:1fr 1fr}.vehicle-card:nth-child(even){grid-template-columns:1fr 1fr}.vehicle-visual{min-height:310px;background:radial-gradient(circle at 52% 64%,rgba(127,168,207,.15),transparent 42%);overflow:hidden}.vehicle-visual img{width:min(86%,520px);max-height:270px;object-fit:contain;opacity:0;transform:translateX(92px) scale(.97);filter:drop-shadow(0 26px 25px rgba(0,0,0,.34));transition:opacity .7s ease,transform .9s cubic-bezier(.18,.8,.2,1)}.vehicle-card:nth-child(even) .vehicle-visual img{transform:translateX(-92px) scale(.97)}.vehicle-card.is-visible .vehicle-visual img,.vehicle-visual.reveal.is-visible img{opacity:1;transform:translateX(0) scale(1)}.vehicle-copy{padding:32px 36px}.vehicle-copy h3{font-size:28px}.split .vehicle-visual{border:1px solid rgba(255,255,255,.08);border-radius:16px;min-height:300px}.split .vehicle-visual img{width:min(86%,520px);max-height:270px}
@media(max-width:980px){.hero-grid{min-height:650px;padding-bottom:122px}.hero-copy{max-width:620px}.hero-drive-in{right:-190px;bottom:68px;width:min(760px,78vw);opacity:.62;-webkit-mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,.38) 22%,#000 42%);mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,.38) 22%,#000 42%)}.hero-stats{left:0;right:0}.vehicle-card,.vehicle-card:nth-child(even){grid-template-columns:1fr}.vehicle-card:nth-child(even) .vehicle-visual{order:0}}
@media(max-width:680px){.hero-grid{min-height:585px;padding:46px 0 190px}.hero-drive-in{display:none}.service-visual{height:158px}.service-visual img{max-height:150px;width:92%}.vehicle-visual{min-height:240px}.vehicle-visual img{max-height:225px}}
@media(prefers-reduced-motion:reduce){.hero-drive-in{animation:none;opacity:.82;transform:none}.vehicle-visual img,.service-visual img,.reveal{transition:none!important}}
`;
  document.head.append(style);
}

function v7Integrate(){
  installV7Styles();
  const en=isEN();
  const path=location.pathname.replace(/\/+$/,'');
  const isHome=path===''||path==='/'||/\/(?:en\/)?index\.html$/.test(path)||/\/en$/.test(path);
  const isVehicles=/\/(?:fahrzeuge|vehicles)\.html$/.test(path);
  const isXL=/\/xl-transfer\.html$/.test(path);

  // Replace the older soft assets everywhere with the new sharp generated silhouettes.
  $$('img').forEach(img=>{
    const src=img.getAttribute('src')||'';
    if(/e-class\.png$/i.test(src))setVehicleImg(img,'sd-sedan.webp',en?'Sedan':'Limousine');
    if(/v-class\.png$/i.test(src))setVehicleImg(img,'sd-van.webp',en?'Large-capacity vehicle':'Großraumfahrzeug');
  });

  if(isHome){
    const grid=$('.hero-grid');
    if(grid&&!$('.hero-drive-in',grid)){
      const drive=document.createElement('div');
      drive.className='hero-drive-in';
      const img=document.createElement('img');
      setVehicleImg(img,'sd-sedan.webp',en?'Airport transfer vehicle':'Flughafentransfer Fahrzeug');
      img.loading='eager';img.fetchPriority='high';
      drive.append(img);
      grid.append(drive);
    }

    const specs=en?[
      {img:'sd-sedan.webp',alt:'Sedan',route:'Sedan · FRA',chip:'Sedan'},
      {img:'sd-hahn.webp',alt:'Compact MPV',route:'Direct ride · HHN',chip:'Compact MPV'},
      {img:'sd-van.webp',alt:'Large-capacity vehicle',route:'Large-capacity vehicle',chip:'XL'}
    ]:[
      {img:'sd-sedan.webp',alt:'Limousine',route:'Limousine · FRA',chip:'Limousine'},
      {img:'sd-hahn.webp',alt:'Kompaktvan',route:'Direktfahrt · HHN',chip:'Kompaktvan'},
      {img:'sd-van.webp',alt:'Großraumfahrzeug',route:'Großraumfahrzeug',chip:'XL'}
    ];
    $$('.service-card').slice(0,3).forEach((card,i)=>{
      const spec=specs[i];if(!spec)return;
      card.classList.remove('dark');
      const visual=$('.service-visual',card);
      if(visual){visual.classList.remove('service-visual-route');visual.replaceChildren();const img=document.createElement('img');setVehicleImg(img,spec.img,spec.alt);img.loading='lazy';visual.append(img)}
      const route=$('.route',card);if(route)route.textContent=spec.route;
      const chip=$('.service-meta span',card);if(chip)chip.textContent=spec.chip;
      const btn=$('.btn',card);if(btn){btn.classList.remove('btn-light');btn.classList.add('btn-dark')}
    });

    const fleet=$('.fleet-grid')?.closest('.section-dark');
    if(fleet){
      const head=$('.section-head',fleet);const h=head?.querySelector('h2');const p=head?.querySelector('p');
      if(h)h.textContent=en?'Matched to the ride.':'Passend zur Fahrt.';
      if(p)p.textContent=en?'Vehicle size follows passengers, luggage and route — integrated cleanly into the layout, not staged as a showroom.':'Die Fahrzeuggröße richtet sich nach Personen, Gepäck und Strecke – ruhig ins Layout integriert, nicht als Showroom inszeniert.';
      const names=$$('.vehicle-copy h3',fleet);if(names[0])names[0].textContent=en?'Sedan':'Limousine';if(names[1])names[1].textContent=en?'Large-capacity vehicle':'Großraumfahrzeug';
    }
  }

  if(isVehicles){
    const section=$('.fleet-grid')?.closest('.section-dark');
    if(section){
      const head=$('.section-head',section);const h=head?.querySelector('h2');const p=head?.querySelector('p');
      if(h)h.textContent=en?'Two sizes. Matched to the ride.':'Zwei Größen. Passend zur Fahrt.';
      if(p)p.textContent=en?'We match the vehicle size to passengers and luggage.':'Je nach Personen und Gepäck wählen wir die passende Fahrzeuggröße.';
      const names=$$('.vehicle-copy h3',section);if(names[0])names[0].textContent=en?'Sedan':'Limousine';if(names[1])names[1].textContent=en?'Large-capacity vehicle':'Großraumfahrzeug';
    }
  }

  if(isXL){
    $$('.trust-item').forEach(item=>{const b=$('b',item);if(b&&/Mercedes|Vito|V-Class|V-Klasse/i.test(b.textContent)){b.textContent=en?'Large-capacity vehicle':'Großraumfahrzeug';const s=$('span',item);if(s)s.textContent=en?'Matched to the trip.':'Passend zur Fahrt.'}});
    const split=$('main .section-dark .split');
    if(split){const h=$('h2',split);const p=$('.section-head p',split);if(h)h.textContent=en?'Large-capacity vehicle':'Großraumfahrzeug';if(p)p.textContent=en?'More room for groups and luggage — the vehicle supports the service without dominating the page.':'Mehr Platz für Gruppen und Gepäck – das Fahrzeug unterstützt den Service, ohne die Seite zu dominieren.'}
  }
}

v7Integrate();
