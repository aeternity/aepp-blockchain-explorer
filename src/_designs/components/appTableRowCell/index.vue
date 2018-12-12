<template>
  <div
    class="app-table-row-cell" :class="{ extend }">
    <span class="app-table-row-cell__title">
      {{ title }}
    </span>
    <span class=".app-table-row-cell__content" v-if="content">
      {{ content }}
    </span>
    <span class=".app-table-row-cell__time" v-if="time">
      {{ time }}
    </span>
    <span
      v-if="hash"
      class=".app-table-row-cell__content wide mono"
    >
      <RouterLink
        :to=" hash "
        class=".app-table-row-cell__link"
      >
        {{ hash }}
      </RouterLink>
    </span>
    <span
      v-if="pow"
      class=".app-table-row-cell__content wide mono"
    >
      {{ hash }}
    </span>
  </div>
</template>
<script >
export default {
  name: 'AppTableRowCell',
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
      type: String,
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

.app-table-row-cell{
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

.app-table-row-cell__link {
  color: $color-neutral-negative-1;
}
.app-table-row-cell__title {
  text-transform: uppercase;
  font-weight: bold;
  font-size: rem(11px);
  line-height: 1em;
  letter-spacing: 0.14em;
}

.app-table-row-cell__content {
  font-size: rem(15px);
  line-height: 1.2em;
  color: $color-neutral-negative-1;
}

.app-table-row-cell__title {
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

.app-table-row-cell__content {
  word-break: break-word;
  @include sm-lg {
    display: table-cell;
    padding: .8rem;
  }
}

.app-table-row-cell.extend {
  width: 100%;
}

</style>
