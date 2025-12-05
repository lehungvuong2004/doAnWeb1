/* Hero Mountain Section - CSS riêng để tránh trùng Bootstrap */
.moutain {
  background-image: url("/gioithieu.jpg");
  min-height: 400px;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 56px;
}

.moutain::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.mountain__back {
  position: relative;
  z-index: 1;
  text-align: center;
}

.mountain__back h6 {
  color: #fff;
  margin: 0;
}

.mountain__back span {
  color: #ffc107;
}

.mountain__title {
  color: #fff;
  font-size: 3rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
}

/* Thêm style cho row bên trong moutain */
.moutain .info-row {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;
  padding: 0 15px;
}

.info-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 193, 7, 0.2);
}

.info-icon {
  color: #ffc107;
  margin-bottom: 1rem;
}

.info-card h5 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #ffc107;
}

.info-card p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

/* About Section */
.about-section {
  background-color: #fff;
}

.about-image-wrapper {
  position: relative;
}

.about-image-wrapper::before {
  content: "";
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100%;
  height: 100%;
  border: 3px solid #ffc107;
  border-radius: 0.375rem;
  z-index: -1;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
}

/* Features Section */
.feature-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
}

.icon-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #ffc107, #ff9800);
  border-radius: 50%;
  font-size: 2rem;
}

/* Chef Section */
.chef-image img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border: 4px solid #ffc107;
  transition: transform 0.3s ease;
}

.chef-card:hover .chef-image img {
  transform: scale(1.05);
}

/* Footer */
.footer-section {
  background: linear-gradient(to right, #1a1a1a, #2d2d2d);
}


