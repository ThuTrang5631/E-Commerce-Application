# 📱 Hướng Dẫn Routing - E-Commerce Application

## 🎯 Tổng quan

Website E-Commerce đã được cấu hình với React Router v7 và các trang chính sau:

## 🗺️ Cấu trúc Routes

### Trang chính

| Route | Component | Mô tả |
|-------|-----------|-------|
| `/` | `Home` | Trang chủ với hero section, danh mục và sản phẩm nổi bật |
| `/products` | `Products` | Danh sách tất cả sản phẩm với filter và phân trang |
| `/products/:id` | `ProductDetail` | Chi tiết sản phẩm với ảnh, thông tin và đánh giá |
| `/cart` | `Cart` | Giỏ hàng với quản lý số lượng |
| `/checkout` | `Checkout` | Thanh toán với form thông tin giao hàng |
| `/login` | `Login` | Đăng nhập |
| `/register` | `Register` | Đăng ký tài khoản mới |

## 📂 Cấu trúc File

```
src/
├── App.tsx                 # Cấu hình routes chính
├── components/
│   └── Layout.tsx         # Layout với Header, Footer và Navigation
├── pages/
│   ├── Home.tsx           # Trang chủ
│   ├── Products.tsx       # Danh sách sản phẩm
│   ├── ProductDetail.tsx  # Chi tiết sản phẩm
│   ├── Cart.tsx           # Giỏ hàng
│   ├── Checkout.tsx       # Thanh toán
│   ├── Login.tsx          # Đăng nhập
│   └── Register.tsx       # Đăng ký
└── main.tsx               # Entry point
```

## 🔧 Cấu hình trong App.tsx

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
// ... import các pages

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}
```

## 🎨 Layout Component

Layout component sử dụng `<Outlet />` để render các trang con:

- **Header**: Logo, Navigation, Giỏ hàng, Đăng nhập/Đăng ký
- **Main Content**: Nội dung trang (qua `<Outlet />`)
- **Footer**: Thông tin công ty và liên kết

## 🚀 Navigation

### Desktop Navigation
- Hiển thị menu ngang với các link chính
- Badge số lượng sản phẩm trong giỏ hàng
- Nút đăng nhập/đăng ký

### Mobile Navigation
- Hamburger menu
- Dropdown menu với tất cả các link
- Responsive design

## 📝 Sử dụng

### Navigation cơ bản
```tsx
import { Link } from 'react-router-dom';

// Link đơn giản
<Link to="/products">Sản phẩm</Link>

// Link với dynamic parameter
<Link to={`/products/${productId}`}>Chi tiết</Link>
```

### Programmatic Navigation
```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navigate sau khi submit form
const handleSubmit = () => {
  // ... xử lý
  navigate('/checkout');
};
```

### Lấy URL Parameters
```tsx
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  // id từ route /products/:id
};
```

## 🎯 Tính năng đã implement

### ✅ Trang Home
- Hero section với CTA
- Grid danh mục sản phẩm
- Sản phẩm nổi bật

### ✅ Trang Products
- Filter theo danh mục
- Sắp xếp sản phẩm
- Grid responsive
- Pagination

### ✅ Trang Product Detail
- Gallery ảnh sản phẩm
- Thông tin chi tiết
- Điều chỉnh số lượng
- Thêm vào giỏ hàng
- Đánh giá sản phẩm

### ✅ Trang Cart
- Danh sách sản phẩm trong giỏ
- Cập nhật số lượng
- Xóa sản phẩm
- Tổng đơn hàng
- Empty state

### ✅ Trang Checkout
- Form thông tin giao hàng
- Chọn phương thức thanh toán
- Tóm tắt đơn hàng
- Validation

### ✅ Trang Login/Register
- Form đăng nhập/đăng ký
- Social login buttons
- Validation

## 🔜 Tính năng có thể mở rộng

1. **Search**: Thêm tìm kiếm sản phẩm
2. **User Profile**: Trang thông tin cá nhân
3. **Order History**: Lịch sử đơn hàng
4. **Wishlist**: Danh sách yêu thích
5. **Admin Dashboard**: Quản lý sản phẩm, đơn hàng
6. **404 Page**: Trang không tìm thấy
7. **Protected Routes**: Bảo vệ các route cần authentication

## 🛠️ Chạy Project

```bash
# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview
```

## 📦 Dependencies

- `react-router-dom`: ^7.x - Routing cho React
- `react`: ^19.x
- `tailwindcss`: ^4.x - Styling
- `vite`: ^7.x - Build tool

## 💡 Tips

1. Sử dụng `Link` thay vì `<a>` để tránh reload trang
2. Sử dụng `useNavigate` cho navigation programmatic
3. Layout sử dụng `<Outlet />` để render nested routes
4. Active link được highlight bằng `useLocation`
5. Mobile menu toggle với useState

---

**Lưu ý**: Đây là cấu trúc cơ bản. Trong production, bạn nên thêm:
- State management (Redux, Zustand, Context API)
- API integration
- Authentication & Authorization
- Protected routes
- Loading states
- Error handling
- SEO optimization

