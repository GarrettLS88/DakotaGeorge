import { IHttpOpts } from '../interfaces';

export class Http {
    private GetRequest(): any {
        return new XMLHttpRequest();
    }

    /**
     * ajax post
     * @param {HttpOpts} opts url: string; data?: string;header?: string; success?: Function; warning?: Function; error?: Function;
     */
    public Post(opts: IHttpOpts): void {
        let request = this.GetRequest();
        if (opts.header == null) { opts.header = 'application/json; charset=UTF-8'; }

        request.open('POST', opts.url, true);
        request.setRequestHeader('Content-Type', opts.header);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                if (opts.success != null) {
                    opts.success();
                }
            } else {
                if (opts.warning != null) {
                    opts.warning();
                }
            }
        };

        request.onerror = function () {
            if (opts.error != null) {
                opts.error();
            }
        };

        request.send(opts.data);
    }

    /**
     * ajax get
     * @param {HttpOpts} opts url: string; data?: string;header?: string; success?: Function; warning?: Function; error?: Function;
     */
    public Get(opts: IHttpOpts): string {
        let request = this.GetRequest();
        let ret = '';

        request.open('GET', opts.url, true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                ret = request.responseText;
                if (opts.success != null) {
                    opts.success();
                }
            } else {
                if (opts.warning != null) {
                    opts.warning();
                }
            }
        };

        request.onerror = function () {
            if (opts.error != null) {
                opts.error();
            }
        };

        request.send();
        return ret;
    }
}