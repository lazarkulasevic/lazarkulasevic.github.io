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

Now let's add a handler method `get` and see what will happen when we want to say hi again. Because handler methods are also called _traps_, we are going to have to _reflect_ the arguments in order for the target object to perform its original behavior.

```js {5-8}
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

## Creating an Interceptor using Proxy

In this case, we're going to create class, so we can easily inherit the functionality wherever we need to intercept any method call throughout the app. The Interceptor constructor accepts _options_ object with array of methods-to-watch and a `beforeMethodCall` function which is basically a code block with trapped data that executes before the original method code.

```js {18}
class Interceptor {
    /**
     * @param {Object} options
     * @param {String[]} options.watchMethods
     * @param {Function} [options.beforeMethodCall]
     * @return {Proxy}
     */
    constructor(options) {
        return Interceptor.#proxy(this, options)
    }

    static #proxy(obj, options) {
        return new Proxy(obj, {
            get(target, prop) {
                if (typeof target[prop] === 'function'&& options.watchMethods.includes(prop)) {
                    return new Proxy(target[prop], {
                        apply(target, thisArg, argumentsList) {
                            options.beforeMethodCall(prop, argumentsList)
                            return Reflect.apply(target, thisArg, argumentsList)
                        }
                    })
                } else {
                    return Reflect.get(target, prop)
                }
            }
        })
    }
}

export default Interceptor
```

As you probably noticed, a Proxy with a `get` method handler is wrapped around a Proxy with an `apply` method handler. Inside the apply method, you will notice highlighted `beforeMethodCall` function that is being executed right before returning reflecting all the arguments.

In this example, we are not mutating any arguments that `beforeMethodCall` receives, instead we're just going to pass them along.

### How to Use

The use is very simple - just extend the Interceptor class and inside the `super` pass an object with an array of method names you want to watch and a `beforeMethodCall` function.

```js {74-81}
import Interceptor from './Interceptor.js'

class Dom extends Interceptor {
    static options = {
        watchMethods: ['mount', 'registerConsole', 'registerButton', 'consoleLog'],
        beforeMethodCall(name, args) {
            if (['mount', 'registerConsole', 'registerButton'].includes(name)
                && !(document.querySelector(args[0]) instanceof HTMLElement)) {
                throw new TypeError(`Please pass the query selector of an HTML element to the ${name} method.`)
            }
            switch (name) {
                case 'mount':
                    console.log(`The app will mount on root "${args}".`)
                    break
                case 'registerConsole':
                    console.log(`The console will be registered on root "${args}".`)
                    break
                case 'registerButton':
                    console.log(`The button will be registered on root "${args[0]}".`)
                    break
                case 'consoleLog':
                    console.log(`New HTML output log at ${new Date().toLocaleString('en-GB')}:`, ...args)
                    break
            }
        }
    }

    /**
     * @param {Array} components
     */
    constructor({ components }) {
        super(Dom.options)
        this.components = components
        this.root = undefined
        this.consoleRoot = undefined
        this.buttons = {}
        return this
    }

    /**
     * @param {String} root
     */
    buttonElement(root) {
        return this.buttons[root]
    }

    /**
     * @param {String} root
     */
    mount(root) {
        this.root = document.querySelector(root)
        this.root.innerHTML = this.components.map(component => component.html).join('')
        console.log('The app is mounted.')
        return this
    }

    /**
     * @param {String} root
     */
    registerConsole(root) {
        this.consoleRoot = document.querySelector(root)
        console.log('The console is registered.')
        return this
    }

    /**
     * @param {String} data
     */
    consoleLog(data) {
        this.log(data)
        return this
    }

    /**
     * @description This method is not being watched
     * @param {String} data
     */
    log(data) {
        this.consoleRoot.innerHTML += `<p>${data}</p>`
        return this
    }

    /**
     * @param {String} root
     * @param {Function} handler
     */
    registerButton(root, handler) {
        this.buttons[root] = document.querySelector(root)
        this.buttons[root].addEventListener('click', handler)
        console.log('The button is registered.')
        return this
    }
}

export default Dom
```





## Demo and Code

Demo: https://lazarkulasevic.github.io/javascript-proxy

Code: https://github.com/lazarkulasevic/javascript-proxy
