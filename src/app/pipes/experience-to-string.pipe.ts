import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experienceToString'
})
export class ExperienceToStringPipe implements PipeTransform {

  transform(value: number, techonology) {
    if(techonology.id == 0)
      return  '';
    
    return value > 355 ? '- ' + Math.ceil(value / 356) + ' years' : '- ' + Math.ceil(value / 30) + ' months';
  }

}
