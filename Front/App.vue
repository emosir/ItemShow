<script>
	import userApi from "./api/user";
  import showsOpe from "./common/showsOpe";

  export default {
    globalData: {
      user: {}
    },
		onLaunch: function() {
      uni.login({
        provider: 'weixin',
        success: (res) => {
          userApi.login(res.code).then((res)=>{
            this.globalData.user=res.data.data.user;
            showsOpe.getHeadImage([this.globalData.user]).then(shows=>{
              this.globalData.user=shows[0]
            }).catch(err=>{
              console.log("获取用户头像失败"+err)
            })
          }).catch((err)=>{
            console.log("登录失败"+err)
          })
        }
      });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
