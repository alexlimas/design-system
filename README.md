# @projetos/design-system

Pacote de componentes UI compartilhado entre os projetos em `c:\Projetos` (AgrTrade, FitnessStore e futuros). Stack: Tailwind CSS 3 + [Base UI](https://base-ui.com) + `class-variance-authority`, no mesmo padrão do `Button` já existente no AgrTrade (a implementação mais madura encontrada na auditoria inicial de componentes).

## Distribuição

Este repositório **não é publicado em nenhum registry npm**. Cada projeto consumidor adiciona este repo como **git submodule** e resolve a dependência localmente:

- Em monorepos pnpm (ex. FitnessStore): via `workspace:*`, colocando o submodule dentro de um diretório reconhecido pelo `pnpm-workspace.yaml` (ex. `packages/design-system`).
- Em projetos npm single-app (ex. AgrTrade): via dependência `file:` apontando para o caminho do submodule.

Em ambos os casos, o pacote precisa ser **buildado após todo `git submodule update`** (o `dist/` é gitignored). Ver `package.json` do projeto consumidor para o script de automação (`postinstall`).

## Build

```bash
npm install
npm run build       # gera dist/index.js, dist/index.d.ts, dist/styles.css
npm run typecheck
```

## Uso

```tsx
import { Button } from "@projetos/design-system";
import "@projetos/design-system/styles.css"; // importar uma única vez, na raiz do app (ex. layout.tsx/globals.css)

<Button variant="destructive" size="sm">Excluir</Button>
```

### Tema / tokens

Todas as cores e o raio de borda são expostos como CSS custom properties com prefixo `--ds-*` (ver `src/styles/tokens.css` para os defaults, que seguem a paleta azul/neutro já usada no AgrTrade). Um app consumidor aplica sua própria marca sobrescrevendo essas variáveis em um `:root` declarado **depois** do `@import` do `styles.css` do pacote:

```css
@import '@projetos/design-system/styles.css';

:root {
  --ds-primary: #30006b;
  --ds-primary-foreground: #ffffff;
  /* ... */
}
```

Suporte a dark mode: a classe `.dark` já é referenciada pelos componentes (`dark:*` do Tailwind), mas os valores de tema para dark mode ainda não foram definidos neste pacote — fica para uma iteração futura.

## Limitações conhecidas

- **`className` só deve conter CSS Modules locais do app consumidor ou nada.** O `content` do Tailwind deste pacote aponta apenas para o próprio `src/components/**` no momento do build — ou seja, `dist/styles.css` garante as classes usadas dentro dos componentes (`buttonVariants()` etc.), mas **não** gera classes utilitárias Tailwind arbitrárias passadas de fora via `className` (ex. `<Button className="mt-4 flex-1">` não teria `.mt-4`/`.flex-1` no CSS final). Se isso for necessário no futuro, o app consumidor precisará rodar seu próprio Tailwind com `content` apontando também para `node_modules/@projetos/design-system/dist/**`, ou este pacote precisará de uma safelist curada.
- Sem suporte a `render`/`asChild` para o `Button` ainda (necessário para casos como um botão que navega via `next/link` sem re-render de Client Component) — Base UI suporta isso nativamente via `render` prop; adicionar quando o primeiro consumidor precisar.

## Componentes disponíveis

- `Button` — portado de `AgrTrade/agrtrade/src/components/ui/button.tsx`. Variantes: `default | outline | secondary | ghost | destructive | link`. Tamanhos: `default | xs | sm | lg | icon | icon-xs | icon-sm | icon-lg`.
