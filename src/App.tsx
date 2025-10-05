import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './pages/dashboard'
import NewWeatherPage from "./pages/search-page";
import { ThemeProvider } from "./context/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { UnitProvider } from "./context/unit-provider";
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
    }
  }
});

const App = () => {

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider defaultTheme="dark">
            <UnitProvider>
                <Layout>
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="city/:city" element={<NewWeatherPage />} />
                  </Routes>
                </Layout>
                <Toaster richColors />
            </UnitProvider>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App