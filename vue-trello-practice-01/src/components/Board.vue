<template>
  <div>
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <input class="form-control" v-if="isEditTitle" type="text" v-model="inputTitle" ref="inputTitle"
            @keyup.enter="onSubmitTitle" @blur="onSubmitTitle">
          <span v-else class="board-title" @click="onClickTitle">{{board.title}}</span>
          <a class="board-header-btn show-menu" href="" @click.prevent="onShowSettings">... Show Menu</a>
        </div>
        <div class="list-section-wrapper">
          <div class="list-section">
            <div class="list-wrapper" v-for="list in board.lists" :key="list.pos" :data-list-id="list.id">
              <List :data="list" />
            </div>
            <div class="list-wrapper">
              <AddList />
            </div>
          </div>
        </div>
      </div>
    </div>
    <BoardSettings v-if="isShowBoardSettings" />
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import List from './List.vue'
  import AddList from './AddList.vue'
  import BoardSettings from './BoardSettings.vue'

  export default {
    components: {
      List,
      AddList,
      BoardSettings
    },
    created(){      
      this.FETCH_BOARD(this.$route.params.bid).then(()=>{
        this.inputTitle = this.board.title
      })      
    },
    data() {
      return {
        inputTitle: '',
        isEditTitle: false,        
      }
    },
    computed: {
      ...mapState({
        board: state => state.board,
        isShowBoardSettings: state => state.isShowBoardSettings,
      })
    },
    methods: {
      ...mapActions([
        'FETCH_BOARD'
      ]),
      ...mapMutations([
        'SET_IS_SHOW_BOARD_SETTINGS'
      ]),
      onSubmitTitle() {        
        console.log('update board (edit title)')
        this.isEditTitle = false
      },
      onClickTitle() {
        this.isEditTitle = true
      },
      onShowSettings() {        
        this.SET_IS_SHOW_BOARD_SETTINGS(true);
      }
    }
  }
</script>

<style>
  .board-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .board {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .board-header {
    flex: none;
    padding: 8px 4px 8px 8px;
    margin: 0;
    height: 32px;
    line-height: 32px;
  }

  .board-header input[type=text] {
    width: 200px;
  }

  .board-header-btn {
    border-radius: 4px;
    padding: 2px 10px;
    height: 30px;
    margin-bottom: 15px;
    display: inline-block;
    color: #fff;
  }

  .board-header-btn:hover,
  .board-header-btn:focus {
    background-color: rgba(0, 0, 0, .15);
    cursor: pointer;
  }

  .board-title {
    font-weight: 700;
    font-size: 18px;
  }

  .show-menu {
    font-size: 14px;
    position: absolute;
    right: 15px;
  }

  .list-section-wrapper {
    flex-grow: 1;
    position: relative;
  }

  .list-section {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 0 10px;
  }

  .list-wrapper {
    display: inline-block;
    height: 100%;
    width: 272px;
    vertical-align: top;
    margin-right: 5px;
  }

  .card-item.gu-transit {
    background-color: #555 !important;
  }

  .card-item.gu-mirror {
    opacity: 1 !important;
    background-color: #fff !important;
    transform: rotate(3deg) !important;
  }
</style>