import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Navbar from './Navbar'
import { ProductsProvider } from './ProductsContext'
import ProductListPage from './pages/ProductListPage'
import ProductFormPage from './pages/ProductFormPage'

export default function App() {
    return (
        <BrowserRouter>
            <ProductsProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/admin/products" replace />} />
                    <Route path="/admin/products" element={<ProductListPage />} />
                    <Route path="/admin/products/new" element={<ProductFormPage />} />
                    <Route
                        path="/admin/products/:id/edit"
                        element={<ProductFormPage />}
                    />
                    <Route
                        path="*"
                        element={
                            <main className="container py-4">
                                <h1>404</h1>
                                <p>Страница не найдена.</p>
                            </main>
                        }
                    />
                </Routes>
            </ProductsProvider>
        </BrowserRouter>
    )
}