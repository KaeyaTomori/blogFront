<template>
  <div id="app">
    <div class="rg-table-box">
      <HeadBar :class="{'navBarWrap':navBarFixed}" :siteInfo="siteInfo" />

        <!-- 页面路由 -->
        <el-row type="flex" justify="center" id="content">
        <el-col :xs="20" :md="20" :style="{'minHeight':minHeight+'px'}">
          <router-view></router-view>
        </el-col>
        </el-row>

        <!--回到顶部小火箭-->
      <!-- <el-backtop style="box-shadow: none;background: none;">
        <img src="./assets/totop.png" style="width: 40px;height: 40px;">
      </el-backtop> -->

      <!-- 网易云插件 -->
      <!-- <meting-js server="netease" type="playlist" :id="musicId"  fixed="true" theme="#25CCF7"></meting-js> -->

      <FooterZone :siteInfo="siteInfo" />
    </div>
  </div>
</template>




<script>
export default {
  name: 'App',
  components: {
  },

  data(){
    return {
      siteInfo: {
        //HeadBar数据
        blogName: '友利丶枫夜',
        backgroundImage:'http://localhost:8080/image/head_bg.jpg',
        headAvatar:'http://localhost:8080/image/head_avatar.jpg',
        headDescribe:'技术宅，做自己想做的事',
        // loginUrl:'',

        //FooterZone数据
        footerImgTitle: '联系我QQ',
        footerImgUrl: 'http://localhost:8080/image/qq_code.jpg',
      },

      minHeight: 0,
      navBarFixed: false,
      // badges: [],
      
      // musicId:7014983728,
      // newBlogs:[],
      // hitokoto:'',

    }
  }
}
</script>

<style >
.app {
  font-family: "microsoft yahei";
  background-color: #f9f9f9;
  /* text-align: center; */
}
#content {
  background-color: #f9f9f9;
  padding: 100px 0;

}
@media screen and (min-width: 320px) and (max-width: 750px) {
  #content {
  background-color: #f9f9f9;
  padding: 100px 0;
  }
}

</style>
