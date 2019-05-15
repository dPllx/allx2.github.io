/**
 * Created by Administrator on 2015/10/25.
 */
window.onload = function() {

	var dataArr = [
		{picUrl: './resource/images/dota-4.jpg', width: 480, height: 800},
		{picUrl: './resource/images/dota-15.jpg', width: 500, height: 311},
		{picUrl: './resource/images/dota-23.jpg', width: 720, height: 450},
		{picUrl: './resource/images/dota-1.jpg', width: 700, height: 381},
		{picUrl: './resource/images/dota-7.jpg', width: 850, height: 425},
		{picUrl: './resource/images/dota-8.jpg', width: 403, height: 268},
		{picUrl: './resource/images/dota-9.jpg', width: 720, height: 450},
		{picUrl: './resource/images/dota-10.jpg', width: 1024, height: 640},
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