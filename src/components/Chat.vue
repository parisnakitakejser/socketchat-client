<template>
  <div id="app">
    <HeaderNavigation :userData="user" />

    <b-container fluid>
      <b-row>
        <b-col md="3" xl="2">
          <h2>Chat rooms</h2>
          <ChatRoom v-if="available_rooms" :availableRooms="available_rooms" @join_room="socket_join_room" :room="user.room" />
        </b-col>
        <b-col class="chat-content">
          <div class="chat-messages">
            <h2>Room:</h2>

            <div class="chat-content-messages">
              <ChatMessages :messages="messages" />
            </div>
          </div>
          <div class="chat-input">

            <div class="chat-input__box">
              <b-input-group>
                <b-input-group-text slot="prepend" v-if="user">{{user['user_name']}}</b-input-group-text>
                <b-input-group-text slot="prepend" v-else>n/a</b-input-group-text>
                <b-form-input v-model="message" v-on:keyup.enter="sendMessage"></b-form-input>
                <b-input-group-append>
                  <b-button variant="success" @click="sendMessage">Send message</b-button>
                </b-input-group-append>
              </b-input-group>
            </div>

          </div>
        </b-col>
        <b-col md="3" xl="2">
          <h2>Online people</h2>
          <ChatOnlinePeople :userList="online_users" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
const io = require('socket.io-client');
const users = require('@/assets/javascript/users');

import HeaderNavigation from '@/components/ui-modules/HeaderNavigation.vue'
import ChatRoom from '@/components/ui-modules/ChatRoom.vue'
import ChatMessages from '@/components/ui-modules/ChatMessages.vue'
import ChatOnlinePeople from '@/components/ui-modules/ChatOnlinePeople.vue'

export default {
  name: 'Chat',
  components: {
    HeaderNavigation,
    ChatRoom,
    ChatMessages,
    ChatOnlinePeople
  },
  methods: {
    sendMessage (e) {
      e.preventDefault();

      this.socket.emit('SEND_MESSAGE', {
        color: '#abc',
        user: 'User 4',
        msg: this.message
      });

      this.message = '';

      console.log('message send to websocket server');
    },

    socket_join_room (room) {
      console.log('try to join room:', room);
      if(this.user.room === room) {
        console.log('You can\'t join the same room you are in');
      } else {
        console.log('You go to join the new room', room);
        this.socket.emit('join', {
          room: room
        });

        this.user.room = room;
      }
    },

    ping_service () {
      if (this.user !== null) {
        clearTimeout(this.ping_timeout);
        console.log('ping_timeout', this.ping_timeout);

        this.ping_timeout = setTimeout(() => {
          users.ping(this.user);
          this.ping_service();
        }, 1000)
      }
    }
  },

  data () {
    return {
      user: null,
      available_rooms: null,
      message: '',
      messages: null,
      online_users: null,
      ping_timeout: null,
      socket: io('localhost:2345')
    }
  },

  watch: {
    user: {
      handler (val) {
        this.ping_service()
      },
      deep: true
    }
  },

  mounted() {
    this.socket.on('MESSAGE', (socket) => {
      this.messages = JSON.parse(socket);
      console.log(JSON.parse(socket))
    })

    this.socket.on('USER_DATA', (socket) => {
      this.user = JSON.parse(socket);
      console.log('user data =>', JSON.parse(socket))
    })

    this.socket.on('USER_ONLINE_PUBLIC_DATA', (socket) => {
      const user_public_data = JSON.parse(socket);
      this.online_users = user_public_data;
      console.log('online users', user_public_data)
    })

    this.socket.on('GET_ROOMS', (socket) => {
      const available_rooms_data = JSON.parse(socket);
      this.available_rooms = available_rooms_data;
      console.log('available rooms', available_rooms_data)
    })
  }
}
</script>

<style scoped lang="scss">


  $header-nav-height: 58px;
  $chat-input-height: 60px;

  $chat-view-sticky-height: $chat-input-height + $header-nav-height;
  .chat-content-messages {
    height: calc(100% - 55px);
    overflow: auto;
  }

  .chat-content {
    border-left: 1px solid rgba(0, 0, 0, .05);
    border-right: 1px solid rgba(0, 0, 0, .05);

    .chat-messages {
      position: sticky;
      top: $header-nav-height;
      z-index: 1000;
      height: calc(100vh - #{$chat-view-sticky-height});
      border-bottom: 1px solid rgba(0, 0, 0, .05);
    }

    .chat-input {
      .chat-input__box {
        margin-top: 15px;
      }
    }
  }
</style>
