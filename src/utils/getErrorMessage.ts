import axios from 'axios'

export const getErrorMessage = (error: unknown) => {
  let title = '發生錯誤'
  let description = '請稍後再試'

  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      title = '連線逾時'
      description = '伺服器回應過慢，請檢查網路或稍後重試'
    } else if (error.response) {
      title = `錯誤 ${error.response.status}`
      description = error.response.statusText
    } else if (error.message) {
      description = error.message
    }
  }

  return `${title} ${description}`
}
