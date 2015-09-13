'use strict';

// See http://jquery-datatables-column-filter.googlecode.com/svn/trunk/index.html
angular.module('datatables.inlineediting', ['datatables'])
    .config(dtInlineEditingConfig)
    .run(initInlineEditingPlugin)
    .factory('DTInlineEditingService', DTInlineEditingService);

/* @ngInject */
function dtInlineEditingConfig($provide) {
    $provide.decorator('DTOptionsBuilder', dtOptionsBuilderDecorator);

    function dtOptionsBuilderDecorator($delegate) {
        var newOptions = $delegate.newOptions;
        var fromSource = $delegate.fromSource;
        var fromFnPromise = $delegate.fromFnPromise;

        $delegate.newOptions = function() {
            return _decorateOptions(newOptions);
        };
        $delegate.fromSource = function(ajax) {
            return _decorateOptions(fromSource, ajax);
        };
        $delegate.fromFnPromise = function(fnPromise) {
            return _decorateOptions(fromFnPromise, fnPromise);
        };

        return $delegate;

        function _decorateOptions(fn, params) {
            var options = fn(params);
            options.withInlineEditing = withInlineEditing;
            return options;

            /**
             * Add column filter support
             * @returns {DTOptions} the options
             */
            function withInlineEditing(inlineEditingOptions) {
                options.hasInlineEditing = true;
                options.inlineEditingOptions = inlineEditingOptions;
                return options;
            }
        }
    }
}

/* @ngInject */
function initInlineEditingPlugin(DTRendererService, DTInlineEditingService) {
    var columnFilterPlugin = {
        preRender: preRender
    };
    DTRendererService.registerPlugin(columnFilterPlugin);

    function preRender(options) {
        if (options && options.hasInlineEditing) {
            DTInlineEditingService.registerEditor(new $.fn.dataTable.Editor(options.inlineEditingOptions));
        }
    }
}

/* @ngInject */
function DTInlineEditingService() {
    var editor;

    return {
        registerEditor: registerEditor,
        getEditor: getEditor
    };

    function registerEditor(e) {
        editor = e;
    }

    function getEditor() {
        return editor;
    }
}