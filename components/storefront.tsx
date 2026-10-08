'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Search, ShoppingCart, Star, Plus, Minus, Trash2, Check } from 'lucide-react'
import { categories, formatPrice, getProduct, products, type Product } from '@/lib/products'
import { useCart } from '@/components/cart-provider'

const blue = '#075db8'

function Header({ query = '', onQueryChange }: { query?: string; onQueryChange?: (value: string) => void }) {
  const { count } = useCart()
  return <header className="site-header"><Link href="/" className="logo">Logo</Link><label className="header-search"><Search /><span className="sr-only">Search products</span><input aria-label="Search products" value={query} onChange={(event) => onQueryChange?.(event.target.value)} placeholder="Search for products..." /></label><Link href="/cart" className="cart-button" aria-label={`Cart with ${count} items`}><ShoppingCart /> Cart{count > 0 && <b>{count}</b>}</Link></header>
}

function Footer() {
  return <footer className="site-footer"><div><h3>Filters</h3><p>All</p><p>Electronics</p><p>© 2024 American</p></div><div><h3>About Us</h3><p>About Us</p><p>Contact</p></div><div><h3>Follow Us</h3><div className="socials"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Twitter">t</a><a href="#" aria-label="Instagram">ig</a></div></div></footer>
}

function Stars({ rating }: { rating: number }) { return <span className="stars" aria-label={`${rating} out of 5 stars`}>{[1,2,3,4,5].map((star) => <Star key={star} fill={star <= Math.round(rating) ? 'currentColor' : 'none'} />)}</span> }

function FilterPanel({ category, setCategory, maxPrice, setMaxPrice }: { category: string; setCategory: (v: string) => void; maxPrice: number; setMaxPrice: (v: number) => void }) {
  return <aside className="filters"><div className="filter-primary"><h2>Filters</h2><fieldset><legend>Category</legend>{['All', 'Electronics', 'Clothing', 'Home'].map((item) => <label key={item}><input type="radio" name="category" checked={category === item} onChange={() => setCategory(item)} />{item}</label>)}</fieldset><fieldset><legend>Price</legend><input aria-label="Maximum price" type="range" min="0" max="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} /><div className="range-labels"><span>0</span><span>{maxPrice}</span></div></fieldset></div><div className="filter-secondary"><h3>Category</h3>{['All', 'Electronics', 'Clothing', 'Home'].map((item) => <label key={item}><input type="radio" name="secondary-category" checked={category === item} onChange={() => setCategory(item)} />{item}</label>)}<label className="price-input">Price<input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} /></label></div></aside>
}

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart(); const [added, setAdded] = useState(false)
  const add = () => { addItem(product); setAdded(true); window.setTimeout(() => setAdded(false), 1000) }
  return <article className="product-card"><Link href={`/product/${product.id}`} className="product-image"><img src={product.image} alt={product.title} /></Link><h3><Link href={`/product/${product.id}`}>{product.title}</Link></h3><p className="price">{formatPrice(product.price)}</p><button onClick={add} aria-label={`Add ${product.title} to cart`}>{added ? <Check /> : null} Add to Cart</button></article>
}

export function HomePage() {
  const [query, setQuery] = useState(''); const [category, setCategory] = useState('All'); const [maxPrice, setMaxPrice] = useState(1000)
  const filtered = useMemo(() => products.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()) && (category === 'All' || p.category === category) && p.price <= maxPrice), [query, category, maxPrice])
  return <><Header query={query} onQueryChange={setQuery} /><main className="store-main"><FilterPanel category={category} setCategory={setCategory} maxPrice={maxPrice} setMaxPrice={setMaxPrice} /><section className="listing"><h1>Product Listing</h1><label className="mobile-search"><Search /><input aria-label="Search products" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for products..." /></label><div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div></section></main><Footer /></>
}

export function ProductPage({ id }: { id: string }) {
  const product = getProduct(id); const { addItem } = useCart(); const [quantity, setQuantity] = useState(1)
  if (!product) return <><Header /><main className="empty-page"><h1>Product not found</h1><Link href="/">Back to shop</Link></main></>
  return <><Header /><main className="detail-page"><Link href="/" className="back-link">← Back to products</Link><div className="detail-layout"><div className="detail-image"><img src={product.image} alt={product.title} /></div><div><p className="eyebrow">{product.category}</p><h1>{product.title}</h1><p className="detail-price">{formatPrice(product.price)}</p><Stars rating={product.rating} /><p className="description">{product.description}</p><div className="quantity"><button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}><Plus /></button></div><button className="primary-action" onClick={() => addItem(product, quantity)}>Add to Cart</button></div></div></main><Footer /></>
}

export function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart()
  return <><Header /><main className="cart-page"><h1>Your cart</h1>{items.length === 0 ? <div className="empty-page"><p>Your cart is empty.</p><Link href="/">Continue shopping</Link></div> : <div className="cart-layout"><div>{items.map((item) => <div className="cart-row" key={item.id}><img src={item.image} alt={item.title} /><div><h2>{item.title}</h2><p>{formatPrice(item.price)}</p><div className="quantity"><button aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus /></button><span>{item.quantity}</span><button aria-label="Increase quantity" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus /></button></div></div><button aria-label={`Remove ${item.title}`} onClick={() => removeItem(item.id)}><Trash2 /></button></div>)}</div><aside className="summary"><h2>Order Summary</h2><p>Total <strong>{formatPrice(total)}</strong></p><button className="primary-action">Checkout</button></aside></div>}</main><Footer /></>
}

export { blue }
