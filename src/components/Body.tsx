import React, { useState } from 'react';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import FileList from './FileList';
import './Body.scss';

export default function Body(): JSX.Element {
  const filePath = path.resolve(
    JSON.parse(fs.readFileSync('./settings.json').toString()).directories.root,
    './data'
  );
  const [items, setItems] = useState(_getFileListItems());
  const [groups, setGroups] = useState(_getGroups());

  function _getFileListItems() {
    function generateType(pathname: string) {
      const typeList = pathname.match(
        /functions|advancements|recipes|loot_tables|predicates/g
      );
      const nameList = pathname.match(
        /.*\/(functions|advancements|recipes|loot_tables|predicates)\/(.*\/)?.*\./g
      );
      const names = nameList[0];
      const [, nameNS, , ...pathTo] = names.split(/\//g);
      const pathToValid = pathTo
        .join('/')
        .slice(0, pathTo.join('/').length - 1);
      const name = `${nameNS}:${pathToValid}`;

      return {
        type: typeList[typeList.length - 1],
        name: name,
        dir: path.resolve(filePath, pathname),
      };
    }
    const JSONSchemas = glob.sync(
      './*/@(advancements|recipes|loot_tables|predicates)/**/*.json',
      { cwd: filePath }
    );
    const MCFunctions = glob.sync('./*/functions/**/*.mc' + 'function', {
      cwd: filePath,
    });

    const fileList: Array<any> = [];
    [...JSONSchemas, ...MCFunctions].forEach((item: string) =>
      fileList.push(generateType(item))
    );
    fileList.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      if (a.name > b.name) return 0;
    });
    fileList.sort((a, b) => {
      if (a.type < b.type) return -1;
      if (a.type > b.type) return 1;
      if (a.type > b.type) return 0;
    });
    return fileList;
  }

  function _getGroups() {
    let advancements: number = 0,
      recipes: number = 0,
      lootTables: number = 0,
      dimensions: number = 0,
      dimensionTypes: number = 0,
      functions: number = 0;

    items.forEach((item: any, _index: number, _arr: any[]) => {
      if (item.type === 'advancements') advancements += 1;
      if (item.type === 'functions') functions += 1;
      if (item.type === 'dimension') dimensions += 1;
      if (item.type === 'dimension_types') dimensionTypes += 1;
      if (item.type === 'loot_tables') lootTables += 1;
    });

    interface IGroupFormat {
      key: string;
      name: string;
      startIndex: number;
      count: number;
    }

    const group1: IGroupFormat = advancements
      ? {
          key: 'group1',
          name: 'Advancements',
          startIndex: 0,
          count: advancements,
        }
      : undefined;
    const group2: IGroupFormat = dimensions
      ? {
          key: 'group2',
          name: 'Dimensions',
          startIndex: advancements,
          count: dimensions,
        }
      : undefined;
    const group3: IGroupFormat = dimensionTypes
      ? {
          key: 'group3',
          name: 'Dimension Types',
          startIndex: advancements + dimensions,
          count: dimensionTypes,
        }
      : undefined;
    const group4: IGroupFormat = functions
      ? {
          key: 'group4',
          name: 'Functions',
          startIndex: advancements + dimensions + dimensionTypes,
          count: functions,
        }
      : undefined;
    const group5: IGroupFormat = lootTables
      ? {
          key: 'group5',
          name: 'Loot Tables',
          startIndex: advancements + dimensions + dimensionTypes + functions,
          count: lootTables,
        }
      : undefined;

    return [group1, group2, group3, group4, group4].filter(
      (group: IGroupFormat) => !!group
    );
  }

  function refresh() {
    setItems(_getFileListItems());
  }

  return (
    <div className="body">
      <div className="body-col">
        <FileList items={items} groups={groups} />
      </div>
    </div>
  );
}
