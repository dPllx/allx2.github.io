/**
 * Created by Administrator on 2015/10/25.
 */
window.onload = function() {

	var dataArr = [
		{picUrl: './resource/images/banner17.jpg', width: 750, height: 380},
		{picUrl: './resource/images/banner1.jpg', width: 640, height: 280},
		{picUrl: './resource/images/banner15.jpg', width: 750, height: 380},
		{picUrl: './resource/images/banner8.jpg', width: 750, height: 380},
		{picUrl: './resource/images/banner16.jpg', width: 750, height: 380},
		/*{picUrl: './resource/images/bannerb.jpg', width: 200, height: 200},*/
		{picUrl: './resource/images/banner7.jpg', width: 640, height: 200},

		{picUrl: './resource/images/banner3.jpg', width: 640, height: 280},
		/*{picUrl: './resource/images/bannera.jpg', width: 640, height: 640},*/
		{picUrl: './resource/images/banner4.jpg', width: 640, height: 200},
		{picUrl: './resource/images/banner5.jpg', width: 640, height: 200},
		/*{picUrl: './resource/images/bannerb.jpg', width: 200, height: 200},*/
		{picUrl: './resource/images/banner6.jpg', width: 640, height: 200},
		{picUrl: './resource/images/banner2.jpg', width: 750, height: 380},



		/*{picUrl: './resource/images/bannerb.jpg', width: 200, height: 200},*/
		{picUrl: './resource/images/banner9.jpg', width: 640, height: 280},
		{picUrl: './resource/images/banner10.jpg', width: 640, height: 280},
		{picUrl: './resource/images/banner11.jpg', width: 640, height: 280},
		/*{picUrl: './resource/images/bannerc.jpg', width: 380, height: 380},*/
		{picUrl: './resource/images/banner12.jpg', width: 640, height: 200},

		{picUrl: './resource/images/banner13.jpg', width: 640, height: 200},
		/*{picUrl: './resource/images/bannerc.jpg', width: 380, height: 380},*/
		{picUrl: './resource/images/banner14.jpg', width: 750, height: 380},
	];

	var listType = 3,
		bannerDom = document.querySelector('.banner'),
		contentDom = document.querySelector('.content'),
		loadMoreDom = document.querySelector('.load-more'),
		wtf = null;

	showList();

	bannerDom.onclick = function() {
		listType ++;
		if (listType > 3) listType = 1;
		showList();
	}

	loadMoreDom.onclick = function() {
		wtf.create(dataArr);
	}

	function showList() {
		contentDom.innerHTML = '';
		wtf = new WaterFull('.content', {
			type: listType,
			urlField: 'picUrl'
		});
		wtf.create(dataArr);
	};
};