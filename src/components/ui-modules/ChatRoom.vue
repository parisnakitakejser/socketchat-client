<template>
    <div>
        <b-list-group>
            <b-list-group-item active class="d-flex justify-content-between align-items-center">
                Lobby Chat Room <b-badge variant="dark" pill v-if="this.userList !== null">{{Object.keys(this.userList).length}}</b-badge>
            </b-list-group-item>
        </b-list-group>
        <b-list-group>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
                Members Chat Room <b-badge variant="dark" pill>0</b-badge>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
    export default {
        name: "ChatRoom",
        props: {
            userList: {
                require: true
            }
        }
    }
</script>

<style scoped>

</style>