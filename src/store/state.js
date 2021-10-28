export default {
	siteInfo: {
		reward: 'http://localhost:8080/image/head_avatar.jpg',
		headInfo: 'headInfo',
		blogName: 'BlogName'
	},
	profileCard: {
		imageUrl:'http://localhost:8080/image/card_bg.jpg',
        avatarUrl: 'http://localhost:8080/image/head_avatar.jpg',
        name: '友利丶枫夜',
        github: 'https://github.com/KaeyaTomori',
        bilibili: 'https://space.bilibili.com/12389194',
        email: 'fuuya@foxmail.com',
		rollText: [
			""
		],
		announcements: [
          {
			title: '关于本博客',
            content: '本博客使用了Hi-Dream-Blog的前端代码，如有侵权请联系',
          },
		{
			title: '关于我',
			content: '大四学生，学习中...',
		},
		{
			title: '关于网页',
			content: '开发中，功能待完善'
		}

        ]
	},
	//博客文章渲染完成的标记
	isBlogRenderComplete: false
}