import fs from 'fs-extra';

export function closeWorkspace(): void {
  fs.readJson('./settings.json').then((_data) => {
    const data = _data;
    data.directories.root = null;
    fs.writeJsonSync('./settings.json', data);
    location.reload();
  });
}
