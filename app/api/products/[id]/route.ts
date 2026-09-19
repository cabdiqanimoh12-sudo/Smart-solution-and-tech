import { db } from '@/lib/db'
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const p=await db.product.findUnique({where:{id},include:{images:true,category:true}});return p?Response.json(p):Response.json({error:'Not found'},{status:404})}
