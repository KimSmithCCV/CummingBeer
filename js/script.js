
(function(){
  // ---- Age gate ----
  var gate = document.getElementById('ageGate');
  var card = document.getElementById('ageCard');
  var STORE_KEY = 'cb_age_verified';
  function getStored(){ try { return localStorage.getItem(STORE_KEY); } catch(e){ return null; } }
  function setStored(v){ try { localStorage.setItem(STORE_KEY, v); } catch(e){} }
  if (getStored() === 'yes'){ gate.hidden = true; } else { document.documentElement.style.overflow = 'hidden'; }
  document.getElementById('ageYes').addEventListener('click', function(){
    setStored('yes'); gate.hidden = true; document.documentElement.style.overflow = '';
  });
  document.getElementById('ageNo').addEventListener('click', function(){
    setStored('no'); card.classList.add('declined');
    document.getElementById('ageHeadline').textContent = "You've gotta be 21+";
    document.getElementById('ageBody').textContent = "Come back once you're of legal drinking age.";
    document.getElementById('ageActions').innerHTML = '';
  });

  // ---- Beer modal ----
  var BEERS = {
    wheat: {img:'images/bike-trail-lifestyle.jpg', photo:true, style:'Citrus Wheat', name:'Bike Trail', abv:'5.5% ABV', accent:'#E1731D',
      desc:[['The Pour','Pale straw to golden and a little hazy, with real wheat character and bright citrus notes of lemon zest and orange peel. Light, crisp, easy drinking, and basically made for post-ride refreshment.'],['The Name','Named for the Great Western Trail, which runs right through town, connecting Cumming to Martensdale to the south and the greater Des Moines trail system to the north. Making Cumming the destination it\'s always been born to be.']]},
    stout: {img:'images/IMG_3970.webp', photo:true, style:'Coffee Stout', name:'All Hat, No Cattle', abv:'5% ABV', accent:'#3A7088',
      desc:[['The Pour','Brewed with Colombian single-origin coffee for a roasty, coffee-and-chocolate character. Deep brown to black with a creamy head. Coffee and chocolate lead, with a smooth, slightly creamy finish. Moderate bitterness, no bravado required.'],['The Name','Inspired by daydreams of simpler days on the prairie, when life moved a little slower and a good cowboy hat said plenty. These days, our lives are a bit busier and Cumming Cattle Co. is taking a brief hiatus from cattle duty. So for now, we\'re tipping our hats to the past, enjoying a little Western nostalgia, and raising a glass to the cowboy spirit. Because really, who doesn\'t love a good cowboy hat?']]},
    ipa: {img:'images/CZP_3363_(2048).jpg', photo:true, style:'India Pale Ale', name:'All Clucked Up', abv:'6.5% ABV', accent:'#D6841F',
      desc:[['The Pour','Piney, citrusy, resinous. Bold and hop-forward, with that sticky, pine-and-evergreen hop character built for people who read the can and ordered it anyway. Crazy good. Badge and all.'],['The Name','Your invitation to come for the drinks at the Mercantile, then venture over to the chickens at Middlebrook Farm. Grab a beer, visit the flock, and get clucked up together. Because good drinks and chickens are always better with friends.']]},
    lager: {img:'images/middlebrook-mercantile-lager.JPG', photo:true, style:'American Lager', name:'Cumming', abv:'5.5% ABV', accent:'#9F741E',
      desc:[['The Pour','The flagship. Straightforward, crisp, and easy-drinking, this is our take on a classic lager. Light-bodied and refreshing with a clean malt character, subtle sweetness, and delicate bready notes, it finishes smooth and dry with just enough bitterness to keep you reaching for another.'],['The Name','The one that intentionally put Cumming\'s name on a can. Inspired by the landmarks that make our town home: the old schoolhouse turned wine and cocktail bar, the restored turn-of-the-century barn, and that tall, lanky water tower.']]}
  };

  var backdrop = document.getElementById('modalBackdrop');
  var modalImg = document.getElementById('modalImg');
  var modalStyle = document.getElementById('modalStyle');
  var modalName = document.getElementById('modalName');
  var modalAbv = document.getElementById('modalAbv');
  var modalDesc = document.getElementById('modalDesc');
  var modalBody = document.getElementById('modalBody');

  function openBeer(key){
    var b = BEERS[key];
    if(!b) return;
    modalImg.src = b.img;
    modalImg.alt = b.name + ' can art';
    modalStyle.textContent = b.style;
    modalName.textContent = b.name;
    modalAbv.textContent = b.abv;
    modalDesc.innerHTML = b.desc.map(function(s){ return '<p class="tasting-label">' + s[0] + '</p><p>' + s[1] + '</p>'; }).join('');
    backdrop.style.setProperty('--accent', b.accent);
    modalHero.classList.toggle('photo-mode', !!b.photo);
    backdrop.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeModal(){
    backdrop.classList.remove('open');
    if (getStored() === 'yes') document.documentElement.style.overflow = '';
  }
  document.querySelectorAll('.beer-card').forEach(function(btn){
    btn.addEventListener('click', function(){ openBeer(btn.getAttribute('data-beer')); });
  });


  document.getElementById('modalClose').addEventListener('click', closeModal);
  backdrop.addEventListener('click', function(e){ if(e.target === backdrop) closeModal(); });
  window.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeModal(); });

  // ---- eNews AJAX ----
  var enewsForm = document.getElementById('enewsForm');
  var enewsStatus = document.getElementById('enewsStatus');
  enewsForm.addEventListener('submit', function(e){
    e.preventDefault();
    var action = enewsForm.getAttribute('action').replace('formsubmit.co/', 'formsubmit.co/ajax/');
    enewsStatus.textContent = 'Sending...';
    enewsStatus.className = 'form-status';
    fetch(action, {method:'POST', headers:{'Accept':'application/json'}, body:new FormData(enewsForm)})
      .then(function(res){
        if(res.ok){
          enewsStatus.textContent = "Thanks, you're on the list.";
          enewsStatus.className = 'form-status ok';
          enewsForm.reset();
        } else { throw new Error('bad'); }
      })
      .catch(function(){
        enewsStatus.textContent = 'Demo form. Wire up a real inbox address to go live.';
        enewsStatus.className = 'form-status';
      });
  });
})();
