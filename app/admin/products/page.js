'use client'
import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'

export default function ProductsPage() {
  const [showModal, setShowModal] = useState(false)
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    expiryDate: '',
    stock: '',
    description: ''
  })

  // Load products from localStorage on component mount
  useEffect(() => {
    const loadProducts = () => {
      try {
        const storedProducts = localStorage.getItem('beauty_products')
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts))
        } else {
          // Initialize with mock data if no stored products
          const mockProducts = [
            {
              id: 1,
              name: 'Power Bright Expert Serum',
              category: 'Skincare',
              brand: 'Hanasui',
              price: 22000,
              expiryDate: '2025-12-15',
              stock: 156,
              sold: 45,
              status: 'available',
              image: '/images/serum-hanasui.jpg',
              description: 'Serum yang membantu meningkatkan tingkat kecerahan kulit 3x lebih baik* serta melembapkan'
            },
            {
              id: 2,
              name: 'Moisturizer Shooting Skinditioner 200ml',
              category: 'Skincare',
              brand: 'GLAMAZING',
              price: 56000,
              expiryDate: '2024-08-30',
              stock: 0,
              sold: 123,
              status: 'out_of_stock',
              image: '/images/moisturizer-glamazing-200.jpg',
              description: 'Glamazing multipurpose soothing skinditioner membantu melembabkan ,mencerahkan,dan menutrisi kulit wajah sehingga kulit tampak lebih lembut,halus,cerah,dan sehat.'
            },
            {
              id: 3,
              name: 'Ultimate Whitening Face Wash 100g',
              category: 'Skincare',
              brand: 'Hada labo',
              price: 25000,
              expiryDate: '2026-03-20',
              stock: 89,
              sold: 67,
              status: 'available',
              image: '/images/facewash-hadalabo.jpg',
              description: 'Untuk membersihkan pori-pori dan wajah'
            },
            {
              id: 4,
              name: 'OMG Bright Booster Sunscreen SPF 50+',
              category: 'Skincare',
              brand: 'OMG',
              price: 20000,
              expiryDate: '2025-11-10',
              stock: 234,
              sold: 89,
              status: 'available',
              image: '/images/sunscreen.jpg',
              description: 'Tabir surya dengan perlindungan maksimal'
            },
            {
              id: 5,
              name: 'EMINA Lip Mask 9gr',
              category: 'Skincare',
              brand: 'EMINA',
              price: 30000,
              expiryDate: '2025-07-05',
              stock: 45,
              sold: 34,
              status: 'low_stock',
              image: '/images/lipmask-emina.jpg',
              description: 'Lip Mask Emina memiliki fungsi melembabkan bibir, membantu mengangkat sel kulit mati, dan membuat bibir tampak lebih sehat dan kenyal'
            },
            {
              id: 6,
              name: 'Glad2Glow Pomegranate Niacinamide Brightening Toner Whitening 80 ml',
              category: 'Skincare',
              brand: 'Glad2Glow',
              price: 45000,
              expiryDate: '2025-09-18',
              stock: 78,
              sold: 56,
              status: 'available',
              image: '/images/toner-g2g.jpg',
              description: 'Mencerahkan Dan Meratakan Warna Kulit'
            }
          ]
          setProducts(mockProducts)
          localStorage.setItem('beauty_products', JSON.stringify(mockProducts))
        }
      } catch (error) {
        console.error('Error loading products:', error)
      }
    }

    loadProducts()
  }, [])

  // Save products to localStorage whenever products change
  const saveProductsToStorage = (updatedProducts) => {
    try {
      localStorage.setItem('beauty_products', JSON.stringify(updatedProducts))
      setProducts(updatedProducts)
    } catch (error) {
      console.error('Error saving products:', error)
    }
  }

  const getStatusBadge = (status, stock) => {
    if (status === 'out_of_stock' || stock === 0) {
      return <span className="badge bg-danger">Habis</span>
    } else if (status === 'low_stock' || stock < 50) {
      return <span className="badge bg-warning">Stok Rendah</span>
    } else {
      return <span className="badge bg-success">Tersedia</span>
    }
  }

  const getExpiryStatus = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) {
      return { status: 'expired', text: 'Kadaluarsa', class: 'text-danger' }
    } else if (diffDays <= 30) {
      return { status: 'expiring-soon', text: `${diffDays} hari lagi`, class: 'text-warning' }
    } else {
      return { status: 'fresh', text: `${diffDays} hari lagi`, class: 'text-success' }
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'available' && product.status === 'available' && product.stock > 0) ||
                         (selectedStatus === 'low_stock' && (product.status === 'low_stock' || product.stock < 50)) ||
                         (selectedStatus === 'out_of_stock' && (product.status === 'out_of_stock' || product.stock === 0))
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      expiryDate: product.expiryDate,
      stock: product.stock,
      description: product.description
    })
    setShowModal(true)
  }

  const handleDelete = (productId) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      const updatedProducts = products.filter(p => p.id !== productId)
      saveProductsToStorage(updatedProducts)
    }
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveProduct = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.brand || !formData.category || !formData.price || !formData.stock) {
      alert('Mohon lengkapi semua field yang wajib diisi!')
      return
    }

    const stock = parseInt(formData.stock)
    const price = parseInt(formData.price)

    if (stock < 0 || price < 0) {
      alert('Stok dan harga tidak boleh negatif!')
      return
    }

    const productData = {
      ...formData,
      price: price,
      stock: stock,
      status: stock === 0 ? 'out_of_stock' : stock < 50 ? 'low_stock' : 'available',
      sold: editingProduct ? editingProduct.sold : 0,
      image: editingProduct ? editingProduct.image : '/images/default-product.jpg'
    }

    let updatedProducts
    if (editingProduct) {
      // Edit existing product
      updatedProducts = products.map(p => 
        p.id === editingProduct.id ? { ...p, ...productData } : p
      )
    } else {
      // Add new product
      const newId = Math.max(...products.map(p => p.id), 0) + 1
      const newProduct = {
        id: newId,
        ...productData
      }
      updatedProducts = [...products, newProduct]
    }

    saveProductsToStorage(updatedProducts)
    closeModal()
    
    // Show success message
    alert(editingProduct ? 'Produk berhasil diupdate!' : 'Produk berhasil ditambahkan!')
  }

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedStatus('all')
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingProduct(null)
    setFormData({
      name: '',
      brand: '',
      category: '',
      price: '',
      expiryDate: '',
      stock: '',
      description: ''
    })
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">
              <i className="fas fa-box me-2 text-primary"></i>
              Kelola Produk
            </h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <span className="badge bg-info fs-6 me-2">
                <i className="fas fa-cubes me-1"></i>
                {products.length} Total Produk
              </span>
              <button 
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                <i className="fas fa-plus me-1"></i>
                Tambah Produk
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">Produk Tersedia</h6>
                      <h4>{products.filter(p => p.status === 'available' && p.stock > 0).length}</h4>
                    </div>
                    <i className="fas fa-check-circle fa-2x opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card bg-warning text-dark">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">Stok Rendah</h6>
                      <h4>{products.filter(p => p.status === 'low_stock' || p.stock < 50).length}</h4>
                    </div>
                    <i className="fas fa-exclamation-triangle fa-2x opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card bg-danger text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">Stok Habis</h6>
                      <h4>{products.filter(p => p.status === 'out_of_stock' || p.stock === 0).length}</h4>
                    </div>
                    <i className="fas fa-times-circle fa-2x opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">Akan Expired</h6>
                      <h4>{products.filter(p => {
                        const expiry = getExpiryStatus(p.expiryDate)
                        return expiry.status === 'expiring-soon' || expiry.status === 'expired'
                      }).length}</h4>
                    </div>
                    <i className="fas fa-calendar-times fa-2x opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Cari Produk</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Cari nama produk atau brand..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Kategori</label>
                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">Semua Kategori</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Haircare">Haircare</option>
                    <option value="Fragrance">Fragrance</option>
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Status Stok</label>
                  <select
                    className="form-select"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">Semua Status</option>
                    <option value="available">Tersedia</option>
                    <option value="low_stock">Stok Rendah</option>
                    <option value="out_of_stock">Stok Habis</option>
                  </select>
                </div>
                <div className="col-md-2 mb-3">
                  <label className="form-label">&nbsp;</label>
                  <button
                    className="btn btn-outline-secondary d-block w-100"
                    onClick={resetFilters}
                  >
                    <i className="fas fa-undo me-1"></i>
                    Reset
                  </button>
                </div>
              </div>
              <div className="text-muted">
                Menampilkan {filteredProducts.length} dari {products.length} produk
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="card">
            <div className="card-body">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-search fa-3x text-muted mb-3"></i>
                  <h5 className="text-muted">Tidak ada produk ditemukan</h5>
                  <p className="text-muted">Coba ubah filter pencarian Anda</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th width="5%">#</th>
                        <th width="30%">Produk</th>
                        <th width="15%">Kategori</th>
                        <th width="10%">Harga</th>
                        <th width="10%">Stok</th>
                        <th width="15%">Tanggal Expired</th>
                        <th width="10%">Status</th>
                        <th width="5%">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product, index) => {
                        const expiryStatus = getExpiryStatus(product.expiryDate)
                        return (
                          <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="rounded me-3"
                                  width="50"
                                  height="50"
                                  style={{objectFit: 'cover'}}
                                />
                                <div>
                                  <h6 className="mb-1">{product.name}</h6>
                                  <small className="text-muted">{product.brand}</small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge bg-light text-dark">{product.category}</span>
                            </td>
                            <td>Rp {product.price.toLocaleString('id-ID')}</td>
                            <td>
                              <span className={`fw-bold ${product.stock === 0 ? 'text-danger' : product.stock < 50 ? 'text-warning' : 'text-success'}`}>
                                {product.stock}
                              </span>
                            </td>
                            <td>
                              <div>
                                <small className="d-block">{new Date(product.expiryDate).toLocaleDateString('id-ID')}</small>
                                <small className={expiryStatus.class}>{expiryStatus.text}</small>
                              </div>
                            </td>
                            <td>
                              {getStatusBadge(product.status, product.stock)}
                            </td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={() => handleEdit(product)}
                                  title="Edit Produk"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() => handleDelete(product.id)}
                                  title="Hapus Produk"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal for Add/Edit Product */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className={`fas ${editingProduct ? 'fa-edit' : 'fa-plus'} me-2`}></i>
                  {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <form onSubmit={handleSaveProduct}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nama Produk <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Masukkan nama produk..."
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Brand <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="brand"
                        value={formData.brand}
                        onChange={handleFormChange}
                        placeholder="Masukkan nama brand..."
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Kategori <span className="text-danger">*</span></label>
                      <select
                        className="form-select"
                        name="category"
                        value={formData.category}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Pilih Kategori</option>
                        <option value="Skincare">Skincare</option>
                        <option value="Makeup">Makeup</option>
                        <option value="Haircare">Haircare</option>
                        <option value="Fragrance">Fragrance</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Harga <span className="text-danger">*</span></label>
                      <div className="input-group">
                        <span className="input-group-text">Rp</span>
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          value={formData.price}
                          onChange={handleFormChange}
                          placeholder="0"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Stok <span className="text-danger">*</span></label>
                      <input
                        type="number"
                        className="form-control"
                        name="stock"
                        value={formData.stock}
                        onChange={handleFormChange}
                        placeholder="0"
                        min="0"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Tanggal Expired</label>
                      <input
                        type="date"
                        className="form-control"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      rows="3"
                      placeholder="Masukkan deskripsi produk..."
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    <i className="fas fa-times me-1"></i>
                    Batal
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className={`fas ${editingProduct ? 'fa-save' : 'fa-plus'} me-1`}></i>
                    {editingProduct ? 'Update Produk' : 'Tambah Produk'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}