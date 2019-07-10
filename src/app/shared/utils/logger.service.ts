import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Logger } from './Logger';
import { LoggerLevel } from '../enums/logger-level.enum';

export let currentLevel = environment.level;

const noop = (): any => undefined;

@Injectable()
export class LoggerService implements Logger {

    get info() {
        return this.invokeConsole(LoggerLevel.INFO, 'info');
    }

    get warn() {
        return this.invokeConsole(LoggerLevel.WARN, 'warn');
    }

    get error() {
        return this.invokeConsole(LoggerLevel.ERROR, 'error');
    }

    get debug() {
        return this.invokeConsole(LoggerLevel.DEBUG, 'debug');
    }

    get trace() {
        return this.invokeConsole(LoggerLevel.TRACE, 'trace');
    }

    get log() {
        return this.invokeConsole(LoggerLevel.LOG, 'log');
    }

    private invokeConsole(errorLevel: any, type: string): any {
        // if log level is less than the environ
        if (errorLevel < currentLevel) {
            return noop;
        }
        const logFn = (console)[type] || console.log || noop;
        return logFn;
    }
}
