/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/

import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '8ucvng19',
    dataset: 'production'
  },
  cors: {
    allowOrigins: ['https://myport18.vercel.app', 'http://localhost:3000'],
    allowCredentials: true,
    allowHeaders: ['Authorization', 'Content-Type'],
    maxAge: 600
  }
})
