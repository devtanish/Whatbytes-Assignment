export type Product = {
  id: string
  title: string
  category: string
  price: number
  rating: number
  description: string
  image: string
  accent: string
}

export const products: Product[] = [
  { id: '1', title: 'Premium Wireless Headphones', category: 'Electronics', price: 129.99, rating: 4.8, description: 'Immersive sound, adaptive noise cancellation, and all-day comfort in a refined wireless design.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85', accent: 'from-slate-100 to-slate-200' },
  { id: '2', title: 'Minimal Leather Backpack', category: 'Accessories', price: 89.5, rating: 4.6, description: 'A beautifully structured everyday backpack with room for your essentials and a padded laptop sleeve.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85', accent: 'from-amber-50 to-orange-100' },
  { id: '3', title: 'Ceramic Coffee Set', category: 'Home & Living', price: 44.0, rating: 4.9, description: 'A hand-finished ceramic set for slow mornings, shared tables, and everyday rituals.', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85', accent: 'from-stone-100 to-stone-200' },
  { id: '4', title: 'Classic Analog Watch', category: 'Accessories', price: 179.0, rating: 4.7, description: 'Timeless proportions and a clean face make this watch a quiet statement for every occasion.', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85', accent: 'from-zinc-100 to-zinc-200' },
  { id: '5', title: 'Everyday Running Shoes', category: 'Fashion', price: 74.99, rating: 4.5, description: 'Lightweight cushioning and breathable knit construction built for your daily miles.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85', accent: 'from-red-50 to-rose-100' },
  { id: '6', title: 'Oak Desk Lamp', category: 'Home & Living', price: 62.0, rating: 4.4, description: 'Warm, focused light with a sculptural oak base that makes any workspace feel considered.', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', accent: 'from-yellow-50 to-amber-100' },
  { id: '7', title: 'Smart Fitness Band', category: 'Electronics', price: 55.25, rating: 4.3, description: 'Track your movement, sleep, and progress with a slim band designed to disappear into your routine.', image: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?auto=format&fit=crop&w=900&q=85', accent: 'from-blue-50 to-indigo-100' },
  { id: '8', title: 'Linen Overshirt', category: 'Fashion', price: 68.0, rating: 4.6, description: 'Relaxed and breathable, this linen layer is made for easy days and changing seasons.', image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85', accent: 'from-emerald-50 to-teal-100' },
]

export const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Accessories']

export function getProduct(id: string) {
  return products.find((product) => product.id === id)
}

export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`
}
