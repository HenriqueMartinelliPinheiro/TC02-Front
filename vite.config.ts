import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		postcss: {
			plugins: [tailwindcss(), autoprefixer()],
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		port: 5173,
		https: {
			key: fs.readFileSync('/caminho/para/privkey.pem'), // Caminho para sua chave privada
			cert: fs.readFileSync('/caminho/para/fullchain.pem'), // Caminho para o certificado
		},
		host: '0.0.0.0', // Garante que o Vite esteja acessível de fora da máquina local
	},
});
