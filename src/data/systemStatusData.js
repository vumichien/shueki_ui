// Mock data for system status table
export const systemStatusData = [
  // 2025年6月1日 data
  {
    date: new Date(2025, 5, 1), // 2025年6月1日
    executions: [
      {
        id: 1,
        clientId: 'CL001',
        clientName: '株式会社A',
        executionDate: '2025/06/01',
        status: '成功',
        executionTime: '09:30',
        duration: '2分30秒'
      },
      {
        id: 2,
        clientId: 'CL002',
        clientName: '株式会社B',
        executionDate: '2025/06/01',
        status: '成功',
        executionTime: '10:15',
        duration: '1分45秒'
      },
      {
        id: 3,
        clientId: 'CL003',
        clientName: '株式会社C',
        executionDate: '2025/06/01',
        status: 'エラー',
        executionTime: '11:00',
        duration: '0分15秒',
        errorMessage: 'データベース接続エラー'
      },
      {
        id: 4,
        clientId: 'CL004',
        clientName: '株式会社D',
        executionDate: '2025/06/01',
        status: '成功',
        executionTime: '14:20',
        duration: '3分10秒'
      },
      {
        id: 5,
        clientId: 'CL005',
        clientName: '株式会社E',
        executionDate: '2025/06/01',
        status: '成功',
        executionTime: '15:45',
        duration: '2分55秒'
      }
    ]
  },
  
  // 2025年6月15日 data
  {
    date: new Date(2025, 5, 15), // 2025年6月15日
    executions: [
      {
        id: 26,
        clientId: 'CL001',
        clientName: '株式会社A',
        executionDate: '2025/06/15',
        status: '成功',
        executionTime: '08:45',
        duration: '2分15秒'
      },
      {
        id: 27,
        clientId: 'CL003',
        clientName: '株式会社C',
        executionDate: '2025/06/15',
        status: '成功',
        executionTime: '09:30',
        duration: '3分20秒'
      },
      {
        id: 28,
        clientId: 'CL006',
        clientName: '株式会社F',
        executionDate: '2025/06/15',
        status: 'エラー',
        executionTime: '10:15',
        duration: '0分30秒',
        errorMessage: 'ファイルアクセスエラー'
      },
      {
        id: 29,
        clientId: 'CL007',
        clientName: '株式会社G',
        executionDate: '2025/06/15',
        status: '成功',
        executionTime: '11:00',
        duration: '1分50秒'
      },
      {
        id: 30,
        clientId: 'CL008',
        clientName: '株式会社H',
        executionDate: '2025/06/15',
        status: '成功',
        executionTime: '14:30',
        duration: '2分40秒'
      },
      {
        id: 31,
        clientId: 'CL009',
        clientName: '株式会社I',
        executionDate: '2025/06/15',
        status: '成功',
        executionTime: '15:45',
        duration: '1分35秒'
      }
    ]
  },
  
  // 2025年6月20日 data
  {
    date: new Date(2025, 5, 20), // 2025年6月20日
    executions: [
      {
        id: 32,
        clientId: 'CL002',
        clientName: '株式会社B',
        executionDate: '2025/06/20',
        status: '成功',
        executionTime: '07:30',
        duration: '2分50秒'
      },
      {
        id: 33,
        clientId: 'CL004',
        clientName: '株式会社D',
        executionDate: '2025/06/20',
        status: 'エラー',
        executionTime: '08:15',
        duration: '0分20秒',
        errorMessage: 'ネットワークタイムアウト'
      },
      {
        id: 34,
        clientId: 'CL010',
        clientName: '株式会社J',
        executionDate: '2025/06/20',
        status: '成功',
        executionTime: '09:00',
        duration: '3分15秒'
      },
      {
        id: 35,
        clientId: 'CL011',
        clientName: '株式会社K',
        executionDate: '2025/06/20',
        status: '成功',
        executionTime: '10:30',
        duration: '2分25秒'
      }
    ]
  },
  
  // 2025年5月1日 data
  {
    date: new Date(2025, 4, 1), // 2025年5月1日
    executions: [
      {
        id: 6,
        clientId: 'CL001',
        clientName: '株式会社A',
        executionDate: '2025/05/01',
        status: '成功',
        executionTime: '08:30',
        duration: '2分15秒'
      },
      {
        id: 7,
        clientId: 'CL002',
        clientName: '株式会社B',
        executionDate: '2025/05/01',
        status: 'エラー',
        executionTime: '09:15',
        duration: '0分30秒',
        errorMessage: 'ファイル読み込みエラー'
      },
      {
        id: 8,
        clientId: 'CL006',
        clientName: '株式会社F',
        executionDate: '2025/05/01',
        status: '成功',
        executionTime: '10:30',
        duration: '4分20秒'
      },
      {
        id: 9,
        clientId: 'CL007',
        clientName: '株式会社G',
        executionDate: '2025/05/01',
        status: '成功',
        executionTime: '13:45',
        duration: '1分50秒'
      },
      {
        id: 10,
        clientId: 'CL008',
        clientName: '株式会社H',
        executionDate: '2025/05/01',
        status: 'エラー',
        executionTime: '16:20',
        duration: '0分45秒',
        errorMessage: 'メモリ不足エラー'
      }
    ]
  },
  
  // 2025年5月15日 data
  {
    date: new Date(2025, 4, 15), // 2025年5月15日
    executions: [
      {
        id: 36,
        clientId: 'CL003',
        clientName: '株式会社C',
        executionDate: '2025/05/15',
        status: '成功',
        executionTime: '07:20',
        duration: '2分40秒'
      },
      {
        id: 37,
        clientId: 'CL005',
        clientName: '株式会社E',
        executionDate: '2025/05/15',
        status: '成功',
        executionTime: '08:45',
        duration: '1分55秒'
      },
      {
        id: 38,
        clientId: 'CL009',
        clientName: '株式会社I',
        executionDate: '2025/05/15',
        status: 'エラー',
        executionTime: '09:30',
        duration: '0分25秒',
        errorMessage: 'データベースロックエラー'
      },
      {
        id: 39,
        clientId: 'CL012',
        clientName: '株式会社L',
        executionDate: '2025/05/15',
        status: '成功',
        executionTime: '10:15',
        duration: '3分30秒'
      },
      {
        id: 40,
        clientId: 'CL013',
        clientName: '株式会社M',
        executionDate: '2025/05/15',
        status: '成功',
        executionTime: '14:00',
        duration: '2分10秒'
      }
    ]
  },
  
  // 2025年5月25日 data
  {
    date: new Date(2025, 4, 25), // 2025年5月25日
    executions: [
      {
        id: 41,
        clientId: 'CL001',
        clientName: '株式会社A',
        executionDate: '2025/05/25',
        status: '成功',
        executionTime: '08:00',
        duration: '2分25秒'
      },
      {
        id: 42,
        clientId: 'CL004',
        clientName: '株式会社D',
        executionDate: '2025/05/25',
        status: '成功',
        executionTime: '09:30',
        duration: '1分40秒'
      },
      {
        id: 43,
        clientId: 'CL006',
        clientName: '株式会社F',
        executionDate: '2025/05/25',
        status: 'エラー',
        executionTime: '10:45',
        duration: '0分35秒',
        errorMessage: 'ディスク容量不足'
      },
      {
        id: 44,
        clientId: 'CL010',
        clientName: '株式会社J',
        executionDate: '2025/05/25',
        status: '成功',
        executionTime: '11:20',
        duration: '3分05秒'
      },
      {
        id: 45,
        clientId: 'CL014',
        clientName: '株式会社N',
        executionDate: '2025/05/25',
        status: '成功',
        executionTime: '15:15',
        duration: '2分50秒'
      }
    ]
  },
  
  // 2025年4月1日 data
  {
    date: new Date(2025, 3, 1), // 2025年4月1日
    executions: [
      {
        id: 11,
        clientId: 'CL001',
        clientName: '株式会社A',
        executionDate: '2025/04/01',
        status: '成功',
        executionTime: '07:30',
        duration: '3分05秒'
      },
      {
        id: 12,
        clientId: 'CL003',
        clientName: '株式会社C',
        executionDate: '2025/04/01',
        status: '成功',
        executionTime: '08:45',
        duration: '2分40秒'
      },
      {
        id: 13,
        clientId: 'CL004',
        clientName: '株式会社D',
        executionDate: '2025/04/01',
        status: '成功',
        executionTime: '09:20',
        duration: '1分55秒'
      },
      {
        id: 14,
        clientId: 'CL009',
        clientName: '株式会社I',
        executionDate: '2025/04/01',
        status: 'エラー',
        executionTime: '11:10',
        duration: '0分20秒',
        errorMessage: 'ネットワーク接続エラー'
      },
      {
        id: 15,
        clientId: 'CL010',
        clientName: '株式会社J',
        executionDate: '2025/04/01',
        status: '成功',
        executionTime: '14:30',
        duration: '2分25秒'
      },
      {
        id: 16,
        clientId: 'CL011',
        clientName: '株式会社K',
        executionDate: '2025/04/01',
        status: '成功',
        executionTime: '15:50',
        duration: '3分15秒'
      }
    ]
  },
  
  // 2025年4月10日 data
  {
    date: new Date(2025, 3, 10), // 2025年4月10日
    executions: [
      {
        id: 46,
        clientId: 'CL002',
        clientName: '株式会社B',
        executionDate: '2025/04/10',
        status: '成功',
        executionTime: '08:15',
        duration: '2分30秒'
      },
      {
        id: 47,
        clientId: 'CL005',
        clientName: '株式会社E',
        executionDate: '2025/04/10',
        status: 'エラー',
        executionTime: '09:00',
        duration: '0分40秒',
        errorMessage: '認証エラー'
      },
      {
        id: 48,
        clientId: 'CL007',
        clientName: '株式会社G',
        executionDate: '2025/04/10',
        status: '成功',
        executionTime: '10:30',
        duration: '1分55秒'
      },
      {
        id: 49,
        clientId: 'CL012',
        clientName: '株式会社L',
        executionDate: '2025/04/10',
        status: '成功',
        executionTime: '11:45',
        duration: '3分20秒'
      }
    ]
  },
  
  // 2025年4月20日 data
  {
    date: new Date(2025, 3, 20), // 2025年4月20日
    executions: [
      {
        id: 50,
        clientId: 'CL006',
        clientName: '株式会社F',
        executionDate: '2025/04/20',
        status: '成功',
        executionTime: '07:45',
        duration: '2分15秒'
      },
      {
        id: 51,
        clientId: 'CL008',
        clientName: '株式会社H',
        executionDate: '2025/04/20',
        status: '成功',
        executionTime: '08:30',
        duration: '1分40秒'
      },
      {
        id: 52,
        clientId: 'CL013',
        clientName: '株式会社M',
        executionDate: '2025/04/20',
        status: 'エラー',
        executionTime: '09:15',
        duration: '0分30秒',
        errorMessage: '設定ファイルエラー'
      },
      {
        id: 53,
        clientId: 'CL014',
        clientName: '株式会社N',
        executionDate: '2025/04/20',
        status: '成功',
        executionTime: '10:00',
        duration: '2分50秒'
      },
      {
        id: 54,
        clientId: 'CL015',
        clientName: '株式会社O',
        executionDate: '2025/04/20',
        status: '成功',
        executionTime: '14:30',
        duration: '1分25秒'
      }
    ]
  },
  
  // 2025年3月1日 data
  {
    date: new Date(2025, 2, 1), // 2025年3月1日
    executions: [
      {
        id: 17,
        clientId: 'CL001',
        clientName: '株式会社A',
        executionDate: '2025/03/01',
        status: '成功',
        executionTime: '08:00',
        duration: '2分50秒'
      },
      {
        id: 18,
        clientId: 'CL002',
        clientName: '株式会社B',
        executionDate: '2025/03/01',
        status: '成功',
        executionTime: '09:30',
        duration: '1分35秒'
      },
      {
        id: 19,
        clientId: 'CL005',
        clientName: '株式会社E',
        executionDate: '2025/03/01',
        status: 'エラー',
        executionTime: '10:45',
        duration: '0分10秒',
        errorMessage: '権限エラー'
      },
      {
        id: 20,
        clientId: 'CL012',
        clientName: '株式会社L',
        executionDate: '2025/03/01',
        status: '成功',
        executionTime: '13:15',
        duration: '4分05秒'
      }
    ]
  },
  
  // 2025年3月12日 data
  {
    date: new Date(2025, 2, 12), // 2025年3月12日
    executions: [
      {
        id: 55,
        clientId: 'CL003',
        clientName: '株式会社C',
        executionDate: '2025/03/12',
        status: '成功',
        executionTime: '07:30',
        duration: '2分20秒'
      },
      {
        id: 56,
        clientId: 'CL006',
        clientName: '株式会社F',
        executionDate: '2025/03/12',
        status: '成功',
        executionTime: '08:45',
        duration: '3分15秒'
      },
      {
        id: 57,
        clientId: 'CL009',
        clientName: '株式会社I',
        executionDate: '2025/03/12',
        status: 'エラー',
        executionTime: '09:20',
        duration: '0分35秒',
        errorMessage: 'メモリ不足エラー'
      },
      {
        id: 58,
        clientId: 'CL011',
        clientName: '株式会社K',
        executionDate: '2025/03/12',
        status: '成功',
        executionTime: '10:30',
        duration: '1分50秒'
      },
      {
        id: 59,
        clientId: 'CL013',
        clientName: '株式会社M',
        executionDate: '2025/03/12',
        status: '成功',
        executionTime: '14:15',
        duration: '2分40秒'
      }
    ]
  },
  
  // 2025年3月25日 data
  {
    date: new Date(2025, 2, 25), // 2025年3月25日
    executions: [
      {
        id: 60,
        clientId: 'CL004',
        clientName: '株式会社D',
        executionDate: '2025/03/25',
        status: '成功',
        executionTime: '08:20',
        duration: '2分10秒'
      },
      {
        id: 61,
        clientId: 'CL007',
        clientName: '株式会社G',
        executionDate: '2025/03/25',
        status: '成功',
        executionTime: '09:00',
        duration: '1分35秒'
      },
      {
        id: 62,
        clientId: 'CL010',
        clientName: '株式会社J',
        executionDate: '2025/03/25',
        status: 'エラー',
        executionTime: '10:15',
        duration: '0分25秒',
        errorMessage: 'データベース接続エラー'
      },
      {
        id: 63,
        clientId: 'CL014',
        clientName: '株式会社N',
        executionDate: '2025/03/25',
        status: '成功',
        executionTime: '11:30',
        duration: '3分20秒'
      },
      {
        id: 64,
        clientId: 'CL015',
        clientName: '株式会社O',
        executionDate: '2025/03/25',
        status: '成功',
        executionTime: '15:00',
        duration: '2分05秒'
      }
    ]
  },
  
  // 2025年2月1日 data
  {
    date: new Date(2025, 1, 1), // 2025年2月1日
    executions: [
      {
        id: 21,
        clientId: 'CL001',
        clientName: '株式会社A',
        executionDate: '2025/02/01',
        status: '成功',
        executionTime: '07:45',
        duration: '2分20秒'
      },
      {
        id: 22,
        clientId: 'CL006',
        clientName: '株式会社F',
        executionDate: '2025/02/01',
        status: '成功',
        executionTime: '08:30',
        duration: '3分30秒'
      },
      {
        id: 23,
        clientId: 'CL007',
        clientName: '株式会社G',
        executionDate: '2025/02/01',
        status: 'エラー',
        executionTime: '09:15',
        duration: '0分25秒',
        errorMessage: '設定ファイルエラー'
      },
      {
        id: 24,
        clientId: 'CL013',
        clientName: '株式会社M',
        executionDate: '2025/02/01',
        status: '成功',
        executionTime: '14:20',
        duration: '2分45秒'
      },
      {
        id: 25,
        clientId: 'CL014',
        clientName: '株式会社N',
        executionDate: '2025/02/01',
        status: '成功',
        executionTime: '15:40',
        duration: '1分55秒'
      }
    ]
  },
  
  // 2025年2月8日 data
  {
    date: new Date(2025, 1, 8), // 2025年2月8日
    executions: [
      {
        id: 65,
        clientId: 'CL002',
        clientName: '株式会社B',
        executionDate: '2025/02/08',
        status: '成功',
        executionTime: '08:00',
        duration: '2分15秒'
      },
      {
        id: 66,
        clientId: 'CL005',
        clientName: '株式会社E',
        executionDate: '2025/02/08',
        status: '成功',
        executionTime: '09:30',
        duration: '1分40秒'
      },
      {
        id: 67,
        clientId: 'CL008',
        clientName: '株式会社H',
        executionDate: '2025/02/08',
        status: 'エラー',
        executionTime: '10:15',
        duration: '0分30秒',
        errorMessage: '権限エラー'
      },
      {
        id: 68,
        clientId: 'CL012',
        clientName: '株式会社L',
        executionDate: '2025/02/08',
        status: '成功',
        executionTime: '11:45',
        duration: '3分10秒'
      }
    ]
  },
  
  // 2025年2月22日 data
  {
    date: new Date(2025, 1, 22), // 2025年2月22日
    executions: [
      {
        id: 69,
        clientId: 'CL003',
        clientName: '株式会社C',
        executionDate: '2025/02/22',
        status: '成功',
        executionTime: '07:20',
        duration: '2分30秒'
      },
      {
        id: 70,
        clientId: 'CL009',
        clientName: '株式会社I',
        executionDate: '2025/02/22',
        status: '成功',
        executionTime: '08:45',
        duration: '1分55秒'
      },
      {
        id: 71,
        clientId: 'CL010',
        clientName: '株式会社J',
        executionDate: '2025/02/22',
        status: 'エラー',
        executionTime: '09:30',
        duration: '0分20秒',
        errorMessage: 'ファイル読み込みエラー'
      },
      {
        id: 72,
        clientId: 'CL011',
        clientName: '株式会社K',
        executionDate: '2025/02/22',
        status: '成功',
        executionTime: '10:15',
        duration: '2分45秒'
      },
      {
        id: 73,
        clientId: 'CL015',
        clientName: '株式会社O',
        executionDate: '2025/02/22',
        status: '成功',
        executionTime: '14:30',
        duration: '1分30秒'
      }
    ]
  }
]

// Helper function to get data for a specific date
export const getSystemStatusDataByDate = (date) => {
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  
  const dataForDate = systemStatusData.find(data => {
    const dataDate = new Date(data.date.getFullYear(), data.date.getMonth(), data.date.getDate())
    return dataDate.getTime() === targetDate.getTime()
  })
  
  return dataForDate ? dataForDate.executions : []
}

// Helper function to get all available dates
export const getAvailableDates = () => {
  return systemStatusData.map(data => data.date)
}

// Helper function to get system metrics for a specific date
export const getSystemMetricsByDate = (date) => {
  const executions = getSystemStatusDataByDate(date)
  
  const successCount = executions.filter(exec => exec.status === '成功').length
  const errorCount = executions.filter(exec => exec.status === 'エラー').length
  const storeCount = new Set(executions.map(exec => exec.clientId)).size
  
  return {
    successCount,
    errorCount,
    storeCount,
    totalExecutions: executions.length
  }
}

// Helper function to get default date (most recent)
export const getDefaultDate = () => {
  const availableDates = getAvailableDates()
  return availableDates.length > 0 ? availableDates[0] : new Date()
} 