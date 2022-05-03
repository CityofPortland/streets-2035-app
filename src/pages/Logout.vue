<template>
  <main class="max-w-7xl mt-8 px-4 mx-auto">
    <section class="grid grid-cols-1 gap-4">
      <p>You have been logged out.</p>
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
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import SignIn from '@/components/login/SignIn.vue';

export default defineComponent({
  name: 'Logout',
  setup() {
    const authStore = useAuthStore();
    authStore.clear();
    const { replace } = useRouter();
    replace({ name: 'Home' });

    return {
      user: computed(() => authStore.user),
    };
  },
  components: { SignIn },
});
</script>
