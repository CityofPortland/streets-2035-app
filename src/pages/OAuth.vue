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
          <svg
            class="animate-spin h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
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
import qs from 'querystring';

import Field from '@/components/field/Field.vue';
import FieldList from '@/components/field/FieldList.vue';
import Message from '@/components/message/Message.vue';
import { PkceCodes, useLogin } from '@/composables/use-login';
import { useAuthStore } from '@/store/auth';

export default defineComponent({
  name: 'OAuth',
  components: { Field, FieldList, Message },
  setup() {
    const { clientId, authority } = useLogin();
    const { query, hash } = useRoute();
    const { replace, resolve } = useRouter();
    const store = useAuthStore();

    const loading = ref(true);
    const error = ref<undefined | qs.ParsedUrlQuery | unknown>(undefined);

    onMounted(async () => {
      if (hash) {
        error.value = qs.parse(hash.slice(1));
      }
      if (query.code) {
        let codes: PkceCodes = JSON.parse(
          window.localStorage.getItem('pbotapps.auth.codes') || ''
        );

        try {
          let res = await axios.post(
            `${authority}/oauth2/v2.0/token`,
            qs.stringify({
              grant_type: 'authorization_code',
              redirect_uri: new URL(
                resolve({
                  name: 'OAuthCallback',
                }).path.slice(1),
                window.location.origin
              ).toString(),
              code: query.code.toString(),
              code_verifier: codes.verifier,
              client_id: clientId,
            })
          );

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
