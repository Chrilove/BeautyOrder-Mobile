'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Simulate getting orders from database/API
  useEffect(() => {
    // This would be replaced with actual API call
    const mockOrders = [
      {
        id: '#ORD001',
        reseller: 'Sari Beauty Store',
        email: 'sari@beauty.com',
        date: '2025-05-31',
        products: [
          { name: 'Serum Vitamin C Premium', qty: 5, price: 125000 },
          { name: 'Moisturizer Night Cream', qty: 3, price: 162500 }
        ],
        totalAmount: 1112500,
        status: 'pending',
        paymentStatus: 'waiting_payment',
        paymentMethod: '',
        paymentProof: '',
        notes: 'Untuk stok toko'
      },
      {
        id: '#ORD002',
        reseller: 'Cantik Cosmetics',
        email: 'cantik@cosmet.com',
        date: '2025-05-30',
        products: [
          { name: 'Sunscreen SPF 50+', qty: 10, price: 97500 }
        ],
        totalAmount: 975000,
        status: 'approved',
        paymentStatus: 'waiting_verification',
        paymentMethod: 'Transfer Bank',
        paymentProof: 'bukti_transfer_002.jpg',
        notes: 'Urgent - untuk pre-order customer'
      },
      {
        id: '#ORD003',
        reseller: 'Glowing Skin Shop',
        email: 'glow@skin.com',
        date: '2025-05-29',
        products: [
          { name: 'Face Wash Gentle Clean', qty: 8, price: 61250 },
          { name: 'Toner Brightening', qty: 6, price: 82500 }
        ],
        totalAmount: 985000,
        status: 'ready_to_ship',
        paymentStatus: 'verified',
        paymentMethod: 'Transfer Bank',
        paymentProof: 'bukti_transfer_003.jpg',
        notes: ''
      },
      {
        id: '#ORD004',
        reseller: 'Natural Beauty Co',
        email: 'natural@beauty.co',
        date: '2025-05-28',
        products: [
          { name: 'Toner Brightening', qty: 4, price: 82500 }
        ],
        totalAmount: 330000,
        status: 'shipped',
        paymentStatus: 'verified',
        paymentMethod: 'E-Wallet',
        paymentProof: 'bukti_ewallet_004.jpg',
        notes: ''
      }
    ];
    setOrders(mockOrders);
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'bg-warning text-dark', text: 'Pending' },
      approved: { class: 'bg-info text-white', text: 'Disetujui' },
      ready_to_ship: { class: 'bg-primary text-white', text: 'Siap Kirim' },
      shipped: { class: 'bg-success text-white', text: 'Dikirim' },
      cancelled: { class: 'bg-danger text-white', text: 'Dibatalkan' }
    };
    return statusConfig[status] || { class: 'bg-secondary text-white', text: status };
  };

  const getPaymentBadge = (status) => {
    const statusConfig = {
      waiting_payment: { class: 'bg-warning text-dark', text: 'Menunggu Pembayaran' },
      waiting_verification: { class: 'bg-info text-white', text: 'Menunggu Verifikasi' },
      verified: { class: 'bg-success text-white', text: 'Terverifikasi' },
      rejected: { class: 'bg-danger text-white', text: 'Ditolak' }
    };
    return statusConfig[status] || { class: 'bg-secondary text-white', text: status };
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    console.log(`Order ${orderId} status changed to ${newStatus}`);
  };

  const handlePaymentVerification = (orderId, action) => {
    const newPaymentStatus = action === 'approve' ? 'verified' : 'rejected';
    const newOrderStatus = action === 'approve' ? 'ready_to_ship' : 'pending';
    
    setOrders(orders.map(order => 
      order.id === orderId ? { 
        ...order, 
        paymentStatus: newPaymentStatus,
        status: newOrderStatus
      } : order
    ));
    
    // Here you would also send notification to reseller
    console.log(`Payment for order ${orderId} ${action === 'approve' ? 'approved' : 'rejected'}`);
    alert(`Pembayaran pesanan ${orderId} telah ${action === 'approve' ? 'diverifikasi' : 'ditolak'}. Reseller akan mendapat notifikasi.`);
  };

  const handleViewPaymentProof = (order) => {
    setSelectedOrder(order);
    setShowPaymentModal(true);
  };

  const filteredOrders = orders.filter(order => 
    statusFilter === 'all' || order.status === statusFilter
  );

  const pendingPayments = orders.filter(o => o.paymentStatus === 'waiting_verification').length;

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">
              <i className="fas fa-shopping-cart me-2 text-primary"></i>
              Daftar Pemesanan
            </h1>
            {pendingPayments > 0 && (
              <div className="alert alert-warning alert-sm mb-0 py-2">
                <i className="fas fa-exclamation-triangle me-1"></i>
                {pendingPayments} pembayaran menunggu verifikasi
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <div className="card text-center bg-warning text-white">
                <div className="card-body py-3">
                  <i className="fas fa-clock fa-2x mb-2"></i>
                  <h4>{orders.filter(o => o.status === 'pending').length}</h4>
                  <small>Pending</small>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card text-center bg-info text-white">
                <div className="card-body py-3">
                  <i className="fas fa-credit-card fa-2x mb-2"></i>
                  <h4>{orders.filter(o => o.paymentStatus === 'waiting_verification').length}</h4>
                  <small>Verifikasi Bayar</small>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card text-center bg-primary text-white">
                <div className="card-body py-3">
                  <i className="fas fa-truck fa-2x mb-2"></i>
                  <h4>{orders.filter(o => o.status === 'ready_to_ship').length}</h4>
                  <small>Siap Kirim</small>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card text-center bg-success text-white">
                <div className="card-body py-3">
                  <i className="fas fa-check-circle fa-2x mb-2"></i>
                  <h4>{orders.filter(o => o.status === 'shipped').length}</h4>
                  <small>Dikirim</small>
                </div>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="row mb-3">
            <div className="col-md-4">
              <select 
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Disetujui</option>
                <option value="ready_to_ship">Siap Kirim</option>
                <option value="shipped">Dikirim</option>
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
                      <th>Reseller</th>
                      <th>Email</th>
                      <th>Tanggal</th>
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
                          <td>{order.reseller}</td>
                          <td>{order.email}</td>
                          <td>{new Date(order.date).toLocaleDateString('id-ID')}</td>
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
                              <button 
                                className="btn btn-outline-primary btn-sm mb-1"
                                onClick={() => console.log('View details:', order.id)}
                              >
                                <i className="fas fa-eye me-1"></i>Detail
                              </button>
                              
                              {/* Payment verification buttons */}
                              {order.paymentStatus === 'waiting_verification' && (
                                <>
                                  <button 
                                    className="btn btn-info btn-sm mb-1"
                                    onClick={() => handleViewPaymentProof(order)}
                                  >
                                    <i className="fas fa-receipt me-1"></i>Lihat Bukti
                                  </button>
                                  <button 
                                    className="btn btn-success btn-sm mb-1"
                                    onClick={() => handlePaymentVerification(order.id, 'approve')}
                                  >
                                    <i className="fas fa-check me-1"></i>Verifikasi
                                  </button>
                                  <button 
                                    className="btn btn-danger btn-sm mb-1"
                                    onClick={() => handlePaymentVerification(order.id, 'reject')}
                                  >
                                    <i className="fas fa-times me-1"></i>Tolak
                                  </button>
                                </>
                              )}
                              
                              {/* Order status change buttons */}
                              {order.status === 'pending' && order.paymentStatus !== 'waiting_verification' && (
                                <button 
                                  className="btn btn-warning btn-sm mb-1"
                                  onClick={() => handleStatusChange(order.id, 'approved')}
                                >
                                  <i className="fas fa-check me-1"></i>Setujui
                                </button>
                              )}
                              {order.status === 'ready_to_ship' && (
                                <button 
                                  className="btn btn-primary btn-sm mb-1"
                                  onClick={() => handleStatusChange(order.id, 'shipped')}
                                >
                                  <i className="fas fa-truck me-1"></i>Kirim
                                </button>
                              )}
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

          {/* Payment Proof Modal */}
          {showPaymentModal && selectedOrder && (
            <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header bg-info text-white">
                    <h5 className="modal-title">
                      <i className="fas fa-receipt me-2"></i>
                      Bukti Pembayaran - {selectedOrder.id}
                    </h5>
                    <button 
                      type="button" 
                      className="btn-close btn-close-white"
                      onClick={() => setShowPaymentModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h6>Detail Pesanan:</h6>
                        <table className="table table-sm">
                          <tr><td>ID Pesanan:</td><td><strong>{selectedOrder.id}</strong></td></tr>
                          <tr><td>Reseller:</td><td>{selectedOrder.reseller}</td></tr>
                          <tr><td>Email:</td><td>{selectedOrder.email}</td></tr>
                          <tr><td>Tanggal:</td><td>{new Date(selectedOrder.date).toLocaleDateString('id-ID')}</td></tr>
                          <tr><td>Total:</td><td><strong className="text-success">Rp {selectedOrder.totalAmount.toLocaleString('id-ID')}</strong></td></tr>
                          <tr><td>Metode Bayar:</td><td>{selectedOrder.paymentMethod}</td></tr>
                        </table>
                      </div>
                      <div className="col-md-6">
                        <h6>Produk yang Dipesan:</h6>
                        <ul className="list-unstyled">
                          {selectedOrder.products.map((product, idx) => (
                            <li key={idx} className="mb-2 p-2 bg-light rounded">
                              <strong>{product.name}</strong><br/>
                              <small>Jumlah: {product.qty} | Harga: Rp {product.price.toLocaleString('id-ID')}</small><br/>
                              <small className="text-success">Subtotal: Rp {(product.qty * product.price).toLocaleString('id-ID')}</small>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <hr/>
                    
                    <div className="text-center">
                      <h6>Bukti Pembayaran:</h6>
                      <div className="border p-3 bg-light">
                        <i className="fas fa-file-image fa-3x text-muted mb-2"></i>
                        <p className="mb-0"><strong>{selectedOrder.paymentProof}</strong></p>
                        <small className="text-muted">File bukti pembayaran</small>
                      </div>
                    </div>
                    
                    {selectedOrder.notes && (
                      <div className="mt-3">
                        <h6>Catatan:</h6>
                        <div className="alert alert-info">
                          {selectedOrder.notes}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-success"
                      onClick={() => {
                        handlePaymentVerification(selectedOrder.id, 'approve');
                        setShowPaymentModal(false);
                      }}
                    >
                      <i className="fas fa-check me-1"></i>
                      Verifikasi Pembayaran
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-danger"
                      onClick={() => {
                        handlePaymentVerification(selectedOrder.id, 'reject');
                        setShowPaymentModal(false);
                      }}
                    >
                      <i className="fas fa-times me-1"></i>
                      Tolak Pembayaran
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowPaymentModal(false)}
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}