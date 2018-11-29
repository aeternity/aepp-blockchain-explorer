import {BigNumber} from 'bignumber.js'

export default {
  methods: {
    yaniToAe (yani) {
      return new BigNumber(yani).shiftedBy(-18).toString()
    }
  }
}
