(() => {
  const translations = {
    uz: {
      openingText:'Севги билан Сизни<br>ушбу унутилмас кунни биз билан бирга ўтказишга таклиф этамиз',
      openLabel:'Таклифномани очиш', heroSubtitle:'Оиламиз тарихи бошланадиган кун', scroll:'пастга',
      letterKicker:'Қадрли меҳмонимиз...',
      letterP1:'Ҳаётимиздаги энг гўзал ва унутилмас кунлардан бирини Сиз билан бирга нишонлаш биз учун катта бахт.',
      letterP2:'Сизни никоҳ тўйимиз муносабати билан бўлиб ўтадиган оқшомимизнинг азиз меҳмони бўлишга таклиф этамиз.',
      dateKicker:'Биз учун муҳим сана', month:'СЕНТЯБРЬ', dateTime:'Сешанба · 19:00', calendarMonth:'Сентябрь',
      weekdays:['Ду','Се','Чо','Па','Жу','Ша','Як'], countdownTitle:'Учрашувимизга қолди', days:'КУН', hours:'СОАТ', minutes:'ДАҚИҚА', seconds:'СОНИЯ',
      venueKicker:'Сизни кутамиз', venueTitle:'«Шахризода» тўйхонаси', venueDate:'29 сентябрь 2026', open2gis:'2GIS орқали очиш',
      pauseText:'Бир кун.<br>Бир қарор.<br><em>Бир умр бирга.</em>', familyKicker:'Сизни ҳурмат билан кутиб қоламиз', familyName:'Юлдашвой ҳожи ўғли<br>Бахтиёр Турсуметов оиласи',
      finalText:'Бу кун биз учун янада гўзал бўлади,<br>агар уни Сиз билан бирга ўтказсак.', withLove:'Севги билан ♡'
    },
    kz: {
      openingText:'Сүйіспеншілікпен Сіздерді<br>осы ұмытылмас күнді бізбен бірге өткізуге шақырамыз',
      openLabel:'Шақыруды ашу', heroSubtitle:'Отбасымыздың тарихы басталатын күн', scroll:'төмен',
      letterKicker:'Құрметті қонағымыз...',
      letterP1:'Өміріміздегі ең әдемі әрі ұмытылмас күндердің бірін Сізбен бірге атап өту — біз үшін үлкен бақыт.',
      letterP2:'Сіздерді неке тойымыздың құрметіне өтетін кешіміздің қадірлі қонағы болуға шақырамыз.',
      dateKicker:'Біз үшін маңызды күн', month:'ҚЫРКҮЙЕК', dateTime:'Сейсенбі · 19:00', calendarMonth:'Қыркүйек',
      weekdays:['Дс','Сс','Ср','Бс','Жм','Сб','Жс'], countdownTitle:'Кездесуімізге қалды', days:'КҮН', hours:'САҒАТ', minutes:'МИНУТ', seconds:'СЕКУНД',
      venueKicker:'Сізді күтеміз', venueTitle:'«Шахризода» тойханасы', venueDate:'29 қыркүйек 2026', open2gis:'2GIS-те ашу',
      pauseText:'Бір күн.<br>Бір шешім.<br><em>Бір ғұмыр бірге.</em>', familyKicker:'Сізді құрметпен күтеміз', familyName:'Юлдашвой қажы ұлы<br>Бахтиёр Турсуметов отбасы',
      finalText:'Бұл күн біз үшін одан да әдемі болады,<br>егер оны Сізбен бірге өткізсек.', withLove:'Сүйіспеншілікпен ♡'
    }
  };
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const opening=$('#opening'), gate=$('#languageGate'), main=$('#mainContent'), controls=$('#controls');
  const music=$('#bgMusic'), musicToggle=$('#musicToggle'), langToggle=$('#langToggle');
  let lang='uz', opened=false;
  const petalsLayer = $('#petalsLayer');
  const PETAL_COUNT = window.matchMedia('(max-width:600px)').matches ? 10 : 16;

  function createPetals(){
    if(!petalsLayer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    petalsLayer.innerHTML='';
    for(let i=0;i<PETAL_COUNT;i++){
      const petal=document.createElement('img');
      petal.className='petal';
      petal.src='assets/lepestok.png';
      petal.alt='';
      petal.setAttribute('aria-hidden','true');
      const left=Math.random()*100;
      const delay=Math.random()*8;
      const duration=10+Math.random()*9;
      const size=0.65+Math.random()*0.75;
      const drift=(Math.random()*2-1)*22;
      const sway=(Math.random()*2-1)*28;
      const rot=Math.round((Math.random()*2-1)*540);
      petal.style.left=`${left}%`;
      petal.style.width=`${Math.round(34*size)}px`;
      petal.style.setProperty('--drift-x',`${drift}vw`);
      petal.style.setProperty('--sway',`${sway}px`);
      petal.style.setProperty('--rot-end',`${rot}deg`);
      petal.style.animationDuration=`${duration}s,${3.2+Math.random()*2.2}s`;
      petal.style.animationDelay=`${-delay}s,${Math.random()*2}s`;
      petal.style.transform=`translate3d(0,-16vh,0) rotate(${Math.round(Math.random()*360)}deg)`;
      petal.addEventListener('animationend',e=>{
        if(e.animationName==='petalFall'){
          petal.remove();
          createPetal();
        }
      });
      petalsLayer.appendChild(petal);
    }
  }

  function createPetal(){
    if(!petalsLayer || !petalsLayer.classList.contains('is-visible')) return;
    const petal=document.createElement('img');
    petal.className='petal';
    petal.src='assets/lepestok.png';
    petal.alt='';
    petal.setAttribute('aria-hidden','true');
    const left=Math.random()*100;
    const duration=10+Math.random()*9;
    const size=0.65+Math.random()*0.75;
    petal.style.left=`${left}%`;
    petal.style.width=`${Math.round(34*size)}px`;
    petal.style.setProperty('--drift-x',`${(Math.random()*2-1)*22}vw`);
    petal.style.setProperty('--sway',`${(Math.random()*2-1)*28}px`);
    petal.style.setProperty('--rot-end',`${Math.round((Math.random()*2-1)*540)}deg`);
    petal.style.animationDuration=`${duration}s,${3.2+Math.random()*2.2}s`;
    petalsLayer.appendChild(petal);
    petal.addEventListener('animationend',e=>{
      if(e.animationName==='petalFall'){
        petal.remove();
        createPetal();
      }
    });
  }

  function applyLanguage(next){
    lang=next; document.documentElement.lang=next==='uz'?'uz':'kk'; document.documentElement.dataset.lang=next;
    const t=translations[next];
    $$('[data-i18n]').forEach(el=>{ if(t[el.dataset.i18n]!==undefined) el.innerHTML=t[el.dataset.i18n]; });
    $('#weekdays').innerHTML=t.weekdays.map(x=>`<span>${x}</span>`).join('');
    langToggle.textContent=next==='uz'?'KZ':'UZ';
    langToggle.setAttribute('aria-label', next==='uz'?'Қазақ тіліне ауыстыру':'Ўзбек тилига ўтиш');
  }

  function openInvitation(){
    if(opened) return;
    opened=true;
    $('#openInvitation').disabled=true;

    const revealGate=()=>{
      gate.style.display='grid';
      gate.style.pointerEvents='auto';
      gate.setAttribute('aria-hidden','false');
      if(window.gsap){
        gsap.set(gate,{autoAlpha:0});
        gsap.to(gate,{autoAlpha:1,duration:.28,ease:'power2.out'});
        gsap.fromTo('.language-card',{y:14,opacity:0,scale:.985},{y:0,opacity:1,scale:1,duration:.4,ease:'power3.out',delay:.04});
      }else{
        gate.style.visibility='visible';
        gate.style.opacity='1';
        gate.style.pointerEvents='auto';
      }
    };

    if(window.gsap){
      const tl=gsap.timeline({defaults:{ease:'power3.inOut'}});
      tl.to('.envelope-trigger img',{scale:1.05,y:8,duration:.22})
        .to('.opening-content',{opacity:0,y:-8,duration:.18},'-=.03')
        .to(opening,{opacity:0,duration:.2,onComplete:()=>{
          opening.style.display='none';
          revealGate();
        }});
    }else{
      opening.style.display='none';
      revealGate();
    }
  }

  function setLanguageMusic(next, shouldPlay=false){
    const source = next === 'kz' ? 'assets/music-kz.mp3' : 'assets/music-uz.mp3';
    const wasPlaying = shouldPlay || (music && !music.paused);
    if(music.dataset.track !== source){
      music.pause();
      music.src = source;
      music.dataset.track = source;
      music.load();
    }
    if(wasPlaying){
      music.play().catch(()=>{});
      if(musicToggle) musicToggle.textContent='Ⅱ';
    }
  }

  function enterSite(next){
    applyLanguage(next);
    setLanguageMusic(next, true);
    gate.setAttribute('aria-hidden','true'); gate.style.pointerEvents='none'; main.setAttribute('aria-hidden','false'); controls.setAttribute('aria-hidden','false'); document.body.classList.remove('locked'); if(petalsLayer){createPetals(); petalsLayer.classList.add('is-visible');}
    if(window.gsap){gsap.to(gate,{autoAlpha:0,duration:.55,onComplete:()=>gate.style.display='none'});gsap.to(controls,{autoAlpha:1,duration:.5,delay:.25}); animateIn();}else{gate.style.display='none';controls.style.visibility='visible';controls.style.opacity='1';}
    if(music.src) music.play().catch(()=>{});
  }

  function animateIn(){
    if(!window.gsap||!window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero .eyebrow,.hero-date,.names span,.names i,.hero-subtitle',{opacity:0,y:18,filter:'blur(7px)',stagger:.1,duration:1,ease:'power3.out',delay:.25});
    const reveal=(selector,vars={})=>gsap.from(selector,{opacity:0,y:24,filter:'blur(7px)',duration:.9,ease:'power3.out',scrollTrigger:{trigger:selector,start:'top 82%',once:true},...vars});
    reveal('.paper-card'); reveal('.date-copy'); reveal('.calendar-card'); reveal('.count-inner'); reveal('.venue-content'); reveal('.photo-copy'); reveal('.family-content'); reveal('.final-content');
    gsap.utils.toArray('.hero-corner,.letter-left,.letter-right,.date-flower,.date-roses,.count-flower-left,.count-flower-right,.venue-top-art,.venue-side-art,.family-left,.family-right,.final-left,.final-right').forEach((el,i)=>gsap.to(el,{y:i%2?35:-30,rotate:`+=${i%2?3:-3}`,ease:'none',scrollTrigger:{trigger:el.closest('section'),start:'top bottom',end:'bottom top',scrub:1.2}}));
    gsap.to('.hero-photo',{y:-28,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:1}});
    gsap.to('.photo-bg',{scale:1.08,ease:'none',scrollTrigger:{trigger:'#photo',start:'top bottom',end:'bottom top',scrub:1}});
  }

  function buildCalendar(){
    const grid=$('#calendarDays'); let html='';
    for(let i=0;i<1;i++) html+='<span class="empty">0</span>';
    for(let d=1;d<=30;d++) html+=`<span class="${d===29?'wedding-day':''}">${d}</span>`;
    grid.innerHTML=html;
  }

  function countdown(){
    const target=new Date(2026,8,29,19,0,0).getTime(); const diff=Math.max(0,target-Date.now());
    const vals=[Math.floor(diff/86400000),Math.floor(diff%86400000/3600000),Math.floor(diff%3600000/60000),Math.floor(diff%60000/1000)];
    ['days','hours','minutes','seconds'].forEach((id,i)=>$('#'+id).textContent=String(vals[i]).padStart(2,'0'));
  }

  $('#openInvitation').addEventListener('click',openInvitation);
  $$('.language-button').forEach(b=>b.addEventListener('click',()=>enterSite(b.dataset.language)));
  langToggle.addEventListener('click',()=>{
    const next = lang==='uz'?'kz':'uz';
    const wasPlaying = music && !music.paused;
    applyLanguage(next);
    setLanguageMusic(next, wasPlaying);
  });
  musicToggle.addEventListener('click',()=>{ if(music.paused){music.play().catch(()=>{});musicToggle.textContent='Ⅱ';}else{music.pause();musicToggle.textContent='♪';} });
  buildCalendar(); applyLanguage('uz'); setLanguageMusic('uz', false); createPetals(); countdown(); setInterval(countdown,1000);
})();
