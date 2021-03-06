$(document).ready(function(){

    var isMobile = device.mobile();
    var isTouch = device.mobile() || device.tablet();
    
    //触摸设备使用iScroll插件，非触摸设备使用perfectScrollbar插件
    if(isTouch) {
        //创建左侧菜单iscroll实例
        var menuScroll = new IScroll('#menu_container', {
            scrollbars: 'custom',
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true,
            click: app.iScrollClick()
        });
    } else {
        $('#menu_container').perfectScrollbar({
            suppressScrollX:true
        });
    }

    //菜单数据示例
    var menuData = [
        {
            title : "运营首页",
            icon_class : "fa fa-line-chart",
            selected : false,
            btn_props : "data-toggle='iframelinker' data-link='operate.html'"
        },
        {
            title : "商家资讯",
            icon_class : "fa fa-newspaper-o",
            selected : false,
            submenu : [
                {
                    title : "商家资讯",
                    icon_class : "fa fa-newspaper-o",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-bizinfo.html'"
                },
                {
                    title : "商家资讯发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-bizinfo-new.html'"
                }
            ]
        },
        {
            title : "新闻中心",
            icon_class : "fa fa-newspaper-o",
            selected : false,
            submenu : [
                {
                    title : "新闻中心",
                    icon_class : "fa fa-newspaper-o",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-news-center.html'"
                },
                {
                    title : "新闻中心发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-news-center-new.html'"
                }
            ]
        },
        {
            title : "通知",
            icon_class : "fa fa-bullhorn",
            selected : false,
            submenu : [
                {
                    title : "通知",
                    icon_class : "fa fa-bullhorn",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-notice.html'"
                },
                {
                    title : "通知发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-notice-new.html'"
                }
            ]
        },
        {
            title : "公告",
            icon_class : "fa fa-clipboard",
            selected : false,
            submenu : [
                {
                    title : "公告",
                    icon_class : "fa fa-clipboard",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-announce.html'"
                },
                {
                    title : "公告发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-announce-new.html'"
                }
            ]
        },
        {
            title : "园区企业",
            icon_class : "fa fa-building",
            selected : false,
            submenu : [
                {
                    title : "明星企业",
                    icon_class : "fa fa-star",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-orgstar.html'"
                },
                {
                    title : "新增明星企业",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-orgstar-new.html'"
                },
                {
                    title : "创业领军企业",
                    icon_class : "fa fa-trophy",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-orglead.html'"
                },
                {
                    title : "新增创业领军企业",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-orglead-new.html'"
                }
            ]
        },
        {
            title : "关于我们",
            icon_class : "fa fa-user-circle",
            selected : false,
            submenu : [
                {
                    title : "园区简介",
                    icon_class : "fa fa-vcard",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-about-intro.html'"
                },
                {
                    title : "组织架构",
                    icon_class : "fa fa-sitemap",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-about-struct.html'"
                },
                {
                    title : "大事记",
                    icon_class : "fa fa-calendar-check-o",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-about-history.html'"
                },
                {
                    title : "园区规划",
                    icon_class : "fa fa-map",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-about-plan.html'"
                },
                {
                    title : "园区文化",
                    icon_class : "fa fa-heartbeat",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-about-culture.html'"
                },
                {
                    title : "联系方式",
                    icon_class : "fa fa-phone",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-about-contact.html'"
                }
            ]
        },
        {
            title : "政策支持",
            icon_class : "fa fa-check-square",
            selected : false,
            submenu : [
                {
                    title : "政策支持",
                    icon_class : "fa fa-check-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-policy.html'"
                },
                {
                    title : "政策支持发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-policy-new.html'"
                }
            ]
        },
        {
            title : "园区服务",
            icon_class : "fa fa-support",
            selected : false,
            submenu : [
                {
                    title : "园区配套",
                    icon_class : "fa fa-support",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-service-support.html'"
                },
                {
                    title : "新增园区配套",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-service-support-new.html'"
                },
                {
                    title : "园区生活",
                    icon_class : "fa fa-coffee",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-service-life.html'"
                },
                {
                    title : "新增园区生活",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-service-life-new.html'"
                },
                {
                    title : "园区活动",
                    icon_class : "fa fa-suitcase",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-service-activity.html'"
                },
                {
                    title : "新增园区活动",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-service-activity-new.html'"
                }
            ]
        },
        {
            title : "轮播图",
            icon_class : "fa fa-image",
            selected : false,
            submenu : [
                {
                    title : "轮播图",
                    icon_class : "fa fa-image",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-slider.html'"
                },
                {
                    title : "新增轮播图",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-slider-new.html'"
                }
            ]
        },
        {
            title : "广告位",
            icon_class : "fa fa-file-image-o",
            selected : false,
            submenu : [
                {
                    title : "广告位",
                    icon_class : "fa fa-file-image-o",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-adv.html'"
                },
                {
                    title : "新增广告位",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-adv-new.html'"
                }
            ]
        },
        {
            title : "企业招聘",
            icon_class : "fa fa-user-plus",
            selected : false,
            submenu : [
                {
                    title : "企业招聘",
                    icon_class : "fa fa-user-plus",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-recruit.html'"
                },
                {
                    title : "企业招聘发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='operate-recruit-new.html'"
                }
            ]
        },
        {
            title : "第三方服务商申请",
            icon_class : "fa fa-cubes",
            selected : false,
            btn_props : "data-toggle='iframelinker' data-link='operate-thirdparty-apply.html'"
        }
    ];
    //移动端菜单数据
    var menuData_m = [
        {
            title : "运营首页",
            icon_class : "fa fa-line-chart",
            selected : false,
            btn_props : "data-toggle='iframelinker' data-link='operate.html'"
        }
    ];
    //移动端内容相对PC端更精简，因此移动端和PC端分别加载不同的菜单数据
    var mData = isMobile ? menuData_m : menuData;
    //创建左侧菜单treeMenu实例
    $('#tree_menu').treeMenu({
        //jsonPath 通过ajax加载菜单数据,json格式参见tmenu.json
        //jsonPath : '/data/tmenu.json',
        
        //jsonData 通过js对象加载菜单数据
        jsonData : mData,
        
        tmBtnAddon : "<div class='sel-arrow'></div>",
        
        foldUnselected : true, //点击切换菜单时，折叠未被选中的菜单，默认false
        onlyFolderAction : true,
        autoSelect : false,
        
        afterInit :afterTMInit,
        onFolderBtnClick : onFolderBtnClick,
        onLinkBtnClick : onLinkBtnClick
    });
    
    //移动模式下隐藏/显示菜单
    $('#menu_btn').on('click tap', function(){showMenu();});
    $('#menu_mask').on('click tap touchend', function(){hideMenu();});
    
    //窗口大小变化时
    $(window).resize(function() {
        refreshScroll();
        if(isMobile) hideMenu();
    });
    
    //菜单初始化后触发事件
    function afterTMInit() {
        refreshScroll();
        //绑定iframeLinkChanged事件，iframe的src地址改变时，触发菜单改变选中的按钮
        $('body').bind('iframeLinkChanged', function(evt, iframelink){
            var el_tmenu_btns = $('#tree_menu').find('[data-link="' + iframelink +'"]');
            if(el_tmenu_btns.length == 0) {
                //TODO 设置sub-data-link匹配子页面，使访问某一功能的子页面时，菜单仍能定位并选中该功能页面对应的菜单按钮
                //$.trim(str) 字符串去掉前后空格
                //var tmbtns = $('#tree_menu').find('.tmenu-btn');
                //alert(tmbtns.length);
                //实现此功能牵扯到大范围修改json数据格式，功能效果并不明显，所以不再添加此功能 2017.10.27
            } else {
                $('#tree_menu').trigger('tmenu.changeSel',[$('#tree_menu').find('[data-link="' + iframelink +'"]')]);
            }
        });
        //初始化iframe链接插件，必须在绑定iframeLinkChanged事件之后
        app.setIframeLinker('.main-iframe', true, 'iframelinker');
    }
    
    //菜单按钮按下触发事件
    function onFolderBtnClick() {
        refreshScroll();
    }
    
    //手机端，当点击非层级容器按钮时，延迟半秒收回菜单
    function onLinkBtnClick() {
        refreshScroll();
        if(isMobile) {
            setTimeout(function () {
                hideMenu();
            }, 500);
        }
    }
    
    //隐藏菜单
    function hideMenu() {
        $('#left_container').removeClass('show');
        $('#menu_mask').removeClass('show');
    }
    //显示菜单
    function showMenu() {
        $('#left_container').addClass('show');
        $('#menu_mask').addClass('show');
    }
    
    //刷新iscroll/perfectScrollbar插件
    function refreshScroll(){
        if(isTouch) {
            setTimeout(function () {
                menuScroll.refresh();
            }, 200);
        } else {
            $('#menu_container').perfectScrollbar('update');
        }
    }
});