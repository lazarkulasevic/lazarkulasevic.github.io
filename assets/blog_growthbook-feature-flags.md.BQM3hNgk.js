import{_ as t,c as a,a1 as s,o as i}from"./chunks/framework.C9fvGCe2.js";const n="/blog/growthbook-feature-flags/imagine-a-giant-park.jpg",c=JSON.parse(`{"title":"Feature Flags with GrowthBook: Real-Time Toggles","description":"Growthbook is a comprehensive experimentation platform that helps teams manage, track and analyze feature flags, A/B tests and other growth initiatives. It offers a user-friendly interface for creating experiments, defining variants, setting goals and monitoring results in real-time. Growthbook's integration with React further enhances the testing process by allowing developers to seamlessly implement experiments directly into their application.","frontmatter":{"type":"article","title":"Feature Flags with GrowthBook: Real-Time Toggles","image":"/blog/growthbook-feature-flags/featured.jpg","description":"Growthbook is a comprehensive experimentation platform that helps teams manage, track and analyze feature flags, A/B tests and other growth initiatives. It offers a user-friendly interface for creating experiments, defining variants, setting goals and monitoring results in real-time. Growthbook's integration with React further enhances the testing process by allowing developers to seamlessly implement experiments directly into their application.","publishedOn":"31 March 2024 22:26","updatedOn":null,"tags":["Agile","CI/CD"],"head":[["meta",{"property":"og:title","content":"Feature Flags with GrowthBook: Real-Time Toggles"}],["meta",{"property":"og:description","content":"Growthbook is a comprehensive experimentation platform that helps teams manage, track and analyze feature flags, A/B tests and other growth initiatives."}],["meta",{"property":"keywords","content":"feature flags, growthbook, agile development, feature toggles"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:url","content":"https://lazarkulasevic.github.io/blog/growthbook-feature-flags.html"}],["meta",{"property":"og:image","content":"https://lazarkulasevic.github.io/blog/growthbook-feature-flags/featured.jpg"}],["meta",{"name":"twitter:title","content":"Feature Flags with GrowthBook: Real-Time Toggles"}],["meta",{"name":"twitter:description","content":"Growthbook is a comprehensive experimentation platform that helps teams manage, track and analyze feature flags, A/B tests and other growth initiatives."}],["meta",{"property":"og:url","content":"https://lazarkulasevic.github.io/blog/growthbook-feature-flags.html"}],["meta",{"name":"twitter:image","content":"https://lazarkulasevic.github.io/blog/growthbook-feature-flags/featured.jpg"}]]},"headers":[],"relativePath":"blog/growthbook-feature-flags.md","filePath":"blog/growthbook-feature-flags.md"}`),r={name:"blog/growthbook-feature-flags.md"};function l(o,e,h,p,g,k){return i(),a("div",null,e[0]||(e[0]=[s('<p>Welcome to a tale of innovation and seamless user experiences in the digital realm. In the world of software development, there exists a powerful tool known as feature flags. These flags, akin to keys that unlock hidden treasures, enable developers and product managers to make changes to a product&#39;s features while keeping them hidden from the public eye until they are ready for unveiling.</p><h2 id="short-story-on-feature-flags" tabindex="-1">Short Story on Feature Flags <a class="header-anchor" href="#short-story-on-feature-flags" aria-label="Permalink to &quot;Short Story on Feature Flags&quot;">​</a></h2><p><em>In the heart of a bustling city, there stood a park unlike any other. This park was a symbol of innovation and creativity, with its beautiful monuments, lush green trees, serene fountains, and welcoming benches. Every day, people from all walks of life would come to the park to relax, admire the scenery, and enjoy the peaceful ambiance.</em></p><p><em>One sunny morning, as the park gates opened, a group of curious visitors entered. They marveled at the grand monuments and took a seat on the comfortable benches to soak in the beauty around them. Little did they know that there were hidden wonders within the park, carefully concealed behind tall fences.</em></p><p><em>Behind these fences were dedicated teams of developers and product managers, working tirelessly to enhance the park experience. They were crafting new monuments, refining existing features, and adding interactive elements to the fountains. This hidden work was made possible by a set of special keys known as</em> &quot;<em>feature flags.</em>&quot;</p><p><em>Feature flags acted as the keys to different areas of the park. Some flags allowed access to specific monuments, while others granted permissions to modify the fountains&#39; behavior. Only the developers and product managers held these keys, ensuring that the ongoing work remained hidden from the general public.</em></p><p><img src="'+n+`" alt="Fountain in the park"></p><p><em>As the day passed, the visitors continued to enjoy the park, unaware of the intricate developments taking place behind the scenes. Occasionally, a product manager would unlock a feature flag, granting access to a new monument or unveiling a captivating fountain display for a select few to see.</em></p><p><em>Months went by, and the park evolved with each passing day. New features were unveiled gradually, enhancing the overall experience for everyone. The hidden work behind the fences seamlessly integrated with the public-facing areas, creating a harmonious balance between innovation and user experience.</em></p><p><em>In the end, the park stood as a testament to the power of feature flags. Just like the hidden wonders within the park, feature flags allowed developers to work on new features without disrupting the park&#39;s daily operations. It was a delicate dance of innovation and accessibility, ensuring that every visitor could enjoy the park&#39;s beauty while the developers continued to enhance it behind the scenes.</em></p><p><em>And so, the park became not just a place of beauty but also a living example of how feature flags could transform digital experiences, one key at a time.</em></p><h2 id="comparing-build-time-and-real-time-flags" tabindex="-1">Comparing Build-Time and Real-Time Flags <a class="header-anchor" href="#comparing-build-time-and-real-time-flags" aria-label="Permalink to &quot;Comparing Build-Time and Real-Time Flags&quot;">​</a></h2><p>In the previous post <a href="/blog/feature-flags">Feature Flags with Vite: A Step-by-Step Guide</a>, we covered the simplest way to include feature flags in your front-end project. These flags were resolved in build time, meaning that in order to toggle feature you would need not just to change config but also to build and deploy the whole thing again.</p><p>So, now we&#39;re going to try a different approach where the behavior of features can be changed remotely without having to publish an app update. GrowthBook, or any other similar-purpose platform, gives you the ability to do this — toggle features in real-time. Meaning, that if certain feature doesn&#39;t behave well in production environment, there&#39;s a kill switch that will solve your problem in seconds.</p><h3 id="potential-issue-with-the-remote-approach-service-downtime" tabindex="-1">Potential Issue With The Remote Approach: Service Downtime <a class="header-anchor" href="#potential-issue-with-the-remote-approach-service-downtime" aria-label="Permalink to &quot;Potential Issue With The Remote Approach: Service Downtime&quot;">​</a></h3><p>What if your remote config server goes down? Well, considering all the benefits we&#39;re getting from this approach, that&#39;s a risk we are willing to take. When you&#39;re choosing a 3rd party service with a CDN, you may want to check the downtime of that service in the past period. For example, <a href="https://status2.growthbook.io/" target="_blank" rel="noreferrer">GrowthBook</a> shows 100% uptime for the past 90 days, which is pretty convincing from where I stand. we are safe to proceed!</p><h2 id="growthbook-guide-through-the-platform" tabindex="-1">GrowthBook: Guide Through The Platform <a class="header-anchor" href="#growthbook-guide-through-the-platform" aria-label="Permalink to &quot;GrowthBook: Guide Through The Platform&quot;">​</a></h2><p>Growthbook is a comprehensive experimentation platform that helps teams manage, track and analyze feature flags, A/B tests and other growth initiatives. It offers a user-friendly interface for creating experiments, defining variants, setting goals and monitoring results in real-time. Growthbook&#39;s integration with React further enhances the testing process by allowing developers to seamlessly implement experiments directly into their application.</p><p>GrowthBook docs have covered cross-platform installation and everything, but regardless of that, we will walk through a &quot;quick start&quot; so that you can bootstrap your React project right away.</p><ol><li>First, create an account on <a href="https://app.growthbook.io/features" target="_blank" rel="noreferrer">GrowthBook</a>.</li><li>Create and configure your <a href="https://app.growthbook.io/environments" target="_blank" rel="noreferrer">environments</a>. Mine are &quot;development&quot; and &quot;production&quot;.</li><li>Create and configure <a href="https://app.growthbook.io/sdks" target="_blank" rel="noreferrer">SDK connection</a> for each of your environments.</li><li>Add <a href="https://app.growthbook.io/features" target="_blank" rel="noreferrer">features</a> and configure their rules.</li></ol><h3 id="two-toggling-pathways-for-simple-boolean-features" tabindex="-1">Two Toggling Pathways for Simple Boolean Features <a class="header-anchor" href="#two-toggling-pathways-for-simple-boolean-features" aria-label="Permalink to &quot;Two Toggling Pathways for Simple Boolean Features&quot;">​</a></h3><ol><li>Use environment switch as a condition and set default value to <code>TRUE</code>.</li><li>Switch ON all environments, leave default value to <code>FALSE</code> and dictate override rules – <strong>Force Rule</strong> set to <code>SERVE: FALSE</code> or <code>SERVE: TRUE</code>.</li></ol><p>In the example below we can see which features are enabled in which environments (quite similar as the section <em>Features</em> on the platform). The default value for each feature in all environments is set to TRUE, so in this case, environment toggle is actually our feature toggle.</p><table tabindex="0"><thead><tr><th style="text-align:center;">FEATURE</th><th style="text-align:center;">DEVELOPMENT</th><th style="text-align:center;">PRODUCTION</th><th style="text-align:center;">DEFAULT VALUE</th><th>OVERRIDE RULES</th></tr></thead><tbody><tr><td style="text-align:center;"><code>react_logo</code></td><td style="text-align:center;">🟢</td><td style="text-align:center;">🟢</td><td style="text-align:center;">TRUE</td><td></td></tr><tr><td style="text-align:center;"><code>counter</code></td><td style="text-align:center;">🟢</td><td style="text-align:center;">🔴</td><td style="text-align:center;">TRUE</td><td></td></tr></tbody></table><p>The second approach is a more clean one, as it requires you to <em>review and publish</em> rules every time you make changes. This provides a change history, which is particularly useful when working in larger teams where all team members have access to the GrowthBook platform. Whenever someone makes changes, those can be reviewed and published (just like on Github).</p><table tabindex="0"><thead><tr><th style="text-align:center;">FEATURE</th><th style="text-align:center;">DEVELOPMENT</th><th style="text-align:center;">PRODUCTION</th><th style="text-align:center;">DEFAULT VALUE</th><th>OVERRIDE RULES</th></tr></thead><tbody><tr><td style="text-align:center;"><code>react_logo</code></td><td style="text-align:center;">🟢</td><td style="text-align:center;">🟢</td><td style="text-align:center;">FALSE</td><td>force +1 more</td></tr><tr><td style="text-align:center;"><code>counter</code></td><td style="text-align:center;">🟢</td><td style="text-align:center;">🟢</td><td style="text-align:center;">FALSE</td><td>force +1 more</td></tr></tbody></table><p>One thing to bear in mind, when you publish new rules, it takes about 30-60 seconds for them to reach your application, so don&#39;t panic if you don&#39;t see your changes immediately. That is why I chose the first approach for this tutorial — the satisfaction of remotely toggling and seeing changes immediately is priceless. 🤩</p><h3 id="let-s-code" tabindex="-1">Let&#39;s Code <a class="header-anchor" href="#let-s-code" aria-label="Permalink to &quot;Let&#39;s Code&quot;">​</a></h3><p>We will use the <a href="https://github.com/lazarkulasevic/vite-feature-flags" target="_blank" rel="noreferrer">example repo</a> from the previous blog post as a starter template. On top of that we need to install the package:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --save</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @growthbook/growthbook-react</span></span></code></pre></div><p>Now you can either use wrappers and hooks straight from the library, or as I prefer, create your own wrappers and use them in your code.</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Feature.tsx</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { useFeature } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@growthbook/growthbook-react&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Feature</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ({ </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">flag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">children</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useFeature</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(flag)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> on </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &lt;&gt;{children}&lt;/&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>That way, when you need to apply something new to all features, you can simply extend this component without having to go through every implementation separately.</p><p>Moving on, in <code>App.tsx</code> we&#39;ll flag our features <code>react_logo</code> and <code>counter</code> like in the following example:</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// App.tsx</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> reactLogo </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./assets/react.svg&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> viteLogo </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;/vite.svg&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Counter </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./Counter&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Feature </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./Feature&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./App.css&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> App</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">img</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{viteLogo} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">className</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;logo&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> alt</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Vite logo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Feature</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> flag</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;react_logo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">img</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{reactLogo} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">className</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;logo react&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> alt</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;React logo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Feature</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Feature Flags&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> className</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;card&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Feature</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> flag</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;counter&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Counter is our feature&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Counter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Feature</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="let-s-test" tabindex="-1">Let&#39;s Test <a class="header-anchor" href="#let-s-test" aria-label="Permalink to &quot;Let&#39;s Test&quot;">​</a></h3><p>If you go to the live app at <a href="https://lazarkulasevic.github.io/growthbook-feature-flags/" target="_blank" rel="noreferrer">lazarkulasevic.github.io/growthbook-feature-flags</a> you won&#39;t be able to see the counter. But if you start this project in localhost, you&#39;ll see both features, react logo and counter. The code is linked in the bottom of this article. Try it out and let me know what you think!</p><p><img src="https://github.com/lazarkulasevic/vite-feature-flags/assets/68285821/04934d6c-25b1-4517-915f-c283174cfae3" alt="image"></p><h2 id="next-level-percentage-rollout-experiments-and-a-b-testing" tabindex="-1">Next Level: Percentage Rollout, Experiments and A/B Testing <a class="header-anchor" href="#next-level-percentage-rollout-experiments-and-a-b-testing" aria-label="Permalink to &quot;Next Level: Percentage Rollout, Experiments and A/B Testing&quot;">​</a></h2><p>Percentage Rollout refers to the gradual release of a feature or change to a percentage of users. This approach allows teams to mitigate risks by exposing the new feature to a subset of users initially before rolling it out to a larger audience. Growthbook enables precise control over percentage rollouts, allowing teams to monitor performance and gather feedback before full deployment.</p><p>Experiments in Growthbook are structured tests that compare different variants of a feature or design element. Teams can create experiments to test hypotheses and measure the impact of changes on user behavior, conversions, or other key metrics. Growthbook provides a user-friendly interface for setting up experiments, defining variants, setting goals, and analyzing results in real-time.</p><p>Type of experiment called A/B testing involves comparing two versions of a webpage or feature to determine which one performs better. Growthbook streamlines the A/B testing process by offering tools for creating and managing tests, implementing variants seamlessly into applications, setting goals and monitoring results with detailed analytics. This data-driven approach empowers teams to make informed decisions and optimize their digital experiences based on user feedback and performance metrics.</p><div class="info custom-block"><p class="custom-block-title">Check out the code</p><p>Repo: <a href="https://github.com/lazarkulasevic/growthbook-feature-flags" target="_blank" rel="noreferrer">https://github.com/lazarkulasevic/growthbook-feature-flags</a></p></div>`,43)]))}const u=t(r,[["render",l]]);export{c as __pageData,u as default};
