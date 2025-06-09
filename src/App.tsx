import CssBaseline from '@mui/material/CssBaseline'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </>
  )
}

export default App
