const fs = require('fs');
const { contributions } = require('./contributions.json'); // Jika ingin pakai data kontribusi real

// Buat folder output jika belum ada
if (!fs.existsSync('output')) {
  fs.mkdirSync('output');
}

function generatePacmanAnimation() {
  const width = 800;
  const height = 120;
  const pacmanRadius = 12;
  const dotRadius = 3;
  const animationDuration = 15; // detik
  
  // Warna berdasarkan tema
  const colors = {
    dark: {
      background: '#0D1117',
      pacman: '#FFD700',
      dot: '#58A6FF',
      ghost: '#F85149'
    },
    light: {
      background: '#FFFFFF',
      pacman: '#FFD700',
      dot: '#1F6FEB',
      ghost: '#D29922'
    }
  };

  // Generate SVG untuk kedua tema
  generateSVG('dark', colors.dark);
  generateSVG('light', colors.light);
}

function generateSVG(theme, colors) {
  const width = 800;
  const height = 120;
  const pacmanRadius = 12;
  const dotRadius = 3;
  const dotSpacing = 20;
  const ghostWidth = 24;
  const ghostHeight = 24;
  
  let svgContent = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .mouth {
        transform-origin: center;
        animation: chew 0.4s infinite alternate;
      }
      @keyframes chew {
        from { transform: rotate(0deg); }
        to { transform: rotate(45deg); }
      }
    </style>
    
    <!-- Background -->
    <rect width="100%" height="100%" fill="${colors.background}"/>
    
    <!-- Dots trail -->
    ${generateDots(width, height, dotSpacing, dotRadius, colors.dot)}
    
    <!-- Pacman -->
    <g transform="translate(0, ${height/2})">
      <!-- Body -->
      <circle id="pacman" cx="0" cy="0" r="${pacmanRadius}" fill="${colors.pacman}">
        <animateMotion 
          path="${generateMotionPath(width, height)}"
          dur="15s"
          repeatCount="indefinite"
        />
      </circle>
      
      <!-- Mouth -->
      <path d="M0,0 L${pacmanRadius},0 A${pacmanRadius},${pacmanRadius} 0 0,0 ${pacmanRadius*0.6},-${pacmanRadius*0.6} Z" 
            fill="${colors.background}" 
            class="mouth"
            transform-origin="center">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0; 30; 0; -30; 0"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
    </g>
    
    <!-- Ghost chasing -->
    ${generateGhost(width, height, ghostWidth, ghostHeight, colors.ghost, 3)}
  </svg>
  `;

  fs.writeFileSync(`output/pacman-contribution-graph${theme === 'dark' ? '-dark' : ''}.svg`, svgContent);
}

function generateDots(width, height, spacing, radius, color) {
  let dots = '';
  const count = Math.floor(width / spacing);
  const y = height / 2;
  
  for (let i = 0; i < count; i++) {
    const x = i * spacing + 30;
    dots += `<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}">
      <animate attributeName="opacity" values="1;0;1" begin="${i*0.2}s" dur="15s" repeatCount="indefinite"/>
    </circle>`;
  }
  
  return dots;
}

function generateGhost(width, height, ghostWidth, ghostHeight, color, delay) {
  return `
  <g transform="translate(0, ${height/2})">
    <path d="
      M0,0 
      L${ghostWidth/2},-${ghostHeight} 
      L${ghostWidth},0 
      L${ghostWidth*0.8},${ghostHeight*0.2} 
      L${ghostWidth},${ghostHeight*0.4}
      L${ghostWidth*0.6},${ghostHeight*0.6}
      L${ghostWidth},${ghostHeight*0.8}
      L${ghostWidth*0.4},${ghostHeight}
      L0,${ghostHeight*0.8}
      Z" 
      fill="${color}">
      <animateMotion 
        path="${generateMotionPath(width, height, delay)}"
        dur="15s"
        repeatCount="indefinite"
      />
    </path>
    <!-- Eyes -->
    <circle cx="${ghostWidth*0.3}" cy="-${ghostHeight*0.6}" r="2" fill="white">
      <animateMotion 
        path="${generateMotionPath(width, height, delay)}"
        dur="15s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="${ghostWidth*0.7}" cy="-${ghostHeight*0.6}" r="2" fill="white">
      <animateMotion 
        path="${generateMotionPath(width, height, delay)}"
        dur="15s"
        repeatCount="indefinite"
      />
    </circle>
  </g>
  `;
}

function generateMotionPath(width, height, delay = 0) {
  const path = [];
  const segments = 10;
  const segmentWidth = width / segments;
  
  for (let i = 0; i <= segments; i++) {
    const x = i * segmentWidth;
    // Tambahkan sedikit variasi vertikal
    const yVariation = Math.sin(i * 0.5) * 5;
    path.push(`${x},${yVariation}`);
  }
  
  return `M${path.join(' L')}`;
}

generatePacmanAnimation();

// Test write to file
try {
  fs.writeFileSync(
    path.join(outputDir, 'pacman-contribution-graph.svg'), 
    '<svg xmlns="http://www.w3.org/2000/svg"><text x="20" y="20">Test SVG</text></svg>'
  );
  console.log('Test write successful!');
} catch (err) {
  console.error('Error writing file:', err);
}
