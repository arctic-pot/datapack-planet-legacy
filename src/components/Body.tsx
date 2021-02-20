import React, {useState} from 'react';
import fs from 'fs';
import path from 'path';
import glob from 'glob'
import FileList from './FileList';
import './Body.scss'

export default function Body(): JSX.Element {
    const [filePath, setFilePath] = useState('');
    const [items, setItems] = useState(getFileListItems());

    function getFileListItems() {
        function generateType(pathname: string) {
            const split = pathname.split(/\//g);
            const length = split.length;
            return {
                type: split[length - 2],
                name: split[length - 1],
                dir: pathname
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
        <>
            <div className="body-col">
                <FileList items={items} />
            </div>
        </>
    )
}