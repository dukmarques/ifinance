<template>
    <VNavigationDrawer
        v-if="showDrawer"
        v-model="drawer"
        :rail="navigation.rail"
        rail-width="80"
        permanent
        border="sm"
        rounded="xl"
        width="224"
        class="ma-2 mt-5"
        style="height: 95vh"
    >
        <v-list
            nav
            :height="navigation.getRail ? '100' : '200'"
        >
            <v-list-item>
                <div class="d-flex flex-column justify-center align-center">
                    <div
                        class="box-avatar d-flex justify-center align-center mt-5 mb-3"
                        :class="{ 'rail': navigation.getRail }"
                    >
                        <IconPerson :width="!navigation.getRail ? 48 : 28" />
                    </div>

                    <v-list-item-title v-if="!navigation.getRail">
                        <div class="text-h5">
                            Hello, {{ getUserFirstName }}
                        </div>
                    </v-list-item-title>
                    <v-list-item-subtitle v-if="!navigation.getRail">
                        Bem-vindo(a) ao <span class="text-primary">Prosperify</span>.
                    </v-list-item-subtitle>
                </div>
            </v-list-item>
        </v-list>

        <v-list
            nav
            density="compact"
            class="pt-3"
        >
            <VDivider />
            <v-list-item
                v-for="(item) in menuItems"
                :key="`menu-${item.name}`"
                link
                :to="item.to"
                :active="isMenuActive(item.name)"
                color="primary"
                class="mt-2"
            >
                <div
                    class="d-flex align-center"
                    :class="navigation.rail ? 'justify-center': 'justify-start ga-5 pl-5'"
                >
                    <component :is="item.icon" />

                    <v-list-item-title
                        v-if="!navigation.getRail"
                        class="text-white"
                    >
                        {{ item.title }}
                    </v-list-item-title>
                </div>
            </v-list-item>
        </v-list>

        <template v-slot:append>
            <v-list
                nav
                density="compact"
            >
                <v-list-item
                    @click="logout"
                    class="mt-2"
                >
                    <div
                        class="d-flex justify-center align-center ga-2"
                        :class="{ 'justify-center': navigation.getRail }"
                    >
                        <v-icon icon="fa-solid fa-arrow-right-from-bracket"></v-icon>

                        <v-list-item-title v-if="!navigation.getRail" class="text-white">
                            <p class="text-subtitle-2">Sair</p>
                        </v-list-item-title>
                    </div>
                </v-list-item>

                <VDivider/>

                <v-list-item>
                    <div class="d-flex justify-center align-center">
                        <v-btn
                            variant="text"
                            @click.stop="navigation.toggleRail"
                            title="Alternar menu"
                        >
                            <v-icon 
                                :icon="!navigation.getRail ? 'fa-solid fa-angles-left' : 'fa-solid fa-angles-right'"
                            ></v-icon>
                            <p
                                v-if="!navigation.getRail"
                                class="text-subtitle-2 ml-2"
                            >
                                Recolher menu
                            </p>
                        </v-btn>
                    </div>
                </v-list-item>
            </v-list>
        </template>
    </VNavigationDrawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useToast } from '@/stores/toast';
import { useNavigationStore } from '@/stores/navigation';

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
const toast = useToast();

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
        toast.show('Erro ao sair', 'error');
    }
}
</script>

<style lang="scss" scoped>
.box-avatar {
    width: 80px;
    height: 80px;
    border: 2px solid #359766;
    border-radius: 6px;

    &.rail {
        width: 48px;
        height: 48px;
    }
}
</style>
