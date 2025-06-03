'use client'

import { useAuth } from '../../components/AuthProvider'
import Sidebar from '../../components/sidebar-reseller'
import { useState, useEffect } from 'react'

export default function ResellerOrdersPage() {
  const { user, loading } = useAuth()
  const [orders, setOrders] = useState([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [products, setProducts] = useState([])
  const [orderItems, setOrderItems] = useState([{ productId: '', qty: 1, price: 0 }])

  // Updated products data to match the provided list
  const mockProducts = [
    { id: 1, name: 'Power Bright Expert Serum', price: 22000, stock: 156, brand: 'Hanasui' },
    { id: 2, name: 'Moisturizer Shooting Skinditioner 200ml', price: 56000, stock: 0, brand: 'GLAMAZING' },
    { id: 3, name: 'Ultimate Whitening Face Wash 100g', price: 25000, stock: 89, brand: 'Hada labo' },
    { id: 4, name: 'OMG Bright Booster Sunscreen SPF 50+', price: 20000, stock: 234, brand: 'OMG' },
    { id: 5, name: 'EMINA Lip Mask 9gr', price: 30000, stock: 45, brand: 'EMINA' },
    { id: 6, name: 'Glad2Glow Pomegranate Niacinamide Brightening Toner Whitening 80 ml', price: 45000, stock: 78, brand: 'Glad2Glow' }
  ]

  // Mock data - replace with API call
  useEffect(() => {
    const mockOrders = [
      {
        id: 'ORD001',
        date: '2025-05-31',
        products: [
          { name: 'Power Bright Expert Serum', qty: 5, price: 22000 },
          { name: 'Moisturizer Shooting Skinditioner 200ml', qty: 3, price: 56000 }
        ],
        totalAmount: 278000,
        status: 'pending',
        paymentStatus: 'waiting_payment',
        paymentMethod: '',
        paymentProof: '',
        notes: 'Untuk stok toko',
        adminMessage: ''
      },
      {
        id: 'ORD002',
        date: '2025-05-30',
        products: [
          { name: 'OMG Bright Booster Sunscreen SPF 50+', qty: 10, price: 20000 }
        ],
        totalAmount: 200000,
        status: 'pending',
        paymentStatus: 'waiting_verification',
        paymentMethod: 'Transfer Bank',
        paymentProof: 'bukti_transfer_002.jpg',
        notes: 'Urgent - untuk pre-order customer',
        adminMessage: 'Pembayaran sedang diverifikasi admin'
      },
      {
        id: 'ORD003',
        date: '2025-05-29',
        products: [
          { name: 'Ultimate Whitening Face Wash 100g', qty: 8, price: 25000 },
          { name: 'Glad2Glow Pomegranate Niacinamide Brightening Toner Whitening 80 ml', qty: 6, price: 45000 }
        ],
        totalAmount: 470000,
        status: 'ready_to_ship',
        paymentStatus: 'verified',
        paymentMethod: 'Transfer Bank',
        paymentProof: 'bukti_transfer_003.jpg',
        notes: '',
        adminMessage: 'Pembayaran telah diverifikasi. Pesanan siap dikirim.'
      }
    ]
    setOrders(mockOrders)
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'bg-warning text-dark', text: 'Menunggu Konfirmasi' },
      approved: { class: 'bg-info', text: 'Dikonfirmasi' },
      ready_to_ship: { class: 'bg-primary', text: 'Siap Dikirim' },
      shipped: { class: 'bg-success', text: 'Dikirim' },
      delivered: { class: 'bg-success', text: 'Diterima' },
      cancelled: { class: 'bg-danger', text: 'Dibatalkan' }
    }
    return statusConfig[status] || { class: 'bg-secondary', text: status }
  }

  const getPaymentBadge = (status) => {
    const statusConfig = {
      waiting_payment: { class: 'bg-danger', text: 'Belum Bayar' },
      waiting_verification: { class: 'bg-warning text-dark', text: 'Menunggu Verifikasi' },
      verified: { class: 'bg-success', text: 'Terverifikasi' },
      rejected: { class: 'bg-danger', text: 'Ditolak' }
    }
    return statusConfig[status] || { class: 'bg-secondary', text: status }
  }

  const filteredOrders = orders.filter(order => 
    statusFilter === 'all' || order.status === statusFilter
  )

  const addOrderItem = () => {
    setOrderItems([...orderItems, { productId: '', qty: 1, price: 0 }])
  }

  const removeOrderItem = (index) => {
    const newItems = orderItems.filter((_, i) => i !== index)
    setOrderItems(newItems)
  }

  const updateOrderItem = (index, field, value) => {
    const newItems = [...orderItems]
    newItems[index][field] = value
    
    if (field === 'productId') {
      const product = products.find(p => p.id == value)
      newItems[index].price = product ? product.price : 0
    }
    
    setOrderItems(newItems)
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      return total + (item.qty * item.price)
    }, 0)
  }

  const handleSubmitOrder = (e) => {
    e.preventDefault()
    const total = calculateTotal()
    
    if (total === 0) {
      alert('Pilih produk terlebih dahulu!')
      return
    }

    // Create new order
    const newOrder = {
      id: 'ORD' + String(orders.length + 1).padStart(3, '0'),
      date: new Date().toISOString().split('T')[0],
      products: orderItems.map(item => {
        const product = products.find(p => p.id == item.productId)
        return {
          name: product?.name || '',
          qty: item.qty,
          price: item.price
        }
      }).filter(p => p.name),
      totalAmount: total,
      status: 'pending',
      paymentStatus: 'waiting_payment',
      paymentMethod: '',
      paymentProof: '',
      notes: document.querySelector('textarea[name="notes"]')?.value || '',
      adminMessage: ''
    }

    setOrders([newOrder, ...orders])
    setShowOrderForm(false)
    setOrderItems([{ productId: '', qty: 1, price: 0 }])
    
    alert('Pesanan berhasil dibuat! Silakan lakukan pembayaran untuk melanjutkan proses.')
  }

  const handlePayment = (order) => {
    setSelectedOrder(order)
    setShowPaymentModal(true)
  }

  const handleSubmitPayment = (e) => {
    e.preventDefault()
    const paymentMethod = e.target.paymentMethod.value
    const paymentProof = e.target.paymentProof.files[0]
    
    if (!paymentMethod) {
      alert('Pilih metode pembayaran!')
      return
    }

    // Update order payment status - now waiting for admin verification
    const updatedOrders = orders.map(order => {
      if (order.id === selectedOrder.id) {
        return {
          ...order,
          paymentStatus: 'waiting_verification',
          paymentMethod: paymentMethod,
          paymentProof: paymentProof ? paymentProof.name : 'bukti_transfer_' + order.id.toLowerCase() + '.jpg',
          adminMessage: 'Bukti pembayaran telah dikirim. Menunggu verifikasi dari admin.'
        }
      }
      return order
    })

    setOrders(updatedOrders)
    setShowPaymentModal(false)
    setSelectedOrder(null)
    
    alert('Bukti pembayaran berhasil dikirim! Admin akan memverifikasi pembayaran Anda dalam 1x24 jam.')
  }

  const unpaidOrders = orders.filter(o => o.paymentStatus === 'waiting_payment').length;
  const waitingVerification = orders.filter(o => o.paymentStatus === 'waiting_verification').length;

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">
              <i className="fas fa-shopping-cart me-2 text-primary"></i>
              Pesanan Saya
            </h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <button 
                className="btn btn-primary"
                onClick={() => setShowOrderForm(!showOrderForm)}
              >
                <i className="fas fa-plus me-1"></i>
                Buat Pesanan Baru
              </button>
            </div>
          </div>

          {/* Notification for unpaid orders */}
          {unpaidOrders > 0 && (
            <div className="alert alert-warning" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              Anda memiliki <strong>{unpaidOrders}</strong> pesanan yang belum dibayar. Silakan lakukan pembayaran untuk melanjutkan proses.
            </div>
          )}

          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card text-center bg-warning text-white">
                <div className="card-body">
                  <i className="fas fa-clock fa-2x mb-2"></i>
                  <h4>{orders.filter(o => o.status === 'pending').length}</h4>
                  <small>Menunggu Konfirmasi</small>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card text-center bg-danger text-white">
                <div className="card-body">
                  <i className="fas fa-credit-card fa-2x mb-2"></i>
                  <h4>{unpaidOrders}</h4>
                  <small>Belum Bayar</small>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card text-center bg-info text-white">
                <div className="card-body">
                  <i className="fas fa-eye fa-2x mb-2"></i>
                  <h4>{waitingVerification}</h4>
                  <small>Menunggu Verifikasi</small>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card text-center bg-primary text-white">
                <div className="card-body">
                  <i className="fas fa-truck fa-2x mb-2"></i>
                  <h4>{orders.filter(o => o.status === 'ready_to_ship').length}</h4>
                  <small>Siap Dikirim</small>
                </div>
              </div>
            </div>
          </div>

          {/* New Order Form */}
          {showOrderForm && (
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="fas fa-plus me-2"></i>
                  Buat Pesanan Baru
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmitOrder}>
                  <div className="mb-3">
                    <label className="form-label">Produk</label>
                    {orderItems.map((item, index) => (
                      <div key={index} className="row mb-2">
                        <div className="col-md-5">
                          <select 
                            className="form-select"
                            value={item.productId}
                            onChange={(e) => updateOrderItem(index, 'productId', e.target.value)}
                            required
                          >
                            <option value="">Pilih Produk</option>
                            {products.map(product => (
                              <option key={product.id} value={product.id}>
                                {product.name} - Rp {product.price.toLocaleString('id-ID')} (Stok: {product.stock})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-2">
                          <input 
                            type="number" 
                            className="form-control" 
                            placeholder="Qty"
                            min="1"
                            value={item.qty}
                            onChange={(e) => updateOrderItem(index, 'qty', parseInt(e.target.value) || 1)}
                            required
                          />
                        </div>
                        <div className="col-md-3">
                          <input 
                            type="text" 
                            className="form-control" 
                            value={`Rp ${(item.qty * item.price).toLocaleString('id-ID')}`}
                            readOnly
                          />
                        </div>
                        <div className="col-md-2">
                          {orderItems.length > 1 && (
                            <button 
                              type="button" 
                              className="btn btn-danger btn-sm"
                              onClick={() => removeOrderItem(index)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <button 
                      type="button" 
                      className="btn btn-outline-primary btn-sm mt-2"
                      onClick={addOrderItem}
                    >
                      <i className="fas fa-plus me-1"></i>
                      Tambah Produk
                    </button>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Catatan (Opsional)</label>
                    <textarea 
                      className="form-control" 
                      name="notes"
                      rows="3"
                      placeholder="Catatan untuk pesanan ini..."
                    ></textarea>
                  </div>

                  <div className="row">
                    <div className="col-md-8">
                      <div className="alert alert-info">
                        <strong>Total Pesanan: Rp {calculateTotal().toLocaleString('id-ID')}</strong>
                      </div>
                    </div>
                    <div className="col-md-4 text-end">
                      <button type="button" className="btn btn-secondary me-2" onClick={() => setShowOrderForm(false)}>
                        Batal
                      </button>
                      <button type="submit" className="btn btn-primary">
                        <i className="fas fa-save me-1"></i>
                        Buat Pesanan
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Filter */}
          <div className="row mb-3">
            <div className="col-md-4">
              <select 
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="pending">Menunggu Konfirmasi</option>
                <option value="approved">Dikonfirmasi</option>
                <option value="ready_to_ship">Siap Dikirim</option>
                <option value="shipped">Dikirim</option>
                <option value="delivered">Diterima</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="card shadow">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>ID Pesanan</th>
                      <th>Tanggal</th>
                      <th>Produk</th>
                      <th>Total</th>
                      <th>Status Pesanan</th>
                      <th>Status Bayar</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => {
                      const statusBadge = getStatusBadge(order.status);
                      const paymentBadge = getPaymentBadge(order.paymentStatus);
                      
                      return (
                        <tr key={order.id}>
                          <td><strong>{order.id}</strong></td>
                          <td>{new Date(order.date).toLocaleDateString('id-ID')}</td>
                          <td>
                            {order.products.map((product, idx) => (
                              <div key={idx} className="mb-1">
                                <small>
                                  <strong>{product.name}</strong><br/>
                                  Qty: {product.qty} × Rp {product.price.toLocaleString('id-ID')}
                                </small>
                              </div>
                            ))}
                          </td>
                          <td><strong className="text-success">Rp {order.totalAmount.toLocaleString('id-ID')}</strong></td>
                          <td>
                            <span className={`badge ${statusBadge.class}`}>
                              {statusBadge.text}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${paymentBadge.class}`}>
                              {paymentBadge.text}
                            </span>
                            {order.paymentMethod && (
                              <small className="d-block text-muted mt-1">
                                via {order.paymentMethod}
                              </small>
                            )}
                          </td>
                          <td>
                            <div className="btn-group-vertical btn-group-sm">
                              {/* Payment button for unpaid orders */}
                              {order.paymentStatus === 'waiting_payment' && (
                                <button 
                                  className="btn btn-success btn-sm mb-1"
                                  onClick={() => handlePayment(order)}
                                >
                                  <i className="fas fa-credit-card me-1"></i>Bayar
                                </button>
                              )}
                              
                              {/* Show admin message if exists */}
                              {order.adminMessage && (
                                <button 
                                  className="btn btn-info btn-sm mb-1"
                                  onClick={() => alert(order.adminMessage)}
                                >
                                  <i className="fas fa-comment me-1"></i>Pesan Admin
                                </button>
                              )}
                              
                              <button 
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => console.log('View order details:', order)}
                              >
                                <i className="fas fa-eye me-1"></i>Detail
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Payment Modal */}
          {showPaymentModal && selectedOrder && (
            <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header bg-success text-white">
                    <h5 className="modal-title">
                      <i className="fas fa-credit-card me-2"></i>
                      Pembayaran Pesanan - {selectedOrder.id}
                    </h5>
                    <button 
                      type="button" 
                      className="btn-close btn-close-white"
                      onClick={() => setShowPaymentModal(false)}
                    ></button>
                  </div>
                  <form onSubmit={handleSubmitPayment}>
                    <div className="modal-body">
                      {/* Order Summary */}
                      <div className="card mb-4">
                        <div className="card-header bg-light">
                          <h6 className="mb-0">Ringkasan Pesanan</h6>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <table className="table table-sm">
                                <tbody>
                                <tr><td>ID Pesanan:</td><td><strong>{selectedOrder.id}</strong></td></tr>
                                <tr><td>Tanggal:</td><td>{new Date(selectedOrder.date).toLocaleDateString('id-ID')}</td></tr>
                                <tr><td>Total Bayar:</td><td><strong className="text-success">Rp {selectedOrder.totalAmount.toLocaleString('id-ID')}</strong></td></tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="col-md-6">
                              <h6>Produk:</h6>
                              <ul className="list-unstyled">
                                {selectedOrder.products.map((product, idx) => (
                                  <li key={idx} className="mb-1">
                                    <small>
                                      <strong>{product.name}</strong><br/>
                                      {product.qty} × Rp {product.price.toLocaleString('id-ID')} = 
                                      <span className="text-success"> Rp {(product.qty * product.price).toLocaleString('id-ID')}</span>
                                    </small>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Payment Information */}
                      <div className="card mb-4">
                        <div className="card-header bg-info text-white">
                          <h6 className="mb-0">Informasi Pembayaran</h6>
                        </div>
                        <div className="card-body">
                          <div className="alert alert-info">
                            <h6><i className="fas fa-university me-2"></i>Transfer Bank</h6>
                            <p className="mb-1"><strong>Bank BCA</strong></p>
                            <p className="mb-1">No. Rekening: <strong>1234567890</strong></p>
                            <p className="mb-1">Atas Nama: <strong>CV. Beauty Care Indonesia</strong></p>
                            <p className="mb-0">Jumlah: <strong className="text-danger">Rp {selectedOrder.totalAmount.toLocaleString('id-ID')}</strong></p>
                          </div>
                          
                          <div className="alert alert-warning">
                            <h6><i className="fas fa-wallet me-2"></i>E-Wallet</h6>
                            <p className="mb-1"><strong>OVO / DANA / GoPay</strong></p>
                            <p className="mb-1">No. HP: <strong>081234567890</strong></p>
                            <p className="mb-0">Atas Nama: <strong>Beauty Care Indonesia</strong></p>
                          </div>
                        </div>
                      </div>

                      {/* Payment Form */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Metode Pembayaran *</label>
                            <select className="form-select" name="paymentMethod" required>
                              <option value="">Pilih Metode Pembayaran</option>
                              <option value="Transfer Bank">Transfer Bank</option>
                              <option value="E-Wallet">E-Wallet</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Upload Bukti Pembayaran *</label>
                            <input 
                              type="file" 
                              className="form-control" 
                              name="paymentProof"
                              accept="image/*"
                              required
                            />
                            <small className="text-muted">Format: JPG, PNG, PDF (Max 5MB)</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowPaymentModal(false)}>
                        Batal
                      </button>
                      <button type="submit" className="btn btn-success">
                        <i className="fas fa-upload me-1"></i>
                        Kirim Bukti Pembayaran
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}