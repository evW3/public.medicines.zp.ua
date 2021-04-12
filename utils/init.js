const { mkdirSync, existsSync, writeFile } = require('fs')
const { resolve } = require('path');

const generateFile = async () => {
    const uploadsDir = resolve(__dirname, '..', 'uploads', 'drugs');
    if(!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true });
};

module.exports = { generateFile }