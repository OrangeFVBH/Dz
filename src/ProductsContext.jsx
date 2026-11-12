import { createContext, useContext, useEffect, useState } from 'react'
import { getProducts, saveProducts } from './storage'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState(() => getProducts())

    useEffect(() => {
        saveProducts(products)
    }, [products])

    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductsContext.Provider>
    )
}

export function useProducts() {
    const ctx = useContext(ProductsContext)
    if (!ctx) {
        throw new Error('useProducts must be used within ProductsProvider')
    }
    return ctx
}