/* eslint-env node */
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginSvelte from 'eslint-plugin-svelte';
import jsonc from 'eslint-plugin-jsonc';
import yml from 'eslint-plugin-yml';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import { includeIgnoreFile } from '@eslint/compat';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
	includeIgnoreFile(gitignorePath),
	{
		ignores: [
			'.svelte-kit/**',
			'build/**',
			'dist/**',
			'playwright-report/**',
			'.lighthouseci/**',
			'coverage/**'
		]
	},

	js.configs.recommended,
	...tseslint.configs.recommended,
	...pluginSvelte.configs['flat/recommended'],
	prettier,
	...pluginSvelte.configs['flat/prettier'],
	...jsonc.configs['flat/recommended-with-json'],
	...yml.configs['flat/recommended'],

	{
		files: ['**/*.svelte'],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				parser: tseslint.parser,
				svelteConfig
			}
		},
		rules: {
			'no-undef': 'off',
			'no-console': ['warn', { allow: ['warn', 'error'] }]
		}
	},

	{
		files: [
			'src/**/*.ts',
			'tests/**/*.ts',
			'scripts/**/*.{ts,cts,mts}',
			'config/**/*.{ts,cts,mts}',
			'playwright.config.{ts,cts,mts}',
			'*.ts',
			'vite.config.ts'
		],
		ignores: ['tailwind.config.ts', 'postcss.config.ts', 'vite.config.ts', 'svelte.config.js'],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parser: tseslint.parser,
			parserOptions: {
				project: ['./tsconfig.eslint.json'],
				tsconfigRootDir: __dirname
			}
		},
		rules: {
			'no-undef': 'off',
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
			]
		}
	},

	{
		files: ['*.cjs', '.*.cjs', '**/*.config.cjs', 'config/**/*.cjs', 'scripts/**/*.cjs'],
		languageOptions: {
			ecmaVersion: 2023,
			sourceType: 'commonjs',
			globals: { ...globals.node }
		},
		rules: {
			'no-console': 'off',
			'no-undef': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/no-var-requires': 'off'
		}
	},

	{
		files: ['*.config.{js,mjs}', '.*.{js,mjs}', 'config/**/*.{js,mjs}', 'scripts/**/*.{js,mjs}'],
		languageOptions: {
			ecmaVersion: 2023,
			sourceType: 'module',
			globals: { ...globals.node }
		},
		rules: {
			'no-console': 'off',
			'no-undef': 'off'
		}
	},

	{
		files: ['tailwind.config.ts', 'postcss.config.ts', 'vite.config.ts', 'svelte.config.js'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: { project: null, tsconfigRootDir: __dirname },
			ecmaVersion: 2023,
			sourceType: 'module',
			globals: { ...globals.node }
		},
		rules: {}
	}
];
