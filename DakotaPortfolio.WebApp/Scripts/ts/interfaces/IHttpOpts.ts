export interface IHttpOpts {
    url: string;
    data?: string;
    header?: string;
    success?: Function;
    warning?: Function;
    error?: Function;
}