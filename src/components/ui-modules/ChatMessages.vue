<template>
    <ul class="list-unstyled">
        <b-media tag="li" class="my-4" v-for="(val, inx) in this.messages" :key="inx">
            <div v-if="val['type'] === 'system'" :style="'background: '+ val['color'] +'; padding: 5px;'">
                System: {{val['msg']}}
            </div>
            <template v-else-if="val['type'] === 'normal'">
                <b-img slot="aside" blank :blank-color="val['color']" width="64" alt="Placeholder - username"></b-img>

                <h5 class="mt-0 mb-1">{{val['user']}}</h5>
                <p class="mb-0">{{val['msg']}}</p>
            </template>
            <div v-else>
                Wrong type for this messages
            </div>
        </b-media>
    </ul>
</template>

<script>
    export default {
        name: "ChatMessages",
        props: {
            messages: {
                require: true
            }
        }
    }
</script>

<style scoped>

</style>