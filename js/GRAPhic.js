/**
 * Created by Administrator on 2015/10/25.
 */
window.onload = function() {

	var dataArr = [
		{picUrl: './resource/images/pmsj1.jpg', width: 600, height: 716},
		{picUrl: './resource/images/pmsj2.jpg', width: 1080, height: 1917},
		{picUrl: './resource/images/pmsj3.jpg', width: 600, height: 716},
		{picUrl: './resource/images/pmsj4.jpg', width: 1080, height: 1917},
		{picUrl: './resource/images/pmsj6.jpg', width: 760, height: 456},
		{picUrl: './resource/images/pmsj8.jpg', width: 480, height: 400},
		{picUrl: './resource/images/pmsj9.jpg', width: 1080, height: 1521},
		{picUrl: './resource/images/pmsj9-1.jpg', width: 1080, height: 1533},
		{picUrl: './resource/images/pmsj10.jpg', width: 600, height: 600},
		{picUrl: './resource/images/pmsj11.jpg', width: 600, height: 716},
		{picUrl: './resource/images/pmsj12.jpg', width: 1080, height: 1917},
		{picUrl: './resource/images/pmsj13.jpg', width: 1080, height: 1381},
		{picUrl: './resource/images/pmsj14.jpg', width: 640, height: 1136},
		{picUrl: './resource/images/pmsj15.jpg', width: 480, height: 400},
		{picUrl: './resource/images/pmsj17.jpg', width: 1080, height: 443},
		{picUrl: './resource/images/pmsj18.jpg', width: 960, height: 666},
		{picUrl: './resource/images/pmsj19.jpg', width: 640, height: 1136},
		{picUrl: './resource/images/pmsj20.jpg', width: 480, height: 400},
		{picUrl: './resource/images/pmsj21.jpg', width: 480, height: 679},
		{picUrl: './resource/images/pmsj25.jpg', width: 600, height: 716},
		{picUrl: './resource/images/pmsj22.jpg', width: 1080, height: 810},
		{picUrl: './resource/images/pmsj23.jpg', width: 1080, height: 810},
		{picUrl: './resource/images/pmsj24.jpg', width: 1080, height: 764},
		{picUrl: './resource/images/pmsj26.jpg', width: 1070, height: 791},
		{picUrl: './resource/images/pmsj27.jpg', width: 960, height: 679},
		{picUrl: './resource/images/pmsj28.jpg', width: 1080, height: 531},
		{picUrl: './resource/images/pmsj29.jpg', width: 1080, height: 540},
		{picUrl: './resource/images/pmsj30.jpg', width: 1080, height: 540},
		{picUrl: './resource/images/pmsj31.jpg', width: 500, height: 347},
		{picUrl: './resource/images/pmsj32.jpg', width: 560, height: 383},
		{picUrl: './resource/images/pmsj33.jpg', width: 650, height: 383},
		
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