---
type: article
title: 'Introducing react-feature-flagz: A Lightweight Feature Flag Library for React'
image: /blog/react-feature-flagz/featured.png
description: After exploring build-time feature flags with Vite and real-time flags with GrowthBook, I've created react-feature-flagz - a lightweight npm package that simplifies feature flag management in React applications. This library offers a clean API, TypeScript support, and seamless integration without the complexity of external services.
publishedOn: 28 October 2025 17:22
updatedOn: null
tags:
  - React
  - Feature Flags
  - NPM Package
  - TypeScript
head:
  - - meta
    - property: og:title
      content: 'Introducing react-feature-flagz: A Lightweight Feature Flag Library for React'
  - - meta
    - property: og:description
      content: A lightweight npm package that simplifies feature flag management in React applications with a clean API, TypeScript support, and seamless integration.
  - - meta
    - property: keywords
      content: react feature flags, npm package, typescript, react hooks, feature toggles
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:url
      content: https://deployandpray.com/blog/react-feature-flagz-npm-package
  - - meta
    - property: og:image
      content: https://deployandpray.com/blog/react-feature-flagz/featured.png
  - - meta
    - name: twitter:title
      content: 'Introducing react-feature-flagz: A Lightweight Feature Flag Library for React'
  - - meta
    - name: twitter:description
      content: A lightweight npm package that simplifies feature flag management in React applications with a clean API, TypeScript support, and seamless integration.
  - - meta
    - property: og:url
      content: https://deployandpray.com/blog/react-feature-flagz-npm-package
  - - meta
    - name: twitter:image
      content: https://deployandpray.com/blog/react-feature-flagz/featured.png
---

After writing about [build-time feature flags with Vite](/blog/feature-flags) and [real-time flags with GrowthBook](/blog/growthbook-feature-flags), I realized there was a gap in the React ecosystem for a simple, lightweight frontend solution that could work alongside any custom API serving feature flags. That's why I created `react-feature-flagz` - an npm package that provides the frontend component of a feature flagging system without third-party dependencies, giving developers complete control over their flag management infrastructure.

## The Journey from Custom Solutions to a Reusable Package

In my previous posts, I showed you how to implement feature flags using Vite's build-time configuration and GrowthBook's real-time toggles. While both approaches have their merits, I found myself repeatedly writing similar wrapper components and hooks across different projects. This led me to create `react-feature-flagz` - a package that encapsulates the best practices I've learned while keeping the API simple and intuitive.

## What Makes react-feature-flagz Different?

Unlike complex feature flag platforms that require external services, `react-feature-flagz` focuses on simplicity and developer experience. Here's what sets it apart:

- **Zero Dependencies**: Built with pure React and TypeScript, no external dependencies
- **TypeScript First**: Full TypeScript support with proper type inference
- **Lightweight**: Minimal bundle size impact on your application
- **Flexible**: Works with any data source - JSON files, APIs, or environment variables
- **Developer Friendly**: Clean API that's easy to understand and implement

## Getting Started with react-feature-flagz

### Installation

```bash
npm install react-feature-flagz
```

### Basic Setup

First, wrap your application with the `FeatureFlagsProvider`:

```tsx
import { useState, useEffect } from 'react'
import { FeatureFlagsProvider } from 'react-feature-flagz'

function App() {
  const [flags, setFlags] = useState({})

  useEffect(() => {
    fetch('/api/feature-flags')
      .then((response) => response.json())
      .then((data) => setFlags(data))
  }, [])

  return (
    <FeatureFlagsProvider flags={flags}>
      <YourAppComponents />
    </FeatureFlagsProvider>
  )
}
```

### Using Feature Flags in Components

The package provides multiple ways to use feature flags:

#### 1. Using the Feature Component

```tsx
import { Feature } from 'react-feature-flagz'

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <Feature flag="new-dashboard">
        <NewDashboardComponent />
      </Feature>

      <Feature flag="beta-feature" fallback={<div>Beta feature not available</div>}>
        <BetaFeatureComponent />
      </Feature>
    </div>
  )
}
```

#### 2. Using the useFeatureFlag Hook

```tsx
import { useFeatureFlag } from 'react-feature-flagz'

function ExperimentalComponent() {
  const isExperimentalEnabled = useFeatureFlag('experimental-api')

  if (!isExperimentalEnabled) {
    return <div>This feature is not available yet.</div>
  }

  return (
    <div>
      <h2>Experimental Feature</h2>
      <p>This is only visible when the flag is enabled!</p>
    </div>
  )
}
```

