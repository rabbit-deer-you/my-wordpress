function ajacpload() {
	$('#pagenavi a').click(function () {
		var wpurl = $(this).attr("href").split(/(\?|&)action=AjaxCommentsPage.*$/)[0];
		var commentPage = 1;
		if (/comment-page-/i.test(wpurl)) {
			commentPage = wpurl.split(/comment-page-/i)[1].split(/(\/|#|&).*$/)[0];
		} else if (/cpage=/i.test(wpurl)) {
			commentPage = wpurl.split(/cpage=/)[1].split(/(\/|#|&).*$/)[0];
		};
		var postId = $('#cp_post_id').text();
		var url = wpurl.split(/#.*$/)[0];
		url += /\?/i.test(wpurl) ? '&' : '?';
		url += 'action=AjaxCommentsPage&post=' + postId + '&page=' + commentPage;
		$.ajax({
			url : url,
			type : 'GET',
			beforeSend : function () {
				document.body.style.cursor = 'wait';
				var C = 0.5; //�޸������ѡ�����������б�div��id����ҳ���ֵ�id
				$('#commentlist,#pagenavi').css({
					opacity : C,
					MozOpacity : C,
					KhtmlOpacity : C,
					filter : 'alpha(opacity=' + C * 100 + ')'
				});
				var loading = 'Comments Loading......';
				$('#pagenavi').html(loading);
			},
			error : function (request) {
				alert(request.responseText);
			},
			success : function (data) {
				var responses = data.split('@||@');
				$('#commentlist').html(responses[0]);
				$('#pagenavi').html(responses[1]);
				var C = 1; //�޸������ѡ�����������б�div��id����ҳ���ֵ�id
				$('#commentlist,#pagenavi').css({
					opacity : C,
					MozOpacity : C,
					KhtmlOpacity : C,
					filter : 'alpha(opacity=' + C * 100 + ')'
				});
				$('#cmploading').remove();
				document.body.style.cursor = 'auto';
				ajacpload(); //��������һ��
				//single_js();//��Ҫ���ص�js��ע��
				$body.animate({
					scrollTop : $('#comments').offset().top
				}, 1000);
			} //���������б���
		});
		return false;
	});
}