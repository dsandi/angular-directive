(function IIFE() {
    angular.module('app')
        .directive('popover', popover);

    angular.module('app')
        .controller('popover.controller', popoverController);

    popoverController.$inject = [
        '$scope',
        '$timeout'
    ];

    popover.$inject = [
        '$compile'
    ];

    function popover($compile) {
        return {
            link: {
                pre: preLink,
                post: postLink
            },
            scope: {},
            restrict: 'A',

            bindToController: {
                data: "="
            },
            controller: 'popover.controller as vm'
        };

        function postLink(scope, iElement, iAttrs, ctrl) {
            iElement.bind('mouseenter', ctrl.enterParent);
            iElement.bind('mouseleave', ctrl.leaveParent);
        }

        function preLink(scope, iElement, iAttrs) {
            let popover = angular.element("<div ng-mouseenter=\"vm.enterChild()\" ng-mouseleave=\"vm.leaveChild()\" " +
                "class=\"{{vm.class}}\" ng-include=\"'/path/to/your/template/" + iAttrs.template + ".html'\"></div>");

            iElement.append($compile(popover)(scope));
        }

    }

    function popoverController(scope, $timeout) {
        const vm = this;
        vm.class = 'hide';

        vm.enterParent = () => {
            vm.runTimeoutParent = false;
            vm.inParent = true;
            vm.eval();
        };

        vm.leaveParent = () => {
            vm.runTimeoutParent = true;
            $timeout(() => {
                if (vm.runTimeoutParent) {
                vm.inParent = false;
                vm.eval();
            }
        }, 500);
        };

        vm.enterChild = () => {
            vm.runTimeoutChild = false;
            vm.inChild = true;
            vm.eval();
        };

        vm.leaveChild = () => {
            vm.runTimeoutChild = true;
            $timeout(() => {
                if (vm.runTimeoutChild) {
                vm.inChild = false;
                vm.eval();
            }
        }, 500);
        };

        vm.eval = () => {
            scope.$evalAsync(
                () => {
                vm.class = (vm.inParent === true || vm.inChild === true) ? '' : 'hide';
        }
        );
        };
    }

})();
