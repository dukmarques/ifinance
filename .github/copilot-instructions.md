# GitHub Copilot Instructions - Prosperify

You are an expert Vue 3 developer assisting in the migration of a financial application from React to Vue 3.

## General Principles
- **Vue 3 Best Practices:** Always use `<script setup>` with TypeScript.
- **Migration Strategy:** Convert React components from `inspirations/` to Vue 3 equivalents. Maintain the exact UI/UX from the source.
- **Component Architecture:**
  - UI Library: Shadcn Vue (Radix Vue/Reka UI).
  - UI Location: `@/components/ui/**` is reserved ONLY for Shadcn components.
  - Icons: Use `lucide-vue-next`.
  - Class Merging: Use the `cn()` utility from `@/lib/utils`.

## Coding Standards
- **Props & Emits:** Use compiler macros `defineProps` and `defineEmits` with literal type definitions.
- **State Management:** Use Pinia stores for global state.
- **Form Handling:** Use `vee-validate` and `zod` for schema validation.
- **Tailwind CSS:** Use Tailwind CSS v4 classes. Avoid scoped CSS unless absolutely necessary.
- **Naming Conventions:** Use PascalCase for Vue components (e.g., `FinancialSummary.vue`).

## Technology Mapping (React -> Vue)
- **Framework:** React -> Vue 3 (Composition API)
- **Animations:** `framer-motion` -> Vue `<Transition>` or `@vueuse/motion`
- **Charts:** `recharts` -> `@unovis/vue` (Use Shadcn-Vue Chart components)
- **Hooks:** `useEffect`/`useMemo` -> `onMounted`/`watch`/`computed`
- **State:** React Context/Query -> Pinia / `@tanstack/vue-query`
- **Themes:** `next-themes` -> `@vueuse/core` (`useDark`)
- **Routing:** `react-router-dom` -> `vue-router`

## File Structure Reference
- `src/components/ui/`: Shadcn Vue base components.
- `src/components/`: Feature-specific components.
- `src/views/`: Page-level components.
- `src/stores/`: Pinia store definitions.
- `src/lib/utils.ts`: Utility functions (including `cn`).
- `src/types/schema.ts`: Shared TypeScript interfaces.
- `src/mocks/`: Mock data for frontend development.
- `src/composables/`: Reusable business logic and formatting.

## Strategic Guidelines
1. **Schema-First:** Always import types from `@/types/schema.ts` for financial data.
2. **Mock Usage:** Use `@/mocks/` for sample data in your components.
3. **Extract Logic:** Move complex data manipulation or formatting into `@/composables/`.
4. **Consistency:** Ensure UI/UX matches the provided `inspirations/` source code exactly.

## Example Component Structure
```vue
<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LucideIconName } from "lucide-vue-next";

interface Props {
  label: string;
  icon?: any;
  className?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.className)">
    <component :is="icon" v-if="icon" class="size-4" />
    <span>{{ label }}</span>
    <Button>Action</Button>
  </div>
</template>
```

When asked to migrate or create a component, always refer to the `inspirations/` folder to ensure visual consistency.
