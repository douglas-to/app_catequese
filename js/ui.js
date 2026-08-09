function mostrarCarregando(elemento) {
  elemento.innerHTML = '<p class="sem-dados">Carregando...</p>';
}

function mostrarErro(elemento, msg = 'Erro ao carregar dados.') {
  elemento.innerHTML = `<p class="sem-dados">${msg}</p>`;
}

function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}