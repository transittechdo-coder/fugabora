import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build`         -> installable offline PWA in dist/ (for Netlify / GitHub Pages)
// `npm run build:preview` -> one self-contained HTML file in dist-preview/ (for sharing a preview)
export default defineConfig(({ mode }) => {
  const single = mode === 'preview-single'
  // GitHub Pages serves the site from /<repo>/, so use relative paths there.
  const base = process.env.VITE_BASE || '/'
  return {
    base,
    plugins: [
      react(),
      single
        ? viteSingleFile()
        : VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['icon.svg'],
            manifest: {
              name: 'FugaBora',
              short_name: 'FugaBora',
              description: 'Msaidizi wa afya ya mifugo kwa Kiswahili',
              lang: 'sw',
              theme_color: '#1d6a45',
              background_color: '#e9efe6',
              display: 'standalone',
              start_url: '.',
              scope: '.',
              icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }],
            },
            workbox: {
              globPatterns: ['**/*.{js,css,html,svg}'],
              runtimeCaching: [{ urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/, handler: 'CacheFirst', options: { cacheName: 'fonts' } }],
            },
          }),
    ],
    build: { outDir: single ? 'dist-preview' : 'dist' },
  }
})
