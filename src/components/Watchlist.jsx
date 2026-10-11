import { Minus, Plus } from 'lucide-react'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0))

export default function Watchlist({ items, onAdd, onUpdate, onRemove }) {
  return (
    <section className="card watchlist-card">
      <div className="section-header">
        <h3>Watchlist</h3>
        <button type="button" className="inline-action" onClick={() => onAdd('AAPL')}>
          <Plus size={14} /> Add sample
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-card">No symbols saved yet.</div>
      ) : (
        <div className="watchlist-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Price</th>
                <th>Daily</th>
                <th>Target</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const isPositive = Number(item.priceChange || 0) >= 0
                return (
                  <tr key={item.id ?? item.symbol}>
                    <td className="symbol-cell">{item.symbol}</td>
                    <td>{formatCurrency(item.latestPrice)}</td>
                    <td className={isPositive ? 'trend up' : 'trend down'}>
                      {item.priceChange ? `${isPositive ? '+' : '-'}${formatCurrency(Math.abs(item.priceChange))}` : '—'}
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.targetPrice ?? ''}
                        placeholder="Optional"
                        onChange={(event) => onUpdate(item.id, Number(event.target.value))}
                        aria-label={`Target price for ${item.symbol}`}
                      />
                    </td>
                    <td>
                      <button type="button" className="danger-button" onClick={() => onRemove(item.id)}>
                        <Minus size={14} /> Remove
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
