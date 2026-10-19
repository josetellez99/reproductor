/* Tiny flags for table headers and labels (3:2). */

export function FlagUS({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#f2efe9" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#c8102e" />
      ))}
      <rect width="13" height={(7 * 20) / 13} fill="#1f3a8a" />
    </svg>
  )
}

export function FlagES({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#c60b1e" />
      <rect y="5" width="30" height="10" fill="#ffc400" />
    </svg>
  )
}
