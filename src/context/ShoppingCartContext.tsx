import { createContext, ReactNode, useContext, useState } from "react"

type ShoppingCartProviderProps ={
  children:ReactNode
}
type StoreItemProps = {
  id: number,
  name: string,
  price: number,
  imgUrl: string,
}

type cartItemsProps = {
  id: number,
  name: string,
  price: number,
  imgUrl: string,
  quantity: number,
}
type ShoppingCartContextProps ={
  getItemQuantity: (id: number) => number,
  increaseCartQuantity: (el: StoreItemProps) => void,
  decreaseCartQuantity: (id: number) => void,
  removeFromCart: (id: number) => void,
  cartQuantity: number,
  cartItems: cartItemsProps[],
  cartTotal: number
}
const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider = ({children}: ShoppingCartProviderProps) => {

  const [cartItems , setCartItems] = useState<cartItemsProps[]>([])

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const getItemQuantity  = (id: number) =>{
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  const increaseCartQuantity = (el: StoreItemProps) =>{
    setCartItems(currItems => {
      if (!currItems.find(item => item.id === el.id)) {
        return [...currItems, { ...el , quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === el.id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  
  const decreaseCartQuantity = (id: number) =>{
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  
  const removeFromCart = (id: number) =>{
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  const cartTotal = cartItems.reduce(
    (quantity, item) => (item.quantity * item.price) + quantity,
    0
  )

  return (
    <ShoppingCartContext.Provider value={{
      getItemQuantity,
      increaseCartQuantity,
      decreaseCartQuantity,
      removeFromCart,
      cartQuantity,
      cartItems,
      cartTotal
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}