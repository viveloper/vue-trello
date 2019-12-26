<template>
  <Modal>
    <div slot="header">
      <h2>
        Create new board
        <a href="" class="modal-default-button" @click.prevent="SET_IS_ADD_BOARD(false)">&times;</a>
      </h2>
    </div>
    <div slot="body">
      <form id="add-board-form" @submit.prevent="addBoard">
        <input class="form-control" type="text" v-model="input" ref="input">
      </form>
    </div>
    <div slot="footer">
      <button class="btn" :class="{'btn-success': valid}" type="submit" form="add-board-form" :disabled="!valid">
        Create Board</button>
    </div>
  </Modal>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex'
  import Modal from './Modal.vue'

  export default {
    components: {
      Modal
    },
    data() {
      return {
        input: ''
      }
    },
    computed: {     
      valid() {
        return !!this.input.length
      }
    },
    mounted() {
      this.$refs.input.focus()
    },
    methods: {
      ...mapMutations([
        'SET_IS_ADD_BOARD'
      ]),
      ...mapActions([
        'ADD_BOARD'
      ]),
      addBoard() {
        this.ADD_BOARD(this.input)
          .then(board => {         
            console.log(board)
            this.$router.push(`/b/${board.id}`)
          })
          .catch(err => {
            console.error(err)
          })
          .finally(() => {
            this.SET_IS_ADD_BOARD(false)
          })
      }
    }
  }
</script>

<style>

</style>