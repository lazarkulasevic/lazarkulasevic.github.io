---
type: article
title: 'Feature Flags with GrowthBook: Real-Time Toggles'
image: /blog/growthbook-feature-flags/featured.jpg
description: Growthbook is a comprehensive experimentation platform that helps teams manage, track and analyze feature flags, A/B tests and other growth initiatives. It offers a user-friendly interface for creating experiments, defining variants, setting goals and monitoring results in real-time. Growthbook's integration with React further enhances the testing process by allowing developers to seamlessly implement experiments directly into their application.
publishedOn: 31 March 2024 22:26
updatedOn: null
tags:
  - Agile
  - CI/CD
head:
  - - meta
    - property: og:title
      content: 'Feature Flags with GrowthBook: Real-Time Toggles'
  - - meta
    - property: og:description
      content: Growthbook is a comprehensive experimentation platform that helps teams manage, track and analyze feature flags, A/B tests and other growth initiatives.
  - - meta
    - property: keywords
      content: feature flags, growthbook, agile development, feature toggles
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:url
      content: https://lazarkulasevic.github.io/blog/growthbook-feature-flags.html
  - - meta
    - property: og:image
      content: https://lazarkulasevic.github.io/blog/growthbook-feature-flags/featured.jpg
  - - meta
    - name: twitter:title
      content: 'Feature Flags with GrowthBook: Real-Time Toggles'
  - - meta
    - name: twitter:description
      content: Growthbook is a comprehensive experimentation platform that helps teams manage, track and analyze feature flags, A/B tests and other growth initiatives.
  - - meta
    - property: og:url
      content: https://lazarkulasevic.github.io/blog/growthbook-feature-flags.html
  - - meta
    - name: twitter:image
      content: https://lazarkulasevic.github.io/blog/growthbook-feature-flags/featured.jpg
---

Welcome to a tale of innovation and seamless user experiences in the digital realm. In the world of software development, there exists a powerful tool known as feature flags. These flags, akin to keys that unlock hidden treasures, enable developers and product managers to make changes to a product's features while keeping them hidden from the public eye until they are ready for unveiling.

## Short Story on Feature Flags

_In the heart of a bustling city, there stood a park unlike any other. This park was a symbol of innovation and creativity, with its beautiful monuments, lush green trees, serene fountains, and welcoming benches. Every day, people from all walks of life would come to the park to relax, admire the scenery, and enjoy the peaceful ambiance._

_One sunny morning, as the park gates opened, a group of curious visitors entered. They marveled at the grand monuments and took a seat on the comfortable benches to soak in the beauty around them. Little did they know that there were hidden wonders within the park, carefully concealed behind tall fences._

_Behind these fences were dedicated teams of developers and product managers, working tirelessly to enhance the park experience. They were crafting new monuments, refining existing features, and adding interactive elements to the fountains. This hidden work was made possible by a set of special keys known as_ "_feature flags._"

_Feature flags acted as the keys to different areas of the park. Some flags allowed access to specific monuments, while others granted permissions to modify the fountains' behavior. Only the developers and product managers held these keys, ensuring that the ongoing work remained hidden from the general public._

![Fountain in the park](/blog/growthbook-feature-flags/imagine-a-giant-park.jpg)

_As the day passed, the visitors continued to enjoy the park, unaware of the intricate developments taking place behind the scenes. Occasionally, a product manager would unlock a feature flag, granting access to a new monument or unveiling a captivating fountain display for a select few to see._

_Months went by, and the park evolved with each passing day. New features were unveiled gradually, enhancing the overall experience for everyone. The hidden work behind the fences seamlessly integrated with the public-facing areas, creating a harmonious balance between innovation and user experience._

_In the end, the park stood as a testament to the power of feature flags. Just like the hidden wonders within the park, feature flags allowed developers to work on new features without disrupting the park's daily operations. It was a delicate dance of innovation and accessibility, ensuring that every visitor could enjoy the park's beauty while the developers continued to enhance it behind the scenes._

_And so, the park became not just a place of beauty but also a living example of how feature flags could transform digital experiences, one key at a time._

## Comparing Build-Time and Real-Time Flags

In the previous post [Feature Flags with Vite: A Step-by-Step Guide](/blog/feature-flags), we covered the simplest way to include feature flags in your front-end project. These flags were resolved in build time, meaning that in order to toggle feature you would need not just to change config but also to build and deploy the whole thing again.

So, now we're going to try a different approach where the behavior of features can be changed remotely without having to publish an app update. GrowthBook, or any other similar-purpose platform, gives you the ability to do this — toggle features in real-time. Meaning, that if certain feature doesn't behave well in production environment, there's a kill switch that will solve your problem in seconds.

### Potential Issue With The Remote Approach: Service Downtime

What if your remote config server goes down? Well, considering all the benefits we're getting from this approach, that's a risk we are willing to take. When you're choosing a 3rd party service with a CDN, you may want to check the downtime of that service in the past period. For example, [GrowthBook](https://status2.growthbook.io/) shows 100% uptime for the past 90 days, which is pretty convincing from where I stand. we are safe to proceed!

## GrowthBook: Guide Through The Platform

