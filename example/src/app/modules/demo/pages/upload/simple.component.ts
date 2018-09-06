import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../cores/services';
import { UploadConfig, WindowService } from 'ng-tui';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ViewComponent } from './view.component';

@Component({
    templateUrl: './simple.component.html',
})
export class SimpleComponent implements OnInit {

    codes = [
        `<ts-image-card [config]="config"></ts-image-card>`,
        `export class SimpleComponent{

    // 上传配置只需要提供一个方法，这个方法需要返回一个可观察对象，传递的内容为字符串
    config: UploadConfig = {
        host: '',
        uploader: file => of('https://picsum.photos/300/300/?random').pipe(delay(2000))
    };

    imageUrl = 'https://picsum.photos/300/300?random';
}`,
        `<ts-image-cards [config]="config"></ts-image-cards>`,
        `export class SimpleComponent{

    // 上传配置只需要提供一个方法，这个方法需要返回一个可观察对象，传递的内容为字符串
    config: UploadConfig = {
        host: '',
        uploader: file => of('https://picsum.photos/300/300/?random').pipe(delay(2000))
    };

    imagesUrl = 'https://picsum.photos/300/300,https://picsum.photos/300/300?random';
}`,
        `import { UploadModule } from 'ng-tui';

@NgModule({
    imports: [..., UploadModule ],
    ...
})
export class MyModule { }`,
    ];

    // 上传配置只需要提供一个方法，这个方法需要返回一个可观察对象，传递的内容为字符串
    config: UploadConfig = {
        host: '',
        uploader: file => of('https://picsum.photos/300/300/?random').pipe(delay(2000))
    };

    imageUrl = 'https://picsum.photos/300/300?100';

    imagesUrl = 'https://picsum.photos/300/300?200,https://picsum.photos/300/300?300';

    constructor(
        public global: GlobalService,
        private window: WindowService,
    ) { }

    ngOnInit() { }

    showImage(src: string) {
        const window = this.window.push(ViewComponent);
        window.instance.src = src;
        window.present();
    }
}
