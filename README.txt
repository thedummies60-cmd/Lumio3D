Lumio 3D 6.5 — Netlify
Upload all files to the existing GitHub repository. Publish public/ and functions netlify/functions. Node 22.
After deploy open /.netlify/functions/health to check live API availability before starting a GPU task. A successful health check does not guarantee GPU quota or generation.
Uploads are staged in Netlify Blobs before the background request (256 KB limit). Optional HF_TOKEN is a Netlify environment variable, never in HTML. Public anonymous access may be rejected by Hugging Face.
Live GPU generation has not been verified. Netlify and HF free quotas apply. Public deployments allow visitors to consume your quotas; do not publish sensitive photos. GLB results remain in blobs until deleted.