Growthbook is a comprehensive experimentation platform that helps teams manage, track and analyze feature flags, A/B tests and other growth initiatives. It offers a user-friendly interface for creating experiments, defining variants, setting goals and monitoring results in real-time. Growthbook's integration with React further enhances the testing process by allowing developers to seamlessly implement experiments directly into their application.

GrowthBook docs have covered cross-platform installation and everything, but regardless of that, we will walk through a "quick start" so that you can bootstrap your React project right away.

1. First, create an account on [GrowthBook](https://app.growthbook.io/features).
2. Create and configure your [environments](https://app.growthbook.io/environments). Mine are "development" and "production".
3. Create and configure [SDK connection](https://app.growthbook.io/sdks) for each of your environments.
4. Add [features](https://app.growthbook.io/features) and configure their rules.

### Two Toggling Pathways for Simple Boolean Features

1. Use environment switch as a condition and set default value to `TRUE`.
2. Switch ON all environments, leave default value to `FALSE` and dictate override rules – **Force Rule** set to `SERVE: FALSE` or `SERVE: TRUE`.

In the example below we can see which features are enabled in which environments (quite similar as the section _Features_ on the platform). The default value for each feature in all environments is set to TRUE, so in this case, environment toggle is actually our feature toggle.

|   FEATURE    |  DEVELOPMENT   |   PRODUCTION   | DEFAULT VALUE | OVERRIDE RULES |
| :----------: | :------------: | :------------: | :-----------: | -------------- |
| `react_logo` | :green_circle: | :green_circle: |     TRUE      |                |
|  `counter`   | :green_circle: |  :red_circle:  |     TRUE      |                |

The second approach is a more clean one, as it requires you to _review and publish_ rules every time you make changes. This provides a change history, which is particularly useful when working in larger teams where all team members have access to the GrowthBook platform. Whenever someone makes changes, those can be reviewed and published (just like on Github).

|   FEATURE    |  DEVELOPMENT   |   PRODUCTION   | DEFAULT VALUE | OVERRIDE RULES |
| :----------: | :------------: | :------------: | :-----------: | -------------- |
| `react_logo` | :green_circle: | :green_circle: |     FALSE     | force +1 more  |
|  `counter`   | :green_circle: | :green_circle: |     FALSE     | force +1 more  |

One thing to bear in mind, when you publish new rules, it takes about 30-60 seconds for them to reach your application, so don't panic if you don't see your changes immediately. That is why I chose the first approach for this tutorial — the satisfaction of remotely toggling and seeing changes immediately is priceless. :star_struck:

### Let's Code

We will use the [example repo](https://github.com/lazarkulasevic/vite-feature-flags) from the previous blog post as a starter template. On top of that we need to install the package:

```bash
npm install --save @growthbook/growthbook-react
```

Now you can either use wrappers and hooks straight from the library, or as I prefer, create your own wrappers and use them in your code.

```tsx
// Feature.tsx
import { useFeature } from '@growthbook/growthbook-react'

const Feature = ({ flag, children }) => {
  const { on } = useFeature(flag)
  return on ? <>{children}</> : null
}
```

That way, when you need to apply something new to all features, you can simply extend this component without having to go through every implementation separately.

Moving on, in `App.tsx` we'll flag our features `react_logo` and `counter` like in the following example:

```tsx{13-15,19-22}
// App.tsx
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Counter from './Counter'
import Feature from './Feature'
import './App.css'

function App() {
  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <Feature flag="react_logo">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </Feature>
      </div>
      <h1>Feature Flags</h1>
      <div className="card">
        <Feature flag="counter">
          <h3>Counter is our feature</h3>
          <Counter />
        </Feature>
      </div>
    </>
  )
}
```

### Let's Test

If you go to the live app at [lazarkulasevic.github.io/growthbook-feature-flags](https://lazarkulasevic.github.io/growthbook-feature-flags/) you won't be able to see the counter. But if you start this project in localhost, you'll see both features, react logo and counter. The code is linked in the bottom of this article. Try it out and let me know what you think!

![image](https://github.com/lazarkulasevic/vite-feature-flags/assets/68285821/04934d6c-25b1-4517-915f-c283174cfae3)

## Next Level: Percentage Rollout, Experiments and A/B Testing

Percentage Rollout refers to the gradual release of a feature or change to a percentage of users. This approach allows teams to mitigate risks by exposing the new feature to a subset of users initially before rolling it out to a larger audience. Growthbook enables precise control over percentage rollouts, allowing teams to monitor performance and gather feedback before full deployment.

Experiments in Growthbook are structured tests that compare different variants of a feature or design element. Teams can create experiments to test hypotheses and measure the impact of changes on user behavior, conversions, or other key metrics. Growthbook provides a user-friendly interface for setting up experiments, defining variants, setting goals, and analyzing results in real-time.

Type of experiment called A/B testing involves comparing two versions of a webpage or feature to determine which one performs better. Growthbook streamlines the A/B testing process by offering tools for creating and managing tests, implementing variants seamlessly into applications, setting goals and monitoring results with detailed analytics. This data-driven approach empowers teams to make informed decisions and optimize their digital experiences based on user feedback and performance metrics.

::: info Check out the code
Repo: https://github.com/lazarkulasevic/growthbook-feature-flags
:::
