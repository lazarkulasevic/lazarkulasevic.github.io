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

Metaprogramming is a very specific technique in software engineering in which a part of the software code treats other code as its data. Weird, right? This article is about to put a light on that concept using `Proxy` and `Reflect` in vanilla Javascript. 

If you haven't heard of JS proxy yet, here's a bit of explanation. You can treat proxy as a wrapper that contains the target object. You will use that wrapper throughout the code instead of the *target object* itself. Basically, the wrapper receives all the passed data and have the control of the object inside over the *handler object* methods.

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

Now let's add a handler method `get` and see what will happen when we want to say hi again. Because handler methods are also called *traps*, we are going to have to *reflect* the arguments in order for the target object to perform its original behavior.

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

This is a very basic explanation and I believe it will be sufficient for you to understand what we're about to create by the end of this article. However, if you're looking for something thorough, check out the [MDN Docs on Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

## Creating an Interceptor Using Javascript Proxy

In this case, we're going to create class, so we can easily inherit the functionality wherever we need to intercept any method call throughout the app. The Interceptor constructor accepts *options* object with array of methods-to-watch and a `beforeMethodCall` function which is basically a code block with trapped data that executes before the original method code.

I am using JSDoc to somewhat increase readability by pointing out types of the parameters.

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

As you probably noticed, a Proxy with a `get` method handler is wrapped around a Proxy with an `apply` method handler. Inside the apply method, you will notice highlighted `beforeMethodCall` function that is being executed right before reflecting all the arguments. 

In today's example, we are not mutating any arguments that `beforeMethodCall` receives, instead we're just going to use them as a data pass them along intact.

However, if you want to mutate arguments before passing them to the target object, you would need to return mutated arguments from the `beforeMethodCall` and then reflect them on the `argumentsList` position.

### How to Use Interceptor Base Class

The use is very simple - just extend the `Interceptor` class and inside the `super` pass the options object which will include an array of method names you want to watch and a `beforeMethodCall` with your functionality. I am using static property to keep objects within the class, but you are free to displace this object outside and pass it through the constructor. Whatever works for you (the beauty of Javascript).

As you may notice in the example below, our `Dom` class monitors 4 out of 6 of its methods. 

```js {5,21-23,77-84,86-92}
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
     * @param {String} root
     * @param {Function} handler
     */
    registerButton(root, handler) {
        this.buttons[root] = document.querySelector(root)
        this.buttons[root].addEventListener('click', handler)
        console.log('The button is registered.')
        return this
    }

    /**
     * This method is not being monitored
     * @param {String} data
     */
    log(data) {
        this.consoleRoot.innerHTML += `<p>${data}</p>`
        return this
    }

    /**
     * @param {String} data
     */
    consoleLog(data) {
        this.log(data)
        return this
    }
}

export default Dom
```

We are going to pay attention to `log` and `consoleLog` methods, because the former is not being monitored. Both of them are used in our event handlers:

- Regular Button: `log` - prints out the text on the screen.
- Super Spy Button: `consoleLog` - prints out the text in the console **and then** on the screen.

```js {16,21}
// main.js
import Dom from './core/Dom.js'
import AppButtons from './components/AppButtons.js'
import ConsoleOutput from './components/ConsoleOutput.js'

const app = new Dom({
    components: [AppButtons, ConsoleOutput]
}).mount('#app')

app.registerConsole('#output')
    .registerButton('.super-spy-btn', handleSpyBtn)
    .registerButton('.regular-btn', handleRegularBtn)

function handleSpyBtn() {
    const btnColor = handleBtn('.super-spy-btn', 'red')
    app.consoleLog(`The button is now ${btnColor}.`)
}

function handleRegularBtn() {
    const btnColor = handleBtn('.regular-btn', 'orange')
    app.log(`The button is now ${btnColor}.`)
}

function handleBtn(btnSelector, btnColor) {
    const btnClassList = app.buttonElement(btnSelector).classList
    btnClassList.toggle(btnColor)

    if (btnClassList.contains(btnColor)) {
        return `<span class="text-${btnColor}">${btnColor}</span>`
    }
    return '<span class="text-blue">blue</span>'
}
```

### Demo App Example

Each button is clicked three times. You will notice there are 6 click registered in the output and only 3 clicks in the console (with a timestamp) which come from the *Super Spy Button*.

![Screenshot](/public/blog/metaprogramming-in-javascript-creating-base-class-interceptor/spy-btn-screenshot.png)

Console output:
```text {9-11}
The app will mount on root "#app".
The app is mounted.
The console will be registered on root "#output".
The console is registered.
The button will be registered on root ".super-spy-btn".
The button is registered.
The button will be registered on root ".regular-btn".
The button is registered.
New HTML output log at 23/09/2022, 17:39:55: The button is now <span class="text-red">red</span>.
New HTML output log at 23/09/2022, 17:39:56: The button is now <span class="text-blue">blue</span>.
New HTML output log at 23/09/2022, 17:40:00: The button is now <span class="text-red">red</span>.
```

## Demo and Code

Check out the demo app and repo, feel free to play around. I hope you have learned something that will help you become a better Javascript developer, or perhaps found a code error I made along the way. Either way, let me know about your feedback.

Demo: https://lazarkulasevic.github.io/javascript-proxy

Code: https://github.com/lazarkulasevic/javascript-proxy

If you have any ideas of how this little Interceptor can be useful in a real-life application, please don't hesitate to type a comment.
