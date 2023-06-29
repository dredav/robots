import { useNuxtApp, useRoute, useRuntimeConfig, useServerHead, useSiteConfig } from '#imports'

export function defineRobotMeta() {
  if (process.server) {
    const nuxtApp = useNuxtApp()
    const path = useRoute().path
    const { indexable } = useSiteConfig()
    const { robotsDisabledValue, robotsEnabledValue, groups } = useRuntimeConfig()['nuxt-simple-robots']
    // check if the route exist within any of the disallow stacks and not within the allow of the same stack
    let indexableFromStack = true
    for (const group of groups) {
      if (group.disallow.some((rule: string) => path.startsWith(rule)) && !group.allow.some((rule: string) => path.startsWith(rule))) {
        indexableFromStack = false
        break
      }
    }
    useServerHead({
      meta: [
        {
          name: 'robots',
          content: () => {
            // SSR only
            const routeRules = nuxtApp?.ssrContext?.event?.context?._nitro?.routeRules
            if (typeof routeRules.robots === 'string')
              return routeRules.robots
            if (indexable === false || routeRules?.index === false)
              return robotsDisabledValue
            return indexableFromStack ? robotsEnabledValue : robotsDisabledValue
          },
        },
      ],
    })
  }
}
