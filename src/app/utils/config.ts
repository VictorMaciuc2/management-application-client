import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ConfigService {
    constructor() { }

    getHttpOptions() {
        return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    }
}
