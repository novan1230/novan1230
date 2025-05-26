const fs = require('fs');

function generatePacmanSVG() {
  const width = 800;
  const height = 120;
  const pacmanRadius = 15;
  let pacmanX = -pacmanRadius;
  
  // Animasi buka-tutup mulut Pacman
  let mouthAngle = 0;
  let mouthDirection = 1;
  
  let svgContent = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#0D1117"/> <!-- Background dark mode -->
    <g id="pacman-group">
  `;
  
  // Generate frames animasi
  for (let i = 0; i < 60; i++) {
    // Pacman
    svgContent += `
    <circle cx="${pacmanX}" cy="60" r="${pacmanRadius}" fill="yellow" opacity="${i === 0 ? 1 : 0}">
      <animate attributeName="cx" values="${getPacmanPath()}" dur="10s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1" begin="${i/10}s" dur="0.1s" fill="freeze"/>
    </circle>
    `;
    
    // Animasi mulut
    mouthAngle += mouthDirection * 5;
    if (mouthAngle > 45 || mouthAngle < 0) mouthDirection *= -1;
    
    pacmanX += 15;
  }
  
  svgContent += `
    </g>
  </svg>
  `;
  
  fs.writeFileSync('output/pacman-contribution-graph.svg', svgContent);
}

function getPacmanPath() {
  let path = '';
  for (let i = 0; i <= 100; i++) {
    path += (i * 8) + ';';
  }
  return path.slice(0, -1);
}

generatePacmanSVG();
