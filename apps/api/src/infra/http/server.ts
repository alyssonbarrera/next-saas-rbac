import { env } from '@saas/env'

import { app } from './app'

app
  .listen({
    port: env.SERVER_PORT,
    host: '::',
  })
  .then(() => {
    console.log('HTTP server is running on port 3000')
  })
