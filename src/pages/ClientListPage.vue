<template>
  <AdminTemplate title="クライアント一覧">
    <div class="client-list-page">
      <ClientSearchForm @search="handleSearch" />
      <ClientTable 
        :clients="filteredClients"
        @new-client="handleNewClient"
        @view-details="handleViewDetails"
        @toggle-status="handleToggleStatus"
      />
    </div>
  </AdminTemplate>
</template>

<script>
import AdminTemplate from '../templates/AdminTemplate.vue'
import ClientSearchForm from '../components/molecules/ClientSearchForm.vue'
import ClientTable from '../components/organisms/ClientTable.vue'
import { clientData } from '../data/clientData.js'

export default {
  name: 'ClientListPage',
  components: {
    AdminTemplate,
    ClientSearchForm,
    ClientTable
  },
  data() {
    return {
      clients: clientData,
      searchQuery: ''
    }
  },
  computed: {
    filteredClients() {
      if (!this.searchQuery) {
        return this.clients
      }
      
      const query = this.searchQuery.toLowerCase()
      return this.clients.filter(client => 
        client.id.toLowerCase().includes(query) ||
        client.name.toLowerCase().includes(query)
      )
    }
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query
    },
    handleNewClient() {
      // Navigate to new client registration page
      this.$router.push('/mgmt-portal/client-registry/create')
    },
    handleViewDetails(client) {
      // Navigate to client details page
      this.$router.push(`/mgmt-portal/client-registry/${client.id}`)
    },
    handleToggleStatus(client) {
      // Toggle client status
      const updatedClients = this.clients.map(c => {
        if (c.id === client.id) {
          return {
            ...c,
            status: c.status === 'active' ? 'inactive' : 'active'
          }
        }
        return c
      })
      this.clients = updatedClients
      
      // Show notification
      this.$emit('show-notification', {
        type: 'success',
        message: `${client.name}のステータスを更新しました。`
      })
    }
  }
}
</script>

<style scoped>
.client-list-page {
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 30px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .client-list-page {
    max-width: 100%;
    padding: 0 20px;
  }
}

@media (max-width: 480px) {
  .client-list-page {
    padding: 0 15px;
  }
}
</style> 