import {getStore} from '@netlify/blobs';
export default async function(request){
 if(request.method!=='POST')return new Response('POST only',{status:405});
 const f=await request.formData(),id=String(f.get('id')||'');
 if(!/^[a-f0-9-]{36}$/.test(id))return new Response('Invalid ID',{status:400});
 const image=f.get('image'); if(!(image instanceof Blob)||image.size>4000000||!/^image\/(png|jpeg|webp)$/.test(image.type))return new Response('Gebruik PNG, JPEG of WebP onder 4 MB',{status:400});
 const store=getStore({name:'lumio-jobs',consistency:'strong'});
 await store.set(id+'/input',await image.arrayBuffer(),{metadata:{type:image.type}});
 return Response.json({ok:true});
}
