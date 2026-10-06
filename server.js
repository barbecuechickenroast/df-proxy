import express from 'express';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', createProxyMiddleware({
    target: 'https://deltarunesim.com',
    changeOrigin: true,
    selfHandleResponse: true, 
    on: {
        proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
            res.removeHeader('content-security-policy');
            res.removeHeader('x-frame-options');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            
            return responseBuffer;
        })
    }
}));

app.listen(PORT, () => {
    console.log(`Proxy server actively running on port ${PORT}`);
});
