'use strict';

/**
 * @ngdoc function
 * @name proj3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the proj3App
 */
angular.module('proj3App')
  .controller('MainCtrl', function ($scope) {
    //tinyMCE
    $scope.original = ['Lorem ipsum dolor sit amet, velit accusamus eloquentiam sea ex.',
     'Timeam utamur ut his, in sit iudico tation signiferumque. ',
     'Ut nec enim ferri. Vis latine alienum legendos id, assentior argumentum cum te.'].join();

    $scope.tinymceEditor1 = ['Lorem ipsum dolor sit amet, velit accusamus eloquentiam sea ex.',
     'Timeam utamur ut his, in sit iudico tation signiferumque. ',
     'Ut nec enim ferri. Vis latine alienum legendos id, assentior argumentum cum te.'].join();
    $scope.tinymceEditor2 = ['Lorem ipsum dolor sit amet, velit accusamus eloquentiam sea ex.',
     'Timeam utamur ut his, in sit iudico tation signiferumque. ',
     'Ut nec enim ferri. Vis latine alienum legendos id, assentior argumentum cum te.'].join();

    $scope.tinymceOptions1 = {
      plugins: 'link image code',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code' + ' | merge discard',
      setup: function (editor) {
        editor.addButton('merge', {
          text: 'Merge',
          icon: false,
          onclick: function () {
            //editor.insertContent('&nbsp;<b>It\'s my button!</b>&nbsp;');
            var result = ''; 
            var contents = angular.element($scope.tinymceEditor1);
            for (var element of contents) {
              switch (element.getAttribute('data-attr')) {
                case $scope.diffOptions.attrs.insert['data-attr']:
                    console.log('insert', element);
                    result += element.innerText;
                  break;
                case $scope.diffOptions.attrs.delete['data-attr']:
                    console.log('delete', element);                    
                  break;
                case $scope.diffOptions.attrs.equal['data-attr']:
                    console.log('equal', element);
                    result += element.innerText;                    
                  break;
                default:
                    console.log('other', element);
                    result += element.innerText;                    
                  break;
               
              }
            }
            $scope.tinymceEditor1 = $scope.original = result;
            $scope.$digest();
          }
        });

        editor.addButton('discard', {
          text: 'Discard',
          icon: false,
          onclick: function () {
            $scope.tinymceEditor1 = $scope.original;
            $scope.$digest();
          }
        });

      }
    };

    $scope.tinymceOptions2 = {
      plugins: 'link image code',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code' + ' | abort',
      setup: function (editor) {
        editor.addButton('abort', {
            text: 'Abort',
            icon: false,
            onclick: function () {
              $scope.tinymceEditor1 = $scope.tinymceEditor2 = $scope.original;
              $scope.$digest();
            }
        });
      }
    };

    //diff-match-patch
    $scope.diffOptions = {
      editCost: 6,
      attrs: {
        insert: {
          'data-attr': 'insert',
          'style': 'background: #bbffbb'
        },
        delete: {
          'data-attr': 'delete',
          'style': 'background: #ffbbbb'
          
        },
        equal: {
          'data-attr': 'equal',
          'style': 'background: #eee'          
        }
      }
    };

});
