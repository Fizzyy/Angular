import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {
    constructor(private httpClient: HttpClient) {}

    public get = (url: string) => this.httpClient.get(url);

    public post = (url: string, body: any) => this.httpClient.post(url, body);

    public put = (url: string, body: any) => this.httpClient.put(url, body);

    public delete = (url: string) => this.httpClient.delete(url);
}
