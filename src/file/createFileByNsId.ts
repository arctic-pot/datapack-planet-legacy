import fs from 'fs';
import path from 'path';

export type TFileType = 'functions' | 'loot_tables' | 'advancements' | 'recipes' | 'predicates';

export default function createFileByNsId(base: string, type: TFileType, nsId: string): void {
  // get namespaced identifier path first
  const [namespace, pathTo] = nsId.split(/:/);
  const filePath = `./data/${namespace}/${type}/${pathTo}.${
    type === 'functions' ? 'mc' + 'function' : 'json'
  }`;
  // Write file to create
  fs.writeFileSync(path.resolve(base, filePath), Buffer.from(''));
}
