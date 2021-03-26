import fs from 'fs';

export const deleteFile = (filename) => {
  try {
    fs.promises.stat(filename);
  } catch {
    return;
  }
  fs.promises.unlink(filename);
};
