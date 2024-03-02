import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'domsanitization',
})
export class DomsanitizationPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

    transform(base64Image: string): SafeResourceUrl {
      return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
    }
  }


