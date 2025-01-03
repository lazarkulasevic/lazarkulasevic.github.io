import{_ as g,u as b,o as a,c as o,F as h,C as u,k as y,j as t,t as i,e as w,b as k,a as s,G as m,a1 as P}from"./chunks/framework.C9fvGCe2.js";import{T as D}from"./chunks/theme.DOoZzl1A.js";const S={class:"timeline"},_={class:"text-container"},x={class:"title"},C={class:"company"},I={class:"date"},z={key:0},G={key:1},N={key:2},T={class:"summary"},j={__name:"Timeline",setup(c){const{frontmatter:l}=b(),e=r=>new Date(r)&&!isNaN(new Date(r)),p=r=>new Intl.DateTimeFormat("en-GB",{month:"short",year:"numeric"}).format(r);return(r,d)=>(a(),o("ul",S,[(a(!0),o(h,null,u(y(l).worklog,n=>(a(),o("li",{key:n.date},[d[0]||(d[0]=t("div",{class:"circle-container"},[t("div",{class:"circle"})],-1)),t("div",_,[t("h3",x,i(n.title),1),t("h4",C,i(n.company),1),t("div",I,[e(n.date.start)?(a(),o("span",z,i(p(new Date(n.date.start))),1)):w("",!0),e(n.date.end)?(a(),o("span",G," – "+i(p(new Date(n.date.end)))+" ("+i(r.Utils.getRoundedAge(n.date.start,n.date.end))+")",1)):(a(),o("span",N," – Present ("+i(r.Utils.getRoundedAge(n.date.start,new Date))+")",1))]),t("div",T,[(a(!0),o(h,null,u(n.summary,v=>(a(),o("p",null,i(v),1))),256))])])]))),128))]))}},A=g(j,[["__scopeId","data-v-39ac6f70"]]),L={class:"group"},V={__name:"TagGroup",props:{frontmatterKey:{type:String}},setup(c){const l=c,{frontmatter:e}=b();return(p,r)=>(a(),o("div",L,[(a(!0),o(h,null,u(y(e)[l.frontmatterKey].split(",").filter(Boolean),d=>(a(),k(D,{text:d.trim(),enableHover:!1},null,8,["text"]))),256))]))}},f=g(V,[["__scopeId","data-v-3c284e5d"]]),F=JSON.parse('{"title":"Portfolio","description":"","frontmatter":{"editLink":false,"title":"Portfolio","aside":false,"outline":false,"worklog":[{"title":"Software Engineer","company":"Symphony.is","date":{"start":"01 Dec 2022","end":"Present"},"summary":["CRM Tool for HR – Organizing workload, polishing looks and feels before the rollout.","Microfrontends, npm packages – Developing new features and libraries for an enterprise, while taking care of numerous metrics under scrum principles.","Analytics Dashboard – Developed front-end in Next.js (SSR) for a dashboard with lots of charts, graphs and filters; interaction-heavy features such as calendar widget with date-range selection, dynamic navigation menu.","Booking Platform (MVP) – Full-stack generic solution that connects providers with consumers based on their level of competence.","Learning Platform – Company initiated project based on my idea of an in-house cost-free VOD platform for enhanced knowledge-sharing through serving video content and presentations using Google Cloud Platform services as a backend. I took advantage of a fresh start to establish the processes of trunk-based development and kanban. Developed CI/CD pipelines and generously contributed to the project architecture and test coverage."]},{"title":"Frontend Developer","company":"Badin Soft","date":{"start":"07 Dec 2020","end":"30 Nov 2022"},"summary":["Company-wide analytics platform – Played an important role in developing a live user interaction monitoring platform, where I worked on both the feature development and CI/CD pipeline using Jenkins with Slack notifications. Actively participated in agile meetings, defined user stories and effectively prioritized tasks to ensure efficient delivery.","Video Management System – Primarily focused on ongoing feature development, improvements and bug fixes while consistently proposing new technical and product features and offering effective design solutions for new requirements. Other responsibilities included the guarantee of code quality by following the already established CI/CD process.","News Media Portals – Implementation of pixel-perfect design to four lookalike media portals."]}],"technologies":"Typescript, Javascript, Next, React, Vue, CSS, SCSS, PostCSS, HTML, Vite, Webpack, npm, pnpm, Node, Express, Vitest, Jest, Cypress, VitePress, Zod, Redux, Jotai, Github Actions, Jenkins, Docker, PostgreSQL, Cloud Firestore","concepts":"Microfrontends, SSR, Vercel, Firebase, Google Cloud Platform, Google API, SonarQube, Azure Application Insights, GitFlow, Trunk-based Development, CI/CD, Feature Flags, Kanban, Scrum","head":[["meta",{"property":"og:title","content":"Lazar Kulasevic | Portfolio"}],["meta",{"property":"og:description","content":"Lazar Kulasevic is a Software Engineer specializing in front-end technologies. Check out his portfolio and blog."}],["meta",{"property":"keywords","content":"Lazar Kulasevic, Software Engineer, Front-end Developer"}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:url","content":"https://lazarkulasevic.github.io"}],["meta",{"property":"og:image","content":"https://lazarkulasevic.github.io/featured.webp"}],["meta",{"name":"twitter:title","content":"Lazar Kulasevic | Portfolio"}],["meta",{"name":"twitter:description","content":"Lazar Kulasevic is a Software Engineer specializing in front-end technologies. Check out his portfolio and blog."}],["meta",{"name":"twitter:image","content":"https://lazarkulasevic.github.io/featured.webp"}]]},"headers":[],"relativePath":"portfolio/index.md","filePath":"portfolio/index.md"}'),q={name:"portfolio/index.md"},R=Object.assign(q,{setup(c){return(l,e)=>(a(),o("div",null,[e[0]||(e[0]=t("h2",{id:"briefly-about-me",tabindex:"-1"},[s("👋 Briefly About Me "),t("a",{class:"header-anchor",href:"#briefly-about-me","aria-label":'Permalink to ":wave: Briefly About Me"'},"​")],-1)),e[1]||(e[1]=t("p",null,"Frontend specialized Software Engineer with a focus on the product; navigating the realms of TypeScript, JavaScript, React, Next.js, Vue and other newer technologies. Crafting seamless and engaging user experiences is my forte.",-1)),e[2]||(e[2]=t("h2",{id:"work-experience",tabindex:"-1"},[s("👨‍💻 Work Experience "),t("a",{class:"header-anchor",href:"#work-experience","aria-label":'Permalink to ":man_technologist: Work Experience"'},"​")],-1)),e[3]||(e[3]=t("p",null,"Worked on a variety of projects, ranging from enterprise-level applications to start-up ventures. My technical expertise includes the creation of clean front-end architectures, interactive data presentation on the web and the establishment of necessary CI/CD pipelines to ensure code quality and provide good developer experience.",-1)),e[4]||(e[4]=t("p",null,"Splitting complex workloads into manageable, time-boxed tasks has allowed me to effectively organize and contribute to team dynamics and ensure a successful incremental delivery. Also, I had a chance to prove my ability to inspire colleagues and initiate projects that drive innovation and progress.",-1)),m(A),e[5]||(e[5]=P('<h3 id="side-projects" tabindex="-1">Side Projects <a class="header-anchor" href="#side-projects" aria-label="Permalink to &quot;Side Projects&quot;">​</a></h3><p>My way of playing around with trending technologies and getting grasp of different industries, but at the same time creating something meaningful for humanity.</p><h4 id="nyegosh-ai-gen-software-development" tabindex="-1">🧑‍💻 <a href="https://www.npmjs.com/package/nyegosh" target="_blank" rel="noreferrer">Nyegosh</a> (AI-Gen, Software Development) <a class="header-anchor" href="#nyegosh-ai-gen-software-development" aria-label="Permalink to &quot;:technologist: [Nyegosh](https://www.npmjs.com/package/nyegosh) (AI-Gen, Software Development)&quot;">​</a></h4><p>Nyegosh is a command-line tool that helps generate commit messages adhering to the Conventional Commit standard.Developed by the <em>DevBoost Lab</em>, where I was the team captain, during AI Hackathon organized within Symphony company, where innovative solutions and AI-driven tools were created to enhance developer workflows.</p><h4 id="miadent-dentistry" tabindex="-1">🦷 <a href="https://miadent.rs/en" target="_blank" rel="noreferrer">MiaDent</a> (Dentistry) <a class="header-anchor" href="#miadent-dentistry" aria-label="Permalink to &quot;:tooth: [MiaDent](https://miadent.rs/en) (Dentistry)&quot;">​</a></h4><p>Dental clinic website (Nov 2024) – Growing multiangular site, SEO-optimized for Serbian, English and German speaking users.</p><h4 id="otisak-org-platform-global-data-privacy-laws-or-gdpr" tabindex="-1">⚖️ Otisak.org Platform (Global Data Privacy Laws or GDPR) <a class="header-anchor" href="#otisak-org-platform-global-data-privacy-laws-or-gdpr" aria-label="Permalink to &quot;:balance_scale: Otisak.org Platform (Global Data Privacy Laws or GDPR)&quot;">​</a></h4><p>Data Protection Platform (Sep – Dec 2021) – European Union funded project, conducted by Association Pravilaw that implements the Law on Personal Data Protection in Southern and Eastern Serbia municipalities – In under 4 months of part-time effort I&#39;ve managed to singlehandedly build this platform which consists of two major parts — public website and private dashboard that can be accessed only by registered users and admins. The logic spreads over several highly intuitive pages with a dark mode option and role based authorization: companies related analytics and their management, comments management, user management and settings page that includes database optimization scripts and sidebar ad setup section. Everything is hosted on Firebase, so maintenance costs remained around 0$ (<a href="https://otisak-pravilaw.web.app/" target="_blank" rel="noreferrer">fallback URL</a>).</p><p>I used to build lots of mini apps back in the day, some of them to address certain problems and other just for fun (learning). You can find all of these on <a href="https://github.com/lazarkulasevic" target="_blank" rel="noreferrer">my Github profile</a>.</p><h2 id="tech-stack" tabindex="-1">🛠️ Tech Stack <a class="header-anchor" href="#tech-stack" aria-label="Permalink to &quot;:hammer_and_wrench: Tech Stack&quot;">​</a></h2>',10)),m(f,{frontmatterKey:"technologies"}),e[6]||(e[6]=t("h3",{id:"concepts-and-platforms",tabindex:"-1"},[s("Concepts and Platforms "),t("a",{class:"header-anchor",href:"#concepts-and-platforms","aria-label":'Permalink to "Concepts and Platforms"'},"​")],-1)),m(f,{frontmatterKey:"concepts"}),e[7]||(e[7]=t("h2",{id:"get-in-touch",tabindex:"-1"},[s("🤙 Get In Touch "),t("a",{class:"header-anchor",href:"#get-in-touch","aria-label":'Permalink to ":call_me_hand: Get In Touch"'},"​")],-1)),e[8]||(e[8]=t("p",null,"I believe my technical and personal skills make me a valuable asset to a team in need of an experienced software engineer who will deliver results while fostering a collaborative and innovative work environment.",-1)),e[9]||(e[9]=t("p",null,[s("Please don't hesitate to reach out to me on "),t("a",{href:"https://www.linkedin.com/in/lazarkulasevic/",target:"_blank",rel:"noreferrer"},"LinkedIn"),s(" for any inquiries or to connect.")],-1))]))}});export{F as __pageData,R as default};