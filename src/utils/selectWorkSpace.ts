import fs from 'fs-extra';
import electron from 'electron';
import path from 'path';

export default function selectWorkSpace(): void {
  const settings = fs.readJsonSync('./settings.json');
  const selected = electron.remote.dialog.showOpenDialogSync({
    properties: ['openDirectory', 'dontAddToRecent', 'createDirectory'],
  });
  if (selected) {
    const dir = path.resolve(selected[0]);
    settings.directories.root = dir;
    fs.readJson(path.resolve(dir, './pack.mcmeta'))
      .then((data) => {
        if (data.pack && data.pack.pack_format) {
          fs.writeJson('./settings.json', settings, { spaces: 4 }).then(() => location.reload());
        } else {
          // pack.mcmeta is invalid
          electron.remote.dialog.showMessageBoxSync({
            title: 'pack.mcmeta is invalid',
            message: 'Your pack definition is invalid',
            type: 'error',
          });
        }
      })
      .catch(() => {
        // No pack.mcmeta
        electron.remote.dialog.showMessageBoxSync({
          title: 'No pack.mcmeta',
          message: "You don't have a pack definition",
          type: 'error',
        });
      });
  }
}
