<template>
  <main class="px-4">
    <Message v-if="error" color="red" variant="light" class="justify-center">
      <FieldList class="gap-1">
        <Field
          v-for="(value, key) in error"
          :key="key"
          display="inline"
          :name="key"
          >{{ value }}</Field
        >
      </FieldList>
    </Message>
    <Message v-if="loading" color="blue" variant="light" class="justify-center">
      <div class="flex">
        <div class="flex items-center justify-center pr-3">
          <Spinner class="w-6 h-6" />
        </div>
        <span>Logging in...</span>
      </div>
    </Message>
  </main>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Field from '@/components/field/Field.vue';
import FieldList from '@/components/field/FieldList.vue';
import Message from '@/components/message/Message.vue';
import Spinner from '@/elements/icon/Spinner.vue';
import { PkceCodes, useLogin } from '@/composables/use-login';
import { useAuthStore } from '@/store/auth';

export default defineComponent({
  name: 'OAuth',
  components: { Field, FieldList, Message, Spinner },
  setup() {
    const { clientId, authority, redirectURI } = useLogin();
    const { query, hash } = useRoute();
    const { replace } = useRouter();
    const store = useAuthStore();

    const loading = ref(true);
    const error = ref<undefined | unknown>(undefined);

    onMounted(async () => {
      if (hash) {
        const qs = new URLSearchParams(hash.slice(1));
        error.value = qs.entries();
      }
      if (query.code) {
        const codes: PkceCodes = JSON.parse(
          window.localStorage.getItem('pbotapps.auth.codes') || ''
        );

        try {
          const data = new URLSearchParams();
          data.append('grant_type', 'authorization_code');
          data.append('redirect_uri', redirectURI);
          data.append('code', query.code.toString());
          data.append('code_verifier', codes.verifier);
          data.append('client_id', clientId || '');

          const res = await axios.post(`${authority}/oauth2/v2.0/token`, data);

          const { access_token, refresh_token } = res.data;

          store.setTokens(access_token, refresh_token);

          store.initialize();

          const to = window.localStorage.getItem('pbotapps.auth.route');
          if (to) replace(JSON.parse(to));
        } catch (err) {
          console.error(err);
          error.value = err;
        } finally {
          loading.value = false;
          window.localStorage.removeItem('pbotapps.auth.initiated');
          window.localStorage.removeItem('pbotapps.auth.codes');
        }
      }
    });

    return { error, loading };
  },
});
</script>
