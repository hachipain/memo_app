export const state = () => ({
  memo: [],
  page: 0
});

export const mutations = {
  insert: function(state, obj) {
    const d = new Date();
    const fmt =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getDate() +
      " " +
      d.getHours() +
      ":" +
      d.getMinutes();

    state.memo.unshift({
      title: obj.title,
      content: obj.content,
      created: fmt
    });
  },
  set_page: function(state, p) {
    state.page = p;
  },
  remove: function(state, obj) {
    for (let index = 0; index < state.memo.length; index++) {
      const ob = state.memo[index];
      if (
        ob.title == obj.title &&
        ob.content == obj.content &&
        ob.created == obj.created
      ) {
        alert("remove it! --" + ob.title);
        state.memo.splice(index, 1);
        return;
      }
    }
  }
};
