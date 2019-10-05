<template>
    <div>
        <h1>Pages not found</h1>
        Sorry what you try to se its not founding!<br />
        <br />
        <router-link :to="{name: 'main'}">Go back to main</router-link>
    </div>
</template>

<script>
    export default {
        name: "Error404"
    }
</script>

<style scoped>

</style>