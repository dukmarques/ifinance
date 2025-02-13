<template>
    <v-list 
        density="compact" 
        bg-color="transparent"
        slim
    >
        <v-list-item
            v-for="(item, index) in validations"
            :key="`valid-${index}`"
            height="40"
        >
            <template v-slot:prepend>
                <v-icon 
                    icon="fa solid fa-circle-check"
                    :color="item.valid ? 'primary' : 'white'"
                ></v-icon>
            </template>
            <v-list-item-title>
                {{ item.message }}
            </v-list-item-title>
        </v-list-item>
    </v-list>
</template>

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
        valid: props.password.length >= 8,
        message: 'Mínimo de 8 caracteres',
    }
}));
</script>

<style scoped>

ul {
  list-style: none;
  padding: 0;
}
li {
  color: red;
}
.valid {
  color: green;
  font-weight: bold;
}
</style>