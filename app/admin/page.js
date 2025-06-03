'use client'

import { useAuth } from '../components/AuthProvider'
import Sidebar from '../components/Sidebar'
import StatsCard from '../components/StatsCard'
import RecentOrders from '../components/RecentOrder'
import VerificationCard from '../components/VerificationCard'

export default function AdminDashboard() {
  const { user, loading, isAdmin } = useAuth()

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  // Redirect non-admin users
  if (!isAdmin) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Akses Ditolak!</h4>
          <p>Anda tidak memiliki akses ke halaman ini.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid" style={{backgroundColor: '#f8f9fb'}}>
      <div className="row">
        <Sidebar />
        
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2" style={{color: '#495057'}}>
              <i className="fas fa-tachometer-alt me-2" style={{color: '#6c757d'}}></i>
              Dashboard Admin
            </h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <span className="badge fs-6" style={{backgroundColor: '#e3f2fd', color: '#1976d2'}}>
                  <i className="fas fa-user-shield me-1"></i>
                  {user?.username}
                </span>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="alert mb-4" role="alert" style={{backgroundColor: '#e8f5e8', borderColor: '#c3e6cb', color: '#155724'}}>
            <h4 className="alert-heading" style={{color: '#155724'}}>
              <i className="fas fa-hand-wave me-2" style={{color: '#28a745'}}></i>
              Selamat Datang, Administrator!
            </h4>
            <p>Selamat datang di dashboard admin BeautyOrder. Kelola sistem dengan mudah melalui panel kontrol ini.</p>
            <hr style={{borderColor: '#c3e6cb'}} />
            <p className="mb-0">
              <i className="fas fa-info-circle me-1" style={{color: '#28a745'}}></i>
              Gunakan menu sidebar untuk navigasi ke berbagai fitur manajemen.
            </p>
          </div>

          {/* Stats Cards Row */}
          <div className="row mb-4">
            <div className="col-xl-3 col-md-6 mb-4">
              <StatsCard 
                title="Total Produk"
                value="6"
                icon="fas fa-box"
                color="custom"
                change="+6 produk"
                customStyle={{
                  backgroundColor: '#f8f3ff', 
                  borderRadius: '15px',
                  border: '1px solid #e8d5ff',
                  boxShadow: '0 6px 20px rgba(139, 69, 255, 0.15)',
                  background: 'linear-gradient(135deg, #f8f3ff 0%, #f0e6ff 100%)',
                  color: '#7c3aed'
                }}
              />
            </div>
            
            <div className="col-xl-3 col-md-6 mb-4">
              <StatsCard 
                title="Total Terjual"
                value="414"
                icon="fas fa-shopping-cart"
                color="custom"
                change="+414 unit"
                customStyle={{
                  backgroundColor: '#f0fffc', 
                  borderRadius: '15px',
                  border: '1px solid #c2f5f0',
                  boxShadow: '0 6px 20px rgba(34, 197, 172, 0.15)',
                  background: 'linear-gradient(135deg, #f0fffc 0%, #e6fff9 100%)',
                  color: '#0d9488'
                }}
              />
            </div>
            
            <div className="col-xl-3 col-md-6 mb-4">
              <StatsCard 
                title="Stok Menipis"
                value="2"
                icon="fas fa-exclamation-triangle"
                color="custom"
                change="Perlu Perhatian"
                customStyle={{
                  backgroundColor: '#fff8f0', 
                  borderRadius: '15px',
                  border: '1px solid #ffd4a3',
                  boxShadow: '0 6px 20px rgba(255, 159, 67, 0.15)',
                  background: 'linear-gradient(135deg, #fff8f0 0%, #fff2e6 100%)',
                  color: '#ea580c'
                }}
              />
            </div>
            
            <div className="col-xl-3 col-md-6 mb-4">
              <StatsCard 
                title="Total Stok"
                value="602"
                icon="fas fa-warehouse"
                color="custom"
                change="Unit Tersedia"
                customStyle={{
                  backgroundColor: '#f0f8ff', 
                  borderRadius: '15px',
                  border: '1px solid #c2d9ff',
                  boxShadow: '0 6px 20px rgba(99, 149, 255, 0.15)',
                  background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f2ff 100%)',
                  color: '#2563eb'
                }}
              />
            </div>
          </div>

          {/* Charts and Tables Row */}
          <div className="row">
            {/* Recent Orders */}
            <div className="col-lg-8 mb-4">
              <div className="card" style={{boxShadow: '0 4px 12px rgba(0,0,0,0.08)', backgroundColor: '#ffffff', border: '1px solid #e9ecef', borderRadius: '12px'}}>
                <div className="card-header py-3" style={{backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef', borderRadius: '12px 12px 0 0'}}>
                  <h6 className="m-0 font-weight-bold" style={{color: '#495057'}}>
                    <i className="fas fa-shopping-bag me-2" style={{color: '#6c757d'}}></i>
                    Pesanan Terbaru
                  </h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-borderless">
                      <thead>
                        <tr style={{backgroundColor: '#f8f9fa'}}>
                          <th style={{color: '#6c757d', fontSize: '0.875rem'}}>ID</th>
                          <th style={{color: '#6c757d', fontSize: '0.875rem'}}>Produk</th>
                          <th style={{color: '#6c757d', fontSize: '0.875rem'}}>Brand</th>
                          <th style={{color: '#6c757d', fontSize: '0.875rem'}}>Harga</th>
                          <th style={{color: '#6c757d', fontSize: '0.875rem'}}>Status</th>
                          <th style={{color: '#6c757d', fontSize: '0.875rem'}}>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{color: '#495057'}}>#001</td>
                          <td style={{color: '#495057'}}>Power Bright Expert Serum</td>
                          <td style={{color: '#495057'}}>Hanasui</td>
                          <td style={{color: '#495057'}}>Rp 22.000</td>
                          <td><span className="badge" style={{backgroundColor: '#d4edda', color: '#155724', borderRadius: '20px'}}>Tersedia</span></td>
                          <td><button className="btn btn-sm" style={{backgroundColor: '#e3f2fd', color: '#1976d2'}}>Detail</button></td>
                        </tr>
                        <tr>
                          <td style={{color: '#495057'}}>#002</td>
                          <td style={{color: '#495057'}}>Moisturizer Shooting Skinditioner</td>
                          <td style={{color: '#495057'}}>GLAMAZING</td>
                          <td style={{color: '#495057'}}>Rp 56.000</td>
                          <td><span className="badge" style={{backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '20px'}}>Habis</span></td>
                          <td><button className="btn btn-sm" style={{backgroundColor: '#f8d7da', color: '#721c24'}}>Detail</button></td>
                        </tr>
                        <tr>
                          <td style={{color: '#495057'}}>#003</td>
                          <td style={{color: '#495057'}}>Ultimate Whitening Face Wash</td>
                          <td style={{color: '#495057'}}>Hada labo</td>
                          <td style={{color: '#495057'}}>Rp 25.000</td>
                          <td><span className="badge" style={{backgroundColor: '#d4edda', color: '#155724', borderRadius: '20px'}}>Tersedia</span></td>
                          <td><button className="btn btn-sm" style={{backgroundColor: '#e3f2fd', color: '#1976d2'}}>Detail</button></td>
                        </tr>
                        <tr>
                          <td style={{color: '#495057'}}>#004</td>
                          <td style={{color: '#495057'}}>OMG Bright Booster Sunscreen</td>
                          <td style={{color: '#495057'}}>OMG</td>
                          <td style={{color: '#495057'}}>Rp 20.000</td>
                          <td><span className="badge" style={{backgroundColor: '#d4edda', color: '#155724', borderRadius: '20px'}}>Tersedia</span></td>
                          <td><button className="btn btn-sm" style={{backgroundColor: '#e3f2fd', color: '#1976d2'}}>Detail</button></td>
                        </tr>
                        <tr>
                          <td style={{color: '#495057'}}>#005</td>
                          <td style={{color: '#495057'}}>EMINA Lip Mask 9gr</td>
                          <td style={{color: '#495057'}}>EMINA</td>
                          <td style={{color: '#495057'}}>Rp 30.000</td>
                          <td><span className="badge" style={{backgroundColor: '#fff3cd', color: '#856404', borderRadius: '20px'}}>Stok Rendah</span></td>
                          <td><button className="btn btn-sm" style={{backgroundColor: '#fff3cd', color: '#856404'}}>Detail</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Verification Card */}
            <div className="col-lg-4 mb-4">
              <VerificationCard />
            </div>
          </div>

          {/* Additional Cards Row */}
          <div className="row">
            {/* Quick Actions */}
            <div className="col-lg-6 mb-4">
              <div className="card" style={{boxShadow: '0 4px 12px rgba(0,0,0,0.08)', backgroundColor: '#ffffff', border: '1px solid #e9ecef', borderRadius: '12px'}}>
                <div className="card-header py-3" style={{backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef', borderRadius: '12px 12px 0 0'}}>
                  <h6 className="m-0 font-weight-bold" style={{color: '#495057'}}>
                    <i className="fas fa-bolt me-2" style={{color: '#6c757d'}}></i>
                    Aksi Cepat
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <a href="/admin/products" className="btn" style={{backgroundColor: '#e3f2fd', color: '#1976d2', border: '1px solid #bbdefb', borderRadius: '8px'}}>
                      <i className="fas fa-plus me-2"></i>
                      Tambah Produk Baru
                    </a>
                    <a href="/admin/orders" className="btn" style={{backgroundColor: '#e8f5e8', color: '#2e7d32', border: '1px solid #c8e6c9', borderRadius: '8px'}}>
                      <i className="fas fa-eye me-2"></i>
                      Lihat Semua Pesanan
                    </a>
                    <a href="/admin/verification" className="btn" style={{backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7', borderRadius: '8px'}}>
                      <i className="fas fa-check me-2"></i>
                      Verifikasi Barang
                    </a>
                    <a href="/admin/reports" className="btn" style={{backgroundColor: '#cce7ff', color: '#0056b3', border: '1px solid #99d3ff', borderRadius: '8px'}}>
                      <i className="fas fa-chart-bar me-2"></i>
                      Generate Laporan
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="col-lg-6 mb-4">
              <div className="card" style={{boxShadow: '0 4px 12px rgba(0,0,0,0.08)', backgroundColor: '#ffffff', border: '1px solid #e9ecef', borderRadius: '12px'}}>
                <div className="card-header py-3" style={{backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef', borderRadius: '12px 12px 0 0'}}>
                  <h6 className="m-0 font-weight-bold" style={{color: '#495057'}}>
                    <i className="fas fa-server me-2" style={{color: '#6c757d'}}></i>
                    Status Sistem
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span style={{color: '#6c757d'}}>Server Status</span>
                    <span className="badge" style={{backgroundColor: '#d4edda', color: '#155724', borderRadius: '20px'}}>Online</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span style={{color: '#6c757d'}}>Database</span>
                    <span className="badge" style={{backgroundColor: '#d4edda', color: '#155724', borderRadius: '20px'}}>Connected</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span style={{color: '#6c757d'}}>Storage</span>
                    <span className="badge" style={{backgroundColor: '#fff3cd', color: '#856404', borderRadius: '20px'}}>75% Used</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span style={{color: '#6c757d'}}>Last Backup</span>
                    <span className="text-muted">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Status Overview */}
          <div className="row">
            <div className="col-12">
              <div className="card mb-4" style={{boxShadow: '0 4px 12px rgba(0,0,0,0.08)', backgroundColor: '#ffffff', border: '1px solid #e9ecef', borderRadius: '12px'}}>
                <div className="card-header py-3" style={{backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef', borderRadius: '12px 12px 0 0'}}>
                  <h6 className="m-0 font-weight-bold" style={{color: '#495057'}}>
                    <i className="fas fa-boxes me-2" style={{color: '#6c757d'}}></i>
                    Status Produk
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <div className="text-center p-3" style={{backgroundColor: '#e8f5e8', borderRadius: '8px'}}>
                        <h5 className="mb-1" style={{color: '#155724'}}>4</h5>
                        <small className="text-muted">Produk Tersedia</small>
                      </div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <div className="text-center p-3" style={{backgroundColor: '#f8d7da', borderRadius: '8px'}}>
                        <h5 className="mb-1" style={{color: '#721c24'}}>1</h5>
                        <small className="text-muted">Stok Habis</small>
                      </div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <div className="text-center p-3" style={{backgroundColor: '#fff3cd', borderRadius: '8px'}}>
                        <h5 className="mb-1" style={{color: '#856404'}}>1</h5>
                        <small className="text-muted">Stok Menipis</small>
                      </div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <div className="text-center p-3" style={{backgroundColor: '#cce7ff', borderRadius: '8px'}}>
                        <h5 className="mb-1" style={{color: '#0056b3'}}>1</h5>
                        <small className="text-muted">Kadaluarsa Dekat</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="row">
            <div className="col-12">
              <div className="card mb-4" style={{boxShadow: '0 4px 12px rgba(0,0,0,0.08)', backgroundColor: '#ffffff', border: '1px solid #e9ecef', borderRadius: '12px'}}>
                <div className="card-header py-3" style={{backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef', borderRadius: '12px 12px 0 0'}}>
                  <h6 className="m-0 font-weight-bold" style={{color: '#495057'}}>
                    <i className="fas fa-bell me-2" style={{color: '#6c757d'}}></i>
                    Notifikasi Terbaru
                  </h6>
                </div>
                <div className="card-body">
                  <div className="alert mb-2" style={{backgroundColor: '#f8d7da', borderColor: '#f5c6cb', color: '#721c24', borderRadius: '8px'}}>
                    <i className="fas fa-exclamation-circle me-2" style={{color: '#dc3545'}}></i>
                    <strong>Perhatian:</strong> Moisturizer GLAMAZING 200ml stok habis (0 unit tersisa)
                  </div>
                  <div className="alert mb-2" style={{backgroundColor: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', borderRadius: '8px'}}>
                    <i className="fas fa-exclamation-triangle me-2" style={{color: '#ffc107'}}></i>
                    <strong>Peringatan:</strong> EMINA Lip Mask 9gr stok menipis (tersisa 45 unit)
                  </div>
                  <div className="alert mb-2" style={{backgroundColor: '#cce7ff', borderColor: '#99d3ff', color: '#0056b3', borderRadius: '8px'}}>
                    <i className="fas fa-clock me-2" style={{color: '#17a2b8'}}></i>
                    <strong>Info:</strong> Moisturizer GLAMAZING akan kadaluarsa dalam 2 bulan (30 Agustus 2024)
                  </div>
                  <div className="alert mb-0" style={{backgroundColor: '#d4edda', borderColor: '#c3e6cb', color: '#155724', borderRadius: '8px'}}>
                    <i className="fas fa-check-circle me-2" style={{color: '#28a745'}}></i>
                    <strong>Update:</strong> Total 414 unit produk telah terjual dari 6 produk aktif
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}