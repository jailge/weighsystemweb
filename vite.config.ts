import { defineConfig } from "vite";
import { resolve } from "path";
import vue from '@vitejs/plugin-vue';

function pathResolve(dir) {
    return resolve(__dirname, ".", dir);
}

export default defineConfig({
    base: "",
    plugins: [vue()],
    resolve: {
        alias: {
            "/@": pathResolve("src"),
        }
    },
    optimizeDeps: {
        include: ['axios', 'schart.js'],
    },
    css: {
        postcss: {
            plugins: [{
                postcssPlugin: 'internal:charset-removal',
                AtRule: {
                    charset: (atRule) => {
                        if (atRule.name === 'charset') {
                            atRule.remove();
                        }
                    }
                }
            }],
        },
    },
    build: {
        target: 'modules',
        outDir: 'dist',
        assetsDir: 'assets',
        minify: 'terser', // 混淆器
        chunkSizeWarningLimit: 1500,

    },
    server: {
        cors: true,
        open: true,
        port: 3005,
        host: "0.0.0.0",
        proxy: {
            '/login': {
                target: 'http://10.10.181.111:8878', //代理接口
                // target: 'http://10.10.6.180:31077', //代理接口
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/login/, '')
            },
            '/api': {
                target: 'http://10.10.181.111:8877', //代理接口
                // target: 'http://10.10.6.180:31177', //代理接口
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/file': {
                target: 'http://10.10.181.60:9099', //代理接口
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/file/, '')
            },
        }
    }
});