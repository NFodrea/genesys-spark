import{g as t}from"./p-9031eb6a.js";function n(){return(n,e)=>{const{connectedCallback:s,disconnectedCallback:c}=n;let i;n.connectedCallback=function(){const n=t(this);return i=new ResizeObserver(this[e].bind(this)),i.observe(n),s&&s.call(this)},n.disconnectedCallback=function(){return i&&i.disconnect(),c&&c.call(this)}}}export{n as O}