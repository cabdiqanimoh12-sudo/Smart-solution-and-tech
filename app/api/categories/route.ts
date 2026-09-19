import { db } from '@/lib/db'
export async function GET(){return Response.json(await db.category.findMany({include:{_count:{select:{products:true}}},orderBy:{name:'asc'}}))}
