<template>
  <div
    class="app-cell"
    :class="{
      extend
    }
    "
  >
    <span class="title">
      {{ title }}
    </span>
    <span
      v-if="d"
      class="d"
    >
      {{ d }}
    </span>
    <span
      v-if="time"
      class="time"
    >
      {{ time }}
    </span>
    <span
      v-if="hash"
      class="content wide mono"
    >
      <RouterLink
        :to=" hash "
        class="link"
      >
        {{ hash }}
      </RouterLink>
    </span>
    <span
      v-if="pow"
      class="content wide mono"
    >
      {{ hash }}
    </span>
  </div>
</template>
<script >
export default {
  name: 'AppCell',
  props: {
    title: {
      type: String,
      default: String
    },
    extend: {
      type: Boolean,
      default: false
    },
    content: {
      type: [String, Number],
      default: String
    },
    pow: {
      type: [String, Number],
      default: String
    },
    hash: {
      type: [String, Number],
      default: String
    },
    time: {
      type: [Date, String],
      default: String
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/index';

.app-cell{
  display: block;
  width: 50%;
  padding: 0 .8rem;

    @include sm-lg {
      display: table-row;
      &:nth-child(2n) {
        border-top: 2px solid $color-neutral-positive-2;
        border-bottom: 2px solid $color-neutral-positive-2;
      }
      width: 100%;
    }

  &:not(.extend):nth-child(1) {
    @include xs {
      border-right: 2px solid $color-neutral-positive-2;
    }
  }
}

.extend {
  width: 100%;
}

.title {
  margin-bottom: .5rem;
  display: block;
   @include sm-lg {
    padding:.8rem;
    margin: 0;
    width:  30%;
    text-align: right;
    display: table-cell;
    background-color: $color-neutral-positive-3;
    border-right: 2px solid $color-neutral-positive-2;
  }
}

.content {
  word-break: break-word;
  @include sm-lg {
    display: table-cell;
    padding: .8rem;
  }
}

.wide {
  width: 100%;
}
.mono{
  font-family: $font-mono;
}
.link {
  color: $color-neutral-negative-1;
}
.title {
  text-transform: uppercase;
  font-weight: bold;
  font-size: rem(11px);
  line-height: 1em;
  letter-spacing: 0.14em;
}

.content {
  font-size: rem(15px);
  line-height: 1.2em;
  color: $color-neutral-negative-1;
}
</style>
