interface TrackerViewProps {
  trackStatus: number
  onRestart: () => void
}

const TRACK_STEPS = [
  { label: 'Order Received', note: 'Sent to the sushi bar' },
  { label: 'Preparing', note: 'Chef is rolling your order' },
  { label: 'Almost Ready', note: 'Final plating & packing' },
  { label: 'Ready for Pickup', note: 'Come grab it at the counter' },
]

export default function TrackerView({ trackStatus, onRestart }: TrackerViewProps) {
  return (
    <div className="ord-panel-inner ord-panel-inner--dark">
      <div className="ord-tracker-bg" />
      <div className="ord-tracker-scroll">

      {/* SEAL */}
      <div className="ord-seal-wrap">
        <span className="ord-seal-ring ord-seal-ring--1" />
        <span className="ord-seal-ring ord-seal-ring--2" />
        <div className="ord-seal">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <path
              d="M14 27l8 8 16-18"
              stroke="#F7F1E7"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="60"
              strokeDashoffset="60"
              className="ord-seal-check"
            />
          </svg>
        </div>
      </div>

      <div className="ord-confirmed-eyebrow">Order Confirmed</div>
      <h2 className="ord-confirmed-title">Arigatō, Alex!</h2>
      <p className="ord-confirmed-desc">
        We&rsquo;ve sent your order to the kitchen. Track it live below.
      </p>

      {/* ORDER META */}
      <div className="ord-meta-row">
        <div className="ord-meta-card">
          <div className="ord-meta-label">Order</div>
          <div className="ord-meta-value">#IS-4827</div>
        </div>
        <div className="ord-meta-card">
          <div className="ord-meta-label">Ready by</div>
          <div className="ord-meta-value">11:48 AM</div>
        </div>
      </div>

      {/* LIVE TRACKER */}
      <div className="ord-live-tracker">
        <div className="ord-live-header">
          <span className="ord-live-label">Live Status</span>
          <span className="ord-live-updating">
            <span className="ord-live-dot" />
            Updating
          </span>
        </div>
        <div className="ord-track-steps">
          {TRACK_STEPS.map((t, i) => {
            const done = i < trackStatus
            const active = i === trackStatus
            return (
              <div key={t.label} className="ord-track-step">
                <div className="ord-track-step-left">
                  <span
                    className="ord-track-dot"
                    style={{
                      background: done || active ? '#C4321F' : 'rgba(247,241,231,.12)',
                      border: active ? '2px solid #E9CF93' : 'none',
                      animation: active ? 'ik-pulse 1.8s infinite' : 'none',
                    }}
                  >{done ? '✓' : ''}</span>
                  {i < 3 && (
                    <span
                      className="ord-track-line"
                      style={{ background: done ? '#C4321F' : 'rgba(247,241,231,.12)' }}
                    />
                  )}
                </div>
                <div className="ord-track-step-body">
                  <div
                    className="ord-track-step-title"
                    style={{ color: done || active ? '#F7F1E7' : 'rgba(247,241,231,.4)' }}
                  >{t.label}</div>
                  <div className="ord-track-step-note">
                    {active ? t.note + ' · now' : t.note}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* PICKUP INSTRUCTIONS */}
      <div className="ord-pickup-instructions">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E9CF93" strokeWidth="1.8">
          <circle cx="12" cy="10" r="3" />
          <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" strokeLinejoin="round" />
        </svg>
        <span>Pick up at the <strong>counter</strong> · show order <strong>#IS-4827</strong> to our team.</span>
      </div>

      {/* REPLAY */}
      <button className="ord-replay-btn" onClick={onRestart}>
        Replay the flow
      </button>
      </div>{/* end ord-tracker-scroll */}
    </div>
  )
}
