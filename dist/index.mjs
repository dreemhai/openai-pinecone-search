import{CREATE as e,DELETE as r,DELETE_MANY as t,GET_LIST as n,GET_MANY as o,GET_MANY_REFERENCE as i,GET_ONE as a,UPDATE as s,UPDATE_MANY as u}from"react-admin";import c from"path-browserify";import"firebase/firestore";import"firebase/storage";import l from"firebase/app";import"firebase/auth";const f=function(){function e(){}return e.prototype.then=function(r,t){const n=new e,o=this.s;if(o){const e=1&o?r:t;if(e){try{h(n,1,e(this.v))}catch(e){h(n,2,e)}return n}return this}return this.o=function(e){try{const o=e.v;1&e.s?h(n,1,r?r(o):o):t?h(n,1,t(o)):h(n,2,o)}catch(e){h(n,2,e)}},n},e}();function h(e,r,t){if(!e.s){if(t instanceof f){if(!t.s)return void(t.o=h.bind(null,e,r));1&r&&(r=t.s),t=t.v}if(t&&t.then)return void t.then(h.bind(null,e,r),h.bind(null,e,2));e.s=r,e.v=t;const n=e.o;n&&n(e)}}function d(e,r){try{var t=e()}catch(e){return r(e)}return t&&t.then?t.then(void 0,r):t}function p(e,r,t){e.sort(function(e,n){var o,i,a=e[r],s=n[r];return Number.isFinite(a)&&Number.isFinite(s)?(o=a,i=s):(o=(e[r]||"").toString().toLowerCase(),i=(n[r]||"").toString().toLowerCase()),o>i?"asc"===t?1:-1:o<i?"asc"===t?-1:1:0})}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var m=function(){this.title="🔥r-a-f: "},v={log:{configurable:!0},warn:{configurable:!0},error:{configurable:!0}};m.prototype.isEnabled=function(){return!!localStorage.getItem("LOGGING_ENABLED")},v.log.get=function(){return this.isEnabled()?console.log.bind(console,this.title):function(){for(var e=[],r=arguments.length;r--;)e[r]=arguments[r]}},v.warn.get=function(){return this.isEnabled()?console.warn.bind(console,this.title):function(){for(var e=[],r=arguments.length;r--;)e[r]=arguments[r]}},v.error.get=function(){return this.isEnabled()?console.error.bind(console,this.title):function(){for(var e=[],r=arguments.length;r--;)e[r]=arguments[r]}},Object.defineProperties(m.prototype,v);var g=new m;function y(e,r){e&&e.debug||r.logging?localStorage.setItem("LOGGING_ENABLED","true"):localStorage.removeItem("LOGGING_ENABLED")}var P=g.log,b=g.error;function w(e,r){if(!e)return r;if(!r)throw new Error("Resource name must be a string of length greater than 0 characters");var t=c.join("/",e,"/",r,"/");if((t.split("/").length-1)%2)throw new Error('The rootRef path must point to a "document" not a "collection"\ne.g. /collection/document/ or /collection/document/collection/document/');return t.slice(1,-1)}var R=function(e,r){this.fireWrapper=e,this.options=r,this.resources={},this.db=e.db()};R.prototype.GetResource=function(e){var r=this.resources[e];if(!r)throw new Error('react-admin-firebase: Cant find resource: "'+e+'"');return r},R.prototype.TryGetResourcePromise=function(e,r){try{var t=this;return P("resourceManager.TryGetResourcePromise",{relativePath:e,collectionQuery:r}),Promise.resolve(t.initPath(e,r)).then(function(){var r=t.resources[e];if(!r)throw new Error('react-admin-firebase: Cant find resource: "'+e+'"');return r})}catch(e){return Promise.reject(e)}},R.prototype.RefreshResource=function(e,r){try{var t=this;return P("resourceManager.RefreshResource",{relativePath:e,collectionQuery:r}),Promise.resolve(t.initPath(e,r)).then(function(){var n=t.resources[e],o=n.collection,i=t.applyQuery(o,r);return Promise.resolve(i.get()).then(function(e){n.list=e.docs.map(function(e){return t.parseFireStoreDocument(e)}),P("resourceManager.RefreshResource",{newDocs:e,resource:n,collectionPath:o.path})})})}catch(e){return Promise.reject(e)}},R.prototype.GetSingleDoc=function(e,r){try{var t=this;return Promise.resolve(t.initPath(e)).then(function(){var n=t.resources[e];return Promise.resolve(n.collection.doc(r).get()).then(function(o){if(!o.exists)throw new Error("react-admin-firebase: No id found matching: "+r);var i=t.parseFireStoreDocument(o);return P("resourceManager.GetSingleDoc",{relativePath:e,resource:n,docId:r,docSnap:o,result:i}),i})})}catch(e){return Promise.reject(e)}},R.prototype.initPath=function(e,r){try{var t=this,n=w(t.options.rootRef,e);return Promise.resolve(t.isCollectionAccessible(n,r)).then(function(r){var o=!!t.resources[e];if(P("resourceManager.initPath()",{absolutePath:n,isAccessible:r,hasBeenInited:o}),!r&&o)return P("resourceManager.initPath() not accessible, removing resource..."),void t.removeResource(e);if(o)P("resourceManager.initPath() has been initialized already...");else{var i=t.db.collection(n),a={collection:i,list:[],path:e,pathAbsolute:n};t.resources[e]=a,P("resourceManager.initPath() setting resource...",{resource:a,allResources:t.resources,collection:i,collectionPath:i.path})}})}catch(e){return Promise.reject(e)}},R.prototype.parseFireStoreDocument=function(e){var r=e.data();return Object.keys(r).forEach(function(e){var t=r[e];t&&t.toDate&&t.toDate instanceof Function&&(r[e]=t.toDate())}),Object.assign({},{id:e.id},r)},R.prototype.getUserLogin=function(){try{var e=this;return new Promise(function(r,t){e.fireWrapper.auth().onAuthStateChanged(function(e){r(e)})})}catch(e){return Promise.reject(e)}},R.prototype.isCollectionAccessible=function(e,r){try{var t=!1,n=this,o=d(function(){var t=n.db.collection(e),o=n.applyQuery(t,r);return Promise.resolve(o.limit(1).get()).then(function(){})},function(){return t=!0,!1});return o&&o.then?o.then(function(e){return!t||e}):!t||o}catch(e){return Promise.reject(e)}},R.prototype.removeResource=function(e){delete this.resources[e]},R.prototype.applyQuery=function(e,r){var t;return t=r?r(e):e,P("resourceManager.applyQuery() ...",{collection:e,collectionQuery:(r||"-").toString(),collref:t}),t};var G=function(e,r){this.fireWrapper=e,this.options=r,this.db=e.db(),this.rm=new R(this.fireWrapper,this.options)};G.prototype.apiGetList=function(e,r){try{P("apiGetList",{resourceName:e,params:r});var t=r.filter.collectionQuery;return delete r.filter.collectionQuery,Promise.resolve(this.tryGetResource(e,"REFRESH",t)).then(function(e){var t=e.list;if(null!=r.sort){var n=r.sort;p(t,n.field,"ASC"===n.order?"asc":"desc")}var o=function(e,r){if(!(t=r)||"{}"===JSON.stringify(t))return e;var t,n=Object.keys(r).map(function(e){return{name:e,value:(r[e]||"").toLowerCase()}});return e.filter(function(e){return n.reduce(function(r,t){return function(e,r,n){var o=e[t.name];return"string"==typeof o&&o.toString().toLowerCase().includes(n.toLowerCase())}(e,0,t.value)&&r},!0)})}(t,r.filter),i=(r.pagination.page-1)*r.pagination.perPage;return{data:o.slice(i,i+r.pagination.perPage),total:o.length}})}catch(e){return Promise.reject(e)}},G.prototype.apiGetOne=function(e,r){try{var t=this;return P("apiGetOne",{resourceName:e,params:r}),d(function(){return Promise.resolve(t.rm.GetSingleDoc(e,r.id)).then(function(e){return{data:e}})},function(){throw new Error("Error getting id: "+r.id+" from collection: "+e)})}catch(e){return Promise.reject(e)}},G.prototype.apiCreate=function(e,r){try{var t=this;return Promise.resolve(t.tryGetResource(e)).then(function(n){var o=!1;function i(e){if(o)return e;var i=t.db.collection("collections").doc().id;return Promise.resolve(t.parseDataAndUpload(n,i,r.data)).then(function(e){var r=Object.assign({},e);return t.checkRemoveIdField(r),Promise.resolve(t.addCreatedByFields(r)).then(function(){return Promise.resolve(t.addUpdatedByFields(r)).then(function(){return Promise.resolve(n.collection.doc(i).set(r,{merge:!1})).then(function(){return{data:Object.assign({},e,{id:i})}})})})})}P("apiCreate",{resourceName:e,resource:n,params:r});var a=r.data&&r.data.id;P("apiCreate",{hasOverridenDocId:a});var s=function(){if(a){var e=r.data.id;return Promise.resolve(n.collection.doc(e).get()).then(function(i){if(i.exists)throw new Error('the id:"'+e+"\" already exists, please use a unique string if overriding the 'id' field");return Promise.resolve(t.parseDataAndUpload(n,e,r.data)).then(function(r){if(!e)throw new Error("id must be a valid string");var i=Object.assign({},r);return t.checkRemoveIdField(i),Promise.resolve(t.addCreatedByFields(i)).then(function(){return Promise.resolve(t.addUpdatedByFields(i)).then(function(){return P("apiCreate",{docObj:i}),Promise.resolve(n.collection.doc(e).set(i,{merge:!1})).then(function(){return o=!0,{data:Object.assign({},r,{id:e})}})})})})})}}();return s&&s.then?s.then(i):i(s)})}catch(e){return Promise.reject(e)}},G.prototype.apiUpdate=function(e,r){try{var t=this,n=r.id;return delete r.data.id,Promise.resolve(t.tryGetResource(e)).then(function(o){return P("apiUpdate",{resourceName:e,resource:o,params:r}),Promise.resolve(t.parseDataAndUpload(o,n,r.data)).then(function(e){var r=Object.assign({},e);return t.checkRemoveIdField(r),Promise.resolve(t.addUpdatedByFields(r)).then(function(){return o.collection.doc(n).update(r).catch(function(e){b("apiUpdate error",{error:e})}),{data:Object.assign({},e,{id:n})}})})})}catch(e){return Promise.reject(e)}},G.prototype.apiUpdateMany=function(e,r){try{var t=this;return delete r.data.id,Promise.resolve(t.tryGetResource(e)).then(function(n){return P("apiUpdateMany",{resourceName:e,resource:n,params:r}),Promise.resolve(Promise.all(r.ids.map(function(e){try{return Promise.resolve(t.parseDataAndUpload(n,e,r.data)).then(function(r){var o=Object.assign({},r);return t.checkRemoveIdField(o),Promise.resolve(t.addUpdatedByFields(o)).then(function(){return n.collection.doc(e).update(o).catch(function(e){b("apiUpdateMany error",{error:e})}),Object.assign({},r,{id:e})})})}catch(e){return Promise.reject(e)}}))).then(function(e){return{data:e}})})}catch(e){return Promise.reject(e)}},G.prototype.apiDelete=function(e,r){try{return Promise.resolve(this.tryGetResource(e)).then(function(t){return P("apiDelete",{resourceName:e,resource:t,params:r}),t.collection.doc(r.id).delete().catch(function(e){b("apiDelete error",{error:e})}),{data:r.previousData}})}catch(e){return Promise.reject(e)}},G.prototype.apiDeleteMany=function(e,r){try{var t=this;return Promise.resolve(t.tryGetResource(e)).then(function(n){P("apiDeleteMany",{resourceName:e,resource:n,params:r});for(var o=[],i=t.db.batch(),a=0,s=r.ids;a<s.length;a+=1){var u=s[a];i.delete(n.collection.doc(u)),o.push({id:u})}return i.commit().catch(function(e){b("apiDeleteMany error",{error:e})}),{data:o}})}catch(e){return Promise.reject(e)}},G.prototype.apiGetMany=function(e,r){try{return Promise.resolve(this.tryGetResource(e,"REFRESH")).then(function(t){return P("apiGetMany",{resourceName:e,resource:t,params:r}),Promise.resolve(Promise.all(r.ids.map(function(e){return t.collection.doc(e).get()}))).then(function(e){return{data:e.map(function(e){return Object.assign({},e.data(),{id:e.id})})}})})}catch(e){return Promise.reject(e)}},G.prototype.apiGetManyReference=function(e,r){try{return Promise.resolve(this.tryGetResource(e,"REFRESH")).then(function(t){P("apiGetManyReference",{resourceName:e,resource:t,params:r});var n=r.target,o=r.id,i=t.list.filter(function(e){return e[n]===o});if(null!=r.sort){var a=r.sort;p(i,a.field,"ASC"===a.order?"asc":"desc")}var s=(r.pagination.page-1)*r.pagination.perPage;return{data:i.slice(s,s+r.pagination.perPage),total:i.length}})}catch(e){return Promise.reject(e)}},G.prototype.tryGetResource=function(e,r,t){try{var n=this;function o(){return n.rm.TryGetResourcePromise(e,t)}var i=function(){if(r)return Promise.resolve(n.rm.RefreshResource(e,t)).then(function(){})}();return i&&i.then?i.then(o):o()}catch(e){return Promise.reject(e)}},G.prototype.getCurrentUserEmail=function(){try{return Promise.resolve(this.rm.getUserLogin()).then(function(e){return e?e.email:"annonymous user"})}catch(e){return Promise.reject(e)}},G.prototype.parseDataAndUpload=function(e,r,t){try{var n=this;if(!t)return t;var o=e.collection.doc(r).path;return Promise.resolve(Promise.all(Object.keys(t).map(function(e){try{function r(){return Promise.resolve(n.parseDataField(i,o,e)).then(function(){})}var i=t[e],a=Array.isArray(i),s=function(){if(a)return Promise.resolve(Promise.all(i.map(function(r,t){return i[t]&&i[t].hasOwnProperty("rawFile")?Promise.all([n.parseDataField(i[t],o,e+t)]):Promise.all(Object.keys(r).map(function(i){return n.parseDataField(r[i],o,e+i+t)}))}))).then(function(){})}();return Promise.resolve(s&&s.then?s.then(r):r())}catch(e){return Promise.reject(e)}}))).then(function(){return t})}catch(e){return Promise.reject(e)}},G.prototype.checkRemoveIdField=function(e){this.options.dontAddIdFieldToDoc&&delete e.id},G.prototype.addCreatedByFields=function(e){try{var r=this;if(r.options.disableMeta)return;return Promise.resolve(r.getCurrentUserEmail()).then(function(t){e.createdate=r.fireWrapper.serverTimestamp(),e.createdby=t})}catch(e){return Promise.reject(e)}},G.prototype.addUpdatedByFields=function(e){try{var r=this;if(r.options.disableMeta)return;return Promise.resolve(r.getCurrentUserEmail()).then(function(t){e.lastupdate=r.fireWrapper.serverTimestamp(),e.updatedby=t})}catch(e){return Promise.reject(e)}},G.prototype.parseDataField=function(e,r,t){try{if(!e||!e.hasOwnProperty("rawFile"))return;return Promise.resolve(this.uploadAndGetLink(e.rawFile,r,t)).then(function(r){e.src=r,delete e.rawFile})}catch(e){return Promise.reject(e)}},G.prototype.uploadAndGetLink=function(e,r,t){try{var n=c.join(r,t);return Promise.resolve(this.saveFile(n,e))}catch(e){return Promise.reject(e)}},G.prototype.saveFile=function(e,r){try{P("saveFile() saving file...",{storagePath:e,rawFile:r});var t=this.fireWrapper.storage().ref(e).put(r);return d(function(){return Promise.resolve(new Promise(function(e,r){return t.then(e).catch(r)})).then(function(r){return Promise.resolve(r.ref.getDownloadURL()).then(function(t){return P("saveFile() saved file",{storagePath:e,taskResult:r,getDownloadURL:t}),t})})},function(e){b("storage/unknown"===e.code?'saveFile() error saving file, No bucket found! Try clicking "Get Started" in firebase -> storage':"saveFile() error saving file",{storageError:e})})}catch(e){return Promise.reject(e)}};var j,A=function(){};function T(c,l){var p=l||{};!function(e,r){if(!(e||r&&r.app))throw new Error("Please pass the Firebase firebaseConfig object or options.app to the FirebaseAuthProvider");r.rootRef&&w(r.rootRef,"test")}(c,p),y(c,p),P("react-admin-firebase:: Creating FirebaseDataProvider",{firebaseConfig:c,options:p});var m=new A;return m.init(c,l),j=new G(m,p),function(c,l,p){try{var m;return P("FirebaseDataProvider: event",{type:c,resourceName:l,params:p}),Promise.resolve(d(function(){var d=function(e,r){var t,n=-1;e:{for(var o=0;o<r.length;o++){var i=r[o][0];if(i){var a=i();if(a&&a.then)break e;if(a===e){n=o;break}}else n=o}if(-1!==n){do{for(var s=r[n][1];!s;)s=r[++n][1];var u=s();if(u&&u.then){t=!0;break e}var c=r[n][2];n++}while(c&&!c());return u}}const l=new f,d=h.bind(null,l,2);return(t?u.then(p):a.then(function t(a){for(;;){if(a===e){n=o;break}if(++o===r.length){if(-1!==n)break;return void h(l,1,u)}if(i=r[o][0]){if((a=i())&&a.then)return void a.then(t).then(void 0,d)}else n=o}do{for(var s=r[n][1];!s;)s=r[++n][1];var u=s();if(u&&u.then)return void u.then(p).then(void 0,d);var c=r[n][2];n++}while(c&&!c());h(l,1,u)})).then(void 0,d),l;function p(e){for(;;){var t=r[n][2];if(!t||t())break;for(var o=r[++n][1];!o;)o=r[++n][1];if((e=o())&&e.then)return void e.then(p).then(void 0,d)}h(l,1,e)}}(c,[[function(){return o},function(){return Promise.resolve(j.apiGetMany(l,p)).then(function(e){m=e})}],[function(){return i},function(){return Promise.resolve(j.apiGetManyReference(l,p)).then(function(e){m=e})}],[function(){return n},function(){return Promise.resolve(j.apiGetList(l,p)).then(function(e){m=e})}],[function(){return a},function(){return Promise.resolve(j.apiGetOne(l,p)).then(function(e){m=e})}],[function(){return e},function(){return Promise.resolve(j.apiCreate(l,p)).then(function(e){m=e})}],[function(){return s},function(){return Promise.resolve(j.apiUpdate(l,p)).then(function(e){m=e})}],[function(){return u},function(){return Promise.resolve(j.apiUpdateMany(l,p)).then(function(e){m=e})}],[function(){return r},function(){return Promise.resolve(j.apiDelete(l,p)).then(function(e){m=e})}],[function(){return t},function(){return Promise.resolve(j.apiDeleteMany(l,p)).then(function(e){m=e})}],[void 0,function(){throw new Error('Unknkown dataprovider command type: "'+c+'"')}]]);return d&&d.then?d.then(function(e){return m}):m},function(e){throw{status:409,message:e.toString(),json:m}}))}catch(e){return Promise.reject(e)}}}A.prototype.init=function(e,r){this.app=function(e,r){return r.app?r.app:l.apps.length?l.app():l.initializeApp(e)}(e,r),this.firestore=this.app.firestore()},A.prototype.db=function(){return this.firestore},A.prototype.serverTimestamp=function(){return new Date},A.prototype.auth=function(){return this.app.auth()},A.prototype.storage=function(){return this.app.storage()};var F=function(e,r){var t=r||{};P("Auth Client: initializing...",{firebaseConfig:e,options:t});var n=new A;n.init(e,t),this.auth=n.auth(),this.setPersistence(t.persistence)};function k(e,r){!function(e,r){if(!(e||r&&r.app))throw new Error("Please pass the Firebase firebaseConfig object or options.app to the FirebaseAuthProvider")}(e,r);var t=new F(e,r);return y(e,r),{login:function(e){return t.HandleAuthLogin(e)},logout:function(){return t.HandleAuthLogout()},checkAuth:function(){return t.HandleAuthCheck()},checkError:function(e){return t.HandleAuthError(e)},getPermissions:function(){return t.HandleGetPermissions()},getJWTAuthTime:function(){return t.HandleGetJWTAuthTime()},getJWTExpirationTime:function(){return t.HandleGetJWTExpirationTime()},getJWTSignInProvider:function(){return t.HandleGetJWTSignInProvider()},getJWTClaims:function(){return t.HandleGetPermissions()},getJWTToken:function(){return t.HandleGetJWTToken()}}}F.prototype.setPersistence=function(e){var r;switch(e){case"local":r=l.auth.Auth.Persistence.LOCAL;break;case"none":r=l.auth.Auth.Persistence.NONE;break;case"session":default:r=l.auth.Auth.Persistence.SESSION}P("setPersistence",{persistenceInput:e,persistenceResolved:r}),this.auth.setPersistence(r).catch(function(e){return console.error(e)})},F.prototype.HandleAuthLogin=function(e){try{var r=this,t=e.username,n=e.password;return t&&n?d(function(){return Promise.resolve(r.auth.signInWithEmailAndPassword(t,n)).then(function(e){return P("HandleAuthLogin: user sucessfully logged in",{user:e}),e})},function(){throw P("HandleAuthLogin: invalid credentials",{params:e}),new Error("Login error: invalid credentials")}):r.getUserLogin()}catch(e){return Promise.reject(e)}},F.prototype.HandleAuthLogout=function(){return this.auth.signOut()},F.prototype.HandleAuthError=function(e){P("HandleAuthLogin: invalid credentials",{errorHttp:e});var r=!!e&&e.status;return 409===r||200===r?Promise.resolve("API is authenticated"):Promise.reject("Recieved authentication error from API")},F.prototype.HandleAuthCheck=function(){return this.getUserLogin()},F.prototype.getUserLogin=function(){var e=this;return new Promise(function(r,t){if(e.auth.currentUser)return r(e.auth.currentUser);var n=e.auth.onAuthStateChanged(function(e){n(),e?r(e):t()})})},F.prototype.HandleGetPermissions=function(){try{var e=this;return d(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return Promise.resolve(e.getIdTokenResult()).then(function(e){return e.claims})})},function(e){return P("HandleGetPermission: no user is logged in or tokenResult error",{e:e}),null})}catch(e){return Promise.reject(e)}},F.prototype.HandleGetJWTAuthTime=function(){try{var e=this;return d(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return Promise.resolve(e.getIdTokenResult()).then(function(e){return e.authTime})})},function(e){return P("HandleGetJWTAuthTime: no user is logged in or tokenResult error",{e:e}),null})}catch(e){return Promise.reject(e)}},F.prototype.HandleGetJWTExpirationTime=function(){try{var e=this;return d(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return Promise.resolve(e.getIdTokenResult()).then(function(e){return e.expirationTime})})},function(e){return P("HandleGetJWTExpirationTime: no user is logged in or tokenResult error",{e:e}),null})}catch(e){return Promise.reject(e)}},F.prototype.HandleGetJWTSignInProvider=function(){try{var e=this;return d(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return Promise.resolve(e.getIdTokenResult()).then(function(e){return e.signInProvider})})},function(e){return P("HandleGetJWTSignInProvider: no user is logged in or tokenResult error",{e:e}),null})}catch(e){return Promise.reject(e)}},F.prototype.HandleGetJWTIssuedAtTime=function(){try{var e=this;return d(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return Promise.resolve(e.getIdTokenResult()).then(function(e){return e.issuedAtTime})})},function(e){return P("HandleGetJWTIssuedAtTime: no user is logged in or tokenResult error",{e:e}),null})}catch(e){return Promise.reject(e)}},F.prototype.HandleGetJWTToken=function(){try{var e=this;return d(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return Promise.resolve(e.getIdTokenResult()).then(function(e){return e.token})})},function(e){return P("HandleGetJWTIssuedAtTime: no user is logged in or tokenResult error",{e:e}),null})}catch(e){return Promise.reject(e)}};export{T as FirebaseDataProvider,k as FirebaseAuthProvider};
//# sourceMappingURL=index.mjs.map
