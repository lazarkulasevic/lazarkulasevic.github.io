---
type: article
title: 'Metaprogramming in JavaScript: Creating a Base Class Interceptor'
image: /blog/metaprogramming-in-javascript-creating-base-class-interceptor/featured.png
description: Metaprogramming in JavaScript using Web APIs such as Proxy and Reflect.
publishedOn: 9 September 2022 10:00

head:
  - - meta
    - property: og:title
      content: 'Metaprogramming in JavaScript: Creating a Base Class Interceptor'
  - - meta
    - property: og:description
      content: Metaprogramming in JavaScript using Web APIs such as Proxy and Reflect.
  - - meta
    - property: keywords
      content: interceptor, proxy, reflect, metaprogramming in javascript
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:url
      content: https://lazarkulasevic.github.io/blog/metaprogramming-in-javascript-creating-base-class-interceptor.html
  - - meta
    - property: og:image
      content: /blog/metaprogramming-in-javascript-creating-base-class-interceptor/featured.png
  - - meta
    - name: twitter:title
      content: 'Metaprogramming in JavaScript: Creating a Base Class Interceptor'
  - - meta
    - name: twitter:description
      content: Metaprogramming in JavaScript using Web APIs such as Proxy and Reflect.
  - - meta
    - property: og:url
      content: https://lazarkulasevic.github.io/blog/metaprogramming-in-javascript-creating-base-class-interceptor.html
  - - meta
    - name: twitter:image
      content: /blog/metaprogramming-in-javascript-creating-base-class-interceptor/featured.png
---

Metaprogramming is a very specific technique in software engineering in which a part of the software code treats other code as its data. Weird, right? This article is about to put a light on that concept using Proxy and Reflect in vanilla Javascript. 

If you haven't heard about JS proxy yet, you can treat it as a target object wrapper that you'll use throughout the code instead of the _target object_ itself. Basically, the wrapper receives all the passed data and have the control of the object inside over the _handler object_. 

```js
const target = {
    sayHi: () => console.log('Hello World!')
}
const handler = {}
const wrapper = new Proxy(target, handler)

wrapper.sayHi()
```

Console output:
```text
Hello World!
```

Now let's add a handler method `get` and see what will happen when we want to say hi again. Because handler methods are also called _traps_ we are going to have to `Reflect` the arguments in order to reach the target object. 

```js{5-8}
const target = {
    sayHi: () => console.log('Hello World!')
}
const handler = {
    get(target, prop) {
        console.log(`You want to call "${prop}" method on the target object.`)
        return Reflect.get(target, prop)
    }
}
const wrapper = new Proxy(target, handler)

wrapper.sayHi()
```

Console output:
```text
You want to call "sayHi" method on the target object.
Hello World!
```
















