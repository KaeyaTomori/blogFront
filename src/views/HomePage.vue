<template>
  <div>
      <div class="home" id="homeArticle">

    <el-row type="flex" justify="space-around">
      
      <!-- 文章列表 -->
      <el-col :span="screenWidth>750?16:24">

        <div v-if="titleInfo != ''">
          <el-card class="atrtitle" style="text-align: center">
            <h2 class="titleinfo">{{titleInfo}}</h2>
          </el-card>
        </div>

        <el-row
          class="recent-posts"
          id="recent-posts"
          v-for="(article,index) in articles"
          v-bind:key="index"
        >
          <div class="recent-post-item">

            <div :class="index%2!=0?'post_cover right_radius':'post_cover left_radius'">
              <keep-alive>
                <router-link :to="{name: 'article', params: {articleId: article.id}}" tag="span">
                  <img
                    :src="article.coverImage"
                    style="cursor: pointer;"
                    class="post_bg entered loader"
                  />
                </router-link>
              </keep-alive>
            </div>

            <div class="recent-post-info">
              <div class="article-title">
                <keep-alive>
                  <router-link
                    :to="{name: 'article', params: {articleId: article.id}}"
                    tag="span"
                    class="article-title"
                  >
                    <span style="cursor: pointer;">{{article.title}}</span>
                  </router-link>
                </keep-alive>
              </div>

              <div class="article-meta-wrap">
                <span class="article-meta" v-if="article.is_top=='1'">
                  <i class="el-icon-upload2 sticky"></i>
                  <span class="sticky">置顶</span>
                  <span class="article-meta__separator">|</span>
                </span>                
                <span class="post-meta-date">
                  <i class="el-icon-date"></i>
                  <span class="article-meta-label">发表于</span>
                  <span class="post-meta-date-created">{{article.createTime}}</span>
                  <span class="article-meta__separator">|</span>
                  <i class="el-icon-time"></i>
                  <span class="article-meta-label">更新于</span>
                  <span class="post-meta-date-updated">{{article.updateTime}}</span>
                </span>
                <!-- <span class="article-meta" v-if="article.cateGory">
                  <span class="article-meta__separator">|</span>
                  <i class="el-icon-folder-opened"></i>
                  <span href class="article-meta__categories">{{article.categoryName}}</span>
                </span> -->
                <span class="article-meta">
                  <span class="article-meta__separator">|</span>
                  <i class="el-icon-view"></i>
                  <span class="valine-comment-count">阅读量：{{article.visits}}</span>
                </span>
                <span class="article-meta">
                  <span class="article-meta__separator">|</span>
                  <i class="el-icon-chat-dot-round"></i>
                  <span class="valine-comment-count">{{article.commentCnt}}</span>
                  <span class="article-meta-label">条评论</span>
                </span>
                <span class="article-meta">
                  <span class="article-meta__separator">|</span>
                  <img class="love-icon" src="../assets/love.png" alt="">
                  <span class="valine-comment-count">点赞量：{{article.likes}}</span>
                </span>
              </div>

              <div class="content">{{article.summary}}</div>
            </div>
          </div>
        </el-row>

        <!-- 分页按钮 -->
        <div class="block pagination">
          <el-pagination
            @current-change="page"
            :current-page="currentPage"
            :page-count="totalPage"
            layout="prev, pager, next"
            background
            hide-on-single-page
          ></el-pagination>
        </div>

      </el-col>



        <!-- 右侧信息栏 -->
      <el-col :span="6" class="hidden-sm-and-down" id="side">
        <Sider/>
      </el-col>

    </el-row>

      </div>
  </div>
</template>


