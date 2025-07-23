// Default user data
const defaultUsers = [
  {
    id: 1,
    email: 'test@smartweb.com',
    password: 'password123',
    name: 'テストユーザー',
    role: 'user'
  },
  {
    id: 2,
    email: 'admin@smartweb.com',
    password: 'admin123',
    name: '管理者',
    role: 'admin'
  }
]

// Load users from localStorage or use default
function loadUsers() {
  try {
    const savedUsers = localStorage.getItem('app_users')
    return savedUsers ? JSON.parse(savedUsers) : defaultUsers
  } catch (error) {
    console.error('Error loading users from localStorage:', error)
    return defaultUsers
  }
}

// Save users to localStorage
function saveUsers(users) {
  try {
    localStorage.setItem('app_users', JSON.stringify(users))
  } catch (error) {
    console.error('Error saving users to localStorage:', error)
  }
}

// User data storage
let users = loadUsers()

// Authentication functions
export function authenticateUser(email, password) {
  const user = users.find(u => u.email === email)
  
  if (!user) {
    return { success: false, error: 'メールアドレスが見つかりません' }
  }
  
  if (user.password !== password) {
    return { success: false, error: 'パスワードが間違っています' }
  }
  
  return { 
    success: true, 
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  }
}

// Change password function
export function changePassword(userId, currentPassword, newPassword) {
  const user = users.find(u => u.id === userId)
  
  if (!user) {
    return { success: false, error: 'ユーザーが見つかりません' }
  }
  
  if (user.password !== currentPassword) {
    return { success: false, error: '現在のパスワードが間違っています' }
  }
  
  // Update password
  user.password = newPassword
  
  // Save updated users to localStorage
  saveUsers(users)
  
  return { success: true, message: 'パスワードが正常に変更されました' }
}

// Get user by ID
export function getUserById(userId) {
  return users.find(u => u.id === userId)
}

// Get all users (for admin purposes)
export function getAllUsers() {
  return users.map(u => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role
  }))
}

// Validate email format
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate password strength
export function validatePassword(password) {
  if (password.length < 8) {
    return { valid: false, message: 'パスワードは8文字以上で入力してください' }
  }
  
  return { valid: true, message: '' }
}

// Admin-specific authentication
export function authenticateAdmin(email, password) {
  const user = users.find(u => u.email === email && u.role === 'admin')
  
  if (!user) {
    return { success: false, error: '管理者アカウントが見つかりません' }
  }
  
  if (user.password !== password) {
    return { success: false, error: 'パスワードが間違っています' }
  }
  
  return { 
    success: true, 
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  }
}

// Reset users to default (for development/testing)
export function resetUsersToDefault() {
  users = [...defaultUsers]
  saveUsers(users)
  return { success: true, message: 'ユーザーデータがリセットされました' }
} 