(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=i(e);fetch(e.href,n)}})();async function f(t=""){return(await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImE4NzU2YjJiLTQ5ZTYtNGRjZC1hNWZhLTNjNjIwYzhhYTQzOCIsInNsdWciOiJvd2x5LWRlbW8iLCJlbWFpbCI6InBhYmxvQG93bHkuY29tLmNvIiwidXNlcl9pZCI6IjZiMTUzMjg3LWY1OGUtNGYzNS1hNDMxLTU5ZGUwMzI0NThhZiIsImV4cCI6MTg1NTM0MDkyOSwiY3JlYXRlZCI6MTY5NzY2MDkyOX0.8PxqI9P17dIWTf7_3QWOkmx2voPWyu9ahDQCJX_2xN6g5k6_Lr-tSsSiI6yaqXGxVx4lEmuTy6Z0y9smEgeJzA"}})).json()}const g=(t,o=0)=>{if(t=new Intl.NumberFormat("es-ES").format(parseFloat(t).toFixed(o)),o>0){const i=t.indexOf(",")>-1?t.length-1-t.indexOf(","):0;t=i==0?t+","+"0".repeat(o):t+"0".repeat(o-i)}return t},I=t=>{if(t.includes("_")){const o=t.split("_");return o.forEach((i,r,e)=>{e[r]=i[0].toUpperCase()+i.slice(1)}),o.join(" ")}return"Proyecto "+t[0].toUpperCase()+t.slice(1)},T=t=>{const[o,i]=t.split("-");return`${["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][i-1]} de ${o}`},u=t=>{let o;return t.every(i=>i.availability==="sold")?t.forEach((i,r)=>{r===0&&(o=i.precio_final),i.precio_final<o&&(o=i.precio_final)}):t.forEach((i,r)=>{i.availability!=="sold"&&!o&&(o=i.precio_final),i.availability!=="sold"&&i.precio_final<=o&&(o=i.precio_final)}),`${g(o)}`},d=(t,o)=>{let i,r;return t.every(e=>e.availability==="sold")?t.forEach((e,n)=>{n===0&&(i=e[o],r=e[o]),e[o]<i&&(i=e[o]),e[o]>r&&(r=e[o])}):t.forEach(e=>{e.availability!=="sold"&&!i&&(i=e[o]),e.availability!=="sold"&&!r&&(r=e[o]),e.availability!=="sold"&&e[o]<i&&(i=e[o]),e.availability!=="sold"&&e[o]>r&&(r=e[o])}),i===r?`${r} m²`:`${i} a ${r} m²`},p=(t,o)=>{let i=[];if(t.every(e=>e.availability==="sold")?t.forEach((e,n)=>{n===0&&i.push(e[o]),i.includes(e[o])||i.push(e[o])}):t.forEach((e,n)=>{e.availability!=="sold"&&!i.includes(e[o])&&i.push(e[o])}),i.length===1)return i[0];i.sort((e,n)=>e-n);const r=i.pop();return i.join(", ")+" y "+r},y=window.location.pathname;if(y==="/"){const t=document.getElementById("tower-type"),o=document.getElementById("total-towers"),i=document.getElementById("deadline"),r=document.getElementById("total-properties"),e=document.getElementById("minimum-price"),n=document.getElementById("areas"),c=document.getElementById("bedrooms"),l=document.getElementById("bathrooms");f("https://inventario.api.vecindariosuite.com/api_public/v1/proyectos/owly-demo/torres").then(s=>{t&&(t.innerHTML=I(s[0].tipo_de_torre)),o&&(o.innerHTML=s.length),i&&(i.innerHTML=T(s[0].fecha_de_entrega)),console.log(s)}),f("https://inventario.api.vecindariosuite.com/api_public/v1/proyectos/owly-demo/torres/58b4ea62-681d-46f1-adf0-b125997e38fc/inmuebles").then(s=>{r&&(r.innerHTML=s.length),e&&(e.innerHTML=u(s)),n&&(n.innerHTML=d(s,"area_construida")),c&&(c.innerHTML=p(s,"alcobas")),l&&(l.innerHTML=p(s,"banos"))})}else{const t=y.split("/")[2];if(t){const[o,i]=t.split("-");if(o==="tipo"){const r=document.getElementById("type-name"),e=document.getElementById("type-min-price"),n=document.getElementById("built-area"),c=document.getElementById("private-area"),l=document.getElementById("type-bedrooms"),s=document.getElementById("type-bathrooms");f("https://inventario.api.vecindariosuite.com/api_public/v1/proyectos/owly-demo/torres/58b4ea62-681d-46f1-adf0-b125997e38fc/inmuebles").then(h=>{const a=[];h.forEach(m=>{m.tipo.toUpperCase()===i.toUpperCase()&&a.push(m)}),r&&a.length&&(r.innerHTML=`Tipo ${a[0].tipo}`),e&&(e.innerHTML=u(a)),n&&(n.innerHTML=d(a,"area_construida")),c&&(c.innerHTML=d(a,"area_privada")),l&&(l.innerHTML=p(a,"alcobas")),s&&(s.innerHTML=p(a,"banos"))})}}}
