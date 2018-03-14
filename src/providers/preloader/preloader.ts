import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the PreloaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PreloaderProvider {

  /**
  * Reference for storing loading bar object
  */
  private loading: any;

  constructor(public http: HttpClient,
    public loadingCtrl: LoadingController) {
    console.log('Hello PreloaderProvider Provider');
  }

  /**
    *
    * Display an animated loading bar
    *
    * @public
    * @method displayPreloader
    * @param message    {String}        Message to be displayed with the loading bar
    * @return {none}
    */
  displayPreloader(message: string): void {
    this.loading = this.loadingCtrl.create({
      content: message
    });

    this.loading.present();
  }

  /**
   *
   * Hide animated loading bar
   *
   * @public
   * @method hidePreloader
   * @return {none}
   */
  hidePreloader(): void {
    this.loading.dismiss();
  }

}
