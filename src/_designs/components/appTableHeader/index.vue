<template>
  <div class="app-table-header">
    <div class="app-table-header-row">
      <div class="app-table-header-row-cell">
        <span class="app-table-header-row-cell-title">
          blockheight
        </span>
        <span class="app-table-header-row-cell-content">
          6606081
        </span>
      </div>
      <div class="app-table-header-row-cell">
        <div class="app-time">
          <span class="app-time-date">
            October 11 2018
          </span>
          <span class="app-time-clock">
            10:59:34 AM +UTC
          </span>
        </div>
      </div>
      <div class="app-table-header-row-cell float">
        <span class="app-table-header-row-cell-title">
          confirmations
        </span>
        <span class="app-table-header-row-cell-content">
          235
        </span>
      </div>
    </div>
    <div class="app-table-header-row">
      <div class="app-table-header-row-cell extend">
        <span class="app-table-header-row-cell-title">
          blockheight
        </span>
        <span class="app-table-header-row-cell-content">
          6606081
        </span>
      </div>
      <div class="app-table-header-row-cell">
        <div class="app-time">
          <span class="app-time-date">
            October 11 2018
          </span>
          <span class="app-time-clock">
            10:59:34 AM +UTC
          </span>
        </div>
      </div>
      <div class="app-table-header-row-cell">
        <span class="app-table-header-row-cell-title">
          confirmations
        </span>
        <span class="app-table-header-row-cell-content">
          235
        </span>
      </div>
      <div class="app-table-header-row-cell stack">
        <span class="app-table-header-row-cell-title">
          confirmations
        </span>
        <span class="app-table-header-row-cell-content">
          235
        </span>
      </div>
      <div class="app-table-header-row-cell stack">
        <span class="app-table-header-row-cell-title">
          confirmations
        </span>
        <span class="app-table-header-row-cell-content">
          235
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTableHeader'
}
</script>

<style scoped lang="scss">
@import "~@aeternity/aepp-components-3/src/styles/variables/colors.scss";

.app-table-header {
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  border: 2px solid $color-neutral-positive-2;
}
.app-table-header-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 100%;
  &:not(:last-child) {
    border-bottom: 2px solid $color-neutral-positive-2;
  }
  @media (min-width: 450px) {
    justify-content: flex-start;
  }
}

.app-table-header-row.stack {
  @media (min-width: 450px) {
    justify-content: flex-end;
  }
}

.app-table-header-row-cell {
  display: flex;
  flex-wrap: wrap;
  padding: .8rem;
  width: 50%;
  @media (min-width: 450px) {
    width: 25%;
    order: 3;
    &:first-child {
      order: 1;
    }
  }
  &:not(:first-child) {
    border-left: 2px solid $color-neutral-positive-2;
  }
  &:last-child{
    border-top: 2px solid $color-neutral-positive-2;
    @media (min-width: 450px) {
      border-top: none;

    }
  }
}

.app-table-header-row-cell.extend {
  @media (min-width: 450px) {
    width: auto;
    margin-right: auto;
  }
}
.app-table-header-row-cell.float {
  @media (min-width: 450px) {
    width: auto;
    border: none;
    order: 2;
    margin-right: auto;
  }
}
.app-table-header-row-cell.stack:not(:last-child){
  margin-left: auto;
  border-left: 2px solid $color-neutral-positive-2;
}
.app-table-header-row-cell-title {
  display: block;
}
.app-table-header-row-cell-content {
  display: block;
}
.app-time {
  display: flex;
  flex-direction: column;
}
</style>
