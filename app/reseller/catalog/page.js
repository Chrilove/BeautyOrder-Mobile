'use client'

import { useAuth } from '../../components/AuthProvider'
import Sidebar from '../../components/sidebar-reseller'
import { useState, useEffect } from 'react'

export default function CatalogPage() {
  const { user, loading } = useAuth()
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')

  // Updated mock data with new products
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: 'Power Bright Expert Serum',
        category: 'Skincare',
        retailPrice: 30800, // 40% markup from wholesale
        wholesalePrice: 22000,
        commission: 40,
        stock: 156,
        image: '/images/serum-hanasui.jpg',
        brand: 'Hanasui',
        description: 'Serum yang membantu meningkatkan tingkat kecerahan kulit 3x lebih baik* serta melembabkan',
        expiryDate: '2025-12-15',
        sold: 45,
        status: 'available'
      },
      {
        id: 2,
        name: 'Moisturizer Shooting Skinditioner 200ml',
        category: 'Skincare',
        retailPrice: 78400, // 40% markup from wholesale
        wholesalePrice: 56000,
        commission: 40,
        stock: 0,
        image: '/images/moisturizer-glamazing-200.jpg',
        brand: 'GLAMAZING',
        description: 'Glamazing multipurpose soothing skinditioner membantu melembabkan ,mencerahkan,dan menutrisi kulit wajah',
        expiryDate: '2024-08-30',
        sold: 123,
        status: 'out_of_stock'
      },
      {
        id: 3,
        name: 'Ultimate Whitening Face Wash 100g',
        category: 'Skincare',
        retailPrice: 35000, // 40% markup from wholesale
        wholesalePrice: 25000,
        commission: 40,
        stock: 89,
        image: '/images/facewash-hadalabo.jpg',
        brand: 'Hada labo',
        description: 'Untuk membersihkan pori-pori dan wajah',
        expiryDate: '2026-03-20',
        sold: 67,
        status: 'available'
      },
      {
        id: 4,
        name: 'OMG Bright Booster Sunscreen SPF 50+',
        category: 'Skincare',
        retailPrice: 28000, // 40% markup from wholesale
        wholesalePrice: 20000,
        commission: 40,
        stock: 234,
        image: '/images/sunscreen.jpg',
        brand: 'OMG',
        description: 'Tabir surya dengan perlindungan maksimal',
        expiryDate: '2025-11-10',
        sold: 89,
        status: 'available'
      },
      {
        id: 5,
        name: 'EMINA Lip Mask 9gr',
        category: 'Skincare',
        retailPrice: 42000, // 40% markup from wholesale
        wholesalePrice: 30000,
        commission: 40,
        stock: 45,
        image: '/images/lipmask-emina.jpg',
        brand: 'EMINA',
        description: 'Lip Mask Emina memiliki fungsi melembabkan bibir, membantu mengangkat sel kulit mati',
        expiryDate: '2025-07-05',
        sold: 34,
        status: 'low_stock'
      },
      {
        id: 6,
        name: 'Glad2Glow Pomegranate Niacinamide Brightening Toner Whitening 80 ml',
        category: 'Skincare',
        retailPrice: 63000, // 40% markup from wholesale
        wholesalePrice: 45000,
        commission: 40,
        stock: 78,
        image: '/images/toner-g2g.jpg',
        brand: 'Glad2Glow',
        description: 'Mencerahkan Dan Meratakan Warna Kulit',
        expiryDate: '2025-09-18',
        sold: 56,
        status: 'available'
      }
    ]
    setProducts(mockProducts)
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && product.wholesalePrice < 30000) ||
                        (priceRange === 'mid' && product.wholesalePrice >= 30000 && product.wholesalePrice <= 50000) ||
                        (priceRange === 'high' && product.wholesalePrice > 50000)
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">
              <i className="fas fa-book-open me-2 text-primary"></i>
              Katalog Harga Grosir
            </h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <span className="badge bg-success fs-6">
                <i className="fas fa-box me-1"></i>
                {products.length} Produk Tersedia
              </span>
            </div>
          </div>

          {/* Filters */}
          <div className="row mb-4">
            <div className="col-md-4 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input 
                  type="text"
                  className="form-control"
                  placeholder="Cari produk atau brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <select 
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Semua Kategori</option>
                <option value="Skincare">Skincare</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <select 
                className="form-select"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="all">Semua Harga</option>
                <option value="low"> Rp 30K</option>
                <option value="mid"> Rp 30K - 50K</option>
                <option value="high"> Rp 50K</option>
              </select>
            </div>
            <div className="col-md-2 mb-3">
              <button className="btn btn-outline-secondary w-100">
                <i className="fas fa-filter me-1"></i>
                Reset
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="row">
            {filteredProducts.map(product => (
              <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 shadow border-0">
                  <div className="position-relative">
                    <img 
                      src={product.image} 
                      className="card-img-top product-image"
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200/f8f9fa/6c757d?text=Product+Image'
                      }}
                    />
                    <span className={`badge position-absolute top-0 end-0 m-2 ${
                      product.status === 'out_of_stock' ? 'bg-danger' :
                      product.status === 'low_stock' ? 'bg-warning' : 'bg-success'
                    }`}>
                      {product.status === 'out_of_stock' ? 'Habis' : 
                       product.status === 'low_stock' ? 'Stok Terbatas' : 'Tersedia'}
                    </span>
                  </div>
                  
                  <div className="card-body d-flex flex-column">
                    <div className="mb-2">
                      <span className="badge bg-light text-dark">{product.category}</span>
                      <span className="badge bg-secondary ms-1">{product.brand}</span>
                    </div>
                    
                    <h6 className="card-title">{product.name}</h6>
                    
                    <div className="pricing-info mb-3">
                      <div className="row">
                        <div className="col-6">
                          <small className="text-muted">Harga Retail:</small>
                          <div className="text-decoration-line-through text-muted">
                            Rp {product.retailPrice.toLocaleString('id-ID')}
                          </div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Harga Grosir:</small>
                          <div className="fw-bold text-success">
                            Rp {product.wholesalePrice.toLocaleString('id-ID')}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="commission-info mb-3">
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Komisi ({product.commission}%):</span>
                        <span className="fw-bold text-primary">
                          Rp {((product.retailPrice - product.wholesalePrice)).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="stock-info mb-3">
                      <small className="text-muted">Stok Tersedia: </small>
                      <span className={`fw-bold ${
                        product.stock === 0 ? 'text-danger' :
                        product.stock < 50 ? 'text-warning' : 'text-success'
                      }`}>
                        {product.stock} unit
                      </span>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="d-grid gap-2">
                        <button 
                          className="btn btn-primary btn-sm"
                          disabled={product.stock === 0}
                        >
                          <i className="fas fa-shopping-cart me-1"></i>
                          {product.stock === 0 ? 'Habis' : 'Pesan Sekarang'}
                        </button>
                        <button className="btn btn-outline-info btn-sm">
                          <i className="fas fa-eye me-1"></i>
                          Detail Produk
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-5">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">Produk tidak ditemukan</h5>
              <p className="text-muted">Coba ubah filter pencarian Anda</p>
            </div>
          )}

        </main>
      </div>

      <style jsx>{`
        .product-image {
          height: 200px;
          object-fit: cover;
        }
        
        .pricing-info {
          background-color: #f8f9fa;
          padding: 10px;
          border-radius: 5px;
        }
        
        .commission-info {
          background-color: #e3f2fd;
          padding: 8px;
          border-radius: 5px;
        }
        
        .card:hover {
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }
        
        .shadow {
          box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
        }
      `}</style>
    </div>
  )
}