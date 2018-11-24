import { Pipe, PipeTransform, TemplateRef, ViewChild } from '@angular/core';

/*
*/
@Pipe({name: 'toTemplate'})
export class ToTemplatePipe implements PipeTransform {
@ViewChild('packageTitle') packtt: TemplateRef<any>;
  transform(value: string): any {
    const aa = value;
    const bb = "packageTitle";
    console.log(aa);
    console.log(bb);
    console.log(this.packtt);
    if (aa === bb) {
      return 'aaa==bb';
    } else if (aa == bb){
      return bb;
    } else {
      return this.packtt;
    }
  }
}
