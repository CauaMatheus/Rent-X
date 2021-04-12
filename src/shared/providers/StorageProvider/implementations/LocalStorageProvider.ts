import fs from 'fs';
import { resolve } from 'path';

import upload from '@config/upload';

import { IStorageProvider } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    fs.promises.rename(
      resolve(upload.tempFolder, file),
      resolve(upload.tempFolder, folder, file),
    );
    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filepath = resolve(upload.tempFolder, folder, file);
    try {
      fs.promises.stat(filepath);
    } catch {
      return;
    }
    fs.promises.unlink(filepath);
  }
}

export { LocalStorageProvider };
