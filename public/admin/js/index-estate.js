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
            title : "物业首页",
            icon_class : "fa fa-building-o",
            selected : false,
            btn_props : "data-toggle='iframelinker' data-link='estate.html'"
        },
        {
            title : "租赁信息",
            icon_class : "fa fa-tags",
            selected : false,
            submenu : [
                {
                    title : "租赁信息管理",
                    icon_class : "fa fa-tags",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-rent.html'"
                },
                {
                    title : "租金及物业费",
                    icon_class : "fa fa-money",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-rent-fee.html'"
                },
                {
                    title : "收费类型管理",
                    icon_class : "fa fa-money",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-rent-fee-type.html'"
                },
                {
                    title : "合同管理",
                    icon_class : "fa fa-clipboard",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-rent-contract.html'"
                },
                {
                    title : "租赁押金管理",
                    icon_class : "fa fa-money",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-rent-deposit.html'"
                }
            ]
        },
        {
            title : "仓库管理",
            icon_class : "fa fa-cubes",
            selected : false,
            submenu : [
                {
                    title : "采购申请",
                    icon_class : "fa fa-shopping-cart",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-stock-purchase.html'"
                },
                {
                    title : "固定资产",
                    icon_class : "fa fa-cubes",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-stock-assets.html'"
                },
                {
                    title : "入库管理",
                    icon_class : "fa fa-sign-in",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-stock-storage.html'"
                },
                {
                    title : "领用申请",
                    icon_class : "fa fa-hand-stop-o",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-stock-apply.html'"
                },
                {
                    title : "仓库预览",
                    icon_class : "fa fa-eye",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-stock-preview.html'"
                },
                {
                    title : "物品类型管理",
                    icon_class : "fa fa-files-o",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-stock-restype.html'"
                }
            ]
        },
        {
            title : "装修管理",
            icon_class : "fa fa-gavel",
            selected : false,
            btn_props : "data-toggle='iframelinker' data-link='estate-decoration.html'"
        },
        {
            title : "收费缴费",
            icon_class : "fa fa-money",
            selected : false,
            submenu : [
                {
                    title : "物业费管理",
                    icon_class : "fa fa-money",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-fee.html'"
                },
                {
                    title : "催缴名单",
                    icon_class : "fa fa-users",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-arrear-list.html'"
                }
            ]
        },
        {
            title : "保修维修",
            icon_class : "fa fa-wrench",
            selected : false,
            submenu : [
                {
                    title : "保修管理",
                    icon_class : "fa fa-wrench",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-repair.html'"
                },
                {
                    title : "维修费管理",
                    icon_class : "fa fa-money",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-repair-fee.html'"
                }
            ]
        },
        {
            title : "保洁绿化",
            icon_class : "fa fa-recycle",
            selected : false,
            submenu : [
                {
                    title : "保洁卫生",
                    icon_class : "fa fa-recycle",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-cleaning.html'"
                },
                {
                    title : "保洁服务类型",
                    icon_class : "fa fa-list",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-cleaning-type.html'"
                },
                {
                    title : "绿植管理",
                    icon_class : "fa fa-leaf",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-greening.html'"
                }
            ]
        },
        {
            title : "会展管理",
            icon_class : "fa fa-bank",
            selected : false,
            submenu : [
                {
                    title : "信息管理",
                    icon_class : "fa fa-bank",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-conference-info.html'"
                },
                {
                    title : "租赁管理",
                    icon_class : "fa fa-tags",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-conference-rent.html'"
                },
                {
                    title : "增值服务",
                    icon_class : "fa fa-money",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-conference-addvalue.html'"
                }
            ]
        },
        {
            title : "配送服务",
            icon_class : "fa fa-bicycle",
            selected : false,
            submenu : [
                {
                    title : "信息管理",
                    icon_class : "fa fa-bicycle",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-delivery-info.html'"
                },
                {
                    title : "订单管理",
                    icon_class : "fa fa-file-text",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-delivery-order.html'"
                }
            ]
        },
        {
            title : "园区安防",
            icon_class : "fa fa-desktop",
            selected : false,
            submenu : [
                {
                    title : "监控管理",
                    icon_class : "fa fa-desktop",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-security-monitor.html'"
                },
                {
                    title : "报警提醒",
                    icon_class : "fa fa-exclamation-triangle",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-security-alert.html'"
                }
            ]
        },
        {
            title : "车辆管理",
            icon_class : "fa fa-car",
            selected : false,
            btn_props : "data-toggle='iframelinker' data-link='estate-vehicle.html'"
        },
        {
            title : "能耗统计",
            icon_class : "fa fa-flash",
            selected : false,
            submenu : [
                {
                    title : "电力查询",
                    icon_class : "fa fa-flash",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-consume-electricity.html'"
                },
                {
                    title : "耗水查询",
                    icon_class : "fa fa-shower",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='estate-consume-water.html'"
                }
            ]
        }
    ];
    //移动端菜单数据
    var menuData_m = [
        {
            title : "物业首页",
            icon_class : "fa fa-building-o",
            selected : false,
            btn_props : "data-toggle='iframelinker' data-link='estate.html'"
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