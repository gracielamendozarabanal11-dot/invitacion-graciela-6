function openInvitation(){
  const openBtn=document.getElementById('openEnvelope');
  const screen=document.getElementById('envelopeScreen');
  const invitation=document.getElementById('invitation');
  const audio=document.getElementById('audio');
  const musicBtn=document.getElementById('musicBtn');

  if(!openBtn || !screen || !invitation) return;

  openBtn.classList.add('open');

  // Show the card after the envelope-opening animation.
  setTimeout(function(){
    screen.classList.add('hide');
    invitation.classList.remove('hidden');
    invitation.style.display='block';
    window.scrollTo(0,0);

    if(audio){
      const playPromise=audio.play();
      if(playPromise && playPromise.then){
        playPromise.then(function(){
          if(musicBtn) musicBtn.textContent='❚❚';
        }).catch(function(){});
      }
    }
  },900);
}

(function(){
  const openBtn=document.getElementById('openEnvelope');
  if(openBtn){
    // Fallback for browsers where inline handlers are restricted.
    openBtn.addEventListener('click', function(){
      if(!openBtn.classList.contains('open')) openInvitation();
    });
  }

  const audio=document.getElementById('audio');
  const musicBtn=document.getElementById('musicBtn');
  const progress=document.getElementById('musicProgress');

  if(musicBtn && audio){
    musicBtn.addEventListener('click', function(e){
      e.stopPropagation();
      if(audio.paused){
        audio.play().then(function(){musicBtn.textContent='❚❚'}).catch(function(){});
      }else{
        audio.pause();
        musicBtn.textContent='▶';
      }
    });
    audio.addEventListener('timeupdate', function(){
      if(audio.duration && progress){
        progress.style.width=(audio.currentTime/audio.duration*100)+'%';
      }
    });
    audio.addEventListener('ended', function(){musicBtn.textContent='▶';});
  }

  const target=new Date('2026-10-18T12:00:00-05:00').getTime();
  function updateCountdown(){
    let diff=Math.max(0,target-Date.now());
    const d=Math.floor(diff/86400000);
    const h=Math.floor(diff%86400000/3600000);
    const m=Math.floor(diff%3600000/60000);
    const s=Math.floor(diff%60000/1000);
    const set=function(id,val){const el=document.getElementById(id);if(el)el.textContent=val;};
    set('days',d);
    set('hours',String(h).padStart(2,'0'));
    set('minutes',String(m).padStart(2,'0'));
    set('seconds',String(s).padStart(2,'0'));
  }
  updateCountdown();
  setInterval(updateCountdown,1000);
})();