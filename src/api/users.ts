import express from 'express';
import config from 'config';
import downloader from 'image-downloader';
import { fileExists, readFile, removeFile } from '../utils';
import models from '../models';
import { User } from '../models/users';

const directoryToSaveAvatarsTo: string = config.get('app.directoryToSaveAvatarsTo');

const router: express.Router = express.Router();

router.get('/:id', async (req, res) => {
  const user: User = await models.users.getUser(req.params.id);

  res.send(user);
});

router.get('/:id/avatar', async (req, res) => {
  const userId: string = req.params.id;
  const { avatar: avatarUrl }: User = await models.users.getUser(userId);

  const destinationFile: string = `${directoryToSaveAvatarsTo}/user-${userId}.jpg`;

  let image: Buffer;
  if (await fileExists(destinationFile)) {
    image = await readFile(destinationFile);
  } else {
    image = await downloader.image({ url: avatarUrl, dest: destinationFile }).then(({ image }) => Buffer.from(image));
  }

  res.send(image.toString('base64'));
});

router.delete('/:id/avatar', async (req, res) => {
  const destinationFile: string = `${directoryToSaveAvatarsTo}/user-${req.params.id}.jpg`;

  await removeFile(destinationFile);

  res.status(204).end();
});

export default router;
