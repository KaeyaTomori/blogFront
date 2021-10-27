<template>
  <div>
      <div class="tags">

    <el-card class="box-card">
      <div slot="header" class="d-flex align-items-center">
        <i class="card-icon el-icon-s-grid"></i>
        <span>分类</span>
      </div>
      <div class="text item">
        <el-tag
          class="tag-item"
          effect="plain"
          v-for="category in categorys"
          :color="category.color"
          v-bind:key="category.id"
        >
          <keep-alive>
            <router-link
              :to="{name: 'list', params: {type:'category',id: category.id}}"
              tag="span"
            >{{category.name}}</router-link>
          </keep-alive>
        </el-tag>
      </div>
    </el-card>


    </div>
  </div>
</template>

<script>
export default {
  name: "Categorys",
  data() {
    return {
      categorys: [
          {
              id: '1',
              name: '分类1'
          },
          {
              id: '2',
              name: '分类2'
          },
      ]

    };
  },
  methods: {
    // getTag() {
    //   const _this = this;
    //   this.$axios.get("/getAllCategory").then(res => {
    //     // console.log(res.data.data)
    //     const data = res.data.data;
    //     data.forEach(item => {
    //       item["color"] =
    //         "#" +
    //         Math.random()
    //           .toString(16)
    //           .substr(2, 6)
    //           .toUpperCase();
    //     });
    //     _this.categorys = data;
    //   });
    // }
  },
  created() {
    // this.getTag();
  }
};
</script>

<style>

</style>