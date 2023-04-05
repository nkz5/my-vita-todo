import { ref } from 'vue';

export const useTodoList = (id) => {
  const ls = localStorage.todoList;
  const todoListRef = ref([]);
  todoListRef.value = ls ? JSON.parse(ls) : [];

  // リストに要素を追加する
  const add = (task) => {
    const id = new Date().getTime();
    todoListRef.value.push({ id: id, task: task, checked: false });
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  // リストからid(key)をもとにtodo(配列要素)を取得する
  const findById = (id) => {
    return todoListRef.value.find((todo) => todo.id === id);
  };

  // リストからidをもとにインデックスを取得する
  const findIndexById = (id) => {
    return todoListRef.value.findIndex((todo) => todo.id === id);
  };

  //編集する要素を画面に表示させるためにtaskを返す
  const editId = ref(-1); //変更する要素のid
  const show = (id) => {
    const todo = findById(id);
    editId.value = id;
    return todo.task;
  };

  //変更ボタンが押されたときの処理
  const edit = (task) => {
    const todo = findById(editId.value);
    const idx = findIndexById(editId.value);
    todo.task = task;
    todoListRef.value.splice(idx, 1, todo);
    localStorage.todoList = JSON.stringify(todoListRef.value);
    editId.value = -1;
  };

  // 削除ボタンが押されたときの処理
  const del = (id) => {
    const todo = findById(id);
    const delMsg = '[' + todo.task + ']を削除しますか？';
    if (!confirm(delMsg)) return;

    const idx = findIndexById(id);
    todoListRef.value.splice(idx, 1);
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  // checkボタンが押されたときの処理
  const check = (id) => {
    const todo = findById(id);
    const idx = findIndexById(id);
    todo.checked = !todo.checked; //ここがおかしそう
    todoListRef.value.splice(idx, 1, todo);
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  return { todoListRef, add, show, edit, del, check };
};
