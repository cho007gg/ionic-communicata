webpackJsonp([0],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_images_images__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_preloader_preloader__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_sockets_sockets__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    function HomePage(navCtrl, _ALERT, _IMAGES, _PRELOADER, _SOCKET) {
        this.navCtrl = navCtrl;
        this._ALERT = _ALERT;
        this._IMAGES = _IMAGES;
        this._PRELOADER = _PRELOADER;
        this._SOCKET = _SOCKET;
        /**
         * @name displayRegisterAlias
         * @type boolean
         * @public
         * @description              Determines which template items are displayed
         */
        this.displayRegisterAlias = true;
        /**
         * @name messages
         * @type object
         * @public
         * @description              Array that stores all chat data
         */
        this.messages = [];
    }
    /**
     * @public
     * @method ionViewDidLoad
     * @description    	On view loaded detect whether the network is able to be accessed
     * @return {none}
     */
    HomePage.prototype.ionViewDidLoad = function () {
        this.detectNetworkConnection();
    };
    /**
     * @public
     * @method detectNetworkConnection
     * @description    	Detects whether the chat server can be contacted
     * @return {none}
     */
    HomePage.prototype.detectNetworkConnection = function () {
        var _this = this;
        this._SOCKET
            .pollServer()
            .toPromise()
            .then(function (data) {
            _this.displayMessages();
        })
            .catch(function (error) {
            _this.displayNetworkErrorWarning();
        });
    };
    /**
     * @public
     * @method displayNetworkErrorWarning
     * @description    	Displays an alert window informing the user that network connectivity
     * 					cannot be detected
     * @return {none}
     */
    HomePage.prototype.displayNetworkErrorWarning = function () {
        var _this = this;
        var alert = this._ALERT.create({
            title: 'Network error',
            subTitle: 'Please check your network connection and try again',
            buttons: [
                {
                    text: 'Retry',
                    handler: function (data) {
                        _this.detectNetworkConnection();
                    }
                }
            ]
        });
        alert.present();
    };
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
    HomePage.prototype.registerAlias = function () {
        var _this = this;
        var alert = this._ALERT.create({
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
                    handler: function (data) {
                        console.log('Cancelled');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.alias = data.alias;
                        _this.handle = data.handle;
                        _this.location = data.location;
                        _this.displayRegisterAlias = false;
                        _this.registerForChatService(_this.alias, _this.handle, _this.location);
                    }
                }
            ]
        });
        alert.present();
    };
    /**
     * @public
     * @method registerForChatService
     * @param alias  	{string}     	The user's screen name alias
     * @param handle  	{string}     	The user's tagline
     * @param location	{string}     	The user's location
     * @description    				Register's the user with the current Socket.io chat session
     * @return {none}
     */
    HomePage.prototype.registerForChatService = function (alias, handle, location) {
        this._SOCKET.registerForChatService(alias, handle, location);
    };
    /**
     * @public
     * @method logOut
     * @description    			Disconnects the user from Socket.io chat service
     *							and resets the application state
     * @return {none}
     */
    HomePage.prototype.logOut = function () {
        this._SOCKET.logOut();
        this.alias = "";
        this.handle = "";
        this.location = "";
        this.image = "";
        this.message = "";
        this.messages = [];
        this.displayRegisterAlias = true;
    };
    /**
     * @public
     * @method displayMessages
     * @description    			Retrieves the posted message from the Socket.io chat service
     *							and publishes these to the template (courtesy of the Observable's
     *							subscribe method acting as a listener for data changes)
     * @return {none}
     */
    HomePage.prototype.displayMessages = function () {
        var _this = this;
        this._SOCKET.retrieveMessages()
            .subscribe(function (message) {
            // Update the messages array
            _this.messages.push(message);
            // Trigger the scroll API
            setTimeout(function () {
                _this.scrollToLatestMessage();
            }, 500);
        });
    };
    /**
     * @public
     * @method addMessage
     * @description    			Adds a message to the Socket.io chat service and resets the model value
     *							used with the template's input field
     * @return {none}
     */
    HomePage.prototype.addMessage = function () {
        this._SOCKET.addMessage(this.message);
        this.message = '';
    };
    /**
     * @public
     * @method addImage
     * @description    			Adds an image to the Socket.io chat service and resets the model value
     *							used with the template's file input field
     * @return {none}
     */
    HomePage.prototype.addImage = function () {
        this._SOCKET.addImage(this.image);
        this.image = '';
        this._PRELOADER.hidePreloader();
    };
    /**
     * @public
     * @method selectImage
     * @param event  {any}     	The DOM event that we are capturing from the File input field
     * @description    			Selects an image to be uploaded to the Socket.io chat service
     * @return {none}
     */
    HomePage.prototype.selectImage = function (event) {
        var _this = this;
        this._IMAGES
            .selectImage(event)
            .subscribe(function (res) {
            _this._PRELOADER.displayPreloader('Loading...');
            _this.image = res;
            _this.addImage();
        });
    };
    /**
     * @public
     * @method exportMessages
     * @description    			Publishes a console log of all the current session's chat messages
     * @return {none}
     */
    HomePage.prototype.exportMessages = function () {
        console.dir(this.messages);
    };
    /**
     * @public
     * @method scrollToLatestMessage
     * @description    			Triggers the scrollToBottom method of the Ionic Scroll API
     * @return {none}
     */
    HomePage.prototype.scrollToLatestMessage = function () {
        this.content.scrollToBottom(300);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], HomePage.prototype, "content", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"D:\ionic-communicata\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Ionic Communicata\n    </ion-title>\n    <ion-buttons end>\n\n\n       <!-- Display the Join Chat session button IF the displayRegisterAlias\n            value is set to true -->\n       <button\n          *ngIf="displayRegisterAlias"\n          ion-button\n          color="danger"\n          (click)="registerAlias()">Join!</button>\n\n\n       <!-- Display the Export Chat session button IF the displayRegisterAlias\n            value is set to false -->\n       <button start\n          *ngIf="!displayRegisterAlias"\n          ion-button\n          color="danger"\n          (click)="exportMessages()">\n          <ion-icon name="cloud-download"></ion-icon>\n      </button>\n\n\n       <!-- Display the Chat Logout button IF the displayRegisterAlias\n            value is set to false -->\n       <button end\n          *ngIf="!displayRegisterAlias"\n          ion-button\n          color="danger"\n          (click)="logOut()">\n          <ion-icon name="close"></ion-icon>\n       </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content padding>\n\n   <!-- IF the displayRegisterAlias value is set to true then the\n        user HASN\'T joined the chat session so we display a message\n        encouraging them to join -->\n   <section\n      *ngIf="displayRegisterAlias"\n      class="message">\n      <h1>Join now to see the chat!</h1>\n   </section>\n\n\n\n   <!-- IF the displayRegisterAlias value is set to false then the\n        user HAS joined the chat session so we display the current\n        list of messages -->\n   <div\n      *ngIf="!displayRegisterAlias"\n      class="chat-messages">\n   	  <section\n   	     *ngFor="let message of messages">\n\n\n         <!-- Here we use Angular 4+ If/then & else syntax to assign the correct\n              template for each posted message (is the current message from the\n              user who has just joined or not? If it is then we need to assign a\n              specific CSS class to differentiate the messages by sender) -->\n   	     <section *ngIf="message.sender == alias;then senderTemplate; else recipientTemplate"></section>\n\n\n         <!-- IF the message was sent by the user who has just joined then we use this template -->\n   	     <ng-template #senderTemplate>\n   	     	<section  class="chat-message sender">\n   	     	   <p>{{ message.message }}</p>\n\n\n               <!-- IF an image has been posted then we need to display that -->\n               <img *ngIf="message.image" [src]="message.image">\n\n\n               <!-- Display the sender details -->\n               <section class="message-footer">\n               	<small>Posted by {{ message.sender }} ({{ message.tagline }}) from {{ message.location }} on {{ message.published | date: "medium" }}</small>\n               </section>\n            </section>\n   	     </ng-template>\n\n\n\n\n   	     <!-- IF the message was NOT sent by the user who has just joined then we use this template instead -->\n   	     <ng-template #recipientTemplate>\n   	     	<section  class="chat-message other">\n   	     	   <p>{{ message.message }}</p>\n\n\n               <!-- IF an image has been posted then we need to display that -->\n               <img *ngIf="message.image" [src]="message.image">\n\n               <!-- Display the sender details -->\n               <section class="message-footer">\n               	<small>Posted by {{ message.sender }} ({{ message.tagline }}) from {{ message.location }} on {{ message.published | date: "medium" }}</small>\n               </section>\n            </section>\n   	     </ng-template>\n   	  </section>\n   </div>\n\n\n\n</ion-content>\n\n<!-- Conditionally display the input field for creating chat messages IF the user has \'logged in\' -->\n<ion-footer\n   *ngIf="!displayRegisterAlias"\n   class="footer">\n   <ion-grid padding>\n      <ion-row>\n\n\n         <!-- Display input field for selecting image files -->\n         <ion-col col-2>\n         	<div class="upload-button-wrapper" color="primary">\n               <ion-icon name="image"></ion-icon>\n               <input\n                  class="file-upload-button"\n                  type="file"\n                  (change)="selectImage($event)">\n            </div>\n         </ion-col>\n\n\n         <!-- Display input field for entering text message -->\n         <ion-col col-8>\n            <ion-input\n               type="text"\n               placeholder="Your chat message..."\n	           [(ngModel)]="message"></ion-input>\n         </ion-col>\n\n\n         <!-- Post the image or text message for the current chat session -->\n         <ion-col col-1>\n            <button\n	           ion-button\n	           clear\n	           color="primary"\n	           (click)="addMessage()">\n	           Add\n	        </button>\n         </ion-col>\n      </ion-row>\n   </ion-grid>\n</ion-footer>\n'/*ion-inline-end:"D:\ionic-communicata\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_images_images__["a" /* ImagesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_preloader_preloader__["a" /* PreloaderProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_sockets_sockets__["a" /* SocketsProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 123:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 123;

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-contact',template:/*ion-inline-start:"D:\ionic-communicata\src\pages\contact\contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-start></ion-icon>\n      @ionicframework\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\ionic-communicata\src\pages\contact\contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 166:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 166;

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-about',template:/*ion-inline-start:"D:\ionic-communicata\src\pages\about\about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      About\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"D:\ionic-communicata\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImagesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ImagesProvider = (function () {
    function ImagesProvider(http) {
        this.http = http;
        /**
         * @name _READER
         * @type object
         * @private
         * @description              Creates a FileReader API object
         */
        this._READER = new FileReader();
    }
    /**
     * @public
     * @method selectImage
     * @param event  {any}     	The DOM event that we are capturing from the File input field
     * @description    			Uses the FileReader API to capture the input field event, retrieve
     *                 			the selected image and return that as a base64 data URL courtesy of
     *							an Observable
     * @return {Observable}
     */
    ImagesProvider.prototype.selectImage = function (event) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            _this.handleImageSelection(event)
                .subscribe(function (res) {
                observer.next(res);
                observer.complete();
            });
        });
    };
    /**
     * @public
     * @method handleImageSelection
     * @param event  {any}     	The DOM event that we are capturing from the File input field
     * @description    			Uses the FileReader API to capture the input field event, retrieve
     *                 			the selected image and return that as a base64 data URL courtesy of
     *							an Observable
     * @return {Observable}
     */
    ImagesProvider.prototype.handleImageSelection = function (event) {
        var _this = this;
        var file = event.target.files[0];
        this._READER.readAsDataURL(file);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            _this._READER.onloadend = function () {
                observer.next(_this._READER.result);
                observer.complete();
            };
        });
    };
    ImagesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], ImagesProvider);
    return ImagesProvider;
}());

