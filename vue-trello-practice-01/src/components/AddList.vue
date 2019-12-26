<template>
  <div class="add-list">
    <input class="form-control" v-if="isAddList" type="text" ref="inputTitle" v-model="inputTitle"
      @keyup.enter="onSubmitTitle" @blur="restore">
    <a v-else @click="onAddList">&plus; Add another list</a>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        isAddList: false
      }
    },
    methods: {
      onAddList() {
        
      }
    }
  }
</script>

<style>
  .add-list {
    background-color: rgba(0, 0, 0, .1);
    padding: 12px;
    color: #ddd;
    transition: all .3s;
  }

  .add-list:hover,
  .add-list:focus {
    background-color: rgba(0, 0, 0, .3);
    cursor: pointer;
  }
</style>