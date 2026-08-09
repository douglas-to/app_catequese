# ✝ App de Presença — Catequese

Aplicativo web para controle de presença de catequese com banco de dados em nuvem via **Supabase**. Os dados ficam salvos online e podem ser acessados de qualquer dispositivo.

---

## 📁 Estrutura de Arquivos

```
catequese/
├── index.html        → estrutura das telas (HTML)
├── css/
│   └── style.css     → visual e tema (CSS)
├── js/
│   ├── supabase.js   → conexão com o banco de dados
│   ├── ui.js         → funções utilitárias de interface
│   ├── alunos.js     → cadastro e listagem de alunos
│   ├── presenca.js   → marcação e salvamento de presença
│   ├── historico.js  → exibição do histórico por data
│   ├── relatorio.js  → relatório geral e impressão
│   └── main.js       → navegação e inicialização
└── README.md         → este arquivo
```

---

## 🚀 Como usar

> ⚠️ O app usa o Supabase (banco em nuvem) — por isso **não pode ser aberto diretamente** clicando no `index.html`. Precisa rodar em um servidor local.

### Com VS Code (recomendado)

1. Instale a extensão **Live Server** (autor: Ritwick Dey)
2. Abra a pasta do projeto no VS Code
3. Clique com o botão direito no `index.html` → **Open with Live Server**
4. O navegador abrirá em `http://127.0.0.1:5500`

### Com Python (alternativa)

```bash
# dentro da pasta do projeto
python -m http.server 5500
```

Depois acesse `http://localhost:5500` no navegador.

---

## 📱 Funcionalidades

### 👥 Alunos
- Cadastrar alunos pelo nome
- Remover alunos com confirmação (remove também todas as presenças do aluno)
- Adicionar com a tecla **Enter** ou pelo botão

### 📋 Presença
- Escolher a data da aula e carregar a lista
- Marcar presença (✅) ou falta (❌) para cada aluno
- Salvar o registro — se a data já existir, atualiza automaticamente

### 📅 Histórico
- Ver todas as aulas registradas (da mais recente para a mais antiga)
- Ver quem esteve presente ou ausente em cada data
- Resumo rápido: "X de Y presentes"

### 📊 Relatório
- Percentual de presença de cada aluno
- Total de aulas assistidas vs. total de aulas registradas
- Botão de **impressão** do relatório

---

## 🗄️ Banco de Dados (Supabase)

Os dados ficam em um banco **PostgreSQL** na nuvem com duas tabelas:

```sql
alunos
  id         → identificador único
  nome       → nome do aluno (único)
  created_at → data de cadastro

presencas
  id         → identificador único
  aluno_id   → referência ao aluno
  data       → data da aula
  presente   → true (presente) ou false (faltou)
  created_at → data do registro
```

> 💡 Se um aluno for removido, todas as presenças dele são apagadas automaticamente pelo banco (`ON DELETE CASCADE`).

---

## ♿ Acessibilidade

O app foi desenvolvido com suporte a:

- **Leitores de tela** — atributos ARIA em todas as seções e botões
- **`aria-live`** — anuncia mudanças nas listas automaticamente
- **Navegação por teclado** — foco visível em todos os elementos interativos
- **Dicas visuais** — instruções de uso visíveis em cada tela
- **Área de toque mínima** — botões com tamanho adequado para celular

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica das telas |
| CSS3 | Visual, variáveis, flexbox, ARIA, media print |
| JavaScript ES6+ | Lógica, eventos, async/await, módulos |
| Supabase | Banco de dados PostgreSQL em nuvem + API REST |
| Google Fonts | Playfair Display + Lato |

---

## ✏️ Possíveis melhorias futuras

- [ ] Autenticação com login e senha
- [ ] Editar nome de aluno já cadastrado
- [ ] Excluir um dia inteiro do histórico
- [ ] Exportar os dados em `.csv` ou `.pdf`
- [ ] Filtrar relatório por período
- [ ] Tema escuro
- [ ] Organização por turmas

---

## 👨‍💻 Histórico de desenvolvimento

Este app foi desenvolvido passo a passo com foco em aprendizado:

- **v1** — HTML + CSS + JavaScript com localStorage
  - Estrutura das telas e navegação
  - Visual com variáveis CSS e flexbox
  - Lógica com DOM, eventos e localStorage

- **v2** — Migração para Supabase
  - Banco de dados PostgreSQL em nuvem
  - Funções assíncronas com `async/await`
  - `upsert` para evitar duplicatas de presença
  - Join automático entre tabelas

- **v3** — Refatoração em módulos
  - Separação de responsabilidades por arquivo
  - Cada módulo gerencia seus próprios elementos
  - Código mais legível e fácil de manter

- **v4** — Acessibilidade
  - Suporte a leitores de tela com ARIA
  - Dicas visuais de uso em cada tela
  - Melhoria de foco e área de toque

---

*Feito com ❤️ para a catequese*
