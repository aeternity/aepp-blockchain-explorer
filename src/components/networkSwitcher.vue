<template>
  <ae-card class="network-switcher">
    <ae-list face="primary">
      <ae-list-item
        class="network-item"
        v-for="(network, index) in networks"
        :key="index"
        :class="{ 'custom-network': network.isCustom }"
      >
        <ae-dropdown direction="left" v-if="network.isCustom">
          <ae-icon name="more" size="20px" slot="button" />
          <li>
            <ae-icon name="copy" />
            Copy Link
          </li>
          <li>
            <ae-button @click="removeNetwork(index)">
              <ae-icon name="delete" />
              Delete
            </ae-button>
          </li>
        </ae-dropdown>
        <div class="network-info">
          <div class="network-info__name">
            {{network.name}}
          </div>
          <div class="network-info__url">
            {{network.url}}
          </div>
        </div>
        <ae-check
          class="network-switcher__action"
          v-model="networkUrl"
          :value="network.url"
          type="radio"
          @change="$emit('select-network', network)"
        />
      </ae-list-item>
    </ae-list>
    <ae-toolbar slot="footer">
      <ae-button
        class="network-info__connect"
        face="flat"
        @click="$emit('show-form')"
      >Connect to other network</ae-button>
    </ae-toolbar>
  </ae-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import {
  AeCard,
  AeList,
  AeListItem,
  AeCheck,
  AeToolbar,
  AeButton,
  AeDropdown,
  AeIcon
} from '@aeternity/aepp-components-3'

export default {
  name: 'network-switcher',
  components: {
    AeCard,
    AeList,
    AeListItem,
    AeCheck,
    AeToolbar,
    AeButton,
    AeDropdown,
    AeIcon
  },
  data () {
    return {
      networkUrl: this.$store.state.epochUrl
    }
  },
  methods: mapMutations(['removeNetwork']),
  computed: mapGetters(['networks'])
}
</script>

<style lang="scss" scoped>
@import '../style/variables';

.ae-loader{
  margin: 0;
}

.network-switcher{
  max-width: 320px;

  > /deep/ .ae-card-main{
    padding: 0;
    flex-direction: column;
    align-items: center;

    .ae-list{
      width: 100%;
      box-sizing: border-box;
      padding: 0;
      overflow: visible;

      .ae-list-item{
        padding: 20px 15px 16px;

        &.custom-network {
          background-color: $paleGrey;
          justify-content: flex-start;

          .ae-check{
            margin-left: auto;
          }

          .ae-dropdown-button{
            justify-content: flex-start;
            i{
              margin-left: -6px;
            }
          }
        }
      }
    }
  }

  & /deep/.ae-check-button{
    min-width: 36px;
    padding-left: 0;
  }

  .handler-wrapper{
    width: 100%;
  }
  .network-info{

    &__name{
      font-size: 15px;
      line-height: 20px;
      letter-spacing: 0;
      color: #203040;
    }
    &__url{
      font-size: 13px;
      line-height: 16px;
      letter-spacing: 0;
      color: $darkGrey;
    }
    &__connect{
      color: $darkGrey;
    }
  }

}
</style>