<script>
import Sider from '../components/Sider.vue';
export default {
  name: "HomePage",
  components: {Sider},
  data() {
    return {
      titleInfo:'',
      categoryId: 0,
      articles: [
        {
            id: 1,
            name: 'default',
            coverImage: 'http://localhost:8080/image/1.jpg',
            title: '第一篇文章',
            is_top: '0',
            createTime: '2021-10-26 00:00:00',
            updateTime: '2021-10-26 00:00:00',
            // categoryName: '默认分类',
            visits: '233',
            commentCnt: '2233',
            likes: '2333',
            summary: '这里是第一篇文章的摘要',
        },
        {
            id: 2,
            name: 'default',
            coverImage: 'http://localhost:8080/image/1.jpg',
            title: '第二篇文章',
            is_top: '0',
            createTime: '2021-10-26 00:00:00',
            updateTime: '2021-10-26 00:00:00',
            categoryName: '默认分类',
            visits: '233',
            commentCnt: '2233',
            likes: '2333',
            summary: '这里是第二篇文章的摘要',
        },
      ],

      currentPage: 1,
      totalPage: 1,
      pageSize: 5,
      screenWidth: document.body.clientWidth
    };
  },
  methods: {
    toTop(){
      window.scrollTo({
         top:550,
         behavior:"smooth"
       });
    },
    init() {
      const _this = this;
      this.$axios
        .get("/article/list/"+1, {
          params: {
            categoryId: this.categoryId
          }
        })
        .then(res => {
          _this.articles = res.data.data.list;
          _this.currentPage = res.data.data.pageNum;
          _this.totalPage=res.data.data.pages;
        });
    },
    page(currentPage) {
      const _this = this;
      this.$axios
        .get("/article/list/"+currentPage, {
          params: {
            categoryId: this.categoryId
          }
        })
        .then(res => {
          // console.log(res.data.data)
          _this.articles = res.data.data.list;
          _this.currentPage = res.data.data.pageNum;
          _this.totalPage=res.data.data.pages;
        });
      this.toTop();
    }
  },

  mounted() {
    const that = this
    if(this.$route.params.titleInfo){
      this.titleInfo=this.$route.params.titleInfo + "的所有文章";
      this.categoryId=this.$route.params.categoryId;
      // console.log(this.categoryId);
      this.page(1);
    }else{
      this.titleInfo="";
      this.categoryId=0;
      this.init(1);
    }
     window.onresize = () => {
        return (() => {
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth
        })()
    }
  },

  watch:{
    $route(){
        if(this.$route.params.titleInfo){
        this.titleInfo=this.$route.params.titleInfo + "的所有文章";
        this.categoryId=this.$route.params.categoryId;
        // console.log(this.categoryId);
        this.page(1);
        }else{
          this.titleInfo="";
          this.categoryId=0;
          this.init(1);
        }
    },
    screenWidth(val){
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if(!this.timer){
            // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
            this.screenWidth = val
            this.timer = true
            let that = this
            setTimeout(function(){
                // 打印screenWidth变化的值
               // console.log(that.screenWidth)
                that.timer = false
            },400)
        }
    }
  }
};
</script>


<style>
:root {
  --global-font-size: 14px;
  --global-bg: #fff;
  --font-color: #4c4948;
  --hr-border: #a4d8fa;
  --hr-before-color: #80c8f8;
  --search-bg: #f6f8fa;
  --search-input-color: #4c4948;
  --search-result-title: #4c4948;
  --preloader-bg: #37474f;
  --preloader-color: #fff;
  --tab-border-color: #f0f0f0;
  --tab-botton-bg: #f0f0f0;
  --tab-botton-color: #1f2d3d;
  --tab-button-hover-bg: #dcdcdc;
  --tab-button-active-bg: #fff;
  --card-bg: #fff;
  --sidebar-bg: #f6f8fa;
  --btn-hover-color: #ff7242;
  --btn-color: #fff;
  --btn-bg: #49b1f5;
  --text-bg-hover: #49b1f5;
  --light-grey: #eee;
  --white: #fff;
  --text-highlight-color: #1f2d3d;
  --blockquote-color: #6a737d;
  --blockquote-bg: rgba(73, 177, 245, 0.1);
  --reward-pop: #f5f5f5;
  --toc-link-color: #666261;
  --card-box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.06);
  --card-hover-box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.15);
}
#side .item {
  margin-bottom: 30px;
}

.art-item {
  margin-bottom: 30px;
  position: relative;
}

.art-item .star {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 0;
  right: 0;
}

img.tag {
  width: 16px;
  height: 16px;
}

.art-title {
  border-left: 3px solid #f56c6c;
  padding-left: 5px;
  cursor: pointer;
}

.art-title:hover {
  padding-left: 10px;
  color: #409eff;
}

.art-time {
  margin-right: 20px;
}

.art-body {
  display: flex;
  padding: 10px 0;
}

.side-img {
  height: 150px;
  width: 270px;
  overflow: hidden;
  margin-right: 10px;
}

img.art-banner {
  width: 100%;
  height: 100%;
  transition: all 0.6s;
}

img.art-banner:hover {
  transform: scale(1.4);
}

