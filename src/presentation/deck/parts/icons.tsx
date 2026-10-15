import type { ReactNode, SVGProps } from 'react'

/* 24×24 line icons for the deck. They inherit `color`. */

type P = SVGProps<SVGSVGElement>

function Icon({ children, ...p }: P & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...p}
    >
      {children}
    </svg>
  )
}

export const IconSchool = (p: P) => (
  <Icon {...p}>
    <path d="M2 9l10-5 10 5-10 5z" />
    <path d="M6 11v5c3 2.5 9 2.5 12 0v-5" />
    <path d="M22 9v6" />
  </Icon>
)

export const IconHealth = (p: P) => (
  <Icon {...p}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
    <path d="M7 12h3l1.5-2.5 2 5L15 12h2" />
  </Icon>
)

export const IconChild = (p: P) => (
  <Icon {...p}>
    <circle cx="12" cy="7" r="3" />
    <path d="M7 21v-3a5 5 0 0 1 10 0v3" />
    <path d="M9 13l-3-2M15 13l3-2" />
  </Icon>
)

export const IconBank = (p: P) => (
  <Icon {...p}>
    <path d="M3 9l9-5 9 5" />
    <path d="M5 9v8M9.5 9v8M14.5 9v8M19 9v8" />
    <path d="M3 20h18" />
  </Icon>
)

export const IconLock = (p: P) => (
  <Icon {...p}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    <circle cx="12" cy="16" r="1.2" />
  </Icon>
)

export const IconCopyright = (p: P) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15 9.5a3.5 3.5 0 1 0 0 5" />
  </Icon>
)

export const IconGlobeShield = (p: P) => (
  <Icon {...p}>
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
    <path d="M4.5 11h15M12 3.5c-2 2.5-2.8 5-2.8 8s.8 6 2.8 8.5M12 3.5c2 2.5 2.8 5 2.8 8s-.8 6-2.8 8.5" />
  </Icon>
)

export const IconBrain = (p: P) => (
  <Icon {...p}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    <path d="M10 10h4v4h-4z" />
  </Icon>
)

export const IconShield = (p: P) => (
  <Icon {...p}>
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </Icon>
)

export const IconScale = (p: P) => (
  <Icon {...p}>
    <path d="M12 3v18M5 21h14M4 7h16" />
    <path d="M7 7l-3 7a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0z" />
  </Icon>
)

export const IconChat = (p: P) => (
  <Icon {...p}>
    <path d="M4 5h16v11H9l-5 4z" />
    <path d="M8 9h8M8 12h5" />
  </Icon>
)

export const IconPin = (p: P) => (
  <Icon {...p}>
    <path d="M12 21s-6-6.2-6-11a6 6 0 0 1 12 0c0 4.8-6 11-6 11z" />
    <circle cx="12" cy="10" r="2.2" />
  </Icon>
)

export const IconSearch = (p: P) => (
  <Icon {...p}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="M15 15l5.5 5.5" />
  </Icon>
)

export const IconTrash = (p: P) => (
  <Icon {...p}>
    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
    <path d="M10 11v6M14 11v6" />
  </Icon>
)

export const IconNoSale = (p: P) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M5.6 5.6l12.8 12.8" />
    <path d="M14.5 9.2c-.6-.8-1.5-1.2-2.5-1.2-1.4 0-2.5.8-2.5 2s1 1.6 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2c-1 0-2-.4-2.6-1.2M12 6.5V8M12 16v1.5" />
  </Icon>
)

export const IconUser = (p: P) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </Icon>
)

export const IconBuilding = (p: P) => (
  <Icon {...p}>
    <path d="M4 21V5l8-2v18M12 21V9l8 2v10" />
    <path d="M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2M2 21h20" />
  </Icon>
)

export const IconMegaphone = (p: P) => (
  <Icon {...p}>
    <path d="M3 10v4h4l8 5V5L7 10z" />
    <path d="M18 9a4 4 0 0 1 0 6" />
  </Icon>
)
