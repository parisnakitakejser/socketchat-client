<template>
  <div id="app">
    <HeaderNavigation :userData="user" />

    <b-container fluid>
      <b-row>
        <b-col md="3" xl="2">
          <h2>Chat rooms</h2>
          <ChatRoom :userList="online_users" @join_room="socket_join_room" :room="room" />
        </b-col>
        <b-col class="chat-content">
          <div class="chat-messages">
            <h2>Room:</h2>

            <ChatMessages :messages="messages" />
          </div>
          <div class="chat-input">

            <div class="chat-input__box">
              <b-input-group>
                <b-input-group-text slot="prepend" v-if="user">{{user['username']}}</b-input-group-text>
                <b-input-group-text slot="prepend" v-else>n/a</b-input-group-text>
                <b-form-input v-model="message"></b-form-input>
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

import HeaderNavigation from './components/ui-modules/HeaderNavigation.vue'
import ChatRoom from './components/ui-modules/ChatRoom.vue'
import ChatMessages from './components/ui-modules/ChatMessages.vue'
import ChatOnlinePeople from './components/ui-modules/ChatOnlinePeople.vue'

export default {
  name: 'app',
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
      if(this.room === room) {
        console.log('You can\'t join the same room you are in');
      } else {
        console.log('You go to join the new room', room);
        this.socket.emit('join', {
          room: room
        });

        this.room = room;
      }
    }
  },

  data () {
    return {
      user: null,
      room: null,
      message: '',
      messages: null,
      online_users: null,
      socket: io('ws://localhost:2345', {
        transports: ['websocket']
      })
    }
  },

  mounted() {
    this.socket.on('MESSAGE', (socket) => {
      this.messages = JSON.parse(socket);
      console.log(JSON.parse(socket))
    })

    this.socket.on('USER_DATA', (socket) => {
      this.user = socket;
      console.log(this.user)
    })

    this.socket.on('USER_ONLINE_PUBLIC_DATA', (socket) => {
      const user_public_data = JSON.parse(socket);
      this.online_users = user_public_data;
      console.log('online users', user_public_data)
    })
  }
}
</script>

<style scoped lang="scss">


  $header-nav-height: 58px;
  $chat-input-height: 60px;

  $chat-view-sticky-height: $chat-input-height + $header-nav-height;

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
      height: $chat-input-height;

      .chat-input__box {
        margin-top: 15px;
      }
    }
  }
</style>
