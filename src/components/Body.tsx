import React, {useState} from 'react';
import fs from 'fs';
import path from 'path';
import glob from 'glob'
import FileList from './FileList';
import './Body.scss'

export default function Body(): JSX.Element {
    const filePath = path.resolve(JSON.parse(fs.readFileSync('./settings.json').toString()).directories.root, './data');
    const [items, setItems] = useState(getFileListItems());
    const [groups, setGroups] = useState([
        { key: '', name: '', startIndex: 0, count: 0, level: 0 }
    ]);

    function getFileListItems() {
        function generateType(pathname: string) {
            console.log(pathname)
            const typeList = pathname.match(/functions|advancements|recipes|loot_tables|predicates/g);
            const nameList = pathname.match(/.*\/(functions|advancements|recipes|loot_tables|predicates)\/(.*\/)?.*\./g);
            const names = nameList[0];
            const [, nameNS, , ...pathTo] = names.split(/\//g);
            const pathToValid = pathTo.join('/').slice(0, pathTo.join('/').length - 1);
            const name = `${nameNS}:${pathToValid}`;

            return {
                type: typeList[typeList.length - 1],
                name: name,
                dir: path.resolve(filePath, pathname),
            }
        }
        const JSONSchemas = glob.sync(
            './*/@(advancements|recipes|loot_tables|predicates)/**/*.json',
            {cwd: filePath}
        );
        const MCFunctions = glob.sync(
            './*/functions/**/*.mc' + 'function',
            {cwd: filePath}
        );

        const fileList: Array<any> = [];
        [...JSONSchemas, ...MCFunctions].forEach((item: string) => fileList.push(generateType(item)));
        return fileList;
    }

    function refresh() { 
        setItems(getFileListItems());
    }

    return (
        <div className="body">
            <div className="body-col">
                <FileList items={items} groups={groups} />
            </div>
        </div>
    )
}
