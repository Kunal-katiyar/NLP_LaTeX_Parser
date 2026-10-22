import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [
      tailwindcss(),
    ],
    legacy: {
      skipWebSocketTokenCheck: true,
    },
  }),
  modules: ['@wxt-dev/module-react'],
  srcDir: 'src',
  manifest: {
    name: 'NLP LaTeX Parser',
    permissions: ["storage", "activeTab", "scripting", "tabs"],
    web_accessible_resources: [
      {
        resources: ["pad.injection.js"],
        matches: ["<all_urls>"],
      },
    ],
  },
  webExt: { disabled: true },
  experimental: { escapeUnicode: true }
});
