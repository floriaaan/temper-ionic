(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{75:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return b}));var r=n(2),a=n(6),o=(n(0),n(95)),c={title:"Introduction to front concepts",id:"intro"},i={unversionedId:"app/intro",id:"app/intro",isDocsHomePage:!1,title:"Introduction to front concepts",description:"Understand the basics \ud83c\udf93",source:"@site/docs\\app\\intro.md",permalink:"/temper/docs/app/intro",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/app/intro.md",sidebar:"sidebar",previous:{title:"Start a Temper project",permalink:"/temper/docs/gs/start-project"},next:{title:"Components \ud83e\uddf1",permalink:"/temper/docs/app/components"}},p=[{value:"Understand the basics \ud83c\udf93",id:"understand-the-basics-",children:[{value:"Application entry-point",id:"application-entry-point",children:[]},{value:"Organization",id:"organization",children:[]}]}],s={rightToc:p};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"understand-the-basics-"},"Understand the basics \ud83c\udf93"),Object(o.b)("h3",{id:"application-entry-point"},"Application entry-point"),Object(o.b)("p",null,"Temper app entry point file is located under ",Object(o.b)("inlineCode",{parentName:"p"},"/src/App.tsx")," : ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/floriaaan/temper/blob/master/src/App.tsx"}),"here"),"."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"logged")," and ",Object(o.b)("strong",{parentName:"p"},"notLogged")," are the scaffolding of the entire app, it depends on ",Object(o.b)("em",{parentName:"p"},"'if you're logged or not'"),"."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-tsx"}),'const App: React.FC = () => {\n  const [darkMode, setDarkMode] = useState(sessionStorage.getItem("darkMode") === \'true\' || false);\n  const handleDarkMode = (checked: boolean) => {\n    setDarkMode(checked);\n    sessionStorage.setItem("darkMode", `${checked}`);\n    document.body.classList.toggle("dark", checked);\n\n    \n  };\n  if (!sessionStorage.getItem("auth.logged")) {\n    sessionStorage.setItem("auth.logged", "0");\n  }\n  useEffect(() => {\n    handleDarkMode(darkMode);\n    // eslint-disable-next-line\n  }, []);\n  \n  auth_middleware();\n\n  return <IonApp>{sessionStorage.getItem("auth.logged") === "1" ? logged : notLogged}</IonApp>;\n};\n\nexport default App;\n')),Object(o.b)("h3",{id:"organization"},"Organization"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Locations")," of different parts :"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(r.a)({parentName:"li"},{href:"components"}),Object(o.b)("strong",{parentName:"a"},"Components"))," : ",Object(o.b)("inlineCode",{parentName:"li"},"/src/components")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(r.a)({parentName:"li"},{href:"pages"}),Object(o.b)("strong",{parentName:"a"},"Pages"))," : ",Object(o.b)("inlineCode",{parentName:"li"},"/src/pages")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(r.a)({parentName:"li"},{href:"routes"}),Object(o.b)("strong",{parentName:"a"},Object(o.b)("em",{parentName:"strong"},"Routes")))," : ",Object(o.b)("inlineCode",{parentName:"li"},"/src/routes/web.js")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(r.a)({parentName:"li"},{href:"middlewares"}),Object(o.b)("strong",{parentName:"a"},Object(o.b)("em",{parentName:"strong"},"Middlewares")))," : ",Object(o.b)("inlineCode",{parentName:"li"},"/src/middlewares"))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},Object(o.b)("em",{parentName:"strong"},"Routes"))," and ",Object(o.b)("strong",{parentName:"p"},Object(o.b)("em",{parentName:"strong"},"Middlewares"))," are ",Object(o.b)("strong",{parentName:"p"},"not")," common React components, but it helps in organizing project."))}b.isMDXComponent=!0},95:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),b=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=b(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},u=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),l=b(n),u=r,m=l["".concat(c,".").concat(u)]||l[u]||d[u]||o;return n?a.a.createElement(m,i(i({ref:t},s),{},{components:n})):a.a.createElement(m,i({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=u;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:r,c[1]=i;for(var s=2;s<o;s++)c[s]=n[s];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);