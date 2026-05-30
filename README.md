# ✝ App de Presença — Catequese

Aplicativo web simples para controle de presença de catequese, sem necessidade de servidor ou banco de dados. Todos os dados são salvos diretamente no navegador via **localStorage**.

---

## 📁 Estrutura de Arquivos

```
catequese/
├── index.html   → estrutura das telas (HTML)
├── style.css    → visual e tema (CSS)
├── script.js    → lógica e dados (JavaScript)
└── README.md    → este arquivo
```

---

## 🚀 Como usar

1. Baixe os arquivos e coloque todos na **mesma pasta**
2. Abra o arquivo `index.html` no navegador (Chrome, Firefox, Edge...)
3. Pronto — nenhuma instalação necessária!

> ⚠️ Os dados ficam salvos **apenas neste navegador e neste computador**. Se abrir em outro dispositivo, os dados não estarão lá.

---

## 📱 Funcionalidades

### 👥 Alunos
- Cadastrar alunos pelo nome
- Remover alunos com confirmação
- Adicionar com a tecla **Enter** ou pelo botão

### 📋 Presença
- Escolher a data da aula
- Marcar presença (✅) ou falta (❌) para cada aluno
- Salvar o registro da aula

### 📅 Histórico
- Ver todas as aulas registradas (da mais recente para a mais antiga)
- Ver quem esteve presente ou ausente em cada data
- Resumo rápido: "X de Y presentes"

### 📊 Relatório
- Percentual de presença de cada aluno
- Total de aulas assistidas vs. total de aulas registradas
- Botão de **impressão** do relatório

---

## 💾 Como os dados são salvos

Os dados ficam no `localStorage` do navegador em duas chaves:

```
alunos    → ["Maria", "João", "Ana"]

presencas → {
  "2025-05-24": { "Maria": true, "João": false, "Ana": true },
  "2025-05-31": { "Maria": true, "João": true,  "Ana": false }
}
```

Para **ver ou limpar** os dados manualmente:
1. Abra o navegador com o app
2. Pressione `F12` → aba **Application** (Chrome) ou **Storage** (Firefox)
3. Em **Local Storage** você verá as chaves `alunos` e `presencas`

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura das telas |
| CSS3 | Visual, variáveis, flexbox, media print |
| JavaScript (ES6+) | Lógica, eventos, localStorage |
| Google Fonts | Playfair Display + Lato |

---

## ✏️ Possíveis melhorias futuras

- [ ] Editar nome de aluno já cadastrado
- [ ] Excluir um dia inteiro do histórico
- [ ] Exportar os dados em `.csv` ou `.json`
- [ ] Filtrar relatório por período
- [ ] Tema escuro

---

## 👨‍💻 Projeto educacional

Este app foi desenvolvido passo a passo com foco em aprendizado:

- **Passo 1** — HTML: estrutura e semântica
- **Passo 2** — CSS: variáveis, flexbox, sistema de telas
- **Passo 3** — JavaScript: DOM, eventos, localStorage

---

*Feito com ❤️ para a catequese*
