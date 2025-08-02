const cities = [
  {name: 'Beograd', lat: 44.7866, lon: 20.4489},
  {name: 'Novi Sad', lat: 45.2671, lon: 19.8335},
  {name: 'Niš', lat: 43.3209, lon: 21.8958},
  {name: 'Kragujevac', lat: 44.0128, lon: 20.9114},
  {name: 'Subotica', lat: 46.1003, lon: 19.6650},
  {name: 'Zagreb', lat: 45.8150, lon: 15.9819},
  {name: 'Sarajevo', lat: 43.8563, lon: 18.4131},
  {name: 'Podgorica', lat: 42.4304, lon: 19.2594},
  {name: 'Ljubljana', lat: 46.0569, lon: 14.5058},
  {name: 'Skopje', lat: 41.9973, lon: 21.4280}
];

window.addEventListener('DOMContentLoaded', () => {
  const dataList = document.getElementById('citylist');
  cities.forEach(c => {
    const option = document.createElement('option');
    option.value = c.name;
    dataList.appendChild(option);
  });
});
