// ===== ELEMENTOS =====
const inputData       = document.getElementById('input-data');
const btnCarregarData = document.getElementById('btn-carregar-data');
const listaPresenca   = document.getElementById('lista-presenca');
const btnSalvar       = document.getElementById('btn-salvar-presenca');

// ===== TELA 2: PRESENÇA =====
btnCarregarData.addEventListener('click', async () => {
  const data = inputData.value;
  if (!data) { alert('Escolha uma data primeiro!'); return; }

  listaPresenca.innerHTML = '<p class="sem-dados">Carregando...</p>';

  // busca todos os alunos
  const { data: alunos, error: erroAlunos } = await db
    .from('alunos')
    .select('*')
    .order('nome');

  if (erroAlunos || alunos.length === 0) {
    listaPresenca.innerHTML = '<p class="sem-dados">Cadastre alunos primeiro.</p>';
    btnSalvar.style.display = 'none';
    return;
  }

  // busca presenças já salvas para essa data
  const { data: presencasSalvas } = await db
    .from('presencas')
    .select('aluno_id, presente')
    .eq('data', data);

  // monta um mapa { aluno_id: presente } para consulta rápida
  const mapaPresencas = {};
  (presencasSalvas || []).forEach(p => {
    mapaPresencas[p.aluno_id] = p.presente;
  });

  listaPresenca.innerHTML = '';

  alunos.forEach(aluno => {
    const marcado = mapaPresencas[aluno.id] === true;
    const li = document.createElement('li');
    li.className = 'item-presenca ' + (marcado ? 'presente' : 'ausente');
    li.innerHTML = `
      <span>${aluno.nome}</span>
      <input type="checkbox" data-id="${aluno.id}" ${marcado ? 'checked' : ''} />
    `;

    const checkbox = li.querySelector('input');
    checkbox.addEventListener('change', () => {
      li.className = 'item-presenca ' + (checkbox.checked ? 'presente' : 'ausente');
    });

    listaPresenca.appendChild(li);
  });

  btnSalvar.style.display = 'block';
});

btnSalvar.addEventListener('click', async () => {
  const data = inputData.value;
  const checkboxes = listaPresenca.querySelectorAll('input[type="checkbox"]');

  // monta array de registros para upsert
  const registros = Array.from(checkboxes).map(cb => ({
    aluno_id: parseInt(cb.dataset.id),
    data,
    presente: cb.checked
  }));

  const { error } = await db
    .from('presencas')
    .upsert(registros, { onConflict: 'aluno_id,data' });

  if (error) { alert('Erro ao salvar!'); console.error(error); return; }

  alert('✅ Presença salva!');
});