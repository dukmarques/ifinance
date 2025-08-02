<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useToast } from '@/composables/useToast';
import { useNavigationStore } from '@/stores/navigation';

import Divider from 'primevue/divider';
import IconOverview from '@/components/icons/IconOverview.vue';
import IconCard from '@/components/icons/IconCard.vue';
import IconCategory from '@/components/icons/IconCategory.vue';
import IconPerson from '@/components/icons/IconPerson.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import ToggleDarkMode from '../Common/ToggleDarkMode.vue';

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
const isMenuActiveColor = (name: string) => {
    if (isMenuActive(name) && !navigation.isDarkMode) {
        return 'white';
    }

    return navigation.isDarkMode ? 'white' : 'black';
};

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
    <div v-if="showDrawer" class="h-screen !flex items-center mx-2 static shrink-0 z-10">
        <div
            v-show="drawer"
            class="m-2 ps-2 pe-2 border rounded-xl transition-all duration-300 h-[95vh] overflow-hidden flex flex-col"
            :class="[
                navigation.rail ? 'w-[80px]' : 'w-[225px]',
                !navigation.isDarkMode ? '!border-surface-500' : ''
            ]"
        >
            <div 
                :class="[
                    'flex flex-col items-center justify-center',
                    navigation.rail ? '' : 'mb-7'
                ]"
            >
                <div 
                    class="flex items-center justify-center mt-8 mb-3 border-2 border-primary-500 rounded-md"
                    :class="navigation.rail ? 'w-12 h-12' : 'w-20 h-20'"
                >
                    <IconPerson :width="!navigation.getRail ? 48 : 28" :color="navigation.isDarkMode ? 'white' : 'black'" />
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
                    :class="[
                        'mt-2 !p-[6px] rounded',
                        isMenuActive(item.name) ? 'bg-surface-700' : '',
                        !isMenuActive(item.name) && !navigation.isDarkMode 
                            ? 'hover:bg-surface-100' 
                            : 'hover:bg-surface-900 hover:brightness-[1.3]'
                    ]"
                >
                    <router-link
                        :to="item.to"
                        :class="[
                            'flex items-center p-4 rounded-md transition-colors cursor-pointer',
                            navigation.rail ? 'justify-center' : 'justify-start pl-5 gap-3'
                        ]"
                    >
                        <component 
                            :is="item.icon" 
                            :color="isMenuActiveColor(item.name)" 
                        />
                        <span 
                            v-if="!navigation.getRail" 
                            :class="[
                                'text-sm font-light',
                                isMenuActive(item.name) && !navigation.isDarkMode ? 'text-white' : ''
                            ]"
                        >
                            {{ item.title }}
                        </span>
                    </router-link>
                </div>
            </div>

            <div class="p-2">
                <div class="flex justify-center my-3">
                    <ToggleDarkMode />
                </div>

                <Divider class="my-2" />
        
                <div  
                    :class="[
                        'w-full !p-[10px] flex justify-center items-center rounded-md cursor-pointer',
                        navigation.rail ? 'justify-center w-full' : 'justify-start',
                        !navigation.isDarkMode ? 'hover:bg-surface-100' : 'hover:bg-surface-900 hover:brightness-[1.3]',
                    ]"
                    @click="logout"
                >
                    <i class="pi pi-sign-out"></i>
                    <span v-if="!navigation.getRail" class="text-sm font-light">Sair</span>
                </div>

                <Divider class="mt-2"/>

                <div class="flex justify-center mb-4">
                    <i 
                        v-tooltip.bottom="{
                            value: navigation.getRail ? 'Expandir menu' : 'Recolher menu',
                            showDelay: '1000'
                        }"
                        class="pi pi-angle-double-left cursor-pointer text-primary hover:brightness-[1.3] transition-all duration-300" 
                        :class="!navigation.getRail ? 'rotate-0' : 'rotate-180'"
                        @click="navigation.toggleRail"
                    ></i>
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