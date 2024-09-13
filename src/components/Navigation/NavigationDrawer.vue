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
        <v-list height="200">
            <VListItem
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                subtitle="sandra_a88@gmailcom"
                title="Sandra Adams"
            ></VListItem>

            <v-list-item>
                <div class="d-flex justify-start align-center">
                    <v-btn
                        :icon="navigation.getRail
                            ? 'keyboard_double_arrow_right'
                            : 'keyboard_double_arrow_left'"
                        variant="text"
                        @click.stop="navigation.toggleRail"
                        title="Alternar menu"
                    >
                    </v-btn>
                    <p v-if="!navigation.getRail" class="text-subtitle-1">Recolher menu</p>
                </div>
            </v-list-item>
        </v-list>

        <VDivider />

        <v-list
            nav
            density="compact"
            class="pt-3"
        >
            <v-list-item
                v-for="(item) in menuItems"
                :key="`menu-${item.name}`"
                link
                :to="item.to"
                :active="isMenuActive(item.name)"
                active-color="primary"
                class="mt-2"
            >
                <div
                    class="d-flex align-center"
                    :class="navigation.rail ? 'justify-center': 'justify-start ga-5 pl-5'"
                >
                    <v-icon
                        size="x-large"
                        :icon="item.icon"
                    ></v-icon>
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
                <VDivider/>

                <v-list-item
                    @click="logout"
                    class="mt-2"
                >
                    <div
                        class="d-flex justify-center align-center ga-5"
                        :class="{ 'justify-center': navigation.getRail }"
                    >
                        <v-icon
                            size="large"
                            icon="logout"
                        ></v-icon>
                        <v-list-item-title v-if="!navigation.getRail" class="text-white">
                            Sair
                        </v-list-item-title>
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

const drawer = ref(true);
const navigation = useNavigationStore();
const rail = ref(false);
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const toast = useToast();

const menuItems = [
    {
        title: 'Dashboard',
        icon: 'space_dashboard',
        to: '/dashboard',
        name: 'dashboard',
    },
    {
        title: 'Cartões',
        icon: 'credit_card',
        to: '/cards',
        name: 'cards',
    },
    {
        title: 'Categorias',
        icon: 'list_alt',
        to: '/categories',
        name: 'categories',
    },
];

const showDrawer = computed(() => {
    const excludedRoutesName = [
        'home', 'login', 'register', 'not-found',
    ];
    return !excludedRoutesName.includes(route.name as string);
});

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

<style></style>
