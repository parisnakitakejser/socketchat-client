<template>
    <b-list-group>
        <b-list-group-item v-for="r, inx in this.availableRooms" :key="r['_id']['$oid']" @click="go_to_room(r['_id']['$oid'])" :active="selected_room === r['_id']['$oid']">
            {{r['name']}} <b-badge variant="dark" pill>{{r['online']}}</b-badge>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
    export default {
        name: "ChatRoom",
        props: {
            availableRooms: {
                require: true
            },
            room: {
                require: true
            }
        },

        computed: {
          selected_room () {
              return this.room;
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