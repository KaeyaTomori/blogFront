<template>
  <div>
      <div class="tags">

    <el-card class="box-card">
      <div slot="header" class="d-flex align-items-center">
        <i class="card-icon el-icon-s-grid"></i>
        <span>分类</span>
      </div>
      <div class="text item">
        <div >
        <el-tag
          class="tag-item"
          effect="plain"
          v-for="category in categorys"
          :color="category.color"
          v-bind:key="category.id"
          @click="tagClick(category.categoryName,category.id)"
        >
            
            {{category.categoryName}}

        </el-tag>
        </div>
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
              categoryName: '分类1'
          }
      ]

    };
  },
  methods: {
    tagClick(categoryName,id){
      this.$router.replace({name: 'list', params: {titleInfo: categoryName,categoryId: id}});
    },
    getCategory() {
      const _this = this;
      this.$axios.get("/category/all").then(res => {
        // console.log(res.data.data)
        const data = res.data.data;
        data.forEach(item => {
          item["color"] =
            "#" + "ffffff"
            // Math.random()
            //   .toString(16)
            //   .substr(2, 6)
            //   .toUpperCase();
        });
        _this.categorys = data;
      });
    }
  },
  created() {
    this.getCategory();
  }
};
</script>

<style>
.box-card:hover {
  transform: translate(0, -2px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}
.box-card .item:hover {
  color: #409eff;
  cursor: pointer;
}

.box-card span {
  font-weight: bold;
}

.card-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.tag-item {
  margin-right: 10px;
  margin-top: 10px;
}
</style>