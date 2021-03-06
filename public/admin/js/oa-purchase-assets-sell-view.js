$(document).ready(function(){
    
    //表单数据示例
    var formData = [
        {
            asset_name : '冷柜',
            asset_list : [
                {
                    asset_id : '20180001',
                    brand : '西门子',
                    spec : 'XMZ-21'
                },
                {
                    asset_id : '20180002',
                    brand : '海尔',
                    spec : 'HR-SD'
                },
                {
                    asset_id : '20180003',
                    brand : '澳柯玛',
                    spec : 'ACM-BB'
                }
            ]
        },
        {
            asset_name : '投影仪',
            asset_list : [
                {
                    asset_id : '20180004',
                    brand : '飞利浦',
                    spec : 'potu0239'
                },
                {
                    asset_id : '20180005',
                    brand : '夏普',
                    spec : 'SP3asF'
                }
            ]
        }
    ];
    
    //初始数据
    initData = [
        {
            asset_name : '投影仪',
            asset_id : '20180005',
            brand : '夏普',
            spec : 'SP3asF',
            sell_num : '2',
            sell_old_value : '2300',
            sell_cut_value : '1200',
            sell_true_value : '1100',
            sell_ps : '备注内容...'
        },
        {
            asset_name : '冷柜',
            asset_id : '20180002',
            brand : '海尔',
            spec : 'HR-SD',
            sell_num : '12',
            sell_old_value : '3300',
            sell_cut_value : '1200',
            sell_true_value : '2100',
            sell_ps : '备注内容...'
        }
    ];
    
    function getOptionsFromData(data,key) {
        var selectData = [];
        for(i in data) {
            selectData.push({
                value : data[i][key],
                text : data[i][key]
            });
        }
        return selectData;
    }
    
    function fillFormData(data, id){
        var asset_name_data = window.commonTools.getSubArrayByObjValue(data, 'asset_name', $('#asset_name_' + id).val())[0];
        $('#asset_id_' + id).empty(); //每次选择不同的资产名称时，清空资产编号列表
        window.window.commonTools.addSelectOptions($('#asset_id_' + id), getOptionsFromData(asset_name_data.asset_list,'asset_id'));
        fillAssetIdData(data, id);
        $('#asset_id_' + id).change(function(){
            fillAssetIdData(data, id);
        });
    }
    
    function fillAssetIdData(data, id) {
        var a_n_data = window.commonTools.getSubArrayByObjValue(data, 'asset_name', $('#asset_name_' + id).val())[0];
        var asset_id_data = window.commonTools.getSubArrayByObjValue(a_n_data.asset_list, 'asset_id', $('#asset_id_' + id).val())[0];
        $('#brand_' + id).val(asset_id_data.brand);
        $('#spec_' + id).val(asset_id_data.spec);
    }
    
    window.commonTools.duplicateFormCtrl({
        mode : 'view',
        container : $('#sell_content'),
        html :  '<div class="col-xs-12 col-sm-4">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">资产名称：</div>' +
                            '<select class="form-control" id="asset_name" disabled>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">编号：</div>' +
                            '<select class="form-control" id="asset_id" disabled>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">品牌：</div>' +
                            '<input type="text" class="form-control" id="brand" disabled>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">规格：</div>' +
                            '<input type="text" class="form-control" id="spec" disabled>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">数量：</div>' +
                            '<input type="text" class="form-control" id="sell_num" disabled>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-9">' +
                    '<div class="row no-bottom">' +
                        '<div class="col-xs-12 col-sm-4">' +
                            '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                '<div class="input-group">' +
                                    '<div class="input-group-addon addon-label">账面原值：</div>' +
                                    '<input type="text" class="form-control" id="sell_old_value" disabled>' +
                                    '<div class="input-group-addon">元</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-4">' +
                            '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                '<div class="input-group">' +
                                    '<div class="input-group-addon addon-label">已提折旧：</div>' +
                                    '<input type="text" class="form-control" id="sell_cut_value" disabled>' +
                                    '<div class="input-group-addon">元</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-4">' +
                            '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                '<div class="input-group">' +
                                    '<div class="input-group-addon addon-label">账面净值：</div>' +
                                    '<input type="text" class="form-control" id="sell_true_value" disabled>' +
                                    '<div class="input-group-addon">元</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' + 
                '<div class="col-xs-12">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">备注：</div>' +
                            '<input type="text" class="form-control" id="sell_ps" disabled>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12">' +
                    '<div class="cool-form-hline"></div>' +
                '</div>',
        ids : [
            'asset_name',
            'asset_id',
            'brand',
            'spec',
            'sell_num',
            'sell_old_value',
            'sell_cut_value',
            'sell_true_value',
            'sell_ps'
        ],
        afterAdd : function($container, id){
            window.window.commonTools.addSelectOptions($('#asset_name_' + id), getOptionsFromData(formData,'asset_name'));
            fillFormData(formData, id);
            $('#asset_name_' + id).change(function(){
                fillFormData(formData, id);
            });
        },
        initialData : initData,
        fillInitialData : function($container, data, id) {
            $('#asset_name_' + id).val(data.asset_name);
            fillFormData(formData, id);
            $('#asset_id_' + id).val(data.asset_id);
            fillAssetIdData(formData, id);
            $('#sell_num_' + id).val(data.sell_num);
            $('#sell_old_value_' + id).val(data.sell_old_value);
            $('#sell_cut_value_' + id).val(data.sell_cut_value);
            $('#sell_true_value_' + id).val(data.sell_true_value);
            $('#sell_ps_' + id).val(data.sell_ps);
        }
    });
    
});