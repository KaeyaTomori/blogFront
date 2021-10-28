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
      <el-backtop style="box-shadow: none;background: none;">
        <img src="./assets/totop.png" style="width: 40px;height: 40px;">
      </el-backtop>

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
  },
  methods: {
    watchScroll() {
      // var scrollTop =
      //   window.pageYOffset ||
      //   document.documentElement.scrollTop ||
      //   document.body.scrollTop;
      // //  当滚动超过 50 时，实现吸顶效果
      // if (scrollTop > 50) {
      //   this.navBarFixed = true;
      // } else {
      //   this.navBarFixed = false;
      // }
    },
    getSiteSetting(){
      // const _this = this;
      this.$axios
        .get("/siteInfo")
        .then(res => {
         // console.log(res.data.data.siteInfo)
          this.siteInfo = res.data.data.siteInfo
          this.badges = res.data.data.badges
          // this.musicId=res.data.data.introduction.musicId
          this.$store.dispatch('saveSiteInfo', this.siteInfo)
					this.$store.dispatch('saveProfileCard', res.data.data.profileCard)
          document.title = this.$route.meta.title + this.siteInfo.webTitleSuffix
          // document.title = this.siteInfo.webTitleSuffix
            // console.log(this.profileCard)
          //   console.log(this.musicId)
        });

    },
    
    // getnewBlog(){
      // const _this = this;
      // this.$axios
      //   .get("/blogList", {
      //     params: {
      //       currentPage: 1
      //     }
      //   })
      //   .then(res => {
      //     _this.newBlogs = res.data.data;
      //   });
    // }
  },
  created(){
    this.getSiteSetting();
    // this.getnewBlog();
  },
  mounted() {
    // let that = this;
    // that.minHeight = document.documentElement.clientHeight;
    // window.addEventListener("scroll", that.watchScroll);
    // window.onresize = function() {
    //   that.minHeight = document.documentElement.clientHeight;
      
    // };
  },
  watch:{
      // '$route':function(to,from){
      //     document.body.scrollTop = 0;
      //     document.documentElement.scrollTop = 0; 
      // }
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
.navBarWrap {
  position:fixed;
  top:0;
  z-index:999;
}
</style>
