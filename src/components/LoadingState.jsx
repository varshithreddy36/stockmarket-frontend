export default function LoadingState({ message = 'Loading stock data...' }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-line short" />
      <div className="skeleton skeleton-line" />
      <p>{message}</p>
    </div>
  )
}
