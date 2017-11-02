/*!
 * JavaScript Components best-loading
 * @author : chenyangdamon
 * @email  : 645230634@qq.com
 * @github : https://github.com/chenyangdamon
 * @Date   : 2017-04-12 12:12:32
 */
!function() {
	function a(a) {
		return a.replace(t, "").replace(u, ",").replace(v, "").replace(w, "").replace(x, "").split(y)
	}

	function b(a) {
		return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
	}

	function c(c, d) {
		function e(a) {
			return m += a.split(/\n/).length - 1, k && (a = a.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), a && (a = s[1] + b(a) + s[2] + "\n"), a
		}

		function f(b) {
			var c = m;
			if (j ? b = j(b, d) : g && (b = b.replace(/\n/g, function() {
					return m++, "$line=" + m + ";"
				})), 0 === b.indexOf("=")) {
				var e = l && !/^=[=#]/.test(b);
				if (b = b.replace(/^=[=#]?|[\s;]*$/g, ""), e) {
					var f = b.replace(/\s*\([^\)]+\)/, "");
					n[f] || /^(include|print)$/.test(f) || (b = "$escape(" + b + ")")
				} else b = "$string(" + b + ")";
				b = s[1] + b + s[2]
			}
			return g && (b = "$line=" + c + ";" + b), r(a(b), function(a) {
				if (a && !p[a]) {
					var b;
					b = "print" === a ? u : "include" === a ? v : n[a] ? "$utils." + a : o[a] ? "$helpers." + a : "$data." + a, w += a + "=" + b + ",", p[a] = !0
				}
			}), b + "\n"
		}
		var g = d.debug,
			h = d.openTag,
			i = d.closeTag,
			j = d.parser,
			k = d.compress,
			l = d.escape,
			m = 1,
			p = {
				$data: 1,
				$filename: 1,
				$utils: 1,
				$helpers: 1,
				$out: 1,
				$line: 1
			},
			q = "".trim,
			s = q ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
			t = q ? "$out+=text;return $out;" : "$out.push(text);",
			u = "function(){var text=''.concat.apply('',arguments);" + t + "}",
			v = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + t + "}",
			w = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (g ? "$line=0," : ""),
			x = s[0],
			y = "return new String(" + s[3] + ");";
		r(c.split(h), function(a) {
			a = a.split(i);
			var b = a[0],
				c = a[1];
			1 === a.length ? x += e(b) : (x += f(b), c && (x += e(c)))
		});
		var z = w + x + y;
		g && (z = "try{" + z + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + b(c) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
		try {
			var A = new Function("$data", "$filename", z);
			return A.prototype = n, A
		} catch (B) {
			throw B.temp = "function anonymous($data,$filename) {" + z + "}", B
		}
	}
	var d = function(a, b) {
		return "string" == typeof b ? q(b, {
			filename: a
		}) : g(a, b)
	};
	d.version = "3.0.0", d.config = function(a, b) {
		e[a] = b
	};
	var e = d.defaults = {
			openTag: "<%",
			closeTag: "%>",
			escape: !0,
			cache: !0,
			compress: !1,
			parser: null
		},
		f = d.cache = {};
	d.render = function(a, b) {
		return q(a, b)
	};
	var g = d.renderFile = function(a, b) {
		var c = d.get(a) || p({
			filename: a,
			name: "Render Error",
			message: "Template not found"
		});
		return b ? c(b) : c
	};
	d.get = function(a) {
		var b;
		if (f[a]) b = f[a];
		else if ("object" == typeof document) {
			var c = document.getElementById(a);
			if (c) {
				var d = (c.value || c.innerHTML).replace(/^\s*|\s*$/g, "");
				b = q(d, {
					filename: a
				})
			}
		}
		return b
	};
	var h = function(a, b) {
			return "string" != typeof a && (b = typeof a, "number" === b ? a += "" : a = "function" === b ? h(a.call(a)) : ""), a
		},
		i = {
			"<": "&#60;",
			">": "&#62;",
			'"': "&#34;",
			"'": "&#39;",
			"&": "&#38;"
		},
		j = function(a) {
			return i[a]
		},
		k = function(a) {
			return h(a).replace(/&(?![\w#]+;)|[<>"']/g, j)
		},
		l = Array.isArray || function(a) {
			return "[object Array]" === {}.toString.call(a)
		},
		m = function(a, b) {
			var c, d;
			if (l(a))
				for (c = 0, d = a.length; d > c; c++) b.call(a, a[c], c, a);
			else
				for (c in a) b.call(a, a[c], c)
		},
		n = d.utils = {
			$helpers: {},
			$include: g,
			$string: h,
			$escape: k,
			$each: m
		};
	d.helper = function(a, b) {
		o[a] = b
	};
	var o = d.helpers = n.$helpers;
	d.onerror = function(a) {
		var b = "Template Error\n\n";
		for (var c in a) b += "<" + c + ">\n" + a[c] + "\n\n";
		"object" == typeof console && console.error(b)
	};
	var p = function(a) {
			return d.onerror(a),
				function() {
					return "{Template Error}"
				}
		},
		q = d.compile = function(a, b) {
			function d(c) {
				try {
					return new i(c, h) + ""
				} catch (d) {
					return b.debug ? p(d)() : (b.debug = !0, q(a, b)(c))
				}
			}
			b = b || {};
			for (var g in e) void 0 === b[g] && (b[g] = e[g]);
			var h = b.filename;
			try {
				var i = c(a, b)
			} catch (j) {
				return j.filename = h || "anonymous", j.name = "Syntax Error", p(j)
			}
			return d.prototype = i.prototype, d.toString = function() {
				return i.toString()
			}, h && b.cache && (f[h] = d), d
		},
		r = n.$each,
		s = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
		t = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
		u = /[^\w$]+/g,
		v = new RegExp(["\\b" + s.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
		w = /^\d[^,]*|,\d[^,]*/g,
		x = /^,+|,+$/g,
		y = /^$|,+/;
	e.openTag = "{{", e.closeTag = "}}";
	var z = function(a, b) {
		var c = b.split(":"),
			d = c.shift(),
			e = c.join(":") || "";
		return e && (e = ", " + e), "$helpers." + d + "(" + a + e + ")"
	};
	e.parser = function(a) {
		a = a.replace(/^\s/, "");
		var b = a.split(" "),
			c = b.shift(),
			e = b.join(" ");
		switch (c) {
			case "if":
				a = "if(" + e + "){";
				break;
			case "else":
				b = "if" === b.shift() ? " if(" + b.join(" ") + ")" : "", a = "}else" + b + "{";
				break;
			case "/if":
				a = "}";
				break;
			case "each":
				var f = b[0] || "$data",
					g = b[1] || "as",
					h = b[2] || "$value",
					i = b[3] || "$index",
					j = h + "," + i;
				"as" !== g && (f = "[]"), a = "$each(" + f + ",function(" + j + "){";
				break;
			case "/each":
				a = "});";
				break;
			case "echo":
				a = "print(" + e + ");";
				break;
			case "print":
			case "include":
				a = c + "(" + b.join(",") + ");";
				break;
			default:
				if (/^\s*\|\s*[\w\$]/.test(e)) {
					var k = !0;
					0 === a.indexOf("#") && (a = a.substr(1), k = !1);
					for (var l = 0, m = a.split("|"), n = m.length, o = m[l++]; n > l; l++) o = z(o, m[l]);
					a = (k ? "=" : "=#") + o
				} else a = d.helpers[c] ? "=#" + c + "(" + b.join(",") + ");" : "=" + a
		}
		return a
	}, "function" == typeof define ? define(function() {
		return d
	}) : "undefined" != typeof exports ? module.exports = d : this.template = d
}();;
(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		// AMD模式
		define(["jquery", "template"], function() {
			factory.apply(root, arguments)
		});
	} else {
		// 全局模式
		factory.call(root, root.$, template);
	}
})(window, function($, template) {
	/**
	 * Layer组件
	 * [Layer description]
	 */
	var Layer = function() {
		/**
		 * [defaultOption description]
		 * @type {Object}
		 */
		this.defaultOption = {
			// 标题
			title: "通知",
			// 用户自定义的class
			skin: "",
			// 是否显示头部
			header: true,
			// 是否是模态框
			overlayer: true,
			// 点击其他空白区域是否关闭layer
			swapping: false,
			// 是否支持拖拽
			draggable: false,
			// 弹层数据
			data: null,
			// 弹层模板地址
			url: "",
			// 按钮组
			buttons: [],
			// 设置动画
			animation: ["zoomIn", "zoomOut"]
		};
		this.init.apply(this, arguments);
	};

	/**
	 * [prototype description]
	 * @type {Object}
	 */
	Layer.prototype = {
		constructor: "Layer",
		/**
		 * 初始化
		 * [init description]
		 * @return {[type]} [description]
		 */
		init: function() {
			var _this = this;
			_this.layers = [];
			_this.noop = function() {
				console.log("The layer's closed. You didn't do anything...");
			};
		},
		/**
		 * 注册事件
		 * [_bindEvent description]
		 * @return {[type]} [description]
		 */
		_bindEvent: function() {
			var _this = this;
			// 关闭按钮
			$("body").on("click", ".best-layer-close", function() {
				var _pid = $(this).closest(".best-layer").data("layerid");
				if (!_pid) return;
				_this.close(_pid);
			});
			// 按钮组
			$("body").on("click", ".best-layer-button", function() {
				var _idx = $(this).index(),
					_pid = $(this).closest(".best-layer").data("layerid"),
					_btn = _this.option.buttons[_idx],
					_handler = _btn && _btn.handler || _this.noop;
				// 执行按钮相关回调，并关闭layer
				_btn && (_handler.call(_this) !== false) && _this.close(_pid);
			});
			// 空白区域
			$("body").on("click", ".best-layer-overlayer", function() {
				var _swapping = _this.option.swapping;
				if (typeof _swapping === "boolean" && _swapping) {
					_this.close($(this).closest(".best-layer").data("layerid"));
				}
			});
			// 窗口尺寸重置
			$(window).resize(function() {
				// 只有非拖拽模式下，才可以启用窗口重置功能
				if (!_this.option.draggable) {
					var _layers = _this.layers;
					// 窗口内的全部layer均重置
					for (var i = 0, len = _layers.length; i < len; i++) {
						_this._setpos(_layers[i].find(".best-layer-core"));
					}
				}
			});
		},
		/**
		 * 打开
		 * [open description]
		 * @return {[type]} [description]
		 */
		open: function() {
			var _this = this;
			_this.option = $.extend({}, _this.defaultOption, arguments[0]);
			_this._bindEvent();
			// 异步加载模板文件
			$.get(_this.option.url, function(tpl) {
				if (!tpl) return;
				_this.tpl = tpl;
				_this._render();
			});
		},
		/**
		 * 关闭
		 * [close description]
		 * @param  {[type]} pid [description]
		 * @return {[type]}     [description]
		 */
		close: function(pid) {
			var _this = this,
				_layer = null;

			for (var i = 0, len = _this.layers.length; i < len; i++) {

				_layer = _this.layers[i];
				_layerid = _layer.data("layerid");

				if (_layerid === pid) {
					_layer.find(".best-layer-core").toggleClass(_this.toggleAnimation);

					_layer.find(".best-layer-overlayer").animate({
							opacity: 0,
						},290);
					// 销毁layer对象
					var timer = setTimeout(function() {
						_layer.remove();
						clearTimeout(timer);
					}, 290);

					_this.layers.splice(i, 1);
				}
				if (_this.layerid === pid) {
					delete _this.layerid;
				}
			}
		},
		/**
		 * 渲染layer
		 * [_render description]
		 * @return {[type]} [description]
		 */
		_render: function() {
			var _this = this,
				// 获取layer对象
				curLayer = _this._assemble();

			if (!curLayer.length) return;
			var _layerCore = curLayer.find(".best-layer-core");

			$("body").append(curLayer);

			// 是否支持可拖拽
			if (_this.option.draggable) {
				_this._drag(_layerCore);
			}

			// 定位layer
			_this._setpos(_layerCore);

			_this.layers.push(curLayer);
		},
		/**
		 * 组装数据
		 * [_assemble description]
		 * @return {[type]} [description]
		 */
		_assemble: function() {
			var _this = this,
				layerArr = [],
				// 编译模板
				tpl = _this._compile();
			// layer的id
			_this.layerid = (+new Date());

			if (!tpl) return;

			_this.toggleAnimation = _this.option.animation.join(" ");

			layerArr = ["<div class='best-layer " + _this.option.skin + "' data-layerid=" + _this.layerid + "><!-- 弹层核心 --><div class='best-layer-core animation " + _this.option.animation[0] + "'>"];
			layerArr.push(_this.option.header ? "<!-- 弹层header --><div class='best-layer-core-header'><div class='best-layer-core-header-title'>" + _this.option.title + "</div><div class='best-layer-core-header-close best-layer-close'></div></div>" : "");
			layerArr.push("<!-- 弹层body --><div class='best-layer-core-body'>" + tpl + "</div>");
			layerArr.push("<!-- 弹层footer --><div class='best-layer-core-footer'>" + _this._drawbutton() + "</div>");
			layerArr.push("</div><!-- / End 弹层核心 -->" + (_this.option.overlayer ? "<!--遮罩层--><div class='best-layer-overlayer'></div><!-- / End 遮罩层 -->" : "") + "</div>");

			return $(layerArr.join(""));
		},
		/**
		 * 编译模板
		 * [_compile description]
		 * @return {[type]} [description]
		 */
		_compile: function() {
			var _this = this,
				tpl = _this.tpl,
				data = _this.option.data;
			return $.trim(tpl) ? template.compile(tpl)(data || "") : "";
		},
		/**
		 * 绘制按钮
		 * [_drawbutton description]
		 * @return {[type]} [description]
		 */
		_drawbutton: function() {
			var _this = this,
				_arr = _this.option.buttons,
				_buttons = [];

			for (var i = 0, len = _arr.length; i < len; i++) {
				_buttons.push("<a href='javascript:;' class='best-layer-button button " + _arr[i].skin + "'>" + _arr[i].text + "</a>");
			}
			return _buttons.join("");
		},
		/**
		 * 设置layer位置
		 * [_setpos description]
		 * @return {[type]} [description]
		 */
		_setpos: function($layer) {
			var l = ($(window).outerWidth() - $layer.outerWidth()) / 2,
				t = ($(window).outerHeight() - $layer.outerHeight()) / 2;

			// 赋值top、left 
			$layer.css({
				left: l,
				top: t
			});
		},
		/**
		 * 拖拽
		 * [_drag description]
		 * @param  {[type]} obj [description]
		 * @return {[type]}     [description]
		 */
		_drag: function(obj) {
			var _this = this;

			if (!(obj instanceof jQuery)) return;
			// 鼠标按下时
			obj.mousedown(function(event) {

				var $this = $(this),
					disX = event.pageX - $this.offset().left,
					disY = event.pageY - $this.offset().top,
					maxl = $(window).outerWidth() - $this.outerWidth(),
					maxt = $(window).outerHeight() - $this.outerHeight(),
					minl = 0,
					mint = 0;

				// 鼠标移动时
				$(document).mousemove(function(event) {
					var l = event.pageX - disX,
						t = event.pageY - disY;

					// 计算可移动范围区间 
					l = _this._range(maxl, minl, l);
					t = _this._range(maxt, mint, t);

					// 重新赋值
					$this.css({
						left: l,
						top: t
					});
				});

				// 鼠标松开时
				$(document).mouseup(function() {
					$(this).off();
				});

				return false;
			});
		},
		_range: function(max, min, val) {
			return val < min ? min : (val > max ? max : val);
		}
	};
	/**
	 * [alert description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	Layer.alert = function(options) {
		new Layer().open({
			title: options.title,
			skin: options.skin || "best-layer-alert",
			data: options.data,
			url: "/template/alert.tpl.html",
			buttons: [{
				text: "确 定",
				skin: "button-primary button-h-30",
				handler: options.confirm
			}]
		});
	};
	/**
	 * [confirm description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	Layer.confirm = function(options) {
		new Layer().open({
			title: options.title,
			skin: options.skin || "best-layer-confirm",
			data: options.data,
			url: "/template/confirm.tpl.html",
			buttons: [{
				text: "确 定",
				skin: "button-primary button-h-30",
				handler: options.confirm
			}, {
				text: "取 消",
				skin: "button-primary button-h-30 button-outline",
				handler: options.cancel
			}]
		});
	};
	/**
	 * [prompt description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	Layer.prompt = function(options) {
		new Layer().open({
			title: options.title,
			skin: options.skin || "best-layer-prompt",
			data: options.data,
			url: "/template/prompt.tpl.html",
			buttons: [{
				text: "确 定",
				skin: "button-primary button-h-30",
				handler: options.confirm
			}, {
				text: "取 消",
				skin: "button-primary button-h-30 button-outline",
				handler: options.cancel
			}]
		});
	};
	/**
	 * [Layer description]
	 * @type {[type]}
	 */
	this.Layer = Layer;

});