'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Product } from '@/lib/products'

type CartLine = Product & { quantity: number }
type CartContextValue = { items: CartLine[]; count: number; total: number; addItem: (product: Product, quantity?: number) => void; updateQuantity: (id: string, quantity: number) => void; removeItem: (id: string) => void }

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([])
  const [ready, setReady] = useState(false)
  useEffect(() => {
    try { const saved = window.localStorage.getItem('whatbytes-cart'); if (saved) setItems(JSON.parse(saved)) } catch {}
    setReady(true)
  }, [])
  useEffect(() => { if (ready) window.localStorage.setItem('whatbytes-cart', JSON.stringify(items)) }, [items, ready])
  const value = useMemo(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    addItem: (product: Product, quantity = 1) => setItems((current) => { const existing = current.find((item) => item.id === product.id); return existing ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { ...product, quantity }] }),
    updateQuantity: (id: string, quantity: number) => setItems((current) => quantity > 0 ? current.map((item) => item.id === id ? { ...item, quantity } : item) : current.filter((item) => item.id !== id)),
    removeItem: (id: string) => setItems((current) => current.filter((item) => item.id !== id)),
  }), [items])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() { const context = useContext(CartContext); if (!context) throw new Error('useCart must be used inside CartProvider'); return context }
