<template>
    <main class="bg-green-600 w-screen h-screen">
        <div class="container w-full h-full flex justify-center items-center">
            <div class="flex-1">
                <h1>iFinance</h1>
                <RouterLink to="/">
                    Home
                </RouterLink>
                <RouterLink to="/about">
                    About
                </RouterLink>
            </div>

            <div class="flex-1 flex justify-center items-center">
                <img
                    src="../assets/images/home-img.png"
                    alt=""
                >
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
</script>
