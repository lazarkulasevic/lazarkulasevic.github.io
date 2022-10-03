---
editLink: false
title: Portfolio
description: Lazar Kulasevic's Portfolio page
cards:
- title: otisak.org
  description: A platform that offers citizens of Serbia the opportunity to check how safe and protected their personal data is, which they leave and trust to a state body or a privately owned company.
  link: https://otisak.org

<!-- @include: ../partials/_head-meta-defaults -->
---
<script setup>
import GridCards from '../.vitepress/components/GridCards.vue'
</script>

# [Brief Intro](/portfolio/#intro)

Front-end oriented Software Developer with {{ Utils.getRoundedAge('01 Dec 2020') }} years of professional experience. So far I've worked on several different projects that included some serious challenges, such as advanced data remapping and manipulation on client-side, establishing clean front-end architecture for new technical features, interactive data visualization, building CI/CD pipelines, but also some fine-tuning work such as pixel-perfect development.

<br/>

# [Projects](/portfolio/#projects)

Major projects that I am especially proud of are shown using these colorful cards. Hover over each one to read the short description and visit the external link if you take an interest in some of them.

<GridCards :height="180"></GridCards>

### Otisak (Fingerprint)

In under 4 months of part-time dedication I've managed to singlehandedly build this platform using Vue.js and Firebase as a serverless solution. The platform consists of two major parts — website and dashboard. Website is open to the public, so feel free to check it out by clicking the link within the colorful card.

Dashboard, on the other hand, can be accessed only by registered users. The logic spreads over several highly intuitive pages with a dark mode option and role based authorization: 

- Companies related analytics
- Company management
- Comment management
- User management
- Settings that includes database synchronization scripts (cost-effective solution)

### Mini side-projects

Projects listed below are selected few, and they are a product of my learning curve. If you wanna see them all, check out my Github profile.

- [Vanilla Javascript Router](https://javascript-router.herokuapp.com/)
- [Memory Game](http://lazarkulasevic.github.io/memory-game/)
- [Binary Search](http://lazarkulasevic.github.io/binary-search/)
- [Json Form](https://lazarkulasevic.github.io/json-form)

<br/>

# [Tech Stack](/portfolio/#tech-stack)

Currently, it all revolves around Javascript.

|          Tech          | Sub-tech                                                                        |
|:----------------------:|---------------------------------------------------------------------------------|
|       HTML, CSS        | SCSS, PostCSS and major CSS frameworks (Material, Element, Bootstrap, Tailwind) |
| Javascript, Typescript | Vue.js, React.js                                                                |
|      Unit testing      | Jest (Vue Test Utils)                                                           |
|        Bundlers        | Vite, Webpack                                                                   |
|        JamStack        | VitePress                                                                       |
|        Node.js         | Express.js                                                                      |
|    NoSQL databases     | Cloud Firestore                                                                 |
|       Serverless       | Firebase services (i.e., Firestore, Storage, Auth, Cloud Functions)             |
|          Git           | GitLab, GitHub, BitBucket, SourceTree                                           |
|    CI/CD (frontend)    | Jenkins, Docker, Kubernetes, SonarQube                                          |

<br/>

# [Contact](/portfolio/#contact)

I encourage you to contact me directly on [LinkedIn](https://www.linkedin.com/in/lazarkulasevic/) or via email.

::: details Click here to reveal the email
lazar.kulasevic@gmail.com

:::
