<div align="center">
  <img src="./public/favicon.svg" width="72" alt="Monograma YL" />
  <h1>ylderlan 2.0</h1>
  <p>Portfólio pessoal de Francisco Ylderlan — engenheiro de software full stack.</p>
  <p>
    <img alt="React" src="https://img.shields.io/badge/React-19-0e1526?style=flat-square" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6-0e1526?style=flat-square" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-8-0e1526?style=flat-square" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-4-0e1526?style=flat-square" />
    <img alt="License" src="https://img.shields.io/badge/license-MIT-0e1526?style=flat-square" />
  </p>
</div>

---

## Sobre

Segunda geração do portfólio, reescrita do zero. Página única, bilíngue,
com tema claro e escuro e a lista de projetos alimentada pela API pública
do GitHub.

## Stack

| Camada          | Escolha                                                  |
| --------------- | -------------------------------------------------------- |
| Build           | Vite 8                                                    |
| UI              | React 19 + TypeScript 6                                   |
| Estilo          | Tailwind CSS 4 (tokens em CSS variables)                  |
| Componentes     | shadcn/ui com **Base UI** como engine (padrão desde 2026) |
| Ícones          | lucide-react                                              |
| Internacional   | i18next + react-i18next (`en` como fallback)              |
| Fontes          | JetBrains Mono e Exo 2, servidas localmente via Fontsource |
| Testes          | Vitest + Testing Library (jsdom)                          |
| Lint            | oxlint                                                    |
| Deploy          | Vercel                                                    |

## Rodando o projeto

```bash
npm install
npm run dev
```

| Script                  | O que faz                                  |
| ----------------------- | ------------------------------------------ |
| `npm run dev`           | Servidor de desenvolvimento                |
| `npm run build`         | Typecheck e build de produção em `dist/`   |
| `npm run preview`       | Serve o build de produção                  |
| `npm run test`          | Suíte de testes                            |
| `npm run test:watch`    | Testes em modo watch                       |
| `npm run test:coverage` | Testes com relatório de cobertura          |
| `npm run lint`          | oxlint                                     |
| `npm run typecheck`     | `tsc -b` sem emitir                        |

Não há variáveis de ambiente obrigatórias: a listagem de projetos usa a API
pública do GitHub, sem token.

## Estrutura

```
src/
├── components/
│   ├── brand/       Monograma YL em SVG inline
│   ├── layout/      Header, Footer e o wrapper de seção
│   ├── sections/    Hero, Projects, Social, About, Experience
│   └── ui/          Primitivos shadcn/ui sobre Base UI
├── config/          Links, username do GitHub e empresas em destaque
├── hooks/           Tema, metadados do documento e repositórios
├── i18n/            Bundles en/pt e a tipagem compartilhada
├── lib/             Utilitários (cn)
├── providers/       ThemeProvider e seu contexto
└── services/        Cliente da API do GitHub
```

## Identidade visual

A paleta parte dos temas claro e escuro do GitHub, com dois desvios
deliberados: o modo claro nunca usa branco puro (vai para o creme) e o modo
escuro nunca usa preto puro (vai para o navy). O âmbar vem do monograma
original. Todos os pares de texto e fundo passam no WCAG AA.

O monograma YL foi redesenhado: os braços do **Y** assumem a cor do texto e a
haste continua no pé do **L** em âmbar — três traços, o que mantém a marca
legível a 16 px no favicon.

Os tokens vivem em `src/index.css`, em `:root` e `.dark`.

## Internacionalização

Inglês é o idioma padrão e o fallback. O detector olha, nesta ordem, o
`localStorage`, o idioma do navegador e a tag `<html lang>`; `pt-BR` e `pt-PT`
caem no mesmo bundle `pt`. Os dois bundles compartilham a tipagem em
`src/i18n/types.ts`, e um teste garante que nenhuma chave fica só em um deles.

## Projetos

A seção lista os cinco repositórios públicos com push mais recente, ignorando
forks, arquivados e o repositório de perfil. A resposta é cacheada por 30
minutos no `sessionStorage`, já que a API pública do GitHub limita a 60
requisições por hora por IP.

## Deploy

O projeto é estático e está pronto para a Vercel: `vercel.json` cuida do
rewrite de SPA e dos headers de cache e segurança. As meta tags, o Open Graph
e o `sitemap.xml` apontam para `https://ylderlan.vercel.app`.

## Licença

MIT — veja [LICENSE](./LICENSE).
