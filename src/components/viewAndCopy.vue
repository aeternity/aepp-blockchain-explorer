<template>
  <div class="view-and-copy">

    <popper trigger="click" :options="popperOptions">
      <div class="popper">
        <div class="inner">
          {{text}}
        </div>
      </div>
      <ae-button slot="reference" size="small" plain>
        <ae-icon slot="icon" name="view"/>
      </ae-button>
    </popper>

    <textarea rows=1 class="text" readonly v-model="text" ref="text" required />
    <ae-button @click.prevent="copy" size="small" plain>
      <ae-icon slot="icon" name="copy"/>
    </ae-button>
  </div>
</template>
<script>
import {
  AeButton,
  AeIcon
} from '@aeternity/aepp-components'
import Popper from 'vue-popperjs'
export default {
  name: 'view-and-copy',
  props: ['text'],
  components: {
    AeButton,
    AeIcon,
    Popper
  },
  data () {
    return {
      popperOptions: {
        placement: 'top',
        modifiers: {
          flip: {
            behavior: ['left', 'top']
          },
          preventOverflow: {
            boundariesElement: window
          }
        }
      }
    }
  },
  methods: {
    copy () {
      try {
        let textArea = this.$refs.text
        textArea.select()
        document.execCommand('copy')
      } catch (err) {
        console.log('err', err)
      }
    }
  }
}
</script>
<style scoped lang='scss'>
@import '../style/mixins';

textarea {
  position:absolute;
  z-index:-100;
  width:0;
  height:0;
}
.popper {
  border:none;
  background:$black;
  color:$white;
  border-radius:12px;
  padding:10px 10px 10px 10px;
  @include font-size(s);
  max-width:80vw;
  margin-bottom:10px;
  overflow:scroll;
}
</style>
