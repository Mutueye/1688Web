$(document).ready(function(){
    var $table = $('#table');
    $table.bootstrapTable({
        showColumns : true,
        showToggle : true,
        pagination : false,
        showExport : true,
        showPaginationSwitch : false,
        columns: [
            {
                field: 'check',
                checkbox: true,
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'name',
                title: '姓名',
                halign: 'center'
            },
            {
                field: 'dep',
                title: '部门',
                halign: 'center'
            },
            {
                field: 'post',
                title: '职位',
                halign: 'center'
            },
            {
                field: 'date',
                title: '时间',
                halign: 'center',
                sortable: true,
                align: 'center'
            },
            {
                field: 'due',
                title: '应到',
                halign: 'center',
                align: 'right',
                editable: {
                    type: 'text',
                    success: function(response, newValue) {
                        console.log('success, newValue=' + newValue);
                    }
                }
            },
            {
                field: 'actual',
                title: '实到',
                halign: 'center',
                align: 'right',
                editable: {
                    type: 'text',
                    success: function(response, newValue) {
                        console.log('success, newValue=' + newValue);
                    }
                }
            },
            {
                field: 'leave',
                title: '请假',
                halign: 'center',
                align: 'right',
                editable: {
                    type: 'text',
                    success: function(response, newValue) {
                        console.log('success, newValue=' + newValue);
                    }
                }
            },
            {
                field: 'business',
                title: '出差',
                halign: 'center',
                align: 'right',
                editable: {
                    type: 'text',
                    success: function(response, newValue) {
                        console.log('success, newValue=' + newValue);
                    }
                }
            },
            {
                field: 'out',
                title: '外出',
                halign: 'center',
                align: 'right',
                editable: {
                    type: 'text',
                    success: function(response, newValue) {
                        console.log('success, newValue=' + newValue);
                    }
                }
            }
        ],
        data: [
            {
                name: '周吴郑',
                dep: '人事部',
                post: '职员',
                date: '2017.06',
                due: '30',
                actual: '30',
                leave: '0',
                business: '0',
                out: '0'
            },
            {
                name: '任水寒',
                dep: '人事部',
                post: '职员',
                date: '2017.06',
                due: '30',
                actual: '28',
                leave: '1',
                business: '0',
                out: '1'
            },
            {
                name: '苏普',
                dep: '人事部',
                post: '职员',
                date: '2017.06',
                due: '30',
                actual: '0',
                leave: '0',
                business: '0',
                out: '0'
            },
            {
                name: '李晟闻',
                dep: '人事部',
                post: '职员',
                date: '2017.06',
                due: '26',
                actual: '0',
                leave: '2',
                business: '1',
                out: '1'
            }
        ]
    });
    $('#btn_submit').click(function(){
        var selectedDatas = $table.bootstrapTable('getSelections');
        if(selectedDatas.length > 0) {
            alert(JSON.stringify(selectedDatas));
            //提交成功后返回上级
            window.location.href="oa-hr-attendance.html";
        } else {
            toastr.warning('请勾选要提交的考勤数据');
        }

    })
});