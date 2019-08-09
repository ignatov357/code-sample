import config from 'config';
import models from './models';
import { User } from './models/users';
import { writeFile } from './utils';

const { listOfUsersFilePath, scrappingInterval } = config.get('scrapping');

const init = async () => {
  let currentPage = 1;
  let users: User[] = [];

  const scrap = async () => {
    const currentPageUsers = await models.users.getUsers(currentPage);

    users.push(...currentPageUsers);
    await writeFile(listOfUsersFilePath, JSON.stringify(users));
    console.log(`Page #${currentPage} has been successfully scrapped`);

    currentPage++;
  };

  await scrap();
  setInterval(scrap, scrappingInterval);
};

init();
