import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1723020463209_6548',
  koa: {
    port: 7001,
  },
} as MidwayConfig;

export const cors = {
  origin: '*', // 允许所有域名跨域请求
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  credentials: true, // 允许跨域携带 cookie
};
