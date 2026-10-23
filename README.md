# Instituto Odontológico Visage

Site institucional do **Instituto Odontológico Visage** — clínica odontológica em
Patos de Minas, Minas Gerais.

> Instituto Visage — Odontologia Especializada.
> Trabalhando de forma humanizada e transformando sorrisos.

Projeto **somente front-end**: não há servidor, banco de dados, painel
administrativo, login nem envio de formulários. Todo contato acontece por
telefone ou WhatsApp, atendido diretamente pela equipe da clínica.

---

## Tecnologias

| Ferramenta | Papel |
| --- | --- |
| React 19 + TypeScript | Interface e tipagem estrita |
| Vite 8 | Servidor de desenvolvimento e build |
| Tailwind CSS 4 | Estilos e tokens de marca (`@theme` em `src/index.css`) |
| React Router 7 | Página inicial, política de privacidade e 404 |
| lucide-react | Ícones |

As fontes (Inter e Manrope) são **hospedadas no próprio site**, em
`src/assets/fontes/`. Não há chamadas a servidores de terceiros no
carregamento da página.

---

## Como rodar

```bash
npm install     # instala as dependências
npm run dev     # http://localhost:5173
npm run build   # gera dist/ para produção
npm run preview # serve o build de produção
npm run lint    # ESLint
```

O build de produção roda `tsc -b` antes do `vite build`: erros de tipo
interrompem a geração.

### Publicação

O site é uma SPA. Para que `/politica-de-privacidade` funcione em acesso
direto, o servidor precisa devolver `index.html` em qualquer rota. Já estão
incluídos `vercel.json` (Vercel) e `public/_redirects` (Netlify). Em Nginx ou
Apache, configure o mesmo `fallback`.

Antes de publicar, troque o domínio `https://institutovisage.com.br` por o
domínio real em:

- `index.html` (canônico e metadados sociais)
- `src/data/clinica.ts` → `urlSite`
- `public/robots.txt` e `public/sitemap.xml`

---

## Organização

```
src/
├── assets/
│   ├── marca/        logo oficial em 128, 256 e 512 px
│   ├── fotos/        fotografias usadas no site
│   └── fontes/       Inter e Manrope (woff2) + fontes.css
├── data/             conteúdo editável — a fonte de verdade do site
│   ├── clinica.ts      endereço, telefone, horários, campos pendentes
│   ├── navegacao.ts    itens do menu
│   ├── especialidades.ts
│   ├── diferenciais.ts
│   ├── faq.ts
│   └── galeria.ts      fotos do hero e da seção de experiência
├── lib/
│   ├── whatsapp.ts     links e mensagens iniciais por contexto
│   ├── estilosBotao.ts variantes e tamanhos de botão
│   ├── seo.ts          título, descrição, canônico e dados estruturados
│   └── utils.ts        cn, rolagem até seção, máscara e validação de telefone
├── hooks/            movimento reduzido, seção ativa, trava de rolagem
├── components/
│   ├── ui/           Container, Botao, Secao, CabecalhoSecao, Logo, Revelar…
│   ├── layout/       Cabecalho, MenuMobile, Rodape, BotaoWhatsApp
│   └── secoes/       uma pasta por seção da página inicial
└── paginas/          Home, PoliticaPrivacidade, NaoEncontrada
```

### Seções da página inicial

`Hero` → `SobreClinica` → `Especialidades` → `Diferenciais` → `Experiencia`
→ `ChamadaAgendamento` → `PerguntasFrequentes` → `Contato`

---

## Como editar o conteúdo

Quase tudo vive em `src/data/`. Nenhuma informação da clínica está escrita
dentro dos componentes.

### Dados da clínica

`src/data/clinica.ts` concentra nome, endereço, telefone, link do Google Maps
e horários. Alterar o telefone ali atualiza, de uma só vez, o cabeçalho, o
rodapé, a seção de contato, os links do WhatsApp e os dados estruturados.

### Campos ainda não confirmados

O objeto `clinica.pendentes` guarda informações que **a clínica ainda não
forneceu** e que o site, por isso, não exibe:

| Campo | Onde aparece quando preenchido |
| --- | --- |
| `responsavelTecnico.nome` / `.cro` | reservado para a identificação do responsável técnico |
| `razaoSocial` / `cnpj` | política de privacidade, item 1 |
| `email` | política de privacidade, item 1 |
| `redesSociais` | reservado para links no rodapé |

Enquanto estiverem vazios, os blocos correspondentes simplesmente não são
renderizados — nada é inventado nem preenchido com texto de exemplo.

> **Atenção:** a publicidade odontológica no Brasil exige a indicação do
> responsável técnico e do número de CRO. Preencha esses campos antes de
> divulgar o site.

### Especialidades

`src/data/especialidades.ts`. Cada item define nome, descrição, ícone
(lucide-react) e o contexto da mensagem de WhatsApp. O card do primeiro item
é o de destaque, em azul.

### Perguntas frequentes

`src/data/faq.ts`. Cada pergunta aceita parágrafos (`resposta`), uma lista
opcional (`lista`) e uma ação opcional (`acao`), que pode ser uma âncora
interna ou um link externo.

