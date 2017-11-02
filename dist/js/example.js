/*
 * @Author: chenyang_pc
 * @Date:   2017-10-28 22:08:02
 * @Last Modified by:   chenyang_pc
 * @Last Modified time: 2017-11-02 16:47:31
 */

$(function() {

	var layer = new Layer();

	$(".example-btn-1").click(function() {

		$(".pb-layer").addClass("show");

		Layer.alert({
			title: "通知",
			data: {
				message: "支付已成功！"
			},
			confirm: function() {}
		});
	});
	$(".example-btn-2").click(function() {
		Layer.confirm({
			title: "通知",
			data: {
				message: "确认删除该记录吗？"
			},
			// confirm: function() {},
			// cancel: function() {},
		});
	});
	$(".example-btn-3").click(function() {
		Layer.prompt({
			title: "通知",
			data: {
				message: "请输入充值金额"
			},
			// confirm: function() {},
			// cancel: function() {}
		});
	});
	// 自定义弹层演示
	$(".example-btn-4").click(function() {

		layer.open({
			// 标题
			title: "新用户注册",
			// 用户自定义的class
			skin: "best-layer-register",
			// 是否显示头部
			header: true,
			// 是否是模态框
			overlayer: false,
			// 点击其他空白区域是否关闭layer
			swapping: false,
			// 是否支持拖拽
			draggable: false,
			// 弹层数据
			data: {
				message: "自定义弹层",
				username: "tom"
			},
			// 弹层模板地址
			url: "/template/register.tpl.html",
			// 按钮组
			buttons: [{
				text: "立即注册",
				skin: "button-primary button-h-30",
				handler: function() {
					console.log('ok')
				}
			}],
			// 设置动画
			// animation: ["zoomIn", "zoomOut"]
		});

	});

});