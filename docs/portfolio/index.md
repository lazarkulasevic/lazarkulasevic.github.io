---
editLink: false
title: Portfolio
description: Lazar Kulasevic's Portfolio page
cards:
  - title: 📁 VOD Platform
    description: In-house cost-free solution for enhanced knowledge-sharing through serving video content.
    link: https://www.linkedin.com/in/lazarkulasevic

  - title: otisak.org
    description: A platform that offers citizens of Serbia the opportunity to check how safe and protected their personal data is, which they leave and trust to a state body or a privately owned company.
    link: https://otisak.org

<!-- @include: ../partials/_head-meta-defaults -->
---

<script setup>
import GridCards from '../.vitepress/components/GridCards.vue'
</script>

# [Brief Intro](/portfolio/#intro)

Howdy! I am a product-oriented Software Engineer who has worked on various different projects from enterprise-level sized to startups. Some of them included quite serious challenges, such as advanced data manipulation, establishing clean front-end architecture for new product and technical features, interactive data visualization, establishing cost-effective CI/CD pipelines, but also some fine-tuning work such as pixel-perfect development.

Also, I have a master’s degree in Chemistry, so I can share with you a thing or two about science too.

# [Projects](/portfolio/#projects)

Major projects that I am especially proud of are shown using these colorful cards. Hover over each one to read the short description and visit the external link if you take an interest in some of them. Some of them that are marked as confidential will have 📁 in front of their (made up) name.

<GridCards :height="180"></GridCards>

### 📁 VOD Platform

During my employment at Symphony, I came up with the solution. Soon after, a team was formed around the idea until we released the first version of the product that is currently in use. I took advantage of a fresh start to establish the processes of Trunk-based development and Kanban. Developed CI/CD pipelines and generously contributed to the project architecture and code quality — over 80% coverage.

### Otisak (Fingerprint)

In under 4 months of part-time dedication I've managed to singlehandedly build this platform using Vue.js and Firebase as a serverless solution. The platform consists of two major parts — website and dashboard. Website is open to the public, so feel free to check it out by clicking the link within the colorful card.

Dashboard, on the other hand, can be accessed only by registered users and admin. The logic spreads over several highly intuitive pages with a dark mode option and role based authorization:

- Companies related analytics
- Company management
- Comment management
- User management
- Settings that includes database synchronization scripts (cost-effective solution)

### Mini side-projects

I used to build lots of mini apps, some of them to address certain problems and other just for fun. You can find all of these on [my Github](https://github.com/lazarkulasevic).

# [Tech Stack](/portfolio/#tech-stack)

|          Tech          | Sub-tech (framework)                                                       |
| :--------------------: | -------------------------------------------------------------------------- |
| Javascript, Typescript | Next, React, Vue (v2, v3), VitePress                                       |
|       HTML, CSS        | SCSS, PostCSS and major CSS frameworks (Material, Element, Bootstrap)      |
|      Unit testing      | Vitest, Jest (React Testing Library, Vue Test Utils)                       |
|        Tooling         | Vite, Webpack, npm, pnpm, eslint, prettier, husky, hygen, standard-version |
|        Node.js         | Next, Express                                                              |
|       Databases        | Cloud Firestore (NoSQL), PostgreSQL                                        |
|       Serverless       | Firebase, Google Cloud Console                                             |
|    CI/CD (frontend)    | Github Actions, Jenkins, Docker, SonarQube                                 |

<br/>

# [Contact](/portfolio/#contact)

I encourage you to contact me directly on [LinkedIn](https://www.linkedin.com/in/lazarkulasevic) or via email.

::: details Click here to reveal the email
lazar.kulasevic@gmail.com

:::