### Mensagens do WhatsApp

`src/lib/whatsapp.ts` guarda o número comercial e uma mensagem inicial por
contexto: avaliação, cada especialidade, dúvidas gerais, horários e
localização. Cada botão usa a mensagem da seção em que aparece.

---

## Fotografias

### A logo

`src/assets/marca/logo-visage-{128,256,512}.png` é a logo oficial recortada
do arquivo enviado pela clínica, com o fundo transparente. Ela é usada como
está: sem recolorir, distorcer ou redesenhar. Para substituí-la, troque os
três arquivos mantendo os mesmos nomes e proporção quadrada.

Os ícones de navegador em `public/` (`favicon-16`, `favicon-32`,
`apple-touch-icon`, `og-visage.jpg`) foram gerados a partir dela.

### As fotos da clínica

A seção **Experiência na clínica** mostra seis fotografias reais do
Instituto Visage, em `src/assets/fotos/`:

| Arquivo | Ambiente |
| --- | --- |
| `fachada-visage.webp` | Fachada e entrada |
| `recepcao-visage.webp` | Recepção |
| `consultorio-visage.webp` | Consultório odontológico |
| `balcao-visage.webp` | Balcão de atendimento |
| `circulacao-visage.webp` | Circulação |
| `sala-atendimento-visage.webp` | Sala de atendimento |

Todas estão em retrato 382×510. A grade usa `aspect-3/4`, a mesma proporção
dos arquivos, para não cortar nem esticar nenhuma imagem.

> As fotos atuais vieram em baixa resolução. Se existirem os originais da
> câmera, substituí-los deixa a galeria visivelmente mais nítida em telas
> de alta densidade — basta trocar o arquivo e atualizar `largura` e
> `altura` no item correspondente.

Para trocar ou acrescentar uma foto, em `src/data/galeria.ts`:

```ts
import recepcao from '@/assets/fotos/recepcao-visage.webp'

// …

{
  id: 'recepcao',
  titulo: 'Recepção',
  descricao: 'Um espaço tranquilo para esperar com conforto.',
  icone: Armchair,
  foto: {
    src: recepcao,
    alt: 'Sala de espera do Instituto Visage, com poltronas claras e espelho redondo.',
    largura: 382,
    altura: 510,
  },
},
```

A grade se monta sozinha com os itens que têm foto; um item com `foto: null`
não aparece. O `alt` é obrigatório e deve descrever a cena; `largura` e
`altura` evitam que o layout salte enquanto a imagem carrega.

Nenhuma imagem ilustrativa de banco de imagens é usada: se um dia todos os
itens ficarem sem foto, a seção volta a exibir o convite para conhecer a
clínica, em vez de mostrar consultórios que não são os do Instituto Visage.

A mesma estrutura vale para `fotoAmbiente`, usada na seção institucional:
enquanto for `null`, aquele espaço recebe uma composição com a marca.

---

## Acessibilidade

- HTML semântico com `header`, `main`, `footer` e seções nomeadas por
  `aria-labelledby`.
- Atalho "Pular para o conteúdo principal" como primeiro foco da página.
- Contorno de foco visível em todos os elementos focáveis.
- Acordeão do FAQ com `aria-expanded` / `aria-controls`, operável por teclado.
- Menu mobile com `role="dialog"`, foco preso no painel, fechamento por `Esc`
  e trava de rolagem do fundo.
- Formulário com rótulos associados, `aria-invalid`, `aria-describedby` e
  resumo de erros anunciado por leitores de tela.
- `prefers-reduced-motion` desativa as animações de entrada e a rolagem suave.
- **Todos os textos atendem ao contraste mínimo da WCAG AA** (4.5:1, ou 3:1
  para textos grandes). Por isso o botão laranja usa texto azul-marinho:
  branco sobre `#E98B35` fica em 2.56:1.
- A informação nunca depende só da cor: o item ativo do menu tem sublinhado,
  os horários trazem o rótulo "Hoje" em texto e os erros do formulário vêm
  acompanhados de ícone e mensagem.

---

## Desempenho

- Fontes locais em woff2 (subsets `latin` e `latin-ext`), sem CSS externo
  bloqueando a renderização.
- A imagem da primeira dobra carrega com `fetchpriority="high"`; as demais
  usam `loading="lazy"`.
- Todas as imagens declaram `width` e `height`, evitando deslocamento de
  layout.
- O mapa do Google só é carregado quando o visitante clica em "Carregar o
  mapa" — até lá, nenhuma conexão com o Google é feita.

---

## Limites desta etapa

Não implementado, por decisão de escopo:

- Backend, banco de dados e APIs externas
- Painel administrativo, login e cadastro de pacientes
- Prontuários, agendamento integrado e pagamentos
- Envio de formulários para servidor

O formulário de contato é **demonstrativo**: valida os campos no navegador e
oferece continuar a conversa pelo WhatsApp com a mensagem já escrita. Nada é
enviado nem armazenado.

A estrutura foi pensada para receber essas funcionalidades depois: o conteúdo
está isolado em `src/data/`, os componentes não guardam regra de negócio e o
roteamento já está montado.
