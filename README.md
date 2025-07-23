# Smartweb - Vue 3 Login Interface

Giao diện đăng nhập theo thiết kế Smartweb với ngôn ngữ tiếng Nhật, sử dụng Vue 3, Vue Router và cấu trúc Atomic Design.

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


## 🔐 Authentication

- Local Storage để lưu trạng thái đăng nhập
- Navigation guard để protect routes
- Auto redirect khi đã đăng nhập