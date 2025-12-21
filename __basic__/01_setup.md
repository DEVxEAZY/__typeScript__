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
