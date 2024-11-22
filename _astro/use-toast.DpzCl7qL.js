import{r as n}from"./index.DRjF_FHU.js";/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),p=(...t)=>t.filter((e,s,o)=>!!e&&o.indexOf(e)===s).join(" ");/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var _={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=n.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:r="",children:a,iconNode:S,...l},m)=>n.createElement("svg",{ref:m,..._,width:e,height:e,stroke:t,strokeWidth:o?Number(s)*24/Number(e):s,className:p("lucide",r),...l},[...S.map(([A,E])=>n.createElement(A,E)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(t,e)=>{const s=n.forwardRef(({className:o,...r},a)=>n.createElement(h,{ref:a,iconNode:e,className:p(`lucide-${O(t)}`,o),...r}));return s.displayName=`${t}`,s},I=1,w=1e6;let d=0;function g(){return d=(d+1)%Number.MAX_SAFE_INTEGER,d.toString()}const T=new Map,f=t=>{if(T.has(t))return;const e=setTimeout(()=>{T.delete(t),u({type:"REMOVE_TOAST",toastId:t})},w);T.set(t,e)},y=(t,e)=>{switch(e.type){case"ADD_TOAST":return{...t,toasts:[e.toast,...t.toasts].slice(0,I)};case"UPDATE_TOAST":return{...t,toasts:t.toasts.map(s=>s.id===e.toast.id?{...s,...e.toast}:s)};case"DISMISS_TOAST":{const{toastId:s}=e;return s?f(s):t.toasts.forEach(o=>{f(o.id)}),{...t,toasts:t.toasts.map(o=>o.id===s||s===void 0?{...o,open:!1}:o)}}case"REMOVE_TOAST":return e.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(s=>s.id!==e.toastId)}}},c=[];let i={toasts:[]};function u(t){i=y(i,t),c.forEach(e=>{e(i)})}function D({...t}){const e=g(),s=r=>u({type:"UPDATE_TOAST",toast:{...r,id:e}}),o=()=>u({type:"DISMISS_TOAST",toastId:e});return u({type:"ADD_TOAST",toast:{...t,id:e,open:!0,onOpenChange:r=>{r||o()}}}),{id:e,dismiss:o,update:s}}function x(){const[t,e]=n.useState(i);return n.useEffect(()=>(c.push(e),()=>{const s=c.indexOf(e);s>-1&&c.splice(s,1)}),[t]),{...t,toast:D,dismiss:s=>u({type:"DISMISS_TOAST",toastId:s})}}export{v as c,x as u};
