import { Injectable, Inject } from '@angular/core';
import { TUIConfig } from '../interfaces/config.interface';

@Injectable()
export class ConfigService {

    constructor(@Inject('TUI_CONFIG') public config: TUIConfig) {
        this.config = Object.assign({
            iconfontType: 'symbol',
            iconfontPrefix: 'iconfont',
            iconfontSymbolPrefix: 'icon',
            iconfontLoadingClass: ['fa-spin'],
            buttonLoadingIcon: 'loading',
            defaultColor: 'primary',
        }, config);
    }

}
