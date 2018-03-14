import { Component, ViewChild } from '@angular/core';
import { Content, NavController, AlertController } from 'ionic-angular';
import { ImagesProvider } from '../../providers/images/images';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { SocketsProvider } from '../../providers/sockets/sockets';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;


  /**
   * @name alias
   * @type String
   * @public
   * @description              Stores the value for the user's entered alias
   */
  public alias: string;




  /**
   * @name handle
   * @type String
   * @public
   * @description              Stores the value for the user's entered tagline
   */
  public handle: string;




  /**
   * @name location
   * @type String
   * @public
   * @description              Stores the value for the user's entered location
   */
  public location: string;




  /**
   * @name displayRegisterAlias
   * @type boolean
   * @public
   * @description              Determines which template items are displayed
   */
  public displayRegisterAlias: boolean = true;




  /**
   * @name messages
   * @type object
   * @public
   * @description              Array that stores all chat data
   */
  public messages: Array<any> = [];




  /**
   * @name message
   * @type object
   * @public
   * @description              Model for managing data for/from the input field
   */
  public message: any;




  /**
   * @name image
   * @type object
   * @public
   * @description              Stores retrieved image file data
   */
  public image: any;




  constructor(public navCtrl: NavController,
    private _ALERT: AlertController,
    private _IMAGES: ImagesProvider,
    private _PRELOADER: PreloaderProvider,
    private _SOCKET: SocketsProvider) { }




  /**
   * @public
   * @method ionViewDidLoad
   * @description    	On view loaded detect whether the network is able to be accessed
   * @return {none}
   */
  ionViewDidLoad(): void {
    this.detectNetworkConnection();
  }




  /**
   * @public
   * @method detectNetworkConnection
   * @description    	Detects whether the chat server can be contacted
   * @return {none}
   */
  detectNetworkConnection(): void {
    this._SOCKET
      .pollServer()
      .toPromise()
      .then((data: any) => {
        this.displayMessages();
      })
      .catch((error) => {
        this.displayNetworkErrorWarning();
      });
  }




  /**
   * @public
   * @method displayNetworkErrorWarning
   * @description    	Displays an alert window informing the user that network connectivity
   * 					cannot be detected
   * @return {none}
   */
  displayNetworkErrorWarning(): void {
    let alert: any = this._ALERT.create({
      title: 'Network error',
      subTitle: 'Please check your network connection and try again',
      buttons: [
        {
          text: 'Retry',
          handler: (data) => {
            this.detectNetworkConnection();
          }
        }]

    });
    alert.present();
  }



  /**
   * @public
   * @method registerAlias
   * @description    			Uses the Ionic AlertController to display a form with 3 input fields:
   *                 			1. alias - the user's chosen screen name
   *							2. handle - their tagline
   *							3. location - their location
   *
   *							This then registers the user for the temporary chat service allowing
   *							them to post
   * @return {none}
   */
  registerAlias(): void {
    let alert: any = this._ALERT.create({
      title: 'Please supply your screen name, handle and location',
      inputs: [
        {
          type: 'text',
          name: 'alias',
          placeholder: 'I.e. Ming the merciless'
        },
        {
          type: 'text',
          name: 'handle',
          placeholder: 'I.e. King of the universe'
        },
        {
          type: 'text',
          name: 'location',
          placeholder: 'I.e. Here, there and everywhere'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data) => {
            console.log('Cancelled');
          }
        },
        {
          text: 'Save',
          handler: (data) => {
            this.alias = data.alias;
            this.handle = data.handle;
            this.location = data.location;
            this.displayRegisterAlias = false;
            this.registerForChatService(this.alias, this.handle, this.location);
          }
        }]

    });
    alert.present();
  }




  /**
   * @public
   * @method registerForChatService
   * @param alias  	{string}     	The user's screen name alias
   * @param handle  	{string}     	The user's tagline
   * @param location	{string}     	The user's location
   * @description    				Register's the user with the current Socket.io chat session
   * @return {none}
   */
  registerForChatService(alias: string,
    handle: string,
    location: string): void {
    this._SOCKET.registerForChatService(alias, handle, location);
  }




  /**
   * @public
   * @method logOut
   * @description    			Disconnects the user from Socket.io chat service
   *							and resets the application state
   * @return {none}
   */
  logOut(): void {
    this._SOCKET.logOut();
    this.alias = "";
    this.handle = "";
    this.location = "";
    this.image = "";
    this.message = "";
    this.messages = [];
    this.displayRegisterAlias = true;
  }




  /**
   * @public
   * @method displayMessages
   * @description    			Retrieves the posted message from the Socket.io chat service
   *							and publishes these to the template (courtesy of the Observable's
   *							subscribe method acting as a listener for data changes)
   * @return {none}
   */
  displayMessages(): void {
    this._SOCKET.retrieveMessages()
      .subscribe((message) => {

        // Update the messages array
        this.messages.push(message);


        // Trigger the scroll API
        setTimeout(() => {
          this.scrollToLatestMessage();
        }, 500);
      });
  }




  /**
   * @public
   * @method addMessage
   * @description    			Adds a message to the Socket.io chat service and resets the model value
   *							used with the template's input field
   * @return {none}
   */
  addMessage(): void {
    this._SOCKET.addMessage(this.message);
    this.message = '';
  }




  /**
   * @public
   * @method addImage
   * @description    			Adds an image to the Socket.io chat service and resets the model value
   *							used with the template's file input field
   * @return {none}
   */
  addImage(): void {
    this._SOCKET.addImage(this.image);
    this.image = '';
    this._PRELOADER.hidePreloader();
  }




  /**
   * @public
   * @method selectImage
   * @param event  {any}     	The DOM event that we are capturing from the File input field
   * @description    			Selects an image to be uploaded to the Socket.io chat service
   * @return {none}
   */
  selectImage(event: any): void {
    this._IMAGES
      .selectImage(event)
      .subscribe((res) => {
        this._PRELOADER.displayPreloader('Loading...');
        this.image = res;
        this.addImage();
      });
  }




  /**
   * @public
   * @method exportMessages
   * @description    			Publishes a console log of all the current session's chat messages
   * @return {none}
   */
  exportMessages(): void {
    console.dir(this.messages);
  }




  /**
   * @public
   * @method scrollToLatestMessage
   * @description    			Triggers the scrollToBottom method of the Ionic Scroll API
   * @return {none}
   */
  scrollToLatestMessage(): void {
    this.content.scrollToBottom(300);
  }


}