#### 3. Using useFeatureValue for Non-Boolean Values

```tsx
import { useFeatureValue } from 'react-feature-flagz'

function ThemeComponent() {
  const theme = useFeatureValue<string>('theme', 'light')
  const maxItems = useFeatureValue<number>('max-items', 10)

  return (
    <div className={`theme-${theme}`}>
      <p>Current theme: {theme}</p>
      <p>Max items: {maxItems}</p>
    </div>
  )
}
```

#### 4. Using useMultipleFeatureFlags

```tsx
import { useMultipleFeatureFlags } from 'react-feature-flagz'

function MultiFeatureComponent() {
  const flags = useMultipleFeatureFlags(['feature-1', 'feature-2'], false)

  return (
    <div>
      {flags['feature-1'] && <div>Feature 1 is enabled!</div>}
      {flags['feature-2'] && <div>Feature 2 is enabled!</div>}
    </div>
  )
}
```

## Comparison with Other Approaches

Let's compare `react-feature-flagz` with the approaches I've covered in previous posts:

| Approach                | Complexity | Real-time Updates | Bundle Size | External Dependencies |
| ----------------------- | ---------- | ----------------- | ----------- | --------------------- |
| **Vite Build-time**     | Low        | ❌                | Minimal     | None                  |
| **GrowthBook**          | High       | ✅                | Medium      | External service      |
| **react-feature-flagz** | Low-Medium | ✅\*              | Minimal     | None                  |

\*Real-time updates possible with dynamic loading

### When to Use Each Approach

- **Vite Build-time**: Perfect for simple projects where flags rarely change
- **GrowthBook**: Ideal for large teams needing complex experimentation and analytics
- **react-feature-flagz**: Best for projects that need flexibility without external service complexity

## TypeScript Support

The package is built with TypeScript and provides excellent type safety:

```tsx
import { useFeatureFlag, useFeatureValue } from 'react-feature-flagz'

const Component = () => {
  // TypeScript will infer the return type as boolean
  const isEnabled = useFeatureFlag('new-dashboard', false) // boolean

  // For non-boolean values with type safety
  const theme = useFeatureValue<string>('theme', 'light') // string
  const maxItems = useFeatureValue<number>('max-items', 10) // number

  ...
}
```

## Testing Feature Flags

Testing components with feature flags is straightforward:

```tsx
import { render, screen } from '@testing-library/react'
import { FeatureFlagsProvider } from 'react-feature-flagz'
import { MyComponent } from './MyComponent'

test('renders component when feature flag is enabled', () => {
  const flags = { 'new-feature': true }

  render(
    <FeatureFlagsProvider flags={flags}>
      <MyComponent />
    </FeatureFlagsProvider>
  )

  expect(screen.getByText('New Feature Content')).toBeInTheDocument()
})

test('does not render component when feature flag is disabled', () => {
  const flags = { 'new-feature': false }

  render(
    <FeatureFlagsProvider flags={flags}>
      <MyComponent />
    </FeatureFlagsProvider>
  )

  expect(screen.queryByText('New Feature Content')).not.toBeInTheDocument()
})
```

## Performance Considerations

`react-feature-flagz` is designed with performance in mind:

- **Minimal Re-renders**: Uses React's Context API efficiently
- **Small Bundle Size**: No external dependencies
- **Tree Shaking**: Only imports what you use

## Conclusion

`react-feature-flagz` fills a gap in the React ecosystem by providing a simple, lightweight solution for feature flag management. Whether you're migrating from custom implementations or looking for an alternative to complex external services, this package offers the perfect balance of simplicity and flexibility.

The library embodies the principles I've learned from implementing feature flags across different projects - keep it simple, make it type-safe, and focus on developer experience. It's the solution I wish I had when I started working with feature flags in React applications.

Try it out in your next project and let me know what you think! The package is open source, and I welcome contributions and feedback from the community.

::: info Check out the package
NPM: https://www.npmjs.com/package/react-feature-flagz

GitHub: https://github.com/lazarkulasevic/react-feature-flagz
:::

::: tip Pro Tip
Start with `react-feature-flagz` for simple feature flag needs, and consider migrating to more complex solutions like GrowthBook as your requirements grow. The API is designed to make this transition smooth.
:::
