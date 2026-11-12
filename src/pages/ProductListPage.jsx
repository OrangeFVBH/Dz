import { Link } from 'react-router'
import { useProducts } from '../ProductsContext'

function ProductItem({ product, onDelete }) {
    return (
        <tr>
            <td>{product.name}</td>
            <td>{product.category || '—'}</td>
            <td>{product.price} ₽</td>
            <td>
                <Link
                    to={`/admin/products/${product.id}/edit`}
                    className="btn btn-sm btn-outline-primary me-2"
                >
                    Редактировать
                </Link>
                <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(product.id)}
                >
                    Удалить
                </button>
            </td>
        </tr>
    )
}

export default function ProductListPage() {
    const { products, setProducts } = useProducts()

    function handleDelete(id) {
        const product = products.find((p) => p.id === id)
        const name = product ? product.name : 'товар'
        if (!window.confirm(`Удалить «${name}»?`)) {
            return
        }
        setProducts((current) => current.filter((p) => p.id !== id))
    }

    return (
        <main className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Каталог товаров</h1>
                <Link to="/admin/products/new" className="btn btn-primary">
                    Добавить товар
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="alert alert-info" role="status">
                    Каталог пуст. Добавьте первый товар.
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">Название</th>
                                <th scope="col">Категория</th>
                                <th scope="col">Цена</th>
                                <th scope="col">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <ProductItem
                                    key={product.id}
                                    product={product}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    )
}