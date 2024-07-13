import * as fs from 'fs';
import * as fsp from 'fs/promises';


export class AbstractRepository {

    async getDataFromFile(path: string) {

        if (!fs.existsSync(__dirname + path)) await fsp.appendFile(__dirname + path, '')

        let data = await fsp.readFile(__dirname + path, 'utf-8');
        let parsedData = data.split(/##/g).filter(row => !!row)

        let result = parsedData.map(row => JSON.parse(row))

        return result;
    }

}