import {
    Component,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnChanges,
    SimpleChanges,
    Input,
    ViewEncapsulation,
    Output,
    EventEmitter,
    OnInit,
    Inject,
    OnDestroy,
} from '@angular/core';
import { ScriptService } from '../../tui-core/base-services/script.service';
declare const window: any;

@Component({
    selector: 'ts-ckeditor',
    exportAs: 'tsCkeditor',
    template: `<div #editor></div>`,
    styles: [],
    encapsulation: ViewEncapsulation.Emulated,
})

export class CkeditorComponent implements AfterViewInit, OnInit, OnChanges, OnDestroy {

    @ViewChild('editor') editor: ElementRef;

    @Input() content: string;

    @Input() options: any;

    @Output() load = new EventEmitter<any>();

    @Output() contentChange = new EventEmitter<string>();

    private editroHandle: any;

    private textarea: HTMLTextAreaElement;

    private ready: boolean;

    constructor(
        private script: ScriptService,
        @Inject('CKEDITOR_SCRIPT_SRCS') private srcs: string[]
    ) {
        this.content = '';
        this.options = {};
    }

    ngOnChanges(change: SimpleChanges) {
        if (change.content && change.content.currentValue != null && change.content.currentValue !== undefined) {
            this.updateContent();
        }
    }

    ngOnInit() {
        this.script.loads(this.srcs, !!window.ClassicEditor);
    }

    ngAfterViewInit() {
        this.textarea = this.editor.nativeElement;
        this.script.complete(() => {
            window.ClassicEditor
                .create(this.textarea, this.options)
                .then((editor: any) => {
                    this.editroHandle = editor;
                    this.ready = true;
                    this.load.emit(this.editroHandle);
                    editor.model.document.on('change:data', () => {
                        this.contentChange.emit(editor.getData());
                    });
                    this.updateContent();
                })
                .catch((error: any) => {
                    console.error(error);
                });
        });
    }

    updateContent() {
        if (this.ready) {
            this.editroHandle.setData(this.content);
        }
    }

    ngOnDestroy() {
        if (this.editroHandle) {
            this.editroHandle.destroy();
        }
    }
}
