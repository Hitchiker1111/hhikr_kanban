import { createApp } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

(async () => {
  const app = await createApp<Framework>();
  await app.listen(3000);
  console.log('Server started at http://localhost:3000');
})();
