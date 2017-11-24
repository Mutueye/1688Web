$(document).ready(function(){
    
    
    var $btn_new = $('#toolbtn_new');
    var $btn_edit = $('#toolbtn_edit');
    var $btn_preview = $('#toolbtn_preview');
    var $btn_remove = $('#toolbtn_remove');
    
    var $table = $('#table');
    
    $table.bootstrapTable({
        toolbar : '#toolbar',
        showColumns : true,
        showToggle : true,
        showExport : true,
        pagination : true,
        showPaginationSwitch : false,
        clickToSelect : true,
        columns: [
            {
                field: 'check',
                checkbox: true,
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'id',
                title: '序号',
                sortable: true,
                halign: 'center',
                align: 'right',
                width: 30
            }, 
            {
                field: 'item_name',
                title: '物品名称',
                halign: 'center'
            }, 
            {
                field: 'item_prop',
                title: '物品性质',
                halign: 'center'
            }, 
            {
                field: 'unit',
                title: '单位',
                sortable: true,
                halign: 'center'
            }, 
            {
                field: 'spec',
                title: '规格',
                halign: 'center'
            },
            {
                field: 'alert_num',
                title: '预警数量',
                sortable: true,
                halign: 'center',
                align: 'right'
            }, 
            {
                field: 'desc',
                title: '描述',
                halign: 'center'
            }
        ],
        data: [
            {
                id : 1,
                item_name : '45W节能灯',
                item_prop : '固定资产',
                unit : '盏',
                spec : '45W/220V',
                alert_num : '20',
                desc : '无'
            },
            {
                id : 2,
                item_name : '球形阀',
                item_prop : '易耗品',
                unit : '个',
                spec : '直径20CM不锈钢',
                alert_num : '5',
                desc : '无'
            }
        ]
    });
    
    //设置工具栏按钮禁用状态
    setToolBtnDisableState();
    $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        setToolBtnDisableState();
    });
    
    //新增&编辑弹窗的表单模板
    var modalHtml = "<div class='row-space-10'>" +
                        "<form class='row no-bottom'>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>物品性质：</div>" +
                                    "<select class='form-control' id='item_prop'>" +
                                    "</select>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>物品名称：</div>" +
                                    "<input class='form-control' type='text' id='item_name'>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>单位：</div>" +
                                    "<input class='form-control' type='text' id='unit'>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>规格：</div>" +
                                    "<input class='form-control' type='text' id='spec'>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>预警线：</div>" +
                                    "<input class='form-control' type='text' id='alert_num'>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>描述：</div>" +
                                    "<textarea class='form-control textarea' id='desc' rows='3'></textarea>" + 
                                "</div>" +
                            "</div>" +
                        "</form>" +
                    "</div>";
    
    //预览弹窗的表单模板
    var modalPreviewHtml = "<div class='row-space-10'>" +
                        "<div class='row no-bottom'>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>物品性质：</div>" +
                                    "<div class='cool-form-content'>易耗品</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>物品名称：</div>" +
                                    "<div class='cool-form-content'>45W节能灯</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>单位：</div>" +
                                    "<div class='cool-form-content'>盏</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>规格：</div>" +
                                    "<div class='cool-form-content'>45W/220V</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>预警数：</div>" +
                                    "<div class='cool-form-content'>5</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>描述：</div>" +
                                    "<div class='cool-form-content'>无<br>无</div>" + 
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>";
    
    //弹窗初始化后，给表单赋初始值,type区分新增或编辑
    function modalInit(type){
        
        //获取押金类型选项，此处直接给出用户前端展示
        var itemPropOptionData = [
            {
                value:'易耗品',
                text:'易耗品'
            },
            {
                value:'固定资产',
                text:'固定资产'
            }
        ];
        window.commonTools.addSelectOptions($('#item_prop'), itemPropOptionData);
        
        if(type == '新增') {
            //新增弹窗需要处理的一些逻辑
        } else if(type == '编辑') {
            //编辑弹窗需要处理的一些逻辑，比如载入初始表单数据
        }
    }
    
    
    //新增
    $btn_new.click(function () {
        
        BSModal.confirm({
            title : '新增',
            content : modalHtml,
            width : '600px',
            maxHeight : '400px',
            btnOKDismiss : false,
            btnOK : '提交',
            afterInit: function(){
                modalInit('新增');
            }
        }).on(function(e, id) {
            if (!e) {
                return;
            }
            //提交成功后，刷新表格数据:
            //$table.bootstrapTable('load', data);
            
            $('#'+id).modal('hide');
            toastr.success('您新增的数据已提交！');
        });
    });
    
    //编辑
    $btn_edit.click(function () {
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            console.log(JSON.stringify(arrselections));
            
            BSModal.confirm({
                title : '编辑',
                content : modalHtml,
                width : '600px',
                maxHeight : '400px',
                btnOKDismiss : false,
                btnOK : '提交',
                afterInit: function(){
                    modalInit('编辑');
                }
            }).on(function(e, id) {
                if (!e) {
                    return;
                }
                //提交成功后，刷新表格数据:
                //$table.bootstrapTable('load', data);
                
                $('#'+id).modal('hide');
                toastr.success('您编辑的数据已提交！');
                
            });
        }
    });
    
    //查看
    $btn_preview.click(function () {
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            console.log(JSON.stringify(arrselections));
            
            BSModal.confirm({
                title : '查看',
                content : modalPreviewHtml,
                width : '600px',
                maxHeight : '400px',
                btnOKDismiss : true,
                btnOK : '确定',
                btnCancel: ''
            });
        }
    });
    
    //删除
    $btn_remove.click(function () {
        //按钮如果不是disabled状态,则可进行操作
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }

            BSModal.confirm({ content: "确认要删除选择的数据吗？" }).on(function (e) {
                if (!e) {
                    return;
                }
                
                //ajax删除数据...
                
                //此处仅是前端演示删除后的效果：删除表格条目，重置工具栏状态，显示删除成功的提示
                var ids = getIdSelections();
                $table.bootstrapTable('remove', {
                    field: 'id',
                    values: ids
                });
                setToolBtnDisableState();
                toastr.success('删除的数据已提交成功！');
                
            });
        }
    });
    
    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });
    }
    
    function setToolBtnDisableState() {
        var tableSelections = $table.bootstrapTable('getSelections');
        $btn_remove.attr('disabled', !tableSelections.length);
        $btn_edit.attr('disabled', tableSelections.length != 1);
        $btn_preview.attr('disabled', tableSelections.length != 1);
    }
    
});