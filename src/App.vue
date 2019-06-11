<template>
  <div id="app">
    <HeaderNavigation />

    <b-container fluid>
      <b-row>
        <b-col md="3" xl="2">
          <h2>Chat rooms</h2>
          <ChatRoom />
        </b-col>
        <b-col class="chat-content">
          <div class="chat-messages">
            <h2>Room:</h2>

            <ChatMessages :messages="messages" />
          </div>
          <div class="chat-input">

            <div class="chat-input__box">
              <b-input-group>
                <b-input-group-text slot="prepend">Guest</b-input-group-text>
                <b-form-input></b-form-input>
                <b-input-group-append>
                  <b-button variant="success">Send message</b-button>
                </b-input-group-append>
              </b-input-group>
            </div>

          </div>
        </b-col>
        <b-col md="3" xl="2">
          <h2>Online people</h2>
          <ChatOnlinePeople />
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

  data () {
    return {
      messages: [],
      socket: io('ws://localhost:2345', {
        transports: ['websocket']
      })
    }
  },

  mounted() {
    this.socket.on('MESSAGE', (socket) => {
      this.messages = socket;
      console.log(this.messages)
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
