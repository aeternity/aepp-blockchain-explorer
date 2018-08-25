export default txType => txType
  .replace(/_tx$/, '')
  .replace(/_/g, ' ')
  .replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
