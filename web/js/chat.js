;$(function () {
    /**
     * @method polyfill
     */
    Object.defineProperties = function(obj, properties) {
        function convertToDescriptor(desc) {
            function hasProperty(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            }
            function isCallable(v) {
                // NB: modify as necessary if other values than functions are callable.
                return typeof v === 'function';
            }

            if (typeof desc !== 'object' || desc === null)
                throw new TypeError('bad desc');

            var d = {};

            if (hasProperty(desc, 'enumerable'))
                d.enumerable = !!desc.enumerable;
            if (hasProperty(desc, 'configurable'))
                d.configurable = !!desc.configurable;
            if (hasProperty(desc, 'value'))
                d.value = desc.value;
            if (hasProperty(desc, 'writable'))
                d.writable = !!desc.writable;
            if (hasProperty(desc, 'get')) {
                var g = desc.get;

                if (!isCallable(g) && typeof g !== 'undefined')
                    throw new TypeError('bad get');
                d.get = g;
            }
            if (hasProperty(desc, 'set')) {
                var s = desc.set;
                if (!isCallable(s) && typeof s !== 'undefined')
                    throw new TypeError('bad set');
                d.set = s;
            }

            if (('get' in d || 'set' in d) && ('value' in d || 'writable' in d))
                throw new TypeError('identity-confused descriptor');

            return d;
        }

        if (typeof obj !== 'object' || obj === null)
            throw new TypeError('bad obj');

        properties = Object(properties);

        var keys = Object.keys(properties);
        var descs = [];

        for (var i = 0; i < keys.length; i++)
            descs.push([keys[i], convertToDescriptor(properties[keys[i]])]);

        for (var i = 0; i < descs.length; i++)
            Object.defineProperty(obj, descs[i][0], descs[i][1]);

        return obj;
    }
    /**
     * @格式化时间
     */
    function crtTimeFtt(value, row, index) {
        var crtTime = new Date(value);
        function dateFtt(fmt, date) { //author: meizz
            var o = {
                "M+": date.getMonth() + 1,                 //月份
                "d+": date.getDate(),                    //日
                "h+": date.getHours(),                   //小时
                "m+": date.getMinutes(),                 //分
                "s+": date.getSeconds(),                 //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds()             //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }

        return dateFtt("yyyy-MM-dd hh:mm:ss", crtTime);
    }

    /**
     * @Test
     */
    if ("undefined" == typeof io) {
        var socket = {};
        socket.on = function () {
        };
        socket.emit = function () {
        };
    } else {
        var socket = io();
    }
    /**
     * @从url获取聊天双方的id
     */
    var ie = navigator.userAgent.indexOf("compatible") > -1 && navigator.userAgent.indexOf("MSIE") > -1;
    var query = {},
        container = $(".mCSB_container"),
        FILE = $("#upload"),
        TEXT = $('#userMessage');
    if (window.location.href.indexOf("?") > -1) {
        window.location.href.split("?")[1].split("&").forEach(function (item) {
            query[item.split("=")[0]] = item.split("=")[1];
        });
    }
    var id = query.uid,
        chats = {me: null, he: null},
        me = null, he = null,
        TO = query.to;

    /**
     * @渲染单条信息
     */
    function renderLine(data) {
        var template = '<div class="me clearfix">\n' +
            '                        <div class="user">\n' +
            '                            <div class="avatar">\n' +
            '                                <img src="./images/avatar_f_1.png" class="mCS_img_loaded">\n' +
            '                                <span class="user-status online"></span>\n' +
            '                            </div>\n' +
            '                            <div class="username"><a href="#">nuoee</a></div>\n' +
            '                            <div class="content-info">\n' +
            '                                <time datetime="2018-04-26 11:37:04">' +
            '                                   2018-04-26 11:37:04</time>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div class="content-box">\n' +
            '                            <div class="content-body">\n' +
            '                                <div class="content-text"></div>\n' +
            '                                <div class="content-read">已读</div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>';
        var n = $(template);
        if(data.msg){//消息实体
            n.find(".content-text").text(data.msg)
        }else {
            n.find(".content-text").html('<img src="" alt="" />');
        }
        if(data.date){ // 时间
            n.find("time").text(data.date)
        }
        container.append(n);
    }

    /**
     * @渲染聊天记录
     * @param initData
     */
    function renderList(initData) {
        var all = [];
        initData.me.forEach(function (item) {
            all.push(item)
        });
        initData.he.forEach(function (item) {
            all.push(item)
        });
        all.sort(function (a, b) {
            return a.stamp - b.stamp
        }).forEach(function (item) {
            renderLine(data);
        })
    };

    /**
     * @get data from redis
     */
    socket.emit('chat init', {id: query.uid, to: TO});

    Object.defineProperties(chats, {
        'me': {
            set: function (v) {
                me = v;
                if (chats.he) {
                    renderList(chats)
                }
            },
            get: function () {
                return me;
            }
        },
        'he': {
            set: function (v) {
                he = v;
                if (chats.me) {
                    renderList(chats)
                }
            },
            get: function () {
                return he;
            }
        }
    });

    socket.on('chat init', function (data) {
        if (data.id === id || data.id === TO) {
            chats[data.id === id ? 'me' : 'he'] = data.data;
        }
    });
    /**
     * @发送信息
     */
    $('.chat_send').on("click", function () {
        var file = FILE[0].files[0];
        var pattern = /(\.*.jpg$)|(\.*.png$)|(\.*.jpeg$)|(\.*.gif$)|(\.*.bmp$)/;
        if (file) { //发送图片
            if (!pattern.test(FILE[0].value)) {
                alert("请上传jpg/jpeg/png/gif/bmp格式的照片！");
                FILE[0].value = '';
                return false;
            }
            if (ie) {
                var realPath, xmlHttp, xml_dom, tmpNode, imgBase64Data;
                realPath = FILE[0].value;
                xmlHttp = new ActiveXObject("MSXML2.XMLHTTP");
                xmlHttp.open("POST", realPath, false);
                xmlHttp.send("");
                xml_dom = new ActiveXObject("MSXML2.DOMDocument");
                tmpNode = xml_dom.createElement("tmpNode");
                tmpNode.dataType = "bin.base64";
                tmpNode.nodeTypedValue = xmlHttp.responseBody;
                imgBase64Data = "data:image/bmp;base64," + tmpNode.text.replace(/\n/g, "");
                var data = {
                    img: imgBase64Data,
                    id: id,
                    date: crtTimeFtt(new Date()),
                    stamp: new Date().getTime()
                };
                socket.emit('chat', data);
                FILE[0].value = ''
            } else {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    var data = {
                        img: this.result,
                        id: id,
                        date: crtTimeFtt(new Date()),
                        stamp: new Date().getTime()
                    };
                    console.log(data)
                    socket.emit('chat', data);
                    FILE[0].value = ''
                }
            }
        }
        if (TEXT.val()) { // 发送文本消息
            renderLine({msg: TEXT.val()});
            socket.emit('chat',
                {
                    id: id, date: crtTimeFtt(new Date()),
                    msg: TEXT.val(), stamp: new Date().getTime()
                }
            );
            TEXT.val('');
        }
    });
    /**
     * @收到文本消息
     */
    socket.on('chat', function (data) {
        if (data.id === id || data.id === TO) {
            renderLine(data)
        }
    });
});