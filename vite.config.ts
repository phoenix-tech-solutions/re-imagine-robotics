import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (
    env.VITE_SITE_URL ||
    (mode === 'development' ? 'http://localhost:5173' : 'https://reimaginerobotix.org')
  ).replace(/\/$/, '')

  return {
  plugins: [
    react(),
    {
      name: 'inject-site-url',
      transformIndexHtml(html) {
        return html.replaceAll('%SITE_URL%', siteUrl)
      },
    },
  ],
  server: {
    host: true,
    allowedHosts: [
      '.loca.lt',
      '.ngrok.io',
      '.tunnel.me',
      'localhost',
      '127.0.0.1'
    ]
  }
  }
})
