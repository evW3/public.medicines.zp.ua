const config = require('config');
const { server } = require('./configureServer');
const { modelsSynchronizer } = require('./utils/modelsSynchronizer');
const { startParsing } = require('./parser/index');
const { generateFile } = require('./utils/init');
require('./utils/prototypes');

const { port } = config;

(async () => {
    try {
        await modelsSynchronizer.syncAll();
        await generateFile();
        server.listen(port, console.log.bind(null, `[SERVER]: Started on port ${port}!`));
        await startParsing();
    } catch (e) {
        console.log('[INIT ERROR]:', e);
    }
})()

