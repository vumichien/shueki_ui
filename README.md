# Smartweb - Vue 3 Login Interface

Giao diện đăng nhập theo thiết kế Smartweb với ngôn ngữ tiếng Nhật, sử dụng Vue 3, Vue Router và cấu trúc Atomic Design.

## ✨ Tính năng

- 🎨 Giao diện theo thiết kế Smartweb chính thức
- 🇯🇵 Ngôn ngữ tiếng Nhật (Japanese)
- 🔐 Form đăng nhập với validation
- 📱 Responsive design cho mobile
- 🎭 Hiệu ứng animation tiền tệ bay lượn
- 💎 Glass morphism effect
- 🏠 Trang home sau khi đăng nhập thành công
- 🔧 Cấu trúc Atomic Design
- 🛣️ Vue Router cho navigation

## 🚀 Cài đặt và Chạy

### Bước 1: Cài đặt dependencies

```bash
npm install
```

### Bước 2: Chạy development server

```bash
npm run dev
```

Mở trình duyệt và truy cập: `http://localhost:3000`

### Bước 3: Đăng nhập với fake account

```
Email: test@smartweb.com
Password: password123
```

### Bước 4: Build cho production

```bash
npm run build
```

## 📁 Cấu trúc thư mục (Atomic Design)

```
shueki_ui/
├── data/
│   ├── background.jpg           # Ảnh nền chính
│   └── logo.png                # Logo Smartweb
├── src/
│   ├── components/
│   │   ├── atoms/               # Các component cơ bản
│   │   │   ├── Button.vue       # Button component
│   │   │   ├── Input.vue        # Input component
│   │   │   ├── Logo.vue         # Logo component
│   │   │   └── Checkbox.vue     # Checkbox component
│   │   ├── molecules/           # Kết hợp các atoms
│   │   │   └── LoginForm.vue    # Form đăng nhập
│   │   └── organisms/           # Kết hợp molecules
│   │       ├── Header.vue       # Header component
│   │       └── FloatingSymbols.vue  # Floating symbols
│   ├── templates/               # Layout templates
│   │   ├── LoginTemplate.vue    # Template cho login
│   │   └── MainTemplate.vue     # Template cho home
│   ├── pages/                   # Các trang
│   │   ├── LoginPage.vue        # Trang đăng nhập
│   │   └── HomePage.vue         # Trang home
│   ├── router/                  # Vue Router
│   │   └── index.js             # Router configuration
│   ├── App.vue                  # App component
│   ├── main.js                  # Entry point
│   └── style.css                # CSS global
├── index.html                   # HTML template
├── package.json                 # Dependencies
└── README.md                   # Hướng dẫn này
```

## 🏗️ Cấu trúc Atomic Design

### Atoms (原子)
- **Button**: Component nút với các variant (primary, secondary, danger, ghost)
- **Input**: Component input với validation và error handling
- **Logo**: Component logo linh hoạt với image/icon và text
- **Checkbox**: Component checkbox đơn giản

### Molecules (分子)
- **LoginForm**: Form đăng nhập kết hợp Input, Button, Checkbox

### Organisms (有機体)
- **Header**: Header với logo và thông tin user
- **FloatingSymbols**: Hiệu ứng ký hiệu tiền tệ bay lượn

### Templates (テンプレート)
- **LoginTemplate**: Layout cho trang đăng nhập
- **MainTemplate**: Layout cho trang chính

### Pages (ページ)
- **LoginPage**: Trang đăng nhập
- **HomePage**: Trang chính sau khi login

## 🎨 Tùy chỉnh

### Thay đổi ảnh nền
Thay thế file `data/background.jpg` bằng ảnh mới (khuyến nghị 1920x1080px)

### Thay đổi logo
Thay thế file `data/logo.png` bằng logo mới (khuyến nghị 200x200px)

### Tùy chỉnh màu sắc
- Atoms: Chỉnh sửa styles trong từng atom component
- Theme: Tùy chỉnh CSS variables trong `src/style.css`

## 🔧 Công nghệ sử dụng

- **Vue 3** - Framework JavaScript
- **Vue Router** - Client-side routing
- **Vite** - Build tool
- **CSS3** - Styling với animations
- **HTML5** - Markup
- **Atomic Design** - Component architecture

## 📱 Responsive

Giao diện được thiết kế responsive và hoạt động tốt trên:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (< 768px)

## 🎯 Demo

### Màn hình đăng nhập:
- Header trắng với logo Smartweb
- Form đăng nhập với email/password (tiếng Nhật)
- Checkbox "ログイン状態を保持する" (Keep login state)
- Nút "ログイン" (Login)
- Hiệu ứng loading khi submit
- Ký hiệu tiền tệ bay lượn trên ảnh nền

### Màn hình home (sau khi đăng nhập):
- Header với logo và thông tin user
- Dashboard cards với các chức năng
- Nút logout để quay lại màn hình đăng nhập

## 🛣️ Routing

- `/` - Trang đăng nhập
- `/home` - Trang chính (yêu cầu đăng nhập)

## 🔐 Authentication

- Local Storage để lưu trạng thái đăng nhập
- Navigation guard để protect routes
- Auto redirect khi đã đăng nhập

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request.

## 📄 License

MIT License 