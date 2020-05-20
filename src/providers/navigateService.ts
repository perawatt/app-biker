import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment, BikerId } from 'src/environments/environment';

declare function TheSHybridCall(methodName: string, parameter: any): void;
declare function TheSHybridFunc(methodName: string, parameter: string, callback: any): void;

@Injectable()
export class NativeService {
    constructor(private router: Router) { }

    public async NavigateToPage(pageName: string, params?: any) {
        if (environment.production) {
            await this.retry(() => this.tryCallNativeFunc());
            this.callNativeFunc("NavigateToPage", JSON.stringify({ pagename: pageName, params: params })).then(isMainPage => {
                if (!isMainPage) {
                    if (params != null) { this.router.navigate(['/' + pageName, params]); }
                    else { this.router.navigate(['/' + pageName]); }
                }
            });
        } else {
            if (params != null) { this.router.navigate(['/' + pageName, params]); }
            else { this.router.navigate(['/' + pageName]); }
        }
    }

    public async SetPageTitle(title: string) {
        if (environment.production) {
            await this.retry(() => this.tryCallNativeFunc());
            this.callAppMethod("SetPageTitle", title);
        }
    }

    public async GetBikerId() {
        if (environment.production) {
            await this.retry(() => this.tryCallNativeFunc());
            return this.callNativeFunc("GetBikerId", "");
        }
        else
        {
            return BikerId;
        }
    }

    private callNativeFunc(fName: string, fParam: string) {
        return new Promise((resolve, reject) => {
            try {
                TheSHybridFunc(fName, fParam, (rsp: any) => resolve(rsp));
            } catch (error) {
                resolve("error callNativeFunc : " + error);
            }
        });
    }

    private callAppMethod(fName: string, fParam: any) {
        return new Promise((resolve, reject) => {
            try {
                TheSHybridCall(fName, fParam);
                resolve({});
            } catch (error) {
                console.log(error);
                resolve("error callAppMethod : " + error);
            }
        });
    }

    private tryCallNativeFunc(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (typeof TheSHybridFunc == "undefined" || !TheSHybridFunc) {
                reject();
            } else {
                resolve();
            }
        });
    }

    private retry(fn: () => Promise<{}>, intervals = [500, 500, 400, 300, 200, 100, 50]) {
        return new Promise((resolve, reject) => {
            let fn2call = fn;
            if (intervals.length > 0) {
                let waitTime = 2 * +intervals[intervals.length - 1];
                fn2call = () => this.circuitBreaker(fn, waitTime);
            }
            fn2call()
                .then(resolve)
                .catch((error) => {
                    if (intervals.length == 0) {
                        // reject('maximum retries exceeded');
                        reject(error);
                        return;
                    } else {
                        var interval = intervals.pop();
                        setTimeout(() => {
                            // Passing on "reject" is the important part
                            this.retry(fn, intervals).then(resolve, reject);
                        }, interval);
                    }
                });
        });
    }

    private circuitBreaker(fn: () => Promise<{}>, internval: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            let timer = setTimeout(() => {
                reject({ timeout: true });
            }, internval);
            let prom = fn();
            prom.then(it => {
                clearTimeout(timer);
                resolve(it);
            }).catch(reject);
        });
    }
}