import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useProducts } from '../ProductsContext'

const EMPTY_FORM = {
    name: '',
    price: '',
    category: '',
    description: '',
}

export default function ProductFormPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { products, setProducts } = useProducts()

    const isEditMode = Boolean(id)
    const existingProduct = isEditMode
        ? products.find((p) => p.id === id)
        : null

    const [form, setForm] = useState(() => {
        if (existingProduct) {
            return {
                name: existingProduct.name ?? '',
                price: String(existingProduct.price ?? ''),
                category: existingProduct.category ?? '',
                description: existingProduct.description ?? '',
            }
        }
        return EMPTY_FORM
    })

    const [error, setError] = useState('')

    if (isEditMode && !existingProduct) {
        return (
            <main className="container py-4">
                <div className="alert alert-danger" role="alert">
                    Товар не найден.
                </div>
                <Link to="/admin/products" className="btn btn-secondary">
                    Вернуться к каталогу
                </Link>
            </main>
        )
    }

    function handleChange(event) {
        const { name, value } = event.target
        setForm((current) => ({ ...current, [name]: value }))
    }

    function handleSubmit(event) {
        event.preventDefault()

        const name = form.name.trim()
        const priceRaw = form.price.trim()

        if (!name || !priceRaw) {
            setError('Заполните название и цену.')
            return
        }

        const price = Number(priceRaw)
        if (Number.isNaN(price) || price < 0) {
            setError('Цена должна быть неотрицательным числом.')
            return
        }

        setError('')

        const payload = {
            name,
            price,
            category: form.category.trim(),
            description: form.description.trim(),
        }

        if (isEditMode) {
            setProducts((current) =>
                current.map((product) =>
                    product.id === id ? { ...product, ...payload } : product,
                ),
            )
        } else {
            const newProduct = {
                id: crypto.randomUUID(),
                ...payload,
            }
            setProducts((current) => [...current, newProduct])
        }

        navigate('/admin/products')
    }

    const title = isEditMode ? 'Редактирование товара' : 'Новый товар'

    return (
        <main className="container py-4">
            <h1 className="mb-4">{title}</h1>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                noValidate
                style={{ maxWidth: '640px' }}
            >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Название товара <span className="text-danger">*</span>
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="price" className="form-label">
                            Цена, ₽ <span className="text-danger">*</span>
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            min="0"
                            className="form-control"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="category" className="form-label">
                            Категория
                        </label>
                        <input
                            id="category"
                            name="category"
                            type="text"
                            className="form-control"
                            value={form.category}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Описание
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        rows="4"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                        {isEditMode ? 'Сохранить изменения' : 'Добавить товар'}
                    </button>
                    <Link to="/admin/products" className="btn btn-secondary">
                        Отмена
                    </Link>
                </div>
            </form>
        </main>
    )
}