"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { toast } from "sonner"

interface CartItem {
  id: string
  title: string
  name: string
  sku: string
  description?: string
  price: number
  image?: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: any) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((product: any) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        toast.info("Item já está no carrinho!")
        return currentItems
      }

      toast.success("Item adicionado ao carrinho!")
      return [...currentItems, {
        id: product.id,
        title: product.title,
        name: product.name,
        sku: product.sku,
        description: product.description,
        price: product.price,
        image: product.image,
        quantity: 1
      }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
    toast.info("Item removido do carrinho")
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    toast.info("Carrinho limpo")
  }, [])

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider")
  }
  return context
}
