import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const db = new PrismaClient()
const categories = ['Laptops','Mobile Phones','Tablets','Computer Accessories','Phone Accessories','Chargers','Headphones','Keyboards','Mice','Storage Devices','Other Electronics']
async function main() {
  const categoryMap: Record<string,string> = {}
  for (const name of categories) { const c = await db.category.upsert({ where:{slug:name.toLowerCase().replaceAll(' ','-')}, update:{}, create:{name,slug:name.toLowerCase().replaceAll(' ','-')} }); categoryMap[name] = c.id }
  const products = [
    {name:'Lenovo ThinkPad E14 Gen 5', brand:'Lenovo', category:'Laptops', price:699, discountPrice:649, image:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900', description:'Reliable performance for work, study and business.', specifications:{Processor:'Intel Core i5', RAM:'16GB', Storage:'512GB SSD', Display:'14-inch FHD'}},
    {name:'Samsung Galaxy S24', brand:'Samsung', category:'Mobile Phones', price:899, discountPrice:849, image:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900', description:'A flagship phone with an exceptional camera and bright display.', specifications:{Display:'6.2-inch AMOLED', Storage:'256GB', Camera:'50MP', Battery:'4000mAh'}},
    {name:'JBL Tune 770NC Headphones', brand:'JBL', category:'Headphones', price:89, discountPrice:69, image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900', description:'Immersive sound with active noise cancellation.', specifications:{Battery:'70 hours', Connectivity:'Bluetooth 5.3', Feature:'Noise cancellation'}},
    {name:'Logitech MX Master 3S', brand:'Logitech', category:'Mice', price:99, discountPrice:null, image:'https://images.unsplash.com/photo-1527814050087-3793815479db?w=900', description:'Precision wireless mouse built for productivity.', specifications:{DPI:'8000', Connectivity:'Bluetooth / USB', Buttons:'7'}}
  ]
  for (const p of products) { const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g,'-'); await db.product.upsert({where:{slug},update:{},create:{...p,slug,categoryId:categoryMap[p.category],stock:25,featured:true,images:{create:{url:p.image,alt:p.name}}}}) }
  const passwordHash = await bcrypt.hash('ChangeMe123!', 12)
  await db.user.upsert({where:{email:'admin@smartsolution.tech'},update:{},create:{name:'Store Admin',email:'admin@smartsolution.tech',passwordHash,role:'ADMIN'}})
}
main().finally(() => db.$disconnect())