.side-abstract {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.art-abstract {
  flex: 1;
  color: #aaa;
}

.art-more {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.art-more .view {
  color: #aaa;
  margin-left: 50px;
}
h5 {
  font-size: 18px;
}
.pagination {
  background-color: #f9f9f9;
}
.vlcinfo {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
@media screen and (min-width: 320px) and (max-width: 750px) {
  .art-time {
    font-size: 12px;
    font-weight: 500;
  }
  .art-item {
    margin-top: 40px;
    position: relative;
  }
  .art-more {
    height: 40px;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    align-items: flex-end;
  }
}
.love-icon{
  width: 15px;
  height: 15px;
  margin-right: 8px;
  margin-top: 5px;
}
#recent-posts > .recent-post-item:not(:first-child) {
  margin-top: 1rem;
}
#recent-posts > .recent-post-item {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-orient: horizontal;
  -moz-box-orient: horizontal;
  -o-box-orient: horizontal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 20em;
  border-radius: 12px 8px 8px 12px;
  background: var(--card-bg);
  -webkit-box-shadow: var(--card-box-shadow);
  box-shadow: var(--card-box-shadow);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  -ms-transition: all 0.3s;
  transition: all 0.3s;
}
@media screen and (max-width: 768px) {
  #recent-posts > .recent-post-item {
    border-radius: 12px 12px 8px 8px;
  }
}
#recent-posts > .recent-post-item:hover {
  -webkit-box-shadow: var(--card-hover-box-shadow);
  box-shadow: var(--card-hover-box-shadow);
}
#recent-posts > .recent-post-item:hover img.post_bg {
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}
#recent-posts > .recent-post-item .left_radius {
  border-radius: 8px 0 0 8px;
}
#recent-posts > .recent-post-item .right_radius {
  -webkit-box-ordinal-group: 2;
  -moz-box-ordinal-group: 2;
  -o-box-ordinal-group: 2;
  -ms-flex-order: 2;
  -webkit-order: 2;
  order: 2;
  border-radius: 0 8px 8px 0;
}
#recent-posts > .recent-post-item.ads-wrap {
  display: block !important;
  height: auto !important;
}
#recent-posts > .recent-post-item .post_cover {
  overflow: hidden;
  width: 45%;
  height: 100%;
  -webkit-mask-image: -webkit-radial-gradient(#fff, #000);
}
#recent-posts > .recent-post-item .post_cover img.post_bg {
  width: 100%;
  height: 100%;
  -webkit-transition: all 0.6s;
  -moz-transition: all 0.6s;
  -o-transition: all 0.6s;
  -ms-transition: all 0.6s;
  transition: all 0.6s;
  object-fit: cover;
}
#recent-posts > .recent-post-item .post_cover img.post_bg:hover {
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}
#recent-posts > .recent-post-item > .recent-post-info {
  display: inline-block;
  overflow: hidden;
  padding: 0 40px;
  width: 55%;
}
#recent-posts > .recent-post-item > .recent-post-info.no-cover {
  width: 100%;
}
#recent-posts > .recent-post-item > .recent-post-info > .article-title {
  margin-bottom: 0.3rem;
  color: var(--text-highlight-color);
  font-size: 1.72em;
  line-height: 1.4;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  -webkit-line-clamp: 2;
}
#recent-posts > .recent-post-item > .recent-post-info > .article-title:hover {
  color: #49b1f5;
}
#recent-posts > .recent-post-item > .recent-post-info > .article-meta-wrap {
  color: #858585;
  font-size: 90%;
}
#recent-posts
  > .recent-post-item
  > .recent-post-info
  > .article-meta-wrap
  > .post-meta-date {
  cursor: default;
}
#recent-posts
  > .recent-post-item
  > .recent-post-info
  > .article-meta-wrap
  .sticky {
  color: #ff7242;
}
#recent-posts > .recent-post-item > .recent-post-info > .article-meta-wrap i {
  margin: 0 0.2rem 0 0;
}
#recent-posts
  > .recent-post-item
  > .recent-post-info
  > .article-meta-wrap
  .article-meta-label {
  padding-right: 0.2rem;
}
#recent-posts
  > .recent-post-item
  > .recent-post-info
  > .article-meta-wrap
  .article-meta__separator {
  margin: 0 0.3rem;
}
#recent-posts
  > .recent-post-item
  > .recent-post-info
  > .article-meta-wrap
  .article-meta__link {
  margin: 0 0.2rem;
}
#recent-posts
  > .recent-post-item
  > .recent-post-info
  > .article-meta-wrap
  .fa-angle-right {
  margin: 0 0.2rem;
}
#recent-posts > .recent-post-item > .recent-post-info > .article-meta-wrap a {
  color: #858585;
}
#recent-posts
  > .recent-post-item
  > .recent-post-info
  > .article-meta-wrap
  a:hover {
  color: #49b1f5;
  text-decoration: underline;
}
#recent-posts > .recent-post-item > .recent-post-info > .content {
  margin-top: 0.3rem;
  -webkit-line-clamp: 3;
}
@media screen and (max-width: 768px) {
  #recent-posts .recent-post-item {
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -o-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    height: auto !important;
  }
  #recent-posts .recent-post-item .post_cover {
    -webkit-box-ordinal-group: 1 !important;
    -moz-box-ordinal-group: 1 !important;
    -o-box-ordinal-group: 1 !important;
    -ms-flex-order: 1 !important;
    -webkit-order: 1 !important;
    order: 1 !important;
    width: 100%;
    height: 230px;
    border-radius: 8px 8px 0 0;
  }
  #recent-posts .recent-post-item .recent-post-info {
    -webkit-box-ordinal-group: 2 !important;
    -moz-box-ordinal-group: 2 !important;
    -o-box-ordinal-group: 2 !important;
    -ms-flex-order: 2 !important;
    -webkit-order: 2 !important;
    order: 2 !important;
    padding: 1rem 1rem 1.5rem;
    width: 100%;
  }
  #recent-posts .recent-post-item .recent-post-info.no-cover {
    padding: 1.5rem 1rem;
  }
  #recent-posts .recent-post-item .recent-post-info .article-title {
    font-size: 1.43em;
  }
  #recent-posts .recent-post-item .recent-post-info .content {
    height: auto;
  }
}

.atrtitle{
  margin-bottom: 50px;
}
.titleinfo{
  letter-spacing: 2px;
}
</style>