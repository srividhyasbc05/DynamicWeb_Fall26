export const colorOptions = {
  page:   ['#4567b7', '#101b39', '#013026', '#A7F0DD', '#5D9F96'],
  widget: ['#C592A8', '#B2DCE2', '#2b3140', '#97CD97'],
  text:   ['#dddddd', '#0E0E0E', '#3b2f2f', '#1e3a5f'],
}

export const fontFamilies = {
  sans: 'system-ui, sans-serif',
  serif: 'Georgia, serif',
  mono: 'ui-monospace, monospace',
}
export const headingSizes = { sm: '1.1rem', md: '1.4rem', lg: '1.8rem' }
export const bodySizes = { sm: '0.875rem', md: '1rem', lg: '1.125rem' }
export const weights = { normal: 400, semibold: 600, bold: 700 }

export const toRgba = (hex, opacity) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}