import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import tsPlugin from '@typescript-eslint/eslint-plugin';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...tsPlugin.configs['flat/recommended'],
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
 
export default eslintConfig;