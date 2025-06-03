'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('admin')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRoleChange = (role) => {
    setSelectedRole(role)
    setUsername('')
    setPassword('')
    setError('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Validate credentials
    let isValid = false
    let redirectUrl = '/'

    if (selectedRole === 'admin' && username === 'admin' && password === 'admin') {
      isValid = true
      redirectUrl = '/'
    } else if (selectedRole === 'reseller' && username === 'reseller' && password === 'reseller') {
      isValid = true
      redirectUrl = '/reseller'
    }

    if (isValid) {
      // Set cookies for authentication
      document.cookie = `auth-token=authenticated; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
      document.cookie = `user-role=${selectedRole}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
      document.cookie = `username=${username}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
      
      router.push(redirectUrl)
    } else {
      setError('Username atau password salah!')
    }
    
    setIsLoading(false)
  }

  const handleDemoFill = (role) => {
    if (role === 'admin') {
      setUsername('admin')
      setPassword('admin')
    } else if (role === 'reseller') {
      setUsername('reseller')
      setPassword('reseller')
    }
  }

  return (
    <div className="login-page">
      <div className="login-overlay"></div>
      
      <div className="login-container">
        <div className="brand-logo">
          <Image 
            src="/images/logo2.jpg" 
            alt="BeautyOrder Logo" 
            width={80} 
            height={80}
            className="logo-img"
          />
          <div className="brand-title">BeautyOrder</div>
          <div className="brand-subtitle">Sistem Pemesanan Kecantikan</div>
        </div>

        <form onSubmit={handleLogin}>
          <div className="role-selector text-center">
            <button 
              type="button" 
              className={`role-btn ${selectedRole === 'admin' ? 'active' : ''}`}
              onClick={() => handleRoleChange('admin')}
              onDoubleClick={() => handleDemoFill('admin')}
            >
              <i className="fas fa-user-shield"></i> Admin
            </button>
            <button 
              type="button" 
              className={`role-btn ${selectedRole === 'reseller' ? 'active' : ''}`}
              onClick={() => handleRoleChange('reseller')}
              onDoubleClick={() => handleDemoFill('reseller')}
            >
              <i className="fas fa-store"></i> Reseller
            </button>
          </div>

          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-user"></i>
            </span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-lock"></i>
            </span>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-login"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin me-2"></i>Masuk...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt me-2"></i>Masuk
              </>
            )}
          </button>
        </form>

        <div className="login-info">
          <div className="text-center mb-2">
            <strong>Demo Accounts:</strong>
          </div>
          <div className="demo-accounts">
            <strong>Admin:</strong> admin / admin<br />
            <strong>Reseller:</strong> reseller / reseller
          </div>
          <div className="text-center mt-2">
            <small>💡 Double click role button untuk auto-fill</small>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
          background-image: url('/images/desktop-bg.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .login-page {
            background-image: url('/images/mobile-bg.jpg');
          }
        }

        .login-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        .login-container {
          position: relative;
          z-index: 2;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 400px;
          margin: 20px;
        }

        .brand-logo {
          text-align: center;
          margin-bottom: 30px;
        }

        .logo-img {
          border-radius: 50%;
          margin-bottom: 15px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .brand-title {
          color: #d9b3ff;
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .brand-subtitle {
          color: #666;
          font-size: 0.9rem;
        }

        .form-control {
          border-radius: 15px;
          border: 2px solid #e9ecef;
          padding: 15px 20px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          border-color: #d9b3ff;
          box-shadow: 0 0 0 0.2rem rgba(217, 179, 255, 0.25);
        }

        .input-group {
          margin-bottom: 20px;
          display: flex;
        }

        .input-group-text {
          background: linear-gradient(135deg, #d9b3ff 0%, #c39be6 100%);
          border: none;
          color: white;
          border-radius: 15px 0 0 15px;
          padding: 15px 20px;
          display: flex;
          align-items: center;
        }

        .btn-login {
          background: linear-gradient(135deg, #d9b3ff 0%, #c39be6 100%);
          border: none;
          border-radius: 15px;
          padding: 12px 30px;
          font-weight: 600;
          color: white;
          width: 100%;
          transition: all 0.3s ease;
        }

        .btn-login:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(217, 179, 255, 0.4);
          color: white;
        }

        .btn-login:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .role-selector {
          margin-bottom: 25px;
        }

        .role-btn {
          background: transparent;
          border: 2px solid #d9b3ff;
          color: #d9b3ff;
          border-radius: 12px;
          padding: 8px 16px;
          margin: 0 5px 10px 0;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .role-btn.active {
          background: linear-gradient(135deg, #d9b3ff 0%, #c39be6 100%);
          color: white;
        }

        .role-btn:hover {
          background: linear-gradient(135deg, #d9b3ff 0%, #c39be6 100%);
          color: white;
        }

        .login-info {
          background: rgba(217, 179, 255, 0.1);
          border-radius: 10px;
          padding: 15px;
          margin-top: 20px;
          font-size: 0.85rem;
          color: #666;
        }

        .demo-accounts {
          margin-top: 10px;
        }

        .demo-accounts strong {
          color: #d9b3ff;
        }

        .alert {
          border-radius: 10px;
          margin-bottom: 20px;
          padding: 10px 15px;
        }

        .alert-danger {
          background-color: #f8d7da;
          border-color: #f5c6cb;
          color: #721c24;
        }

        @media (max-width: 576px) {
          .login-container {
            padding: 30px 20px;
            margin: 10px;
          }
          
          .brand-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}