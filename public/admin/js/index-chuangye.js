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
            title : "创业首页",
            icon_class : "fa fa-flag-o",
            selected : false,
            btn_props : "data-toggle='iframelinker' data-link='chuangye.html'"
        },
        {
            title : "成果展示",
            icon_class : "fa fa-trophy",
            selected : false,
            submenu : [
                {
                    title : "成果展示",
                    icon_class : "fa fa-trophy",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-achieve.html'"
                },
                {
                    title : "成果展示发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-achieve-new.html'"
                }
            ]
        },
        {
            title : "产品展厅",
            icon_class : "fa fa-bank",
            selected : false,
            submenu : [
                {
                    title : "产品展厅",
                    icon_class : "fa fa-bank",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-product.html'"
                },
                {
                    title : "产品展厅发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-product-new.html'"
                }
            ]
        },
        {
            title : "创业辅导",
            icon_class : "fa fa-map-signs",
            selected : false,
            submenu : [
                {
                    title : "创业辅导",
                    icon_class : "fa fa-map-signs",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-coach.html'"
                },
                {
                    title : "创业辅导发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-coach-new.html'"
                }
            ]
        },
        {
            title : "创业导师",
            icon_class : "fa fa-mortar-board",
            selected : false,
            submenu : [
                {
                    title : "创业导师",
                    icon_class : "fa fa-mortar-board",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-teacher.html'"
                },
                {
                    title : "创业导师发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-teacher-new.html'"
                }
            ]
        },
        {
            title : "创业培训",
            icon_class : "fa fa-book",
            selected : false,
            submenu : [
                {
                    title : "创业培训",
                    icon_class : "fa fa-book",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-train.html'"
                },
                {
                    title : "创业培训发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-train-new.html'"
                }
            ]
        },
        {
            title : "创业路演",
            icon_class : "fa fa-road",
            selected : false,
            submenu : [
                {
                    title : "创业路演",
                    icon_class : "fa fa-road",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-roadshow.html'"
                },
                {
                    title : "创业路演发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-roadshow-new.html'"
                }
            ]
        },
        {
            title : "专家讲座",
            icon_class : "fa fa-signing",
            selected : false,
            submenu : [
                {
                    title : "专家讲座",
                    icon_class : "fa fa-signing",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-lecture.html'"
                },
                {
                    title : "专家讲座发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-lecture-new.html'"
                }
            ]
        },
        {
            title : "中外对接",
            icon_class : "fa fa-asl-interpreting",
            selected : false,
            submenu : [
                {
                    title : "中外对接",
                    icon_class : "fa fa-asl-interpreting",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-dock.html'"
                },
                {
                    title : "中外对接发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-dock-new.html'"
                }
            ]
        },
        {
            title : "企业沙龙",
            icon_class : "fa fa-coffee",
            selected : false,
            submenu : [
                {
                    title : "企业沙龙",
                    icon_class : "fa fa-coffee",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-salon.html'"
                },
                {
                    title : "企业沙龙发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-salon-new.html'"
                }
            ]
        },
        {
            title : "技术交流",
            icon_class : "fa fa-commenting",
            selected : false,
            submenu : [
                {
                    title : "技术交流",
                    icon_class : "fa fa-commenting",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-commu.html'"
                },
                {
                    title : "技术交流发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-commu-new.html'"
                }
            ]
        },
        {
            title : "创业空间",
            icon_class : "fa fa-cubes",
            selected : false,
            submenu : [
                {
                    title : "创业空间",
                    icon_class : "fa fa-cubes",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-space.html'"
                },
                {
                    title : "创业空间发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-space-new.html'"
                }
            ]
        },
        {
            title : "创业扶持",
            icon_class : "fa fa-life-saver",
            selected : false,
            submenu : [
                {
                    title : "创业扶持",
                    icon_class : "fa fa-life-saver",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-help.html'"
                },
                {
                    title : "创业扶持发布",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='chuangye-help-new.html'"
                }
            ]
        }
    ];
    //移动端菜单数据
    var menuData_m = [
        {
            title : "创业首页",
            icon_class : "fa fa-flag-o",
            selected : false,
            btn_props : "data-toggle='iframelinker' data-link='chuangye.html'"
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
    
    //手机端，当点击链接按钮（非文件夹式按钮）时，延迟半秒收回菜单
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