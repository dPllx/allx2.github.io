/**
 * Created by Administrator on 2015/10/25.
 */
window.onload = function() {

	var dataArr = [
		{picUrl: './resource/images/web1.jpg', width: 960, height: 448},
		{picUrl: './resource/images/web2.jpg', width: 264, height: 250},
		{picUrl: './resource/images/web3.jpg', width: 960, height: 1371},
		/*{picUrl: './resource/images/web17.png', width: 774, height: 291},*/
		{picUrl: './resource/images/web5.jpg', width: 660, height: 1198},


		{picUrl: './resource/images/web9.jpg', width: 750, height: 1743},

		{picUrl: './resource/images/web11.jpg', width: 760, height: 1865},
		{picUrl: './resource/images/web12.jpg', width: 760, height: 1320},
		{picUrl: './resource/images/web19.jpg', width: 252, height: 346},
		{picUrl: './resource/images/web14.jpg', width: 760, height: 2109},


		{picUrl: './resource/images/web13.jpg', width: 660, height: 1310},
		{picUrl: './resource/images/web16.jpg', width: 660, height: 4423},
		/*{picUrl: './resource/images/web7.jpg', width: 1826, height: 798},*/
		{picUrl: './resource/images/web4.jpg', width: 560, height: 2310},
		{picUrl: './resource/images/web6.jpg', width: 168, height: 77},
		{picUrl: './resource/images/web10.png', width: 270, height: 246},

		{picUrl: './resource/images/web15.jpg', width: 760, height: 427},
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