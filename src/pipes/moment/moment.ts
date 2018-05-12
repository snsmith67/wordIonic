import { Pipe, PipeTransform, Injectable } from '@angular/core';
import * as moment from 'moment';

/**
 * Generated class for the MomentPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'moment',
})
//export class MomentPipe implements PipeTransform {

  export class Moment{
  /**
   * Takes a value and makes it lowercase.
   */
  //transform(value: string, ...args) {
    transform(value: string, ...args) {
    let m = moment(value).endOf('hour').fromNow();
    return m;
   // return value.toLowerCase();
   
  }
}
