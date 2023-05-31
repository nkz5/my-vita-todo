<script setup>
import { onUpdated, onMounted, ref } from 'vue';
import { useTodoList } from '/src/composables/useTodoList.js';
import BaseButton from '/src/components/BaseButton.vue';
import ButtonAdd from '/src/components/ButtonAdd.vue';

import Gapi from 'vue-googleapis';

// 入力を取得
const todoRef = ref('');

//setupでtodo入力欄を取得
const inpSetup = document.getElementById('inp');
console.log(inpSetup);

onMounted(() => {
  //getSearch();
  const inpMmount = document.getElementById('inp').value;
  console.log(inpMmount);
});

onUpdated(() => {
  console.log('onUpdated: ', todoRef.value);
});

const isEditRef = ref(false);
const { todoListRef, add, show, edit, del, check, countFin } = useTodoList();

/*インプットされたタスクをhtmlのlocalstorageに保存する*/
const addTodo = () => {
  add(todoRef.value);
  todoRef.value = '';
};

/*編を選択されたタスクをインプット画面に表示する*/
const showTodo = (id) => {
  todoRef.value = show(id);
  isEditRef.value = true;
};

/*Todoリストを書き換える*/
const editTodo = () => {
  edit(todoRef.value);
  isEditRef.value = false;
  todoRef.value = '';
};

/*Todoリストから選択した値を削除する*/
const deleteTodo = (id) => {
  del(id);
};

const changeCheck = (id) => {
  check(id);
};

// useTodoList.js の算出プロパティーを関数で書いただけ
const countFinMethod = () => {
  console.log('method');
  const finArr = todoListRef.value.filter((todo) => todo.checked);
  return finArr.length;
};

const test = (str) => {
  console.log('test', str);
};
console.log('setup');
/*
methods = {
  getSearch () {
    this.$google.api.auth2.getAuthInstance();
    
    this.$google.api.load('customsearch', 'v1', () => {
      this.$google.api.customsearch.cse.list({
        q: 'ハウコレ',
        cx: '309f54ba859d04f9b',
      }).then((response) => {
        console.log(response.result);
      });
    });
  }
}*/

//Birth Date yyyy-mm-dd
const birthDate = ref('2001-01-01');
</script>

<template>


  <div class="box_input">
    <input
      id="inp"
      type="text"
      class="todo_input"
      placeholder="＋　TODOを入力"
      v-model="todoRef"
    />
    <BaseButton color="green" @on-click="editTodo" v-if="isEditRef">
      変更
    </BaseButton>
    <ButtonAdd @add-click="addTodo" v-else />
    <!--<BaseButton color="blue" @on-click="addTodo" v-else>追加</BaseButton>-->
  </div>
  <div class="box_list">
    <div class="todo_list" v-for="todo in todoListRef" :key="todo.id">
      <div class="todo" :class="{ fin: todo.checked }">
        <input
          type="checkbox"
          class="check"
          @change="changeCheck(todo.id)"
          :checked="todo.checked"
        />
        <label>{{ todo.task }}</label>
      </div>
      <div class="btns">
        <BaseButton color="green" @on-click="showTodo(todo.id)">編</BaseButton>
        <BaseButton color="pink" @on-click="deleteTodo(todo.id)">削</BaseButton>
      </div>
    </div>
  </div>
  <div class="fincount">
    <span> 完了：{{ countFin }}、</span>
    <span> 未完了：{{ todoListRef.length - countFin }}</span>
  </div>
  <div>
    <input type="date" v-model="birthDate" :max="new Date().toISOString().split('T')[0]" />
  </div>
</template>

<style scoped>
.box_input {
  margin-top: 20px;
}
.todo_input {
  width: 300px;
  margin-right: 8px;
  padding: 8px;
  font-size: 18px;
  border: 1px solid #aaa;
  border-radius: 6px;
}
.btn {
  padding: 8px;
  background-color: #03a9f4;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  font-size: 14px;
}
.box_list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.todo_list {
  display: flex;
  align-items: center;
  gap: 8px;
}
.todo {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 12px;
  width: 300px;
}
.check {
  border: 1px solid red;
  transform: scale(1.6);
  margin: 0 16px 2px 6px;
}
.btns {
  display: flex;
  gap: 4px;
}
.green {
  background-color: #00c853;
}
.pink {
  background-color: #ff4081;
}
.fin {
  text-decoration: line-through;
  background-color: #ddd;
  color: #777;
}
.fincount {
  margin-top: 8px;
  font-size: 0.8em;
}
</style>
