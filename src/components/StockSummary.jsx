import { ArrowDownRight, ArrowUpRight, Clock3 } from 'lucide-react'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0))

const formatPercent = (value) => `${Number(value || 0).toFixed(2)}%`

export default function StockSummary({ stock, isPositive }) {
  if (!stock) return null

  return (
    <section className="summary-card card">
      <div className="symbol-row">
        <div>
          <span className="meta-label">Ticker</span>
          <div className="ticker-wrap">
            <h2>{stock.symbol}</h2>
            <span className="company-name">{stock.companyName || 'Market Data'}</span>
          </div>
        </div>
        <div className={`price-pill ${isPositive ? 'up' : 'down'}`}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {isPositive ? 'Bullish' : 'Bearish'}
        </div>
      </div>

      <div className="price-row">
        <div>
          <div className="price-value">{formatCurrency(stock.latestPrice)}</div>
          <div className={`change-row ${isPositive ? 'up' : 'down'}`}>
            <span>{isPositive ? '+' : '-'}{formatCurrency(Math.abs(stock.absoluteChange || 0))}</span>
            <span>({isPositive ? '+' : '-'}{formatPercent(Math.abs(stock.percentageChange || 0))})</span>
          </div>
        </div>
        <div className="detail-stack">
          <div className="detail-item">
            <span>Open</span>
            <strong>{formatCurrency(stock.open)}</strong>
          </div>
          <div className="detail-item">
            <span>High</span>
            <strong>{formatCurrency(stock.high)}</strong>
          </div>
          <div className="detail-item">
            <span>Low</span>
            <strong>{formatCurrency(stock.low)}</strong>
          </div>
          <div className="detail-item">
            <span>Prev Close</span>
            <strong>{formatCurrency(stock.previousClose)}</strong>
          </div>
        </div>
      </div>

      <div className="summary-footer">
        <div className="meta-item">
          <Clock3 size={16} />
          <span>{stock.marketTimestamp ? new Date(stock.marketTimestamp).toLocaleString() : 'Market data timestamp unavailable'}</span>
        </div>
        <div className="meta-item">
          <span>Volume</span>
          <strong>{new Intl.NumberFormat('en-US').format(Number(stock.volume || 0))}</strong>
        </div>
      </div>
    </section>
  )
}
