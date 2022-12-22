declare const _exports: {
    new (t: any, e: any): {
        config: {
            _config: any;
            _scopeCache: Map<any, any>;
            _resolverCache: Map<any, any>;
            readonly platform: any;
            type: any;
            data: any;
            options: any;
            readonly plugins: any;
            update(): void;
            clearCache(): void;
            datasetScopeKeys(t: any): any;
            datasetAnimationScopeKeys(t: any, e: any): any;
            datasetElementScopeKeys(t: any, e: any): any;
            pluginScopeKeys(t: any): any;
            _cachedScopes(t: any, e: any): any;
            getOptionScopes(t: any, e: any, i: any): any;
            chartOptionScopes(): any[];
            resolveNamedOptions(t: any, e: any, i: any, s?: string[]): {
                $shared: boolean;
            };
            createResolver(t: any, e: any, i: string[], s: any): any;
        };
        platform: any;
        id: number;
        ctx: any;
        canvas: any;
        width: any;
        height: any;
        _options: any;
        _aspectRatio: any;
        _layers: any[];
        _metasets: any[];
        boxes: any[];
        _active: any[];
        _listeners: {};
        _sortedMetasets: any[];
        scales: {};
        _plugins: {
            _init: any[];
            notify(t: any, e: any, i: any, s: any): boolean;
            _notify(t: any, e: any, i: any, s: any): boolean;
            invalidate(): void;
            _oldCache: {
                plugin: any;
                options: any;
            }[];
            _descriptors(t: any): {
                plugin: any;
                options: any;
            }[];
            _cache: {
                plugin: any;
                options: any;
            }[];
            _createDescriptors(t: any, e: any): {
                plugin: any;
                options: any;
            }[];
            _notifyStateChanges(t: any): void;
        };
        $proxies: {};
        _hiddenIndices: {};
        attached: boolean;
        _doResize: (...s: any[]) => any;
        _dataChanges: any[];
        readonly aspectRatio: any;
        data: any;
        options: any;
        readonly registry: {
            controllers: {
                type: any;
                scope: any;
                override: any;
                items: any;
                isForType(t: any): any;
                register(t: any): any;
                get(t: any): any;
                unregister(t: any): void;
            };
            elements: {
                type: any;
                scope: any;
                override: any;
                items: any;
                isForType(t: any): any;
                register(t: any): any;
                get(t: any): any;
                unregister(t: any): void;
            };
            plugins: {
                type: any;
                scope: any;
                override: any;
                items: any;
                isForType(t: any): any;
                register(t: any): any;
                get(t: any): any;
                unregister(t: any): void;
            };
            scales: {
                type: any;
                scope: any;
                override: any;
                items: any;
                isForType(t: any): any;
                register(t: any): any;
                get(t: any): any;
                unregister(t: any): void;
            };
            _typedRegistries: {
                type: any;
                scope: any;
                override: any;
                items: any;
                isForType(t: any): any;
                register(t: any): any;
                get(t: any): any;
                unregister(t: any): void;
            }[];
            add(...t: any[]): void;
            remove(...t: any[]): void;
            addControllers(...t: any[]): void;
            addElements(...t: any[]): void;
            addPlugins(...t: any[]): void;
            addScales(...t: any[]): void;
            getController(t: any): any;
            getElement(t: any): any;
            getPlugin(t: any): any;
            getScale(t: any): any;
            removeControllers(...t: any[]): void;
            removeElements(...t: any[]): void;
            removePlugins(...t: any[]): void;
            removeScales(...t: any[]): void;
            _each(t: any, e: any, i: any): void;
            _exec(t: any, e: any, i: any): void;
            _getRegistryForType(t: any): {
                type: any;
                scope: any;
                override: any;
                items: any;
                isForType(t: any): any;
                register(t: any): any;
                get(t: any): any;
                unregister(t: any): void;
            };
            _get(t: any, e: any, i: any): any;
        };
        _initialize(): any;
        clear(): any;
        stop(): any;
        resize(t: any, e: any): void;
        _resizeBeforeDraw: {
            width: any;
            height: any;
        };
        _resize(t: any, e: any): void;
        ensureScalesHaveIDs(): void;
        buildOrUpdateScales(): void;
        _updateMetasets(): void;
        _removeUnreferencedMetasets(): void;
        buildOrUpdateControllers(): any[];
        _resetElements(): void;
        reset(): void;
        update(t: any): void;
        _animationsDisabled: boolean;
        _minPadding: number;
        _updateScales(): void;
        _checkEventBindings(): void;
        _updateHiddenIndices(): void;
        _getUniformDataChanges(): {
            method: string;
            start: number;
            count: number;
        }[];
        _updateLayout(t: any): void;
        _updateDatasets(t: any): void;
        _updateDataset(t: any, e: any): void;
        render(): void;
        draw(): void;
        _getSortedDatasetMetas(t: any): any[];
        getSortedVisibleDatasetMetas(): any[];
        _drawDatasets(): void;
        _drawDataset(t: any): void;
        isPointInArea(t: any): boolean;
        getElementsAtEventForMode(t: any, e: any, i: any, s: any): any;
        getDatasetMeta(t: any): any;
        getContext(): any;
        $context: any;
        getVisibleDatasetCount(): number;
        isDatasetVisible(t: any): boolean;
        setDatasetVisibility(t: any, e: any): void;
        toggleDataVisibility(t: any): void;
        getDataVisibility(t: any): boolean;
        _updateVisibility(t: any, e: any, i: any): void;
        hide(t: any, e: any): void;
        show(t: any, e: any): void;
        _destroyDatasetMeta(t: any): void;
        _stop(): void;
        destroy(): void;
        toBase64Image(...t: any[]): any;
        bindEvents(): void;
        bindUserEvents(): void;
        bindResponsiveEvents(): void;
        _responsiveListeners: {};
        unbindEvents(): void;
        updateHoverStyle(t: any, e: any, i: any): void;
        getActiveElements(): any[];
        setActiveElements(t: any): void;
        _lastEvent: any;
        notifyPlugins(t: any, e: any, i: any): boolean;
        isPluginEnabled(t: any): boolean;
        _updateHoverStyles(t: any, e: any, i: any): void;
        _eventHandler(t: any, e: any): any;
        _handleEvent(t: any, e: any, i: any): boolean;
        _getActiveElements(t: any, e: any, i: any, s: any): any;
    };
    defaults: {
        backgroundColor: string;
        borderColor: string;
        color: string;
        datasets: {};
        devicePixelRatio: (t: any) => any;
        elements: {};
        events: string[];
        font: {
            family: string;
            size: number;
            style: string;
            lineHeight: number;
            weight: any;
        };
        hover: {};
        hoverBackgroundColor: (t: any, e: any) => any;
        hoverBorderColor: (t: any, e: any) => any;
        hoverColor: (t: any, e: any) => any;
        indexAxis: string;
        interaction: {
            mode: string;
            intersect: boolean;
            includeInvisible: boolean;
        };
        maintainAspectRatio: boolean;
        onHover: any;
        onClick: any;
        parsing: boolean;
        plugins: {};
        responsive: boolean;
        scales: {};
        showLine: boolean;
        drawActiveElementsOnTop: boolean;
        set(t: any, e: any): any;
        get(t: any): any;
        describe(t: any, e: any): any;
        override(t: any, e: any): any;
        route(t: any, e: any, i: any, s: any): void;
        apply(t: any): void;
    };
    instances: {};
    overrides: any;
    registry: {
        controllers: {
            type: any;
            scope: any;
            override: any;
            items: any;
            isForType(t: any): any;
            register(t: any): any;
            get(t: any): any;
            unregister(t: any): void;
        };
        elements: {
            type: any;
            scope: any;
            override: any;
            items: any;
            isForType(t: any): any;
            register(t: any): any;
            get(t: any): any;
            unregister(t: any): void;
        };
        plugins: {
            type: any;
            scope: any;
            override: any;
            items: any;
            isForType(t: any): any;
            register(t: any): any;
            get(t: any): any;
            unregister(t: any): void;
        };
        scales: {
            type: any;
            scope: any;
            override: any;
            items: any;
            isForType(t: any): any;
            register(t: any): any;
            get(t: any): any;
            unregister(t: any): void;
        };
        _typedRegistries: {
            type: any;
            scope: any;
            override: any;
            items: any;
            isForType(t: any): any;
            register(t: any): any;
            get(t: any): any;
            unregister(t: any): void;
        }[];
        add(...t: any[]): void;
        remove(...t: any[]): void;
        addControllers(...t: any[]): void;
        addElements(...t: any[]): void;
        addPlugins(...t: any[]): void;
        addScales(...t: any[]): void;
        getController(t: any): any;
        getElement(t: any): any;
        getPlugin(t: any): any;
        getScale(t: any): any;
        removeControllers(...t: any[]): void;
        removeElements(...t: any[]): void;
        removePlugins(...t: any[]): void;
        removeScales(...t: any[]): void;
        _each(t: any, e: any, i: any): void;
        _exec(t: any, e: any, i: any): void;
        _getRegistryForType(t: any): {
            type: any;
            scope: any;
            override: any;
            items: any;
            isForType(t: any): any;
            register(t: any): any;
            get(t: any): any;
            unregister(t: any): void;
        };
        _get(t: any, e: any, i: any): any;
    };
    version: string;
    getChart: (t: any) => any;
    register(...t: any[]): void;
    unregister(...t: any[]): void;
    helpers: {
        __proto__: any;
        easingEffects: {
            linear: (t: any) => any;
            easeInQuad: (t: any) => number;
            easeOutQuad: (t: any) => number;
            easeInOutQuad: (t: any) => number;
            easeInCubic: (t: any) => number;
            easeOutCubic: (t: any) => number;
            easeInOutCubic: (t: any) => number;
            easeInQuart: (t: any) => number;
            easeOutQuart: (t: any) => number;
            easeInOutQuart: (t: any) => number;
            easeInQuint: (t: any) => number;
            easeOutQuint: (t: any) => number;
            easeInOutQuint: (t: any) => number;
            easeInSine: (t: any) => number;
            easeOutSine: (t: any) => number;
            easeInOutSine: (t: any) => number;
            easeInExpo: (t: any) => number;
            easeOutExpo: (t: any) => number;
            easeInOutExpo: (t: any) => any;
            easeInCirc: (t: any) => any;
            easeOutCirc: (t: any) => number;
            easeInOutCirc: (t: any) => number;
            easeInElastic: (t: any) => any;
            easeOutElastic: (t: any) => any;
            easeInOutElastic(t: any): any;
            easeInBack(t: any): number;
            easeOutBack(t: any): number;
            easeInOutBack(t: any): number;
            easeInBounce: (t: any) => number;
            easeOutBounce(t: any): number;
            easeInOutBounce: (t: any) => number;
        };
        isPatternOrGradient: (t: any) => boolean;
        color: (t: any) => any;
        getHoverColor: (t: any) => any;
        noop: () => void;
        uid: () => number;
        isNullOrUndef: (t: any) => boolean;
        isArray: (t: any) => boolean;
        isObject: (t: any) => boolean;
        isFinite: (t: any) => boolean;
        finiteOrDefault: (t: any, e: any) => any;
        valueOrDefault: (t: any, e: any) => any;
        toPercentage: (t: any, e: any) => number;
        toDimension: (t: any, e: any) => number;
        callback: (t: any, e: any, i: any) => any;
        each: (t: any, e: any, i: any, s: any) => void;
        _elementsEqual: (t: any, e: any) => boolean;
        clone: (t: any) => any;
        _merger: (t: any, e: any, i: any, s: any) => void;
        merge: (t: any, e: any, i: any) => any;
        mergeIf: (t: any, e: any) => any;
        _mergerIf: (t: any, e: any, i: any) => void;
        _deprecated: (t: any, e: any, i: any, s: any) => void;
        _splitKey: (t: any) => string[];
        resolveObjectKey: (t: any, e: any) => any;
        _capitalize: (t: any) => any;
        defined: (t: any) => boolean;
        isFunction: (t: any) => boolean;
        setsEqual: (t: any, e: any) => boolean;
        _isClickEvent: (t: any) => boolean;
        toFontString: (t: any) => string;
        _measureText: (t: any, e: any, i: any, s: any, n: any) => any;
        _longestText: (t: any, e: any, i: any, s: any) => number;
        _alignPixel: (t: any, e: any, i: any) => number;
        clearCanvas: (t: any, e: any) => void;
        drawPoint: (t: any, e: any, i: any, s: any) => void;
        drawPointLegend: (t: any, e: any, i: any, s: any, n: any) => any;
        _isPointInArea: (t: any, e: any, i: any) => boolean;
        clipArea: (t: any, e: any) => void;
        unclipArea: (t: any) => void;
        _steppedLineTo: (t: any, e: any, i: any, s: any, n: any) => any;
        _bezierCurveTo: (t: any, e: any, i: any, s: any) => any;
        renderText: (t: any, e: any, i: any, o: any, a: any, r?: {}) => void;
        addRoundedRectPath: (t: any, e: any) => void;
        _lookup: (t: any, e: any, i: any) => {
            lo: number;
            hi: number;
        };
        _lookupByKey: (t: any, e: any, i: any, s: any) => {
            lo: number;
            hi: number;
        };
        _rlookupByKey: (t: any, e: any, i: any) => {
            lo: number;
            hi: number;
        };
        _filterBetween: (t: any, e: any, i: any) => any;
        listenArrayEvents: (t: any, e: any) => void;
        unlistenArrayEvents: (t: any, e: any) => void;
        _arrayUnique: (t: any) => any;
        _createResolver: (t: any, e: string[], i: any, s: any, n?: () => any) => any;
        _attachContext: (t: any, e: any, i: any, s: any) => {
            _cacheable: boolean;
            _proxy: any;
            _context: any;
            _subProxy: any;
            _stack: Set<any>;
            _descriptors: {
                allKeys: any;
                scriptable: any;
                indexable: any;
                isScriptable: any;
                isIndexable: any;
            };
            setContext: (e: any) => any;
            override: (n: any) => any;
        };
        _descriptors: (t: any, e?: {
            scriptable: boolean;
            indexable: boolean;
        }) => {
            allKeys: any;
            scriptable: any;
            indexable: any;
            isScriptable: any;
            isIndexable: any;
        };
        _parseObjectDataRadialScale: (t: any, e: any, i: any, s: any) => any[];
        splineCurve: (t: any, e: any, i: any, s: any) => {
            previous: {
                x: number;
                y: number;
            };
            next: {
                x: any;
                y: any;
            };
        };
        splineCurveMonotone: (t: any, e?: string) => void;
        _updateBezierControlPoints: (t: any, e: any, i: any, s: any, n: any) => void;
        _isDomSupported: () => boolean;
        _getParentNode: (t: any) => any;
        getStyle: (t: any, e: any) => any;
        getRelativePosition: (t: any, e: any) => any;
        getMaximumSize: (t: any, e: any, i: any, s: any) => {
            width: any;
            height: any;
        };
        retinaScale: (t: any, e: any, i: any) => boolean;
        supportsEventListenerOptions: boolean;
        readUsedSize: (t: any, e: any) => number;
        fontString: (t: any, e: any, i: any) => string;
        requestAnimFrame: (t: any) => any;
        throttled: (t: any, e: any) => (...n: any[]) => void;
        debounce: (t: any, e: any) => (...s: any[]) => any;
        _toLeftRightCenter: (t: any) => "center" | "left" | "right";
        _alignStartEnd: (t: any, e: any, i: any) => any;
        _textX: (t: any, e: any, i: any, s: any) => any;
        _getStartAndCountOfVisiblePoints: (t: any, e: any, i: any) => {
            start: number;
            count: any;
        };
        _scaleRangesChanged: (t: any) => boolean;
        _pointInLine: (t: any, e: any, i: any, s: any) => {
            x: any;
            y: any;
        };
        _steppedInterpolation: (t: any, e: any, i: any, s: any) => {
            x: any;
            y: any;
        };
        _bezierInterpolation: (t: any, e: any, i: any, s: any) => {
            x: any;
            y: any;
        };
        formatNumber: (t: any, e: any, i: any) => any;
        toLineHeight: (t: any, e: any) => any;
        _readValueToProps: (t: any, e: any) => {};
        toTRBL: (t: any) => {};
        toTRBLCorners: (t: any) => {};
        toPadding: (t: any) => {};
        toFont: (t: any, e: any) => {
            family: any;
            lineHeight: any;
            size: any;
            style: any;
            weight: any;
            string: string;
        };
        resolve: (t: any, e: any, i: any, s: any) => any;
        _addGrace: (t: any, e: any, i: any) => {
            min: any;
            max: any;
        };
        createContext: (t: any, e: any) => any;
        PI: number;
        TAU: number;
        PITAU: number;
        INFINITY: number;
        RAD_PER_DEG: number;
        HALF_PI: number;
        QUARTER_PI: number;
        TWO_THIRDS_PI: number;
        log10: (x: number) => number;
        sign: (x: number) => number;
        almostEquals: (t: any, e: any, i: any) => boolean;
        niceNum: (t: any) => number;
        _factorize: (t: any) => number[];
        isNumber: (t: any) => boolean;
        almostWhole: (t: any, e: any) => boolean;
        _setMinAndMaxByKey: (t: any, e: any, i: any) => void;
        toRadians: (t: any) => number;
        toDegrees: (t: any) => number;
        _decimalPlaces: (t: any) => number;
        getAngleFromPoint: (t: any, e: any) => {
            angle: number;
            distance: number;
        };
        distanceBetweenPoints: (t: any, e: any) => number;
        _angleDiff: (t: any, e: any) => number;
        _normalizeAngle: (t: any) => number;
        _angleBetween: (t: any, e: any, i: any, s: any) => boolean;
        _limitValue: (t: any, e: any, i: any) => number;
        _int16Range: (t: any) => number;
        _isBetween: (t: any, e: any, i: any, s?: number) => boolean;
        getRtlAdapter: (t: any, e: any, i: any) => {
            x: (t: any) => any;
            setWidth(t: any): void;
            textAlign: (t: any) => any;
            xPlus: (t: any, e: any) => any;
            leftForLtr: (t: any, e: any) => any;
        };
        overrideTextDirection: (t: any, e: any) => void;
        restoreTextDirection: (t: any, e: any) => void;
        _boundSegment: (t: any, e: any, i: any) => any[];
        _boundSegments: (t: any, e: any) => any[];
        _computeSegments: (t: any, e: any) => any;
    };
    _adapters: {
        _date: {
            new (t: any): {
                options: any;
                init(): void;
                formats(): void;
                parse(): void;
                format(): void;
                add(): void;
                diff(): void;
                startOf(): void;
                endOf(): void;
            };
            override(t: any): void;
        };
    };
    Animation: {
        new (t: any, e: any, i: any, s: any): {
            _active: boolean;
            _fn: any;
            _easing: any;
            _start: number;
            _duration: number;
            _total: number;
            _loop: boolean;
            _target: any;
            _prop: any;
            _from: any;
            _to: any;
            active(): boolean;
            update(t: any, e: any, i: any): void;
            cancel(): void;
            tick(t: any): any;
            wait(): Promise<any>;
            _promises: any[];
            _notify(t: any): void;
        };
    };
    Animations: {
        new (t: any, e: any): {
            _chart: any;
            _properties: Map<any, any>;
            configure(t: any): void;
            _animateOptions(t: any, e: any): any;
            _createAnimations(t: any, e: any): any;
            update(t: any, e: any): boolean;
        };
    };
    animator: {
        _request: any;
        _charts: Map<any, any>;
        _running: boolean;
        _notify(t: any, e: any, i: any, s: any): void;
        _refresh(): void;
        _update(t?: number): void;
        _lastDate: number;
        _getAnims(t: any): any;
        listen(t: any, e: any, i: any): void;
        add(t: any, e: any): void;
        has(t: any): boolean;
        start(t: any): void;
        running(t: any): boolean;
        stop(t: any): void;
        remove(t: any): boolean;
    };
    controllers: any;
    DatasetController: {
        new (t: any, e: any): {
            chart: any;
            _ctx: any;
            index: any;
            _cachedDataOpts: {};
            _cachedMeta: any;
            _type: any;
            _parsing: boolean;
            enableOptionSharing: boolean;
            supportsDecimation: boolean;
            _syncList: any[];
            datasetElementType: any;
            dataElementType: any;
            initialize(): void;
            updateIndex(t: any): void;
            linkScales(): void;
            getDataset(): any;
            getMeta(): any;
            getScaleForId(t: any): any;
            _getOtherScale(t: any): any;
            reset(): void;
            _destroy(): void;
            _dataCheck(): void;
            _data: any;
            addElements(): void;
            buildOrUpdateElements(t: any): void;
            configure(): void;
            options: any;
            parse(t: any, e: any): void;
            parsePrimitiveData(t: any, e: any, i: any, s: any): any[];
            parseArrayData(t: any, e: any, i: any, s: any): any[];
            parseObjectData(t: any, e: any, i: any, s: any): any[];
            getParsed(t: any): any;
            getDataElement(t: any): any;
            applyStack(t: any, e: any, i: any): any;
            updateRangeFromParsed(t: any, e: any, i: any, s: any): void;
            getMinMax(t: any, e: any): {
                min: number;
                max: number;
            };
            getAllParsedValues(t: any): any[];
            getMaxOverflow(): boolean;
            getLabelAndValue(t: any): {
                label: string;
                value: string;
            };
            _update(t: any): void;
            update(t: any): void;
            draw(): void;
            getStyle(t: any, e: any): any;
            getContext(t: any, e: any, i: any): any;
            $context: any;
            resolveDatasetElementOptions(t: any): any;
            resolveDataElementOptions(t: any, e: any): any;
            _resolveElementOptions(t: any, e: string, i: any): any;
            _resolveAnimations(t: any, e: any, i: any): any;
            getSharedOptions(t: any): any;
            _sharedOptions: any;
            includeOptions(t: any, e: any): any;
            _getSharedOptions(t: any, e: any): {
                sharedOptions: any;
                includeOptions: any;
            };
            updateElement(t: any, e: any, i: any, s: any): void;
            updateSharedOptions(t: any, e: any, i: any): void;
            _setStyle(t: any, e: any, i: any, s: any): void;
            removeHoverStyle(t: any, e: any, i: any): void;
            setHoverStyle(t: any, e: any, i: any): void;
            _removeDatasetHoverStyle(): void;
            _setDatasetHoverStyle(): void;
            _resyncElements(t: any): void;
            _insertElements(t: any, e: any, i?: boolean): void;
            updateElements(t: any, e: any, i: any, s: any): void;
            _removeElements(t: any, e: any): void;
            _sync(t: any): void;
            _onDataPush(...args: any[]): void;
            _onDataPop(): void;
            _onDataShift(): void;
            _onDataSplice(t: any, e: any, ...args: any[]): void;
            _onDataUnshift(...args: any[]): void;
        };
        defaults: {};
        datasetElementType: any;
        dataElementType: any;
    };
    Element: {
        new (): {
            active: boolean;
            tooltipPosition(t: any): {
                x: any;
                y: any;
            };
            hasValue(): boolean;
            getProps(t: any, e: any): {};
        };
        defaults: {};
        defaultRoutes: any;
    };
    elements: Readonly<{
        __proto__: any;
        ArcElement: {
            new (t: any): {
                pixelMargin: number;
                fullCircles: number;
                inRange(t: any, e: any, i: any): boolean;
                getCenterPoint(t: any): {
                    x: any;
                    y: any;
                };
                tooltipPosition(t: any): {
                    x: any;
                    y: any;
                };
                draw(t: any): void;
                active: boolean;
                hasValue(): boolean;
                getProps(t: any, e: any): {};
            };
            id: string;
            defaults: {
                borderAlign: string;
                borderColor: string;
                borderJoinStyle: any;
                borderRadius: number;
                borderWidth: number;
                offset: number;
                spacing: number;
                angle: any;
                circular: boolean;
            };
            defaultRoutes: {
                backgroundColor: string;
            };
        };
        LineElement: {
            new (t: any): {
                animated: boolean;
                _decimated: boolean;
                _pointsUpdated: boolean;
                updateControlPoints(t: any, e: any): void;
                points: any;
                _points: any;
                readonly segments: any;
                _segments: any;
                first(): any;
                last(): any;
                interpolate(t: any, e: any): any;
                pathSegment(t: any, e: any, i: any): void;
                path(t: any, e: any, i: any): boolean;
                draw(t: any, e: any, i: any, s: any): void;
                active: boolean;
                tooltipPosition(t: any): {
                    x: any;
                    y: any;
                };
                hasValue(): boolean;
                getProps(t: any, e: any): {};
            };
            id: string;
            defaults: {
                borderCapStyle: string;
                borderDash: any[];
                borderDashOffset: number;
                borderJoinStyle: string;
                borderWidth: number;
                capBezierPoints: boolean;
                cubicInterpolationMode: string;
                fill: boolean;
                spanGaps: boolean;
                stepped: boolean;
                tension: number;
            };
            defaultRoutes: {
                backgroundColor: string;
                borderColor: string;
            };
            descriptors: {
                _scriptable: boolean;
                _indexable: (t: any) => boolean;
            };
        };
        PointElement: {
            new (t: any): {
                inRange(t: any, e: any, i: any): boolean;
                inXRange(t: any, e: any): boolean;
                inYRange(t: any, e: any): boolean;
                getCenterPoint(t: any): {
                    x: any;
                    y: any;
                };
                size(t: any): number;
                draw(t: any, e: any): void;
                getRange(): any;
                active: boolean;
                tooltipPosition(t: any): {
                    x: any;
                    y: any;
                };
                hasValue(): boolean;
                getProps(t: any, e: any): {};
            };
            id: string;
            defaults: {
                borderWidth: number;
                hitRadius: number;
                hoverBorderWidth: number;
                hoverRadius: number;
                pointStyle: string;
                radius: number;
                rotation: number;
            };
            defaultRoutes: {
                backgroundColor: string;
                borderColor: string;
            };
        };
        BarElement: {
            new (t: any): {
                draw(t: any): void;
                inRange(t: any, e: any, i: any): boolean;
                inXRange(t: any, e: any): boolean;
                inYRange(t: any, e: any): boolean;
                getCenterPoint(t: any): {
                    x: any;
                    y: any;
                };
                getRange(t: any): number;
                active: boolean;
                tooltipPosition(t: any): {
                    x: any;
                    y: any;
                };
                hasValue(): boolean;
                getProps(t: any, e: any): {};
            };
            id: string;
            defaults: {
                borderSkipped: string;
                borderWidth: number;
                borderRadius: number;
                inflateAmount: string;
                pointStyle: any;
            };
            defaultRoutes: {
                backgroundColor: string;
                borderColor: string;
            };
        };
    }>;
    Interaction: {
        evaluateInteractionItems: (t: any, e: any, i: any, s: any, n: any) => void;
        modes: {
            index(t: any, e: any, i: any, s: any): any[];
            dataset(t: any, e: any, i: any, s: any): any[];
            point: (t: any, e: any, i: any, s: any) => any[];
            nearest(t: any, e: any, i: any, s: any): any[];
            x: (t: any, e: any, i: any, s: any) => any[];
            y: (t: any, e: any, i: any, s: any) => any[];
        };
    };
    layouts: {
        addBox(t: any, e: any): void;
        removeBox(t: any, e: any): void;
        configure(t: any, e: any, i: any): void;
        update(t: any, e: any, i: any, s: any): void;
    };
    platforms: Readonly<{
        __proto__: any;
        _detectPlatform: (t: any) => {
            new (): {
                acquireContext(t: any): any;
                updateConfig(t: any): void;
                releaseContext(t: any): boolean;
                addEventListener(t: any, e: any, i: any): void;
                removeEventListener(t: any, e: any, i: any): void;
                getDevicePixelRatio(): number;
                getMaximumSize(t: any, e: any, i: any, s: any): {
                    width: any;
                    height: number;
                };
                isAttached(t: any): boolean;
            };
        } | {
            new (): {
                acquireContext(t: any, e: any): any;
                releaseContext(t: any): boolean;
                addEventListener(t: any, e: any, i: any): void;
                removeEventListener(t: any, e: any): void;
                getDevicePixelRatio(): number;
                getMaximumSize(t: any, e: any, i: any, s: any): {
                    width: any;
                    height: any;
                };
                isAttached(t: any): boolean;
                updateConfig(t: any): void;
            };
        };
        BasePlatform: {
            new (): {
                acquireContext(t: any, e: any): void;
                releaseContext(t: any): boolean;
                addEventListener(t: any, e: any, i: any): void;
                removeEventListener(t: any, e: any, i: any): void;
                getDevicePixelRatio(): number;
                getMaximumSize(t: any, e: any, i: any, s: any): {
                    width: any;
                    height: number;
                };
                isAttached(t: any): boolean;
                updateConfig(t: any): void;
            };
        };
        BasicPlatform: {
            new (): {
                acquireContext(t: any): any;
                updateConfig(t: any): void;
                releaseContext(t: any): boolean;
                addEventListener(t: any, e: any, i: any): void;
                removeEventListener(t: any, e: any, i: any): void;
                getDevicePixelRatio(): number;
                getMaximumSize(t: any, e: any, i: any, s: any): {
                    width: any;
                    height: number;
                };
                isAttached(t: any): boolean;
            };
        };
        DomPlatform: {
            new (): {
                acquireContext(t: any, e: any): any;
                releaseContext(t: any): boolean;
                addEventListener(t: any, e: any, i: any): void;
                removeEventListener(t: any, e: any): void;
                getDevicePixelRatio(): number;
                getMaximumSize(t: any, e: any, i: any, s: any): {
                    width: any;
                    height: any;
                };
                isAttached(t: any): boolean;
                updateConfig(t: any): void;
            };
        };
    }>;
    Scale: {
        new (t: any): {
            id: any;
            type: any;
            ctx: any;
            chart: any;
            _margins: {
                left: number;
                right: number;
                top: number;
                bottom: number;
            };
            ticks: any[];
            _gridLineItems: {
                tx1: number;
                ty1: number;
                tx2: any;
                ty2: any;
                x1: any;
                y1: any;
                x2: any;
                y2: any;
                width: any;
                color: any;
                borderDash: any;
                borderDashOffset: any;
                tickWidth: any;
                tickColor: any;
                tickBorderDash: any;
                tickBorderDashOffset: any;
            }[];
            _labelItems: {
                label: any;
                font: {
                    family: any;
                    lineHeight: any;
                    size: any;
                    style: any;
                    weight: any;
                    string: string;
                };
                textOffset: any;
                options: {
                    rotation: number;
                    color: any;
                    strokeColor: any;
                    strokeWidth: any;
                    textAlign: string;
                    textBaseline: string;
                    translation: any[];
                    backdrop: {
                        left: number;
                        top: number;
                        width: any;
                        height: any;
                        color: any;
                    };
                };
            }[];
            _labelSizes: any;
            _length: number;
            _maxLength: number;
            _longestTextCache: {};
            _reversePixels: boolean;
            _ticksLength: number;
            _borderValue: number;
            _cache: {};
            _dataLimitsCached: boolean;
            init(t: any): void;
            options: any;
            axis: any;
            _userMin: any;
            _userMax: any;
            _suggestedMin: any;
            _suggestedMax: any;
            parse(t: any, e: any): any;
            getUserBounds(): {
                min: any;
                max: any;
                minDefined: boolean;
                maxDefined: boolean;
            };
            getMinMax(t: any): {
                min: any;
                max: any;
            };
            getPadding(): {
                left: number;
                top: any;
                right: number;
                bottom: any;
            };
            getTicks(): any[];
            getLabels(): any;
            getLabelItems(t?: any): {
                label: any;
                font: {
                    family: any;
                    lineHeight: any;
                    size: any;
                    style: any;
                    weight: any;
                    string: string;
                };
                textOffset: any;
                options: {
                    rotation: number;
                    color: any;
                    strokeColor: any;
                    strokeWidth: any;
                    textAlign: string;
                    textBaseline: string;
                    translation: any[];
                    backdrop: {
                        left: number;
                        top: number;
                        width: any;
                        height: any;
                        color: any;
                    };
                };
            }[];
            beforeLayout(): void;
            beforeUpdate(): void;
            update(t: any, e: any, i: any): void;
            maxWidth: any;
            maxHeight: any;
            _range: {
                min: any;
                max: any;
            };
            configure(): void;
            _startPixel: number;
            _endPixel: any;
            _alignToPixels: any;
            afterUpdate(): void;
            beforeSetDimensions(): void;
            setDimensions(): void;
            width: any;
            left: number;
            right: any;
            height: any;
            top: number;
            bottom: any;
            paddingLeft: number;
            paddingTop: any;
            paddingRight: number;
            paddingBottom: any;
            afterSetDimensions(): void;
            _callHooks(t: any): void;
            beforeDataLimits(): void;
            determineDataLimits(): void;
            afterDataLimits(): void;
            beforeBuildTicks(): void;
            buildTicks(): any[];
            afterBuildTicks(): void;
            beforeTickToLabelConversion(): void;
            generateTickLabels(t: any): void;
            afterTickToLabelConversion(): void;
            beforeCalculateLabelRotation(): void;
            calculateLabelRotation(): any;
            labelRotation: any;
            afterCalculateLabelRotation(): void;
            afterAutoSkip(): void;
            beforeFit(): void;
            fit(): void;
            _calculatePadding(t: any, e: any, i: any, s: any): void;
            _handleMargins(): void;
            afterFit(): void;
            isHorizontal(): boolean;
            isFullSize(): any;
            _convertTicksToLabels(t: any): void;
            _getLabelSizes(): any;
            _computeLabelSizes(t: any, e: any): {
                first: {
                    width: any;
                    height: any;
                };
                last: {
                    width: any;
                    height: any;
                };
                widest: {
                    width: any;
                    height: any;
                };
                highest: {
                    width: any;
                    height: any;
                };
                widths: any[];
                heights: any[];
            };
            getLabelForValue(t: any): any;
            getPixelForValue(t: any, e: any): number;
            getValueForPixel(t: any): void;
            getPixelForTick(t: any): number;
            getPixelForDecimal(t: any): number;
            getDecimalForPixel(t: any): number;
            getBasePixel(): number;
            getBaseValue(): any;
            getContext(t: any): any;
            $context: any;
            _tickSize(): number;
            _isVisible(): boolean;
            _computeGridLineItems(t: any): {
                tx1: number;
                ty1: number;
                tx2: any;
                ty2: any;
                x1: any;
                y1: any;
                x2: any;
                y2: any;
                width: any;
                color: any;
                borderDash: any;
                borderDashOffset: any;
                tickWidth: any;
                tickColor: any;
                tickBorderDash: any;
                tickBorderDashOffset: any;
            }[];
            _computeLabelItems(t: any): {
                label: any;
                font: {
                    family: any;
                    lineHeight: any;
                    size: any;
                    style: any;
                    weight: any;
                    string: string;
                };
                textOffset: any;
                options: {
                    rotation: number;
                    color: any;
                    strokeColor: any;
                    strokeWidth: any;
                    textAlign: string;
                    textBaseline: string;
                    translation: any[];
                    backdrop: {
                        left: number;
                        top: number;
                        width: any;
                        height: any;
                        color: any;
                    };
                };
            }[];
            _getXAxisLabelAlignment(): string;
            _getYAxisLabelAlignment(t: any): {
                textAlign: string;
                x: any;
            };
            _computeLabelArea(): {
                top: number;
                left: number;
                bottom: any;
                right: any;
            };
            drawBackground(): void;
            getLineWidthForValue(t: any): any;
            drawGrid(t: any): void;
            drawBorder(): void;
            drawLabels(t: any): void;
            drawTitle(): void;
            draw(t: any): void;
            _layers(): {
                z: any;
                draw: (t: any) => void;
            }[];
            getMatchingVisibleMetas(t: any): any[];
            _resolveTickFontOptions(t: any): {
                family: any;
                lineHeight: any;
                size: any;
                style: any;
                weight: any;
                string: string;
            };
            _maxDigits(): number;
            active: boolean;
            tooltipPosition(t: any): {
                x: any;
                y: any;
            };
            hasValue(): boolean;
            getProps(t: any, e: any): {};
        };
        defaults: {};
        defaultRoutes: any;
    };
    Ticks: {
        formatters: {
            values: (t: any) => any;
            numeric(t: any, e: any, i: any): any;
            logarithmic(t: any, e: any, i: any): any;
        };
    };
    Chart: {
        new (t: any, e: any): {
            config: {
                _config: any;
                _scopeCache: Map<any, any>;
                _resolverCache: Map<any, any>;
                readonly platform: any;
                type: any;
                data: any;
                options: any;
                readonly plugins: any;
                update(): void;
                clearCache(): void;
                datasetScopeKeys(t: any): any;
                datasetAnimationScopeKeys(t: any, e: any): any;
                datasetElementScopeKeys(t: any, e: any): any;
                pluginScopeKeys(t: any): any;
                _cachedScopes(t: any, e: any): any;
                getOptionScopes(t: any, e: any, i: any): any;
                chartOptionScopes(): any[];
                resolveNamedOptions(t: any, e: any, i: any, s?: string[]): {
                    $shared: boolean;
                };
                createResolver(t: any, e: any, i: string[], s: any): any;
            };
            platform: any;
            id: number;
            ctx: any;
            canvas: any;
            width: any;
            height: any;
            _options: any;
            _aspectRatio: any;
            _layers: any[];
            _metasets: any[];
            boxes: any[];
            _active: any[];
            _listeners: {};
            _sortedMetasets: any[];
            scales: {};
            _plugins: {
                _init: any[];
                notify(t: any, e: any, i: any, s: any): boolean;
                _notify(t: any, e: any, i: any, s: any): boolean;
                invalidate(): void;
                _oldCache: {
                    plugin: any;
                    options: any;
                }[];
                _descriptors(t: any): {
                    plugin: any;
                    options: any;
                }[];
                _cache: {
                    plugin: any;
                    options: any;
                }[];
                _createDescriptors(t: any, e: any): {
                    plugin: any;
                    options: any;
                }[];
                _notifyStateChanges(t: any): void;
            };
            $proxies: {};
            _hiddenIndices: {};
            attached: boolean;
            _doResize: (...s: any[]) => any;
            _dataChanges: any[];
            readonly aspectRatio: any;
            data: any;
            options: any;
            readonly registry: {
                controllers: {
                    type: any;
                    scope: any;
                    override: any;
                    items: any;
                    isForType(t: any): any;
                    register(t: any): any;
                    get(t: any): any;
                    unregister(t: any): void;
                };
                elements: {
                    type: any;
                    scope: any;
                    override: any;
                    items: any;
                    isForType(t: any): any;
                    register(t: any): any;
                    get(t: any): any;
                    unregister(t: any): void;
                };
                plugins: {
                    type: any;
                    scope: any;
                    override: any;
                    items: any;
                    isForType(t: any): any;
                    register(t: any): any;
                    get(t: any): any;
                    unregister(t: any): void;
                };
                scales: {
                    type: any;
                    scope: any;
                    override: any;
                    items: any;
                    isForType(t: any): any;
                    register(t: any): any;
                    get(t: any): any;
                    unregister(t: any): void;
                };
                _typedRegistries: {
                    type: any;
                    scope: any;
                    override: any;
                    items: any;
                    isForType(t: any): any;
                    register(t: any): any;
                    get(t: any): any;
                    unregister(t: any): void;
                }[];
                add(...t: any[]): void;
                remove(...t: any[]): void;
                addControllers(...t: any[]): void;
                addElements(...t: any[]): void;
                addPlugins(...t: any[]): void;
                addScales(...t: any[]): void;
                getController(t: any): any;
                getElement(t: any): any;
                getPlugin(t: any): any;
                getScale(t: any): any;
                removeControllers(...t: any[]): void;
                removeElements(...t: any[]): void;
                removePlugins(...t: any[]): void;
                removeScales(...t: any[]): void;
                _each(t: any, e: any, i: any): void;
                _exec(t: any, e: any, i: any): void;
                _getRegistryForType(t: any): {
                    type: any;
                    scope: any;
                    override: any;
                    items: any;
                    isForType(t: any): any;
                    register(t: any): any;
                    get(t: any): any;
                    unregister(t: any): void;
                };
                _get(t: any, e: any, i: any): any;
            };
            _initialize(): any;
            clear(): any;
            stop(): any;
            resize(t: any, e: any): void;
            _resizeBeforeDraw: {
                width: any;
                height: any;
            };
            _resize(t: any, e: any): void;
            ensureScalesHaveIDs(): void;
            buildOrUpdateScales(): void;
            _updateMetasets(): void;
            _removeUnreferencedMetasets(): void;
            buildOrUpdateControllers(): any[];
            _resetElements(): void;
            reset(): void;
            update(t: any): void;
            _animationsDisabled: boolean;
            _minPadding: number;
            _updateScales(): void;
            _checkEventBindings(): void;
            _updateHiddenIndices(): void;
            _getUniformDataChanges(): {
                method: string;
                start: number;
                count: number;
            }[];
            _updateLayout(t: any): void;
            _updateDatasets(t: any): void;
            _updateDataset(t: any, e: any): void;
            render(): void;
            draw(): void;
            _getSortedDatasetMetas(t: any): any[];
            getSortedVisibleDatasetMetas(): any[];
            _drawDatasets(): void;
            _drawDataset(t: any): void;
            isPointInArea(t: any): boolean;
            getElementsAtEventForMode(t: any, e: any, i: any, s: any): any;
            getDatasetMeta(t: any): any;
            getContext(): any;
            $context: any;
            getVisibleDatasetCount(): number;
            isDatasetVisible(t: any): boolean;
            setDatasetVisibility(t: any, e: any): void;
            toggleDataVisibility(t: any): void;
            getDataVisibility(t: any): boolean;
            _updateVisibility(t: any, e: any, i: any): void;
            hide(t: any, e: any): void;
            show(t: any, e: any): void;
            _destroyDatasetMeta(t: any): void;
            _stop(): void;
            destroy(): void;
            toBase64Image(...t: any[]): any;
            bindEvents(): void;
            bindUserEvents(): void;
            bindResponsiveEvents(): void;
            _responsiveListeners: {};
            unbindEvents(): void;
            updateHoverStyle(t: any, e: any, i: any): void;
            getActiveElements(): any[];
            setActiveElements(t: any): void;
            _lastEvent: any;
            notifyPlugins(t: any, e: any, i: any): boolean;
            isPluginEnabled(t: any): boolean;
            _updateHoverStyles(t: any, e: any, i: any): void;
            _eventHandler(t: any, e: any): any;
            _handleEvent(t: any, e: any, i: any): boolean;
            _getActiveElements(t: any, e: any, i: any, s: any): any;
        };
        defaults: {
            backgroundColor: string;
            borderColor: string;
            color: string;
            datasets: {};
            devicePixelRatio: (t: any) => any;
            elements: {};
            events: string[];
            font: {
                family: string;
                size: number;
                style: string;
                lineHeight: number;
                weight: any;
            };
            hover: {};
            hoverBackgroundColor: (t: any, e: any) => any;
            hoverBorderColor: (t: any, e: any) => any;
            hoverColor: (t: any, e: any) => any;
            indexAxis: string;
            interaction: {
                mode: string;
                intersect: boolean;
                includeInvisible: boolean;
            };
            maintainAspectRatio: boolean;
            onHover: any;
            onClick: any;
            parsing: boolean;
            plugins: {};
            responsive: boolean;
            scales: {};
            showLine: boolean;
            drawActiveElementsOnTop: boolean;
            set(t: any, e: any): any;
            get(t: any): any;
            describe(t: any, e: any): any;
            override(t: any, e: any): any;
            route(t: any, e: any, i: any, s: any): void;
            apply(t: any): void;
        };
        instances: {};
        overrides: any;
        registry: {
            controllers: {
                type: any;
                scope: any;
                override: any;
                items: any;
                isForType(t: any): any;
                register(t: any): any;
                get(t: any): any;
                unregister(t: any): void;
            };
            elements: {
                type: any;
                scope: any;
                override: any;
                items: any;
                isForType(t: any): any;
                register(t: any): any;
                get(t: any): any;
                unregister(t: any): void;
            };
            plugins: {
                type: any;
                scope: any;
                override: any;
                items: any;
                isForType(t: any): any;
                register(t: any): any;
                get(t: any): any;
                unregister(t: any): void;
            };
            scales: {
                type: any;
                scope: any;
                override: any;
                items: any;
                isForType(t: any): any;
                register(t: any): any;
                get(t: any): any;
                unregister(t: any): void;
            };
            _typedRegistries: {
                type: any;
                scope: any;
                override: any;
                items: any;
                isForType(t: any): any;
                register(t: any): any;
                get(t: any): any;
                unregister(t: any): void;
            }[];
            add(...t: any[]): void;
            remove(...t: any[]): void;
            addControllers(...t: any[]): void;
            addElements(...t: any[]): void;
            addPlugins(...t: any[]): void;
            addScales(...t: any[]): void;
            getController(t: any): any;
            getElement(t: any): any;
            getPlugin(t: any): any;
            getScale(t: any): any;
            removeControllers(...t: any[]): void;
            removeElements(...t: any[]): void;
            removePlugins(...t: any[]): void;
            removeScales(...t: any[]): void;
            _each(t: any, e: any, i: any): void;
            _exec(t: any, e: any, i: any): void;
            _getRegistryForType(t: any): {
                type: any;
                scope: any;
                override: any;
                items: any;
                isForType(t: any): any;
                register(t: any): any;
                get(t: any): any;
                unregister(t: any): void;
            };
            _get(t: any, e: any, i: any): any;
        };
        version: string;
        getChart: (t: any) => any;
        register(...t: any[]): void;
        unregister(...t: any[]): void;
        helpers: {
            __proto__: any;
            easingEffects: {
                linear: (t: any) => any;
                easeInQuad: (t: any) => number;
                easeOutQuad: (t: any) => number;
                easeInOutQuad: (t: any) => number;
                easeInCubic: (t: any) => number;
                easeOutCubic: (t: any) => number;
                easeInOutCubic: (t: any) => number;
                easeInQuart: (t: any) => number;
                easeOutQuart: (t: any) => number;
                easeInOutQuart: (t: any) => number;
                easeInQuint: (t: any) => number;
                easeOutQuint: (t: any) => number;
                easeInOutQuint: (t: any) => number;
                easeInSine: (t: any) => number;
                easeOutSine: (t: any) => number;
                easeInOutSine: (t: any) => number;
                easeInExpo: (t: any) => number;
                easeOutExpo: (t: any) => number;
                easeInOutExpo: (t: any) => any;
                easeInCirc: (t: any) => any;
                easeOutCirc: (t: any) => number;
                easeInOutCirc: (t: any) => number;
                easeInElastic: (t: any) => any;
                easeOutElastic: (t: any) => any;
                easeInOutElastic(t: any): any;
                easeInBack(t: any): number;
                easeOutBack(t: any): number;
                easeInOutBack(t: any): number;
                easeInBounce: (t: any) => number;
                easeOutBounce(t: any): number;
                easeInOutBounce: (t: any) => number;
            };
            isPatternOrGradient: (t: any) => boolean;
            color: (t: any) => any;
            getHoverColor: (t: any) => any;
            noop: () => void;
            uid: () => number;
            isNullOrUndef: (t: any) => boolean;
            isArray: (t: any) => boolean;
            isObject: (t: any) => boolean;
            isFinite: (t: any) => boolean;
            finiteOrDefault: (t: any, e: any) => any;
            valueOrDefault: (t: any, e: any) => any;
            toPercentage: (t: any, e: any) => number;
            toDimension: (t: any, e: any) => number;
            callback: (t: any, e: any, i: any) => any;
            each: (t: any, e: any, i: any, s: any) => void;
            _elementsEqual: (t: any, e: any) => boolean;
            clone: (t: any) => any;
            _merger: (t: any, e: any, i: any, s: any) => void;
            merge: (t: any, e: any, i: any) => any;
            mergeIf: (t: any, e: any) => any;
            _mergerIf: (t: any, e: any, i: any) => void;
            _deprecated: (t: any, e: any, i: any, s: any) => void;
            _splitKey: (t: any) => string[];
            resolveObjectKey: (t: any, e: any) => any;
            _capitalize: (t: any) => any;
            defined: (t: any) => boolean;
            isFunction: (t: any) => boolean;
            setsEqual: (t: any, e: any) => boolean;
            _isClickEvent: (t: any) => boolean;
            toFontString: (t: any) => string;
            _measureText: (t: any, e: any, i: any, s: any, n: any) => any;
            _longestText: (t: any, e: any, i: any, s: any) => number;
            _alignPixel: (t: any, e: any, i: any) => number;
            clearCanvas: (t: any, e: any) => void;
            drawPoint: (t: any, e: any, i: any, s: any) => void;
            drawPointLegend: (t: any, e: any, i: any, s: any, n: any) => any;
            _isPointInArea: (t: any, e: any, i: any) => boolean;
            clipArea: (t: any, e: any) => void;
            unclipArea: (t: any) => void;
            _steppedLineTo: (t: any, e: any, i: any, s: any, n: any) => any;
            _bezierCurveTo: (t: any, e: any, i: any, s: any) => any;
            renderText: (t: any, e: any, i: any, o: any, a: any, r?: {}) => void;
            addRoundedRectPath: (t: any, e: any) => void;
            _lookup: (t: any, e: any, i: any) => {
                lo: number;
                hi: number;
            };
            _lookupByKey: (t: any, e: any, i: any, s: any) => {
                lo: number;
                hi: number;
            };
            _rlookupByKey: (t: any, e: any, i: any) => {
                lo: number;
                hi: number;
            };
            _filterBetween: (t: any, e: any, i: any) => any;
            listenArrayEvents: (t: any, e: any) => void;
            unlistenArrayEvents: (t: any, e: any) => void;
            _arrayUnique: (t: any) => any;
            _createResolver: (t: any, e: string[], i: any, s: any, n?: () => any) => any;
            _attachContext: (t: any, e: any, i: any, s: any) => {
                _cacheable: boolean;
                _proxy: any;
                _context: any;
                _subProxy: any;
                _stack: Set<any>;
                _descriptors: {
                    allKeys: any;
                    scriptable: any;
                    indexable: any;
                    isScriptable: any;
                    isIndexable: any;
                };
                setContext: (e: any) => any;
                override: (n: any) => any;
            };
            _descriptors: (t: any, e?: {
                scriptable: boolean;
                indexable: boolean;
            }) => {
                allKeys: any;
                scriptable: any;
                indexable: any;
                isScriptable: any;
                isIndexable: any;
            };
            _parseObjectDataRadialScale: (t: any, e: any, i: any, s: any) => any[];
            splineCurve: (t: any, e: any, i: any, s: any) => {
                previous: {
                    x: number;
                    y: number;
                };
                next: {
                    x: any;
                    y: any;
                };
            };
            splineCurveMonotone: (t: any, e?: string) => void;
            _updateBezierControlPoints: (t: any, e: any, i: any, s: any, n: any) => void;
            _isDomSupported: () => boolean;
            _getParentNode: (t: any) => any;
            getStyle: (t: any, e: any) => any;
            getRelativePosition: (t: any, e: any) => any;
            getMaximumSize: (t: any, e: any, i: any, s: any) => {
                width: any;
                height: any;
            };
            retinaScale: (t: any, e: any, i: any) => boolean;
            supportsEventListenerOptions: boolean;
            readUsedSize: (t: any, e: any) => number;
            fontString: (t: any, e: any, i: any) => string;
            requestAnimFrame: (t: any) => any;
            throttled: (t: any, e: any) => (...n: any[]) => void;
            debounce: (t: any, e: any) => (...s: any[]) => any;
            _toLeftRightCenter: (t: any) => "center" | "left" | "right";
            _alignStartEnd: (t: any, e: any, i: any) => any;
            _textX: (t: any, e: any, i: any, s: any) => any;
            _getStartAndCountOfVisiblePoints: (t: any, e: any, i: any) => {
                start: number;
                count: any;
            };
            _scaleRangesChanged: (t: any) => boolean;
            _pointInLine: (t: any, e: any, i: any, s: any) => {
                x: any;
                y: any;
            };
            _steppedInterpolation: (t: any, e: any, i: any, s: any) => {
                x: any;
                y: any;
            };
            _bezierInterpolation: (t: any, e: any, i: any, s: any) => {
                x: any;
                y: any;
            };
            formatNumber: (t: any, e: any, i: any) => any;
            toLineHeight: (t: any, e: any) => any;
            _readValueToProps: (t: any, e: any) => {};
            toTRBL: (t: any) => {};
            toTRBLCorners: (t: any) => {};
            toPadding: (t: any) => {};
            toFont: (t: any, e: any) => {
                family: any;
                lineHeight: any;
                size: any;
                style: any;
                weight: any;
                string: string;
            };
            resolve: (t: any, e: any, i: any, s: any) => any;
            _addGrace: (t: any, e: any, i: any) => {
                min: any;
                max: any;
            };
            createContext: (t: any, e: any) => any;
            PI: number;
            TAU: number;
            PITAU: number;
            INFINITY: number;
            RAD_PER_DEG: number;
            HALF_PI: number;
            QUARTER_PI: number;
            TWO_THIRDS_PI: number;
            log10: (x: number) => number;
            sign: (x: number) => number;
            almostEquals: (t: any, e: any, i: any) => boolean;
            niceNum: (t: any) => number;
            _factorize: (t: any) => number[];
            isNumber: (t: any) => boolean;
            almostWhole: (t: any, e: any) => boolean;
            _setMinAndMaxByKey: (t: any, e: any, i: any) => void;
            toRadians: (t: any) => number;
            toDegrees: (t: any) => number;
            _decimalPlaces: (t: any) => number;
            getAngleFromPoint: (t: any, e: any) => {
                angle: number;
                distance: number;
            };
            distanceBetweenPoints: (t: any, e: any) => number;
            _angleDiff: (t: any, e: any) => number;
            _normalizeAngle: (t: any) => number;
            _angleBetween: (t: any, e: any, i: any, s: any) => boolean;
            _limitValue: (t: any, e: any, i: any) => number;
            _int16Range: (t: any) => number;
            _isBetween: (t: any, e: any, i: any, s?: number) => boolean;
            getRtlAdapter: (t: any, e: any, i: any) => {
                x: (t: any) => any;
                setWidth(t: any): void;
                textAlign: (t: any) => any;
                xPlus: (t: any, e: any) => any;
                leftForLtr: (t: any, e: any) => any;
            };
            overrideTextDirection: (t: any, e: any) => void;
            restoreTextDirection: (t: any, e: any) => void;
            _boundSegment: (t: any, e: any, i: any) => any[];
            _boundSegments: (t: any, e: any) => any[];
            _computeSegments: (t: any, e: any) => any;
        };
        _adapters: {
            _date: {
                new (t: any): {
                    options: any;
                    init(): void;
                    formats(): void;
                    parse(): void;
                    format(): void;
                    add(): void;
                    diff(): void;
                    startOf(): void;
                    endOf(): void;
                };
                override(t: any): void;
            };
        };
        Animation: {
            new (t: any, e: any, i: any, s: any): {
                _active: boolean;
                _fn: any;
                _easing: any;
                _start: number;
                _duration: number;
                _total: number;
                _loop: boolean;
                _target: any;
                _prop: any;
                _from: any;
                _to: any;
                active(): boolean;
                update(t: any, e: any, i: any): void;
                cancel(): void;
                tick(t: any): any;
                wait(): Promise<any>;
                _promises: any[];
                _notify(t: any): void;
            };
        };
        Animations: {
            new (t: any, e: any): {
                _chart: any;
                _properties: Map<any, any>;
                configure(t: any): void;
                _animateOptions(t: any, e: any): any;
                _createAnimations(t: any, e: any): any;
                update(t: any, e: any): boolean;
            };
        };
        animator: {
            _request: any;
            _charts: Map<any, any>;
            _running: boolean;
            _notify(t: any, e: any, i: any, s: any): void;
            _refresh(): void;
            _update(t?: number): void;
            _lastDate: number;
            _getAnims(t: any): any;
            listen(t: any, e: any, i: any): void;
            add(t: any, e: any): void;
            has(t: any): boolean;
            start(t: any): void;
            running(t: any): boolean;
            stop(t: any): void;
            remove(t: any): boolean;
        };
        controllers: any;
        DatasetController: {
            new (t: any, e: any): {
                chart: any;
                _ctx: any;
                index: any;
                _cachedDataOpts: {};
                _cachedMeta: any;
                _type: any;
                _parsing: boolean;
                enableOptionSharing: boolean;
                supportsDecimation: boolean;
                _syncList: any[];
                datasetElementType: any;
                dataElementType: any;
                initialize(): void;
                updateIndex(t: any): void;
                linkScales(): void;
                getDataset(): any;
                getMeta(): any;
                getScaleForId(t: any): any;
                _getOtherScale(t: any): any;
                reset(): void;
                _destroy(): void;
                _dataCheck(): void;
                _data: any;
                addElements(): void;
                buildOrUpdateElements(t: any): void;
                configure(): void;
                options: any;
                parse(t: any, e: any): void;
                parsePrimitiveData(t: any, e: any, i: any, s: any): any[];
                parseArrayData(t: any, e: any, i: any, s: any): any[];
                parseObjectData(t: any, e: any, i: any, s: any): any[];
                getParsed(t: any): any;
                getDataElement(t: any): any;
                applyStack(t: any, e: any, i: any): any;
                updateRangeFromParsed(t: any, e: any, i: any, s: any): void;
                getMinMax(t: any, e: any): {
                    min: number;
                    max: number;
                };
                getAllParsedValues(t: any): any[];
                getMaxOverflow(): boolean;
                getLabelAndValue(t: any): {
                    label: string;
                    value: string;
                };
                _update(t: any): void;
                update(t: any): void;
                draw(): void;
                getStyle(t: any, e: any): any;
                getContext(t: any, e: any, i: any): any;
                $context: any;
                resolveDatasetElementOptions(t: any): any;
                resolveDataElementOptions(t: any, e: any): any;
                _resolveElementOptions(t: any, e: string, i: any): any;
                _resolveAnimations(t: any, e: any, i: any): any;
                getSharedOptions(t: any): any;
                _sharedOptions: any;
                includeOptions(t: any, e: any): any;
                _getSharedOptions(t: any, e: any): {
                    sharedOptions: any;
                    includeOptions: any;
                };
                updateElement(t: any, e: any, i: any, s: any): void;
                updateSharedOptions(t: any, e: any, i: any): void;
                _setStyle(t: any, e: any, i: any, s: any): void;
                removeHoverStyle(t: any, e: any, i: any): void;
                setHoverStyle(t: any, e: any, i: any): void;
                _removeDatasetHoverStyle(): void;
                _setDatasetHoverStyle(): void;
                _resyncElements(t: any): void;
                _insertElements(t: any, e: any, i?: boolean): void;
                updateElements(t: any, e: any, i: any, s: any): void;
                _removeElements(t: any, e: any): void;
                _sync(t: any): void;
                _onDataPush(...args: any[]): void;
                _onDataPop(): void;
                _onDataShift(): void;
                _onDataSplice(t: any, e: any, ...args: any[]): void;
                _onDataUnshift(...args: any[]): void;
            };
            defaults: {};
            datasetElementType: any;
            dataElementType: any;
        };
        Element: {
            new (): {
                active: boolean;
                tooltipPosition(t: any): {
                    x: any;
                    y: any;
                };
                hasValue(): boolean;
                getProps(t: any, e: any): {};
            };
            defaults: {};
            defaultRoutes: any;
        };
        elements: Readonly<{
            __proto__: any;
            ArcElement: {
                new (t: any): {
                    pixelMargin: number;
                    fullCircles: number;
                    inRange(t: any, e: any, i: any): boolean;
                    getCenterPoint(t: any): {
                        x: any;
                        y: any;
                    };
                    tooltipPosition(t: any): {
                        x: any;
                        y: any;
                    };
                    draw(t: any): void;
                    active: boolean;
                    hasValue(): boolean;
                    getProps(t: any, e: any): {};
                };
                id: string;
                defaults: {
                    borderAlign: string;
                    borderColor: string;
                    borderJoinStyle: any;
                    borderRadius: number;
                    borderWidth: number;
                    offset: number;
                    spacing: number;
                    angle: any;
                    circular: boolean;
                };
                defaultRoutes: {
                    backgroundColor: string;
                };
            };
            LineElement: {
                new (t: any): {
                    animated: boolean;
                    _decimated: boolean;
                    _pointsUpdated: boolean;
                    updateControlPoints(t: any, e: any): void;
                    points: any;
                    _points: any;
                    readonly segments: any;
                    _segments: any;
                    first(): any;
                    last(): any;
                    interpolate(t: any, e: any): any;
                    pathSegment(t: any, e: any, i: any): void;
                    path(t: any, e: any, i: any): boolean;
                    draw(t: any, e: any, i: any, s: any): void;
                    active: boolean;
                    tooltipPosition(t: any): {
                        x: any;
                        y: any;
                    };
                    hasValue(): boolean;
                    getProps(t: any, e: any): {};
                };
                id: string;
                defaults: {
                    borderCapStyle: string;
                    borderDash: any[];
                    borderDashOffset: number;
                    borderJoinStyle: string;
                    borderWidth: number;
                    capBezierPoints: boolean;
                    cubicInterpolationMode: string;
                    fill: boolean;
                    spanGaps: boolean;
                    stepped: boolean;
                    tension: number;
                };
                defaultRoutes: {
                    backgroundColor: string;
                    borderColor: string;
                };
                descriptors: {
                    _scriptable: boolean;
                    _indexable: (t: any) => boolean;
                };
            };
            PointElement: {
                new (t: any): {
                    inRange(t: any, e: any, i: any): boolean;
                    inXRange(t: any, e: any): boolean;
                    inYRange(t: any, e: any): boolean;
                    getCenterPoint(t: any): {
                        x: any;
                        y: any;
                    };
                    size(t: any): number;
                    draw(t: any, e: any): void;
                    getRange(): any;
                    active: boolean;
                    tooltipPosition(t: any): {
                        x: any;
                        y: any;
                    };
                    hasValue(): boolean;
                    getProps(t: any, e: any): {};
                };
                id: string;
                defaults: {
                    borderWidth: number;
                    hitRadius: number;
                    hoverBorderWidth: number;
                    hoverRadius: number;
                    pointStyle: string;
                    radius: number;
                    rotation: number;
                };
                defaultRoutes: {
                    backgroundColor: string;
                    borderColor: string;
                };
            };
            BarElement: {
                new (t: any): {
                    draw(t: any): void;
                    inRange(t: any, e: any, i: any): boolean;
                    inXRange(t: any, e: any): boolean;
                    inYRange(t: any, e: any): boolean;
                    getCenterPoint(t: any): {
                        x: any;
                        y: any;
                    };
                    getRange(t: any): number;
                    active: boolean;
                    tooltipPosition(t: any): {
                        x: any;
                        y: any;
                    };
                    hasValue(): boolean;
                    getProps(t: any, e: any): {};
                };
                id: string;
                defaults: {
                    borderSkipped: string;
                    borderWidth: number;
                    borderRadius: number;
                    inflateAmount: string;
                    pointStyle: any;
                };
                defaultRoutes: {
                    backgroundColor: string;
                    borderColor: string;
                };
            };
        }>;
        Interaction: {
            evaluateInteractionItems: (t: any, e: any, i: any, s: any, n: any) => void;
            modes: {
                index(t: any, e: any, i: any, s: any): any[];
                dataset(t: any, e: any, i: any, s: any): any[];
                point: (t: any, e: any, i: any, s: any) => any[];
                nearest(t: any, e: any, i: any, s: any): any[];
                x: (t: any, e: any, i: any, s: any) => any[];
                y: (t: any, e: any, i: any, s: any) => any[];
            };
        };
        layouts: {
            addBox(t: any, e: any): void;
            removeBox(t: any, e: any): void;
            configure(t: any, e: any, i: any): void;
            update(t: any, e: any, i: any, s: any): void;
        };
        platforms: Readonly<{
            __proto__: any;
            _detectPlatform: (t: any) => {
                new (): {
                    acquireContext(t: any): any;
                    updateConfig(t: any): void;
                    releaseContext(t: any): boolean;
                    addEventListener(t: any, e: any, i: any): void;
                    removeEventListener(t: any, e: any, i: any): void;
                    getDevicePixelRatio(): number;
                    getMaximumSize(t: any, e: any, i: any, s: any): {
                        width: any;
                        height: number;
                    };
                    isAttached(t: any): boolean;
                };
            } | {
                new (): {
                    acquireContext(t: any, e: any): any;
                    releaseContext(t: any): boolean;
                    addEventListener(t: any, e: any, i: any): void;
                    removeEventListener(t: any, e: any): void;
                    getDevicePixelRatio(): number;
                    getMaximumSize(t: any, e: any, i: any, s: any): {
                        width: any;
                        height: any;
                    };
                    isAttached(t: any): boolean;
                    updateConfig(t: any): void;
                };
            };
            BasePlatform: {
                new (): {
                    acquireContext(t: any, e: any): void;
                    releaseContext(t: any): boolean;
                    addEventListener(t: any, e: any, i: any): void;
                    removeEventListener(t: any, e: any, i: any): void;
                    getDevicePixelRatio(): number;
                    getMaximumSize(t: any, e: any, i: any, s: any): {
                        width: any;
                        height: number;
                    };
                    isAttached(t: any): boolean;
                    updateConfig(t: any): void;
                };
            };
            BasicPlatform: {
                new (): {
                    acquireContext(t: any): any;
                    updateConfig(t: any): void;
                    releaseContext(t: any): boolean;
                    addEventListener(t: any, e: any, i: any): void;
                    removeEventListener(t: any, e: any, i: any): void;
                    getDevicePixelRatio(): number;
                    getMaximumSize(t: any, e: any, i: any, s: any): {
                        width: any;
                        height: number;
                    };
                    isAttached(t: any): boolean;
                };
            };
            DomPlatform: {
                new (): {
                    acquireContext(t: any, e: any): any;
                    releaseContext(t: any): boolean;
                    addEventListener(t: any, e: any, i: any): void;
                    removeEventListener(t: any, e: any): void;
                    getDevicePixelRatio(): number;
                    getMaximumSize(t: any, e: any, i: any, s: any): {
                        width: any;
                        height: any;
                    };
                    isAttached(t: any): boolean;
                    updateConfig(t: any): void;
                };
            };
        }>;
        Scale: {
            new (t: any): {
                id: any;
                type: any;
                ctx: any;
                chart: any;
                _margins: {
                    left: number;
                    right: number;
                    top: number;
                    bottom: number;
                };
                ticks: any[];
                _gridLineItems: {
                    tx1: number;
                    ty1: number;
                    tx2: any;
                    ty2: any;
                    x1: any;
                    y1: any;
                    x2: any;
                    y2: any;
                    width: any;
                    color: any;
                    borderDash: any;
                    borderDashOffset: any;
                    tickWidth: any;
                    tickColor: any;
                    tickBorderDash: any;
                    tickBorderDashOffset: any;
                }[];
                _labelItems: {
                    label: any;
                    font: {
                        family: any;
                        lineHeight: any;
                        size: any;
                        style: any;
                        weight: any;
                        string: string;
                    };
                    textOffset: any;
                    options: {
                        rotation: number;
                        color: any;
                        strokeColor: any;
                        strokeWidth: any;
                        textAlign: string;
                        textBaseline: string;
                        translation: any[];
                        backdrop: {
                            left: number;
                            top: number;
                            width: any;
                            height: any;
                            color: any;
                        };
                    };
                }[];
                _labelSizes: any;
                _length: number;
                _maxLength: number;
                _longestTextCache: {};
                _reversePixels: boolean;
                _ticksLength: number;
                _borderValue: number;
                _cache: {};
                _dataLimitsCached: boolean;
                init(t: any): void;
                options: any;
                axis: any;
                _userMin: any;
                _userMax: any;
                _suggestedMin: any;
                _suggestedMax: any;
                parse(t: any, e: any): any;
                getUserBounds(): {
                    min: any;
                    max: any;
                    minDefined: boolean;
                    maxDefined: boolean;
                };
                getMinMax(t: any): {
                    min: any;
                    max: any;
                };
                getPadding(): {
                    left: number;
                    top: any;
                    right: number;
                    bottom: any;
                };
                getTicks(): any[];
                getLabels(): any;
                getLabelItems(t?: any): {
                    label: any;
                    font: {
                        family: any;
                        lineHeight: any;
                        size: any;
                        style: any;
                        weight: any;
                        string: string;
                    };
                    textOffset: any;
                    options: {
                        rotation: number;
                        color: any;
                        strokeColor: any;
                        strokeWidth: any;
                        textAlign: string;
                        textBaseline: string;
                        translation: any[];
                        backdrop: {
                            left: number;
                            top: number;
                            width: any;
                            height: any;
                            color: any;
                        };
                    };
                }[];
                beforeLayout(): void;
                beforeUpdate(): void;
                update(t: any, e: any, i: any): void;
                maxWidth: any;
                maxHeight: any;
                _range: {
                    min: any;
                    max: any;
                };
                configure(): void;
                _startPixel: number;
                _endPixel: any;
                _alignToPixels: any;
                afterUpdate(): void;
                beforeSetDimensions(): void;
                setDimensions(): void;
                width: any;
                left: number;
                right: any;
                height: any;
                top: number;
                bottom: any;
                paddingLeft: number;
                paddingTop: any;
                paddingRight: number;
                paddingBottom: any;
                afterSetDimensions(): void;
                _callHooks(t: any): void;
                beforeDataLimits(): void;
                determineDataLimits(): void;
                afterDataLimits(): void;
                beforeBuildTicks(): void;
                buildTicks(): any[];
                afterBuildTicks(): void;
                beforeTickToLabelConversion(): void;
                generateTickLabels(t: any): void;
                afterTickToLabelConversion(): void;
                beforeCalculateLabelRotation(): void;
                calculateLabelRotation(): any;
                labelRotation: any;
                afterCalculateLabelRotation(): void;
                afterAutoSkip(): void;
                beforeFit(): void;
                fit(): void;
                _calculatePadding(t: any, e: any, i: any, s: any): void;
                _handleMargins(): void;
                afterFit(): void;
                isHorizontal(): boolean;
                isFullSize(): any;
                _convertTicksToLabels(t: any): void;
                _getLabelSizes(): any;
                _computeLabelSizes(t: any, e: any): {
                    first: {
                        width: any;
                        height: any;
                    };
                    last: {
                        width: any;
                        height: any;
                    };
                    widest: {
                        width: any;
                        height: any;
                    };
                    highest: {
                        width: any;
                        height: any;
                    };
                    widths: any[];
                    heights: any[];
                };
                getLabelForValue(t: any): any;
                getPixelForValue(t: any, e: any): number;
                getValueForPixel(t: any): void;
                getPixelForTick(t: any): number;
                getPixelForDecimal(t: any): number;
                getDecimalForPixel(t: any): number;
                getBasePixel(): number;
                getBaseValue(): any;
                getContext(t: any): any;
                $context: any;
                _tickSize(): number;
                _isVisible(): boolean;
                _computeGridLineItems(t: any): {
                    tx1: number;
                    ty1: number;
                    tx2: any;
                    ty2: any;
                    x1: any;
                    y1: any;
                    x2: any;
                    y2: any;
                    width: any;
                    color: any;
                    borderDash: any;
                    borderDashOffset: any;
                    tickWidth: any;
                    tickColor: any;
                    tickBorderDash: any;
                    tickBorderDashOffset: any;
                }[];
                _computeLabelItems(t: any): {
                    label: any;
                    font: {
                        family: any;
                        lineHeight: any;
                        size: any;
                        style: any;
                        weight: any;
                        string: string;
                    };
                    textOffset: any;
                    options: {
                        rotation: number;
                        color: any;
                        strokeColor: any;
                        strokeWidth: any;
                        textAlign: string;
                        textBaseline: string;
                        translation: any[];
                        backdrop: {
                            left: number;
                            top: number;
                            width: any;
                            height: any;
                            color: any;
                        };
                    };
                }[];
                _getXAxisLabelAlignment(): string;
                _getYAxisLabelAlignment(t: any): {
                    textAlign: string;
                    x: any;
                };
                _computeLabelArea(): {
                    top: number;
                    left: number;
                    bottom: any;
                    right: any;
                };
                drawBackground(): void;
                getLineWidthForValue(t: any): any;
                drawGrid(t: any): void;
                drawBorder(): void;
                drawLabels(t: any): void;
                drawTitle(): void;
                draw(t: any): void;
                _layers(): {
                    z: any;
                    draw: (t: any) => void;
                }[];
                getMatchingVisibleMetas(t: any): any[];
                _resolveTickFontOptions(t: any): {
                    family: any;
                    lineHeight: any;
                    size: any;
                    style: any;
                    weight: any;
                    string: string;
                };
                _maxDigits(): number;
                active: boolean;
                tooltipPosition(t: any): {
                    x: any;
                    y: any;
                };
                hasValue(): boolean;
                getProps(t: any, e: any): {};
            };
            defaults: {};
            defaultRoutes: any;
        };
        Ticks: {
            formatters: {
                values: (t: any) => any;
                numeric(t: any, e: any, i: any): any;
                logarithmic(t: any, e: any, i: any): any;
            };
        };
        Chart: any;
    };
};
export = _exports;
//# sourceMappingURL=chart.d.ts.map