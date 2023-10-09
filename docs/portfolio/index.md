---
editLink: false
title: Portfolio
description: Lazar Kulasevic's Portfolio page
cards:
  - title: 📁 VOD Platform
    description: In-house cost-free solution for enhanced knowledge-sharing through serving video content.

  - title: otisak.org
    description: A platform that offers citizens of Serbia the opportunity to check how safe and protected their personal data is, which they leave and trust to a state body or a privately owned company.
    link: https://otisak.org

<!-- @include: ../partials/_head-meta-defaults -->
---

<script setup>
import GridCards from '../.vitepress/components/GridCards.vue'
</script>

# [Brief Intro](/portfolio/#intro)

Worked on a variety of projects, ranging from enterprise-level applications to start-up ventures and I have consistently demonstrated my ability to tackle complex technical challenges. My expertise includes the creation of clean front-end architectures, interactive data visualization and the establishment of necessary CI/CD pipelines. Additionally, I excel at fine-tuning projects such as pixel-perfect development.

Experienced in splitting complex workloads into manageable, time-boxed tasks has allowed me to effectively organize and contribute to teams to achieve successful delivery. I take pride in my ability to inspire colleagues and initiate projects that drive innovation and progress.

Overall, my technical and personal skills make me a valuable asset to any team in need of a seasoned software engineer who can deliver results while fostering a collaborative and innovative work environment.

Feel free to reach out ツ

# [Projects](/portfolio/#projects)

Major projects that I am especially proud of are shown using these colorful cards. Hover over each one to read the short description and visit the external link if you take an interest in some of them. Some of them that are marked as confidential will have 📁 in front of their (made up) name.

<GridCards :height="180"></GridCards>

### 📁 VOD Platform

During my employment at Symphony, I came up with an idea to improve already-in-place knowledge-sharing practices. Soon after, a team was formed around the idea until we released the first version of the product that is currently in use. I took the advantage of a fresh start to establish the processes of Trunk-based development and Kanban. Developed CI/CD pipelines and generously contributed to the project architecture and code quality by unit testing vital app parts.

### Otisak (Fingerprint)

In under 4 months of part-time dedication I've managed to singlehandedly build this platform using Vue.js and Firebase as a serverless solution. The platform consists of two major parts — website and dashboard. Website is open to the public, so feel free to check it out by clicking the link within the colorful card.

Dashboard, on the other hand, can be accessed only by registered users and admin. The logic spreads over several highly intuitive pages with a dark mode option and role based authorization:

- Companies related analytics
- Companies management
- Comments management
- User management
- Settings that includes database synchronization scripts

### Mini side-projects

I used to build lots of mini apps, some of them to address certain problems and other just for fun. You can find all of these on [my Github](https://github.com/lazarkulasevic).

# [Tech Stack](/portfolio/#tech-stack)

|          Tech          | Sub-tech (framework)                                                  |
| :--------------------: | --------------------------------------------------------------------- |
| Javascript, Typescript | Next, React, Vue (v2, v3), VitePress                                  |
|       HTML, CSS        | SCSS, PostCSS and major CSS frameworks (Material, Element, Bootstrap) |
|      Unit testing      | Vitest, Jest                                                          |
|        Tooling         | Vite, Webpack, (p)npm, eslint, prettier, husky, hygen, versioning...  |
|        Node.js         | Next (SSR), Express                                                   |
|       Databases        | Cloud Firestore (NoSQL), PostgreSQL                                   |
|       Serverless       | Vercel, Firebase, Google Cloud Console                                |
|    CI/CD (frontend)    | Github Actions, Jenkins, Docker, SonarQube                            |

<br/>

# [Contact](/portfolio/#contact)

I encourage you to contact me directly on [LinkedIn](https://www.linkedin.com/in/lazarkulasevic) or via email.

::: details Click here to reveal the email
lazar.kulasevic@gmail.com

:::
