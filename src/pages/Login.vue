<template>
  <main class="max-w-7xl mt-8 px-4 mx-auto" v-if="!user">
    <section class="grid grid-cols-1 gap-4">
      <p>
        You must sign in before you can view this site. City Employees should
        login with their Office 365 credentials. Guests/contractors can login
        with their approved Office 365 account.
      </p>
      <SignIn
        size="large"
        color="blue"
        variant="neutral"
        class="flex-initial w-64"
      />
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAuthStore } from '@/store/auth';
import SignIn from '@/components/login/SignIn.vue';

export default defineComponent({
  name: 'Login',
  setup() {
    const authStore = useAuthStore();

    return {
      user: computed(() => authStore.user),
    };
  },
  components: { SignIn },
});
</script>
