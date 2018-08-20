export default {
  name: 'spinner',
  props: {
    size: { default: '100px' },
    background: { default: '#FFFFFF' },
    duration: { default: '1.2s' }
  },
  computed: {
    rectStyles () {
      return { backgroundColor: this.background, animationDuration: this.duration }
    },
    styles () {
      return { width: this.size, height: this.size }
    }
  }
}
