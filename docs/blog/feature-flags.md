---
type: article
title: 'Feature Flags with Vite: A Step-by-Step Guide'
image: /blog/feature-flags/featured.jpg
description: Are you looking to implement feature flags swiftly within your Vite-powered applications? Feature flags, also known as feature toggles, allow developers to toggle features on and off without changing code, enabling incremental feature releases and controlled feature rollouts. In this tutorial, we'll walk you through the process of setting up feature flags using Vite, the next-generation frontend tooling framework.
publishedOn: 11 March 2024 17:02
updatedOn: null
head:
  - - meta
    - property: og:title
      content: 'Feature Flags with Vite: A Step-by-Step Guide'
  - - meta
    - property: og:description
      content: Feature flags, also known as feature toggles, allow developers to toggle features on and off without changing code, enabling incremental feature releases and controlled feature rollouts.
  - - meta
    - property: keywords
      content: 'Feature Flags with Vite: A Step-by-Step Guide'
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:url
      content: https://lazarkulasevic.github.io/blog/feature-flags.html
  - - meta
    - property: og:image
      content: https://lazarkulasevic.github.io/blog/feature-flags/featured.jpg
  - - meta
    - name: twitter:title
      content: 'Feature Flags with Vite: A Step-by-Step Guide'
  - - meta
    - name: twitter:description
      content: Feature flags, also known as feature toggles, allow developers to toggle features on and off without changing code, enabling incremental feature releases and controlled feature rollouts.
  - - meta
    - property: og:url
      content: https://lazarkulasevic.github.io/blog/feature-flags.html
  - - meta
    - name: twitter:image
      content: https://lazarkulasevic.github.io/blog/feature-flags/featured.jpg
---

Are you looking to implement feature flags swiftly within your Vite-powered applications? Feature flags, also known as feature toggles, allow developers to toggle features on and off without changing code, enabling incremental feature releases and controlled feature rollouts. In this tutorial, we'll walk you through the process of setting up feature flags using Vite, the next-generation frontend tooling framework.

## Setting Up Your Environment

Before diving into the implementation details, let's ensure our environment is properly configured. We'll be using Vite along with React for this demonstration.

Firstly, ensure you have [Vite](https://vitejs.dev/) installed in your project:

```bash
npm install vite --save-dev
```

Next, let's define our feature flags in the `env.json` file:

```json
{
  "development": {
    "features": {
      "counter": {
        "enabled": true
      },
      "react_logo": {
        "enabled": true
      }
    }
  },
  "production": {
    "features": {
      "counter": {
        "enabled": false
      },
      "react_logo": {
        "enabled": true
      }
    }
  }
}
```

Here, we specify the status of each feature in different environments, such as development and production. Now, let's set up our `vite.config.ts` file and include `env.json` configuration there. As we're using TypeScript, we will extract type `Env` as union of strings representing each environment in the JSON config. For now that is `"development"` and `"production"`.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react-swc'
import envConfig from './env.json'

type Env = keyof typeof envConfig

export default defineConfig(({ mode }) => {
  return {
    plugins: [React()],
    define: {
      __FEATURES__: JSON.stringify(envConfig[mode as Env].features)
    }
  }
})
```

### Validating Features Across Environments

Before we continue to front-end stuff, we need to make sure that each of our environments has the same features. That means if we have configuration that looks like the one below, our build should break before it reaches an environment. Otherwise, we will have runtime errors aka bugs in production. :hand_over_mouth:

```json{10}
{
  "development": {
    "features": {
      "counter": {
        "enabled": true
      },
      "react_logo": {
        "enabled": true
      },
      "hi_mom": {
        "enabled": true
      }
    }
  },
  "production": {
    "features": {
      "counter": {
        "enabled": false
      },
      "react_logo": {
        "enabled": true
      }
    }
  }
}
```

To do that, we won't be including new 3rd party library. Instead, we will do it by ourselves with just a few extra lines of code in our `vite.config.ts`. First, we will extract list of features defined under `"production"` property and compare all other peer-level properties — environments — whether they have the same list as production. If not, we should log the error in the console and break the build process.

```ts{8-13,16-19}
// vite.config.ts
import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react-swc'
import envConfig from './env.json'

type Env = keyof typeof envConfig

const featuresListProd = Object.keys(envConfig.production.features)

const allEnvsMatchProdFeatures = Object.keys(envConfig).every((env) => {
  const currentFeaturesList = Object.keys(envConfig[env as Env].features)
  return JSON.stringify(currentFeaturesList) === JSON.stringify(featuresListProd)
})

export default defineConfig(({ mode }) => {
  if (!allEnvsMatchProdFeatures) {
    console.error('\x1b[31m', "Features don't match across all environments.")
    process.exit(1)
  }

  return {
    plugins: [React()],
    define: {
      __FEATURES__: JSON.stringify(envConfig[mode as Env].features)
    }
  }
})
```

We have now ensured that features are consistent across different environments. You may have noticed that we used the `define` property from Vite config. That allows us to declare global property `__FEATURES__` which compiles as `window.__FEATURES__` in production build.

## Implementing Feature Flags

We've laid the groundwork, and now it's time to implement feature flags in our application components. We'll create a custom hook `useFeature.hook.ts`.

```ts
// useFeature.hook.ts
const useFeature = (feature: string): boolean => {
  return __FEATURES__[feature]?.enabled === true
}

export default useFeature
```

This simple basically-one-liner hook allows us to query the status of a feature based on its definition in `env.json` and return flag that tells us if the feature is enabled.

Next, let's create, another yet, simple component `Feature.tsx` to conditionally render features based on their status.

```ts
// Feature.tsx
import useFeature from './useFeature.hook'

type FeatureProps = {
  flag: string
  children: React.ReactNode | React.ReactNode[]
}

const Feature = ({ flag, children }: FeatureProps) => {
  const isFeatureEnabled = useFeature(flag)
  return isFeatureEnabled ? <>{children}</> : null
}

export default Feature
```

Congratulations! You've successfully integrated feature flags into your Vite-powered application. :tada:

## Exploring Further Possibilities

With feature flags, you gain greater control over feature releases, enabling smoother deployments and user experiences.

In this tutorial, we've covered setting up environment configurations, defining feature flags, and implementing feature flag logic within components. Experiment with different features and environments to see how feature flags can enhance your development workflow.

Stay tuned for more insights and tutorials on modern frontend development techniques. Happy coding!

::: info Check out the code
Repo: https://github.com/lazarkulasevic/vite-feature-flags
:::
