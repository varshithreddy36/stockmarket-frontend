export default function SearchHistory({ items, onSelect }) {
  if (!items || items.length === 0) {
    return <div className="empty-card card">Recent search history will appear here.</div>
  }

  return (
    <section className="card history-card">
      <div className="section-header">
        <h3>Recent Searches</h3>
      </div>
      <div className="history-list">
        {items.map((item) => (
          <button key={`${item.id ?? item.symbol}-${item.searchedAt}`} type="button" onClick={() => onSelect(item.symbol)}>
            {item.symbol}
          </button>
        ))}
      </div>
    </section>
  )
}
