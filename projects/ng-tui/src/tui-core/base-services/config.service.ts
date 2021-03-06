import { Injectable, Inject } from '@angular/core';
import { TUIConfig } from '../interfaces/config.interface';

@Injectable()
export class ConfigService {

    constructor(@Inject('TUI_CONFIG') public config: TUIConfig) {
        this.config = Object.assign({
            iconfontPrefix: 'iconfont',
            iconfontSymbolPrefix: 'icon',
            iconfontLoadingClass: ['iconfont-rotate'],
            buttonLoadingIcon: 'loading',
            defaultColor: 'primary',
            confirmCancelTitle: 'Cancel',
            confirmOkTitle: 'Confirm',
            weekTitles: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            monthTitles: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            paginationItems: []
        }, config);
    }

}
