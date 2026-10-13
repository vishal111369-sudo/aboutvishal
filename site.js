(function(){
  /* mobile menu */
  function $(id){return document.getElementById(id);}
  var t=document.querySelector('.menu-toggle'),l=document.querySelector('.nav-links');
  t.addEventListener('click',function(){var o=l.classList.toggle('open');t.setAttribute('aria-expanded',o);});
  l.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){l.classList.remove('open');t.setAttribute('aria-expanded',false);});});

  /* hero loop */
  var caps=[
    '<b>First deposit:</b> I convert registrations into first deposits, with welcome offers protected from duplicate accounts.',
    '<b>Onboarding:</b> I guide new players through their first 5 deposits, so they cover the cost of acquisition and high-value players are spotted early.',
    '<b>Retention:</b> I keep players active and profitable with cashback, missions and ladders, each one tested against a holdout group.',
    '<b>Reactivation:</b> I win lapsed players back at the right moment, then move them back into the retention journey.',
    '<b>VIP:</b> I grow top players with personal care. They arrive from retention, or straight from onboarding when their value is clear early.'
  ];
  var nodes=document.querySelectorAll('.loop-svg .nd'),cap=document.getElementById('loopCaption'),li=0;
  if(cap){function step(){nodes.forEach(function(n,i){n.classList.toggle('on',i===li);});cap.innerHTML=caps[li];li=(li+1)%nodes.length;}
  step(); if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){setInterval(step,2600);}}

  /* lifecycle explorer */
  var S=[
    {t:'First deposit',k:'Acquisition → FTD',goal:'Turn a registration into a first deposit, without paying welcome bonuses to people who will never stay.',
     sig:['Registration with no deposit after 24 hours','Payment method attempts and failures','Device and IP links to other accounts'],
     kpi:['Registration to FTD rate','Time to first deposit','Welcome bonus cost per FTD'],
     plays:['Deposit nudges across email, SMS and push','Welcome offer matched to market and payment type','Duplicate-account checks before any bonus'],
     proof:'Early-life bonuses blocked for players with 3+ accounts on one device or IP.',link:'c4'},
    {t:'Onboarding',k:'First 5 deposits',goal:'Guide new players through their first 5 deposits, so each one pays back the cost of acquiring them, and spot future VIPs early.',
     sig:['Time between deposit 1, 2 and 3','First games, bet sizes and deposit amounts','Bonus use vs real-money play'],
     kpi:['Deposit 2 to 5 conversion','CPA payback per player','Early NGR per player'],
     plays:['Deposit-by-deposit journeys with a clear next offer','Missions and free spins on games they already like','Early value tiering, with high-value players sent straight to VIP'],
     proof:'Automated lifecycle onboarding: built onboarding and early-retention flows for a crypto-first casino.',link:null},
    {t:'Retention',k:'Active players',goal:'Keep players active and profitable, and prove every offer adds value before scaling it.',
     sig:['Deposit and login frequency','Net losses for the week','Reward cost against GGR'],
     kpi:['NGR per player','Reward cost % of GGR','Active player rate'],
     plays:['Weekly cashback and cashback ladders','Leaderboards, wheels and loyalty store','A/B tests with a holdout group on every big offer'],
     proof:'Cashback ladder delivered +47% NGR per player vs holdout.',link:'c1'},
    {t:'Reactivation',k:'Lapsed players',goal:'Win players back at the right moment, with an offer that costs less than the value they bring back.',
     sig:['Days since last login vs their usual gap','Withdrawal followed by silence','Past value and favourite products'],
     kpi:['Reactivation rate','Post-return NGR','Cost per reactivated player'],
     plays:['Tiered win-back offers by past value','Timing based on each player\'s rhythm','Personal contact for high-value players'],
     proof:'A high-value reactivation campaign exposed a VIP control gap, which I closed with eligibility segments.',link:'c3'},
    {t:'VIP',k:'High value',goal:'Give top players a personal experience, while keeping every reward inside clear rules.',
     sig:['Value tier movements','Manual award requests','Cashout patterns after bonuses'],
     kpi:['VIP NGR and retention','VIP reward cost %','Manual awards out of policy'],
     plays:['Weekly VIP cashback','Account manager journeys','Guardrails on manual awards'],
     proof:'Reward cost held at ~20% of GGR on a ~100K-player brand.',link:'c2'}
  ];
  var sw=document.getElementById('stages'),sp=document.getElementById('stagePanel');
  if(sw){
  S.forEach(function(s,i){var b=document.createElement('button');b.className='stage-btn';b.setAttribute('role','tab');b.setAttribute('aria-selected',i===2?'true':'false');
    b.innerHTML='<span class="n">0'+(i+1)+'</span><span class="t">'+s.t+'</span><span class="k">'+s.k+'</span>';
    b.addEventListener('click',function(){showStage(i);});sw.appendChild(b);});
  function ul(a){return '<ul>'+a.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';}
  function showStage(i){var s=S[i];sw.querySelectorAll('.stage-btn').forEach(function(b,j){b.setAttribute('aria-selected',j===i?'true':'false');});
    sp.innerHTML='<p class="stage-goal">'+s.goal+'</p><div class="stage-cols"><div><h4>Signals I watch</h4>'+ul(s.sig)+'</div><div><h4>KPIs I own</h4>'+ul(s.kpi)+'</div><div><h4>What I do</h4>'+ul(s.plays)+'</div></div>'+
      '<div class="stage-proof"><span class="tick">✓</span><span>'+s.proof+(s.link?' <a href="case-studies.html#'+s.link+'">See the case study</a>':'')+'</span></div>';
  }
  showStage(2);}

  /* case tabs */
  var tabs=document.querySelectorAll('.case-tab');
  function animateBars(c){c.querySelectorAll('.fill[data-w]').forEach(function(f){f.style.width='0';requestAnimationFrame(function(){requestAnimationFrame(function(){f.style.width=f.getAttribute('data-w')+'%';});});});}
  function openCase(id){tabs.forEach(function(x){x.setAttribute('aria-selected',x.getAttribute('data-case')===id?'true':'false');});
    document.querySelectorAll('.case').forEach(function(c){c.classList.toggle('on',c.id===id);});animateBars(document.getElementById(id));
    if(history.replaceState)history.replaceState(null,'','#'+id);}
  tabs.forEach(function(tb){tb.addEventListener('click',function(){openCase(tb.getAttribute('data-case'));});});
  if(tabs.length){var h=(location.hash||'').slice(1);openCase(/^c[1-5]$/.test(h)?h:'c1');
    window.addEventListener('hashchange',function(){var x=location.hash.slice(1);if(/^c[1-5]$/.test(x))openCase(x);});
    document.querySelectorAll('.more').forEach(function(d){d.addEventListener('toggle',function(){if(d.open)animateBars(d);});});}

  /* guardrail cards */
  document.querySelectorAll('.rule').forEach(function(r){r.addEventListener('click',function(){r.classList.toggle('flipped');});});

  /* calculator */
  var eur=function(v,d){return '€'+v.toLocaleString('en-GB',{minimumFractionDigits:d||0,maximumFractionDigits:d||0});};
  if($('i_players')){
  function calc(){
    var P=+$('i_players').value,C=+$('i_conv').value,W=+$('i_wager').value,R=+$('i_rtp').value,CB=+$('i_cb').value,WR=+$('i_wr').value,B=+$('i_budget').value;
    var he=(100-R)/100,n=Math.round(P*C/100),theo=W*he,cb=theo*CB/100,claw=Math.min(cb*WR*he,cb),net=cb-claw,tot=net*n,pct=B?tot/B*100:0;
    $('o_players').textContent=P.toLocaleString('en-GB');$('o_conv').textContent=C+'%';$('o_wager').textContent=eur(W);
    $('o_rtp').textContent=R+'% (edge '+(100-R).toFixed(1)+'%)';$('o_cb').textContent=CB+'%';$('o_wr').textContent=WR+'×';$('o_budget').textContent=eur(B);
    $('r_conv').textContent=n.toLocaleString('en-GB');$('r_theo').textContent=eur(theo,2);$('r_cb').textContent=eur(cb,2);
    $('r_claw').textContent=eur(claw,2);$('r_net').textContent=eur(net,2);$('r_total').textContent=eur(tot);
    $('r_pct').textContent=Math.round(pct)+'%';var bar=$('r_bar');bar.style.width=Math.min(pct,100)+'%';
    bar.style.background=pct>100?'#fb7185':pct>85?'#fbbf24':'#5eead4';
    var v=$('r_verdict');
    if(pct>100){v.innerHTML='Over budget by '+eur(tot-B)+'. I would raise wagering, lower the cashback % or tighten the segment before launch.';}
    else if(pct>85){v.innerHTML='Close to the limit. It works, but there is little room if conversion beats the forecast.';}
    else{v.innerHTML='Inside budget with '+eur(B-tot)+' to spare. Room to test a richer variant against a holdout.';}
    $('r_math').innerHTML='<b>Theo</b> = '+eur(W)+' wagered × '+(he*100).toFixed(1)+'% edge = '+eur(theo,2)+
      '<br><b>Cashback</b> = '+eur(theo,2)+' × '+CB+'% = '+eur(cb,2)+
      '<br><b>Clawback</b> = '+eur(cb,2)+' × '+WR+'× wagering × '+(he*100).toFixed(1)+'% = '+eur(claw,2)+
      '<br><b>Net cost</b> = '+eur(net,2)+' per player × '+n.toLocaleString('en-GB')+' players = '+eur(tot)+
      '<br><b>Cost as % of theo</b> = '+(theo?Math.round(net/theo*100):0)+'%, a proxy for reward cost as % of GGR';
  }
  document.querySelectorAll('#calcInputs input').forEach(function(i){i.addEventListener('input',calc);});calc();}

  /* playerpulse */
  var names={s1:'Capture',s2:'Analyse',s3:'Act'};
  document.querySelectorAll('.pp-step').forEach(function(b){b.addEventListener('click',function(){var id=b.getAttribute('data-s');
    document.querySelectorAll('.pp-step').forEach(function(x){x.setAttribute('aria-selected',x===b?'true':'false');});
    document.querySelectorAll('.scr').forEach(function(s){s.classList.toggle('on',s.id===id);});$('scrLabel').textContent='PlayerPulse · '+names[id];});});
})();
