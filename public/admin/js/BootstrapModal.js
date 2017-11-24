$(function () {
    if ($.fn.modal) {
        $.fn.modal.defaults.spinner = $.fn.modalmanager.defaults.spinner =
            '<div class="loading-spinner" style="width: 200px; margin-left: -100px;">' +
                '<div class="progress progress-striped active">' +
                    '<div class="progress-bar" style="width: 100%;"></div>' +
                '</div>' +
            '</div>';

        $.fn.modalmanager.defaults.resize = true;
    }

    window.Modal = function () {
        var _tplHtml = '<div class="modal created-modal" id="[Id]">' +
                                        '<div class="modal-header">' +
                                            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
                                            '<h5 class="modal-title"><i class="icon-exclamation-sign"></i> [Title]</h5>' +
                                        '</div>' +
                                        '<div class="modal-body small">' +
                                            '<p>[Message]</p>' +
                                        '</div>' +
                                        '<div class="modal-footer" >' +
                                            '<button type="button" class="btn btn-primary ok" data-dismiss="modal">[BtnOk]</button>' +
                                            '<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>' +
                                        '</div>' +
                            '</div>';

        var _tplLoadHtml = '<div class="modal created-modal" id="[Id]">' +
                                                '<div class="modal-header">' +
                                                    '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
                                                    '<h5 class="modal-title">[Title]</h5>' +
                                                '</div>' +
                                                '<div class="modal-body small">' +
                                                    '<iframe src="[Url]" frameborder="0" width="100%" height="[Height]px" style="padding:0px; margin:0px;"></iframe>' +
                                                '</div>' +
                                        '</div>';

        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');

        var _alert = function (options) {
            var id = _dialog(options);
            var modal = $('#' + id);
            modal.find('.ok').removeClass('btn-success').addClass('btn-primary');
            modal.find('.cancel').hide();

            return {
                id: id,
                on: function (callback) {
                    if (callback && callback instanceof Function) {
                        modal.find('.ok').click(function () { callback(true); });
                    }
                },
                hide: function (callback) {
                    if (callback && callback instanceof Function) {
                        modal.on('hide.bs.modal', function (e) {
                            callback(e);
                        });
                    }
                }
            };
        };

        var _confirm = function (options) {
            var id = _dialog(options);
            var modal = $('#' + id);
            modal.find('.ok').removeClass('btn-primary').addClass('btn-success');
            modal.find('.cancel').show();

            return {
                id: id,
                on: function (callback) {
                    if (callback && callback instanceof Function) {
                        modal.find('.ok').click(function () { callback(true); });
                        modal.find('.cancel').click(function () { callback(false); });
                    }
                },
                hide: function (callback) {
                    if (callback && callback instanceof Function) {
                        modal.on('hide.bs.modal', function (e) {
                            callback(e);
                        });
                    }
                }
            };
        };

        var _load = function (options) {
            var ops = {
                url: '',
                title: '',
                width: 800,
                height: 550
            };
            $.extend(ops, options);
            var modalId = _getId();
            var html = _tplLoadHtml.replace(reg, function (node, key) {
                return {
                    Id: modalId,
                    Title: ops.title,
                    Url: ops.url,
                    Height: ops.height
                }[key];
            });

            $('body').append(html);
            var modal = $('#' + modalId).modal({
                width: ops.width
            });

            $('#' + modalId).on('hide.bs.modal', function (e) {
                $(this).parent('.modal-scrollable').next().remove();
                $(this).parent('.modal-scrollable').remove();
                $('body').modalmanager('toggleModalOpen');
            });
        }

        var _getId = function () {
            var date = new Date();
            return 'mdl' + date.valueOf();
        }

        var _dialog = function (options) {
            var ops = {
                msg: "提示内容",
                title: "操作提示",
                btnok: "确定",
                btncl: "取消",
                width: 400,
                auto: false
            };

            $.extend(ops, options);

            var modalId = _getId();

            var html = _tplHtml.replace(reg, function (node, key) {
                return {
                    Id: modalId,
                    Title: ops.title,
                    Message: ops.msg,
                    BtnOk: ops.btnok,
                    BtnCancel: ops.btncl
                }[key];
            });

            $('body').append(html);
            $('#' + modalId).modal({
                width: ops.width,
                backdrop: 'static'
            });

            $('#' + modalId).on('hide.bs.modal', function (e) {
                //$(this).parent('.modal-scrollable').next().remove();
                //$(this).parent('.modal-scrollable').remove();
                $('body').modalmanager('toggleModalOpen');
            });

            return modalId;
        }

        var _cancelCheckbox = function () {
            //设置取消样式
            $(".datagrid-header-check .checker").find("span").attr("class", "");//取消头部第一个checkbox的样式
            $(".datagrid-cell-check .checker").find("span").attr("class", "");//取消列表选中checkbox的样式
            $(".datagrid-btable").find("tr").attr("class", "datagrid-row");//取消选中行的样式
            $(":checkbox:checked").attr("checked", false); //取消所有选中状态
        };


        return {
            alert: _alert,
            confirm: _confirm,
            load: _load,
            cancelcheck: _cancelCheckbox,
            loading: function () {
                $('body').modalmanager('loading');
            },
            removeLoading: function () {
                $('body').modalmanager('removeLoading');
            }
        }

    }();

});