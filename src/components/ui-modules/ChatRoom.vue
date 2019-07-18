<template>
    <div>
        <b-list-group>
            <b-list-group-item @click="go_to_room('lobby')" :active="this.room === 'lobby'" class="d-flex justify-content-between align-items-center">
                Lobby Chat Room <b-badge variant="dark" pill v-if="this.userList !== null">{{Object.keys(this.userList).length}}</b-badge>
            </b-list-group-item>
        </b-list-group>
        <b-list-group>
            <b-list-group-item @click="go_to_room('members')" :active="this.room === 'members'" class="d-flex justify-content-between align-items-center">
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
            },
            room: {
                require: true
            }
        },
        methods: {
            go_to_room (room) {
                console.log('user change room ', this.room ,'=>', room);
                this.$emit('join_room', room)
            }
        }
    }
</script>

<style scoped>

</style>