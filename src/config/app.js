export default {
  service: process.env.APP_SERVICE_NAME,
  env: process.env.APP_ENV || process.env.NODE_ENV,
  debug: process.env.APP_DEBUG === 'true',
};