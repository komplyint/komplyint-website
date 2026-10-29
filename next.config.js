/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async headers(){ return [
    {source:'/downloads/Komplyint_Service_Documents.zip',headers:[
      {key:'Content-Type',value:'application/zip'},
      {key:'Content-Disposition',value:'attachment; filename="Komplyint_Service_Documents.zip"'},
      {key:'X-Content-Type-Options',value:'nosniff'},
    ]},
    ...['Komplyint_Palveluesite_FI.pdf','Komplyint_Service_Portfolio_EN.pdf','Komplyint_Tjanstebroschyr_SV.pdf'].map(filename=>({
      source:'/downloads/'+filename,
      headers:[
        {key:'Content-Type',value:'application/pdf'},
        {key:'Content-Disposition',value:'attachment; filename="'+filename+'"'},
        {key:'X-Content-Type-Options',value:'nosniff'},
      ],
    })),
    { source:'/:path*', headers:[
    {key:'X-Content-Type-Options',value:'nosniff'},
    {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
    {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=(), payment=()'},
    {key:'X-Frame-Options',value:'DENY'},
    {key:'Strict-Transport-Security',value:'max-age=31536000; includeSubDomains'}
  ]}] },
}
module.exports=nextConfig
