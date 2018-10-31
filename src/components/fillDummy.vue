<template>
  <div :class="'fill-dummy-' + color + '-' + size">
    &nbsp;
  </div>
</template>

<script>

export default {
  name: 'fill-dummy',
  props: {
    size: {
      type: String,
      default: 'normal'
    },
    color: {
      type: String,
      default: 'blue'
    }
  },
}
</script>

<style>
  .fill-dummy-blue-normal{
    display: inline-block;
    width:80px;
    height: 15px;
    border-radius: 2px;
    margin: 5px 0px 2px 5px;
    animation: pulse 2s infinite ease-in-out;
  }

  .fill-dummy-blue-small{
    display: inline-block;
    width:30px;
    height: 15px;
    border-radius: 2px;
    margin: 5px 0px 2px 5px;
    animation: pulse 2s infinite ease-in-out;
  }

  .fill-dummy-blue-big{
    display: inline-block;
    width:250px;
    height: 25px;
    border-radius: 2px;
    margin: 5px 0px 2px 5px;
    animation: pulse 2s infinite ease-in-out;
  }


  @keyframes pulse {
    0% {
      background-color: rgba(256, 256, 256, 0.1)
    }
    50% {
      background-color: rgba(256, 256, 256, 0.3)
    }
    100% {
      background-color: rgba(256, 256, 256, 0.1)
    }
  }

  .fill-dummy-grey-normal{
    display: inline-block;
    width:120px;
    height: 18px;
    border-radius: 2px;
    margin: 5px 0px 2px 5px;
    animation: pulse-grey 2s infinite ease-in-out;
  }

  .fill-dummy-grey-small{
    display: inline-block;
    width:30px;
    height: 15px;
    border-radius: 2px;
    margin: 5px 0px 2px 5px;
    animation: pulse-grey 2s infinite ease-in-out;
  }

  @keyframes pulse-grey {
    0% {
      background-color: rgba(49, 27, 50, 0.1)
    }
    50% {
      background-color: rgba(49, 27, 50, 0.3)
    }
    100% {
      background-color: rgba(49, 27, 50, 0.1)
    }
  }

  .fill-dummy-grey-big{
    display: inline-block;
    width:250px;
    height: 25px;
    border-radius: 2px;
    margin: 5px 0px 2px 5px;
    animation: pulse-grey 2s infinite ease-in-out;
  }

</style>
