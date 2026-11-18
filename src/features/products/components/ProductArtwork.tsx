import type { ProductArtwork as ArtworkKind } from '../product.types'

type Props = { kind: ArtworkKind; color: string }

// Decorative local illustrations: no external image requests or product-photo claims.
export default function ProductArtwork({ kind, color }: Props) {
  return (
    <svg viewBox="0 0 240 200" fill="none" aria-hidden="true" focusable="false">
      <ellipse cx="120" cy="176" rx="70" ry="9" fill="#172033" opacity=".08" />
      {kind === 'headphones' && <>
        <path d="M61 119V91a59 59 0 0 1 118 0v28" stroke={color} strokeWidth="18" />
        <path d="M67 88a53 53 0 0 1 106 0" stroke="white" strokeOpacity=".45" strokeWidth="4" />
        <rect x="45" y="98" width="37" height="64" rx="16" fill={color} transform="rotate(-9 45 98)" />
        <rect x="158" y="98" width="37" height="64" rx="16" fill={color} transform="rotate(9 158 98)" />
        <path d="M69 111v37M171 111v37" stroke="#172033" strokeOpacity=".25" strokeWidth="9" strokeLinecap="round" />
      </>}
      {kind === 'bag' && <>
        <path d="M86 77V59a34 34 0 0 1 68 0v18" stroke={color} strokeWidth="10" />
        <path d="M63 69h114l12 101H51L63 69Z" fill={color} />
        <path d="M78 78v76M162 78v76" stroke="white" strokeOpacity=".35" strokeWidth="3" />
        <rect x="104" y="105" width="32" height="23" rx="3" fill="#fff7e9" />
        <path d="M113 116h14" stroke={color} strokeWidth="2" />
      </>}
      {kind === 'shoe' && <>
        <path d="m49 102 18-38 45 23 18 31 57 14q25 5 25 25H29q-4-29 20-55Z" fill={color} />
        <path d="M30 151h182v15H30z" fill="#fffcf5" />
        <path d="m93 97 23-7m-14 18 23-7m-14 18 23-7" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <path d="m65 106 21 30 57-5" stroke="white" strokeOpacity=".65" strokeWidth="7" />
        <path d="M32 166h178" stroke="#172033" strokeOpacity=".2" strokeWidth="4" />
      </>}
      {kind === 'lamp' && <>
        <path d="M120 91v72" stroke={color} strokeWidth="11" />
        <ellipse cx="120" cy="166" rx="43" ry="9" fill={color} />
        <path d="M88 35h64l33 70H55l33-70Z" fill={color} />
        <ellipse cx="120" cy="105" rx="65" ry="10" fill="#ffe5a1" />
        <path d="m92 45-19 48" stroke="white" strokeOpacity=".35" strokeWidth="5" strokeLinecap="round" />
      </>}
    </svg>
  )
}
