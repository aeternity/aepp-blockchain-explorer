<template>
  <div class="view-and-copy">
    <Popper
      :options="popperOptions"
      trigger="click"
    >
      <div class="popper">
        <div class="inner">
          {{ text }}
        </div>
      </div>
      <AeButton
        slot="reference"
        size="small"
        plain
      >
        <AeIcon
          slot="icon"
          name="view"
        />
      </AeButton>
    </Popper>

    <textarea
      ref="text"
      v-model="text"
      rows="1"
      class="text"
      readonly
      required
    />
    <AeButton
      size="small"
      plain
      @click.prevent="copy"
    >
      <AeIcon
        slot="icon"
        name="copy"
      />
    </AeButton>
  </div>
</template>
<script>
import {
  AeButton,
  AeIcon
} from '@aeternity/aepp-components'
import Popper from 'vue-popperjs'
export default {
  name: 'ViewAndCopy',
  components: {
    AeButton,
    AeIcon,
    Popper
  },
  props: {
    text: {
      type: String,
      required: true
    }
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
