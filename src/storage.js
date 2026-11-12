const STORAGE_KEY = 'products'

export function getProducts() {
    const data = localStorage.getItem(STORAGE_KEY)

    if (!data) {
        return []
    }

    try {
        const products = JSON.parse(data)
        return Array.isArray(products) ? products : []
    } catch {
        return []
    }
}

export function saveProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}