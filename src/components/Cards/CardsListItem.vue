<script lang="ts" setup>
import type { Card as CreditCard } from '@/@types/Card';
import { computed, onMounted, ref, type PropType } from 'vue';
import CreditCardBg from '@/assets/credit-card-bg.png';
import BaseImage from '../Common/BaseImage.vue';
import { icons } from '@/utils/creditIcons';
import { formatCurrency } from '@/helpers/currencyFormat';
import ProgressBar from 'primevue/progressbar';
import { CountUp } from 'countup.js';
import Menu from 'primevue/menu';
import type { MenuItem } from 'primevue/menuitem';
import { useConfirm } from 'primevue/useconfirm';
import { getContrastColor } from '@/utils/colorUtils';
import { useCardsStore } from '@/stores/cards';
import { useToast } from '@/composables/useToast';

const props = defineProps({
    card: {
        type: Object as PropType<CreditCard>,
        required: true,
    },
});

const { updateCard, deleteCard } = useCardsStore();
const { showSuccess, showError } = useToast();

const cardFlagSrc = computed(() => {
    const cardIcon = props.card.card_flag as keyof typeof icons ?? 'defaultCard';
    return icons[cardIcon];
});

const textColor = computed(() => {
    return getContrastColor(props.card.background_color || '#FFFFFF');
});

const confirmDialog = useConfirm();
const menu = ref();
const menuOptions = ref<MenuItem[]>([
    {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => {
            // toggleUpdateDialog();
        },
    }, {
        label: 'Excluir',
        icon: 'pi pi-trash',
        command: () => {
            confirmDialog.require({
                message: 'Você tem certeza que deseja excluir este cartão?',
                header: `Excluir cartão: ${props.card.name}`,
                acceptLabel: 'Excluir',
                rejectLabel: 'Cancelar',
                acceptClass: 'p-button-danger',
                acceptProps: {
                    icon: 'pi pi-trash',
                },
                accept: () => deleteCard(props.card.id)
                    .then(() => {
                        showSuccess({ message: 'Sucesso!', description: 'Cartão excluído com sucesso' });
                    }).catch((err: any) => {
                        showError({ message: 'Erro ao excluir cartão', description: err.response?.data?.message });
                    }),
            });
        }
    }
]);

const toggleCardOptions = (event: Event) => {
    menu.value.toggle(event);
};


const countUp = ref<CountUp | null>(null);
onMounted(() => {
    const elementId = `available-${props.card.id}`;

    countUp.value = new CountUp(
        elementId,
        20897,
        {
            decimalPlaces: 2,
            duration: 2,
            useEasing: true,
            separator: '.',
            decimal: ',',
            prefix: 'R$',
        },
    );

    countUp.value?.start();
})
</script>

<template>
    <ConfirmPopup group="card-options" />
    <div 
        class="w-full h-[230px] flex flex-col justify-center rounded-2xl bg-cover bg-position-[-8px] !p-5 relative" 
        :style="`
            background-color: ${props.card.background_color!}; 
            background-image: url(${CreditCardBg});
            color: ${textColor};
        `"
    >
        <div class="flex justify-between items-center">
            <p class="text-2xl font-bold">{{ props.card.name }}</p>
            <BaseImage 
                :src="cardFlagSrc"
                width="40"
                height="40"
                class="mr-2"
            />
        </div>

        <div class="flex flex-col gap-0 mt-2">
            <p class="text-lg">Limite disponível</p>
            <p :id="`available-${props.card.id}`" class="text-lg font-bold">0</p>
            <div class="flex justify-between mt-2">
                <p>R$0</p>
                <p>{{ formatCurrency(props.card.limit) }}</p>
            </div>
            <ProgressBar 
                class="!h-1 mt-1" 
                :showValue="false" 
                :value="70" 
                :pt="{
                    root: { class: textColor === '#000000' ? '!bg-black/20 rounded-full' : '!bg-white/40 rounded-full' },
                    value: { class: textColor === '#000000' ? '!bg-black/60 rounded-full' : '!bg-white rounded-full' },
                }"
            />
        </div>

        <div class="mt-7 flex justify-between">
            <p class="font-bold">Fecha dia: {{ props.card.closing_day }}</p>
            <p class="font-bold">Vence dia: {{ props.card.due_day }}</p>
        </div>

        <div 
            class="absolute top-2 right-2 cursor-pointer"
            @click="toggleCardOptions"
        >
            <i class="pi pi-ellipsis-v" :style="{ color: textColor }"></i>
            <Menu 
                ref="menu" 
                id="overlay_menu" 
                class="w-[20px]" 
                :model="menuOptions" 
                :popup="true"
            />
        </div>
    </div>
</template>