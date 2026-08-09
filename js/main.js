// ===== SELEÇÃO DE ELEMENTOS =====
const navBtns         = document.querySelectorAll('.nav-btn');
const telas           = document.querySelectorAll('.tela');
const listaHistorico    = document.getElementById('lista-historico');


/// ===== NAVEGAÇÃO =====
navBtns.forEach(btn => {

  btn.addEventListener('click', async () => {

    const alvo = btn.dataset.tela;

    navBtns.forEach(b => b.classList.remove('active'));
    telas.forEach(t => t.classList.remove('ativa'));

    btn.classList.add('active');
    document.getElementById('tela-' + alvo).classList.add('ativa');

    if (alvo === 'historico') await renderHistorico();
    if (alvo === 'relatorio') await renderRelatorio();

  });
  
});

navBtns.forEach(btn => {
  btn.addEventListener('click', async () => {
    const alvo = btn.dataset.tela;

    navBtns.forEach(b => {
      b.classList.remove('active');
      b.removeAttribute('aria-current'); // ← remove de todos
    });
    telas.forEach(t => t.classList.remove('ativa'));

    btn.classList.add('active');
    btn.setAttribute('aria-current', 'page'); // ← marca o ativo
    document.getElementById('tela-' + alvo).classList.add('ativa');

    if (alvo === 'historico') await renderHistorico();
    if (alvo === 'relatorio') await renderRelatorio();
  });
});

// ===== INICIALIZAÇÃO =====
renderAlunos();
  
