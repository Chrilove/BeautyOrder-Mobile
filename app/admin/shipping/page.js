'use client';
import Sidebar from '../../components/Sidebar'

export default function ShippingPage() {
  const shipments = [
    {
      id: '#SHP001',
      orderId: '#ORD001',
      reseller: 'Sari Beauty Store',
      address: 'Jl. Sudirman No. 123, Jakarta Pusat',
      phone: '+62 812-3456-7890',
      courier: 'JNE',
      service: 'REG',
      trackingNumber: 'JNE1234567890',
      weight: '2.5 kg',
      cost: 'Rp 25.000',
      estimatedDelivery: '25 Mei 2025',
      status: 'in_transit',
      createdDate: '22 Mei 2025'
    },
    {
      id: '#SHP002',
      orderId: '#ORD002',
      reseller: 'Cantik Cosmetics',
      address: 'Jl. Gatot Subroto No. 456, Bandung',
      phone: '+62 813-9876-5432',
      courier: 'TIKI',
      service: 'ONS',
      trackingNumber: 'TIKI0987654321',
      weight: '1.8 kg',
      cost: 'Rp 18.000',
      estimatedDelivery: '24 Mei 2025',
      status: 'delivered',
      createdDate: '21 Mei 2025'
    },
    {
      id: '#SHP003',
      orderId: '#ORD003',
      reseller: 'Glowing Skin Shop',
      address: 'Jl. Ahmad Yani No. 789, Surabaya',
      phone: '+62 814-1111-2222',
      courier: 'POS Indonesia',
      service: 'Paket Kilat Khusus',
      trackingNumber: 'POS1122334455',
      weight: '3.2 kg',
      cost: 'Rp 32.000',
      estimatedDelivery: '26 Mei 2025',
      status: 'preparing',
      createdDate: '20 Mei 2025'
    },
    {
      id: '#SHP004',
      orderId: '#ORD004',
      reseller: 'Natural Beauty Co',
      address: 'Jl. Diponegoro No. 321, Yogyakarta',
      phone: '+62 815-5555-6666',
      courier: 'J&T Express',
      service: 'EZ',
      trackingNumber: 'JT2233445566',
      weight: '1.5 kg',
      cost: 'Rp 15.000',
      estimatedDelivery: '23 Mei 2025',
      status: 'returned',
      createdDate: '19 Mei 2025'
    }
  ]

  const getStatusBadge = (status) => {
    switch(status) {
      case 'preparing':
        return <span className="status-badge status-preparing">Sedang Disiapkan</span>
      case 'in_transit':
        return <span className="status-badge status-transit">Dalam Perjalanan</span>
      case 'delivered':
        return <span className="status-badge status-delivered">Terkirim</span>
      case 'returned':
        return <span className="status-badge status-returned">Dikembalikan</span>
      case 'cancelled':
        return <span className="status-badge status-cancelled">Dibatalkan</span>
      default:
        return <span className="status-badge">{status}</span>
    }
  }

  const getCourierLogo = (courier) => {
    const logos = {
      'JNE': '🚚',
      'TIKI': '📦',
      'POS Indonesia': '📮',
      'J&T Express': '🚛',
      'SiCepat': '⚡',
      'AnterAja': '🏃'
    }
    return logos[courier] || '📦'
  }

  const handleTrackPackage = (trackingNumber, courier) => {
    console.log(`Tracking package ${trackingNumber} via ${courier}`)
  }

  const handleUpdateStatus = (shipmentId, newStatus) => {
    console.log(`Update shipment ${shipmentId} to ${newStatus}`)
  }

  const handlePrintLabel = (shipmentId) => {
    console.log(`Print shipping label for ${shipmentId}`)
  }

  const handleCreateShipment = () => {
    console.log('Create new shipment')
  }

  return (
    <>
      <Sidebar />
      <div className="main-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Manajemen Pengiriman</h2>
          <div className="d-flex gap-2">
            <select className="form-select" style={{width: 'auto'}}>
              <option>Semua Status</option>
              <option>Sedang Disiapkan</option>
              <option>Dalam Perjalanan</option>
              <option>Terkirim</option>
              <option>Dikembalikan</option>
            </select>
            <select className="form-select" style={{width: 'auto'}}>
              <option>Semua Kurir</option>
              <option>JNE</option>
              <option>TIKI</option>
              <option>POS Indonesia</option>
              <option>J&T Express</option>
              <option>SiCepat</option>
            </select>
            <button className="btn btn-primary" onClick={handleCreateShipment}>
              <i className="fas fa-plus me-2"></i>
              Buat Pengiriman
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <div className="card summary-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle mb-2 text-muted">Total Pengiriman</h6>
                    <h3 className="card-title mb-0">{shipments.length}</h3>
                  </div>
                  <div className="summary-icon bg-primary">
                    <i className="fas fa-shipping-fast"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card summary-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle mb-2 text-muted">Dalam Perjalanan</h6>
                    <h3 className="card-title mb-0">
                      {shipments.filter(s => s.status === 'in_transit').length}
                    </h3>
                  </div>
                  <div className="summary-icon bg-warning">
                    <i className="fas fa-truck"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card summary-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle mb-2 text-muted">Terkirim</h6>
                    <h3 className="card-title mb-0">
                      {shipments.filter(s => s.status === 'delivered').length}
                    </h3>
                  </div>
                  <div className="summary-icon bg-success">
                    <i className="fas fa-check-circle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card summary-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle mb-2 text-muted">Total Biaya</h6>
                    <h3 className="card-title mb-0">Rp 90.000</h3>
                  </div>
                  <div className="summary-icon bg-info">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shipments Table */}
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Daftar Pengiriman</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID Pengiriman</th>
                    <th>ID Pesanan</th>
                    <th>Reseller</th>
                    <th>Alamat</th>
                    <th>Kurir</th>
                    <th>No. Resi</th>
                    <th>Berat</th>
                    <th>Biaya</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((shipment) => (
                    <tr key={shipment.id}>
                      <td className="fw-bold text-primary">{shipment.id}</td>
                      <td>
                        <span className="badge bg-light text-dark">{shipment.orderId}</span>
                      </td>
                      <td>
                        <div>
                          <div className="fw-bold">{shipment.reseller}</div>
                          <small className="text-muted">{shipment.phone}</small>
                        </div>
                      </td>
                      <td>
                        <div className="address-cell" title={shipment.address}>
                          {shipment.address.length > 30 
                            ? `${shipment.address.substring(0, 30)}...` 
                            : shipment.address
                          }
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="courier-logo me-2">{getCourierLogo(shipment.courier)}</span>
                          <div>
                            <div className="fw-bold">{shipment.courier}</div>
                            <small className="text-muted">{shipment.service}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="tracking-number">
                          <code>{shipment.trackingNumber}</code>
                          <button 
                            className="btn btn-link btn-sm p-0 ms-1"
                            onClick={() => handleTrackPackage(shipment.trackingNumber, shipment.courier)}
                            title="Lacak Paket"
                          >
                            <i className="fas fa-external-link-alt"></i>
                          </button>
                        </div>
                      </td>
                      <td>{shipment.weight}</td>
                      <td className="fw-bold text-success">{shipment.cost}</td>
                      <td>{getStatusBadge(shipment.status)}</td>
                      <td>
                        <div className="dropdown">
                          <button 
                            className="btn btn-outline-secondary btn-sm dropdown-toggle" 
                            type="button" 
                            data-bs-toggle="dropdown"
                          >
                            Aksi
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <button 
                                className="dropdown-item"
                                onClick={() => handlePrintLabel(shipment.id)}
                              >
                                <i className="fas fa-print me-2"></i>Cetak Label
                              </button>
                            </li>
                            <li>
                              <button 
                                className="dropdown-item"
                                onClick={() => handleTrackPackage(shipment.trackingNumber, shipment.courier)}
                              >
                                <i className="fas fa-search me-2"></i>Lacak Paket
                              </button>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            {shipment.status === 'preparing' && (
                              <li>
                                <button 
                                  className="dropdown-item"
                                  onClick={() => handleUpdateStatus(shipment.id, 'in_transit')}
                                >
                                  <i className="fas fa-truck me-2"></i>Kirim Sekarang
                                </button>
                              </li>
                            )}
                            {shipment.status === 'in_transit' && (
                              <li>
                                <button 
                                  className="dropdown-item"
                                  onClick={() => handleUpdateStatus(shipment.id, 'delivered')}
                                >
                                  <i className="fas fa-check me-2"></i>Tandai Terkirim
                                </button>
                              </li>
                            )}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <span className="text-muted">
            Menampilkan {shipments.length} dari {shipments.length} pengiriman
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
      </div>

      <style jsx>{`
        .main-content {
          margin-left: 250px;
          padding: 2rem;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .summary-card {
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .summary-card:hover {
          transform: translateY(-2px);
        }

        .summary-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .status-preparing {
          background-color: #fff3cd;
          color: #856404;
        }

        .status-transit {
          background-color: #cce5ff;
          color: #004085;
        }

        .status-delivered {
          background-color: #d4edda;
          color: #155724;
        }

        .status-returned {
          background-color: #f8d7da;
          color: #721c24;
        }

        .status-cancelled {
          background-color: #e2e3e5;
          color: #383d41;
        }

        .courier-logo {
          font-size: 1.5rem;
        }

        .tracking-number code {
          background-color: #f8f9fa;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        .address-cell {
          max-width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .table th {
          border-top: none;
          font-weight: 600;
          color: #495057;
        }

        .table td {
          vertical-align: middle;
        }

        .card {
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .card-header {
          background-color: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
            padding: 1rem;
          }
          
          .address-cell {
            max-width: 150px;
          }
          
          .tracking-number {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </>
  )
}