//# sourceMappingURL=images.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreloaderProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the PreloaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var PreloaderProvider = (function () {
    function PreloaderProvider(http, loadingCtrl) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
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
    PreloaderProvider.prototype.displayPreloader = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.present();
    };
    /**
     *
     * Hide animated loading bar
     *
     * @public
     * @method hidePreloader
     * @return {none}
     */
    PreloaderProvider.prototype.hidePreloader = function () {
        this.loading.dismiss();
    };
    PreloaderProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */]])
    ], PreloaderProvider);
    return PreloaderProvider;
}());

//# sourceMappingURL=preloader.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_socket_io__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng_socket_io__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SocketsProvider = (function () {
    function SocketsProvider(_HTTP, _SOCKET) {
        this._HTTP = _HTTP;
        this._SOCKET = _SOCKET;
        /**
         * @name _SERVER
         * @type object
         * @private
         * @description              The URI where the Socket.io server is running
         */
        this._SERVER = 'http://175.204.59.204:3000';
    }
    /**
     * @public
     * @method pollServer
     * @description    			Use Angular Http call to determine if server address is reachable
     * @return {Observable}
     */
    SocketsProvider.prototype.pollServer = function () {
        return this._HTTP
            .get(this._SERVER);
    };
    /**
     * @public
     * @method registerForChatService
     * @param alias  	{string}     	The user's screen name alias
     * @param handle  	{string}     	The user's tagline
     * @param location	{string}     	The user's location
     * @description    					Register's the user with the current Socket.io chat session
     * @return {none}
     */
    SocketsProvider.prototype.registerForChatService = function (alias, handle, location) {
        this._SOCKET.connect();
        this._SOCKET.emit('set-alias', { alias: alias, handle: handle, location: location });
    };
    /**
     * @public
     * @method retrieveMessages
     * @description    					Retrieves the messages currently active in the session
     * @return {Observable}
     */
    SocketsProvider.prototype.retrieveMessages = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this._SOCKET.on('message', function (data) {
                observer.next(data);
            });
        });
    };
    /**
     * @public
     * @method addMessage
     * @description    					Adds a message to the socket.io session
     * @return {none}
     */
    SocketsProvider.prototype.addMessage = function (message) {
        // Use the emit method of the Socket.io library to broadcast a custom event
        // ('add-message') to the service - this will then add the supplied data to
        // the current session message stream
        this._SOCKET.emit('add-message', { message: message });
    };
    /**
     * @public
     * @method addImage
     * @description    					Adds an image to the socket.io session
     * @return {none}
     */
    SocketsProvider.prototype.addImage = function (image) {
        // Use the emit method of the Socket.io library to broadcast a custom event
        // ('add-image') to the service - this will then add the supplied data to
        // the current session message stream
        this._SOCKET.emit('add-image', { image: image });
    };
    /**
     * @public
     * @method logOut
     * @description    					Closes the current user's socket.io session
     * @return {none}
     */
    SocketsProvider.prototype.logOut = function () {
        this._SOCKET.disconnect();
    };
    SocketsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3_ng_socket_io__["Socket"]])
    ], SocketsProvider);
    return SocketsProvider;
}());

//# sourceMappingURL=sockets.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(249);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_contact_contact__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_about_about__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng_socket_io__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_home_home__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_sockets_sockets__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__configurations_configuration__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_images_images__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_preloader_preloader__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_tabs_tabs__ = __webpack_require__(330);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_contact_contact__["a" /* ContactPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_8_ng_socket_io__["SocketIoModule"].forRoot(__WEBPACK_IMPORTED_MODULE_12__configurations_configuration__["a" /* config */].io)
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_contact_contact__["a" /* ContactPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_4__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__providers_sockets_sockets__["a" /* SocketsProvider */],
                __WEBPACK_IMPORTED_MODULE_13__providers_images_images__["a" /* ImagesProvider */],
                __WEBPACK_IMPORTED_MODULE_14__providers_preloader_preloader__["a" /* PreloaderProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 324:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home_home__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(207);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_0__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({template:/*ion-inline-start:"D:\ionic-communicata\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"D:\ionic-communicata\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return config; });
var config = {
    io: {
        url: "http://175.204.59.204:3000",
        options: {}
    }
};
//# sourceMappingURL=configuration.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"D:\ionic-communicata\src\pages\tabs\tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"D:\ionic-communicata\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ })

},[228]);
//# sourceMappingURL=main.js.map