<h1 align='center'>@nuxtjs/robots</h1>

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

<p align="center">
Tame the robots crawling and indexing your Nuxt site with ease.
</p>

<p align="center">
<table>
<tbody>
<td align="center">
<sub>Made possible by my <a href="https://github.com/sponsors/harlan-zw">Sponsor Program 💖</a><br> Follow me <a href="https://twitter.com/harlan_zw">@harlan_zw</a> 🐦 • Join <a href="https://discord.gg/275MBUBvgP">Discord</a> for help</sub><br>
</td>
</tbody>
</table>
</p>

## Introduction

Nuxt Robots is a module for configuring the robots crawling your site with minimal config and best practice defaults.

The core feature of the module is:
- Telling [crawlers](https://nuxtseo.com/learn/controlling-crawlers) which paths they can and cannot access using a [robots.txt](https://nuxtseo.com/learn/controlling-crawlers/robots-txt) file.
- Telling [search engine crawlers](https://developers.google.com/search/docs/crawling-indexing/googlebot) what they can show in search results from your site using a `<meta name="robots" content="index">` `X-Robots-Tag` HTTP header.

New to robots or SEO? Check out the [Conquering Web Crawlers](https://nuxtseo.com/learn/controlling-crawlers) guide to learn more about why you might
need these features.

## Features

- 🤖 Merge in your existing robots.txt or programmatically create a new one
- 🗿 Automatic `X-Robots-Tag` header and `<meta name="robots" ...>` meta tag
- 🔄 Integrates with route rules and runtime hooks
- 🔒 Disables non-production environments from being indexed
- Solves common issues and best practice default config

## Installation

> For `@nuxtjs/robots` v3.0 usage, please use the [v3.x](https://github.com/nuxt-modules/robots/tree/v3.x) tag.

Install `@nuxtjs/robots` dependency to your project:

```bash
npx nuxi@latest module add robots
```

# Documentation

[📖 Read the full documentation](https://nuxtseo.com/robots) for more information.

## Demos

- [Default - StackBlitz](https://stackblitz.com/edit/nuxt-starter-zycxux?file=public%2F_robots.txt)

## Sponsors

<p align="center">
  <a href="https://raw.githubusercontent.com/harlan-zw/static/main/sponsors.svg">
    <img src='https://raw.githubusercontent.com/harlan-zw/static/main/sponsors.svg'/>
  </a>
</p>

## License

Licensed under the [MIT license](https://github.com/nuxt-modules/robots/blob/main/LICENSE.md).

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/robots/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@nuxtjs/robots

[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxtjs/robots.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/robots

[license-src]: https://img.shields.io/github/license/nuxt-modules/robots.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://github.com/nuxt-modules/robots/blob/main/LICENSE.md

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
