import { addComponent, addImports, addServerHandler, addTemplate, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit'
import { withBase } from 'ufo'
import { asArray } from './util'

export interface ModuleOptions {
  /**
   * Whether the robots.txt should be generated.
   *
   * @default true
   */
  enabled: boolean
  /**
   * The hostname of your website. Used to generate absolute URLs.
   */
  host: string
  indexable: boolean
  /**
   * Path to the sitemap.xml file, if it exists.
   */
  sitemap: string | string[]
  disallow: string | string[]
  robotsEnabledValue: string
  robotsDisabledValue: string
}

export interface ResolvedModuleOptions extends ModuleOptions {
  sitemap: string[]
  disallow: string[]
}

export interface ModuleHooks {
  'robots:config': (config: ResolvedModuleOptions) => Promise<void> | void
}

export interface ModulePublicRuntimeConfig {
  ['nuxt-simple-robots']: ResolvedModuleOptions
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-simple-robots',
    compatibility: {
      nuxt: '^3.3.1',
      bridge: false,
    },
    configKey: 'robots',
  },
  defaults(nuxt) {
    let indexable = true
    if (typeof process.env.NUXT_INDEXABLE !== 'undefined')
      indexable = String(process.env.NUXT_INDEXABLE) !== 'false'
    else if (typeof nuxt.options.runtimeConfig.indexable !== 'undefined')
      indexable = String(nuxt.options.runtimeConfig.indexable) !== 'false'
    else if (process.env.NODE_ENV !== 'production')
      indexable = false
    return {
      enabled: true,
      host: process.env.NUXT_PUBLIC_SITE_URL || process.env.NUXT_SITE_URL || nuxt.options.runtimeConfig.public?.siteUrl || nuxt.options.runtimeConfig.siteUrl,
      disallow: [],
      sitemap: [],
      indexable,
      robotsEnabledValue: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      robotsDisabledValue: 'noindex, nofollow',
    }
  },
  async setup(config, nuxt) {
    if (config.enabled === false)
      return

    const { resolve } = createResolver(import.meta.url)

    config.indexable = String(config.indexable) !== 'false'

    const logger = useLogger('nuxt-simple-robots')

    nuxt.hook('modules:done', () => {
      config.sitemap = asArray(config.sitemap)
      // validate sitemaps are absolute
      for (const k in config.sitemap) {
        const sitemap = config.sitemap[k]
        if (!sitemap.startsWith('http')) {
          // infer siteUrl from runtime config
          if (config.host) {
            config.sitemap[k] = withBase(sitemap, config.host)
          }
          else {
            // remove the sitemap entry from config.sitemap
            config.sitemap.splice(Number(k), 1)
            logger.error(`Ignoring robots.txt entry ${sitemap}, sitemap must be absolute.\nPlease provide "host" or make the link absolute, for example: https://example.com${sitemap}.`)
          }
        }
      }
      config.sitemap = [...new Set(config.sitemap)]

      config.disallow = asArray(config.disallow)
      config.disallow = [...new Set(config.disallow)]
      // @ts-expect-error runtime type
      nuxt.hooks.callHook('robots:config', config)
      nuxt.options.runtimeConfig.public['nuxt-simple-robots'] = config as ResolvedModuleOptions
    })

    // paths.d.ts
    addTemplate({
      filename: 'nuxt-simple-robots.d.ts',
      getContents: () => {
        return `// Generated by nuxt-simple-robots
interface NuxtSimpleRobotsNitroRules {
  index?: boolean
  robots?: string
}
declare module 'nitropack' {
  interface NitroRouteRules extends NuxtSimpleRobotsNitroRules {}
  interface NitroRouteConfig extends NuxtSimpleRobotsNitroRules {}
}
export {}
`
      },
    })

    nuxt.hooks.hook('prepare:types', ({ references }) => {
      references.push({ path: resolve(nuxt.options.buildDir, 'nuxt-simple-robots.d.ts') })
    })

    nuxt.hooks.hook('nitro:init', async (nitro) => {
      nitro.options.prerender.routes = nitro.options.prerender.routes || []
      nitro.options.prerender.routes.push('/robots.txt')
    })

    exposeModuleConfig('nuxt-simple-robots', config)

    addImports({
      name: 'defineRobotMeta',
      from: resolve('./runtime/composables/defineRobotMeta'),
    })

    await addComponent({
      name: 'RobotMeta',
      filePath: resolve('./runtime/components/RobotMeta'),
    })

    // add robots.txt server handler
    addServerHandler({
      route: '/robots.txt',
      handler: resolve('./runtime/server/robots-route'),
    })
    // add robots HTTP header handler
    addServerHandler({
      handler: resolve('./runtime/server/robots-middleware'),
    })
  },
})
