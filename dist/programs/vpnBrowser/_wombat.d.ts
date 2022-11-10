export default Wombat;
/**
 * @param {Window} $wbwindow
 * @param {Object} wbinfo
 */
declare function Wombat($wbwindow: Window, wbinfo: any): Wombat;
declare class Wombat {
    /**
     * @param {Window} $wbwindow
     * @param {Object} wbinfo
     */
    constructor($wbwindow: Window, wbinfo: any);
    /** @type {boolean} */
    debug_rw: boolean;
    /** @type {Window} */
    $wbwindow: Window;
    WBWindow: {
        new (): Window;
        prototype: Window;
    };
    /** @type {string} */
    HTTP_PREFIX: string;
    /** @type {string} */
    HTTPS_PREFIX: string;
    /** @type {string} */
    REL_PREFIX: string;
    /** @type {Array<string>} */
    VALID_PREFIXES: Array<string>;
    /** @type {Array<string>} */
    IGNORE_PREFIXES: Array<string>;
    WB_CHECK_THIS_FUNC: string;
    WB_ASSIGN_FUNC: string;
    /** @type {function(qualifiedName: string, value: string): void} */
    wb_setAttribute: (arg0: qualifiedName, arg1: string, arg2: value, arg3: string) => void;
    /** @type {function(qualifiedName: string): ?string} */
    wb_getAttribute: (arg0: qualifiedName, arg1: string) => string | null;
    /** @type {function(): string} */
    wb_funToString: () => string;
    /** @type {AutoFetcher} */
    WBAutoFetchWorker: AutoFetcher;
    /** @type {boolean} */
    wbUseAFWorker: boolean;
    /** @type {string} */
    wb_rel_prefix: string;
    /** @type {boolean} */
    wb_wombat_updating: boolean;
    /** @type {FuncMap} */
    message_listeners: FuncMap;
    /** @type {FuncMap} */
    storage_listeners: FuncMap;
    /**
     * rewrite modifiers for <link href="URL" rel="import|preload" as="x">
     * expressed as as-value -> modifier
     * @type {Object}
     */
    linkAsTypes: any;
    /**
     * rewrite modifiers for <link href="URL" rel="x"> and or
     * <link href="URL" rel="x" as="y"> expressed as a mapping of
     * rel -> modifier or rel -> as -> modifier
     * @type {Object}
     */
    linkTagMods: any;
    /**
     * pre-computed modifiers for each tag
     * @type {Object}
     */
    tagToMod: any;
    /** @type {Array<string>} */
    URL_PROPS: Array<string>;
    /** @type {Object} */
    wb_info: any;
    /**
     * custom options
     * @type {Object}
     */
    wb_opts: any;
    /** @type {string} */
    wb_replay_prefix: string;
    /** @type {boolean} */
    wb_is_proxy: boolean;
    /** @type {string} */
    wb_curr_host: string;
    /** @type {string} */
    wb_orig_scheme: string;
    /** @type {string} */
    wb_orig_origin: string;
    /** @type {string} */
    wb_abs_prefix: string;
    /** @type {string} */
    wb_capture_date_part: string;
    /** @type {Array<string>} */
    BAD_PREFIXES: Array<string>;
    /** @type {RegExp} */
    hostnamePortRe: RegExp;
    /** @type {RegExp} */
    ipPortRe: RegExp;
    /** @type {RegExp} */
    workerBlobRe: RegExp;
    /** @type {RegExp} */
    rmCheckThisInjectRe: RegExp;
    /** @type {RegExp} */
    STYLE_REGEX: RegExp;
    /** @type {RegExp} */
    IMPORT_REGEX: RegExp;
    /** @type {RegExp} */
    IMPORT_JS_REGEX: RegExp;
    /** @type {RegExp} */
    no_wombatRe: RegExp;
    /** @type {RegExp} */
    srcsetRe: RegExp;
    /** @type {RegExp} */
    cookie_path_regex: RegExp;
    /** @type {RegExp} */
    cookie_domain_regex: RegExp;
    /** @type {RegExp} */
    cookie_expires_regex: RegExp;
    /** @type {RegExp} */
    SetCookieRe: RegExp;
    /** @type {RegExp} */
    IP_RX: RegExp;
    /** @type {RegExp} */
    FullHTMLRegex: RegExp;
    /** @type {RegExp} */
    IsTagRegex: RegExp;
    /** @type {RegExp} */
    DotPostMessageRe: RegExp;
    /** @type {RegExp} */
    extractPageUnderModiferRE: RegExp;
    /** @type {string} */
    write_buff: string;
    /** @type {Object} */
    utilFns: any;
    /**
     * @type {{yesNo: boolean, added: boolean}}
     */
    showCSPViolations: {
        yesNo: boolean;
        added: boolean;
    };
    private _internalInit;
    wb_prefixes: string[];
    wb_unrewrite_rx: RegExp;
    private _addRemoveCSPViolationListener;
    private _addEventListener;
    private _removeEventListener;
    /**
     * Extracts the modifier (i.e. mp\_, if\_, ...) the page is under that wombat is
     * operating in. If extracting the modifier fails for some reason mp\_ is returned.
     * Used to ensure the correct modifier is used for rewriting the service workers scope.
     * @return {string}
     */
    getPageUnderModifier(): string;
    /**
     * Returns T/F indicating if the supplied function is a native function
     * or not. The test checks for the presence of the substring `'[native code]'`
     * in the result of calling `toString` on the function
     * @param {Function} funToTest - The function to be tested
     * @return {boolean}
     */
    isNativeFunction(funToTest: Function): boolean;
    /**
     * Returns T/F indicating if the supplied argument is a string or not
     * @param {*} arg
     * @return {boolean}
     */
    isString(arg: any): boolean;
    /**
     * Returns T/F indicating if the supplied element may have attributes that
     * are auto-fetched
     * @param {Element} elem
     * @return {boolean}
     */
    isSavedSrcSrcset(elem: Element): boolean;
    /**
     * Returns T/F indicating if the supplied element is an Image element that
     * may have srcset values to be sent to the backing auto-fetch worker
     * @param {Element} elem
     * @return {boolean}
     */
    isSavedDataSrcSrcset(elem: Element): boolean;
    /**
     * Determines if the supplied string is an host URL
     * @param {string} str
     * @return {boolean}
     */
    isHostUrl(str: string): boolean;
    /**
     * Returns T/F indicating if the supplied object is the arguments object
     * @param {*} maybeArgumentsObj
     * @return {boolean}
     */
    isArgumentsObj(maybeArgumentsObj: any): boolean;
    /**
     * Ensures that each element in the supplied arguments object or
     * array is deproxied handling cases where we can not modify the
     * supplied object returning a new or modified object with the
     * exect elements/properties
     * @param {*} maybeArgumentsObj
     * @return {*}
     */
    deproxyArrayHandlingArgumentsObj(maybeArgumentsObj: any): any;
    /**
     * Determines if a string starts with the supplied prefix.
     * If it does the matching prefix is returned otherwise undefined.
     * @param {?string} string
     * @param {string} prefix
     * @return {?string}
     */
    startsWith(string: string | null, prefix: string): string | null;
    /**
     * Determines if a string starts with the supplied array of prefixes.
     * If it does the matching prefix is returned otherwise undefined.
     * @param {?string} string
     * @param {Array<string>} prefixes
     * @return {?string}
     */
    startsWithOneOf(string: string | null, prefixes: Array<string>): string | null;
    /**
     * Determines if a string ends with the supplied suffix.
     * If it does the suffix is returned otherwise undefined.
     * @param {?string} str
     * @param {string} suffix
     * @return {?string}
     */
    endsWith(str: string | null, suffix: string): string | null;
    /**
     * Returns T/F indicating if the supplied tag name and attribute name
     * combination are to be rewritten
     * @param {string} tagName
     * @param {string} attr
     * @return {boolean}
     */
    shouldRewriteAttr(tagName: string, attr: string): boolean;
    /**
     * Returns T/F indicating if the script tag being rewritten should not
     * have its text contents wrapped based on the supplied script type.
     * @param {?string} scriptType
     * @return {boolean}
     */
    skipWrapScriptBasedOnType(scriptType: string | null): boolean;
    /**
     * Returns T/F indicating if the script tag being rewritten should not
     * have its text contents wrapped based on heuristic analysis of its
     * text contents.
     * @param {?string} text
     * @return {boolean}
     */
    skipWrapScriptTextBasedOnText(text: string | null): boolean;
    /**
     * Returns T/F indicating if the supplied DOM Node has child Elements/Nodes.
     * Note this function should be used when the Node(s) being considered can
     * be null/undefined.
     * @param {Node} node
     * @return {boolean}
     */
    nodeHasChildren(node: Node): boolean;
    /**
     * Returns the correct rewrite modifier for the supplied element and
     * attribute combination if one exists otherwise mp_.
     * Used by
     *  - {@link performAttributeRewrite}
     *  - {@link rewriteFrameSrc}
     *  - {@link initElementGetSetAttributeOverride}
     *  - {@link overrideHrefAttr}
     *
     * @param {*} elem
     * @param {string} attrName
     * @return {?string}
     */
    rwModForElement(elem: any, attrName: string): string | null;
    /**
     * If the supplied element is a script tag and has the server-side rewrite added
     * property "__wb_orig_src" it is removed and the "__$removedWBOSRC$__" property
     * is added to element as an internal flag indicating no further checks are to be
     * made.
     *
     * See also {@link retrieveWBOSRC}
     * @param {Element} elem
     */
    removeWBOSRC(elem: Element): void;
    /**
     * If the supplied element is a script tag and has the server-side rewrite added
     * property "__wb_orig_src" its value is returned otherwise undefined is returned.
     * If the element did not have the "__wb_orig_src" property the
     * "__$removedWBOSRC$__" property is added to element as an internal flag
     * indicating no further checks are to be made.
     *
     * See also {@link removeWBOSRC}
     * @param {Element} elem
     * @return {?string}
     */
    retrieveWBOSRC(elem: Element): string | null;
    /**
     * Wraps the supplied text contents of a script tag with the required Wombat setup
     * @param {?string} scriptText
     * @return {string}
     */
    wrapScriptTextJsProxy(scriptText: string | null): string;
    /**
     * Calls the supplied function when the supplied element undergoes mutations
     * @param elem
     * @param func
     * @return {boolean}
     */
    watchElem(elem: any, func: any): boolean;
    /**
     * Reconstructs the doctype string if the supplied doctype object
     * is non null/undefined. This function is used by {@link rewriteHtmlFull}
     * in order to ensure correctness of rewriting full string of HTML that
     * started with <!doctype ...> since the innerHTML and outerHTML properties
     * do not include that.
     * @param {DocumentType} doctype
     * @return {string}
     */
    reconstructDocType(doctype: DocumentType): string;
    /**
     * Constructs the final URL for the URL rewriting process
     * @param {boolean} useRel
     * @param {string} mod
     * @param {string} url
     * @return {string}
     */
    getFinalUrl(useRel: boolean, mod: string, url: string): string;
    /**
     * Converts the supplied relative URL to an absolute URL using an A tag
     * @param {string} url
     * @param {?Document} doc
     * @return {string}
     */
    resolveRelUrl(url: string, doc: Document | null): string;
    /**
     * Extracts the original URL from the supplied rewritten URL
     * @param {?string} rewrittenUrl
     * @return {string}
     */
    extractOriginalURL(rewrittenUrl: string | null): string;
    /**
     * Creates and returns an A tag ready for parsing the original URL
     * part of the supplied URL.
     * @param {string} maybeRewrittenURL
     * @param {?Document} doc
     * @return {HTMLAnchorElement}
     */
    makeParser(maybeRewrittenURL: string, doc: Document | null): HTMLAnchorElement;
    _makeURLParser(url: any, docElem: any): any;
    /**
     * Defines a new getter and optional setter for the property on the supplied
     * object returning T/F to indicate if the new property was successfully defined
     * @param {Object} obj
     * @param {string} prop
     * @param {?function(value: *): *} setFunc
     * @param {function(): *} getFunc
     * @param {?boolean} [enumerable]
     * @return {boolean}
     */
    defProp(obj: any, prop: string, setFunc: ((arg0: value, arg1: any) => any) | null, getFunc: () => any, enumerable?: boolean | null): boolean;
    /**
     * Defines a new getter for the property on the supplied object returning
     * T/F to indicate if the new property was successfully defined
     * @param {Object} obj
     * @param {string} prop
     * @param {function(): *} getFunc
     * @param {?boolean} [enumerable]
     * @return {boolean}
     */
    defGetterProp(obj: any, prop: string, getFunc: () => any, enumerable?: boolean | null): boolean;
    /**
     * Returns the original getter function for the supplied object's property
     * @param {Object} obj
     * @param {string} prop
     * @return {function(): *}
     */
    getOrigGetter(obj: any, prop: string): () => any;
    /**
     * Returns the original setter function for the supplied object's property
     * @param {Object} obj
     * @param {string} prop
     * @return {function(): *}
     */
    getOrigSetter(obj: any, prop: string): () => any;
    /**
     * Returns an array containing the names of all the properties
     * that exist on the supplied object
     * @param {Object} obj
     * @return {Array<string>}
     */
    getAllOwnProps(obj: any): Array<string>;
    /**
     * Sends the supplied message to __WB_top_frame
     * @param {*} message
     * @param {boolean} [skipTopCheck]
     */
    sendTopMessage(message: any, skipTopCheck?: boolean, win: any): void;
    /**
     * Notifies __WB_top_frame of an history update
     * @param {?string} url
     * @param {?string} title
     */
    sendHistoryUpdate(url: string | null, title: string | null, win: any): void;
    /**
     * Updates the real location object with the results of rewriting the supplied URL
     * @param {?string} reqHref
     * @param {string} origHref
     * @param {Location} actualLocation
     */
    updateLocation(reqHref: string | null, origHref: string, actualLocation: Location): void;
    /**
     * Updates the real location with a change
     * @param {*} wombatLoc
     * @param {boolean} isTop
     */
    checkLocationChange(wombatLoc: any, isTop: boolean): void;
    /**
     * Checks for a location change, either this browser context or top and updates
     * accordingly
     * @return {boolean}
     */
    checkAllLocations(): boolean;
    /**
     * Returns the Object the Proxy was proxying if it exists otherwise
     * the original object
     * @param {*} source
     * @return {?Object}
     */
    proxyToObj(source: any): any | null;
    /**
     * Returns the Proxy object for the supplied Object if it exists otherwise
     * the original object
     * @param {?Object} obj
     * @return {Proxy|?Object}
     */
    objToProxy(obj: any | null): ProxyConstructor | (any | null);
    /**
     * Returns the value of supplied object that is being Proxied
     * @param {*} obj
     * @param {*} prop
     * @param {Array<string>} ownProps
     * @param {Object} fnCache
     * @return {*}
     */
    defaultProxyGet(obj: any, prop: any, ownProps: Array<string>, fnCache: any): any;
    /**
     * Set the location properties for either an instance of WombatLocation
     * or an anchor tag
     * @param {HTMLAnchorElement|WombatLocation} loc
     * @param {string} originalURL
     */
    setLoc(loc: HTMLAnchorElement | WombatLocation, originalURL: string): void;
    /**
     * Returns a function for retrieving some property on an instance of either
     * WombatLocation or an anchor tag
     * @param {string} prop
     * @param {function(): string} origGetter
     * @return {function(): string}
     */
    makeGetLocProp(prop: string, origGetter: () => string): () => string;
    /**
     * Returns a function for setting some property on an instance of either
     * WombatLocation or an anchor tag
     * @param {string} prop
     * @param {function (value: *): *} origSetter
     * @param {function(): *} origGetter
     * @return {function (value: *): *}
     */
    makeSetLocProp(prop: string, origSetter: (arg0: value, arg1: any) => any, origGetter: () => any): (arg0: value, arg1: any) => any;
    /**
     * Function used for rewriting URL's contained in CSS style definitions
     * @param {Object} match
     * @param {string} n1
     * @param {string} n2
     * @param {string} n3
     * @param {number} offset
     * @param {string} string
     * @return {string}
     */
    styleReplacer(match: any, n1: string, n2: string, n3: string, offset: number, string: string): string;
    /**
     * Due to the fact that we override specific DOM constructors, e.g. Worker,
     * the normal TypeErrors are not thrown if the pre-conditions for those
     * constructors are not met.
     *
     * Code that performs polyfills or browser feature detection based
     * on those TypeErrors will not work as expected if we do not perform
     * those checks ourselves (Note we use Chrome's error messages)
     *
     * This function checks for those pre-conditions and throws an TypeError
     * with the appropriate message if a pre-condition is not met
     *  - `this` instanceof Window is false (requires new)
     *  - supplied required arguments
     *
     * @param {Object} thisObj
     * @param {string} what
     * @param {Object} [args]
     * @param {number} [numRequiredArgs]
     */
    domConstructorErrorChecker(thisObj: any, what: string, args?: any, numRequiredArgs?: number): void;
    /**
     * Rewrites the arguments supplied to an function of the Node interface
     * @param {Object} fnThis
     * @param {function} originalFn
     * @param {Node} newNode
     * @param {Node} [oldNode]
     */
    rewriteNodeFuncArgs(fnThis: any, originalFn: Function, newNode: Node, oldNode?: Node): any;
    /**
     * Mini url rewriter specifically for rewriting web sockets
     * @param {?string} originalURL
     * @return {string}
     */
    rewriteWSURL(originalURL: string | null): string;
    private rewriteUrl_;
    /**
     * Rewrites the supplied URL returning the rewritten URL.
     * If wombat is in debug mode the rewrite is logged to the console
     * @param {*} url
     * @param {?boolean} [useRel]
     * @param {?string} [mod]
     * @param {?Document} [doc]
     * @return {?string}
     */
    rewriteUrl(url: any, useRel?: boolean | null, mod?: string | null, doc?: Document | null): string | null;
    /**
     * Rewrites the value of the supplied elements attribute returning its rewritten value.
     * Used by {@link newAttrObjGetSet} and {@link rewriteAttr}
     *
     * @param {Element} elem
     * @param {string} name
     * @param {*} value
     * @param {boolean} [absUrlOnly]
     * @return {*}
     */
    performAttributeRewrite(elem: Element, name: string, value: any, absUrlOnly?: boolean): any;
    /**
     * Rewrites an element attribute's value
     * @param {Element} elem
     * @param {string} name
     * @param {boolean} [absUrlOnly]
     * @return {boolean}
     */
    rewriteAttr(elem: Element, name: string, absUrlOnly?: boolean): boolean;
    /**
     * {@link rewriteStyle} wrapped in a try catch
     * @param {string|Object} style
     * @return {string|Object|null}
     */
    noExceptRewriteStyle(style: string | any): string | any | null;
    /**
     * Rewrites the supplied CSS style definitions
     * @param {string|Object} style
     * @return {string|Object|null}
     */
    rewriteStyle(style: string | any): string | any | null;
    /**
     * Rewrites the supplied srcset string returning the rewritten results.
     * If the element is one the srcset values are auto-fetched they are sent
     * to the backing auto-fetch worker
     * @param {string} value
     * @param {Element} elem
     * @return {string}
     */
    rewriteSrcset(value: string, elem: Element): string;
    /**
     * Rewrites the URL supplied to the setter of an (i)frame's src attribute
     * @param {Element} elem
     * @param {string} attrName
     * @return {boolean}
     */
    rewriteFrameSrc(elem: Element, attrName: string): boolean;
    /**
     * Rewrites either the URL contained in the src attribute or the text contents
     * of the supplied script element. Returns T/F indicating if a rewrite occurred
     * @param elem
     * @return {boolean}
     */
    rewriteScript(elem: any): boolean;
    /**
     * Rewrites the supplied SVG element returning T/F indicating if a rewrite occurred
     * @param {SVGElement} elem
     * @return {boolean}
     */
    rewriteSVGElem(elem: SVGElement): boolean;
    /**
     * Rewrites the supplied element returning T/F indicating if a rewrite occurred
     * @param {Element|Node} elem - The element to be rewritten
     * @return {boolean}
     */
    rewriteElem(elem: Element | Node): boolean;
    /**
     * Rewrites all the children and there descendants of the supplied Node
     * returning T/F if a rewrite occurred
     * @param {Node} curr
     * @return {boolean}
     */
    recurseRewriteElem(curr: Node): boolean;
    /**
     * Rewrites the supplied element and all its children if any.
     * See {@link rewriteElem} and {@link recurseRewriteElem} for more details
     * @param {Node} elem
     * @return {boolean}
     */
    rewriteElemComplete(elem: Node): boolean;
    /**
     * Rewrites any elements found in the supplied arguments object returning
     * a new array containing the original contents of the supplied arguments
     * object after rewriting.
     * @param {Object} originalArguments
     * @return {Array<*>}
     */
    rewriteElementsInArguments(originalArguments: any): Array<any>;
    /**
     * Rewrites the supplied string containing HTML, if the supplied string
     * is full HTML (starts with <HTML, <DOCUMENT...) the string is rewritten
     * using {@link Wombat#rewriteHtmlFull}
     * @param {string} string
     * @param {boolean} [checkEndTag]
     * @return {?string}
     */
    rewriteHtml(string: string, checkEndTag?: boolean): string | null;
    /**
     * Rewrites the supplied string containing full HTML
     * @param {string} string
     * @param {boolean} [checkEndTag]
     * @return {?string}
     */
    rewriteHtmlFull(string: string, checkEndTag?: boolean): string | null;
    /**
     * Rewrites a CSS style string found in the style property of an element or
     * FontFace
     * @param {string} orig
     * @return {string}
     */
    rewriteInlineStyle(orig: string): string;
    /**
     * Rewrites the supplied cookie
     * @param {string} cookie
     * @return {string}
     */
    rewriteCookie(cookie: string): string;
    /**
     * Rewrites the supplied web worker URL
     * @param {string} workerUrl
     * @return {string}
     */
    rewriteWorker(workerUrl: string): string;
    /**
     * Rewrite the arguments supplied to a function of the Text interface in order
     * to ensure CSS is rewritten when a text node is the child of the style tag
     * @param {Object} fnThis
     * @param {function} originalFn
     * @param {Object} argsObj
     */
    rewriteTextNodeFn(fnThis: any, originalFn: Function, argsObj: any): any;
    /**
     * Rewrite the arguments supplied to document.[write, writeln] in order
     * to ensure that the string of HTML is rewritten
     * @param {Object} fnThis
     * @param {function} originalFn
     * @param {Object} argsObj
     */
    rewriteDocWriteWriteln(fnThis: any, originalFn: Function, argsObj: any): any;
    /**
     * Rewrite the arguments supplied to a function of the ChildNode interface
     * in order to ensure that elements are rewritten
     * @param {Object} fnThis
     * @param {function} originalFn
     * @param {Object} argsObj
     */
    rewriteChildNodeFn(fnThis: any, originalFn: Function, argsObj: any): any;
    /**
     * Rewrites the arguments supplied to Element.[insertAdjacentElement, insertAdjacentHTML].
     * If rwHTML is true the rewrite performed is done by {@link rewriteHtml} other wise
     * {@link rewriteElemComplete}
     * @param {Object} fnThis
     * @param {function} originalFn
     * @param {number} position
     * @param {string|Node} textOrElem
     * @param {boolean} rwHTML
     * @return {*}
     */
    rewriteInsertAdjHTMLOrElemArgs(fnThis: any, originalFn: Function, position: number, textOrElem: string | Node, rwHTML: boolean): any;
    /**
     * Rewrites the arguments of either setTimeout or setInterval because
     * [setTimeout|setInterval]('document.location.href = "xyz.com"', time)
     * is legal and used
     * @param {Object} fnThis
     * @param {function} originalFn
     * @param {Object} argsObj
     * @return {*}
     */
    rewriteSetTimeoutInterval(fnThis: any, originalFn: Function, argsObj: any): any;
    /**
     * Rewrites the value of used in to set SomeElement.[innerHTML|outerHTML]
     * iframe.srcdoc, or style.textContent handling edge cases e.g. script tags.
     *
     * If the element is a style tag and it has a sheet after the new value is set
     * it, the sheet, is checked for media rules.
     *
     * @param {Object} thisObj
     * @param {Function} oSetter
     * @param {?string} newValue
     */
    rewriteHTMLAssign(thisObj: any, oSetter: Function, newValue: string | null): void;
    /**
     * Rewrites the value to be supplied to eval or our injected wrapper
     * @param {Function} rawEvalOrWrapper
     * @param {*} evalArg
     * @return {*}
     */
    rewriteEvalArg(rawEvalOrWrapper: Function, evalArg: any, extraArg: any): any;
    /**
     * Apply other eval specific rewriting
     * Currently just rewrite import('')
     *
     */
    otherEvalRewrite(value: any): any;
    /**
     * Applies an Event property getter override for the supplied property
     * @param {string} attr
     * @param {Object} [eventProto]
     */
    addEventOverride(attr: string, eventProto?: any): void;
    /**
     * Returns T/F indicating if the supplied attribute node is to be rewritten
     * @param {Object} attr
     * @return {boolean}
     */
    isAttrObjRewrite(attr: any): boolean;
    /**
     * Defines a new getter and setter function for the supplied
     * property of the Attr interface
     * @param {Object} attrProto
     * @param {string} prop
     */
    newAttrObjGetSet(attrProto: any, prop: string): void;
    /**
     * Overrides the nodeValue property of the Attr interface
     */
    overrideAttrProps(): void;
    /**
     * Applies an override the attribute get/set override
     * @param {Object} obj
     * @param {string} attr
     * @param {string} mod
     */
    overrideAttr(obj: any, attr: string, mod: string): void;
    /**
     * Applies an attribute getter override IFF an original getter exists
     * @param {Object} proto
     * @param {string} prop
     * @param {*} [cond]
     */
    overridePropExtract(proto: any, prop: string, cond?: any): void;
    /**
     * Overrides referer -- if top-replay frame, referrer should be "", otherwise extractOriginURL
     * @param {Object} proto
     * @param {string} prop
     * @param {*} [cond]
     */
    overrideReferrer($document: any): void;
    /**
     * Applies an attribute getter override IFF an original getter exists that
     * ensures that the results of retrieving the attributes value is not a
     * wombat Proxy
     * @param {Object} proto
     * @param {string} prop
     */
    overridePropToProxy(proto: any, prop: string): void;
    /**
     * Applies an override to supplied history function name IFF it exists
     * @param {string} funcName
     * @return {?function}
     */
    overrideHistoryFunc(funcName: string): Function | null;
    /**
     * Applies an getter/setter override to the supplied style interface's attribute
     * and prop name combination
     * @param {Object} obj
     * @param {string} attr
     * @param {string} [propName]
     */
    overrideStyleAttr(obj: any, attr: string, propName?: string): void;
    /**
     * Applies an override to the setProperty function
     * @param style_proto
     */
    overrideStyleSetProp(style_proto: any): void;
    /**
     * Overrides the getter and setter functions for the properties listed in
     * {@link Wombat#URL_PROPS} for the `a` and `area` tags
     * @param {Object} whichObj
     */
    overrideAnchorAreaElem(whichObj: any): void;
    /**
     * Overrides the getter and setter functions for the `innerHTML` and `outerHTML`
     * properties of the supplied element
     * @param {Object} elem
     * @param {string} prop
     * @param {boolean} [rewriteGetter]
     */
    overrideHtmlAssign(elem: any, prop: string, rewriteGetter?: boolean): void;
    /**
     * Overrides the getter and setter functions for the supplied property
     * on the HTMLIFrameElement
     * @param {string} prop
     */
    overrideIframeContentAccess(prop: string): void;
    /**
     * Applies an override to the gettter function for the frames property of
     * the supplied window in order to ensure that wombat is initialized in
     * all frames.
     * * @param {Window} $wbwindow
     */
    overrideFramesAccess($wbwindow: any): void;
    overrideSWAccess($wbwindow: any): void;
    /**
     * Overrides the supplied method in order to ensure that the `this` argument
     * of the function is not one of the JS Proxy objects used by wombat.
     * @param {object} cls
     * @param {string} method
     * @param {Object} [obj]
     */
    overrideFuncThisProxyToObj(cls: object, method: string, obj?: any): void;
    /**
     * Applies an function override that ensures that the argument the supplied index
     * is not one of the JS Proxy objects used by wombat.
     * @param {Object} cls
     * @param {string} method
     * @param {number} [argumentIdx]
     */
    overrideFuncArgProxyToObj(cls: any, method: string, argumentIdx?: number): void;
    /**
     * Overrides Function.prototype.apply in order to ensure that none of the
     * arguments of `native` functions are one of the JS Proxy objects used by wombat.
     * @param {Window} $wbwindow
     */
    overrideFunctionApply($wbwindow: Window): void;
    /**
     * Override Function.prototype.bind to deproxy the param target
     * in case of native functions
     *
     */
    overrideFunctionBind($wbwindow: any): void;
    /**
     * Overrides the getter and setter functions for the `srcset` property
     * of the supplied Object in order to rewrite accesses and retrievals
     * @param {Object} obj
     * @param {string} [mod]
     */
    overrideSrcsetAttr(obj: any, mod?: string): void;
    /**
     * Overrides the getter and setter functions for the `href` property
     * of the supplied Object in order to rewrite accesses and retrievals
     * @param {Object} obj
     * @param {string} mod
     */
    overrideHrefAttr(obj: any, mod: string): void;
    /**
     * Overrides the getter and setter functions for a property of the Text
     * interface in order to rewrite accesses and retrievals when a text node
     * is the child of the style tag
     * @param {Object} textProto
     * @param {string} whichProp
     */
    overrideTextProtoGetSet(textProto: any, whichProp: string): void;
    /**
     * Overrides the constructor of an UIEvent object in order to ensure
     * that the `view`, `relatedTarget`, and `target` arguments of the
     * constructor are not a JS Proxy used by wombat.
     * @param {string} which
     */
    overrideAnUIEvent(which: string): void;
    /**
     * Rewrites the arguments supplied to the functions of the ParentNode interface
     * @param {Object} fnThis
     * @param {function} originalFn
     * @param {Object} argsObj
     * @return {*}
     */
    rewriteParentNodeFn(fnThis: any, originalFn: Function, argsObj: any): any;
    /**
     * Overrides the append and prepend functions on the supplied object in order
     * to ensure that the elements or string of HTML supplied as arguments to these
     * functions are rewritten
     * @param {Object} obj
     * @see https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append
     * @see https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend
     */
    overrideParentNodeAppendPrepend(obj: any): void;
    /**
     * Overrides the `innerHTML` property and `append`, `prepend` functions
     * on the ShadowRoot interface in order to ensure any HTML elements
     * added via these methods are rewritten
     * @see https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot
     */
    overrideShadowDom(): void;
    /**
     * Applies an override to the ChildNode interface that is inherited by
     * the supplied Object. If the textIface argument is truthy the rewrite function
     * used is {@link rewriteChildNodeFn} otherwise {@link rewriteTextNodeFn}
     * @param {*} ifaceWithChildNode
     * @param {boolean} [textIface]
     */
    overrideChildNodeInterface(ifaceWithChildNode: any, textIface?: boolean): void;
    /**
     * Applies overrides to the `appendData`, `insertData`, and `replaceData` functions
     * and `data` and `wholeText` properties on the Text interface in order to ensure
     * CSS strings are rewritten when Text nodes are children of the style tag
     */
    initTextNodeOverrides(): void;
    /**
     * Applies attribute getter and setter function overrides to the HTML elements
     * and CSS properties that are URLs are rewritten
     */
    initAttrOverrides(): void;
    /**
     * Applies overrides to CSSStyleValue.[parse,parseAll], CSSKeywordValue, and
     * StylePropertyMap in order to ensure the URLs these interfaces operate on
     * are rewritten. Gotta love Chrome.
     * @see https://drafts.css-houdini.org/css-typed-om-1/
     */
    initCSSOMOverrides(): void;
    /**
     * Applies an overrides to the Audio constructor in order to ensure its URL
     * argument is rewritten
     */
    initAudioOverride(): void;
    /**
     * Initializes the BAD_PREFIXES array using the supplied prefix
     * @param {string} prefix
     */
    initBadPrefixes(prefix: string): void;
    /**
     * Applies an override to crypto.getRandomValues in order to make
     * the values it returns are deterministic during replay
     */
    initCryptoRandom(): void;
    /**
     * Applies an override to the Date object in order to ensure that
     * all Dates used during replay are in the datetime of replay
     * @param {string} timestamp
     */
    initDateOverride(timestamp: string): void;
    initBlobOverride(): void;
    initWSOverride(): void;
    /**
     * Applies an override to the document.title property in order to ensure
     * that actual top (archive top frame containing the replay iframe) receives
     * document.title updates
     */
    initDocTitleOverride(): void;
    /**
     * Applies an override to the FontFace constructor in order to ensure font URLs
     * are rewritten
     * @see https://drafts.csswg.org/css-font-loading/#FontFace-interface
     */
    initFontFaceOverride(): void;
    /**
     * Forces, when possible, the devicePixelRatio property of window to 1
     * in order to ensure deterministic replay
     */
    initFixedRatio(value: any): void;
    /**
     * Initializes wombats path information from the supplied wbinfo object
     * @param {Object} wbinfo
     */
    initPaths(wbinfo: any): void;
    /**
     * Applies an override to Math.seed and Math.random using the supplied
     * seed in order to ensure that random numbers are deterministic during
     * replay
     * @param {string} seed
     */
    initSeededRandom(seed: string): void;
    /**
     * Applies overrides to history.pushState and history.replaceState in order
     * to ensure that URLs used for browser history manipulation are rewritten.
     * Also adds a `popstate` listener to window of the browser context wombat is in
     * in order to ensure that actual top (archive top frame containing the replay iframe)
     * browser history is updated IFF the history manipulation happens in the replay top
     */
    initHistoryOverrides(): void;
    /**
     * If cookie preset if passed in via wb_info, set parse and set cookies on the document
     */
    initCookiePreset(): void;
    /**
     * Applies overrides to the XMLHttpRequest.open and XMLHttpRequest.responseURL
     * in order to ensure URLs are rewritten.
     *
     * Applies an override to window.fetch in order to rewrite URLs and URLs of
     * the supplied Request objects used as arguments to fetch.
     *
     * Applies overrides to window.Request, window.Response, window.EventSource,
     * and window.WebSocket in order to ensure URLs they operate on are rewritten.
     *
     * @see https://xhr.spec.whatwg.org/
     * @see https://fetch.spec.whatwg.org/
     * @see https://html.spec.whatwg.org/multipage/web-sockets.html#websocket
     * @see https://html.spec.whatwg.org/multipage/server-sent-events.html#the-eventsource-interface
     */
    initHTTPOverrides(): void;
    /**
     * Applies an override to Element.[getAttribute, setAttribute] in order to
     * ensure that operations on properties that contain URLs are rewritten
     * @see https://www.w3.org/TR/dom/#interface-element
     */
    initElementGetSetAttributeOverride(): void;
    /**
     * Applies an override to the getAttribute[NS] and setAttribute[NS] functions
     * of the SVGImageElement interface in order to ensure that the URLs of the
     * href and xlink:href properties are rewritten
     */
    initSvgImageOverrides(): void;
    /**
     * Applies an override to document.createElementNS in order to ensure that the
     * nameSpaceURI argument is un-rewritten
     */
    initCreateElementNSFix(): void;
    /**
     * Applies an override to Element.insertAdjacentHTML in order to ensure
     * that the strings of HTML to be inserted are rewritten and to
     * Element.insertAdjacentElement in order to ensure that the Elements to
     * be inserted are rewritten
     */
    initInsertAdjacentElementHTMLOverrides(): void;
    /**
     * Applies overrides to Node.[appendChild, insertBefore, replaceChild] and
     * [Element, DocumentFragment].[append, prepend) in order to ensure the that
     * the elements added by these functions are rewritten.
     * Also applies an override to the Node.ownerDocument, HTMLHtmlElement.parentNode,
     * and Event.target getter functions do not return a JS Proxy object used by wombat
     * @see https://www.w3.org/TR/dom/#node
     */
    initDomOverride(): void;
    /**
     * Applies overrides to document.referrer, document.origin, document.domain, and
     * window.origin in order to ensure their getters and setters behave as expected
     * on the live web
     * @param {Document} $document
     */
    initDocOverrides($document: Document): void;
    /**
     * Apples overrides to document.[write, writeln, open, close] in order
     * to ensure that the values they operate on or create are rewritten and
     * wombat is initialized in the new documents/windows.
     * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html
     * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-document-open-window
     * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-document-close
     * @see https://html.spec.whatwg.org/multipage/dom.html#dom-document-body
     */
    initDocWriteOpenCloseOverride(): void;
    /**
     * Inits wombat in the supplied iframe
     * @param {HTMLIFrameElement} iframe
     */
    initIframeWombat(iframe: HTMLIFrameElement): void;
    /**
     * Initializes wombat in the supplied window IFF the src URL of the window is
     * not the empty string, about:blank, or a "javascript:" URL
     * @param {Window} win
     * @param {string} [src] unrewritten url
     */
    initNewWindowWombat(win: Window, src?: string): void;
    /**
     * Applies an override to either window.[setTimeout, setInterval] functions
     * in order to ensure that usage such as [setTimeout|setInterval]('document.location.href = "xyz.com"', time)
     * behaves as expected during replay.
     *
     * In this case the supplied string is eval'd in the current context skipping
     * the surrounding scope
     */
    initTimeoutIntervalOverrides(): void;
    /**
     * Applies an overrides to the constructor of window.[Worker, SharedWorker] in
     * order to ensure that the URL argument is rewritten.
     *
     * Applies an override to ServiceWorkerContainer.register in order to ensure
     * that the URLs used in ServiceWorker registration are rewritten.
     *
     * Applies an override to Worklet.addModule in order to ensure that URL
     * to the worklet module is rewritten
     * @see https://html.spec.whatwg.org/multipage/workers.html
     * @see https://w3c.github.io/ServiceWorker/
     * @see https://drafts.css-houdini.org/worklets/#worklet
     */
    initWorkerOverrides(): void;
    /**
     * Applies overrides to the getter setter functions of the supplied object
     * for the properties defined in {@link Wombat#URL_PROPS} IFF
     * Object.defineProperty is defined
     * @param {Object} loc
     * @param {function} oSetter
     * @param {function} oGetter
     */
    initLocOverride(loc: any, oSetter: Function, oGetter: Function): void;
    /**
     * Initialized WombatLocation on the supplied window object and adds the
     * __WB_pmw function on the window, as well as, defines WB_wombat_location
     * as property on the prototype of Object and adds the _WB_wombat_location
     * and __WB_check_loc properties to the supplied window
     * @param {Window} win
     */
    initWombatLoc(win: Window): void;
    /**
     * Adds the __WB_pmw property to prototype of Object and adds the
     * __WB_check_loc property to window
     * @param {Window} win
     */
    initProtoPmOrigin(win: Window): void;
    /**
     * Add proxy object globals, assign func and 'this' wrapper, to global Object.prototype
     *
     */
    initCheckThisFunc(win: any): void;
    /**
     * Override Object.getOwnPropertyNames() to filter out special wombat-added properties
     *
     */
    overrideGetOwnPropertyNames(win: any): void;
    /**
     * Adds listeners for `message` and `hashchange` to window of the browser context wombat is in
     * in order to ensure that actual top (archive top frame containing the replay iframe)
     * browser history is updated IFF the history manipulation happens in the replay top
     */
    initHashChange(): void;
    /**
     * Overrides window.postMessage in order to ensure that messages sent
     * via this function are routed to the correct window, especially that
     * messages sent to the "top frame" do not go to archive top but replay top.
     *
     * This function also applies an override to EventTarget.[addEventListener, removeEventListener]
     * to ensure that listening to events behaves correctly during replay.
     *
     * This function is the place where the `onmessage` and `onstorage` setter functions
     * are overriden.
     * @param {Window} $wbwindow
     */
    initPostMessageOverride($wbwindow: Window): void;
    /**
     * Applies overrides to the MessageEvent.[target, srcElement, currentTarget, eventPhase, path, source]
     * in order to ensure they are not a JS Proxy used by wombat
     * @param {Window} $wbwindow
     */
    initMessageEventOverride($wbwindow: Window): void;
    /**
     * Applies overrides to the constructors
     *  - UIEvent
     *  - MouseEvent
     *  - TouchEvent
     *  - KeyboardEvent
     *  - WheelEvent
     *  - InputEvent
     *  - CompositionEvent
     *
     * in order to ensure the proper behavior of the events when wombat is using
     * an JS Proxy
     */
    initUIEventsOverrides(): void;
    /**
     * Applies an override to window.open in order to ensure the URL argument is rewritten.
     * Also applies the same override to the open function of all frames returned by
     * window.frames
     */
    initOpenOverride(): void;
    /**
     * Rewrite 'target' for anchor tag or window.open
     */
    rewriteAttrTarget(target: any): any;
    /**
     * Applies an override to the getter and setter functions of document.cookie
     * in order to ensure that cookies are rewritten
     */
    initCookiesOverride(): void;
    /**
     * Applies an override to navigator.[registerProtocolHandler, unregisterProtocolHandler] in order to
     * ensure that the URI argument is rewritten
     */
    initRegisterUnRegPHOverride(): void;
    /**
     * Applies an override to navigator.sendBeacon in order to ensure that
     * the URL argument is rewritten. This ensures that when a page is rewritten
     * no information about who is viewing is leaked to the outside world
     */
    initBeaconOverride(): void;
    /**
     * Applies an override to the constructor of the PresentationRequest interface object
     * in order to rewrite its URL(s) arguments
     * @see https://w3c.github.io/presentation-api/#constructing-a-presentationrequest
     */
    initPresentationRequestOverride(): void;
    /**
     * Applies an override that disables the pages ability to send OS native
     * notifications. Also disables the ability of the replayed page to retrieve the geolocation
     * of the view.
     *
     * This is done in order to ensure that no malicious abuse of these functions
     * can happen during replay.
     */
    initDisableNotificationsGeoLocation(): void;
    /**
     * Applies an override to window.[localStorage, sessionStorage] storage in order to ensure
     * that the replayed page can use both interfaces as expected during replay.
     */
    initStorageOverride(): void;
    initIndexedDBOverride(): void;
    initCachesOverride(): void;
    /**
     * Initializes the wombat window JS Proxy object IFF JS Proxies are available.
     * @param {Window} $wbwindow
     * @return {Proxy<Window>}
     */
    initWindowObjProxy($wbwindow: Window): ProxyConstructor;
    /**
     * Initializes the wombat document JS Proxy object IFF JS Proxies are available.
     * This function also applies the {@link initDocOverrides} overrides regardless
     * if JS Proxies are available.
     * @param {Document} $document
     * @return {Proxy<Document>}
     */
    initDocumentObjProxy($document: Document): ProxyConstructor;
    /**
     * Initializes and starts the auto-fetch worker IFF wbUseAFWorker is true
     */
    initAutoFetchWorker(): void;
    /**
     * Initializes the listener for when the document.readyState is "complete" in
     * order to send archive top the information about the title of the page and
     * have it add any favicons of the replayed page to its own markup.
     *
     * The wb_type="load" message is sent to archive top IFF the page it originates
     * is replay top
     * @param {Object} wbinfo
     */
    initTopFrameNotify(wbinfo: any): void;
    /**
     * Initialises the _WB_replay_top and _WB_top_frame properties on window
     * @param {Window} $wbwindow
     */
    initTopFrame($wbwindow: Window): void;
    /**
     * Applies an override to window.frameElement IFF the supplied windows
     * __WB_replay_top property is equal to the window object of the browser context
     * wombat is currently operating in
     * @param {Window} $wbwindow
     */
    initFrameElementOverride($wbwindow: Window): void;
    /**
     * Adds the WB_wombat_top property to the prototype of Object
     * @param {Window} $wbwindow
     */
    initWombatTop($wbwindow: Window): void;
    /**
     * To quote the MDN: 'Do not ever use eval'
     */
    initEvalOverride(): void;
    wrappedEval: (evalFunc: any) => (arg: any) => any;
    /**
     * Initialize wombat's internal state and apply all overrides
     * @return {Object}
     */
    wombatInit(): any;
}
//# sourceMappingURL=_wombat.d.ts.map