<template>
  <section class="container2">
    <h1>Memo</h1>
    <table>
      <tr>
        <th>Title</th>
        <td>
          <input
            type="text"
            name="title"
            class="memo-title"
            size="40"
            v-model="title"
            @focus="set_flg"
          />
          <button @click="find">find</button>
        </td>
      </tr>
      <tr>
        <th>Memo</th>
        <td>
          <textarea name="content" cols="50" rows="5" v-model="content"></textarea>
        </td>
      </tr>
      <tr>
        <th></th>
        <td>
          <button @click="insert">save</button>
          <transition name="del">
            <button v-if="sel_flg != false" @click="remove">delete</button>
          </transition>
        </td>
      </tr>
    </table>
    <hr />
    <ul class="list">
      <li v-for="(item,index)  in page_items" :key="index">
        <span @click="select(item)">{{item.title}}({{item.created}})</span>
      </li>
    </ul>
    <hr />
    <div class="nav">
      <span @click="prev">&lt;prev</span>|
      <span @click="next">next&gt;</span>
    </div>
  </section>
</template>

<script>
export default {
  data: function() {
    return {
      title: "",
      content: "",
      num_per_page: 5,
      find_flg: false,
      sel_flg: false
    };
  },
  computed: {
    page_items: function() {
      if (this.find_flg) {
        let arr = [];
        const data = this.$store.state.memo.memo;
        data.forEach(element => {
          if (
            element.title.toLowerCase().indexOf(this.title.toLowerCase()) >= 0
          ) {
            arr.push(element);
          }
        });
        return arr;
      } else if (this.sel_flg != false) {
        return [this.sel_flg];
      } else {
        return this.$store.state.memo.memo.slice(
          this.num_per_page * this.$store.state.memo.page,
          this.num_per_page * (this.$store.state.memo.page + 1)
        );
      }
    },
    page: {
      get: function() {
        return this.$store.state.memo.page;
      },
      set: function(p) {
        let pg =
          p >
          Math.ceil(this.$store.state.memo.memo.length / this.num_per_page) - 1
            ? Math.ceil(
                this.$store.state.memo.memo.length / this.num_per_page
              ) - 1
            : p;
        pg = pg < 0 ? 0 : pg;
        this.$store.commit("memo/set_page", pg);
      }
    }
  },
  methods: {
    set_flg: function() {
      if (this.find_flg || this.sel_flg != false) {
        this.find_flg = false;
        this.sel_flg = false;
        this.title = "";
        this.content = "";
      }
    },
    select: function(item) {
      this.find_flg = false;
      this.sel_flg = item;
      this.title = item.title;
      this.content = item.content;
    },
    insert: function() {
      this.$store.commit("memo/insert", {
        title: this.title,
        content: this.content
      });
      this.title = "";
      this.content = "";
    },
    prev: function() {
      this.page--;
    },
    next: function() {
      this.page++;
    },
    find: function() {
      this.find_flg = true;
      this.sel_flg = false;
    },
    remove: function() {
      if (this.sel_flg == false) {
        return;
      } else {
        this.$store.commit("memo/remove", this.sel_flg);
        this.set_flg();
      }
    }
  },
  created: function() {
    this.$store.commit("memo/set_page", 0);
  }
};
</script>

<style scoped>
.container2 {
  padding: 5px 10px;
}
h1 {
  font-size: 60pt;
  color: #345980;
}
div {
  font-size: 14pt;
}
input,
textarea {
  font-size: 14pt;
  margin: 5px;
}
button {
  font-size: 14pt;
  padding: 1px 10px;
  margin: 5px;
}
hr {
  border-style: none;
  border-top: solid;
  border-width: 5px;
  border-color: #def;
  margin: 20px 0px 10px 0px;
}
li {
  font-size: 14pt;
  height: 32px;
}
th {
  background-color: #345980;
  color: white;
}
td {
  background-color: aliceblue;
  color: #345980;
  padding: 5px;
}
.nav {
  padding: 0px 10px;
  cursor: pointer;
}
.list {
  cursor: pointer;
}
.del-enter-active,
.del-leave-active {
  transition: opacity 0.5s;
}
.del-enter,
.del-leave-to {
  opacity: 0;
}
</style>