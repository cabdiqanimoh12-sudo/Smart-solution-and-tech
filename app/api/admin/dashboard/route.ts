import { db } from '@/lib/db'
export async function GET(){const [products,orders,repairs,customers]=await Promise.all([db.product.count(),db.order.count(),db.repair.count(),db.user.count({where:{role:'CUSTOMER'}})]);return Response.json({products,orders,repairs,customers})}
