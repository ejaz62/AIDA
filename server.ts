import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createApiApp } from './src/server/createApiApp';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';

// Parse --port CLI arg if provided by AI Studio dev supervisor, defaulting to 3000.
// Port 8080 is explicitly reserved by the container's Nginx reverse proxy.
const portArgIndex = process.argv.indexOf('--port');
const portArg = portArgIndex !== -1 ? Number(process.argv[portArgIndex + 1]) : null;
const PORT = (portArg && !isNaN(portArg) && portArg !== 8080)
  ? portArg
  : (process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000);

async function startServer() {
  const app = createApiApp();

  // Serve static assets from public/assets directory
  app.use('/assets', express.static(path.resolve(__dirname, 'public/assets')));

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : undefined,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AIDA Server] Full-Stack server running at http://0.0.0.0:${PORT}`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Network: http://0.0.0.0:${PORT}/`);
  });

  server.on('error', (err: any) => {
    console.error(`[AIDA Server] Server error:`, err);
  });
}

startServer().catch((err) => {
  console.error('[AIDA Server] Startup failure:', err);
  process.exit(1);
});
