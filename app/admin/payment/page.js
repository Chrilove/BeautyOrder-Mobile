'use client';
import Sidebar from '../../components/Sidebar'

export default function PaymentPage() {
  const payments = [
    {
      id: '#TXN2025001',
      customer: 'Beauty Store Jakarta',
      email: 'jakarta@beauty.com',
      date: '29 Mei 2025',
      time: '14:32',
      amount: 'Rp 2.150.000',
      method: 'Bank BCA',
      reference: 'BCX789456123',
      status: 'success'
    },
    {
      id: '#TXN2025002',
      customer: 'Skincare Premium',
      email: 'premium@skincare.id',
      date: '28 Mei 2025',
      time: '09:15',
      amount: 'Rp 1.750.000',
      method: 'GoPay',
      reference: 'GP987654321',
      status: 'processing'
    },
    {
      id: '#TXN2025003',
      customer: 'Natural Beauty Co',
      email: 'natural@beauty.co',
      date: '28 Mei 2025',
      time: '16:45',
      amount: 'Rp 890.000',
      method: 'OVO',
      reference: 'OV123456789',
      status: 'failed'
    },
    {
      id: '#TXN2025004',
      customer: 'Glow Cosmetics',
      email: 'glow@cosmetics.com',
      date: '27 Mei 2025',
      time: '11:20',
      amount: 'Rp 3.200.000',
      method: 'Bank Mandiri',
      reference: 'MDR456789123',
      status: 'success'
    }
  ]

  const getStatusBadge = (status) => {
    switch(status) {
      case 'success':
        return <span className="status-badge status-success">Berhasil</span>
      case 'processing':
        return <span className="status-badge status-processing">Diproses</span>
      case 'failed':
        return <span className="status-badge status-failed">Gagal</span>
      default:
        return <span className="status-badge">{status}</span>
    }
  }

  const handleRetryPayment = (paymentId) => {
    console.log(`Retrying payment ${paymentId}`)
  }

  const handleViewDetails = (paymentId) => {
    console.log(`Viewing details for payment ${paymentId}`)
  }

  const handleRefreshPayments = () => {
    console.log('Refreshing payment data...')
  }

  return (
    <>
      <Sidebar />
      <div className="main-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Payment Gateway</h2>
          <div>
            <button 
              className="btn btn-outline-secondary me-2"
              onClick={handleRefreshPayments}
            >
              Refresh
            </button>
            <select className="form-select" style={{width: 'auto', display: 'inline-block'}}>
              <option>Semua Status</option>
              <option>Berhasil</option>
              <option>Diproses</option>
              <option>Gagal</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="summary-card">
              <div className="summary-icon bg-primary">💰</div>
              <div className="summary-info">
                <h4>Rp 15.650.000</h4>
                <p>Pendapatan Bulan Ini</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="summary-card">
              <div className="summary-icon bg-success">📊</div>
              <div className="summary-info">
                <h4>187</h4>
                <p>Total Transaksi</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="summary-card">
              <div className="summary-icon bg-warning">📈</div>
              <div className="summary-info">
                <h4>Rp 83.688</h4>
                <p>Rata-rata Transaksi</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="summary-card">
              <div className="summary-icon bg-info">✅</div>
              <div className="summary-info">
                <h4>94.2%</h4>
                <p>Tingkat Sukses</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID Transaksi</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Tanggal & Waktu</th>
                  <th>Metode Pembayaran</th>
                  <th>Jumlah</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      <div className="fw-bold text-primary">{payment.id}</div>
                      <small className="text-muted">Ref: {payment.reference}</small>
                    </td>
                    <td>{payment.customer}</td>
                    <td className="text-muted">{payment.email}</td>
                    <td>
                      <div>{payment.date}</div>
                      <small className="text-muted">{payment.time}</small>
                    </td>
                    <td>{payment.method}</td>
                    <td className="fw-bold">{payment.amount}</td>
                    <td>{getStatusBadge(payment.status)}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleViewDetails(payment.id)}
                        >
                          Detail
                        </button>
                        {payment.status === 'failed' && (
                          <button 
                            className="btn btn-sm btn-warning"
                            onClick={() => handleRetryPayment(payment.id)}
                          >
                            Retry
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <span className="text-muted">
            Menampilkan {payments.length} dari 187 transaksi
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
        .table-container {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .summary-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .summary-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }

        .summary-info h4 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: bold;
          color: #495057;
        }

        .summary-info p {
          margin: 0.25rem 0 0 0;
          color: #6c757d;
          font-size: 0.9rem;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .status-success {
          background-color: #d1ecf1;
          color: #0c5460;
        }

        .status-processing {
          background-color: #fff3cd;
          color: #856404;
        }

        .status-failed {
          background-color: #f8d7da;
          color: #721c24;
        }

        .table th {
          border-top: none;
          font-weight: 600;
          color: #495057;
        }

        .table td {
          vertical-align: middle;
        }

        .main-content {
          margin-left: 250px;
          padding: 2rem;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .row {
          display: flex;
          flex-wrap: wrap;
          margin: -0.5rem;
        }

        .col-md-3 {
          flex: 0 0 25%;
          max-width: 25%;
          padding: 0.5rem;
        }

        .d-flex {
          display: flex;
        }

        .justify-content-between {
          justify-content: space-between;
        }

        .align-items-center {
          align-items: center;
        }

        .gap-2 {
          gap: 0.5rem;
        }

        .mb-4 {
          margin-bottom: 1.5rem;
        }

        .mt-4 {
          margin-top: 1.5rem;
        }

        .me-2 {
          margin-right: 0.5rem;
        }

        .fw-bold {
          font-weight: bold;
        }

        .text-primary {
          color: #007bff;
        }

        .text-muted {
          color: #6c757d;
        }

        .btn {
          padding: 0.375rem 0.75rem;
          border-radius: 4px;
          border: 1px solid;
          cursor: pointer;
          font-size: 0.875rem;
          text-decoration: none;
          display: inline-block;
        }

        .btn-sm {
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
        }

        .btn-outline-primary {
          color: #007bff;
          border-color: #007bff;
          background: white;
        }

        .btn-outline-primary:hover {
          background: #007bff;
          color: white;
        }

        .btn-outline-secondary {
          color: #6c757d;
          border-color: #6c757d;
          background: white;
        }

        .btn-outline-secondary:hover {
          background: #6c757d;
          color: white;
        }

        .btn-warning {
          background: #ffc107;
          border-color: #ffc107;
          color: #212529;
        }

        .btn-warning:hover {
          background: #e0a800;
          border-color: #d39e00;
        }

        .form-select {
          padding: 0.375rem 0.75rem;
          border: 1px solid #ced4da;
          border-radius: 4px;
          background: white;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
        }

        .table-hover tbody tr:hover {
          background-color: rgba(0,0,0,0.05);
        }

        .table-light {
          background-color: #f8f9fa;
        }

        .table th, .table td {
          padding: 0.75rem;
          border-bottom: 1px solid #dee2e6;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .pagination {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .pagination-sm .page-link {
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
        }

        .page-item .page-link {
          padding: 0.375rem 0.75rem;
          margin-left: -1px;
          color: #007bff;
          background-color: #fff;
          border: 1px solid #dee2e6;
          text-decoration: none;
        }

        .page-item.active .page-link {
          background-color: #007bff;
          border-color: #007bff;
          color: white;
        }

        .page-item.disabled .page-link {
          color: #6c757d;
          background-color: #fff;
          border-color: #dee2e6;
          cursor: not-allowed;
        }

        .mb-0 {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
            padding: 1rem;
          }

          .col-md-3 {
            flex: 0 0 100%;
            max-width: 100%;
          }

          .d-flex {
            flex-direction: column;
            gap: 1rem;
          }

          .table-responsive {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </>
  )
}