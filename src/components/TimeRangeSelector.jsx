const ranges = ['1D', '1W', '1M', '3M', '6M', '1Y', '5Y']

export default function TimeRangeSelector({ value, onChange }) {
  return (
    <div className="range-selector">
      {ranges.map((range) => (
        <button
          key={range}
          type="button"
          className={value === range ? 'range-button active' : 'range-button'}
          onClick={() => onChange(range)}
        >
          {range}
        </button>
      ))}
    </div>
  )
}
