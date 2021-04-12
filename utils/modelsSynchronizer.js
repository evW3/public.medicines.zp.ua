const { sequelize } = require('./baseDB');
require('../models/relations');
const { DrugTypesService } = require('../services/DrugTypes');

class ModelsSynchronizer {
	async #checkConnection() {
		await sequelize.authenticate();
		console.log('[DB]: Connection to DB has been established successfully!');
	}

	async #log({ models }) {
		Object.keys(models).forEach(modelName => console.log(`[DB]: Model "${modelName}" were synchronized!`));
	}

	async syncAll() {
		await this.#checkConnection();

		await this.removeAll();

		await sequelize.sync();
		await this.#log(sequelize);

		await DrugTypesService.initBase();
	}

	async removeAll() {
		await sequelize.drop();
	}
}

module.exports = {
	modelsSynchronizer: new ModelsSynchronizer()
};