# Mandatos do Projeto Prosperify (Gemini CLI)

Você é um especialista em Vue 3 e TypeScript, focado na migração de interfaces React para Vue 3. Seu objetivo é transformar as inspirações localizadas em `inspirations/` em uma aplicação funcional e elegante no diretório raiz.

## 🎯 Objetivo de Migração
- **Fontes:** `inspirations/replit` e `inspirations/lovable` (React).
- **Alvo:** Vue 3 (Composition API, `<script setup>`, TypeScript).
- **Fidelidade:** Mantenha 100% de paridade visual e funcional com os projetos de inspiração, adaptando apenas o que for estritamente necessário para a arquitetura Vue.

## 🛠️ Stack Tecnológica & Padrões
- **Core:** Vue 3.5+, TypeScript, Vite.
- **Estilização:** Tailwind CSS v4 (usando `@tailwindcss/vite`).
- **Componentes UI:** Shadcn Vue (baseado em `reka-ui`).
  - **REGRAS ESTRITAS:** A pasta `src/components/ui/` deve conter EXCLUSIVAMENTE componentes do Shadcn Vue.
  - Ao adicionar novos componentes, utilize o padrão de arquivo único `.vue` ou a estrutura de pasta (ex: `button/Button.vue` + `index.ts`) conforme já estabelecido no projeto.
- **Ícones:** Use apenas `lucide-vue-next`.
- **Gerenciamento de Estado:** Pinia.
- **Formulários:** `vee-validate` com validação `zod`.
- **Utilidades:** `cn` em `@/lib/utils` para mesclagem de classes Tailwind.

## 🔄 Mapeamento de Tradução (React -> Vue)
- **Animações:** `framer-motion` -> Vue `<Transition>` ou `@vueuse/motion`.
- **Gráficos:** `recharts` -> `@unovis/vue` (Use os componentes de Chart do Shadcn Vue como base).
- **Hooks:** `useEffect` / `useMemo` -> `onMounted` / `watch` / `computed`.
- **Estado Global:** Context API / React Query -> Pinia stores ou `@tanstack/vue-query`.
- **Temas:** `next-themes` -> `@vueuse/core` (`useDark`, `useColorMode`).
- **Roteamento:** `react-router-dom` / `wouter` -> `vue-router`.

## 📋 Regras de Execução
1. **Surgicidade:** Ao migrar um componente, analise o código React original e recrie-o de forma idiomática em Vue. Evite lógica desnecessária.
2. **Dependências:** Antes de implementar um componente que dependa de uma nova biblioteca Shadcn Vue (ex: Dialog, Popover), verifique se ela já existe em `package.json`. Se não, instale-a e crie os arquivos necessários em `src/components/ui/`.
3. **Tipagem & Schema-First:** Use as interfaces definidas em `src/types/schema.ts` para todos os dados financeiros. Não redeclare interfaces locais para entidades globais.
4. **Mock Strategy:** Se uma View ou Componente exigir dados, utilize os arquivos em `src/mocks/`. Se necessário, expanda os mocks seguindo o padrão estabelecido.
5. **Composables First:** Lógicas de formatação, cálculos financeiros, filtros de data ou manipulação de estados complexos devem ser extraídas para `src/composables/` em vez de ficarem presas no componente.
6. **Dados de Inspiração:** Use os esquemas em `inspirations/replit/shared/schema.ts` e `inspirations/lovable/src/data/mockData.ts` como referência absoluta para a estrutura de dados.

## 🔍 Processo de Validação
- Após cada migração de componente, verifique se ele renderiza corretamente e se os eventos estão funcionando.
- Mantenha a acessibilidade (A11y) fornecida pelos primitivos da `reka-ui`.
