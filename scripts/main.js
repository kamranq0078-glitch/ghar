(() => {
  const scenes = [window.SceneDawn, window.SceneKitchen, window.SceneSittingRoom, window.SceneNursery, window.SceneBalcony];
  const root = document.querySelector('.journey');
  const art = document.getElementById('scene-art');
  const weather = document.getElementById('weather');
  const time = document.getElementById('time-label');
  const title = document.getElementById('scene-title');
  const subtitle = document.getElementById('scene-subtitle');
  const count = document.getElementById('scene-count');
  const action = document.getElementById('scene-action');
  const hint = document.getElementById('hint');
  const dots = document.getElementById('time-stops');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0, transitionTimer, lastInteraction = 0;
  const dotButtons = scenes.map((scene, index) => {
    const button = document.createElement('button');
    button.className = 'time-stop'; button.type = 'button';
    button.setAttribute('aria-label', `${scene.time}: ${scene.title}`);
    button.addEventListener('click', () => show(index)); dots.append(button); return button;
  });
  function show(index) {
    const nextIndex = (index + scenes.length) % scenes.length;
    if (nextIndex === current && art.innerHTML) return;
    current = nextIndex; const scene = scenes[current]; root.dataset.scene = String(current);
    root.classList.add('is-transitioning'); clearTimeout(transitionTimer);
    transitionTimer = setTimeout(() => {
      time.textContent = scene.time; title.textContent = scene.title; subtitle.textContent = scene.subtitle;
      count.textContent = `${String(current + 1).padStart(2, '0')} / 05`;
      hint.textContent = scene.hint; action.setAttribute('aria-label', scene.action); art.innerHTML = scene.art;
      drawWeather(scene.weather); dotButtons.forEach((dot, i) => dot.setAttribute('aria-current', i === current ? 'true' : 'false'));
      root.classList.remove('is-transitioning');
    }, reduce ? 0 : 300);
  }
  function drawWeather(kind) {
    weather.replaceChildren();
    const random = (seed) => { let value = seed; return () => { value = (value * 16807) % 2147483647; return (value - 1) / 2147483646; }; };
    const rand = random(349 + current * 881);
    const total = kind === 'snow' ? (reduce ? 18 : 65) : kind === 'mist' ? 3 : 12;
    for (let i = 0; i < total; i += 1) {
      const particle = document.createElement('i');
      particle.className = `weather-item ${kind === 'mist' ? 'mist' : kind === 'steam' ? 'steam' : kind === 'snow' ? 'snowflake' : 'dust'}`;
      if (kind === 'mist') particle.style.bottom = `${13 + i * 8}%`;
      else if (kind === 'steam') { particle.style.left = `${44 + i * 3}%`; particle.style.bottom = `${32 + (i % 3) * 3}%`; particle.style.animationDelay = `${-rand() * 3}s`; }
      else {
        particle.style.left = `${rand() * 100}%`; particle.style.top = `${rand() * 75}%`;
        particle.style.animationDelay = `${-rand() * (kind === 'snow' ? 9 : 6)}s`;
        particle.style.animationDuration = `${kind === 'snow' ? 7 + rand() * 7 : 4 + rand() * 4}s`;
        particle.style.opacity = `${.2 + rand() * .65}`;
        if (kind === 'dust') particle.style.animationDelay = `${-rand() * 6}s`;
      }
      weather.append(particle);
    }
  }
  function touchScene(event, fromAction = false) {
    if (Date.now() - lastInteraction < 350 || (!fromAction && event.target.closest('button')) || event.target.closest('.topbar')) return;
    if (event.type === 'pointerdown' && event.pointerType === 'mouse' && event.button !== 0) return;
    lastInteraction = Date.now(); const scene = scenes[current], effect = scene.interact();
    if (effect === 'leaves') for (let i = 0; i < 8; i += 1) {
      const leaf = document.createElement('i'); leaf.className = 'weather-item leaf'; leaf.textContent = '✦';
      leaf.style.left = `${28 + Math.random() * 44}%`; leaf.style.top = `${20 + Math.random() * 26}%`;
      leaf.style.animationDelay = `${Math.random() * .45}s`; weather.append(leaf);
      leaf.addEventListener('animationend', () => leaf.remove(), { once: true });
    }
    else if (effect === 'steam' || effect === 'mobile') {
      const prev = weather.innerHTML, burst = document.createElement('span');
      burst.className = `weather-item ${effect === 'mobile' ? 'dust' : 'steam'}`;
      burst.style.left = effect === 'mobile' ? '61%' : '50%'; burst.style.bottom = '33%';
      burst.style.width = effect === 'mobile' ? '7px' : '35px'; burst.style.height = effect === 'mobile' ? '7px' : '65px'; weather.append(burst);
      if (effect === 'mobile') art.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(1.2deg)' }, { transform: 'rotate(0)' }], { duration: 1800, easing: 'ease-in-out' });
      setTimeout(() => { if (current === 1 || current === 2 || current === 3) weather.innerHTML = prev; }, 2400);
    } else if (effect === 'breath') {
      const puff = document.createElement('span'); puff.className = 'breath';
      puff.style.left = `${35 + Math.random() * 30}%`; puff.style.top = `${40 + Math.random() * 14}%`;
      weather.append(puff); puff.addEventListener('animationend', () => puff.remove(), { once: true });
    }
  }
  document.getElementById('next').addEventListener('click', () => show(current + 1));
  document.getElementById('previous').addEventListener('click', () => show(current - 1));
  action.addEventListener('click', (event) => { event.stopPropagation(); touchScene(event, true); });
  root.addEventListener('pointerdown', touchScene);
  window.addEventListener('keydown', (event) => { if (event.key === 'ArrowRight' || event.key === 'PageDown') show(current + 1); if (event.key === 'ArrowLeft' || event.key === 'PageUp') show(current - 1); });
  let startX = null;
  root.addEventListener('touchstart', (event) => { startX = event.changedTouches[0].clientX; }, { passive: true });
  root.addEventListener('touchend', (event) => { if (startX === null) return; const dx = event.changedTouches[0].clientX - startX; if (Math.abs(dx) > 70) show(current + (dx < 0 ? 1 : -1)); startX = null; }, { passive: true });
  show(0);
})();
