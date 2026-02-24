import { globalIgnores } from "eslint/config";
import js from "@eslint/js";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import pluginVitest from "@vitest/eslint-plugin";
import skipFormatting from "eslint-config-prettier/flat";

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
    {
        name: "app/files-to-lint",
        files: ["**/*.{vue,ts,mts,tsx}"],
    },

    globalIgnores([
        "**/dist/**", "**/dist-ssr/**", "**/coverage/**", "old_version/**", ".gitignore"
    ]),

    js.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    vueTsConfigs.recommended,

    skipFormatting,

    {
        name: "app/legacy-rules",
        files: ["**/*.{vue,ts,mts,tsx}"],
        rules: {
            indent: [
                "error", 4
            ],
            "no-console": [
                "warn", { allow: ["error"] }
            ],
            semi: [
                "error", "always"
            ],
            "array-bracket-newline": [
                "error", { minItems: 2, multiline: true }
            ],
            "vue/html-indent": [
                "error",
                4,
                {
                    attribute: 1,
                    baseIndent: 1,
                    closeBracket: 0,
                    alignAttributesVertically: true,
                    ignores: [],
                },
            ],
        },
    },

    {
        ...pluginVitest.configs.recommended,
        files: ["src/**/__tests__/*"],
    },
);
