const { scheduleJob } = require('node-schedule');
const { writeFile } = require('fs').promises;
const fetch = require('node-fetch');
const path = require('path');
const xlsx = require('node-xlsx');

const { DrugTypesService } = require('../services/DrugTypes');
const { DrugsService } = require('../services/Drugs');
const { HospitalsService } = require('../services/Hospitals');
const { DrugsListService } = require('../services/DrugList');

const defineDugType = (currentType = '???', types) => {
    if(typeof currentType !== 'string') currentType = `${currentType}`;
    if(currentType.startsWith('фл')) return types['BOTTLE'];
    else if(currentType.startsWith('таб') || currentType.startsWith('тб')) return types['BLISTER'];
    else if(currentType.startsWith('уп') || currentType.startsWith('пач')) return types['PACKAGING'];
    else if(currentType.startsWith('ам')) return types['AMPULE'];
    else if(currentType.startsWith('капс')) return types['CAPSULE'];
    else if(currentType.startsWith('неб')) return types['NEBULI'];
    else if(currentType.startsWith('доз')) return types['VACCINE'];
    else if(currentType.startsWith('туб')) return types['OINTMENT'];
    else if(currentType.startsWith('шп')) return types['SYRINGE'];
    else return types['UNKNOWN'];
};

const parseData = async (fileData) => {
    const drugTypes = await DrugTypesService.getAll();
    const dataWithoutEmptyRows = fileData[0].data.filter(item => item.length).slice(3).slice(0, -1);

    let parsedData = {};
    let currentHospital;

    dataWithoutEmptyRows.forEach(row => {
       if(row.length === 1 || row.length === 2) {
           currentHospital = row[row.length - 1];
           return;
       }

       const currentDrug = parsedData[row[1]];
       if(!currentDrug) {
           parsedData[row[1]] = {};
           parsedData[row[1]].type = defineDugType(row[2], drugTypes);
           parsedData[row[1]].hospitals = {};
       }

       parsedData[row[1]].hospitals[currentHospital] = row[4];
    });

    async function* generateDrugs(drugsList) {
        for(const item of Object.entries(drugsList)) {
            yield item;
        }
    }

    async function* generateHospitals(hospitalsList) {
        for(const item of Object.entries(hospitalsList)) {
            yield item;
        }
    }

    for await (const [drugName, drugInfo] of generateDrugs(parsedData)) {
        const { drugId } = await DrugsService.create({ name: drugName, typeId: drugInfo.type });

        for await (let [hospitalName, amount] of generateHospitals(drugInfo.hospitals)) {
            const { hospitalId } = await HospitalsService.createIfNotExists({ primaryName: hospitalName.replace(new RegExp('\\s+', 'gim'), ' '), markerName: hospitalName.replace(new RegExp('\\s+', 'gim'), ' ') });
            (amount && typeof amount === 'number') && (await DrugsListService.add({ drugId, hospitalId, amount }));
        }
    }
};

const getInfoAboutFile = (url) => {
    const currentFileName = url.split(new RegExp('\\/', 'gim')).reverse()[0];
    const currentFileUpdateUnparsed = currentFileName.replace(new RegExp('\\.xlsx'), '').split(new RegExp('-', 'gim')).reverse();
    const currentFileUpdate = new Date(`${currentFileUpdateUnparsed[1]}-${currentFileUpdateUnparsed[2]}-${currentFileUpdateUnparsed[0]}`);
    currentFileUpdate.setTime(currentFileUpdate.getTime() + 3 * 60 * 60 * 1000);
    return {
        url: url,
        name: currentFileName,
        update: currentFileUpdate
    };
};

const parseDataByUrl = async () => {
    try {
        const dataFromFile = xlsx.parse(path.resolve(__dirname, '..', 'uploads', 'drugs', 'vidomosti-stanom-na-01-04-2020.xlsx'));
        await parseData(dataFromFile);

/*        const { source } = require('./parser.settings.json');
        const page = await fetch('https://data.gov.ua/dataset/cbda9040-432e-493f-9e17-e44b8c1d73d1').then(r => r.text()).then(html => html.replace(new RegExp('\\s+', 'gim')));
        const listDataUrls = page.match(new RegExp('(https:\\/\\/data\\.gov\\.ua\\/dataset\\/0597d35e-ba30-479f-ad78-e63bf8f9915c\\/resource\\/.*?xlsx)', 'gim'));
        const currentFileData = getInfoAboutFile(listDataUrls[0]);
        if(currentFileData.url !== source) {
            const fileData = await fetch(currentFileData.url).then(data => data.arrayBuffer()).then(data => Buffer.from(data));
            await writeFile(path.resolve(__dirname, '..', 'uploads', 'drugs', currentFileData.name), fileData);
            await writeFile(path.resolve(__dirname, 'parser.settings.json'), JSON.stringify({ update: currentFileData.update, source: currentFileData.url }));
            const dataFromFile = xlsx.parse(path.resolve(__dirname, '..', 'uploads', 'drugs', currentFileData.name));
            await parseData(dataFromFile);
            console.log('[PARSER]: Data success updated!')
        }*/
    } catch (e) {
        console.log(`[PARSER]: Can\'t parse by url! [${e}]`);
    }
};

const startParsing = async () => {
    console.log("[PARSER]: Reading config...");
    const { source, update } = require('./parser.settings.json');
    if(!(update && source)) throw new Error('cant start');
    console.log("[PARSER]: Success start!");
    await parseDataByUrl();
    // scheduleJob('0 0 */1 * * *', parseDataByUrl);
};

module.exports = { startParsing };