import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
})

export const fetchStock = async (symbol, range = '1M') => {
  const { data } = await api.get('/stocks', {
    params: { symbol, range },
  })
  return data
}

export const fetchQuote = async (symbol) => {
  const { data } = await api.get('/stocks/quote', {
    params: { symbol },
  })
  return data
}

export const fetchWatchlist = async () => {
  const { data } = await api.get('/watchlist')
  return data
}

export const addWatchlistItem = async (symbol) => {
  const { data } = await api.post('/watchlist', { symbol })
  return data
}

export const updateWatchlistItem = async (id, targetPrice) => {
  const { data } = await api.put(`/watchlist/${id}`, { targetPrice })
  return data
}

export const deleteWatchlistItem = async (id) => {
  await api.delete(`/watchlist/${id}`)
}

export const fetchSearchHistory = async () => {
  const { data } = await api.get('/history')
  return data
}

export const addSearchHistory = async (symbol) => {
  const { data } = await api.post('/history', { symbol })
  return data
}

export const clearSearchHistory = async () => {
  await api.delete('/history')
}
