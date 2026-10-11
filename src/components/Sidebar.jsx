import { Activity, BellRing, BriefcaseBusiness, Gauge, ShieldCheck } from 'lucide-react'

const items = [
  { icon: Gauge, label: 'Dashboard' },
  { icon: Activity, label: 'Markets' },
  { icon: BriefcaseBusiness, label: 'Portfolio' },
  { icon: BellRing, label: 'Alerts' },
  { icon: ShieldCheck, label: 'Security' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="nav-group">
        {items.map(({ icon: Icon, label }) => (
          <button key={label} type="button" className="nav-item" aria-label={label}>
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}
