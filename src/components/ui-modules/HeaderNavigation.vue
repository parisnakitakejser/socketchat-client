<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#" tag="h1">SocketChat</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-navbar-nav right>
                <b-nav-item v-if="this.userData !== null"><em>{{this.userData['username']}}</em></b-nav-item>
                </b-navbar-nav>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: "HeaderNavigation",
        props: {
            'userData': {
                require: true
            }
        }
    }
</script>

<style scoped>

</style>