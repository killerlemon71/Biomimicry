/**
 * CATERPILLAR DATA PIPELINE // INTERACTIVE CONTROLLER
 * Explicit visual distinction between Normal, Weak Wi-Fi, and Hit a Wall.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const video = document.getElementById('caterpillar-video');
  const sliderSpeed = document.getElementById('slider-speed');
  const valSpeed = document.getElementById('speed-display');

  const btnNormal = document.getElementById('mode-normal');
  const btnWeak = document.getElementById('mode-weak');
  const btnBlocked = document.getElementById('mode-blocked');

  const playgroundCard = document.getElementById('playground-card');
  const headerStatusText = document.getElementById('status-text');
  const headerStatusDot = document.getElementById('status-dot');

  const videoTopBadge = document.getElementById('video-top-badge');
  const videoPlayerStatusTag = document.getElementById('video-player-status');

  const insightBox = document.getElementById('live-insight');
  const insightIcon = document.getElementById('insight-icon');
  const insightHeading = document.getElementById('insight-heading');
  const insightText = document.getElementById('insight-text');

  const footFlowRate = document.getElementById('foot-flow-rate');
  const footPacketLoss = document.getElementById('foot-packet-loss');
  const wallBarrier = document.getElementById('wall-barrier');

  // Situation cards
  const cardNormal = document.getElementById('card-normal');
  const cardWeak = document.getElementById('card-weak');
  const cardBlocked = document.getElementById('card-blocked');

  const ringNodes = [
    document.getElementById('ring-1'),
    document.getElementById('ring-2'),
    document.getElementById('ring-3'),
    document.getElementById('ring-4'),
    document.getElementById('ring-5')
  ];

  // Ring friendly explanations
  const ringDescriptions = [
    {
      name: 'Ring 1: Ingest (Tail)',
      text: 'Takes raw unsegmented video frames and slices them into discrete, independent rings. If one chunk has an error, adjacent segments are untouched.'
    },
    {
      name: 'Ring 2: Squeeze (Muscle)',
      text: 'Contracts like circumferential muscles. Under weak Wi-Fi, it actively squeezes the payload into lower 480p chunks so video flexes without a buffering spinner.'
    },
    {
      name: 'Ring 3: Grip (Sticky Feet 🔒)',
      text: 'Hooks micro-crochets into the branch before pushing forward. Anchors Write-Ahead Log (WAL) offsets so zero data is lost.'
    },
    {
      name: 'Ring 4: Wave (Fluid Push)',
      text: 'Passes fluid forward in a metachronal ripple with bounded latency and strict timing (IEEE 802.1Qch CQF).'
    },
    {
      name: 'Ring 5: Head (Screen Consumer)',
      text: 'Receives and reassembles intact chunks, rendering crisp, uninterrupted video.'
    }
  ];

  // State
  let currentMode = 'normal'; // 'normal', 'weak', 'blocked'
  let speed = 1.0;
  let waveStep = 0;

  // Auto-play video safely
  if (video) {
    video.muted = true;
    video.play().catch(e => console.log('Autoplay muted handled:', e));
  }

  // Update System Mode
  function setMode(mode) {
    currentMode = mode;

    // Button states
    btnNormal.classList.toggle('active', mode === 'normal');
    btnWeak.classList.toggle('active', mode === 'weak');
    btnBlocked.classList.toggle('active', mode === 'blocked');

    // Card highlight states
    cardNormal.classList.toggle('highlighted', mode === 'normal');
    cardWeak.classList.toggle('highlighted', mode === 'weak');
    cardBlocked.classList.toggle('highlighted', mode === 'blocked');

    // Playground card container classes
    playgroundCard.classList.remove('mode-weak', 'mode-blocked');
    if (mode === 'weak') playgroundCard.classList.add('mode-weak');
    if (mode === 'blocked') playgroundCard.classList.add('mode-blocked');

    // Video visual filters
    video.classList.remove('mode-weak-filter', 'mode-blocked-filter');
    wallBarrier.classList.remove('visible');

    if (mode === 'normal') {
      headerStatusText.textContent = 'NOMINAL WAVE (1080p)';
      headerStatusDot.className = 'dot';

      videoTopBadge.className = 'video-top-badge';
      videoTopBadge.textContent = '🟢 1080p FULL HD (100% Quality)';
      videoPlayerStatusTag.textContent = 'BUFFER: HEALTHY // 12ms LATENCY';

      insightBox.className = 'live-insight-box';
      insightIcon.textContent = '🟢';
      insightHeading.textContent = 'Normal Walk // 5G Smooth Highway';
      insightText.textContent = 'The caterpillar ripples fluidly from tail to head. Full-resolution 1080p video chunks flow with zero dropped frames and bounded latency.';

      footFlowRate.textContent = (8.5 * speed).toFixed(1) + ' MB/s (Optimal)';
      footPacketLoss.textContent = '0.00% (Guaranteed)';

      video.playbackRate = speed;
    } 
    else if (mode === 'weak') {
      headerStatusText.textContent = 'ADAPTIVE SQUEEZE (480p SD)';
      headerStatusDot.className = 'dot blue';

      videoTopBadge.className = 'video-top-badge weak';
      videoTopBadge.textContent = '🟡 480p ADAPTIVE SQUEEZE (Compressed)';
      videoPlayerStatusTag.textContent = 'TRADITIONAL: 🛑 FROZEN SPINNER | BIOMIMETIC: 🟢 CONTINUOUS PLAY';

      video.classList.add('mode-weak-filter'); // visual downscaled resolution simulation

      insightBox.className = 'live-insight-box blue';
      insightIcon.textContent = '🟡';
      insightHeading.textContent = 'Weak Wi-Fi // Dynamic Muscle Compression';
      insightText.textContent = 'Bandwidth dropped! Standard players freeze with a spinning loading wheel 🔄. But our Ring 2 muscles contract, squeezing the stream from 1080p down to 480p chunks so video flexes and keeps playing without stopping.';

      footFlowRate.textContent = (2.2 * speed).toFixed(1) + ' MB/s (Compressed 480p)';
      footPacketLoss.textContent = '0.00% (Zero Drops)';

      video.playbackRate = Math.max(0.65, speed * 0.85);
    } 
    else if (mode === 'blocked') {
      headerStatusText.textContent = 'HYDROSTATIC BACKPRESSURE (HELD)';
      headerStatusDot.className = 'dot amber';

      videoTopBadge.className = 'video-top-badge blocked';
      videoTopBadge.textContent = '🔴 HIT A WALL [BLOCKED]';
      videoPlayerStatusTag.textContent = 'OBSTACLE DETECTED // FLUID BACKPRESSURE';

      video.classList.add('mode-blocked-filter');
      wallBarrier.classList.add('visible'); // Show physical barrier graphic

      insightBox.className = 'live-insight-box amber';
      insightIcon.textContent = '🔴';
      insightHeading.textContent = 'Hit a Wall // Hydrostatic Backpressure';
      insightText.textContent = 'The front bumped into an obstacle! Coelomic fluid pressure pushes back to the tail, signaling the rear to halt ingestion. The data pipeline safely locks at the last proleg footstep without spilling a single byte.';

      footFlowRate.textContent = '0.0 MB/s (Halted Safely)';
      footPacketLoss.textContent = '0.00% (Held at Offset)';

      video.playbackRate = 0.08; // almost paused crawl
    }
  }

  // Speed slider updater
  function updateSpeed() {
    speed = parseFloat(sliderSpeed.value);
    valSpeed.textContent = speed.toFixed(1) + 'x';

    if (currentMode === 'normal') {
      video.playbackRate = speed;
      footFlowRate.textContent = (8.5 * speed).toFixed(1) + ' MB/s (Optimal)';
    } else if (currentMode === 'weak') {
      video.playbackRate = Math.max(0.65, speed * 0.85);
      footFlowRate.textContent = (2.2 * speed).toFixed(1) + ' MB/s (Compressed 480p)';
    } else {
      video.playbackRate = 0.08;
    }
  }

  sliderSpeed.addEventListener('input', updateSpeed);

  // Mode Buttons
  btnNormal.addEventListener('click', () => setMode('normal'));
  btnWeak.addEventListener('click', () => setMode('weak'));
  btnBlocked.addEventListener('click', () => setMode('blocked'));

  // Situation card "Test" buttons
  document.getElementById('btn-test-normal').addEventListener('click', () => {
    setMode('normal');
    playgroundCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  document.getElementById('btn-test-weak').addEventListener('click', () => {
    setMode('weak');
    playgroundCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  document.getElementById('btn-test-blocked').addEventListener('click', () => {
    setMode('blocked');
    playgroundCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Ring node click inspector
  ringNodes.forEach((node, idx) => {
    node.addEventListener('click', () => {
      const info = ringDescriptions[idx];
      insightIcon.textContent = '🔍';
      insightHeading.textContent = info.name;
      insightText.textContent = info.text;
    });
  });

  // Animation Loop: Wave propagation
  function tickWave() {
    // Reset ring styles
    ringNodes.forEach(n => {
      n.classList.remove('active-wave', 'squeezed', 'locked', 'blocked');
      const pkt = n.querySelector('.ring-packet');
      if (pkt) pkt.textContent = 'STANDBY';
    });

    if (currentMode === 'blocked') {
      // Hit a Wall: Shockwave backpressure holding in place
      ringNodes[4].classList.add('blocked');
      ringNodes[4].querySelector('.ring-packet').textContent = '🧱 WALL';

      ringNodes[3].classList.add('blocked');
      ringNodes[3].querySelector('.ring-packet').textContent = '⚠️ PRESSURE';

      ringNodes[2].classList.add('locked');
      ringNodes[2].querySelector('.ring-packet').textContent = '🔒 HELD';

      ringNodes[1].classList.add('blocked');
      ringNodes[1].querySelector('.ring-packet').textContent = 'HALTED';

      ringNodes[0].classList.add('blocked');
      ringNodes[0].querySelector('.ring-packet').textContent = 'PAUSED';
    } 
    else if (currentMode === 'weak') {
      // Weak Wi-Fi: Active Muscle Squeeze with 480p compressed packets
      const activeIdx = waveStep % 5;
      const activeNode = ringNodes[activeIdx];

      activeNode.classList.add('squeezed');

      if (activeIdx === 1) {
        activeNode.querySelector('.ring-packet').textContent = '⚡ SQUEEZE';
      } else if (activeIdx === 2) {
        activeNode.classList.add('locked');
        activeNode.querySelector('.ring-packet').textContent = '🔒 480p';
      } else {
        activeNode.querySelector('.ring-packet').textContent = '480p SD';
      }

      waveStep++;
    } 
    else {
      // Normal 1080p full-size Wave
      const activeIdx = waveStep % 5;
      const activeNode = ringNodes[activeIdx];

      activeNode.classList.add('active-wave');

      if (activeIdx === 2) {
        activeNode.classList.add('locked');
        activeNode.querySelector('.ring-packet').textContent = '🔒 1080p';
      } else {
        activeNode.querySelector('.ring-packet').textContent = '1080p HD';
      }

      waveStep++;
    }

    // Dynamic wave interval based on speed
    const baseDelay = currentMode === 'weak' ? 560 : 450;
    const delay = Math.max(160, baseDelay / speed);
    setTimeout(tickWave, delay);
  }

  // Start loop and initialize to normal
  tickWave();
  setMode('normal');
});
