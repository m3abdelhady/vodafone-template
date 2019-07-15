import { ConfigLoaderService } from '../utils/config-loader.service';
import { DEFAULT_ERROR_MESSAGE } from '../constants/defines';
import { Injectable, ErrorHandler, Injector } from '@angular/core';
import * as JsonQuery from 'jsonpath/jsonpath';
import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute } from '@angular/router';
import * as pagesConfig from '../../../config/pages-config';
import { Location } from '@angular/common';
import { config } from '../../../config/pages-config';
import { RoutesConfig } from '../constants/config.routes';

@Injectable()

/** Class representing gloabal error handling. */
export class ErrorHandlerService {
  public exceptionRoutes = [RoutesConfig.content, RoutesConfig.contentAr];

  private pagesConfig: any;
  /** The errorsMessages object holds all errors in the error messages json file. */
  private errorsMessages: any;

  /** The commonErrors object holds all errors in the common errors json file. */
  private commonErrors: any;

  /** The errorDescription object holds the description of the error to be displayed via notification custom component. */
  public errorDescription: any = null;

  /** Current Route Variable */
  public currentRoute: string;

  /** The QueriesForErrorMessagesFile object holds all the Queries which will be
   *  executed in case of getting error from the error messages json file
   */
  private queriesForErrorMessagesFile: object = {
    errorFullMatch: '$[\'{moduleName}\'][\'{respCode}\'][\'{errorName}\']',
    respCodeLevelDefaultMatch: '$[\'{moduleName}\'][\'{respCode}\'].DEFAULT',
    moduleLevelDefaultMatch: '$[\'{moduleName}\'].DEFAULT'
  };

  /** The QueriesForCommonErrorsFile object holds all the Queries which will be
   *   executed in case of getting errors from the common errors json file
   */
  private queriesForCommonErrorsFile: object = {
    errorFullMatch: '$[\'{respCode}\'][\'{errorName}\']',
    respCodeLevelDefaultMatch: '$[\'{respCode}\'].DEFAULT',
    commonDefaultMatch: '$.DEFAULT'
  };

  /**
   * Create CustomErrorHandler service.
   */
  public constructor(
    private configLoader: ConfigLoaderService,
    private router: Router,
    private location: Location) {
    this.pagesConfig = config;
  }

  /**
   * For any back end error the function searchs for the error description from the error json files
   *  and notify the tracking service if the error is tracked
   * @param {String}  moduleName - the module name of the error
   * @param {String}  errorName - the error name of the error
   * @param {String}  errorStatusCode - the module name of the error
   * @param {Boolean}  track - the track flag identifiy whether this error will be tracked by the tracking service or not
   * @returns {any}  the function returns the error description object in case of the error will be displayed
   * in the same page else the function will navigate to the error handling page
   */
  public getErrorDescription(moduleName, errorName, errorCode?: any, navigate?: boolean) {

    this.errorDescription = null;

    const errorDetails: any = {
      moduleName,
      errorName,
      errorStatusCode: errorCode
    };

    if (errorDetails.moduleName) {
      this.errorDescription = this.detectErrorFromErrorsPool(this.queriesForErrorMessagesFile, this.configLoader.getErrorsConfig(),
        errorDetails, this.queryBuilderForErrorMessagesFile);
    }

    this.errorDescription = (this.errorDescription) ? this.errorDescription : DEFAULT_ERROR_MESSAGE;

    if (this.errorDescription && this.errorDescription.target === 'in-page') {
      return this.errorDescription;
    } else if (this.errorDescription && this.errorDescription.redirect && this.errorDescription.target === 'navigate') {
      this.router.navigate([this.errorDescription.redirect]);
    } else if (this.errorDescription && !this.errorDescription.redirect && this.errorDescription.target === 'navigate') {
      this.router.navigate([pagesConfig.config.generalError.route]);
    } else if (navigate) {
      this.currentRoute = this.location.path();
      this.router.navigate([pagesConfig.config.generalError.route]);
    }
  }

