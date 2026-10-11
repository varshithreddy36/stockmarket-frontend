import { Search, TrendingUp } from 'lucide-react'

export default function Header({ symbol, onSymbolChange, onSearch, loading }) {
  return (
    <header className="topbar">
      <div className="brand-wrap">
        <div className="brand-icon">
          <TrendingUp size={18} />
        </div>
        <div>
          <span className="eyebrow">Market Overview</span>
          <h1>Stock Market Tracker</h1>
        </div>
      </div>

      <form className="search-form" onSubmit={onSearch}>
        <label className="sr-only" htmlFor="stock-search">
          Stock ticker
        </label>
        <Search size={16} />
        <input
          id="stock-search"
          value={symbol}
          onChange={(event) => onSymbolChange(event.target.value)}
          placeholder="Search ticker (e.g. AAPL)"
          aria-label="Search ticker symbol"
          autoComplete="off"
        />
        <button type="submit" disabled={loading || !symbol.trim()}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>
    </header>
  )
}
