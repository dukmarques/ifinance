<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    password: {
        type: String,
        required: true,
    },
});

const rules = {
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    specialChar: /[!@#$%^&*(),.?":{}|<>]/
};

const validations = computed(() => ({
    uppercase:{
        valid: rules.uppercase.test(props.password),
        message: 'Pelo menos uma letra maiúscula',
    },
    lowercase: {
        valid: rules.lowercase.test(props.password),
        message: 'Pelo menos uma letra minúscula',
    },
    number: {
        valid: rules.number.test(props.password),
        message: 'Pelo menos um número',
    },
    specialChar: {
        valid: rules.specialChar.test(props.password),
        message: 'Mínimo um caractere especial',
    },
    minLength: {
        valid: props.password?.length >= 8,
        message: 'Mínimo de 8 caracteres',
    }
}));
</script>

<template>
    <div>
        <ul class="list-disc pl-5">
            <li 
                v-for="(item, key) in validations" 
                :key="key"
                class="flex items-center gap-4 mb-4"
            >
                <div 
                    class="rounded-full w-6 h-6 flex items-center justify-center"
                    :class="item.valid ? 'bg-primary' : 'bg-white'">
                    <i 
                        class="pi pi-check text-secondary !text-[12px] !font-black" 
                        :class="item.valid ? 'text-primary' : 'text-white'"
                    ></i>
                </div>
                <span :class="item.valid ? 'text-primary' : 'text-white'">{{ item.message }}</span>
            </li>
        </ul>
    </div>
</template>