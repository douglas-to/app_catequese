// ===== ELEMENTOS =====
const inputAluno   = document.getElementById('input-aluno');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaAlunos  = document.getElementById('lista-alunos');

async function renderAlunos() {
  listaAlunos.innerHTML = '<p class="sem-dados">Carregando...</p>';

  const { data: alunos, error } = await db
    .from('alunos')
    .select('*')
    .order('nome');

  if (error) {
    listaAlunos.innerHTML = '<p class="sem-dados">Erro ao carregar alunos.</p>';
    console.error(error);
    return;
  }

  listaAlunos.innerHTML = '';

  if (alunos.length === 0) {
    listaAlunos.innerHTML = '<p class="sem-dados">Nenhum aluno cadastrado ainda.</p>';
    return;
  }

  alunos.forEach(aluno => {
    const li = document.createElement('li');
    li.className = 'item-aluno';
    li.innerHTML = `
      <span>👤 ${aluno.nome}</span>
      <button class="btn-remover" data-id="${aluno.id}" title="Remover">✕</button>
    `;
    listaAlunos.appendChild(li);
  });

  listaAlunos.querySelectorAll('.btn-remover').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const nome = btn.previousElementSibling.textContent.replace('👤 ', '');
      const confirmado = confirm(`Remover "${nome}"?`);

      if (confirmado) {
        const { error } = await db
          .from('alunos')
          .delete()
          .eq('id', id);

        if (error) { alert('Erro ao remover!'); return; }
        await renderAlunos();
      }
    });
  });
}

async function adicionarAluno() {
  const nome = inputAluno.value.trim();
  if (!nome) return;

  const { error } = await db
    .from('alunos')
    .insert({ nome });

  if (error) {
    if (error.code === '23505') {
      alert('Esse aluno já está cadastrado!'); // erro de UNIQUE no banco
    } else {
      alert('Erro ao adicionar aluno.');
      console.error(error);
    }
    return;
  }

  inputAluno.value = '';
  await renderAlunos();
}

btnAdicionar.addEventListener('click', adicionarAluno);
inputAluno.addEventListener('keydown', e => {
  if (e.key === 'Enter') adicionarAluno();
});