# Laiana & Ricardo — Site do Casamento

Site do casamento, feito em React + Vite + TypeScript, hospedado no GitHub Pages.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy (GitHub Pages)

```bash
npm run deploy
```

Isso publica a pasta `dist/` na branch `gh-pages` usando o pacote `gh-pages`.
No GitHub, em Settings → Pages, selecione a branch `gh-pages` como fonte.

O `base` em `vite.config.ts` está configurado como `/mywedding/`, assumindo
que o repositório no GitHub se chama `mywedding`. Se o nome do repositório
for diferente, ajuste esse valor.

## Estrutura

- `src/pages/` — páginas do site (Início, Informações, Presentes, Recados)
- `src/components/` — componentes reutilizáveis (NavBar, Countdown)
- Roteamento com `react-router-dom` usando `HashRouter` (compatível com GitHub Pages sem configuração extra de servidor)
- As páginas de Informações, Presentes e Recados estão como placeholders ("Em breve") — conteúdo a ser adicionado depois.
- Lista de presentes com Supabase está planejada para uma fase futura.
