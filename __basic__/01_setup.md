## Dependências de desenvolvimento (`-D`)

- Use `npm install -D <pacote>` ou `--save-dev` para ferramentas que só são usadas durante o desenvolvimento (ex.: `typescript`, `tsx`, linters, formatadores).
- Essas ferramentas ajudam a escrever, compilar ou testar, mas não são necessárias no código que vai para produção.
- O build final normalmente leva apenas as dependências normais (`dependencies`) ou o JS já gerado, mantendo o artefato mais leve e sem tooling extra.

### Exemplo: `@types/node`
- Instalação feita com `npm install -D @types/node`, porque é apenas um pacote de tipos (declarações `.d.ts`) para o runtime Node.
- Ele permite que o TypeScript reconheça APIs do Node (como `fs`, `path`, `process`) com autocomplete e checagem de tipos.
- Fica em `devDependencies` já que só ajuda durante o desenvolvimento; nada disso vai para o bundle final.

### Dica rápida de `tsconfig`
- `rootDir` e `outDir`: apontam de onde saem os fontes (`src`) e para onde vai o build (`build`).
- `include` e `exclude`: defina o que o TS deve considerar (ex.: `["src"]`) e o que ignorar (`["node_modules"]`).
- `module`/`moduleResolution` como `NodeNext`: indicam ao TS usar a resolução moderna de módulos no ecossistema Node.

### Parâmetros obrigatórios vs. opcionais (exemplo `showInfo`)
- `interface ShowInfoOptions { displayDay?: boolean; displayMonth?: boolean; displayYear?: boolean; }` define a forma do objeto de opções e, com `?`, torna os campos opcionais.
- `function showInfo(date: Date, options: ShowInfoOptions = {}) { ... }`: o primeiro parâmetro (`date`) continua obrigatório; o segundo fica opcional graças ao valor padrão `{}`.
- Erro mostrado na IDE: “1-2 argumentos eram esperados, mas 0 foram obtidos.” surge porque `date` não foi fornecido. Chame como `showInfo(new Date())` ou `showInfo(new Date(), { displayDay: true, displayMonth: true, displayYear: false })`.
- Se quiser permitir chamada sem `date`, defina um default (`date = new Date()`). Se quiser defaults para as opções, inicialize-os no próprio parâmetro ou dentro da função.

### Scripts do projeto (`package.json`)
- `npm run dev`: executa `tsx src/index.ts` para rodar direto em TS durante o desenvolvimento.
- `npm run build`: executa `tsc`, gerando saída em `build/` (conforme `tsconfig`).
- `npm start`: roda `node .`, utilizando o `main` configurado no `package.json` (aponta para o build gerado).

### Layout atual do código (`src/`)
- `index.ts`: ponto de entrada simples (ex.: `console.log("Hello World")`).
- `typescript.ts`: exemplo com a interface `ShowInfoOptions` e a função `showInfo` ilustrando parâmetros opcionais e default.
- `javascript.js`: versão equivalente em JS puro chamando `showInfo(new Date(), {})`.
