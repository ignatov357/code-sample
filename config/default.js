const appRoot = require('app-root-path');

module.exports = {
  app: {
    apiUrl: 'https://reqres.in/api',
    directoryToSaveAvatarsTo: `${appRoot}/app-data/avatars`,
  },
  scrapping: {
    listOfUsersFilePath: `${appRoot}/app-data/users.json`,
    scrappingInterval: 60 * 1000,
  },
};
