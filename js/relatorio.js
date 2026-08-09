const conteudoRelatorio = document.getElementById('conteudo-relatorio');
const btnImprimir = document.getElementById('btn-imprimir');


// ===== TELA 4: RELATÓRIO =====
async function renderRelatorio() {
  conteudoRelatorio.innerHTML = '<p class="sem-dados">Carregando...</p>';

  const { data: alunos, error: erroAlunos } = await db
    .from('alunos')
    .select('id, nome')
    .order('nome');

  const { data: presencas, error: erroPresencas } = await db
    .from('presencas')
    .select('aluno_id, presente');

  if (erroAlunos || erroPresencas || !alunos.length) {
    conteudoRelatorio.innerHTML = '<p class="sem-dados">Nenhum dado suficiente para gerar relatório.</p>';
    return;
  }

  // datas únicas = total de aulas
  const { data: datas } = await db
    .from('presencas')
    .select('data');

  const totalAulas = new Set((datas || []).map(d => d.data)).size;

  if (totalAulas === 0) {
    conteudoRelatorio.innerHTML = '<p class="sem-dados">Nenhuma aula registrada ainda.</p>';
    return;
  }

  conteudoRelatorio.innerHTML = '';

  alunos.forEach(aluno => {
    const registros  = presencas.filter(p => p.aluno_id === aluno.id);
    const presentes  = registros.filter(p => p.presente).length;
    const percentual = Math.round((presentes / totalAulas) * 100);

    const card = document.createElement('div');
    card.className = 'card-aluno-relatorio';
    card.innerHTML = `
      <div>
        <div class="nome">${aluno.nome}</div>
        <div style="font-size:0.8rem; color: var(--texto-mudo)">
          ${presentes} de ${totalAulas} aulas
        </div>
      </div>
      <div class="percentual">${percentual}%</div>
    `;
    conteudoRelatorio.appendChild(card);
  });
}

btnImprimir.addEventListener('click', () => window.print());