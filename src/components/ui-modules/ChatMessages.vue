<template>
    <ul class="list-unstyled">
        <b-media tag="li" class="my-4" v-for="(val, inx) in this.messages" :key="inx">
            <b-img slot="aside" blank :blank-color="val['color']" width="64" alt="Placeholder - username"></b-img>

            <h5 class="mt-0 mb-1">{{val['user']}}</h5>
            <p class="mb-0">{{val['msg']}}</p>
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