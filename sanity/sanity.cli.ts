// @ts-ignore
type CliConfig = any

// Mock defineCliConfig function
const defineCliConfig = (config: CliConfig) => config

export default defineCliConfig({
  api: {
    projectId: '8ucvng19',
    dataset: 'production'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
  server: {
    port: 3335
  }
})
