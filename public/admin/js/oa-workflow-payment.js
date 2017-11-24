$(document).ready(function(){

    var $startTime = $('#start_time');
    var $endTime = $('#end_time');

    var $btn_remove = $('#toolbtn_remove');
    var $btn_edit = $('#toolbtn_edit');
    var $table = $('#table');

    window.commonTools.setDateTimeInputSection($startTime, $endTime);

    $table.bootstrapTable({
        toolbar : '#toolbar',
        showColumns : true,
        showToggle : true,
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
                field: 'cid',
                title: '合同编号',
                halign: 'center'
            },
            {
                field: 'cname',
                title: '合同名称',
                halign: 'center',
                sortable: true
            },
            {
                field: 'type',
                title: '支付类型',
                halign: 'center',
                align: 'center'
            },
            {
                field: 'total',
                title: '合同总价(万元)',
                halign: 'center',
                align: 'right'
            }
        ],
        data: [
            {
                id: 1,
                cid: '123',
                cname: '合同名称1',
                total: '137.00',
                type: '现金'
            },
            {
                id: 2,
                cid: '124',
                cname: '合同名称1',
                total: '20.00',
                type: '支票'
            }
        ]
    });

    setToolBtnDisableState();
    $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        setToolBtnDisableState();
    });

    //删除操作
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

    //编辑按钮操作
    $btn_edit.click(function () {
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            console.log(JSON.stringify(arrselections));
            //根据选定的数据信息跳转到对应的编辑页面
            window.location.href='oa-workflow-payment-edit.html';
        }
    });

    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });
    }

    function setToolBtnDisableState() {
        $btn_remove.attr('disabled', !$table.bootstrapTable('getSelections').length);
        $btn_edit.attr('disabled', $table.bootstrapTable('getSelections').length != 1);
    }

});
