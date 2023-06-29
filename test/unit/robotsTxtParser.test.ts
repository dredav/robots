import fsp from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { parseRobotsTxt } from '../../src/robotsTxtParser'

describe('robotsTxtParser', () => {
  it('yoast', async () => {
    // read fixture yoastRobots.txt
    const robotsTxt = await fsp.readFile('./test/fixtures/yoastRobots.txt', { encoding: 'utf-8' })
    expect(parseRobotsTxt(robotsTxt)).toMatchInlineSnapshot(`
      {
        "groups": [
          {
            "allow": [],
            "comment": [],
            "disallow": [
              "/wp-json/",
              "/?s=*",
              "/search/*",
              "/cdn-cgi/bm/cv/",
              "/cdn-cgi/challenge-platform/",
            ],
            "userAgent": [
              "*",
            ],
          },
          {
            "allow": [],
            "comment": [],
            "disallow": [
              "/",
            ],
            "userAgent": [
              "Nuclei",
              "WikiDo",
              "Riddler",
              "PetalBot",
              "Zoominfobot",
              "Go-http-client",
              "Node/simplecrawler",
              "CazoodleBot",
              "dotbot/1.0",
              "Gigabot",
              "Barkrowler",
              "BLEXBot",
              "magpie-crawler",
            ],
          },
        ],
        "sitemaps": [
          "https://yoast.com/sitemap_index.xml",
        ],
      }
    `)
  })

  it('squareSpace', async () => {
    // read fixture yoastRobots.txt
    const robotsTxt = await fsp.readFile('./test/fixtures/squareSpace.txt', { encoding: 'utf-8' })
    expect(parseRobotsTxt(robotsTxt)).toMatchInlineSnapshot(`
      {
        "groups": [
          {
            "allow": [
              "/api/ui-extensions/",
            ],
            "comment": [],
            "disallow": [
              "/config",
              "/search",
              "/account$",
              "/account/",
              "/commerce/digital-download/",
              "/api/",
              "/static/",
              "/*?author=*",
              "/*&author=*",
              "/*?tag=*",
              "/*&tag=*",
              "/*?month=*",
              "/*&month=*",
              "/*?view=*",
              "/*&view=*",
              "/*?format=json",
              "/*&format=json",
              "/*?format=page-context",
              "/*&format=page-context",
              "/*?format=main-content",
              "/*&format=main-content",
              "/*?format=json-pretty",
              "/*&format=json-pretty",
              "/*?format=ical",
              "/*&format=ical",
              "/*?reversePaginate=*",
              "/*&reversePaginate=*",
            ],
            "userAgent": [
              "AdsBot-Google",
            ],
          },
          {
            "allow": [
              "/api/ui-extensions/",
            ],
            "comment": [],
            "disallow": [
              "/config",
              "/search",
              "/account$",
              "/account/",
              "/commerce/digital-download/",
              "/api/",
              "/static/",
              "/*?author=*",
              "/*&author=*",
              "/*?tag=*",
              "/*&tag=*",
              "/*?month=*",
              "/*&month=*",
              "/*?view=*",
              "/*&view=*",
              "/*?format=json",
              "/*&format=json",
              "/*?format=page-context",
              "/*&format=page-context",
              "/*?format=main-content",
              "/*&format=main-content",
              "/*?format=json-pretty",
              "/*&format=json-pretty",
              "/*?format=ical",
              "/*&format=ical",
              "/*?reversePaginate=*",
              "/*&reversePaginate=*",
            ],
            "userAgent": [
              "AdsBot-Google-Mobile",
            ],
          },
          {
            "allow": [
              "/api/ui-extensions/",
            ],
            "comment": [],
            "disallow": [
              "/config",
              "/search",
              "/account$",
              "/account/",
              "/commerce/digital-download/",
              "/api/",
              "/static/",
              "/*?author=*",
              "/*&author=*",
              "/*?tag=*",
              "/*&tag=*",
              "/*?month=*",
              "/*&month=*",
              "/*?view=*",
              "/*&view=*",
              "/*?format=json",
              "/*&format=json",
              "/*?format=page-context",
              "/*&format=page-context",
              "/*?format=main-content",
              "/*&format=main-content",
              "/*?format=json-pretty",
              "/*&format=json-pretty",
              "/*?format=ical",
              "/*&format=ical",
              "/*?reversePaginate=*",
              "/*&reversePaginate=*",
            ],
            "userAgent": [
              "AdsBot-Google-Mobile-Apps",
            ],
          },
          {
            "allow": [
              "/api/ui-extensions/",
            ],
            "comment": [],
            "disallow": [
              "/config",
              "/search",
              "/account$",
              "/account/",
              "/commerce/digital-download/",
              "/api/",
              "/static/",
              "/*?author=*",
              "/*&author=*",
              "/*?tag=*",
              "/*&tag=*",
              "/*?month=*",
              "/*&month=*",
              "/*?view=*",
              "/*&view=*",
              "/*?format=json",
              "/*&format=json",
              "/*?format=page-context",
              "/*&format=page-context",
              "/*?format=main-content",
              "/*&format=main-content",
              "/*?format=json-pretty",
              "/*&format=json-pretty",
              "/*?format=ical",
              "/*&format=ical",
              "/*?reversePaginate=*",
              "/*&reversePaginate=*",
            ],
            "userAgent": [
              "*",
            ],
          },
        ],
        "sitemaps": [
          "https: //www.example.com/sitemap.xml",
        ],
      }
    `)
  })
})
