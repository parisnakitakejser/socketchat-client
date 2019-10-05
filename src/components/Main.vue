<template>
    <div>
        <h1>Main pages</h1>
        Welcom to the main pages<br />
        <br />
        <router-link :to="{name: 'chat'}">Link to chat</router-link>
    </div>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style scoped>

</style>