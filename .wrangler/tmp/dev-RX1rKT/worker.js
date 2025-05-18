(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // C:/Users/Administrator/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/common.ts
  var __facade_middleware__ = [];
  function __facade_register__(...args) {
    __facade_middleware__.push(...args.flat());
  }
  __name(__facade_register__, "__facade_register__");
  function __facade_registerInternal__(...args) {
    __facade_middleware__.unshift(...args.flat());
  }
  __name(__facade_registerInternal__, "__facade_registerInternal__");
  function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
    const [head, ...tail] = middlewareChain;
    const middlewareCtx = {
      dispatch,
      next(newRequest, newEnv) {
        return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
      }
    };
    return head(request, env, ctx, middlewareCtx);
  }
  __name(__facade_invokeChain__, "__facade_invokeChain__");
  function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
    return __facade_invokeChain__(request, env, ctx, dispatch, [
      ...__facade_middleware__,
      finalMiddleware
    ]);
  }
  __name(__facade_invoke__, "__facade_invoke__");

  // C:/Users/Administrator/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/loader-sw.ts
  var __FACADE_EVENT_TARGET__;
  if (globalThis.MINIFLARE) {
    __FACADE_EVENT_TARGET__ = new (Object.getPrototypeOf(WorkerGlobalScope))();
  } else {
    __FACADE_EVENT_TARGET__ = new EventTarget();
  }
  function __facade_isSpecialEvent__(type) {
    return type === "fetch" || type === "scheduled";
  }
  __name(__facade_isSpecialEvent__, "__facade_isSpecialEvent__");
  var __facade__originalAddEventListener__ = globalThis.addEventListener;
  var __facade__originalRemoveEventListener__ = globalThis.removeEventListener;
  var __facade__originalDispatchEvent__ = globalThis.dispatchEvent;
  globalThis.addEventListener = function(type, listener, options) {
    if (__facade_isSpecialEvent__(type)) {
      __FACADE_EVENT_TARGET__.addEventListener(
        type,
        listener,
        options
      );
    } else {
      __facade__originalAddEventListener__(type, listener, options);
    }
  };
  globalThis.removeEventListener = function(type, listener, options) {
    if (__facade_isSpecialEvent__(type)) {
      __FACADE_EVENT_TARGET__.removeEventListener(
        type,
        listener,
        options
      );
    } else {
      __facade__originalRemoveEventListener__(type, listener, options);
    }
  };
  globalThis.dispatchEvent = function(event) {
    if (__facade_isSpecialEvent__(event.type)) {
      return __FACADE_EVENT_TARGET__.dispatchEvent(event);
    } else {
      return __facade__originalDispatchEvent__(event);
    }
  };
  globalThis.addMiddleware = __facade_register__;
  globalThis.addMiddlewareInternal = __facade_registerInternal__;
  var __facade_waitUntil__ = Symbol("__facade_waitUntil__");
  var __facade_response__ = Symbol("__facade_response__");
  var __facade_dispatched__ = Symbol("__facade_dispatched__");
  var __Facade_ExtendableEvent__ = class ___Facade_ExtendableEvent__ extends Event {
    static {
      __name(this, "__Facade_ExtendableEvent__");
    }
    [__facade_waitUntil__] = [];
    waitUntil(promise) {
      if (!(this instanceof ___Facade_ExtendableEvent__)) {
        throw new TypeError("Illegal invocation");
      }
      this[__facade_waitUntil__].push(promise);
    }
  };
  var __Facade_FetchEvent__ = class ___Facade_FetchEvent__ extends __Facade_ExtendableEvent__ {
    static {
      __name(this, "__Facade_FetchEvent__");
    }
    #request;
    #passThroughOnException;
    [__facade_response__];
    [__facade_dispatched__] = false;
    constructor(type, init) {
      super(type);
      this.#request = init.request;
      this.#passThroughOnException = init.passThroughOnException;
    }
    get request() {
      return this.#request;
    }
    respondWith(response) {
      if (!(this instanceof ___Facade_FetchEvent__)) {
        throw new TypeError("Illegal invocation");
      }
      if (this[__facade_response__] !== void 0) {
        throw new DOMException(
          "FetchEvent.respondWith() has already been called; it can only be called once.",
          "InvalidStateError"
        );
      }
      if (this[__facade_dispatched__]) {
        throw new DOMException(
          "Too late to call FetchEvent.respondWith(). It must be called synchronously in the event handler.",
          "InvalidStateError"
        );
      }
      this.stopImmediatePropagation();
      this[__facade_response__] = response;
    }
    passThroughOnException() {
      if (!(this instanceof ___Facade_FetchEvent__)) {
        throw new TypeError("Illegal invocation");
      }
      this.#passThroughOnException();
    }
  };
  var __Facade_ScheduledEvent__ = class ___Facade_ScheduledEvent__ extends __Facade_ExtendableEvent__ {
    static {
      __name(this, "__Facade_ScheduledEvent__");
    }
    #scheduledTime;
    #cron;
    #noRetry;
    constructor(type, init) {
      super(type);
      this.#scheduledTime = init.scheduledTime;
      this.#cron = init.cron;
      this.#noRetry = init.noRetry;
    }
    get scheduledTime() {
      return this.#scheduledTime;
    }
    get cron() {
      return this.#cron;
    }
    noRetry() {
      if (!(this instanceof ___Facade_ScheduledEvent__)) {
        throw new TypeError("Illegal invocation");
      }
      this.#noRetry();
    }
  };
  __facade__originalAddEventListener__("fetch", (event) => {
    const ctx = {
      waitUntil: event.waitUntil.bind(event),
      passThroughOnException: event.passThroughOnException.bind(event)
    };
    const __facade_sw_dispatch__ = /* @__PURE__ */ __name(function(type, init) {
      if (type === "scheduled") {
        const facadeEvent = new __Facade_ScheduledEvent__("scheduled", {
          scheduledTime: Date.now(),
          cron: init.cron ?? "",
          noRetry() {
          }
        });
        __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
        event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
      }
    }, "__facade_sw_dispatch__");
    const __facade_sw_fetch__ = /* @__PURE__ */ __name(function(request, _env, ctx2) {
      const facadeEvent = new __Facade_FetchEvent__("fetch", {
        request,
        passThroughOnException: ctx2.passThroughOnException
      });
      __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
      facadeEvent[__facade_dispatched__] = true;
      event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
      const response = facadeEvent[__facade_response__];
      if (response === void 0) {
        throw new Error("No response!");
      }
      return response;
    }, "__facade_sw_fetch__");
    event.respondWith(
      __facade_invoke__(
        event.request,
        globalThis,
        ctx,
        __facade_sw_dispatch__,
        __facade_sw_fetch__
      )
    );
  });
  __facade__originalAddEventListener__("scheduled", (event) => {
    const facadeEvent = new __Facade_ScheduledEvent__("scheduled", {
      scheduledTime: event.scheduledTime,
      cron: event.cron,
      noRetry: event.noRetry.bind(event)
    });
    __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
    event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
  });

  // C:/Users/Administrator/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
  var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
    try {
      return await middlewareCtx.next(request, env);
    } finally {
      try {
        if (request.body !== null && !request.bodyUsed) {
          const reader = request.body.getReader();
          while (!(await reader.read()).done) {
          }
        }
      } catch (e) {
        console.error("Failed to drain the unused request body.", e);
      }
    }
  }, "drainBody");
  var middleware_ensure_req_body_drained_default = drainBody;

  // C:/Users/Administrator/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
  function reduceError(e) {
    return {
      name: e?.name,
      message: e?.message ?? String(e),
      stack: e?.stack,
      cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
    };
  }
  __name(reduceError, "reduceError");
  var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
    try {
      return await middlewareCtx.next(request, env);
    } catch (e) {
      const error = reduceError(e);
      return Response.json(error, {
        status: 500,
        headers: { "MF-Experimental-Error-Stack": "true" }
      });
    }
  }, "jsonError");
  var middleware_miniflare3_json_error_default = jsonError;

  // .wrangler/tmp/bundle-OPLZyB/middleware-insertion-facade.js
  __facade_registerInternal__([middleware_ensure_req_body_drained_default, middleware_miniflare3_json_error_default]);

  // worker.js
  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
  async function handleRequest(request) {
    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8"
      }
    });
  }
  __name(handleRequest, "handleRequest");
  var html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\u5BC6\u7801\u751F\u6210\u5668</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --primary-color: #0070f3;
      --secondary-color: #00c8ff;
      --accent-color: #7928ca;
      --background-dark: #0f1624;
      --background-light: #171f30;
      --text-color: #e6f1ff;
      --border-color: rgba(255, 255, 255, 0.1);
      --success-color: #00c853;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    body {
      background: linear-gradient(135deg, var(--background-dark) 0%, var(--background-light) 100%);
      color: var(--text-color);
      line-height: 1.6;
      padding: 20px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow-x: hidden;
    }
    
    body::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 50% 50%, rgba(121, 40, 202, 0.1), transparent 30%),
                 radial-gradient(circle at 85% 30%, rgba(0, 200, 255, 0.1), transparent 30%);
      z-index: -1;
    }
    
    h1 {
      text-align: center;
      margin-bottom: 30px;
      color: var(--text-color);
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
      position: relative;
    }
    
    h1::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      border-radius: 3px;
    }
    
    .container {
      background: rgba(23, 31, 48, 0.8);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3),
                 0 0 0 1px var(--border-color);
      width: 100%;
      max-width: 600px;
      position: relative;
      overflow: hidden;
    }
    
    .container::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color));
    }
    
    .section {
      margin-bottom: 30px;
      padding-bottom: 25px;
      border-bottom: 1px solid var(--border-color);
      position: relative;
    }
    
    .section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    
    h2 {
      font-size: 1.3rem;
      margin-bottom: 20px;
      color: var(--text-color);
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    
    h2 i {
      margin-right: 10px;
      color: var(--secondary-color);
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      font-weight: 500;
      color: var(--text-color);
      font-size: 0.95rem;
    }
    
    .slider-container {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.05);
      padding: 12px 15px;
      border-radius: 10px;
      border: 1px solid var(--border-color);
    }
    
    input[type="range"] {
      flex: 1;
      height: 5px;
      -webkit-appearance: none;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      outline: none;
      border-radius: 5px;
    }
    
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 22px;
      height: 22px;
      background: var(--text-color);
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
      border: 2px solid var(--secondary-color);
      transition: all 0.2s ease;
    }
    
    input[type="range"]::-webkit-slider-thumb:hover {
      transform: scale(1.1);
    }
    
    .length-value {
      min-width: 40px;
      text-align: center;
      margin-left: 15px;
      font-weight: bold;
      font-size: 1.1rem;
      color: var(--secondary-color);
      background: rgba(0, 200, 255, 0.1);
      padding: 5px 10px;
      border-radius: 5px;
    }
    
    .checkbox-group {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      background: rgba(255, 255, 255, 0.05);
      padding: 15px;
      border-radius: 10px;
      border: 1px solid var(--border-color);
    }
    
    .checkbox-item {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    
    /* \u6DFB\u52A0label\u4E0Echeckbox\u4E4B\u95F4\u7684\u95F4\u8DDD */
    .checkbox-item label {
      margin-left: 5px;
    }
    
    .custom-chars {
      margin-left: 10px;
      display: flex;
      align-items: center;
    }
    
    .custom-chars label {
      margin-right: 5px;
    }
    
    .custom-chars input {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      color: #fff;
      padding: 5px 8px;
      font-size: 14px;
    }
    padding: 8px 12px;
      background: rgba(0, 112, 243, 0.1);
      border-radius: 8px;
      transition: all 0.2s ease;
      min-width: 80px; /* \u786E\u4FDD\u6240\u6709\u590D\u9009\u6846\u9879\u5BBD\u5EA6\u4E00\u81F4 */
      justify-content: flex-start; /* \u786E\u4FDD\u5185\u5BB9\u5DE6\u5BF9\u9F50 */
    }
    
    .checkbox-item label {
      margin-bottom: 0; /* \u79FB\u9664\u5E95\u90E8\u8FB9\u8DDD */
      font-size: 0.9rem; /* \u7EDF\u4E00\u5B57\u4F53\u5927\u5C0F */
      width: 40px; /* \u7EDF\u4E00\u6807\u7B7E\u5BBD\u5EA6 */
      text-align: left; /* \u6587\u672C\u5DE6\u5BF9\u9F50 */
    }
    
    /* \u4FEE\u6539\u7279\u6B8A\u5B57\u7B26\u8F93\u5165\u6846\u6837\u5F0F\uFF0C\u4F7F\u5176\u663E\u793A\u5728\u53F3\u4FA7 */
    .char-settings-container {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 5px;
    }
    
    .checkbox-container {
      flex: 1;
      min-width: 250px;
    }
    
    .custom-chars {
      flex: 1;
      min-width: 200px;
      margin-top: 0;
      background: rgba(255, 255, 255, 0.05);
      padding: 15px;
      border-radius: 10px;
      border: 1px solid var(--border-color);
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    input[type="text"] {
      width: 100px;
      padding: 2px 0px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      font-size: 0.95rem;
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-color);
      transition: all 0.2s ease;
    }
    
    input[type="text"]:focus {
      outline: none;
      border-color: var(--secondary-color);
      box-shadow: 0 0 0 2px rgba(0, 200, 255, 0.2);
    }
    
    .password-display {
      position: relative;
      margin-bottom: 20px;
    }
    
    #password {
      width: 100%;
      padding: 15px;
      font-size: 20px;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.05);
      text-align: center;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
      user-select: all;
      color: var(--text-color);
      box-shadow: 0 0 15px rgba(0, 200, 255, 0.1) inset;
      transition: all 0.3s ease;
    }
    
    #password:focus {
      outline: none;
      border-color: var(--secondary-color);
      box-shadow: 0 0 0 2px rgba(0, 200, 255, 0.2), 0 0 15px rgba(0, 200, 255, 0.1) inset;
    }
    
    .btn-group {
      display: flex;
      gap: 15px;
    }
    
    .btn {
      flex: 1;
      padding: 14px 20px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      z-index: 1;
    }
    
    .btn::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      z-index: -1;
      transition: all 0.3s ease;
    }
    
    .btn:hover::before {
      filter: brightness(1.1);
    }
    
    .btn:active {
      transform: translateY(2px);
    }
    
    .btn i {
      margin-right: 8px;
      font-size: 18px;
    }
    
    #copyBtn::before {
      background: linear-gradient(135deg, #0070f3, #00c8ff);
    }
    
    #generateBtn::before {
      background: linear-gradient(135deg, #7928ca, #ff0080);
    }
    
    .btn {
      color: white;
    }
    
    .toast {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 200, 83, 0.9);
      color: white;
      padding: 12px 25px;
      border-radius: 50px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      opacity: 0;
      transition: all 0.3s ease;
      pointer-events: none;
      display: flex;
      align-items: center;
      backdrop-filter: blur(10px);
    }
    
    .toast.show {
      opacity: 1;
      transform: translate(-50%, -10px);
    }
    
    .toast i {
      margin-right: 8px;
    }
    
    /* \u6DFB\u52A0\u52A8\u753B\u6548\u679C */
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(0, 200, 255, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(0, 200, 255, 0); }
      100% { box-shadow: 0 0 0 0 rgba(0, 200, 255, 0); }
    }
    
    .strength-meter {
      height: 5px;
      border-radius: 3px;
      margin-top: 10px;
      background: rgba(255, 255, 255, 0.1);
      overflow: hidden;
      position: relative;
    }
    
    .strength-meter-fill {
      height: 100%;
      width: 0;
      border-radius: 3px;
      transition: all 0.5s ease;
    }
    
    .strength-text {
      font-size: 0.85rem;
      margin-top: 5px;
      text-align: right;
      font-weight: 500;
    }
    
    /* \u54CD\u5E94\u5F0F\u8BBE\u8BA1 */
    @media (max-width: 480px) {
      body {
        padding: 15px;
      }
      
      .container {
        padding: 20px;
      }
      
      h1 {
        font-size: 1.8rem;
      }
      
      #password {
        font-size: 16px;
        padding: 12px;
      }
      
      .checkbox-group {
        gap: 10px;
      }
      
      .checkbox-item {
        padding: 6px 10px;
      }
      
      .btn {
        padding: 12px 15px;
      }
    }
  </style>
