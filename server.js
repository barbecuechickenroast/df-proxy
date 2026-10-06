const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', createProxyMiddleware({
    target: 'https://deltarunesim.com',
    changeOrigin: true,
    router: {
        'localhost': 'https://deltarunesim.com'
    },
    onProxyRes: function (proxyRes, req, res) {
        // Strip away the security guardrails that trigger connection refusals
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['content-security-policy'];
        
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
}));

app.listen(PORT, () => {
    console.log(`Proxy server actively running on port ${PORT}`);
});
