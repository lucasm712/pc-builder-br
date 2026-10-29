const res = await fetch('http://localhost:3000/api/psus');
const psus = await res.json();

for (const psu of psus) {
  if (!psu.imagemUrl) {
    console.log(`SEM URL  - ${psu.nome}`);
    continue;
  }
  const r = await fetch(psu.imagemUrl, { method: 'HEAD' });
  const tipo = r.headers.get('content-type');
  if (!r.ok || !tipo?.startsWith('image/')) {
    console.log(`${r.status} (${tipo}) - ${psu.nome} -> ${psu.imagemUrl}`);
  }
}
console.log('Checagem concluída.');