'use client';
import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'

export default function DisplayPage() {
  const [displayItems, setDisplayItems] = useState([])
  const [products, setProducts] = useState([])

  // Load products from localStorage and convert to display items
  useEffect(() => {
    const loadProductsFromStorage = () => {
      try {
        const storedProducts = localStorage.getItem('beauty_products')
        if (storedProducts) {
          const parsedProducts = JSON.parse(storedProducts)
          setProducts(parsedProducts)
          
          // Convert products to display items format
          const convertedDisplayItems = parsedProducts.map(product => ({
            id: product.id,
            title: product.name,
            description: product.description || `${product.brand} - ${product.category}`,
            image: product.image || '/api/placeholder/300/200',
            category: product.category,
            status: product.stock > 0 ? 'active' : 'inactive',
            createdDate: new Date().toLocaleDateString('id-ID', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            }),
            views: Math.floor(Math.random() * 300) + 50, // Random views for demo
            brand: product.brand,
            price: product.price,
            stock: product.stock
          }))
          
          setDisplayItems(convertedDisplayItems)
        }
      } catch (error) {
        console.error('Error loading products:', error)
      }
    }

    // Load initially
    loadProductsFromStorage()

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'beauty_products') {
        loadProductsFromStorage()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also check for changes every second (for same-tab updates)
    const interval = setInterval(loadProductsFromStorage, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="status-badge status-active">Aktif</span>
      case 'draft':
        return <span className="status-badge status-draft">Draft</span>
      case 'inactive':
        return <span className="status-badge status-inactive">Tidak Aktif</span>
      default:
        return <span className="status-badge">{status}</span>
    }
  }

  const handleDelete = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus item display ini?')) {
      try {
        // Remove from products in localStorage
        const storedProducts = localStorage.getItem('beauty_products')
        if (storedProducts) {
          const parsedProducts = JSON.parse(storedProducts)
          const updatedProducts = parsedProducts.filter(product => product.id !== id)
          localStorage.setItem('beauty_products', JSON.stringify(updatedProducts))
          
          // Update local state
          setDisplayItems(displayItems.filter(item => item.id !== id))
        }
      } catch (error) {
        console.error('Error deleting item:', error)
      }
    }
  }

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    
    try {
      // Update in localStorage
      const storedProducts = localStorage.getItem('beauty_products')
      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts)
        const updatedProducts = parsedProducts.map(product => 
          product.id === id 
            ? { ...product, status: newStatus === 'active' ? 'available' : 'inactive' }
            : product
        )
        localStorage.setItem('beauty_products', JSON.stringify(updatedProducts))
        
        // Update local state
        setDisplayItems(displayItems.map(item => 
          item.id === id ? { ...item, status: newStatus } : item
        ))
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleAddNew = () => {
    // Redirect to products page to add new product
    window.location.href = '/admin/products'
  }

  return (
    <>
      <Sidebar />
      <div className="main-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Display & Showcase</h2>
          <div className="d-flex gap-2">
            <select className="form-select" style={{width: 'auto'}}>
              <option>Semua Kategori</option>
              <option>Skincare</option>
              <option>Makeup</option>
              <option>Serum</option>
              <option>Hair Care</option>
            </select>
            <select className="form-select" style={{width: 'auto'}}>
              <option>Semua Status</option>
              <option>Aktif</option>
              <option>Draft</option>
              <option>Tidak Aktif</option>
            </select>
            <button className="btn btn-primary" onClick={handleAddNew}>
              <i className="fas fa-plus me-2"></i>
              Tambah Baru
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <div className="card stats-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle mb-2 text-muted">Total Display</h6>
                    <h3 className="card-title mb-0">{displayItems.length}</h3>
                  </div>
                  <div className="stats-icon bg-primary">
                    <i className="fas fa-eye"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card stats-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle mb-2 text-muted">Aktif</h6>
                    <h3 className="card-title mb-0">
                      {displayItems.filter(item => item.status === 'active').length}
                    </h3>
                  </div>
                  <div className="stats-icon bg-success">
                    <i className="fas fa-check-circle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card stats-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle mb-2 text-muted">Tidak Aktif</h6>
                    <h3 className="card-title mb-0">
                      {displayItems.filter(item => item.status === 'inactive').length}
                    </h3>
                  </div>
                  <div className="stats-icon bg-warning">
                    <i className="fas fa-pause-circle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card stats-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle mb-2 text-muted">Total Views</h6>
                    <h3 className="card-title mb-0">
                      {displayItems.reduce((total, item) => total + item.views, 0)}
                    </h3>
                  </div>
                  <div className="stats-icon bg-info">
                    <i className="fas fa-chart-line"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Display Items Grid */}
        <div className="row">
          {displayItems.length === 0 ? (
            <div className="col-12 text-center py-5">
              <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">Belum ada produk untuk ditampilkan</h5>
              <p className="text-muted">Tambahkan produk terlebih dahulu dari halaman Kelola Produk</p>
              <button className="btn btn-primary" onClick={handleAddNew}>
                <i className="fas fa-plus me-2"></i>
                Tambah Produk Pertama
              </button>
            </div>
          ) : (
            displayItems.map((item) => (
              <div key={item.id} className="col-lg-6 col-xl-4 mb-4">
                <div className="card display-card h-100">
                  <div className="card-img-container">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="card-img-top"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200/f8f9fa/6c757d?text=Product+Image'
                      }}
                    />
                    <div className="card-img-overlay-top">
                      {getStatusBadge(item.status)}
                    </div>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <div className="mb-2">
                      <span className="badge bg-light text-dark">{item.category}</span>
                      {item.brand && (
                        <span className="badge bg-secondary ms-1">{item.brand}</span>
                      )}
                    </div>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-muted flex-grow-1">{item.description}</p>
                    
                    {item.price && (
                      <div className="price-info mb-2">
                        <strong className="text-success">
                          Rp {item.price.toLocaleString('id-ID')}
                        </strong>
                      </div>
                    )}
                    
                    {item.stock !== undefined && (
                      <div className="stock-info mb-2">
                        <small className="text-muted">Stok: </small>
                        <span className={`fw-bold ${item.stock < 50 ? 'text-warning' : 'text-success'}`}>
                          {item.stock} unit
                        </span>
                      </div>
                    )}
                    
                    <div className="card-meta mb-3">
                      <small className="text-muted">
                        <i className="fas fa-calendar me-2"></i>
                        {item.createdDate}
                      </small>
                      <small className="text-muted ms-3">
                        <i className="fas fa-eye me-2"></i>
                        {item.views} views
                      </small>
                    </div>

                    <div className="card-actions d-flex gap-2">
                      <button 
                        className={`btn btn-sm flex-fill ${
                          item.status === 'active' ? 'btn-outline-warning' : 'btn-outline-success'
                        }`}
                        onClick={() => handleToggleStatus(item.id, item.status)}
                      >
                        <i className={`fas ${
                          item.status === 'active' ? 'fa-pause' : 'fa-play'
                        } me-1`}></i>
                        {item.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                      </button>
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {displayItems.length > 0 && (
          <div className="d-flex justify-content-between align-items-center mt-4">
            <span className="text-muted">
              Menampilkan {displayItems.length} dari {displayItems.length} item
            </span>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled">
                  <span className="page-link">Previous</span>
                </li>
                <li className="page-item active">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      <style jsx>{`
        .main-content {
          margin-left: 250px;
          padding: 2rem;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .stats-card {
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .stats-card:hover {
          transform: translateY(-2px);
        }

        .stats-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }

        .display-card {
          border: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .display-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .card-img-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .card-img-top {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .display-card:hover .card-img-top {
          transform: scale(1.05);
        }

        .card-img-overlay-top {
          position: absolute;
          top: 10px;
          right: 10px;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .status-active {
          background-color: rgba(40, 167, 69, 0.9);
          color: white;
        }

        .status-draft {
          background-color: rgba(255, 193, 7, 0.9);
          color: #212529;
        }

        .status-inactive {
          background-color: rgba(108, 117, 125, 0.9);
          color: white;
        }

        .card-meta {
          border-top: 1px solid #dee2e6;
          padding-top: 0.75rem;
        }

        .card-actions .btn {
          font-size: 0.875rem;
        }

        .price-info {
          background-color: #e8f5e8;
          padding: 8px;
          border-radius: 4px;
          text-align: center;
        }

        .stock-info {
          background-color: #f8f9fa;
          padding: 6px;
          border-radius: 4px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
            padding: 1rem;
          }
          
          .card-actions {
            flex-direction: column;
          }
          
          .card-actions .btn {
            margin-bottom: 0.25rem;
          }
        }
      `}</style>
    </>
  )
}