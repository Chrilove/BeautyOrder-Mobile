'use client'

import { useAuth } from '../../components/AuthProvider'
import Sidebar from '../../components/sidebar-reseller'
import { useState, useEffect, useRef } from 'react'

export default function ResellerProfile() {
  const { user, loading } = useAuth()
  const [profileData, setProfileData] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [activeTab, setActiveTab] = useState('profile')
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('success')
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  // Mock data - replace with API call
  useEffect(() => {
    const mockProfile = {
      personalInfo: {
        fullName: 'Sari Beauty Store',
        username: 'saristore',
        email: 'sari@beautystore.com',
        phone: '+62 812-3456-7890',
        joinDate: '2024-03-15',
        status: 'active',
        profileImage: null
      },
      resellerInfo: {
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
      businessInfo: {
        businessName: 'Sari Beauty Store',
        businessType: 'Online Shop',
        socialMedia: {
          instagram: '@saribeautystore',
          whatsapp: '+62 812-3456-7890',
          tokopedia: 'saribeautystore',
          shopee: 'sari.beauty'
        }
      },
      addressInfo: {
        address: 'Jl. Sudirman No. 123',
        city: 'Jakarta Pusat',
        province: 'DKI Jakarta',
        postalCode: '10220',
        country: 'Indonesia'
      },
      bankInfo: {
        bankName: 'Bank BCA',
        accountNumber: '1234567890',
        accountName: 'Sari Beauty Store'
      }
    }
    setProfileData(mockProfile)
    setFormData(mockProfile)
  }, [])

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleSocialMediaChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        socialMedia: {
          ...prev.businessInfo.socialMedia,
          [platform]: value
        }
      }
    }))
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setAlertMessage('Ukuran file terlalu besar. Maksimal 5MB.')
        setAlertType('danger')
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 3000)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        setProfileImage(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setProfileImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSaveProfile = () => {
    // Simulate API call
    setTimeout(() => {
      const updatedProfile = { ...formData }
      if (imagePreview) {
        updatedProfile.personalInfo.profileImage = imagePreview
      }
      setProfileData(updatedProfile)
      setIsEditing(false)
      setImagePreview(null)
      setProfileImage(null)
      setAlertMessage('Profil berhasil diperbarui!')
      setAlertType('success')
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    }, 1000)
  }

  const handleCancelEdit = () => {
    setFormData(profileData)
    setIsEditing(false)
    setImagePreview(null)
    setProfileImage(null)
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    // Simulate password change
    setAlertMessage('Password berhasil diubah!')
    setAlertType('success')
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      'in_transit': { class: 'bg-primary', text: 'Dalam Perjalanan' },
      'delivered': { class: 'bg-success', text: 'Terkirim' },
      'pending': { class: 'bg-warning', text: 'Menunggu' },
      'cancelled': { class: 'bg-danger', text: 'Dibatalkan' },
      'active': { class: 'bg-success', text: 'Aktif' }
    }
    return statusMap[status] || { class: 'bg-secondary', text: status }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return <div>Loading...</div>
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">
              <i className="fas fa-user-tie me-2 text-primary"></i>
              Profil Reseller
            </h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="badge bg-success fs-6 me-2">
                <i className="fas fa-user-tie me-1"></i>
                {user?.username || 'Reseller'}
              </div>
            </div>
          </div>

          {/* Alert */}
          {showAlert && (
            <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
              <i className={`fas ${alertType === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2`}></i>
              {alertMessage}
              <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
            </div>
          )}

          {/* Profile Header Card */}
          <div className="card mb-4 bg-gradient-primary text-white">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-auto">
                  <div className="position-relative">
                    <div className="avatar-lg rounded-circle bg-white d-flex align-items-center justify-content-center overflow-hidden">
                      {imagePreview || profileData.personalInfo.profileImage ? (
                        <img 
                          src={imagePreview || profileData.personalInfo.profileImage} 
                          alt="Profile" 
                          className="w-100 h-100 object-fit-cover"
                        />
                      ) : (
                        <i className="fas fa-user-tie fa-3x text-primary"></i>
                      )}
                    </div>
                    {isEditing && (
                      <div className="position-absolute bottom-0 end-0">
                        <button 
                          className="btn btn-sm btn-light rounded-circle"
                          onClick={() => fileInputRef.current?.click()}
                          title="Upload foto"
                        >
                          <i className="fas fa-camera"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col">
                  <h3 className="text-white mb-1">{profileData.personalInfo.fullName}</h3>
                  <p className="text-white-50 mb-2">@{profileData.personalInfo.username}</p>
                  <div className="d-flex flex-wrap gap-2">
                    <span className={`badge ${getStatusBadge(profileData.personalInfo.status).class} fs-6`}>
                      <i className="fas fa-check-circle me-1"></i>
                      {getStatusBadge(profileData.personalInfo.status).text}
                    </span>
                  </div>
                </div>
                <div className="col-auto text-end">
                  <div className="text-white-50 small">Bergabung sejak</div>
                  <div className="text-white fw-bold">
                    {new Date(profileData.personalInfo.joinDate).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="d-none"
          />

          {/* Tabs */}
          <ul className="nav nav-tabs mb-4" role="tablist">
            <li className="nav-item" role="presentation">
              <button 
                className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <i className="fas fa-user me-2"></i>Data Pribadi
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button 
                className={`nav-link ${activeTab === 'reseller' ? 'active' : ''}`}
                onClick={() => setActiveTab('reseller')}
              >
                <i className="fas fa-store me-2"></i>Info Reseller
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button 
                className={`nav-link ${activeTab === 'business' ? 'active' : ''}`}
                onClick={() => setActiveTab('business')}
              >
                <i className="fas fa-briefcase me-2"></i>Info Bisnis
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button 
                className={`nav-link ${activeTab === 'address' ? 'active' : ''}`}
                onClick={() => setActiveTab('address')}
              >
                <i className="fas fa-map-marker-alt me-2"></i>Alamat
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button 
                className={`nav-link ${activeTab === 'bank' ? 'active' : ''}`}
                onClick={() => setActiveTab('bank')}
              >
                <i className="fas fa-university me-2"></i>Rekening Bank
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button 
                className={`nav-link ${activeTab === 'password' ? 'active' : ''}`}
                onClick={() => setActiveTab('password')}
              >
                <i className="fas fa-lock me-2"></i>Ubah Password
              </button>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="fas fa-user me-2"></i>Data Pribadi
                  </h5>
                  {!isEditing ? (
                    <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                      <i className="fas fa-edit me-1"></i>Edit Profil
                    </button>
                  ) : (
                    <div className="btn-group">
                      <button className="btn btn-success btn-sm" onClick={handleSaveProfile}>
                        <i className="fas fa-save me-1"></i>Simpan
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>
                        <i className="fas fa-times me-1"></i>Batal
                      </button>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  {/* Photo Upload Section */}
                  {isEditing && (
                    <div className="mb-4">
                      <label className="form-label fw-bold">Foto Profil</label>
                      <div className="d-flex align-items-center gap-3">
                        <div className="avatar-md rounded-circle bg-light d-flex align-items-center justify-content-center overflow-hidden">
                          {imagePreview || profileData.personalInfo.profileImage ? (
                            <img 
                              src={imagePreview || profileData.personalInfo.profileImage} 
                              alt="Preview" 
                              className="w-100 h-100 object-fit-cover"
                            />
                          ) : (
                            <i className="fas fa-user fa-2x text-muted"></i>
                          )}
                        </div>
                        <div>
                          <button 
                            type="button" 
                            className="btn btn-outline-primary btn-sm me-2"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <i className="fas fa-upload me-1"></i>Upload Foto
                          </button>
                          {(imagePreview || profileData.personalInfo.profileImage) && (
                            <button 
                              type="button" 
                              className="btn btn-outline-danger btn-sm"
                              onClick={handleRemoveImage}
                            >
                              <i className="fas fa-trash me-1"></i>Hapus
                            </button>
                          )}
                          <div className="small text-muted mt-1">
                            Format: JPG, PNG. Maksimal 5MB.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Nama Lengkap</label>
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          value={formData.personalInfo?.fullName || ''}
                          onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                        />
                      ) : (
                        <p className="form-control-plaintext">{profileData.personalInfo.fullName}</p>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Username</label>
                      <p className="form-control-plaintext">{profileData.personalInfo.username}</p>
                      <small className="text-muted">Username tidak dapat diubah</small>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          className="form-control"
                          value={formData.personalInfo?.email || ''}
                          onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                        />
                      ) : (
                        <p className="form-control-plaintext">{profileData.personalInfo.email}</p>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">No. Telepon</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          className="form-control"
                          value={formData.personalInfo?.phone || ''}
                          onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                        />
                      ) : (
                        <p className="form-control-plaintext">{profileData.personalInfo.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reseller Info Tab */}
            {activeTab === 'reseller' && (
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="fas fa-store me-2"></i>Informasi Reseller
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">ID Reseller</label>
                      <p className="form-control-plaintext">
                        <span className="badge bg-primary fs-6">{profileData.resellerInfo.id}</span>
                      </p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Order ID</label>
                      <p className="form-control-plaintext">
                        <span className="badge bg-info fs-6">{profileData.resellerInfo.orderId}</span>
                      </p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Nama Reseller</label>
                      <p className="form-control-plaintext">{profileData.resellerInfo.reseller}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Status</label>
                      <p className="form-control-plaintext">
                        <span className={`badge ${getStatusBadge(profileData.resellerInfo.status).class} fs-6`}>
                          {getStatusBadge(profileData.resellerInfo.status).text}
                        </span>
                      </p>
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label fw-bold">Alamat Pengiriman</label>
                      <p className="form-control-plaintext">{profileData.resellerInfo.address}</p>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold">Kurir</label>
                      <p className="form-control-plaintext">
                        <span className="badge bg-secondary">{profileData.resellerInfo.courier}</span>
                      </p>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold">Layanan</label>
                      <p className="form-control-plaintext">{profileData.resellerInfo.service}</p>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold">Berat</label>
                      <p className="form-control-plaintext">{profileData.resellerInfo.weight}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">No. Resi</label>
                      <p className="form-control-plaintext">
                        <code>{profileData.resellerInfo.trackingNumber}</code>
                      </p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Biaya Kirim</label>
                      <p className="form-control-plaintext text-success fw-bold">{profileData.resellerInfo.cost}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Estimasi Tiba</label>
                      <p className="form-control-plaintext">{profileData.resellerInfo.estimatedDelivery}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Tanggal Dibuat</label>
                      <p className="form-control-plaintext">{profileData.resellerInfo.createdDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Business Tab */}
            {activeTab === 'business' && (
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="fas fa-briefcase me-2"></i>Informasi Bisnis
                  </h5>
                  {!isEditing ? (
                    <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                      <i className="fas fa-edit me-1"></i>Edit Bisnis
                    </button>
                  ) : (
                    <div className="btn-group">
                      <button className="btn btn-success btn-sm" onClick={handleSaveProfile}>
                        <i className="fas fa-save me-1"></i>Simpan
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>
                        <i className="fas fa-times me-1"></i>Batal
                      </button>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Nama Bisnis</label>
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          value={formData.businessInfo?.businessName || ''}
                          onChange={(e) => handleInputChange('businessInfo', 'businessName', e.target.value)}
                        />
                      ) : (
                        <p className="form-control-plaintext">{profileData.businessInfo.businessName}</p>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Jenis Bisnis</label>
                      {isEditing ? (
                        <select
                          className="form-select"
                          value={formData.businessInfo?.businessType || ''}
                          onChange={(e) => handleInputChange('businessInfo', 'businessType', e.target.value)}
                        >
                          <option value="Online Shop">Online Shop</option>
                          <option value="Toko Fisik">Toko Fisik</option>
                          <option value="Reseller Perorangan">Reseller Perorangan</option>
                          <option value="Distributor">Distributor</option>
                        </select>
                      ) : (
                        <p className="form-control-plaintext">{profileData.businessInfo.businessType}</p>
                      )}
                    </div>
                  </div>
                  
                  <h6 className="fw-bold mb-3">
                    <i className="fas fa-share-alt me-2"></i>Media Sosial & Platform
                  </h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <i className="fab fa-instagram text-danger me-2"></i>Instagram
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="@username"
                          value={formData.businessInfo?.socialMedia?.instagram || ''}
                          onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                        />
                      ) : (
                        <p className="form-control-plaintext">{profileData.businessInfo.socialMedia.instagram || '-'}</p>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <i className="fab fa-whatsapp text-success me-2"></i>WhatsApp Business
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="+62 8xx-xxxx-xxxx"
                          value={formData.businessInfo?.socialMedia?.whatsapp || ''}
                          onChange={(e) => handleSocialMediaChange('whatsapp', e.target.value)}
                        />
                      ) : (
                        <p className="form-control-plaintext">{profileData.businessInfo.socialMedia.whatsapp || '-'}</p>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <i className="fas fa-shopping-bag text-success me-2"></i>Tokopedia
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="nama-toko"
                          value={formData.businessInfo?.socialMedia?.tokopedia || ''}
                          onChange={(e) => handleSocialMediaChange('tokopedia', e.target.value)}
                        />
                      ) : (
                        <p className="form-control-plaintext">{profileData.businessInfo.socialMedia.tokopedia || '-'}</p>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <i className="fas fa-shopping-cart text-danger me-2"></i>Shopee
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="nama.toko"
                          value={formData.businessInfo?.socialMedia?.shopee || ''}
                          onChange={(e) => handleSocialMediaChange('shopee', e.target.value)}
                        />
                      ) : (
                        <p className="form-control-plaintext">{profileData.businessInfo.socialMedia.shopee || '-'}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Address Tab */}
            {activeTab === 'address' && (
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="fas fa-map-marker-alt me-2"></i>Alamat Pengiriman
                  </h5>
                  {!isEditing ? (
                    <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                      <i className="fas fa-edit me-1"></i>Edit Alamat
                    </button>
                  ) : (
                    <div className="btn-group">
                      <button className="btn btn-success btn-sm" onClick={handleSaveProfile}>
                        <i className="fas fa-save me-1"></i>Simpan
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>
                        <i className="fas fa-times me-1"></i>Batal
                      </button>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label className="form-label fw-bold">Alamat Lengkap</label>
                      {isEditing ? (
                        <textarea
                          className="form-control"
                          rows="3"
                          value={formData.addressInfo?.address || ''}
                          onChange={(e) => handleInputChange('addressInfo', 'address', e.target.value)}
                        />
                      ) : (
                        <p className="form-control-plaintext">{profileData.addressInfo.address}</p>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Kota</label>
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          value={formData.addressInfo?.city || ''}
                          onChange={(e) => handleInputChange('addressInfo', 'city', e.target.value)}
                        />
                      ) : (
                        <p className="form-control-plaintext">{profileData.addressInfo.city}</p>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Provinsi</label>
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          value={formData.addressInfo?.province || ''}
                          onChange={(e) => handleInputChange('addressInfo', 'province', e.target.value)}
                          />
                        ) : (
                          <p className="form-control-plaintext">{profileData.addressInfo.province}</p>
                        )}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Kode Pos</label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={formData.addressInfo?.postalCode || ''}
                            onChange={(e) => handleInputChange('addressInfo', 'postalCode', e.target.value)}
                          />
                        ) : (
                          <p className="form-control-plaintext">{profileData.addressInfo.postalCode}</p>
                        )}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Negara</label>
                        {isEditing ? (
                          <select
                            className="form-select"
                            value={formData.addressInfo?.country || ''}
                            onChange={(e) => handleInputChange('addressInfo', 'country', e.target.value)}
                          >
                            <option value="Indonesia">Indonesia</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Singapore">Singapore</option>
                          </select>
                        ) : (
                          <p className="form-control-plaintext">{profileData.addressInfo.country}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
  
              {/* Bank Tab */}
              {activeTab === 'bank' && (
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      <i className="fas fa-university me-2"></i>Informasi Rekening Bank
                    </h5>
                    {!isEditing ? (
                      <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                        <i className="fas fa-edit me-1"></i>Edit Bank
                      </button>
                    ) : (
                      <div className="btn-group">
                        <button className="btn btn-success btn-sm" onClick={handleSaveProfile}>
                          <i className="fas fa-save me-1"></i>Simpan
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>
                          <i className="fas fa-times me-1"></i>Batal
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Nama Bank</label>
                        {isEditing ? (
                          <select
                            className="form-select"
                            value={formData.bankInfo?.bankName || ''}
                            onChange={(e) => handleInputChange('bankInfo', 'bankName', e.target.value)}
                          >
                            <option value="">Pilih Bank</option>
                            <option value="Bank BCA">Bank BCA</option>
                            <option value="Bank BNI">Bank BNI</option>
                            <option value="Bank BRI">Bank BRI</option>
                            <option value="Bank Mandiri">Bank Mandiri</option>
                            <option value="Bank CIMB Niaga">Bank CIMB Niaga</option>
                            <option value="Bank Danamon">Bank Danamon</option>
                            <option value="Bank Permata">Bank Permata</option>
                            <option value="Bank BTN">Bank BTN</option>
                          </select>
                        ) : (
                          <p className="form-control-plaintext">{profileData.bankInfo.bankName}</p>
                        )}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Nomor Rekening</label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={formData.bankInfo?.accountNumber || ''}
                            onChange={(e) => handleInputChange('bankInfo', 'accountNumber', e.target.value)}
                          />
                        ) : (
                          <p className="form-control-plaintext">
                            <code>{profileData.bankInfo.accountNumber}</code>
                          </p>
                        )}
                      </div>
                      <div className="col-12 mb-3">
                        <label className="form-label fw-bold">Nama Pemilik Rekening</label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={formData.bankInfo?.accountName || ''}
                            onChange={(e) => handleInputChange('bankInfo', 'accountName', e.target.value)}
                          />
                        ) : (
                          <p className="form-control-plaintext">{profileData.bankInfo.accountName}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="alert alert-info">
                      <i className="fas fa-info-circle me-2"></i>
                      <strong>Penting:</strong> Pastikan informasi rekening bank yang Anda masukkan benar dan aktif. 
                      Informasi ini akan digunakan untuk proses pembayaran komisi reseller.
                    </div>
                  </div>
                </div>
              )}
  
              {/* Password Tab */}
              {activeTab === 'password' && (
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-lock me-2"></i>Ubah Password
                    </h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleChangePassword}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">Password Lama</label>
                            <input
                              type="password"
                              className="form-control"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label fw-bold">Password Baru</label>
                            <input
                              type="password"
                              className="form-control"
                              required
                            />
                            <div className="form-text">
                              Password minimal 8 karakter, kombinasi huruf dan angka
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label fw-bold">Konfirmasi Password Baru</label>
                            <input
                              type="password"
                              className="form-control"
                              required
                            />
                          </div>
                          <button type="submit" className="btn btn-primary">
                            <i className="fas fa-key me-1"></i>Ubah Password
                          </button>
                        </div>
                        <div className="col-md-6">
                          <div className="alert alert-warning">
                            <h6 className="alert-heading">
                              <i className="fas fa-shield-alt me-2"></i>Tips Keamanan Password
                            </h6>
                            <ul className="mb-0 small">
                              <li>Gunakan minimal 8 karakter</li>
                              <li>Kombinasikan huruf besar dan kecil</li>
                              <li>Sertakan angka dan simbol</li>
                              <li>Jangan gunakan informasi pribadi</li>
                              <li>Ubah password secara berkala</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
  
            </div>
          </main>
        </div>
  
        {/* Custom Styles */}
        <style jsx>{`
          .avatar-lg {
            width: 80px;
            height: 80px;
          }
          
          .avatar-md {
            width: 60px;
            height: 60px;
          }
          
          .bg-gradient-primary {
            background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
          }
          
          .object-fit-cover {
            object-fit: cover;
          }
          
          .nav-tabs .nav-link {
            color: #6c757d;
            border: none;
            border-bottom: 2px solid transparent;
            background: none;
          }
          
          .nav-tabs .nav-link:hover {
            border-bottom-color: #dee2e6;
            background: rgba(0,0,0,0.05);
          }
          
          .nav-tabs .nav-link.active {
            color: #495057;
            border-bottom-color: #007bff;
            background: none;
            font-weight: 500;
          }
          
          .card {
            box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
            border: 1px solid rgba(0, 0, 0, 0.125);
          }
          
          .card-header {
            background-color: #f8f9fa;
            border-bottom: 1px solid rgba(0, 0, 0, 0.125);
          }
          
          .form-control-plaintext {
            padding-left: 0;
            margin-bottom: 0;
          }
          
          .badge {
            font-weight: 500;
          }
          
          code {
            color: #e83e8c;
            background-color: #f8f9fa;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
          }
          
          .btn-group .btn {
            margin-left: 0;
          }
          
          .alert {
            border: none;
            border-radius: 0.5rem;
          }
          
          .spinner-border {
            width: 3rem;
            height: 3rem;
          }
        `}</style>
      </div>
    )
  }