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
