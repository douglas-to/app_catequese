const navBtns = document.querySelectorAll('.nav-btn');
const telas = document.querySelectorAll('.tela');

const inputAluno = document.getElementById('input-aluno');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaAlunos = document.getElementById('lista-alunos');

const inputData = document.getElementById('input-data');
const btnCarregarData = document.getElementById('btn-carregar-data');
const listaPresenca = document.getElementById('lista-presenca');
const btnSalvar = document.getElementById('btn-salvar-presenca');

const listaHistorico = document.getElementById('lista-historico');
const conteudoRelatorio = document.getElementById('conteudo-relatorio');
const btnImprimir = document.getElementById('btn-imprimir');

// ===== DADOS (localStorage) =====
function carregarAlunos() {
  return JSON.parse(localStorage.getItem('alunos')) || [];
}

function salvarAlunos(lista) {
  localStorage.setItem('alunos', JSON.stringify(lista));
}

function carregarPresencas() {
  return JSON.parse(localStorage.getItem('presencas')) || {};
}

function salvarPresencas(obj) {
  localStorage.setItem('presencas', JSON.stringify(obj));
}

// ===== NAVEGAÇÃO =====
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const alvo = btn.dataset.tela;

    // remove 'active' de todos os botões e 'ativa' de todas as telas
    navBtns.forEach(b => b.classList.remove('active'));
    telas.forEach(t => t.classList.remove('ativa'));

    // ativa só o clicado
    btn.classList.add('active');
    document.getElementById('tela-' + alvo).classList.add('ativa');

    // atualiza o conteúdo da tela ao entrar nela
    if (alvo === 'historico') renderHistorico();
    if (alvo === 'relatorio') renderRelatorio();
  });
});

// ===== TELA 1: ALUNOS =====
function renderAlunos() {
  const alunos = carregarAlunos();
  listaAlunos.innerHTML = '';

  if (alunos.length === 0) {
    listaAlunos.innerHTML = '<p class="sem-dados">Nenhum aluno cadastrado ainda.</p>';
    return;
  }

  alunos.forEach((nome, index) => {
    const li = document.createElement('li');
    li.className = 'item-aluno';
    li.innerHTML = `
      <span>👤 ${nome}</span>
      <button class="btn-remover" data-index="${index}" title="Remover">✕</button>
    `;
    listaAlunos.appendChild(li);
  });

  // delegação de evento — um listener só para todos os botões de remover
  listaAlunos.querySelectorAll('.btn-remover').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.index);
      const alunos = carregarAlunos();
      const confirmado = confirm(`Remover "${alunos[i]}"?`);
      if (confirmado) {
        alunos.splice(i, 1);
        salvarAlunos(alunos);
        renderAlunos();
      }
    });
  });
}

function adicionarAluno() {
  const nome = inputAluno.value.trim();
  if (!nome) return;

  const alunos = carregarAlunos();

  if (alunos.includes(nome)) {
    alert('Esse aluno já está cadastrado!');
    return;
  }

  alunos.push(nome);
  salvarAlunos(alunos);
  inputAluno.value = '';
  renderAlunos();
}

btnAdicionar.addEventListener('click', adicionarAluno);

// permite pressionar Enter para adicionar
inputAluno.addEventListener('keydown', e => {
  if (e.key === 'Enter') adicionarAluno();
});

// ===== TELA 2: PRESENÇA =====
btnCarregarData.addEventListener('click', () => {
  const data = inputData.value;
  if (!data) {
    alert('Escolha uma data primeiro!');
    return;
  }

  const alunos   = carregarAlunos();
  const presencas = carregarPresencas();
  const registros = presencas[data] || {};

  listaPresenca.innerHTML = '';

  if (alunos.length === 0) {
    listaPresenca.innerHTML = '<p class="sem-dados">Cadastre alunos primeiro.</p>';
    btnSalvar.style.display = 'none';
    return;
  }

  alunos.forEach(nome => {
    const marcado = registros[nome] === true;
    const li = document.createElement('li');
    li.className = 'item-presenca ' + (marcado ? 'presente' : 'ausente');
    li.innerHTML = `
      <span>${nome}</span>
      <input type="checkbox" data-nome="${nome}" ${marcado ? 'checked' : ''} />
    `;

    // atualiza a classe visual ao clicar no checkbox
    const checkbox = li.querySelector('input');
    checkbox.addEventListener('change', () => {
      li.className = 'item-presenca ' + (checkbox.checked ? 'presente' : 'ausente');
    });

    listaPresenca.appendChild(li);
  });

  btnSalvar.style.display = 'block';
});

btnSalvar.addEventListener('click', () => {
  const data = inputData.value;
  const presencas = carregarPresencas();
  const registros = {};

  listaPresenca.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    registros[cb.dataset.nome] = cb.checked;
  });

  presencas[data] = registros;
  salvarPresencas(presencas);

  alert('✅ Presença salva!');
});

// ===== TELA 3: HISTÓRICO =====
function renderHistorico() {
  const presencas = carregarPresencas();
  const datas     = Object.keys(presencas).sort().reverse(); // mais recente primeiro
  listaHistorico.innerHTML = '';

  if (datas.length === 0) {
    listaHistorico.innerHTML = '<p class="sem-dados">Nenhuma presença registrada ainda.</p>';
    return;
  }

  datas.forEach(data => {
    const registros = presencas[data];
    const nomes     = Object.keys(registros);
    const presentes = nomes.filter(n => registros[n]).length;

    // formata a data de YYYY-MM-DD para DD/MM/YYYY
    const [ano, mes, dia] = data.split('-');
    const dataFormatada   = `${dia}/${mes}/${ano}`;

    const card = document.createElement('div');
    card.className = 'card-historico';
    card.innerHTML = `
      <div class="card-historico-header">
        <strong>📅 ${dataFormatada}</strong>
        <span>${presentes} de ${nomes.length} presentes</span>
      </div>
      <ul>
        ${nomes.map(nome => `
          <li>
            <span>${nome}</span>
            <span>${registros[nome] ? '✅ Presente' : '❌ Faltou'}</span>
          </li>
        `).join('')}
      </ul>
    `;
    listaHistorico.appendChild(card);
  });
}

// ===== TELA 4: RELATÓRIO =====
function renderRelatorio() {
  const alunos    = carregarAlunos();
  const presencas = carregarPresencas();
  const datas     = Object.keys(presencas);
  conteudoRelatorio.innerHTML = '';

  if (alunos.length === 0 || datas.length === 0) {
    conteudoRelatorio.innerHTML = '<p class="sem-dados">Nenhum dado suficiente para gerar relatório.</p>';
    return;
  }

  const totalAulas = datas.length;

  alunos.forEach(nome => {
    let presentes = 0;

    datas.forEach(data => {
      if (presencas[data][nome] === true) presentes++;
    });

    const percentual = Math.round((presentes / totalAulas) * 100);

    const card = document.createElement('div');
    card.className = 'card-aluno-relatorio';
    card.innerHTML = `
      <div>
        <div class="nome">${nome}</div>
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

// ===== INICIALIZAÇÃO =====
renderAlunos();