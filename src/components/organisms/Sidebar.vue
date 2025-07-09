<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="logo-section">
        <h2>スマプロ</h2>
        <span>クライアント向け</span>
      </div>
    </div>
    
    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link" active-class="active">
            <i class="fas fa-tachometer-alt icon"></i>
            <span>ダッシュボード</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/revenue-report" class="nav-link" active-class="active">
            <i class="fas fa-chart-line icon"></i>
            <span>通期の収益レポート</span>
          </router-link>
        </li>
        <li class="nav-item">
          <div class="nav-link nav-parent" @click="toggleSubmenu('system')">
            <i class="fas fa-cogs icon"></i>
            <span>システム</span>
            <i class="fas fa-chevron-down chevron-icon" :class="{ 'rotated': openSubmenus.system }"></i>
          </div>
          <ul class="sub-nav-list" :class="{ 'open': openSubmenus.system }">
            <li class="sub-nav-item">
              <router-link to="/system/rms" class="sub-nav-link">
                RMS情報等の設定
              </router-link>
            </li>
            <li class="sub-nav-item">
              <router-link to="/system/revenue-default" class="sub-nav-link">
                収益計算のデフォルト設定
              </router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <div class="nav-link nav-parent" @click="toggleSubmenu('account')">
            <i class="fas fa-user-cog icon"></i>
            <span>アカウント設定</span>
            <i class="fas fa-chevron-down chevron-icon" :class="{ 'rotated': openSubmenus.account }"></i>
          </div>
          <ul class="sub-nav-list" :class="{ 'open': openSubmenus.account }">
            <li class="sub-nav-item">
              <router-link to="/account/password" class="sub-nav-link">
                パスワード変更
              </router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item logout-item">
          <a href="#" class="nav-link logout-link" @click.prevent="handleLogout">
            <i class="fas fa-sign-out-alt icon"></i>
            <span>ログアウト</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      openSubmenus: {
        system: false,
        account: false
      }
    }
  },
  methods: {
    toggleSubmenu(menuName) {
      this.openSubmenus[menuName] = !this.openSubmenus[menuName]
      // Save to localStorage to persist state
      localStorage.setItem('sidebar_submenu_' + menuName, this.openSubmenus[menuName])
      console.log(`Toggled ${menuName} to:`, this.openSubmenus[menuName])
    },
    loadSubmenuStates() {
      // Load submenu states from localStorage
      const systemState = localStorage.getItem('sidebar_submenu_system')
      const accountState = localStorage.getItem('sidebar_submenu_account')
      
      if (systemState !== null) {
        this.openSubmenus.system = systemState === 'true'
      }
      if (accountState !== null) {
        this.openSubmenus.account = accountState === 'true'
      }
      
      console.log('Loaded submenu states:', this.openSubmenus)
    },
    handleLogout() {
      this.$emit('logout')
    }
  },
  created() {
    // Load states before component is mounted
    this.loadSubmenuStates()
  },
  mounted() {
    // Check current route and open appropriate submenu on initial load (only if not already set)
    const currentPath = this.$route.path
    if (currentPath.startsWith('/system/') && !this.openSubmenus.system) {
      this.openSubmenus.system = true
      localStorage.setItem('sidebar_submenu_system', 'true')
    } else if (currentPath.startsWith('/account/') && !this.openSubmenus.account) {
      this.openSubmenus.account = true
      localStorage.setItem('sidebar_submenu_account', 'true')
    }
    
    console.log('Sidebar mounted with states:', this.openSubmenus)
  },
  beforeUnmount() {
    console.log('Sidebar unmounting with states:', this.openSubmenus)
  },
  emits: ['logout']
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #2c3e50;
  color: #ecf0f1;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  z-index: 50;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
}

.logo-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
  color: #4dd0e1;
}

.logo-section span {
  font-size: 0.875rem;
  opacity: 0.8;
  font-weight: 400;
  color: #9ca3af;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: #ecf0f1;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
}

.nav-link:hover {
  background-color: #34495e;
  color: #ecf0f1;
  border-left-color: #10b981;
}

.nav-link.active {
  background-color: #34495e;
  color: #ecf0f1;
  border-left-color: #10b981;
  font-weight: 600;
}

.nav-parent {
  cursor: pointer;
  justify-content: space-between;
}

.nav-parent:hover {
  background-color: #34495e;
  color: #ecf0f1;
  border-left-color: #10b981;
}

.chevron-icon {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
  margin-left: auto;
  color: #ecf0f1;
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

.sub-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.3);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.sub-nav-list.open {
  max-height: 200px;
}

.sub-nav-item {
  margin-bottom: 0;
}

.sub-nav-link {
  display: block;
  padding: 10px 20px 10px 52px;
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 400;
  border-left: 4px solid transparent;
}

.sub-nav-link:hover {
  background-color: #34495e;
  color: #ecf0f1;
  border-left-color: #10b981;
}

.sub-nav-link.router-link-active {
  background-color: #34495e;
  color: #ecf0f1;
  border-left-color: #10b981;
  font-weight: 500;
}

.icon {
  width: 18px;
  height: 18px;
  margin-right: 12px;
  flex-shrink: 0;
  text-align: center;
  color: #ecf0f1;
}

/* Logout button styling */
.logout-item {
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 12px;
}

.logout-link {
  color: #e74c3c !important;
}

.logout-link:hover {
  background-color: #34495e;
  color: #ff6b6b !important;
  border-left-color: #e74c3c;
}

.logout-link .icon {
  color: #e74c3c;
}

.logout-link:hover .icon {
  color: #ff6b6b;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    height: 100vh;
  }
  
  :global(body.mobile-menu-open) .sidebar {
    transform: translateX(0);
  }
}
</style> 