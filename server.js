import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', createProxyMiddleware({
    target: 'https://deltarunesim.com',
    changeOrigin: true,
    secure: false,
    on: {
        proxyRes: (proxyRes, req, res) => {
            delete proxyRes.headers['content-security-policy'];
            delete proxyRes.headers['x-frame-options'];
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.setHeader('Access-Control-Allow-Headers', '*');
        }
    }
}));

app.listen(PORT, () => {
    console.log(`Proxy server actively running on port ${PORT}`);
});
