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
  studioHost: 'admin1122',
  cors: {
    allowOrigins: [
      'https://myport18.vercel.app',
      'https://portfolio-update-git-portfolio-update-bavanthuc1122.vercel.app',
      'http://localhost:3000',
      'https://bavanthuc.com',
      'https://www.bavanthuc.com',
      'https://admin.bavanthuc.com',
      'http://localhost:3335'
    ],
    allowCredentials: true,
    allowHeaders: ['Authorization', 'Content-Type'],
    maxAge: 600
  }
})
