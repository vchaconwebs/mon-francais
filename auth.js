/* Inicio de sesión local: usuario + contraseña guardados en este navegador (sin servidor).
   La contraseña se guarda como hash SHA-256 con sal, nunca en texto plano. */
(function(){
const USERS='monfr_users', CUR='monfr_user';
const get=k=>{ try{ return localStorage.getItem(k); }catch(e){ return null; } };
const set=(k,v)=>{ try{ localStorage.setItem(k,v); }catch(e){} };
const users=()=>{ try{ return JSON.parse(get(USERS)||'{}'); }catch(e){ return {}; } };

async function hash(pw,salt){
  const txt=salt+':'+pw;
  if(window.crypto&&crypto.subtle){ const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(txt)); return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join(''); }
  let h=5381; for(const c of txt) h=((h<<5)+h+c.charCodeAt(0))|0; return 'f'+(h>>>0).toString(16);
}
const norm=u=>u.trim().toLowerCase();
const CL=window.MF_CLOUD&&window.MF_CLOUD.url?{url:window.MF_CLOUD.url.replace(/\/(rest|auth)\/v1.*$/,'').replace(/\/+$/,''),key:window.MF_CLOUD.key}:null;
const mail=id=>'u'+[...new TextEncoder().encode(id)].map(b=>b.toString(16).padStart(2,'0')).join('')+'@monfrancais.com';
async function sb(path,body,tok,method){ const r=await fetch(CL.url+path,{method:method||'POST',headers:{apikey:CL.key,'Content-Type':'application/json',...(tok?{Authorization:'Bearer '+tok}:{}),Prefer:'resolution=merge-duplicates,return=representation'},body:body?JSON.stringify(body):undefined}); const j=await r.json().catch(()=>({})); if(!r.ok) throw new Error(j.msg||j.error_description||j.message||'Error '+r.status); return j; }
window.mfPush=async function(data){ if(!CL) return; try{ const s=JSON.parse(get('monfr_sess')||'null'); if(!s) return;
  if(Date.now()/1000>s.exp-60){ const n=await sb('/auth/v1/token?grant_type=refresh_token',{refresh_token:s.rt}); s.at=n.access_token; s.rt=n.refresh_token; s.exp=n.expires_at; set('monfr_sess',JSON.stringify(s)); }
  await sb('/rest/v1/progress',{user_id:s.uid,data},s.at); }catch(e){ console.warn('nube',e); } };

const cur=get(CUR);
if(cur && users()[cur]){
  window.MF_KEY='monfr_'+cur; window.MF_USER=users()[cur].name||cur;
  window.mfLogout=()=>{ try{ localStorage.removeItem(CUR); localStorage.removeItem('monfr_sess'); }catch(e){} location.hash='#/'; location.reload(); };
  return;
}

/* sin sesión: mostrar pantalla de acceso y bloquear la app */
window.MF_BLOCK=true;
const css=`.auth{position:fixed;inset:0;z-index:200;display:grid;grid-template-columns:1.1fr 1fr;background:var(--bg)}
.auth-art{position:relative;overflow:hidden;background:linear-gradient(135deg,#1d3bb5,#5b3fd6 55%,#c8305a);color:#fff;padding:56px;display:flex;flex-direction:column;justify-content:space-between}
.auth-art::before{content:"";position:absolute;width:520px;height:520px;right:-180px;top:-180px;border-radius:50%;background:#ffffff14}
.auth-art::after{content:"🥐 🗼 🧀 🥖 🍷";position:absolute;left:56px;bottom:120px;font-size:2.4rem;letter-spacing:.3em;opacity:.35}
.auth-art h1{color:#fff;font-size:3.2rem;max-width:480px;position:relative}
.auth-art p{opacity:.9;max-width:440px;font-size:1.1rem;position:relative}
.auth-box{display:grid;place-items:center;padding:30px}
.auth-card{width:100%;max-width:380px}
.auth-card h2{font-size:2rem;margin:0 0 4px}
.auth-tabs{display:grid;grid-template-columns:1fr 1fr;background:var(--bg2);padding:5px;border-radius:14px;margin:22px 0}
.auth-tabs button{border:0;background:none;padding:10px;border-radius:10px;font:inherit;font-weight:700;color:var(--muted);cursor:pointer}
.auth-tabs button.on{background:var(--panel);color:var(--ink);box-shadow:var(--sh)}
.auth label{display:block;font-weight:600;font-size:.88rem;margin:14px 0 6px}
.auth input{width:100%;font:inherit;padding:12px 14px;border:1.5px solid var(--line);border-radius:12px;background:var(--panel);color:var(--ink);outline:none}
.auth input:focus{border-color:var(--blue);box-shadow:0 0 0 4px color-mix(in srgb,var(--blue) 18%,transparent)}
.auth .btn{width:100%;justify-content:center;margin-top:22px;padding:13px}
.auth-err{color:var(--red);font-weight:600;font-size:.9rem;min-height:1.3em;margin-top:10px}
.auth-users{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.auth-users button{border:1px solid var(--line);background:var(--panel);color:var(--ink);border-radius:999px;padding:4px 12px;cursor:pointer;font:inherit;font-size:.85rem}
@media(max-width:860px){.auth{grid-template-columns:1fr;overflow:auto}.auth-art{padding:30px 22px}.auth-art h1{font-size:2rem}.auth-art::after{display:none}}`;
document.head.insertAdjacentHTML('beforeend','<style>'+css+'</style>');

function render(mode){
  const us=users(), names=Object.keys(us);
  if(!mode) mode=names.length?'login':'signup';
  let el=document.querySelector('.auth');
  if(!el){ el=document.createElement('div'); el.className='auth'; document.body.appendChild(el); }
  el.innerHTML=`<div class="auth-art"><a class="brand" style="color:#fff">Mon <b style="color:#fff">Français</b></a>
  <div><h1>Bienvenue ! Tu curso de francés desde cero.</h1><p>Entra con tu usuario para guardar tu progreso, tus puntos y tus textos.</p></div><small style="opacity:.7;position:relative">A1 → A2 → B1 → B2</small></div>
  <div class="auth-box"><form class="auth-card" autocomplete="on">
  <h2>${mode==='login'?'Iniciar sesión':'Crear cuenta'}</h2><p class="muted">${mode==='login'?'Bon retour ! Te echábamos de menos.':'Solo un usuario y una contraseña. Sin correo.'}</p>
  <div class="auth-tabs"><button type="button" data-m="login" class="${mode==='login'?'on':''}">Entrar</button><button type="button" data-m="signup" class="${mode==='signup'?'on':''}">Crear cuenta</button></div>
  ${mode==='login'&&names.length?`<div class="muted" style="font-size:.85rem">Usuarios en este navegador:</div><div class="auth-users">${names.map(n=>`<button type="button" data-u="${n}">👤 ${us[n].name||n}</button>`).join('')}</div>`:''}
  <label for="au">Usuario</label><input id="au" name="username" autocomplete="username" required maxlength="30">
  <label for="ap">Contraseña</label><input id="ap" name="password" type="password" autocomplete="${mode==='login'?'current-password':'new-password'}" required>
  ${mode==='signup'?'<label for="ap2">Repite la contraseña</label><input id="ap2" type="password" autocomplete="new-password" required>':''}
  <div class="auth-err" id="aerr"></div>
  <button class="btn" type="submit">${mode==='login'?'Entrar →':'Crear cuenta y empezar →'}</button>
  <p class="muted" style="font-size:.8rem;margin-top:16px">☁️ Tu progreso se guarda en la nube: entra desde cualquier dispositivo con tu usuario. La sesión queda abierta hasta que pulses «Salir».</p>
  </form></div>`;
  el.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>render(b.dataset.m));
  el.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>{ el.querySelector('#au').value=us[b.dataset.u].name||b.dataset.u; el.querySelector('#ap').focus(); });
  const err=t=>el.querySelector('#aerr').textContent=t;
  el.querySelector('form').onsubmit=async e=>{
    e.preventDefault();
    const name=el.querySelector('#au').value.trim(), id=norm(name), pw=el.querySelector('#ap').value;
    if(!/^[\wÀ-ÿ.\- ]{2,30}$/.test(name)) return err('El usuario debe tener entre 2 y 30 letras o números.');
    const all=users();
    if(CL){
      if(mode==='signup'&&pw!==el.querySelector('#ap2').value) return err('Las contraseñas no coinciden.');
      if(pw.length<6) return err('La contraseña debe tener al menos 6 caracteres.');
      err('Conectando…');
      try{
        let t;
        if(mode==='signup'){ t=await sb('/auth/v1/signup',{email:mail(id),password:pw,data:{name}}); if(!t.access_token) return err('Desactiva «Confirm email» en Supabase.'); }
        else t=await sb('/auth/v1/token?grant_type=password',{email:mail(id),password:pw});
        set('monfr_sess',JSON.stringify({at:t.access_token,rt:t.refresh_token,exp:t.expires_at,uid:t.user.id}));
        const rows=await sb('/rest/v1/progress?select=data&user_id=eq.'+t.user.id,null,t.access_token,'GET');
        if(rows[0]&&rows[0].data) set('monfr_'+id,JSON.stringify(rows[0].data));
        all[id]={name,cloud:1}; set(USERS,JSON.stringify(all)); set(CUR,id); location.reload();
      }catch(x){ err(/invalid login|credentials/i.test(x.message)?'Usuario o contraseña incorrectos.':/registered|exists/i.test(x.message)?'Ese usuario ya existe.':x.message); }
      return;
    }
    if(mode==='signup'){
      if(all[id]) return err('Ese usuario ya existe. Elige otro o entra.');
      if(pw.length<4) return err('La contraseña debe tener al menos 4 caracteres.');
      if(pw!==el.querySelector('#ap2').value) return err('Las contraseñas no coinciden.');
      const salt=Math.random().toString(36).slice(2)+Date.now().toString(36);
      all[id]={name,salt,h:await hash(pw,salt),created:Date.now()};
      set(USERS,JSON.stringify(all));
      const old=get('monfr'); if(old && Object.keys(all).length===1){ set('monfr_'+id,old); }
    } else {
      if(!all[id] || all[id].h!==await hash(pw,all[id].salt)) return err('Usuario o contraseña incorrectos.');
    }
    set(CUR,id); location.reload();
  };
  setTimeout(()=>el.querySelector('#au').focus(),50);
}
document.addEventListener('DOMContentLoaded',()=>render());
})();
