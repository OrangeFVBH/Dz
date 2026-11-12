import { Link } from 'react-router'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/admin/products">
          Админка каталога
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/admin/products">
            Каталог
          </Link>
          <Link className="nav-link" to="/admin/products/new">
            Добавить товар
          </Link>
        </div>
      </div>
    </nav>
  )
}