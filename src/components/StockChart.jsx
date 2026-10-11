import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function StockChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="empty-card card">No chart data is available for the selected range.</div>
  }

  return (
    <div className="chart-card card">
      <div className="section-header">
        <h3>Price History</h3>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#35d399" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#35d399" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#24314a" strokeDasharray="4 4" />
          <XAxis dataKey="timestamp" tick={{ fill: '#9aa9c2', fontSize: 11 }} />
          <YAxis tick={{ fill: '#9aa9c2', fontSize: 11 }} domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              border: '1px solid #2a3855',
              borderRadius: '12px',
              color: '#e5edf8',
            }}
          />
          <Area type="monotone" dataKey="close" stroke="#35d399" strokeWidth={2} fill="url(#lineFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
