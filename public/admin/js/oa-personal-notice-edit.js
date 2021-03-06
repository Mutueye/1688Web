$(document).ready(function(){
    var $btn_publish = $('#btn_publish'); //按钮发布
    var $btn_draft = $('#btn_draft'); //按钮暂存
    var $form = $('#form');
    
    //当前选择的人员列表
    var selectedUserStr = "黄任勋，张部龄，付洪涛，周一博";
    function checkTree($tree, selectedUserStr) {
        if(selectedUserStr.length > 0) {
            var selectedUserArray = selectedUserStr.split('，');
            var nodes = $tree.treeview('getNodes');
            for(var i in nodes) {
                for(var j in selectedUserArray) {
                    if(nodes[i].text == selectedUserArray[j]) {
                        //使用checkNode方法，子节点勾选，父节点不显示“部分勾选”的状态
                        //$tree.treeview('checkNode',[nodes[i], {silent:false}]);
                        $tree.treeview('toggleNodeChecked',[nodes[i], {silent:false}]);
                    }
                }
            }
        }
    }
    
    //检测是公告还是通知，公告不显示通知名单
    checkType();
    $('#type').change(function(){
        checkType()
    });
    
    function checkType() {
        if($('#type').val() == '公告') {
            $('#notice_list_container').hide();
        } else {
            $('#notice_list_container').show();
        }
    }
    
    //解析勾选的人员树节点数组，填充到人员列表input内
    function fillNoticeList($input, checkedNodes) {
        if(checkedNodes.length > 0) {
            var listStrArray = [];
            var listStrSeparator = "，";
            for(var i in checkedNodes) {
                if(checkedNodes[i].type == '个人') {
                    listStrArray.push(checkedNodes[i].text);
                }
            }
            var listStr = listStrArray.join(listStrSeparator);
            $input.val(listStr);
        } else {
            $input.val('');
        }
        
    }
    
    user_list = [
        {
            text: "董事局",
            icon: "fa fa-users",
            type: "组织",
            root: true,
            nodes: [
                {
                    text: "黄任勋",
                    icon: "fa fa-user-circle-o",
                    tags: ['董事局主席'],
                    type: "个人"
                },
                {
                    text: "张部龄",
                    icon: "fa fa-user-circle-o",
                    tags: ['董事，总经理'],
                    type: "个人"
                },
                {
                    text: "付洪涛",
                    icon: "fa fa-user-circle-o",
                    tags: ['董事，副总经理'],
                    type: "个人"
                },
                {
                    text: "肖可峰",
                    icon: "fa fa-user-circle-o",
                    tags: ['董事'],
                    type: "个人"
                },
                {
                    text: "行政部",
                    icon: "fa fa-users",
                    type: "组织",
                    nodes: [
                        {
                            text: "张晓晓",
                            icon: "fa fa-user-circle-o",
                            tags: ['副行政部长'],
                            type: "个人"
                        },
                        {
                            text: "胡星亮",
                            icon: "fa fa-user-circle-o",
                            tags: ['主任'],
                            type: "个人"
                        }
                    ]
                },
                {
                    text: "财政部",
                    icon: "fa fa-users",
                    type: "组织",
                    nodes: [
                        {
                            text: "周一博",
                            icon: "fa fa-user-circle-o",
                            tags: ['财政部长'],
                            type: "个人"
                        },
                        {
                            text: "兰于东",
                            icon: "fa fa-user-circle-o",
                            tags: ['副财政部长'],
                            type: "个人"
                        },
                        {
                            text: "赵西冷",
                            icon: "fa fa-user-circle-o",
                            tags: ['会计'],
                            type: "个人"
                        }
                    ]
                }
            ]
        }
    ];
    
    $('#tree').treeview({
        data:user_list,
        levels: 2, //默认展开2层
        showTags: true,
        selectable: false,
        showCheckbox : true,
        checkboxFirst : true,
        hierarchicalCheck : true,
        propagateCheckEvent : true,
        collapseIcon: 'fa fa-minus-square',
        expandIcon: 'fa fa-plus-square'
    });
    
    $('#tree').on('nodeChecked', function(event, data) {
        console.log(data);
        fillNoticeList($('#notice_list'),$('#tree').treeview('getChecked'));
    });
    
    $('#tree').on('nodeUnchecked', function(event, data) {
        console.log(data);
        fillNoticeList($('#notice_list'),$('#tree').treeview('getChecked'));
        
    });
    
    checkTree($('#tree'), selectedUserStr);
    
    //发布
    $btn_publish.click(function(){
        if(checkValidation()) {
            
            //此处提交数据，提交成功后，返回上级页面
            
            window.location.href='oa-personal-notice.html';
        }
    });
    
    //暂存
    $btn_draft.click(function(){
        if(checkValidation()) {
            
            //此处提交数据，提交成功后，弹出如下提示
            
            toastr.success('您编辑的内容已暂存');
        }
    });
    
    $form.bootstrapValidator({
        fields: {
            mission_name: {
                message: '标题验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入标题'
                    }
                }
            },
            content: {
                message: '内容验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入内容'
                    }
                }
            }
        }
    });
    
    //手动表单验证
    function checkValidation() {
        var bsValidator = $form.data('bootstrapValidator');
        bsValidator.validate();
        var result = bsValidator.isValid();
        if(!result) {
            toastr.warning('您输入的表单信息验证未通过');
        }
        return result;
    }
    
});