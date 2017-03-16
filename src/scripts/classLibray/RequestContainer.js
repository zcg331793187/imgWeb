/**
 * Created by zhoucaiguang on 16/11/27.
 * Author:https://github.com/jf3096/request-container
 */

var PromiseState = (function () {
  function PromiseState(promiseFn, status) {
    if (status === void 0) { status = 0 /* none */; }


    this.promiseFn = promiseFn;
    this.status = status;
  }
  /**
   * perform the promise and pass value to corresponding class member
   */
  PromiseState.prototype.exec = function () {
    var _this = this;
    /**
     * ensure the data state is at 'none'
     */
    if (this.isNone()) {
      this.status = 1 /* loading */;




      return this.promise = this.promiseFn.then(function (payload) {
        _this.payload = payload;
        _this.status = 2 /* success */;
        return payload;
      }, function (error) {
        _this.error = error;
        _this.status = 3 /* error */;
        return error;
      });
    }
    throw "PromiseState.ts: current promise status is either loading or loaded. status = " + this.status;
  };
  /**
   * checks if current promise state is sending out a request
   */
  PromiseState.prototype.isLoading = function () {
    return this.status === 1 /* loading */;
  };
  /**
   * checks if current promise state is error
   */
  PromiseState.prototype.isError = function () {
    return this.status === 3 /* error */;
  };
  /**
   * checks if current promise state is success
   */
  PromiseState.prototype.isSuccess = function () {
    return this.status === 2 /* success */;
  };
  /**
   * checks if current promise state is initialized only
   */
  PromiseState.prototype.isNone = function () {
    return this.status === 0 /* none */;
  };
  return PromiseState;
}());


function completeWrapper(promise) {
  return {
    complete: function (action) {
      return promise.then(function (response) {
        action && action();
        return response;
      }, function (error) {
        action && action();
        return error;
      });
    }
  };
}


var RequestContainer = (function () {
  function RequestContainer() {
    this.container = {};
  }
  /**
   * Singleton lazy initializer
   */
  RequestContainer.getInstance = function () {
    if (!RequestContainer.instance) {
      RequestContainer.instance = new RequestContainer();
    }
    return RequestContainer.instance;
  };
  RequestContainer.prototype.put = function (key, promiseFn) {
    var _this = this;

    /**
     * check if the container has a same promise state
     */

    var isExist = this.verifyIfExist(key);
    if (isExist) {
      // console.log(promiseFn);
      /**
       * directly return a promise state that's in the request container
       * this is useful if multiple same http requests are made at the same time,
       * it will only make one outgoing request as the rest will point to the same promise state
       */

      promiseFn.abort();
      // promiseFn.abort();//cancel request
      return this.getPromiseState(key);
    }
    /**
     * not found, make request via promise state which is a wrapper
     */
    var promiseState = RequestContainer.executePromise(promiseFn);
    /**
     * place it in the container to indicate the request is sent and is waiting for response
     */
    this.container[key] = promiseState;
    /**
     * whenever the request completes, remove it from request container
     */
    completeWrapper(promiseState.promise).complete(function () {
      _this.remove(key);
      /*
      setTimeout(function () {

      },1000);
*/

    });
    return promiseState;
  };
  /**
   * create a wrapper and make a request
   * @returns {PromiseState<IResponse>} return the wrapper
   */
  RequestContainer.executePromise = function (promiseFn) {
    var promiseState = new PromiseState(promiseFn);
    promiseState.exec();
    return promiseState;
  };
  /**
   * clear the container and return all the promise state
   * the return values allow developer to further process it such as cancel all the promise
   */
  RequestContainer.prototype.clear = function () {
    var promiseStates = [];


    for (var key in this.container) {
      var promiseState = this.container[key];

      if(promiseState.status==1){

        promiseState.promiseFn.abort();
      }
      this.remove(key);
      promiseStates.push(promiseState);
    }
    return promiseStates;
  };
  /**
   * remove item from container
   */
  RequestContainer.prototype.remove = function (key) {
    delete this.container[key];
  };
  /**
   * a helper represent request container has a promise state
   */
  RequestContainer.prototype.verifyIfExist = function (key) {
    return !!this.getPromiseState(key);
  };
  /**
   * a request container getter
   */
  RequestContainer.prototype.getPromiseState = function (key) {
    return this.container[key];
  };
  return RequestContainer;
}());