</head>
<body>
  <h1>\u5BC6\u7801\u751F\u6210\u5668</h1>
  
  <div class="container">
    <div class="section">
      <h2><i class="fas fa-cog"></i> \u8BBE\u7F6E</h2>
      
      <div class="form-group">
        <label for="length">\u5BC6\u7801\u957F\u5EA6:</label>
        <div class="slider-container">
          <input type="range" id="length" min="6" max="32" value="8">
          <span class="length-value" id="lengthValue">8</span>
        </div>
      </div>
      
      <div class="form-group">
        <label>\u6240\u542B\u5B57\u7B26:</label>
        <div class="char-settings-container">
          <div class="checkbox-container">
            <div class="checkbox-group">
              <div class="checkbox-item">
                <input type="checkbox" id="lowercase" checked>
                <label for="lowercase">\u5C0F\u5199</label>
              </div>
              
              <div class="checkbox-item">
                <input type="checkbox" id="uppercase" checked>
                <label for="uppercase">\u5927\u5199</label>
              </div>
              
              <div class="checkbox-item">
                <input type="checkbox" id="numbers" checked>
                <label for="numbers">\u6570\u5B57</label>
              </div>
              
              <div class="checkbox-item">
                <input type="checkbox" id="symbols">
                <label for="symbols">!@#$</label>
              </div>
              <div class="checkbox-item">
                <input type="text" id="customSymbols" value="!@#$%^&" style="display: none;">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2><i class="fas fa-key"></i> \u751F\u6210\u7684\u5BC6\u7801</h2>
      
      <div class="password-display">
        <input type="text" id="password" readonly>
        <div class="strength-meter">
          <div class="strength-meter-fill" id="strengthMeter"></div>
        </div>
        <div class="strength-text" id="strengthText"></div>
      </div>
      
      <div class="btn-group">
        <button class="btn" id="copyBtn">
          <i class="fas fa-copy"></i> \u590D\u5236
        </button>
        
        <button class="btn" id="generateBtn">
          <i class="fas fa-sync-alt"></i> \u66F4\u65B0
        </button>
      </div>
    </div>
  </div>
  
  <div class="toast" id="toast"><i class="fas fa-check-circle"></i> \u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F</div>
  
  <script>
    // DOM \u5143\u7D20
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('lengthValue');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    const customSymbolsInput = document.getElementById('customSymbols');
    const passwordDisplay = document.getElementById('password');
    const copyBtn = document.getElementById('copyBtn');
    const generateBtn = document.getElementById('generateBtn');
    const toast = document.getElementById('toast');
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');
    
    // \u66F4\u65B0\u5BC6\u7801\u957F\u5EA6\u663E\u793A
    lengthSlider.addEventListener('input', () => {
      lengthValue.textContent = lengthSlider.value;
      generatePassword(); // \u5F53\u6ED1\u5757\u503C\u53D8\u5316\u65F6\u81EA\u52A8\u66F4\u65B0\u5BC6\u7801
    });
    
    // \u663E\u793A/\u9690\u85CF\u81EA\u5B9A\u4E49\u7279\u6B8A\u5B57\u7B26\u8F93\u5165\u6846
    symbolsCheckbox.addEventListener('change', function() {
      customSymbols.style.display = this.checked ? 'block' : 'none';
      if (this.checked) {
        generatePassword();
      }
    });
    
    // \u4E3A\u5176\u4ED6\u590D\u9009\u6846\u6DFB\u52A0\u4E8B\u4EF6\u76D1\u542C\u5668
    lowercaseCheckbox.addEventListener('change', generatePassword);
    uppercaseCheckbox.addEventListener('change', generatePassword);
    numbersCheckbox.addEventListener('change', generatePassword);
    
    // \u4E3A\u81EA\u5B9A\u4E49\u7279\u6B8A\u5B57\u7B26\u8F93\u5165\u6846\u6DFB\u52A0\u4E8B\u4EF6\u76D1\u542C\u5668
    customSymbolsInput.addEventListener('input', () => {
      if (symbolsCheckbox.checked) {
        generatePassword();
      }
    });
    
    // \u8BC4\u4F30\u5BC6\u7801\u5F3A\u5EA6
    function evaluatePasswordStrength(password) {
      let strength = 0;
      const length = password.length;
      
      // \u957F\u5EA6\u8BC4\u5206
      if (length >= 8) strength += 1;
      if (length >= 12) strength += 1;
      if (length >= 16) strength += 1;
      
      // \u590D\u6742\u6027\u8BC4\u5206
      if (/[a-z]/.test(password)) strength += 1;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
      
      // \u8BA1\u7B97\u767E\u5206\u6BD4\u548C\u6587\u672C
      const percentage = Math.min(100, (strength / 7) * 100);
      let text = '';
      let color = '';
      
      if (percentage < 30) {
        text = '\u5F31';
        color = '#ff4d4d';
      } else if (percentage < 60) {
        text = '\u4E2D\u7B49';
        color = '#ffa500';
      } else if (percentage < 80) {
        text = '\u5F3A';
        color = '#2196f3';
      } else {
        text = '\u975E\u5E38\u5F3A';
        color = '#00c853';
      }
      
      return { percentage, text, color };
    }
    
    // \u66F4\u65B0\u5BC6\u7801\u5F3A\u5EA6\u663E\u793A
    function updateStrengthMeter(password) {
      const { percentage, text, color } = evaluatePasswordStrength(password);
      
      strengthMeter.style.width = percentage + '%';
      strengthMeter.style.background = color;
      strengthText.textContent = '\u5F3A\u5EA6\uFF1A' + text;
      strengthText.style.color = color;
    }
    
    // \u751F\u6210\u5BC6\u7801
    function generatePassword() {
      const length = +lengthSlider.value;
      const hasLower = lowercaseCheckbox.checked;
      const hasUpper = uppercaseCheckbox.checked;
      const hasNumber = numbersCheckbox.checked;
      const hasSymbol = symbolsCheckbox.checked;
      const customSymbols = customSymbolsInput.value;
      
      // \u68C0\u67E5\u81F3\u5C11\u9009\u62E9\u4E86\u4E00\u79CD\u5B57\u7B26\u7C7B\u578B
      if (!hasLower && !hasUpper && !hasNumber && !hasSymbol) {
        alert('\u8BF7\u81F3\u5C11\u9009\u62E9\u4E00\u79CD\u5B57\u7B26\u7C7B\u578B');
        lowercaseCheckbox.checked = true;
        return;
      }
      
      // \u5B57\u7B26\u96C6
      let charset = '';
      if (hasLower) charset += 'abcdefghijklmnopqrstuvwxyz';
      if (hasUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (hasNumber) charset += '0123456789';
      if (hasSymbol && customSymbols.trim() !== '') charset += customSymbols;
      
      // \u751F\u6210\u5BC6\u7801
      let password = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      
      passwordDisplay.value = password;
      updateStrengthMeter(password);
      
      // \u6DFB\u52A0\u8109\u51B2\u52A8\u753B\u6548\u679C
      passwordDisplay.style.animation = 'none';
      setTimeout(() => {
        passwordDisplay.style.animation = 'pulse 1.5s';
      }, 10);
    }
    
    // \u6DFB\u52A0\u70B9\u51FB\u5BC6\u7801\u81EA\u52A8\u590D\u5236\u529F\u80FD
    passwordDisplay.addEventListener('click', copyToClipboard);
    
    // \u590D\u5236\u5BC6\u7801\u5230\u526A\u8D34\u677F
    function copyToClipboard() {
      if (!passwordDisplay.value) {
        alert('\u8BF7\u5148\u751F\u6210\u5BC6\u7801');
        return;
      }
      
      passwordDisplay.select();
      document.execCommand('copy');
      
      // \u663E\u793A\u63D0\u793A
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2000);
    }
    
    // \u4E8B\u4EF6\u76D1\u542C
    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyToClipboard);
    
    // \u9875\u9762\u52A0\u8F7D\u65F6\u751F\u6210\u4E00\u4E2A\u521D\u59CB\u5BC6\u7801
    window.addEventListener('load', generatePassword);
  <\/script>
</body>
</html>`;
})();
//# sourceMappingURL=worker.js.map
