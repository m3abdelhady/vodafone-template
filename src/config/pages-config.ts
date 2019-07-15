import { AccountManagementRoutingModule } from './../app/account-management/account-management-routing.module';
import { MODULE_NAME } from 'src/app/shared/constants/defines';
export let config = {
    'authentication': {
        'name': 'authentication',
        'route': '/authentication',
        'loadChildren': '../app/authentication/authentication.module#AuthenticationModule',
        'login': {
            'name': 'login',
            'route': '/authentication/login',
            'moduleName':MODULE_NAME.Authorization
        },
        'forget': {
            'name': 'forget',
            'route': '/authentication/forget',
            'moduleName': MODULE_NAME.Authorization
        }
    },
    'accountManagement': {
        'name': 'accountManagement',
        'route': '/accountManagement',
        'loadChildren': '../app/account-management/account-management.module#AccountManagementModule',
        'accountOverview': {
            'name': 'accountOverview',
            'route': '/accountManagement/accountOverview',
            'moduleName': MODULE_NAME.accountManagement
        },
        'accountDetails':{
            'name': 'accountDetails',
            'route': '/accountManagement/accountDetails',
            'moduleName': MODULE_NAME.accountManagement
        }
    },
    'generalError': {
        'name': 'generalError',
        'route': '/generalError'
    }
}

