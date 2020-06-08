function compatible(works_min, works_max, tweak_compatibility) {
    let currentiOS = parseFloat(('' + (/CPU.*OS ([0-9_]{1,})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', ''));
    works_min = numerize(works_min);
    works_max = numerize(works_max);
    let el = document.querySelector(".compatibility");
    if (currentiOS < works_min) {
        el.innerHTML = "【系统兼容】此插件仅兼容：" + tweak_compatibility;
        el.classList.add("red")
    } else if (currentiOS > works_max) {
        el.innerHTML = "【系统兼容】此插件仅兼容：" + tweak_compatibility ;
        el.classList.add("red")
    } else if (String(currentiOS) != "NaN") {
        el.innerHTML = "【系统兼容】您的系统可以兼容此插件";
        el.classList.add("green")
    }
}
function numerize(x) {
    return x.substring(0, x.indexOf(".")) + "." + x.substring(x.indexOf(".") + 1).replace(".", "")
}
function swap(hide, show) {
    for (var i = document.querySelectorAll(hide).length - 1; i >= 0; i--) {
        document.querySelectorAll(hide)[i].style.display = "none";
    }
    for (var i = document.querySelectorAll(show).length - 1; i >= 0; i--) {
        document.querySelectorAll(show)[i].style.display = "block";
    }
    document.querySelector(".nav_btn" + show + "_btn").classList.add("active");
    document.querySelector(".nav_btn" + hide + "_btn").classList.remove("active")
}

function externalize() {
    for (var i = document.querySelectorAll("a").length - 1; i >= 0; i--) {
        document.querySelectorAll("a")[0].setAttribute("target", "blank")
    }
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

function Loading(source,name) {
    $.ajax({
        type: "get",  //默认get
        url: "../Page/Cydia/com." + source + "." + name + ".json",  //默认当前页
        data: "data",  //格式{key:value}
        dataType: "json",
        beforeSend: function () { }, //请求发送前回调,常用验证
        success: function (response) {  //请求成功回调
            var json = response[0];
			var edition = json.info_text_3;
			var consequence = edition.match(/\d+(\.\d+\.\d+|\.\d+|\d+|)/g);
    		compatible(consequence[0], consequence[1], "IOS " + consequence[0] + " - " + consequence[1]);
    		externalize();
            $("title").html(json.name);
            $('#describe').html(json.describe);
            $('#screenshot').html(json.screenshot);
            $('#info-h4').html(json.info_h4);
            $('#info-p-describe').html(json.info_p_describe);
            $('#info-h3').html(json.info_h3);
            $('#info-title-1').html(json.info_title_1);
            $('#info-text-1').html(json.info_text_1);
            $('#info-title-2').html(json.info_title_2);
            $('#info-text-2').html(json.info_text_2);
            $('#info-title-3').html(json.info_title_3);
            $('#info-text-3').html(json.info_text_3);
            $('#info-title-4').html(json.info_title_4);
            $('#info-text-4').html(json.info_text_4);
            $('#info-title-5').html(json.info_title_5);
            $('#info-text-5').html(json.info_text_5);
            $('#info-title-6').html(json.info_title_6);
            $('#info-text-6').html(json.info_text_6);
            $('#Screenshot-1').attr('src', json.Screenshot_1);
            $('#Screenshot-2').attr('src', json.Screenshot_2);
            $('#Screenshot-3').attr('src', json.Screenshot_3);
            var head_img = "url(" + json.head_img + ")"
            $('#head').css("background-image", head_img);

        },
        error: function (e) {  //请求超时回调
            if (e.statusText == "timeout") {
                alert("请求超时")
            }
            if (e.statusText == "Not Found") {
                location.href = "../../404.html";
            }
        },
        complete: function () {
		}, //无论请求是成功还是失败都会执行的回调，常用全局成员的释放，或者页面状态的重置
    });
}

