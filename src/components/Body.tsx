import React, { useState } from 'react';
import path from 'path';
import glob from 'glob';
import FileList from './FileList';
import './Body.scss';
import watch from 'node-watch';

interface IGroupFormat {
  key: string;
  name: string;
  startIndex: number;
  count: number;
}

interface IItemFormat {
  type: string;
  name: string;
  dir: string;
}

let shouldWatch = true;

export default function Body(): JSX.Element {
  const filePath = path.resolve(sessionStorage.getItem('dir'), './data');
  const [items, setItems] = useState<IItemFormat[]>(_getFileListItems());
  const [groups, setGroups] = useState<IGroupFormat[]>(_getGroups());

  function _getFileListItems(): Array<IItemFormat> {
    function generateType(pathname: string): IItemFormat {
      const typeList = pathname.match(
        /functions|advancements|recipes|loot_tables|predicates|tags/g
      );
      const nameList = pathname.match(
        /.*\/(functions|advancements|recipes|loot_tables|predicates|tags)\/(.*\/)?.*\./g
      );
      const names = nameList[0];
      const [, nameNS, , ...pathTo] = names.split(/\//g);
      const pathToValid = pathTo.join('/').slice(0, pathTo.join('/').length - 1);
      const name = `${nameNS}:${pathToValid}`;

      return {
        type: typeList[0],
        name: name,
        dir: path.resolve(filePath, pathname),
      };
    }
    const JSONSchemas = glob.sync(
      './*/@(advancements|recipes|loot_tables|predicates|tags)/**/*.json',
      { cwd: filePath }
    );
    const MCFunctions = glob.sync('./*/functions/**/*.mc' + 'function', {
      cwd: filePath,
    });

    const fileList: Array<IItemFormat> = [];
    [...JSONSchemas, ...MCFunctions].forEach((item: string) => fileList.push(generateType(item)));
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
    let advancements = 0,
      lootTables = 0,
      dimensions = 0,
      dimensionTypes = 0,
      tags = 0,
      functions = 0;

    _getFileListItems().forEach((item: IItemFormat) => {
      if (item.type === 'advancements') advancements += 1;
      if (item.type === 'functions') functions += 1;
      if (item.type === 'dimension') dimensions += 1;
      if (item.type === 'dimension_types') dimensionTypes += 1;
      if (item.type === 'loot_tables') lootTables += 1;
      if (item.type === 'tags') tags += 1;
    });

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
    const group6: IGroupFormat = tags
      ? {
          key: 'group6',
          name: 'Tags',
          startIndex: advancements + dimensions + dimensionTypes + functions + lootTables,
          count: tags,
        }
      : undefined;

    const validGroups = [group1, group2, group3, group4, group5, group6].filter(
      (group: IGroupFormat) => !!group
    );
    return validGroups;
  }

  if (shouldWatch) {
    shouldWatch = false;
    watch(
      filePath,
      {
        recursive: true,
      },
      () => {
        setGroups(_getGroups());
        setItems(_getFileListItems());
      }
    );
  }

  return (
    <div className="body">
      <div className="body-col">
        <FileList items={items} groups={groups} />
      </div>
    </div>
  );
}
