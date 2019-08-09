import express from 'express';
import api from './api';

const app = express();

app.use('/api', api);

app.use((error: any, req: any, res: any, next: any) => {
  console.error(error);

  res.status(500);
  res.end();
});

app.listen(3000, function () {
  console.log('Server has been started on port 3000!');
});

export default app;
