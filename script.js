
// Helpers
function rand(min, max){ return Math.random()*(max-min)+min; }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)] }

// Floating hearts background
function spawnHearts(n=20){
  for(let i=0;i<n;i++){
    const h = document.createElement('div');
    h.className = 'heart';
    h.style.left = rand(0,100) + 'vw';
    h.style.top = rand(0,100) + 'vh';
    const dur = rand(8,16);
    h.animate([
      { transform: `translate(-50%, -50%) rotate(45deg)` },
      { transform: `translate(-50%, -60vh) rotate(45deg)` }
    ], { duration: dur*1000, iterations: Infinity, easing: 'linear', delay: rand(0,3000)});
    document.body.appendChild(h);
  }
}

// Scene (gallery)
function startScene(images){
  const container = document.querySelector('.scene');
  const layer = document.querySelector('.layer');

  // Create floating texts
  const lines = [
    'I love you so much baby♡',
    'I love you, Manish',
    'You are my greatest blessing',
    'Always, always, always ♡',
    'You make my world brighter'
  ];

  for(let i=0;i<18;i++){
    const t = document.createElement('div');
    t.className = 'float-text';
    t.style.left = rand(-10, 80) + 'vw';
    t.style.top = rand(-10, 90) + 'vh';
    const s = document.createElement('span');
    s.className='inner glow';
    s.textContent = pick(lines);
    t.appendChild(s);
    layer.appendChild(t);

    const z = rand(-300, 200);
    t.style.transform = `translateZ(${z}px)`;

    const moveX = rand(-40, 40);
    const moveY = rand(-30, 30);
    const dur = rand(8000, 16000);
    t.animate([
      { transform: `translate(${0}px, ${0}px) translateZ(${z}px)`},
      { transform: `translate(${moveX}vw, ${moveY}vh) translateZ(${z}px)`}
    ], {duration: dur, direction: 'alternate', iterations: Infinity, easing: 'ease-in-out', delay: rand(0,4000)});
  }

  // Create floating photo cards
  images.forEach((src, idx)=>{
    const c = document.createElement('figure');
    c.className = 'card';
    c.style.left = rand(0, 80) + 'vw';
    c.style.top = rand(0, 70) + 'vh';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Manish';
    c.appendChild(img);
    layer.appendChild(c);

    const z = rand(-200, 250);
    c.style.transform = `translateZ(${z}px) rotateY(${rand(-10,10)}deg) rotateX(${rand(-6,6)}deg)`;

    c.animate([
      { transform: `translateZ(${z}px) rotateY(${0}deg) rotateX(${0}deg)`},
      { transform: `translateZ(${z}px) rotateY(${rand(-25,25)}deg) rotateX(${rand(-12,12)}deg)`}
    ], {duration: rand(9000, 16000), direction: 'alternate', iterations: Infinity, easing: 'ease-in-out', delay: rand(0,4000)});
  });

  // Parallax on mouse
  let cx=0, cy=0;
  window.addEventListener('mousemove', (e)=>{
    cx = (e.clientX / window.innerWidth - 0.5) * 2;
    cy = (e.clientY / window.innerHeight - 0.5) * 2;
    layer.style.transform = `rotateY(${cx*8}deg) rotateX(${-cy*6}deg)`;
  });
}

// Export for pages
window.Site = { spawnHearts, startScene };
