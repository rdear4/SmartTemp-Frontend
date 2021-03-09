const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log("Setting up the proxy.");
  app.use(createProxyMiddleware('/api/', { target: 'http://localhost:4402/', changeOrigin: true }))
};