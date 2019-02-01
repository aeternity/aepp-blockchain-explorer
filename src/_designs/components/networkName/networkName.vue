<template>
  <div>
    <span
      class="container"
    >
      <span class="network-name">
        Roma net
      </span>
    </span>
  </div>
</template>

<script>

export default {}
</script>

<style lang="scss" scoped>
  @import '../../../style/mixins';

  .container {
    display: flex;
    justify-content: flex-end;
    color: $white;

    .network-name{
      @include font-size(xs);
      font-weight:500;
      padding:15px 20px;
      margin:30px 20px 0 0;
      background: #F7296E;
      border-radius: 5px;
    }
  }
</style>
