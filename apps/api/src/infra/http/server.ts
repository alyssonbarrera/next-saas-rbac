import { env } from '@saas/env'

import { app } from './app'

app
  .listen({
    port: env.PORT,
    host: '::',
  })
  .then(() => {
    console.log(`HTTP server is running on port ${env.PORT}`)
  })
