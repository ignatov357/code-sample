import fs from 'fs';

export const fileExists = async (filePath: string) => {
  try {
    await fs.promises.access(filePath);

    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }

    throw error;
  }
};

export const readFile = async (filePath: string) => {
  return fs.promises.readFile(filePath);
};

export const writeFile = async (filePath: string, data: any) => {
  return fs.promises.writeFile(filePath, data);
};

export const removeFile = async (filePath: string) => {
  if (await fileExists(filePath)) {
    await fs.promises.unlink(filePath);
  }
};