  /**
   * The function searchs for the error in the errors pool
   * @param {any} Queries - the Queries which will be executed on the errorsPool
   * @param {any} errorsPool - a pool of errors to search on
   * @param {any} errorDetails - the object which holds the description of the error to be detected
   * @returns {any} The function returns the error description object in case of the error is detected else
   *           it will return null which means that the error is not detected
   */
  public detectErrorFromErrorsPool(queries: any, errorsPool: any, errorDetails: any, callBackForQueryBuilder: Function) {
    let errorDescription: any = null;

    let query: string = '';

    for (const queryKey in queries) {
      query = callBackForQueryBuilder(queries[queryKey], errorDetails);
      if (query) {
        try {
          errorDescription = JsonQuery.value(errorsPool, query);
        } catch (error) {
        }

        if (errorDescription) {
          break;
        }
      }
    }

    return errorDescription;
  }

  /**		 +    return this.errorDescription;
   * returns current error; this function is called by the general error to get the error description
   */
  public getCurrentError() {

    const error = this.errorDescription;
    const title = this.getRouteTitle(this.currentRoute);
    this.errorDescription = '';
    return { error, title };
  }

  /**
   * The function build the query which will be executed on the errors pool, it just replace the moduleName,
   *  errorName, respCode placeholders with the values of the error details
   * @param {any} query - the Queries which will be executed on the errorsPool
   * @param {any} errorDetails - the object which holds the description of the error to be detected
   * @returns {String} the function returns the string with the modified placeholders
   */
  public queryBuilderForErrorMessagesFile(query: string, errorDetails: any): string {
    debugger;
    // errorFullMatch: "$['{moduleName}']['{respCode}']['{errorName}']",
    //   respCodeLevelDefaultMatch: "$['{moduleName}']['{respCode}'].DEFAULT",
    //     ModuleLevelDefaultMatch: "$['{moduleName}'].DEFAULT"

    if (errorDetails.errorStatusCode && errorDetails.moduleName && errorDetails.errorName) {
      return query.replace('{moduleName}', errorDetails.moduleName).replace('{respCode}', errorDetails.errorStatusCode)
        .replace('{errorName}', errorDetails.errorName);
    }

    else if (!query.match(/DEFAULT/gi) && errorDetails.errorName && errorDetails.moduleName) {
      return query.replace('{moduleName}', errorDetails.moduleName).replace('[\'{respCode}\']', '..')
        .replace('{errorName}', errorDetails.errorName);
    }

    else if (query.match(/DEFAULT/gi) && errorDetails.moduleName) {
      return query.replace('{moduleName}', errorDetails.moduleName).replace('[\'{respCode}\']', '');
    }

  }

  /** to get page title from pages config file based on page route */
  public getRouteTitle(lastRoute) {

    let pageTitleKey: string = '';

    /** get configuration object depends on current url */
    const route = this.getRouteUsingURL(lastRoute.split('#')[0].split('?')[0]);

    if (route && typeof route.titleKey === typeof {}) {

      /** dynamic title key */
      pageTitleKey = route.titleKey[route.titleKey.DEFAULT];
    } else if (route) {

      /** static title key */
      pageTitleKey = route.titleKey || 'common.std-headline';
    }

    return pageTitleKey;
  }

  /**
       * search for route by route's url and return the full route object
       * @param {string} url - route url
       * @param {string} moduleName - determine which module will be searched in
       */
  public getRouteUsingURL(url: string): any {
    let route: any = null;
    const conf = this.pagesConfig;
    Object.keys(conf).forEach(moduleKey => {
      if (conf[moduleKey].route === url) {
        route = conf[moduleKey];
      } else {
        Object.keys(conf[moduleKey]).forEach(stepKey => {
          if (conf[moduleKey][stepKey].route === url) {
            route = conf[moduleKey][stepKey];
          }
        });
      }
    });

    return route;
  }
  public getModuleName() {
    return this.getRouteUsingURL(this.router.url).moduleName;
  }

  public exceptionRoutesCheck(url) {
    return this.exceptionRoutes.find((route) => {
      return url.toString().includes(route.toString());
    });
  }

}
