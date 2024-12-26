import{j as d}from"./jsx-runtime.s_qdhQ62.js";import{r as b,R as i}from"./index.DRjF_FHU.js";import{c as me,P as ke,D as Kt,u as Jt,a as Zt}from"./index.vCidIuzS.js";import{c as Qt,u as Le,P as ge,S as en,a as tn}from"./index.DOJF3pNe.js";import{R as nn,h as rn,u as an,F as on,a as Pe,M as Qe}from"./config.D7EYnuoh.js";import{c as xe}from"./utils.CmAReE4r.js";/* empty css                       */import"./index.D7yLsxtC.js";var He="Dialog",[at,sr]=Qt(He),[sn,X]=at(He),ot=e=>{const{__scopeDialog:n,children:t,open:a,defaultOpen:o,onOpenChange:r,modal:l=!0}=e,s=b.useRef(null),y=b.useRef(null),[D=!1,w]=Jt({prop:a,defaultProp:o,onChange:r});return d.jsx(sn,{scope:n,triggerRef:s,contentRef:y,contentId:Pe(),titleId:Pe(),descriptionId:Pe(),open:D,onOpenChange:w,onOpenToggle:b.useCallback(()=>w(g=>!g),[w]),modal:l,children:t})};ot.displayName=He;var it="DialogTrigger",st=b.forwardRef((e,n)=>{const{__scopeDialog:t,...a}=e,o=X(it,t),r=Le(n,o.triggerRef);return d.jsx(ge.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":We(o.open),...a,ref:r,onClick:me(e.onClick,o.onOpenToggle)})});st.displayName=it;var Fe="DialogPortal",[ln,lt]=at(Fe,{forceMount:void 0}),ut=e=>{const{__scopeDialog:n,forceMount:t,children:a,container:o}=e,r=X(Fe,n);return d.jsx(ln,{scope:n,forceMount:t,children:b.Children.map(a,l=>d.jsx(ke,{present:t||r.open,children:d.jsx(Zt,{asChild:!0,container:o,children:l})}))})};ut.displayName=Fe;var Re="DialogOverlay",ct=b.forwardRef((e,n)=>{const t=lt(Re,e.__scopeDialog),{forceMount:a=t.forceMount,...o}=e,r=X(Re,e.__scopeDialog);return r.modal?d.jsx(ke,{present:a||r.open,children:d.jsx(un,{...o,ref:n})}):null});ct.displayName=Re;var un=b.forwardRef((e,n)=>{const{__scopeDialog:t,...a}=e,o=X(Re,t);return d.jsx(nn,{as:en,allowPinchZoom:!0,shards:[o.contentRef],children:d.jsx(ge.div,{"data-state":We(o.open),...a,ref:n,style:{pointerEvents:"auto",...a.style}})})}),re="DialogContent",dt=b.forwardRef((e,n)=>{const t=lt(re,e.__scopeDialog),{forceMount:a=t.forceMount,...o}=e,r=X(re,e.__scopeDialog);return d.jsx(ke,{present:a||r.open,children:r.modal?d.jsx(cn,{...o,ref:n}):d.jsx(dn,{...o,ref:n})})});dt.displayName=re;var cn=b.forwardRef((e,n)=>{const t=X(re,e.__scopeDialog),a=b.useRef(null),o=Le(n,t.contentRef,a);return b.useEffect(()=>{const r=a.current;if(r)return rn(r)},[]),d.jsx(ft,{...e,ref:o,trapFocus:t.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:me(e.onCloseAutoFocus,r=>{r.preventDefault(),t.triggerRef.current?.focus()}),onPointerDownOutside:me(e.onPointerDownOutside,r=>{const l=r.detail.originalEvent,s=l.button===0&&l.ctrlKey===!0;(l.button===2||s)&&r.preventDefault()}),onFocusOutside:me(e.onFocusOutside,r=>r.preventDefault())})}),dn=b.forwardRef((e,n)=>{const t=X(re,e.__scopeDialog),a=b.useRef(!1),o=b.useRef(!1);return d.jsx(ft,{...e,ref:n,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:r=>{e.onCloseAutoFocus?.(r),r.defaultPrevented||(a.current||t.triggerRef.current?.focus(),r.preventDefault()),a.current=!1,o.current=!1},onInteractOutside:r=>{e.onInteractOutside?.(r),r.defaultPrevented||(a.current=!0,r.detail.originalEvent.type==="pointerdown"&&(o.current=!0));const l=r.target;t.triggerRef.current?.contains(l)&&r.preventDefault(),r.detail.originalEvent.type==="focusin"&&o.current&&r.preventDefault()}})}),ft=b.forwardRef((e,n)=>{const{__scopeDialog:t,trapFocus:a,onOpenAutoFocus:o,onCloseAutoFocus:r,...l}=e,s=X(re,t),y=b.useRef(null),D=Le(n,y);return an(),d.jsxs(d.Fragment,{children:[d.jsx(on,{asChild:!0,loop:!0,trapped:a,onMountAutoFocus:o,onUnmountAutoFocus:r,children:d.jsx(Kt,{role:"dialog",id:s.contentId,"aria-describedby":s.descriptionId,"aria-labelledby":s.titleId,"data-state":We(s.open),...l,ref:D,onDismiss:()=>s.onOpenChange(!1)})}),d.jsxs(d.Fragment,{children:[d.jsx(fn,{titleId:s.titleId}),d.jsx(mn,{contentRef:y,descriptionId:s.descriptionId})]})]})}),Be="DialogTitle",pt=b.forwardRef((e,n)=>{const{__scopeDialog:t,...a}=e,o=X(Be,t);return d.jsx(ge.h2,{id:o.titleId,...a,ref:n})});pt.displayName=Be;var mt="DialogDescription",gt=b.forwardRef((e,n)=>{const{__scopeDialog:t,...a}=e,o=X(mt,t);return d.jsx(ge.p,{id:o.descriptionId,...a,ref:n})});gt.displayName=mt;var ht="DialogClose",wt=b.forwardRef((e,n)=>{const{__scopeDialog:t,...a}=e,o=X(ht,t);return d.jsx(ge.button,{type:"button",...a,ref:n,onClick:me(e.onClick,()=>o.onOpenChange(!1))})});wt.displayName=ht;function We(e){return e?"open":"closed"}var vt="DialogTitleWarning",[lr,yt]=tn(vt,{contentName:re,titleName:Be,docsSlug:"dialog"}),fn=({titleId:e})=>{const n=yt(vt),t=`\`${n.contentName}\` requires a \`${n.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${n.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${n.docsSlug}`;return b.useEffect(()=>{e&&(document.getElementById(e)||console.error(t))},[t,e]),null},pn="DialogDescriptionWarning",mn=({contentRef:e,descriptionId:n})=>{const a=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${yt(pn).contentName}}.`;return b.useEffect(()=>{const o=e.current?.getAttribute("aria-describedby");n&&o&&(document.getElementById(n)||console.warn(a))},[a,e,n]),null},gn=ot,hn=st,wn=ut,vn=ct,yn=dt,bn=pt,Dn=gt,Rn=wt;function xn(e){if(typeof document>"u")return;let n=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",n.appendChild(t),t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))}const bt=i.createContext({drawerRef:{current:null},overlayRef:{current:null},onPress:()=>{},onRelease:()=>{},onDrag:()=>{},onNestedDrag:()=>{},onNestedOpenChange:()=>{},onNestedRelease:()=>{},openProp:void 0,dismissible:!1,isOpen:!1,isDragging:!1,keyboardIsOpen:{current:!1},snapPointsOffset:null,snapPoints:null,handleOnly:!1,modal:!1,shouldFade:!1,activeSnapPoint:null,onOpenChange:()=>{},setActiveSnapPoint:()=>{},closeDrawer:()=>{},direction:"bottom",shouldScaleBackground:!1,setBackgroundColorOnScale:!0,noBodyStyles:!1,container:null,autoFocus:!1}),ie=()=>{const e=i.useContext(bt);if(!e)throw new Error("useDrawerContext must be used within a Drawer.Root");return e};xn(`[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32, .72, 0, 1);animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,100%,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,-100%,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(-100%,0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(100%,0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32, .72, 0, 1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true])::after{content:'';position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]::after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]::after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]::after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]::after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not(
[data-state=closed]
){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:active,[data-vaul-handle]:hover{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover:hover) and (pointer:fine){[data-vaul-drawer]{user-select:none}}@media (pointer:fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{from{transform:translate3d(0,100%,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToBottom{to{transform:translate3d(0,100%,0)}}@keyframes slideFromTop{from{transform:translate3d(0,-100%,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToTop{to{transform:translate3d(0,-100%,0)}}@keyframes slideFromLeft{from{transform:translate3d(-100%,0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToLeft{to{transform:translate3d(-100%,0,0)}}@keyframes slideFromRight{from{transform:translate3d(100%,0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToRight{to{transform:translate3d(100%,0,0)}}`);const En=24,Tn=typeof window<"u"?b.useLayoutEffect:b.useEffect;function et(...e){return(...n)=>{for(let t of e)typeof t=="function"&&t(...n)}}function Sn(){return Ue(/^Mac/)}function Cn(){return Ue(/^iPhone/)}function tt(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)}function On(){return Ue(/^iPad/)||Sn()&&navigator.maxTouchPoints>1}function Dt(){return Cn()||On()}function Ue(e){return typeof window<"u"&&window.navigator!=null?e.test(window.navigator.platform):void 0}const _e=typeof document<"u"&&window.visualViewport;function nt(e){let n=window.getComputedStyle(e);return/(auto|scroll)/.test(n.overflow+n.overflowX+n.overflowY)}function Rt(e){for(nt(e)&&(e=e.parentElement);e&&!nt(e);)e=e.parentElement;return e||document.scrollingElement||document.documentElement}const Nn=new Set(["checkbox","radio","range","color","file","image","button","submit","reset"]);let be=0,Ae;function Pn(e={}){let{isDisabled:n}=e;Tn(()=>{if(!n)return be++,be===1&&Dt()&&(Ae=_n()),()=>{be--,be===0&&Ae?.()}},[n])}function _n(){let e,n=0,t=g=>{e=Rt(g.target),!(e===document.documentElement&&e===document.body)&&(n=g.changedTouches[0].pageY)},a=g=>{if(!e||e===document.documentElement||e===document.body){g.preventDefault();return}let v=g.changedTouches[0].pageY,L=e.scrollTop,U=e.scrollHeight-e.clientHeight;U!==0&&((L<=0&&v>n||L>=U&&v<n)&&g.preventDefault(),n=v)},o=g=>{let v=g.target;$e(v)&&v!==document.activeElement&&(g.preventDefault(),v.style.transform="translateY(-2000px)",v.focus(),requestAnimationFrame(()=>{v.style.transform=""}))},r=g=>{let v=g.target;$e(v)&&(v.style.transform="translateY(-2000px)",requestAnimationFrame(()=>{v.style.transform="",_e&&(_e.height<window.innerHeight?requestAnimationFrame(()=>{rt(v)}):_e.addEventListener("resize",()=>rt(v),{once:!0}))}))},l=()=>{window.scrollTo(0,0)},s=window.pageXOffset,y=window.pageYOffset,D=et(An(document.documentElement,"paddingRight",`${window.innerWidth-document.documentElement.clientWidth}px`));window.scrollTo(0,0);let w=et(fe(document,"touchstart",t,{passive:!1,capture:!0}),fe(document,"touchmove",a,{passive:!1,capture:!0}),fe(document,"touchend",o,{passive:!1,capture:!0}),fe(document,"focus",r,!0),fe(window,"scroll",l));return()=>{D(),w(),window.scrollTo(s,y)}}function An(e,n,t){let a=e.style[n];return e.style[n]=t,()=>{e.style[n]=a}}function fe(e,n,t,a){return e.addEventListener(n,t,a),()=>{e.removeEventListener(n,t,a)}}function rt(e){let n=document.scrollingElement||document.documentElement;for(;e&&e!==n;){let t=Rt(e);if(t!==document.documentElement&&t!==document.body&&t!==e){let a=t.getBoundingClientRect().top,o=e.getBoundingClientRect().top,r=e.getBoundingClientRect().bottom;const l=t.getBoundingClientRect().bottom+En;r>l&&(t.scrollTop+=o-a)}e=t.parentElement}}function $e(e){return e instanceof HTMLInputElement&&!Nn.has(e.type)||e instanceof HTMLTextAreaElement||e instanceof HTMLElement&&e.isContentEditable}function Mn(e,n){typeof e=="function"?e(n):e!=null&&(e.current=n)}function In(...e){return n=>e.forEach(t=>Mn(t,n))}function xt(...e){return b.useCallback(In(...e),e)}const Et=new WeakMap;function P(e,n,t=!1){if(!e||!(e instanceof HTMLElement))return;let a={};Object.entries(n).forEach(([o,r])=>{if(o.startsWith("--")){e.style.setProperty(o,r);return}a[o]=e.style[o],e.style[o]=r}),!t&&Et.set(e,a)}function $n(e,n){if(!e||!(e instanceof HTMLElement))return;let t=Et.get(e);t&&(e.style[n]=t[n])}const _=e=>{switch(e){case"top":case"bottom":return!0;case"left":case"right":return!1;default:return e}};function De(e,n){if(!e)return null;const t=window.getComputedStyle(e),a=t.transform||t.webkitTransform||t.mozTransform;let o=a.match(/^matrix3d\((.+)\)$/);return o?parseFloat(o[1].split(", ")[_(n)?13:12]):(o=a.match(/^matrix\((.+)\)$/),o?parseFloat(o[1].split(", ")[_(n)?5:4]):null)}function jn(e){return 8*(Math.log(e+1)-2)}function Me(e,n){if(!e)return()=>{};const t=e.style.cssText;return Object.assign(e.style,n),()=>{e.style.cssText=t}}function kn(...e){return(...n)=>{for(const t of e)typeof t=="function"&&t(...n)}}const O={DURATION:.5,EASE:[.32,.72,0,1]},Tt=.4,Ln=.25,Hn=100,St=8,ne=16,je=26,Ie="vaul-dragging";function Ct(e){const n=i.useRef(e);return i.useEffect(()=>{n.current=e}),i.useMemo(()=>(...t)=>n.current==null?void 0:n.current.call(n,...t),[])}function Fn({defaultProp:e,onChange:n}){const t=i.useState(e),[a]=t,o=i.useRef(a),r=Ct(n);return i.useEffect(()=>{o.current!==a&&(r(a),o.current=a)},[a,o,r]),t}function Ot({prop:e,defaultProp:n,onChange:t=()=>{}}){const[a,o]=Fn({defaultProp:n,onChange:t}),r=e!==void 0,l=r?e:a,s=Ct(t),y=i.useCallback(D=>{if(r){const g=typeof D=="function"?D(e):D;g!==e&&s(g)}else o(D)},[r,e,o,s]);return[l,y]}function Bn({activeSnapPointProp:e,setActiveSnapPointProp:n,snapPoints:t,drawerRef:a,overlayRef:o,fadeFromIndex:r,onSnapPointChange:l,direction:s="bottom",container:y,snapToSequentialPoint:D}){const[w,g]=Ot({prop:e,defaultProp:t?.[0],onChange:n}),[v,L]=i.useState(typeof window<"u"?{innerWidth:window.innerWidth,innerHeight:window.innerHeight}:void 0);i.useEffect(()=>{function m(){L({innerWidth:window.innerWidth,innerHeight:window.innerHeight})}return window.addEventListener("resize",m),()=>window.removeEventListener("resize",m)},[]);const U=i.useMemo(()=>w===t?.[t.length-1]||null,[t,w]),N=i.useMemo(()=>t?.findIndex(m=>m===w),[t,w]),V=t&&t.length>0&&(r||r===0)&&!Number.isNaN(r)&&t[r]===w||!t,h=i.useMemo(()=>{const m=y?{width:y.getBoundingClientRect().width,height:y.getBoundingClientRect().height}:typeof window<"u"?{width:window.innerWidth,height:window.innerHeight}:{width:0,height:0};var T;return(T=t?.map(R=>{const j=typeof R=="string";let u=0;if(j&&(u=parseInt(R,10)),_(s)){const M=j?u:v?R*m.height:0;return v?s==="bottom"?m.height-M:-m.height+M:M}const I=j?u:v?R*m.width:0;return v?s==="right"?m.width-I:-m.width+I:I}))!=null?T:[]},[t,v,y]),H=i.useMemo(()=>N!==null?h?.[N]:null,[h,N]),A=i.useCallback(m=>{var T;const R=(T=h?.findIndex(j=>j===m))!=null?T:null;l(R),P(a.current,{transition:`transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,transform:_(s)?`translate3d(0, ${m}px, 0)`:`translate3d(${m}px, 0, 0)`}),h&&R!==h.length-1&&R!==r&&R<r?P(o.current,{transition:`opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,opacity:"0"}):P(o.current,{transition:`opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,opacity:"1"}),g(t?.[Math.max(R,0)])},[a.current,t,h,r,o,g]);i.useEffect(()=>{if(w||e){var m;const T=(m=t?.findIndex(R=>R===e||R===w))!=null?m:-1;h&&T!==-1&&typeof h[T]=="number"&&A(h[T])}},[w,e,t,h,A]);function p({draggedDistance:m,closeDrawer:T,velocity:R,dismissible:j}){if(r===void 0)return;const u=s==="bottom"||s==="right"?(H??0)-m:(H??0)+m,I=N===r-1,M=N===0,F=m>0;if(I&&P(o.current,{transition:`opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`}),!D&&R>2&&!F){j?T():A(h[0]);return}if(!D&&R>2&&F&&h&&t){A(h[t.length-1]);return}const B=h?.reduce((W,ee)=>typeof W!="number"||typeof ee!="number"?W:Math.abs(ee-u)<Math.abs(W-u)?ee:W),Z=_(s)?window.innerHeight:window.innerWidth;if(R>Tt&&Math.abs(m)<Z*.4){const W=F?1:-1;if(W>0&&U){A(h[t.length-1]);return}if(M&&W<0&&j&&T(),N===null)return;A(h[N+W]);return}A(B)}function $({draggedDistance:m}){if(H===null)return;const T=s==="bottom"||s==="right"?H-m:H+m;(s==="bottom"||s==="right")&&T<h[h.length-1]||(s==="top"||s==="left")&&T>h[h.length-1]||P(a.current,{transform:_(s)?`translate3d(0, ${T}px, 0)`:`translate3d(${T}px, 0, 0)`})}function J(m,T){if(!t||typeof N!="number"||!h||r===void 0)return null;const R=N===r-1;if(N>=r&&T)return 0;if(R&&!T)return 1;if(!V&&!R)return null;const u=R?N+1:N-1,I=R?h[u]-h[u-1]:h[u+1]-h[u],M=m/Math.abs(I);return R?1-M:M}return{isLastSnapPoint:U,activeSnapPoint:w,shouldFade:V,getPercentageDragged:J,setActiveSnapPoint:g,activeSnapPointIndex:N,onRelease:p,onDrag:$,snapPointsOffset:h}}const Wn=()=>()=>{};function Un(){const{direction:e,isOpen:n,shouldScaleBackground:t,setBackgroundColorOnScale:a,noBodyStyles:o}=ie(),r=i.useRef(null),l=b.useMemo(()=>document.body.style.backgroundColor,[]);function s(){return(window.innerWidth-je)/window.innerWidth}i.useEffect(()=>{if(n&&t){r.current&&clearTimeout(r.current);const y=document.querySelector("[data-vaul-drawer-wrapper]")||document.querySelector("[vaul-drawer-wrapper]");if(!y)return;kn(a&&!o?Me(document.body,{background:"black"}):Wn,Me(y,{transformOrigin:_(e)?"top":"left",transitionProperty:"transform, border-radius",transitionDuration:`${O.DURATION}s`,transitionTimingFunction:`cubic-bezier(${O.EASE.join(",")})`}));const D=Me(y,{borderRadius:`${St}px`,overflow:"hidden",..._(e)?{transform:`scale(${s()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`}:{transform:`scale(${s()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`}});return()=>{D(),r.current=window.setTimeout(()=>{l?document.body.style.background=l:document.body.style.removeProperty("background")},O.DURATION*1e3)}}},[n,t,l])}let pe=null;function zn({isOpen:e,modal:n,nested:t,hasBeenOpened:a,preventScrollRestoration:o,noBodyStyles:r}){const[l,s]=i.useState(()=>typeof window<"u"?window.location.href:""),y=i.useRef(0),D=i.useCallback(()=>{if(tt()&&pe===null&&e&&!r){pe={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left,height:document.body.style.height,right:"unset"};const{scrollX:g,innerHeight:v}=window;document.body.style.setProperty("position","fixed","important"),Object.assign(document.body.style,{top:`${-y.current}px`,left:`${-g}px`,right:"0px",height:"auto"}),window.setTimeout(()=>window.requestAnimationFrame(()=>{const L=v-window.innerHeight;L&&y.current>=v&&(document.body.style.top=`${-(y.current+L)}px`)}),300)}},[e]),w=i.useCallback(()=>{if(tt()&&pe!==null&&!r){const g=-parseInt(document.body.style.top,10),v=-parseInt(document.body.style.left,10);Object.assign(document.body.style,pe),window.requestAnimationFrame(()=>{if(o&&l!==window.location.href){s(window.location.href);return}window.scrollTo(v,g)}),pe=null}},[l]);return i.useEffect(()=>{function g(){y.current=window.scrollY}return g(),window.addEventListener("scroll",g),()=>{window.removeEventListener("scroll",g)}},[]),i.useEffect(()=>{t||!a||(e?(!window.matchMedia("(display-mode: standalone)").matches&&D(),n||window.setTimeout(()=>{w()},500)):w())},[e,a,l,n,t,D,w]),{restorePositionSetting:w}}function Nt({open:e,onOpenChange:n,children:t,onDrag:a,onRelease:o,snapPoints:r,shouldScaleBackground:l=!1,setBackgroundColorOnScale:s=!0,closeThreshold:y=Ln,scrollLockTimeout:D=Hn,dismissible:w=!0,handleOnly:g=!1,fadeFromIndex:v=r&&r.length-1,activeSnapPoint:L,setActiveSnapPoint:U,fixed:N,modal:V=!0,onClose:h,nested:H,noBodyStyles:A,direction:p="bottom",defaultOpen:$=!1,disablePreventScroll:J=!0,snapToSequentialPoint:m=!1,preventScrollRestoration:T=!1,repositionInputs:R=!0,onAnimationEnd:j,container:u,autoFocus:I=!1}){var M,F;const[B=!1,Z]=Ot({defaultProp:$,prop:e,onChange:c=>{n?.(c),!c&&!H&&Wt(),setTimeout(()=>{j?.(c)},O.DURATION*1e3),c&&!V&&typeof window<"u"&&window.requestAnimationFrame(()=>{document.body.style.pointerEvents="auto"}),c||(document.body.style.pointerEvents="auto")}}),[W,ee]=i.useState(!1),[se,Ee]=i.useState(!1),[jt,ze]=i.useState(!1),ae=i.useRef(null),he=i.useRef(null),Te=i.useRef(null),Se=i.useRef(null),we=i.useRef(null),le=i.useRef(!1),Ce=i.useRef(null),Oe=i.useRef(0),oe=i.useRef(!1),Ve=i.useRef(0),f=i.useRef(null),Ye=i.useRef(((M=f.current)==null?void 0:M.getBoundingClientRect().height)||0),qe=i.useRef(((F=f.current)==null?void 0:F.getBoundingClientRect().width)||0),Ne=i.useRef(0),kt=i.useCallback(c=>{r&&c===ce.length-1&&(he.current=new Date)},[]),{activeSnapPoint:Lt,activeSnapPointIndex:ue,setActiveSnapPoint:Xe,onRelease:Ht,snapPointsOffset:ce,onDrag:Ft,shouldFade:Ge,getPercentageDragged:Bt}=Bn({snapPoints:r,activeSnapPointProp:L,setActiveSnapPointProp:U,drawerRef:f,fadeFromIndex:v,overlayRef:ae,onSnapPointChange:kt,direction:p,container:u,snapToSequentialPoint:m});Pn({isDisabled:!B||se||!V||jt||!W||!R||!J});const{restorePositionSetting:Wt}=zn({isOpen:B,modal:V,nested:H,hasBeenOpened:W,preventScrollRestoration:T,noBodyStyles:A});function ve(){return(window.innerWidth-je)/window.innerWidth}function Ut(c){var x,S;!w&&!r||f.current&&!f.current.contains(c.target)||(Ye.current=((x=f.current)==null?void 0:x.getBoundingClientRect().height)||0,qe.current=((S=f.current)==null?void 0:S.getBoundingClientRect().width)||0,Ee(!0),Te.current=new Date,Dt()&&window.addEventListener("touchend",()=>le.current=!1,{once:!0}),c.target.setPointerCapture(c.pointerId),Oe.current=_(p)?c.pageY:c.pageX)}function Ke(c,x){var S,C;let E=c;const Y=(S=window.getSelection())==null?void 0:S.toString(),k=f.current?De(f.current,p):null,z=new Date;if(E.hasAttribute("data-vaul-no-drag")||E.closest("[data-vaul-no-drag]"))return!1;if(p==="right"||p==="left")return!0;if(he.current&&z.getTime()-he.current.getTime()<500)return!1;if(k!==null&&(p==="bottom"?k>0:k<0))return!0;if(Y&&Y.length>0)return!1;if(z.getTime()-((C=we.current)==null?void 0:C.getTime())<D&&k===0||x)return we.current=z,!1;for(;E;){if(E.scrollHeight>E.clientHeight){if(E.scrollTop!==0)return we.current=new Date,!1;if(E.getAttribute("role")==="dialog")return!0}E=E.parentNode}return!0}function zt(c){if(f.current&&se){const x=p==="bottom"||p==="right"?1:-1,S=(Oe.current-(_(p)?c.pageY:c.pageX))*x,C=S>0,E=r&&!w&&!C;if(E&&ue===0)return;const Y=Math.abs(S),k=document.querySelector("[data-vaul-drawer-wrapper]"),z=p==="bottom"||p==="top"?Ye.current:qe.current;let q=Y/z;const te=Bt(Y,C);if(te!==null&&(q=te),E&&q>=1||!le.current&&!Ke(c.target,C))return;if(f.current.classList.add(Ie),le.current=!0,P(f.current,{transition:"none"}),P(ae.current,{transition:"none"}),r&&Ft({draggedDistance:S}),C&&!r){const G=jn(S),ye=Math.min(G*-1,0)*x;P(f.current,{transform:_(p)?`translate3d(0, ${ye}px, 0)`:`translate3d(${ye}px, 0, 0)`});return}const Q=1-q;if((Ge||v&&ue===v-1)&&(a?.(c,q),P(ae.current,{opacity:`${Q}`,transition:"none"},!0)),k&&ae.current&&l){const G=Math.min(ve()+q*(1-ve()),1),ye=8-q*8,Ze=Math.max(0,14-q*14);P(k,{borderRadius:`${ye}px`,transform:_(p)?`scale(${G}) translate3d(0, ${Ze}px, 0)`:`scale(${G}) translate3d(${Ze}px, 0, 0)`,transition:"none"},!0)}if(!r){const G=Y*x;P(f.current,{transform:_(p)?`translate3d(0, ${G}px, 0)`:`translate3d(${G}px, 0, 0)`})}}}i.useEffect(()=>{var c;function x(){if(!f.current||!R)return;const S=document.activeElement;if($e(S)||oe.current){var C;const E=((C=window.visualViewport)==null?void 0:C.height)||0,Y=window.innerHeight;let k=Y-E;const z=f.current.getBoundingClientRect().height||0,q=z>Y*.8;Ne.current||(Ne.current=z);const te=f.current.getBoundingClientRect().top;if(Math.abs(Ve.current-k)>60&&(oe.current=!oe.current),r&&r.length>0&&ce&&ue){const Q=ce[ue]||0;k+=Q}if(Ve.current=k,z>E||oe.current){const Q=f.current.getBoundingClientRect().height;let G=Q;Q>E&&(G=E-(q?te:je)),N?f.current.style.height=`${Q-Math.max(k,0)}px`:f.current.style.height=`${Math.max(G,E-te)}px`}else f.current.style.height=`${Ne.current}px`;r&&r.length>0&&!oe.current?f.current.style.bottom="0px":f.current.style.bottom=`${Math.max(k,0)}px`}}return(c=window.visualViewport)==null||c.addEventListener("resize",x),()=>{var S;return(S=window.visualViewport)==null?void 0:S.removeEventListener("resize",x)}},[ue,r,ce]);function de(c){Vt(),h?.(),c||Z(!1),setTimeout(()=>{r&&Xe(r[0])},O.DURATION*1e3)}function Je(){if(!f.current)return;const c=document.querySelector("[data-vaul-drawer-wrapper]"),x=De(f.current,p);P(f.current,{transform:"translate3d(0, 0, 0)",transition:`transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`}),P(ae.current,{transition:`opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,opacity:"1"}),l&&x&&x>0&&B&&P(c,{borderRadius:`${St}px`,overflow:"hidden",..._(p)?{transform:`scale(${ve()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,transformOrigin:"top"}:{transform:`scale(${ve()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,transformOrigin:"left"},transitionProperty:"transform, border-radius",transitionDuration:`${O.DURATION}s`,transitionTimingFunction:`cubic-bezier(${O.EASE.join(",")})`},!0)}function Vt(){!se||!f.current||(f.current.classList.remove(Ie),le.current=!1,Ee(!1),Se.current=new Date)}function Yt(c){if(!se||!f.current)return;f.current.classList.remove(Ie),le.current=!1,Ee(!1),Se.current=new Date;const x=De(f.current,p);if(!Ke(c.target,!1)||!x||Number.isNaN(x)||Te.current===null)return;const S=Se.current.getTime()-Te.current.getTime(),C=Oe.current-(_(p)?c.pageY:c.pageX),E=Math.abs(C)/S;if(E>.05&&(ze(!0),setTimeout(()=>{ze(!1)},200)),r){Ht({draggedDistance:C*(p==="bottom"||p==="right"?1:-1),closeDrawer:de,velocity:E,dismissible:w}),o?.(c,!0);return}if(p==="bottom"||p==="right"?C>0:C<0){Je(),o?.(c,!0);return}if(E>Tt){de(),o?.(c,!1);return}var Y;const k=Math.min((Y=f.current.getBoundingClientRect().height)!=null?Y:0,window.innerHeight);var z;const q=Math.min((z=f.current.getBoundingClientRect().width)!=null?z:0,window.innerWidth),te=p==="left"||p==="right";if(Math.abs(x)>=(te?q:k)*y){de(),o?.(c,!1);return}o?.(c,!0),Je()}i.useEffect(()=>(B&&(P(document.documentElement,{scrollBehavior:"auto"}),he.current=new Date),()=>{$n(document.documentElement,"scrollBehavior")}),[B]);function qt(c){const x=c?(window.innerWidth-ne)/window.innerWidth:1,S=c?-ne:0;Ce.current&&window.clearTimeout(Ce.current),P(f.current,{transition:`transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,transform:`scale(${x}) translate3d(0, ${S}px, 0)`}),!c&&f.current&&(Ce.current=setTimeout(()=>{const C=De(f.current,p);P(f.current,{transition:"none",transform:_(p)?`translate3d(0, ${C}px, 0)`:`translate3d(${C}px, 0, 0)`})},500))}function Xt(c,x){if(x<0)return;const S=(window.innerWidth-ne)/window.innerWidth,C=S+x*(1-S),E=-ne+x*ne;P(f.current,{transform:_(p)?`scale(${C}) translate3d(0, ${E}px, 0)`:`scale(${C}) translate3d(${E}px, 0, 0)`,transition:"none"})}function Gt(c,x){const S=_(p)?window.innerHeight:window.innerWidth,C=x?(S-ne)/S:1,E=x?-ne:0;x&&P(f.current,{transition:`transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,transform:_(p)?`scale(${C}) translate3d(0, ${E}px, 0)`:`scale(${C}) translate3d(${E}px, 0, 0)`})}return i.createElement(gn,{defaultOpen:$,onOpenChange:c=>{!w&&!c||(c?ee(!0):de(!0),Z(c))},open:B},i.createElement(bt.Provider,{value:{activeSnapPoint:Lt,snapPoints:r,setActiveSnapPoint:Xe,drawerRef:f,overlayRef:ae,onOpenChange:n,onPress:Ut,onRelease:Yt,onDrag:zt,dismissible:w,handleOnly:g,isOpen:B,isDragging:se,shouldFade:Ge,closeDrawer:de,onNestedDrag:Xt,onNestedOpenChange:qt,onNestedRelease:Gt,keyboardIsOpen:oe,modal:V,snapPointsOffset:ce,direction:p,shouldScaleBackground:l,setBackgroundColorOnScale:s,noBodyStyles:A,container:u,autoFocus:I}},t))}const Pt=i.forwardRef(function({...e},n){const{overlayRef:t,snapPoints:a,onRelease:o,shouldFade:r,isOpen:l,modal:s}=ie(),y=xt(n,t),D=a&&a.length>0;return s?i.createElement(vn,{onMouseUp:o,ref:y,"data-vaul-overlay":"","data-vaul-snap-points":l&&D?"true":"false","data-vaul-snap-points-overlay":l&&r?"true":"false",...e}):(typeof window<"u"&&window.requestAnimationFrame(()=>{document.body.style.pointerEvents="auto"}),null)});Pt.displayName="Drawer.Overlay";const _t=i.forwardRef(function({onPointerDownOutside:e,style:n,onOpenAutoFocus:t,...a},o){const{drawerRef:r,onPress:l,onRelease:s,onDrag:y,keyboardIsOpen:D,snapPointsOffset:w,modal:g,isOpen:v,direction:L,snapPoints:U,container:N,handleOnly:V,autoFocus:h}=ie(),[H,A]=i.useState(!1),p=xt(o,r),$=i.useRef(null),J=i.useRef(null),m=i.useRef(!1),T=U&&U.length>0;Un();const R=(u,I,M=0)=>{if(m.current)return!0;const F=Math.abs(u.y),B=Math.abs(u.x),Z=B>F,W=["bottom","right"].includes(I)?1:-1;if(I==="left"||I==="right"){if(!(u.x*W<0)&&B>=0&&B<=M)return Z}else if(!(u.y*W<0)&&F>=0&&F<=M)return!Z;return m.current=!0,!0};i.useEffect(()=>{T&&window.requestAnimationFrame(()=>{A(!0)})},[]);function j(u){$.current=null,m.current=!1,s(u)}return i.createElement(yn,{"data-vaul-drawer-direction":L,"data-vaul-drawer":"","data-vaul-delayed-snap-points":H?"true":"false","data-vaul-snap-points":v&&T?"true":"false","data-vaul-custom-container":N?"true":"false",...a,ref:p,style:w&&w.length>0?{"--snap-point-height":`${w[0]}px`,...n}:n,onPointerDown:u=>{V||(a.onPointerDown==null||a.onPointerDown.call(a,u),$.current={x:u.pageX,y:u.pageY},l(u))},onOpenAutoFocus:u=>{t?.(u),h||u.preventDefault()},onPointerDownOutside:u=>{if(e?.(u),!g||u.defaultPrevented){u.preventDefault();return}D.current&&(D.current=!1)},onFocusOutside:u=>{if(!g){u.preventDefault();return}},onPointerMove:u=>{if(J.current=u,V||(a.onPointerMove==null||a.onPointerMove.call(a,u),!$.current))return;const I=u.pageY-$.current.y,M=u.pageX-$.current.x,F=u.pointerType==="touch"?10:2;R({x:M,y:I},L,F)?y(u):(Math.abs(M)>F||Math.abs(I)>F)&&($.current=null)},onPointerUp:u=>{a.onPointerUp==null||a.onPointerUp.call(a,u),$.current=null,m.current=!1,s(u)},onPointerOut:u=>{a.onPointerOut==null||a.onPointerOut.call(a,u),j(J.current)},onContextMenu:u=>{a.onContextMenu==null||a.onContextMenu.call(a,u),j(J.current)}})});_t.displayName="Drawer.Content";const Vn=250,Yn=120,At=i.forwardRef(function({preventCycle:e=!1,children:n,...t},a){const{closeDrawer:o,isDragging:r,snapPoints:l,activeSnapPoint:s,setActiveSnapPoint:y,dismissible:D,handleOnly:w,isOpen:g,onPress:v,onDrag:L}=ie(),U=i.useRef(null),N=i.useRef(!1);function V(){if(N.current){A();return}window.setTimeout(()=>{h()},Yn)}function h(){if(r||e||N.current){A();return}if(A(),(!l||l.length===0)&&D){o();return}if(s===l[l.length-1]&&D){o();return}const $=l.findIndex(m=>m===s);if($===-1)return;const J=l[$+1];y(J)}function H(){U.current=window.setTimeout(()=>{N.current=!0},Vn)}function A(){window.clearTimeout(U.current),N.current=!1}return i.createElement("div",{onClick:V,onPointerCancel:A,onPointerDown:p=>{w&&v(p),H()},onPointerMove:p=>{w&&L(p)},ref:a,"data-vaul-drawer-visible":g?"true":"false","data-vaul-handle":"","aria-hidden":"true",...t},i.createElement("span",{"data-vaul-handle-hitarea":"","aria-hidden":"true"},n))});At.displayName="Drawer.Handle";function qn({onDrag:e,onOpenChange:n,...t}){const{onNestedDrag:a,onNestedOpenChange:o,onNestedRelease:r}=ie();if(!a)throw new Error("Drawer.NestedRoot must be placed in another drawer");return i.createElement(Nt,{nested:!0,onClose:()=>{o(!1)},onDrag:(l,s)=>{a(l,s),e?.(l,s)},onOpenChange:l=>{l&&o(l)},onRelease:r,...t})}function Xn(e){const n=ie(),{container:t=n.container,...a}=e;return i.createElement(wn,{container:t,...a})}const K={Root:Nt,NestedRoot:qn,Content:_t,Overlay:Pt,Trigger:hn,Portal:Xn,Handle:At,Close:Rn,Title:bn,Description:Dn},Mt=({shouldScaleBackground:e=!0,...n})=>d.jsx(K.Root,{shouldScaleBackground:e,...n});Mt.displayName="Drawer";const Gn=K.Trigger,Kn=K.Portal,It=b.forwardRef(({className:e,...n},t)=>d.jsx(K.Overlay,{ref:t,className:xe("fixed inset-0 z-50 bg-black/80",e),...n}));It.displayName=K.Overlay.displayName;const $t=b.forwardRef(({className:e,children:n,...t},a)=>d.jsxs(Kn,{children:[d.jsx(It,{}),d.jsxs(K.Content,{ref:a,className:xe("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",e),...t,children:[d.jsx("div",{className:"mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"}),n]})]}));$t.displayName="DrawerContent";const Jn=b.forwardRef(({className:e,...n},t)=>d.jsx(K.Title,{ref:t,className:xe("text-lg font-semibold leading-none tracking-tight",e),...n}));Jn.displayName=K.Title.displayName;const Zn=b.forwardRef(({className:e,...n},t)=>d.jsx(K.Description,{ref:t,className:xe("text-sm text-muted-foreground",e),...n}));Zn.displayName=K.Description.displayName;function ur(){return d.jsxs(Mt,{children:[d.jsx(Gn,{children:d.jsx("div",{className:"w-10 h-10 border border-gray-500 rounded-full p-2 focus-visible:ring-transparent",children:d.jsx("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"size-full stroke-gray-300",children:d.jsx("path",{d:"M4 6H20M4 12H20M4 18H20",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})}),d.jsxs($t,{className:"h-4/5 border-none py-10 backdrop-blur-xl bg-gray-900/30",children:[d.jsx("div",{className:"h-2 bg-gray-600 mb-4 w-20 mx-auto rounded-lg "}),d.jsx("div",{className:"w-full h-full",children:Object.keys(Qe).map(e=>{const n=Qe[e];return d.jsxs("div",{className:"sm-menu-item",children:[d.jsx(n.icon,{className:"w-5 h-5"}),d.jsx("a",{className:"whitespace-nowrap",href:n.href,target:"_self",children:n.title})]},e)})})]})]})}export{ur as default};