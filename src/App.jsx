import { useEffect, useMemo, useState } from 'react'
import {
  addSearchHistory,
  addWatchlistItem,
  deleteWatchlistItem,
  fetchSearchHistory,
  fetchStock,
  fetchWatchlist,
  updateWatchlistItem,
} from './api/stockApi'
import ErrorMessage from './components/ErrorMessage'
import Header from './components/Header'
import LoadingState from './components/LoadingState'
import SearchHistory from './components/SearchHistory'
import Sidebar from './components/Sidebar'
import StockChart from './components/StockChart'
import StockSummary from './components/StockSummary'
import TimeRangeSelector from './components/TimeRangeSelector'
import Watchlist from './components/Watchlist'

const DEFAULT_SYMBOL = 'AAPL'
const DEFAULT_RANGE = '1M'

function App() {
  const [symbol, setSymbol] = useState(DEFAULT_SYMBOL)
  const [selectedRange, setSelectedRange] = useState(DEFAULT_RANGE)
  const [stock, setStock] = useState(null)
  const [watchlist, setWatchlist] = useState([])
  const [searchHistory, setSearchHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const chartData = useMemo(() => {
    if (!stock || !stock.historicalPoints) return []
    return stock.historicalPoints.map((point) => ({
      timestamp: point.timestamp ? new Date(point.timestamp).toISOString().slice(0, 10) : 'n/a',
      close: Number(point.close || 0),
      volume: Number(point.volume || 0),
    }))
  }, [stock])

  const loadWatchlist = async () => {
    try {
      const list = await fetchWatchlist()
      setWatchlist(list)
    } catch {
      setWatchlist([])
    }
  }

  const loadHistory = async () => {
    try {
      const history = await fetchSearchHistory()
      setSearchHistory(history)
    } catch {
      setSearchHistory([])
    }
  }

  const fetchData = async (ticker = symbol, range = selectedRange) => {
    setLoading(true)
    setError('')
    try {
      const response = await fetchStock(ticker, range)
      setStock(response)
      await addSearchHistory(ticker)
      await loadHistory()
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError.message || 'Unable to fetch stock information.')
      setStock(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWatchlist()
    loadHistory()
    fetchData(DEFAULT_SYMBOL, DEFAULT_RANGE)
  }, [])

  const handleSearch = async (event) => {
    event.preventDefault()
    const cleaned = symbol.trim()
    if (!cleaned) {
      setError('Please enter a stock ticker symbol.')
      return
    }

    await fetchData(cleaned, selectedRange)
  }

  const handleRangeChange = async (range) => {
    setSelectedRange(range)
    if (symbol.trim()) {
      await fetchData(symbol, range)
    }
  }

  const handleHistorySelect = async (ticker) => {
    setSymbol(ticker)
    await fetchData(ticker, selectedRange)
  }

  const handleWatchlistAdd = async (ticker) => {
    try {
      await addWatchlistItem(ticker)
      await loadWatchlist()
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Could not add ticker to watchlist.')
    }
  }

  const handleWatchlistRemove = async (id) => {
    try {
      await deleteWatchlistItem(id)
      await loadWatchlist()
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Could not remove ticker.')
    }
  }

  const handleTargetUpdate = async (id, amount) => {
    try {
      await updateWatchlistItem(id, Number(amount))
      await loadWatchlist()
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Could not update target price.')
    }
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-panel">
        <Header symbol={symbol} onSymbolChange={setSymbol} onSearch={handleSearch} loading={loading} />
        <ErrorMessage message={error} />

        {loading ? (
          <LoadingState />
        ) : stock ? (
          <>
            <StockSummary stock={stock} isPositive={(stock.absoluteChange || 0) >= 0} />
            <div className="toolbar-row">
              <TimeRangeSelector value={selectedRange} onChange={handleRangeChange} />
            </div>
            <StockChart data={chartData} />
            <div className="bottom-grid">
              <Watchlist
                items={watchlist}
                onAdd={handleWatchlistAdd}
                onUpdate={handleTargetUpdate}
                onRemove={handleWatchlistRemove}
              />
              <SearchHistory items={searchHistory} onSelect={handleHistorySelect} />
            </div>
          </>
        ) : (
          <div className="empty-card card">Search for a stock to view live market data.</div>
        )}
      </main>
    </div>
  )
}

export default App
