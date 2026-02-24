<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation';
import { computed } from 'vue';

const props = defineProps({
    password: {
        type: String,
        required: true,
        default: ''
    },
});

const navigation = useNavigationStore();

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

const itemIsValid = computed(() => {
    return (item: { valid: boolean }) => {
        if (item.valid) {
            return 'bg-primary';
        }
    
        return navigation.isDarkMode ? 'bg-white' : 'bg-gray-200';
    }
});
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
                    :class="[
                        'rounded-full w-6 h-6 flex items-center justify-center',
                        itemIsValid(item)
                    ]
                    ">
                    <i  
                        :class="[
                            'pi pi-check text-secondary !text-[12px] !font-black',
                            item.valid ? 'text-primary' : 'text-secondary'
                        ]"
                    ></i>
                </div>
                <span :class="item.valid ? 'text-primary' : ''">{{ item.message }}</span>
            </li>
        </ul>
    </div>
</template>