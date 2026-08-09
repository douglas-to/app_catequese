// ===== TELA 3: HISTÓRICO =====
async function renderHistorico() {
  listaHistorico.innerHTML = '<p class="sem-dados">Carregando...</p>';

  const { data: presencas, error } = await db
    .from('presencas')
    .select('data, presente, alunos(nome)')
    .order('data', { ascending: false });

  if (error) { console.error(error); return; }

  if (!presencas || presencas.length === 0) {
    listaHistorico.innerHTML = '<p class="sem-dados">Nenhuma presença registrada ainda.</p>';
    return;
  }

  // agrupa registros por data
  const porData = {};
  presencas.forEach(p => {
    if (!porData[p.data]) porData[p.data] = [];
    porData[p.data].push(p);
  });

  listaHistorico.innerHTML = '';

  Object.keys(porData).sort().reverse().forEach(data => {
    const registros  = porData[data];
    const presentes  = registros.filter(r => r.presente).length;
    const [ano, mes, dia] = data.split('-');
    const dataFormatada   = `${dia}/${mes}/${ano}`;

    const card = document.createElement('div');
    card.className = 'card-historico';
    card.innerHTML = `
      <div class="card-historico-header">
        <strong>📅 ${dataFormatada}</strong>
        <span>${presentes} de ${registros.length} presentes</span>
      </div>
      <ul>
        ${registros.map(r => `
          <li>
            <span>${r.alunos.nome}</span>
            <span>${r.presente ? '✅ Presente' : '❌ Faltou'}</span>
          </li>
        `).join('')}
      </ul>
    `;
    listaHistorico.appendChild(card);
  });
}