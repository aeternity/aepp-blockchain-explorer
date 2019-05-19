<template>
  <div class="status-screen screen">
    <div>
      <h1>Status</h1>
      <p>
        Explorer connected to:
                           <strong v-if="!isLoading">
                             {{ node }}
                           </strong>
                           <FillDummy
                             v-else
                             color="grey"
                           />
      </p>
      <h2>Node and Peers</h2>
      <div class="container">
        <Field name="Difficulty">
          <div v-if="!isLoading">
            {{ nodeStatus.version.difficulty }}
          </div>
          <FillDummy
            v-else
            color="grey"
          />
        </Field>
        <Field name="Peer Count">
          <div v-if="!isLoading">
            {{ nodeStatus.version.peerCount }}
          </div>
          <FillDummy
            v-else
            color="grey"
          />
        </Field>
        <Field name="Network ID">
          <div v-if="!isLoading">
            {{ nodeStatus.version.networkId }}
          </div>
          <FillDummy
            v-else
            color="grey"
          />
        </Field>
        <Field name="Pending Transactions">
          <div v-if="!isLoading">
            {{ nodeStatus.version.pendingTransactionsCount }}
          </div>
          <FillDummy
            v-else
            color="grey"
          />
        </Field>
        <Field name="Genesis Key Block Hash">
          <RouterLink
            v-if="!isLoading"
            :to="`/generation/${nodeStatus.version.genesisKeyBlockHash}`"
          >
            {{ nodeStatus.version.genesisKeyBlockHash | startAndEnd }}
          </RouterLink>
          <ViewAndCopy
            v-if="!isLoading"
            color="boring"
            :text="nodeStatus.version.genesisKeyBlockHash"
          />
          <FillDummy
            v-else
            color="grey"
          />
        </Field>
        <Field name="Version NodeRevision">
          <div v-if="!isLoading">
            {{ nodeStatus.version.nodeRevision | startAndEnd }}
          </div>
          <FillDummy
            v-else
            color="grey"
          />
        </Field>
        <Field name="Listening">
          <div v-if="!isLoading">
            {{ nodeStatus.version.listening }}
          </div>
          <FillDummy
            v-else
            color="grey"
          />
        </Field>
        <Field name="Syncing">
          <div v-if="!isLoading">
            {{ nodeStatus.version.syncing }}
          </div>
          <FillDummy
            v-else
            color="grey"
          />
        </Field>
      </div>
      <h2>Top</h2>
      <div class="container">
        <Field name="Height">
          <RouterLink
            v-if="!isLoading"
            :to="`/generation/${nodeStatus.top.keyBlock.height}`"
          >
            {{ nodeStatus.top.keyBlock.height }}
          </RouterLink>
          <FillDummy
            v-else
            color="grey"
          />
        </Field>
        <Field name="KeyBlock Hash">
          <RouterLink
            v-if="!isLoading"
            :to="`/generation/${nodeStatus.top.keyBlock.hash}`"
          >
            {{ nodeStatus.top.keyBlock.hash | startAndEnd }}
          </RouterLink>
          <ViewAndCopy
            v-if="!isLoading"
            color="boring"
            :text="nodeStatus.top.keyBlock.hash"
          />
          <FillDummy
            v-else
            color="grey"
          />
        </Field>
        <Field name="KeyBlock Age">
          <div v-if="!isLoading">
            {{ nodeStatus.top.keyBlock.time | humanDate }}
          </div>
          <FillDummy
            v-else
            color="grey"
          />
        </Field>
        <Field name="Beneficiary">
          <RouterLink
            v-if="!isLoading"
            :to="`/account/${nodeStatus.top.keyBlock.beneficiary}`"
          >
            {{ nodeStatus.top.keyBlock.beneficiary | startAndEnd }}
          </RouterLink>
          <ViewAndCopy
            v-if="!isLoading"
            color="boring"
            :text="nodeStatus.top.keyBlock.beneficiary"
          />
          <FillDummy
            v-else
            color="grey"
          />
        </Field>
        <Field name="Miner">
          <RouterLink
            v-if="!isLoading"
            :to="`/account/${nodeStatus.top.keyBlock.miner}`"
          >
            {{ nodeStatus.top.keyBlock.miner | startAndEnd }}
          </RouterLink>
          <ViewAndCopy
            v-if="!isLoading"
            color="boring"
            :text="nodeStatus.top.keyBlock.miner"
          />
          <FillDummy
            v-else
            color="grey"
          />
        </Field>
        <Field name="Nonce">
          <div v-if="!isLoading">
            {{ nodeStatus.top.keyBlock.nonce }}
          </div>
          <FillDummy
            v-else
            color="grey"
          />
        </Field>
        <Field name="State Hash">
          <div v-if="!isLoading">
            {{ nodeStatus.top.keyBlock.stateHash | startAndEnd }}
          </div>
          <ViewAndCopy
            v-if="!isLoading"
            color="boring"
            :text="nodeStatus.top.keyBlock.stateHash"
          />
          <FillDummy
            v-else
            color="grey"
          />
        </Field>
      </div>
      <h1>Raw Data</h1>
      <h3>version</h3>
      <ObjView
        v-if="!isLoading"
        :obj="nodeStatus.version"
        class="objView"
      />
      <div v-else>
        <div
          v-for="i in 3"
          :key="i"
        >
          <FillDummy color="grey" />
        </div>
      </div>

      <h3>top</h3>
      <ObjView
        v-if="!isLoading"
        :obj="nodeStatus.top"
        class="objView"
      />
      <div v-else>
        <div
          v-for="i in 3"
          :key="i"
        >
          <FillDummy color="grey" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import pollAction from '../../mixins/pollAction'
import FillDummy from '../../components/fillDummy'
import ObjView from '../../components/objView'
import Field from '../../components/field'
import ViewAndCopy from '../../components/viewAndCopy.vue'

export default {
  components: {
    FillDummy,
    ObjView,
    Field,
    ViewAndCopy
  },
  mixins: [pollAction('getNodeStatus')],
  data: function () {
    return {
      newNetworkUrl: '',
      isNetworkChanging: false
    }
  },
  computed: {
    ...mapState({
      nodeStatus: '$nodeStatus',
      node: 'nodeUrl'
    }),
    isLoading () {
      return !(this.nodeStatus.top && this.nodeStatus.version)
    }
  }
}
</script>
<style scoped src='./status.scss' lang='scss' />
