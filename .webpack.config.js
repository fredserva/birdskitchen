module.exports = config => {
    config.target = 'electron-renderer';
    config.externals = {
        puppeteer: 'require("puppeteer")'
    };
    return config;
}