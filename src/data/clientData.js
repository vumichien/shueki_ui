export const clientData = [
  {
    id: 'CL001',
    name: '株式会社A',
    registrationDate: '2024/01/15',
    status: 'active',
    homepage: 'https://company-a.com',
    contactPerson: '田中',
    contactEmail: 'tanaka@company-a.com',
    phoneNumber: '03-1234-5678',
    location: '東京都'
  },
  {
    id: 'CL002',
    name: '株式会社B',
    registrationDate: '2024/02/15',
    status: 'active',
    homepage: 'https://company-b.com',
    contactPerson: '佐藤',
    contactEmail: 'sato@company-b.com',
    phoneNumber: '06-2345-6789',
    location: '大阪府'
  },
  {
    id: 'CL003',
    name: '株式会社C',
    registrationDate: '2024/03/15',
    status: 'active',
    homepage: 'https://company-c.com',
    contactPerson: '鈴木',
    contactEmail: 'suzuki@company-c.com',
    phoneNumber: '052-3456-7890',
    location: '愛知県'
  },
  {
    id: 'CL004',
    name: '株式会社D',
    registrationDate: '2024/04/15',
    status: 'active',
    homepage: 'https://company-d.com',
    contactPerson: '高橋',
    contactEmail: 'takahashi@company-d.com',
    phoneNumber: '092-4567-8901',
    location: '福岡県'
  },
  {
    id: 'CL005',
    name: '株式会社E',
    registrationDate: '2024/05/15',
    status: 'inactive',
    homepage: 'https://company-e.com',
    contactPerson: '田中',
    contactEmail: 'tanaka@company-e.com',
    phoneNumber: '045-5678-9012',
    location: '神奈川県'
  },
  {
    id: 'CL006',
    name: '株式会社F',
    registrationDate: '2024/06/15',
    status: 'inactive',
    homepage: 'https://company-f.com',
    contactPerson: '伊藤',
    contactEmail: 'ito@company-f.com',
    phoneNumber: '011-6789-0123',
    location: '北海道'
  },
  {
    id: 'CL007',
    name: '株式会社G',
    registrationDate: '2024/07/15',
    status: 'active',
    homepage: 'https://company-g.com',
    contactPerson: '渡辺',
    contactEmail: 'watanabe@company-g.com',
    phoneNumber: '022-7890-1234',
    location: '宮城県'
  },
  {
    id: 'CL008',
    name: '株式会社H',
    registrationDate: '2024/08/15',
    status: 'active',
    homepage: 'https://company-h.com',
    contactPerson: '山本',
    contactEmail: 'yamamoto@company-h.com',
    phoneNumber: '075-8901-2345',
    location: '京都府'
  },
  {
    id: 'CL009',
    name: '株式会社I',
    registrationDate: '2024/09/15',
    status: 'active',
    homepage: 'https://company-i.com',
    contactPerson: '中村',
    contactEmail: 'nakamura@company-i.com',
    phoneNumber: '082-9012-3456',
    location: '広島県'
  },
  {
    id: 'CL010',
    name: '株式会社J',
    registrationDate: '2024/10/15',
    status: 'active',
    homepage: 'https://company-j.com',
    contactPerson: '小林',
    contactEmail: 'kobayashi@company-j.com',
    phoneNumber: '096-0123-4567',
    location: '熊本県'
  },
  {
    id: 'CL011',
    name: '株式会社K',
    registrationDate: '2024/10/15',
    status: 'active',
    homepage: 'https://company-k.com',
    contactPerson: '加藤',
    contactEmail: 'kato@company-k.com',
    phoneNumber: '054-1234-5678',
    location: '静岡県'
  }
]

// Function to generate next client ID
export const generateNextClientId = () => {
  const maxId = Math.max(...clientData.map(client => {
    const numPart = parseInt(client.id.replace('CL', ''))
    return numPart
  }))
  const nextId = maxId + 1
  return `CL${nextId.toString().padStart(3, '0')}`
}

// Function to add new client
export const addNewClient = (clientFormData) => {
  const newClient = {
    id: generateNextClientId(),
    name: clientFormData.clientName,
    registrationDate: new Date().toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '/'),
    status: clientFormData.accountStatus,
    homepage: clientFormData.homepage,
    contactPerson: clientFormData.contactPerson,
    contactEmail: clientFormData.contactEmail,
    phoneNumber: clientFormData.phoneNumber,
    location: clientFormData.location,
    // Login information (in a real app, this would be stored securely)
    loginId: clientFormData.loginId,
    // Rakuten store information
    rakutenLoginStage1: clientFormData.rakutenLoginStage1,
    rakutenLoginStage2: clientFormData.rakutenLoginStage2,
    startDate: clientFormData.startDate,
    contractStatus: clientFormData.contractStatus,
    notes: clientFormData.notes
  }
  
  clientData.push(newClient)
  return newClient
}

export const getClientStatusText = (status) => {
  return status === 'active' ? '有効' : '無効'
}

export const getClientStatusClass = (status) => {
  return status === 'active' ? 'status-active' : 'status-inactive'
} 