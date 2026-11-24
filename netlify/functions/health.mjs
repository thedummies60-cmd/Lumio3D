export default async function(){
 const token=process.env.HF_TOKEN?.trim();
 const reply=(data,status=200)=>Response.json({version:'6.6',...data},{status,headers:{'Cache-Control':'no-store'}});
 if(!token)return reply({ok:false,tokenConfigured:false,error:'HF_TOKEN ontbreekt in Netlify Functions'},503);
 try{
 const headers={Authorization:'Bearer '+token};
 const user=await fetch('https://huggingface.co/api/whoami-v2',{headers,signal:AbortSignal.timeout(8000),redirect:'error'});
 if(!user.ok)return reply({ok:false,tokenConfigured:true,authenticated:false,error:'Hugging Face tokencontrole HTTP '+user.status},503);
 const r=await fetch('https://microsoft-trellis-2.hf.space/config',{headers,signal:AbortSignal.timeout(8000),redirect:'error'});
 if(!r.ok)throw Error('TRELLIS HTTP '+r.status);
 const c=await r.json(),names=(c.dependencies||[]).map(d=>String(d.api_name).replace(/^\//,''));
 const missing=['preprocess_image','image_to_3d','extract_glb'].filter(x=>!names.includes(x));
 return reply({ok:!missing.length,tokenConfigured:true,authenticated:true,missing,gpuQuotaVerified:false},missing.length?503:200);
 }catch(e){return reply({ok:false,tokenConfigured:true,error:String(e.message)},503);}
}
