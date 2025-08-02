const signs = ["Ovan","Bik","Blizanci","Rak","Lav","Devica","Vaga","Škorpija","Strelac","Jarac","Vodolija","Ribe"];
const J2000 = Date.UTC(2000,0,1,12,0,0);

function computePositions(date){
  const days = (date.getTime() - J2000)/86400000;
  const planets = {
    Sun: {period:365.256, base:280.46},
    Moon: {period:27.321, base:218.32},
    Mercury: {period:87.969, base:281.01},
    Venus: {period:224.701, base:272.92},
    Mars: {period:686.98, base:319.52},
    Jupiter: {period:4332.589, base:225.76},
    Saturn: {period:10759.22, base:175.45},
    Uranus: {period:30685.4, base:65.8},
    Neptune: {period:60190.0, base:49.10},
    Pluto: {period:90560.0, base:238.9}
  };
  const results = [];
  for (const [name, info] of Object.entries(planets)) {
    let lon = (info.base + (360/info.period)*days) % 360;
    if (lon < 0) lon += 360;
    results.push({name, lon});
  }
  return results;
}

function drawChart(positions){
  const canvas = document.getElementById('chart');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const cx = canvas.width/2;
  const cy = canvas.height/2;
  const radius = Math.min(cx,cy)-10;

  ctx.beginPath();
  ctx.arc(cx,cy,radius,0,2*Math.PI);
  ctx.stroke();

  for(let i=0;i<12;i++){
    const angle = (i*30)*Math.PI/180;
    const x = cx + radius*Math.cos(angle);
    const y = cy + radius*Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(x,y);
    ctx.stroke();
  }

  positions.forEach(p=>{
    const angle = (p.lon-90)*Math.PI/180;
    const x = cx + (radius-20)*Math.cos(angle);
    const y = cy + (radius-20)*Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x,y,5,0,2*Math.PI);
    ctx.fill();
    ctx.fillText(p.name[0], x+6, y+3);
  });
}

function displayPositions(name, city, positions){
  const output = document.getElementById('positions');
  let text = `Horoskop za ${name} (${city})\n`;
  positions.forEach(p=>{
    const signIndex = Math.floor(p.lon/30);
    const sign = signs[signIndex];
    const deg = (p.lon % 30).toFixed(2);
    text += `${p.name}: ${deg}° ${sign}\n`;
  });
  output.textContent = text;
}

document.getElementById('horoscopeForm').addEventListener('submit', e=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const city = document.getElementById('city').value.trim();
  const dateStr = document.getElementById('date').value;
  const timeStr = document.getElementById('time').value;
  if(!name || !city || !dateStr || !timeStr){
    alert('Sva polja su obavezna');
    return;
  }
  const date = new Date(`${dateStr}T${timeStr}`);
  const positions = computePositions(date);
  displayPositions(name, city, positions);
  drawChart(positions);
});

document.getElementById('savePdf').addEventListener('click', () => {
  const canvas = document.getElementById('chart');
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text('Natalni horoskop', 10, 10);
  doc.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 20, 180, 180);
  const text = document.getElementById('positions').textContent.split('\n');
  let y = 210;
  text.forEach(line => {
    if(line){
      doc.text(line, 10, y);
      y += 6;
    }
  });
  doc.save('horoskop.pdf');
});
