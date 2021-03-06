/*
 * Copyright © 2017 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

angular.module(PKG.name + '.feature.logviewer')
  .config(function($stateProvider,$urlRouterProvider) {
    const productName = window.CaskCommon.ThemeHelper.Theme.productName;
    $urlRouterProvider.otherwise(() => {
      //Unmatched route, will show 404
      window.CaskCommon.ee.emit(
        window.CaskCommon.globalEvents.PAGE_LEVEL_ERROR, { statusCode: 404 });
    });
    $stateProvider
      .state('logviewerhome', {
        resolve: {
          sessionToken: function() {
            window.CaskCommon.SessionTokenStore.fetchSessionToken();
          }
        },
        url: '/view?namespace&appId&programType&programId&runId&filter&startTime&endTime',
        templateUrl: '/assets/features/logviewer/templates/home.html',
        onEnter: function($stateParams) {
          document.title = `${productName} | Logs | ${$stateParams.programId}`;
        },
        controller: 'LogsAppHomeController',
        controllerAs: 'Home'
      });

  });
