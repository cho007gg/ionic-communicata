import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ImagesProvider {



   /**
    * @name _READER
    * @type object
    * @private
    * @description              Creates a FileReader API object
    */
   private _READER : any  			=	new FileReader();




   constructor(public http: HttpClient)
   { }




   /**
    * @public
    * @method selectImage
    * @param event  {any}     	The DOM event that we are capturing from the File input field
    * @description    			Uses the FileReader API to capture the input field event, retrieve
    *                 			the selected image and return that as a base64 data URL courtesy of
    *							an Observable
    * @return {Observable}
    */
   selectImage(event) : Observable<any>
   {
      return Observable.create((observer) =>
      {
         this.handleImageSelection(event)
         .subscribe((res) =>
         {
            observer.next(res);
            observer.complete();
         });
      });
   }




   /**
    * @public
    * @method handleImageSelection
    * @param event  {any}     	The DOM event that we are capturing from the File input field
    * @description    			Uses the FileReader API to capture the input field event, retrieve
    *                 			the selected image and return that as a base64 data URL courtesy of
    *							an Observable
    * @return {Observable}
    */
   handleImageSelection(event : any) : Observable<any>
   {
      let file 		: any 		= event.target.files[0];

      this._READER.readAsDataURL(file);
      return Observable.create((observer) =>
      {
         this._READER.onloadend = () =>
         {
            observer.next(this._READER.result);
            observer.complete();
         }
      });
   }

}
