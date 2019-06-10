<template>
    <div>
        <b-img v-bind="onlinePeopleProps" rounded="circle"></b-img>
        <b-img v-bind="onlinePeopleProps" rounded="circle"></b-img>
        <b-img v-bind="onlinePeopleProps" rounded="circle"></b-img>
        <b-img v-bind="onlinePeopleProps" rounded="circle"></b-img>
        <b-img v-bind="onlinePeopleProps" rounded="circle"></b-img>
        <b-img v-bind="onlinePeopleProps" rounded="circle"></b-img>
        <b-img v-bind="onlinePeopleProps" rounded="circle"></b-img>
        <b-img v-bind="onlinePeopleProps" rounded="circle"></b-img>
        <b-img v-bind="onlinePeopleProps" rounded="circle"></b-img>
        <b-img v-bind="onlinePeopleProps" rounded="circle"></b-img>
        <b-img v-bind="onlinePeopleProps" rounded="circle"></b-img>
    </div>
</template>

<script>
    export default {
        name: "ChatOnlinePeople",
        data () {
            return {
                onlinePeopleProps: {
                    blank: true,
                    blankColor: '#777',
                    width: 50,
                    height: 50,
                    class: 'online-people-icon'
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .online-people-icon {
        margin-right: 5px;
        margin-bottom: 5px;
    }
</style>