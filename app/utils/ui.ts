// Shared class strings for the redesigned Niveau 1 pages (see design handoff)

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fe3d6]'

export const primaryButton = `inline-flex items-center justify-center rounded-[10px] bg-[#7fe3d6] font-semibold text-[#05111a] transition-colors hover:bg-[#a3efe5] ${focusRing}`

export const secondaryButton = `inline-flex items-center justify-center rounded-[10px] border border-[rgba(232,241,244,0.18)] bg-transparent font-medium text-[#e8f1f4] transition-colors hover:border-[rgba(127,227,214,0.45)] hover:bg-[rgba(127,227,214,0.08)] ${focusRing}`

export const drawerButton = `flex h-[38px] items-center rounded-[9px] border border-[rgba(232,241,244,0.12)] bg-transparent px-3.5 text-sm font-medium text-[#e8f1f4] transition-colors hover:border-[rgba(127,227,214,0.45)] hover:bg-[rgba(127,227,214,0.08)] disabled:opacity-50 ${focusRing}`

export const cardBase =
  'rounded-[14px] border border-[rgba(232,241,244,0.09)] bg-white/[0.035]'

export const cardHover = `transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[rgba(127,227,214,0.45)] hover:bg-[rgba(127,227,214,0.08)] ${focusRing}`

export const chipClass = (on: boolean) =>
  `flex h-[38px] items-center gap-2 rounded-full border px-3.5 text-sm transition-colors ${
    on
      ? 'border-[#7fe3d6] bg-[#7fe3d6] font-semibold text-[#05111a]'
      : 'border-[rgba(232,241,244,0.12)] bg-white/[0.04] font-medium text-[#d4e2e7] hover:border-[rgba(127,227,214,0.45)]'
  }`

export const tagClass = (tone: 'aqua' | 'yellow' | 'coral') =>
  `rounded-md border px-2 py-1 font-mono text-xs uppercase leading-none tracking-[0.08em] ${
    {
      aqua: 'border-[rgba(127,227,214,0.3)] bg-[rgba(127,227,214,0.1)] text-[#7fe3d6]',
      yellow:
        'border-[rgba(245,213,71,0.35)] bg-[rgba(245,213,71,0.1)] text-[#f5d547]',
      coral:
        'border-[rgba(255,143,128,0.35)] bg-[rgba(255,143,128,0.1)] text-[#ff8f80]',
    }[tone]
  }`

export const pad2 = (n: number) => String(n).padStart(2, '0')
