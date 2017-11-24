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
            title : "招商管理首页",
            icon_class : "fa fa-handshake-o",
            selected : false,
            btn_props : "data-toggle='iframelinker' data-link='merchant.html'"
        },
        {
            title : "招商信息",
            icon_class : "fa fa-newspaper-o",
            selected : false,
            submenu : [
                {
                    title : "招商信息",
                    icon_class : "fa fa-newspaper-o",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='merchant-info.html'"
                },
                {
                    title : "招商信息发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='merchant-info-new.html'"
                },
                {
                    title : "招商信息状态",
                    icon_class : "fa fa-sliders",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='merchant-info-state.html'"
                }
            ]
        },
        {
            title : "企业信息",
            icon_class : "fa fa-clipboard",
            selected : false,
            submenu : [
                {
                    title : "企业信息",
                    icon_class : "fa fa-clipboard",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='merchant-orginfo.html'"
                },
                {
                    title : "企业信息录入",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='merchant-orginfo-new.html'"
                },
                {
                    title : "意向企业信息录入",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='merchant-orginfo-new-intent.html'"
                },
                {
                    title : "未签约企业信息录入",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='merchant-orginfo-new-nosign.html'"
                },
                {
                    title : "企业类别",
                    icon_class : "fa fa-list-alt",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='merchant-orginfo-cat.html'"
                }
            ]
        },
        {
            title : "合同管理",
            icon_class : "fa fa-file-text",
            selected : false,
            submenu : [
                {
                    title : "合同管理",
                    icon_class : "fa fa-file-text",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='merchant-contract.html'"
                },
                {
                    title : "合同录入",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='merchant-contract-new.html'"
                }
            ]
        },
        {
            title : "报表统计",
            icon_class : "fa fa-pie-chart",
            selected : false,
            submenu : [
                {
                    title : "入驻企业统计",
                    icon_class : "fa fa-line-chart",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='merchant-statistic-settled.html'"
                },
                {
                    title : "企业类型统计",
                    icon_class : "fa fa-bar-chart",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='merchant-statistic-cat.html'"
                },
                {
                    title : "招商面积统计",
                    icon_class : "fa fa-pie-chart",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='merchant-statistic-area.html'"
                }
            ]
        },
    ];
    //移动端菜单数据
    var menuData_m = [
        {
            title : "招商管理首页",
            icon_class : "fa fa-handshake-o",
            selected : false,
            btn_props : "data-toggle='iframelinker' data-link='merchant.html'"
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