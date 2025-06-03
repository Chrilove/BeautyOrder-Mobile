'use client';
import Sidebar from '../../components/Sidebar'

export default function ReportsPage() {
  const reportData = {
    summary: {
      totalOrders: 156,
      totalRevenue: 'Rp 12.480.000',
      totalResellers: 24,
      pendingOrders: 8
    },
    monthlyData: [
      { month: 'Jan', orders: 45, revenue: 3600000 },
      { month: 'Feb', orders: 52, revenue: 4160000 },
      { month: 'Mar', orders: 38, revenue: 3040000 },
      { month: 'Apr', orders: 61, revenue: 4880000 },
      { month: 'Mei', orders: 47, revenue: 3760000 }
    ],
    topResellers: [
      {
        id: 1,
        name: 'Sari Beauty Store',
        email: 'sari@beauty.com',
        totalOrders: 23,
        totalRevenue: 'Rp 1.840.000',
        lastOrder: '22 Mei 2025'
      },
      {
        id: 2,
        name: 'Cantik Cosmetics',
        email: 'cantik@cosmet.com',
        totalOrders: 18,
        totalRevenue: 'Rp 1.440.000',
        lastOrder: '21 Mei 2025'
      },
      {
        id: 3,
        name: 'Glowing Skin Shop',
        email: 'glow@skin.com',
        totalOrders: 15,
        totalRevenue: 'Rp 1.200.000',
        lastOrder: '20 Mei 2025'
      },
      {
        id: 4,
        name: 'Natural Beauty Co',
        email: 'natural@beauty.co',
        totalOrders: 12,
        totalRevenue: 'Rp 960.000',
        lastOrder: '19 Mei 2025'
      },
      {
        id: 5,
        name: 'Fresh Face Studio',
        email: 'fresh@face.com',
        totalOrders: 10,
        totalRevenue: 'Rp 800.000',
        lastOrder: '18 Mei 2025'
      }
    ],
    recentOrders: [
      {
        id: '#ORD001',
        reseller: 'Sari Beauty Store',
        date: '22 Mei 2025',
        total: 'Rp 1.125.000',
        status: 'pending'
      },
      {
        id: '#ORD002',
        reseller: 'Cantik Cosmetics',
        date: '21 Mei 2025',
        total: 'Rp 640.000',
        status: 'approved'
      },
      {
        id: '#ORD003',
        reseller: 'Glowing Skin Shop',
        date: '20 Mei 2025',
        total: 'Rp 960.000',
        status: 'ready_to_ship'
      }
    ]
  }

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <span className="status-badge status-pending">Pending</span>
      case 'approved':
        return <span className="status-badge status-approved">Disetujui</span>
      case 'ready_to_check':
        return <span className="status-badge status-ready-check">Siap Dicek</span>
      case 'ready_to_ship':
        return <span className="status-badge status-ready-ship">Siap Dikirim</span>
      default:
        return <span className="status-badge">{status}</span>
    }
  }

  const handleExportReport = (type) => {
    console.log(`Exporting ${type} report`)
  }

  const handleDateRangeChange = (range) => {
    console.log(`Changing date range to ${range}`)
  }

  return (
    <>
      <Sidebar />
      <div className="main-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Laporan & Analitik</h2>
          <div className="d-flex gap-2">
            <select 
              className="form-select" 
              style={{width: 'auto'}}
              onChange={(e) => handleDateRangeChange(e.target.value)}
            >
              <option value="7days">7 Hari Terakhir</option>
              <option value="30days">30 Hari Terakhir</option>
              <option value="3months">3 Bulan Terakhir</option>
              <option value="1year">1 Tahun Terakhir</option>
            </select>
            <button 
              className="btn btn-primary"
              onClick={() => handleExportReport('pdf')}
            >
              Export PDF
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
                    <h6 className="card-subtitle mb-2 text-muted">Total Pesanan</h6>
                    <h3 className="card-title mb-0">{reportData.summary.totalOrders}</h3>
                  </div>
                  <div className="summary-icon bg-primary">
                    <i className="fas fa-shopping-cart"></i>
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
                    <h6 className="card-subtitle mb-2 text-muted">Total Pendapatan</h6>
                    <h3 className="card-title mb-0">{reportData.summary.totalRevenue}</h3>
                  </div>
                  <div className="summary-icon bg-success">
                    <i className="fas fa-dollar-sign"></i>
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
                    <h6 className="card-subtitle mb-2 text-muted">Total Reseller</h6>
                    <h3 className="card-title mb-0">{reportData.summary.totalResellers}</h3>
                  </div>
                  <div className="summary-icon bg-info">
                    <i className="fas fa-users"></i>
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
                    <h6 className="card-subtitle mb-2 text-muted">Pesanan Pending</h6>
                    <h3 className="card-title mb-0">{reportData.summary.pendingOrders}</h3>
                  </div>
                  <div className="summary-icon bg-warning">
                    <i className="fas fa-clock"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Monthly Chart */}
          <div className="col-md-8 mb-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Grafik Penjualan Bulanan</h5>
              </div>
              <div className="card-body">
                <div className="chart-container">
                  <div className="chart-placeholder">
                    <div className="chart-bars">
                      {reportData.monthlyData.map((data, index) => (
                        <div key={index} className="chart-bar-group">
                          <div className="chart-bar" style={{height: `${(data.orders / 70) * 100}%`}}></div>
                          <span className="chart-label">{data.month}</span>
                        </div>
                      ))}
                    </div>
                    <div className="chart-info">
                      <p className="text-center text-muted mt-3">
                        Grafik menampilkan jumlah pesanan per bulan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Pesanan Terbaru</h5>
              </div>
              <div className="card-body p-0">
                <div className="list-group list-group-flush">
                  {reportData.recentOrders.map((order) => (
                    <div key={order.id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{order.id}</h6>
                          <p className="mb-1 text-muted small">{order.reseller}</p>
                          <small className="text-muted">{order.date}</small>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold mb-1">{order.total}</div>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Resellers Table */}
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Top Reseller</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Rank</th>
                    <th>Nama Reseller</th>
                    <th>Email</th>
                    <th>Total Pesanan</th>
                    <th>Total Pendapatan</th>
                    <th>Pesanan Terakhir</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.topResellers.map((reseller, index) => (
                    <tr key={reseller.id}>
                      <td>
                        <div className="rank-badge">
                          {index + 1}
                        </div>
                      </td>
                      <td className="fw-bold">{reseller.name}</td>
                      <td className="text-muted">{reseller.email}</td>
                      <td>{reseller.totalOrders} pesanan</td>
                      <td className="fw-bold text-success">{reseller.totalRevenue}</td>
                      <td>{reseller.lastOrder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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

        .chart-container {
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chart-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .chart-bars {
          display: flex;
          justify-content: space-around;
          align-items: end;
          height: 200px;
          padding: 0 20px;
        }

        .chart-bar-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }

        .chart-bar {
          width: 40px;
          background: linear-gradient(135deg, #007bff, #0056b3);
          border-radius: 4px 4px 0 0;
          min-height: 20px;
          margin-bottom: 10px;
          transition: all 0.3s ease;
        }

        .chart-bar:hover {
          opacity: 0.8;
        }

        .chart-label {
          font-size: 0.875rem;
          color: #6c757d;
          font-weight: 500;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .status-pending {
          background-color: #fff3cd;
          color: #856404;
        }

        .status-approved {
          background-color: #d1ecf1;
          color: #0c5460;
        }

        .status-ready-check {
          background-color: #d4edda;
          color: #155724;
        }

        .status-ready-ship {
          background-color: #e2e3e5;
          color: #383d41;
        }

        .rank-badge {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #007bff, #0056b3);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.875rem;
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
          
          .chart-bars {
            padding: 0 10px;
          }
          
          .chart-bar {
            width: 30px;
          }
        }
      `}</style>
    </>
  )
}