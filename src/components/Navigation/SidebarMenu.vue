<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useToast } from '@/composables/useToast';
import { useNavigationStore } from '@/stores/navigation';

import Divider from 'primevue/divider';
import Button from 'primevue/button';

import IconOverview from '@/components/icons/IconOverview.vue';
import IconCard from '@/components/icons/IconCard.vue';
import IconCategory from '@/components/icons/IconCategory.vue';
import IconPerson from '@/components/icons/IconPerson.vue';
import IconSettings from '@/components/icons/IconSettings.vue';

const drawer = ref(true);
const navigation = useNavigationStore();
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { showError } = useToast();

const menuItems = [
    {
        title: 'Dashboard',
        icon: IconOverview,
        to: '/dashboard',
        name: 'dashboard',
    },
    {
        title: 'Cartões',
        icon: IconCard,
        to: '/cards',
        name: 'cards',
    },
    {
        title: 'Categorias',
        icon: IconCategory,
        to: '/categories',
        name: 'categories',
    },
    {
        title: 'Configurações',
        icon: IconSettings,
        to: '/settings',
        name: 'settings',
    },
];

const showDrawer = computed(() => {
    const excludedRoutesName = [
        'home', 'login', 'register', 'not-found',
    ];
    return !excludedRoutesName.includes(route.name as string);
});

const getUserFirstName = computed(() => userStore.user?.name?.split(' ')[0]);

const isMenuActive = (name: string) => route.name === name;

async function logout() {
    try {
        await userStore.logout();
        router.push('/login');
    } catch (error) {
        showError({
            message: 'Ocorreu um erro', 
            description: 'Não foi possível deslogar da conta.'
        });
    }
}
</script>

<template>
    <div v-if="showDrawer" class="mx-2 static shrink-0 z-10">
        <div
            v-show="drawer"
            class="bg-secondary m-2 ps-2 pe-2 border border-surface-200 rounded-xl transition-all duration-300 h-[95vh] overflow-hidden flex flex-col"
            :class="[navigation.rail ? 'w-[80px]' : 'w-[225px]']"
        >
            <div class="flex flex-col items-center justify-center" :class="navigation.rail ? '' : 'mb-7'">
                <div 
                    class="flex items-center justify-center mt-8 mb-3 border-2 border-primary-500 rounded-md"
                    :class="navigation.rail ? 'w-12 h-12' : 'w-20 h-20'"
                >
                    <IconPerson :width="!navigation.getRail ? 48 : 28" />
                </div>

                <div v-if="!navigation.getRail" class="flex flex-col items-center">
                    <div class="text-2xl">
                        Hello, {{ getUserFirstName }}
                    </div>
                    <div class="text-xs">
                        Bem-vindo(a) ao <span class="text-primary">Prosperify</span>.
                    </div>
                </div>
            </div>

            <Divider class="mb-1" />

            <div class="flex-grow">
                <div
                    v-for="(item) in menuItems"
                    :key="`menu-${item.name}`"
                    class="mt-2 !p-[6px] rounded hover:brightness-[1.3]"
                    :class="[isMenuActive(item.name) ? 'menu-item--active' : 'bg-secondary']"
                >
                    <router-link
                        :to="item.to"
                        class="flex items-center p-4 rounded-md transition-colors cursor-pointer"
                        :class="[navigation.rail ? 'justify-center' : 'justify-start pl-5 gap-3']"
                    >
                        <component :is="item.icon" />
                        <span v-if="!navigation.getRail" class="text-sm font-light">{{ item.title }}</span>
                    </router-link>
                </div>
            </div>

            <!-- Footer actions -->
            <div class="p-2">
                <Divider class="mb-2" />
        
                <div 
                    class="w-full !p-[10px] flex justify-center items-center gap-2 rounded-md bg-secondary hover:brightness-[1.3] cursor-pointer" 
                    :class="navigation.rail ? 'justify-center w-full' : 'justify-start'"
                    @click="logout"
                >
                    <i class="pi pi-sign-out"></i>
                    <span v-if="!navigation.getRail" class="text-sm font-light">Sair</span>
                </div>

                <Divider class="mt-2"/>

                <div class="flex justify-center mb-2">
                    <Button
                        :icon="!navigation.getRail ? 'pi pi-angle-double-left' : 'pi pi-angle-double-right'"
                        :label="!navigation.getRail ? 'Recolher menu' : ''"
                        text
                        @click="navigation.toggleRail"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.menu-item--active {
    background-color: rgba(53, 151, 102, 0.2);
}
</style>