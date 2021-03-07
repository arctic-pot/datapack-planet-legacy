import fs from 'fs-extra';
import path from 'path';

export type TFileType = 'functions' | 'loot_tables' | 'advancements' | 'recipes' | 'predicates';

export default function createFileByNsId(base: string, type: TFileType, nsId: string): void {
  // get namespaced identifier path first
  const [namespace, pathTo] = nsId.split(/:/);
  const filePath = `./data/${namespace}/${type}/${pathTo}.${
    type === 'functions' ? 'mc' + 'function' : 'json'
  }`;
  // Write file to create
  try {
    fs.ensureFileSync(path.resolve(base, filePath));
  } catch (e: unknown) {
    const pathExcludeFile = pathTo.split(/\//g);
    pathExcludeFile.pop();
    fs.ensureDirSync(
      path.resolve(base, `./data/${namespace}/${type}/${pathExcludeFile.join('/')}`)
    );
    fs.ensureFileSync(path.resolve(base, filePath));
  }
}
