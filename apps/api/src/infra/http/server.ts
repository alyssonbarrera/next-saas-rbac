import { env } from '@/infra/env'

import { app } from './app'

app
  .listen({
    port: env.PORT,
    host: '::',
  })
  .then(() => {
    console.log('HTTP server is running on port 3000')
  })
