const reasons=["You make ordinary days feel special.","Your laugh is completely contagious.","You show up with your whole heart.","You make people feel seen.","You are braver than you know.","You find magic in little things.","You are always, wonderfully you.","Your kindness has its own glow.","Every story is better with you in it.","The world is lucky to have you."];
const photos=[
 {src:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85",alt:"Best friends laughing together outdoors",caption:"My favorite kind of day"},
 {src:"https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=85",alt:"A group of friends celebrating together",caption:"Always better together"},
 {src:"https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=85",alt:"Friends sharing a happy moment",caption:"The little moments"},
 {src:"https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=85",alt:"Close friends enjoying a meal together",caption:"A table full of stories"},
 {src:"https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=85",alt:"Best friends enjoying time together",caption:"My person, my best friend"},
 {src:"https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=85",alt:"Friends sharing a joyful moment",caption:"More memories with you"}
];
const storageKey="shifa-birthday-details";
const details={name:"Shifa",signature:"Your person",date:""};
const dialog=document.getElementById("edit-dialog");
const dateInput=document.getElementById("date-input");
let galleryIndex=0,touchStartX=0,toastTimer;

function applyDetails(){
 document.querySelectorAll("[data-name]").forEach(el=>el.textContent=details.name);
 document.querySelectorAll("[data-signature]").forEach(el=>el.textContent=details.signature);
 const title=document.getElementById("hero-title");title.replaceChildren(document.createTextNode("Happy birthday,"),document.createElement("br"));
 const name=document.createElement("em");name.textContent=`dear ${details.name}.`;title.append(name);
 document.querySelector(".closing-signature").textContent=`Happy birthday, ${details.name}. Always cheering for you.`;
 document.title=`Happy Birthday, ${details.name}`;dateInput.value=details.date;updateCounter();
}
function updateCounter(){
 const number=document.getElementById("days-count"),caption=document.getElementById("days-caption");
 if(!details.date){number.textContent="—";caption.textContent="Set your special date with Edit details";return;}
 const start=new Date(`${details.date}T00:00:00`),today=new Date();today.setHours(0,0,0,0);
 if(Number.isNaN(start.getTime())||start>today){number.textContent="—";caption.textContent="Choose a date in the past";return;}
 number.textContent=Math.floor((today-start)/86400000).toLocaleString();
 caption.textContent=`Since ${start.toLocaleDateString(undefined,{month:"long",day:"numeric",year:"numeric"})}`;
}
function toast(message){const element=document.getElementById("toast");element.textContent=message;element.classList.add("is-visible");clearTimeout(toastTimer);toastTimer=setTimeout(()=>element.classList.remove("is-visible"),2200);}
function buildReasons(){
 const grid=document.getElementById("reasons-grid");
 reasons.forEach((reason,index)=>{const card=document.createElement("button");card.type="button";card.className="reason-card";card.setAttribute("aria-label",`Reveal reason ${index+1}`);card.setAttribute("aria-pressed","false");
  card.innerHTML=`<span class="reason-card-inner"><span class="reason-face reason-front"><span class="reason-number">${String(index+1).padStart(2,"0")}</span><span class="reason-sparkle" aria-hidden="true">✳</span><span class="reason-tap">tap to reveal</span></span><span class="reason-face reason-back"><span class="reason-text"></span></span></span>`;card.querySelector(".reason-text").textContent=reason;
  card.addEventListener("click",()=>{const flipped=card.classList.toggle("is-flipped");card.setAttribute("aria-pressed",String(flipped));card.setAttribute("aria-label",flipped?`Reason ${index+1}: ${reason}`:`Reveal reason ${index+1}`);});grid.append(card);
 });
}
function buildGallery(){
 const track=document.getElementById("gallery-track");photos.forEach((photo,index)=>{const card=document.createElement("button");card.type="button";card.className="gallery-card";card.setAttribute("aria-label",`Open photo ${index+1}: ${photo.caption}`);
  const image=document.createElement("img");image.src=photo.src;image.alt=photo.alt;image.loading="lazy";const caption=document.createElement("span");caption.textContent=photo.caption;card.append(image,caption);card.addEventListener("click",()=>openViewer(index));track.append(card);});
}
function scrollGallery(direction){const track=document.getElementById("gallery-track"),card=track.querySelector(".gallery-card");track.scrollBy({left:direction*((card?.getBoundingClientRect().width||235)+22),behavior:"smooth"});}
function openViewer(index){galleryIndex=(index+photos.length)%photos.length;const photo=photos[galleryIndex],viewer=document.getElementById("lightbox");document.getElementById("lightbox-image").src=photo.src.replace("w=900","w=1400");document.getElementById("lightbox-image").alt=photo.alt;document.getElementById("lightbox-caption").textContent=photo.caption;viewer.classList.add("is-open");viewer.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";document.getElementById("lightbox-close").focus();}
function closeViewer(){const viewer=document.getElementById("lightbox");viewer.classList.remove("is-open");viewer.setAttribute("aria-hidden","true");document.body.style.overflow="";}
function burstLove(){
 const bounds=document.getElementById("send-love").getBoundingClientRect(),colors=["#f3c5b6","#e4b96d","#e99ca0","#fff0d9","#b9c39f"];
 for(let i=0;i<28;i++){const heart=document.createElement("span");heart.className="heart-burst";heart.textContent=Math.random()>.26?"♥":"✳";heart.style.setProperty("--x",`${bounds.left+bounds.width/2+(Math.random()-.5)*100}px`);heart.style.setProperty("--y",`${bounds.top+bounds.height/2}px`);heart.style.setProperty("--size",`${10+Math.random()*18}px`);heart.style.setProperty("--drift",`${(Math.random()-.5)*180}px`);heart.style.setProperty("--spin",`${(Math.random()-.5)*100}deg`);heart.style.setProperty("--heart-color",colors[i%colors.length]);document.body.append(heart);heart.addEventListener("animationend",()=>heart.remove(),{once:true});}
 toast("Best-friend magic, just for you ♥");
}
function setupFullscreen(){const button=document.getElementById("fullscreen");button.addEventListener("click",async()=>{try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen();}catch{toast("Fullscreen isn't available in this browser.");}});document.addEventListener("fullscreenchange",()=>{const active=Boolean(document.fullscreenElement);button.setAttribute("aria-label",active?"Exit fullscreen":"Enter fullscreen");button.querySelector(".fullscreen-label").textContent=active?"Exit full screen":"Full screen";});}
function setupThreeHearts(){
 const canvas=document.getElementById("heart-field");if(!window.THREE||!canvas)return;
 const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(45,1,.1,100);camera.position.z=16;
 let renderer;try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});}catch{return;}renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7));
 const shape=new THREE.Shape();shape.moveTo(0,-.28);shape.bezierCurveTo(-.05,-.02,-.58,.31,-.54,.67);shape.bezierCurveTo(-.49,1.03,-.03,1.02,0,.73);shape.bezierCurveTo(.03,1.02,.49,1.03,.54,.67);shape.bezierCurveTo(.58,.31,.05,-.02,0,-.28);
 const geometry=new THREE.ShapeGeometry(shape),palette=["#f2c3b5","#dfaa76","#e99da4","#f8e1cf"],hearts=[];
 for(let i=0,count=innerWidth<700?48:92;i<count;i++){const material=new THREE.MeshBasicMaterial({color:palette[i%palette.length],transparent:true,opacity:.24+Math.random()*.48,side:THREE.DoubleSide}),mesh=new THREE.Mesh(geometry,material);mesh.position.set((Math.random()-.5)*20,(Math.random()-.5)*12,(Math.random()-.5)*5);mesh.scale.setScalar(.09+Math.random()*.2);mesh.rotation.z=Math.random()*Math.PI;scene.add(mesh);hearts.push({mesh,x:mesh.position.x,y:mesh.position.y,phase:Math.random()*Math.PI*2,speed:.15+Math.random()*.34});}
 const resize=()=>{const rect=canvas.getBoundingClientRect();renderer.setSize(Math.max(1,rect.width),Math.max(1,rect.height),false);camera.aspect=rect.width/Math.max(1,rect.height);camera.position.z=innerWidth<700?20:16;camera.updateProjectionMatrix();};let pointerX=0,pointerY=0;
 canvas.addEventListener("pointermove",event=>{const rect=canvas.getBoundingClientRect();pointerX=((event.clientX-rect.left)/rect.width-.5)*2;pointerY=((event.clientY-rect.top)/rect.height-.5)*2;});canvas.addEventListener("pointerleave",()=>{pointerX=0;pointerY=0;});window.addEventListener("resize",resize);resize();const clock=new THREE.Clock();
 function animate(){if(document.hidden){requestAnimationFrame(animate);return;}const time=reduced?0:clock.getElapsedTime();hearts.forEach(({mesh,x,y,phase,speed})=>{mesh.position.x=x+pointerX*(.17+mesh.position.z*.02);mesh.position.y=y+(reduced?0:Math.sin(time*speed+phase)*.26)-pointerY*.14;if(!reduced)mesh.rotation.z+=Math.sin(time*.5+phase)*.0008;});renderer.render(scene,camera);requestAnimationFrame(animate);}animate();
}
function setup(){
 document.getElementById("edit-open").addEventListener("click",()=>dialog.showModal());
 document.getElementById("details-form").addEventListener("submit",event=>{event.preventDefault();const form=event.currentTarget;details.name=form.elements.name.value.trim()||"Shifa";details.signature=form.elements.signature.value.trim()||"Your person";details.date=dateInput.value;localStorage.setItem(storageKey,JSON.stringify(details));applyDetails();dialog.close();toast("Your little details are saved.");});
 document.getElementById("envelope").addEventListener("click",event=>{const button=event.currentTarget,open=button.classList.toggle("is-open");button.setAttribute("aria-expanded",String(open));button.setAttribute("aria-label",open?"Close your birthday letter":"Open your birthday letter");});
 document.getElementById("gallery-prev").addEventListener("click",()=>scrollGallery(-1));document.getElementById("gallery-next").addEventListener("click",()=>scrollGallery(1));document.getElementById("lightbox-close").addEventListener("click",closeViewer);document.getElementById("lightbox-prev").addEventListener("click",()=>openViewer(galleryIndex-1));document.getElementById("lightbox-next").addEventListener("click",()=>openViewer(galleryIndex+1));document.getElementById("lightbox").addEventListener("click",event=>{if(event.target.id==="lightbox")closeViewer();});
 document.getElementById("lightbox").addEventListener("touchstart",event=>{touchStartX=event.changedTouches[0].screenX;},{passive:true});document.getElementById("lightbox").addEventListener("touchend",event=>{const delta=event.changedTouches[0].screenX-touchStartX;if(Math.abs(delta)>45)openViewer(galleryIndex+(delta>0?-1:1));},{passive:true});document.addEventListener("keydown",event=>{if(!document.getElementById("lightbox").classList.contains("is-open"))return;if(event.key==="Escape")closeViewer();if(event.key==="ArrowLeft")openViewer(galleryIndex-1);if(event.key==="ArrowRight")openViewer(galleryIndex+1);});
 document.getElementById("send-love").addEventListener("click",burstLove);setupFullscreen();
}
try{const saved=JSON.parse(localStorage.getItem(storageKey)||"null");if(saved&&typeof saved==="object"){if(typeof saved.name==="string")details.name=saved.name;if(typeof saved.signature==="string")details.signature=saved.signature;if(typeof saved.date==="string")details.date=saved.date;}}catch{}
buildReasons();buildGallery();applyDetails();setup();setupThreeHearts();
