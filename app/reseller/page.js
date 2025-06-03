'use client'

import { useAuth } from '../components/AuthProvider'
import Sidebar from '../components/sidebar-reseller'
import { useState, useEffect } from 'react'

export default function ResellerDashboard() {
  const { user, loading } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)

  // Mock data - replace with API call
  useEffect(() => {
    const mockData = {
      stats: {
        totalOrders: 24,
        pendingOrders: 3,
        completedOrders: 21,
        totalSpending: 15750000,
        thisMonthSpending: 3250000,
        savedMoney: 2100000 // dari harga grosir vs retail
      },
      recentOrders: [
        {
          id: 'ORD001',
          date: '2025-05-31',
          products: 'Power Bright Expert Serum + 2 produk lain',
          amount: 1112500,
          status: 'confirmed'
        },
        {
          id: 'ORD002',
          date: '2025-05-30',
          products: 'OMG Bright Booster Sunscreen SPF 50+',
          amount: 975000,
          status: 'pending'
        },
        {
          id: 'ORD003',
          date: '2025-05-29',
          products: 'Ultimate Whitening Face Wash + Glad2Glow Toner',
          amount: 985000,
          status: 'shipped'
        }
      ],
      topProducts: [
        { name: 'Power Bright Expert Serum', orders: 12, revenue: 1500000 },
        { name: 'OMG Bright Booster Sunscreen SPF 50+', orders: 8, revenue: 780000 },
        { name: 'Moisturizer Shooting Skinditioner', orders: 6, revenue: 975000 },
        { name: 'Ultimate Whitening Face Wash', orders: 5, revenue: 306250 }
      ],
      notifications: [
        {
          type: 'info',
          message: 'Pesanan ORD002 menunggu konfirmasi dari admin',
          time: '2 jam lalu'
        },
        {
          type: 'success',
          message: 'Pesanan ORD001 telah dikonfirmasi dan akan segera dikirim',
          time: '1 hari lalu'
        },
        {
          type: 'warning',
          message: 'Stok EMINA Lip Mask terbatas (45 pcs), segera pesan ulang',
          time: '2 hari lalu'
        }
      ]
    }
    setDashboardData(mockData)
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
      pending: { class: 'bg-warning', text: 'Menunggu' },
      confirmed: { class: 'bg-info', text: 'Dikonfirmasi' },
      shipped: { class: 'bg-primary', text: 'Dikirim' },
      delivered: { class: 'bg-success', text: 'Selesai' }
    }
    return statusConfig[status] || { class: 'bg-secondary', text: status }
  }

  const getNotificationIcon = (type) => {
    const icons = {
      info: 'fas fa-info-circle text-info',
      success: 'fas fa-check-circle text-success',
      warning: 'fas fa-exclamation-triangle text-warning',
      danger: 'fas fa-times-circle text-danger'
    }
    return icons[type] || 'fas fa-bell text-secondary'
  }

  if (!dashboardData) {
    return <div>Loading...</div>
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">
              <i className="fas fa-store me-2 text-primary"></i>
              Dashboard Reseller
            </h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="badge bg-success fs-6 me-2">
                <i className="fas fa-user-tie me-1"></i>
                {user?.username || 'Reseller'}
              </div>
            </div>
          </div>

          {/* Welcome Card */}
          <div className="card mb-4 bg-gradient-primary text-white">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col">
                  <h4 className="text-white mb-2">
                    Selamat Datang, {user?.username || 'Reseller'}! 👋
                  </h4>
                  <p className="text-white-50 mb-0">
                    Kelola bisnis reseller Anda dengan mudah. Pesan produk langsung dari admin dan dapatkan harga grosir terbaik.
                  </p>
                </div>
                <div className="col-auto">
                  <i className="fas fa-store fa-3x opacity-50"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-6 col-xl-3 mb-3">
              <div className="card shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Total Pesanan
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {dashboardData.stats.totalOrders}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-shopping-cart fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-3 mb-3">
              <div className="card shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Menunggu Konfirmasi
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {dashboardData.stats.pendingOrders}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-clock fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-3 mb-3">
              <div className="card shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Total Belanja
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        Rp {dashboardData.stats.totalSpending.toLocaleString('id-ID')}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-3 mb-3">
              <div className="card shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                        Hemat Bulan Ini
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        Rp {dashboardData.stats.savedMoney.toLocaleString('id-ID')}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-tags fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Recent Orders */}
            <div className="col-lg-8 mb-4">
              <div className="card shadow">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    <i className="fas fa-list me-2"></i>
                    Pesanan Terbaru
                  </h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Tanggal</th>
                          <th>Produk</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.recentOrders.map(order => {
                          const statusBadge = getStatusBadge(order.status)
                          return (
                            <tr key={order.id}>
                              <td className="fw-bold">{order.id}</td>
                              <td>{new Date(order.date).toLocaleDateString('id-ID')}</td>
                              <td className="small">{order.products}</td>
                              <td className="fw-bold text-success">
                                Rp {order.amount.toLocaleString('id-ID')}
                              </td>
                              <td>
                                <span className={`badge ${statusBadge.class}`}>
                                  {statusBadge.text}
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center">
                    <a href="/reseller/orders" className="btn btn-primary btn-sm">
                      <i className="fas fa-eye me-1"></i>
                      Lihat Semua Pesanan
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="col-lg-4 mb-4">
              <div className="card shadow">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    <i className="fas fa-bell me-2"></i>
                    Notifikasi
                  </h6>
                </div>
                <div className="card-body">
                  {dashboardData.notifications.map((notif, idx) => (
                    <div key={idx} className="d-flex align-items-start mb-3">
                      <div className="flex-shrink-0 me-3">
                        <i className={getNotificationIcon(notif.type)}></i>
                      </div>
                      <div className="flex-grow-1">
                        <p className="small mb-1">{notif.message}</p>
                        <small className="text-muted">{notif.time}</small>
                      </div>
                    </div>
                  ))}
                  <div className="text-center mt-3">
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="fas fa-eye me-1"></i>
                      Lihat Semua
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="row">
            <div className="col-12">
              <div className="card shadow">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    <i className="fas fa-star me-2"></i>
                    Produk Terlaris Saya
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    {dashboardData.topProducts.map((product, idx) => (
                      <div key={idx} className="col-md-6 col-xl-3 mb-3">
                        <div className="card border-left-primary h-100">
                          <div className="card-body">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                              {product.name}
                            </div>
                            <div className="h6 mb-1 font-weight-bold text-gray-800">
                              {product.orders} pesanan
                            </div>
                            <div className="small text-success">
                              Rp {product.revenue.toLocaleString('id-ID')}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="card shadow">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    <i className="fas fa-bolt me-2"></i>
                    Aksi Cepat
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row text-center">
                    <div className="col-md-3 mb-3">
                      <a href="/reseller/orders" className="btn btn-primary btn-lg w-100">
                        <i className="fas fa-plus-circle d-block mb-2"></i>
                        Buat Pesanan Baru
                      </a>
                    </div>
                    <div className="col-md-3 mb-3">
                      <a href="/reseller/catalog" className="btn btn-info btn-lg w-100">
                        <i className="fas fa-book-open d-block mb-2"></i>
                        Lihat Katalog
                      </a>
                    </div>
                    <div className="col-md-3 mb-3">
                      <a href="/reseller/calculator" className="btn btn-success btn-lg w-100">
                        <i className="fas fa-calculator d-block mb-2"></i>
                        Hitung Profit
                      </a>
                    </div>
                    <div className="col-md-3 mb-3">
                      <a href="/reseller/profile" className="btn btn-warning btn-lg w-100">
                        <i className="fas fa-user-tie d-block mb-2"></i>
                        Profil Saya
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>

      <style jsx>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
        }
        
        .shadow {
          box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
        }
        
        .font-weight-bold {
          font-weight: 700 !important;
        }
        
        .text-xs {
          font-size: 0.7rem;
        }
        
        .text-gray-800 {
          color: #3a3b45 !important;
        }
        
        .text-gray-300 {
          color: #dddfeb !important;
        }
        
        .border-left-primary {
          border-left: 0.25rem solid #4e73df !important;
        }
        
        .card-body .row.no-gutters {
          margin-right: 0;
          margin-left: 0;
        }
        
        .card-body .row.no-gutters > [class*="col-"] {
          padding-right: 0;
          padding-left: 0;
        }
        
        .opacity-50 {
          opacity: 0.5;
        }
      `}</style>
    </div>
  )
}