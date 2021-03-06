var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect;


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var TreeView = function TreeView(props) {
    var _useState = useState(null),
        _useState2 = _slicedToArray(_useState, 2),
        modalImage = _useState2[0],
        setModalImage = _useState2[1];

    useEffect(function () {
        window.onclick = function (event) {
            if (event.target == document.getElementById("imageModal")) {
                setModalImage(null);
            }
        };
    });
    if (props.trees.length === 0) return React.createElement(React.Fragment, null);
    return React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            { className: "container" },
            React.createElement(
                "div",
                { className: "myheading" },
                React.createElement(
                    "h1",
                    null,
                    "Die bereits gepflanzten B\xE4ume"
                )
            )
        ),
        React.createElement(
            "div",
            { className: "trees-view" },
            props.trees.map(function (t) {
                return React.createElement(TreeContainer, { tree: t,
                    key: getRandomInt(1000000),
                    openImage: setModalImage });
            })
        ),
        React.createElement(ImageModal, { show: modalImage !== null, image: modalImage, close: function close() {
                return setModalImage(null);
            } })
    );
};

var ImageModal = function ImageModal(props) {
    useEffect(function () {
        if (props.show) {
            document.documentElement.style.overflow = 'hidden';
            document.body.scroll = "no";
        } else {
            document.documentElement.style.overflow = 'scroll';
            document.body.scroll = "yes";
        }
    }, [props]);
    return props.show ? React.createElement(
        "div",
        { className: "modal", id: "imageModal" },
        React.createElement(
            "div",
            { className: "modal-content" },
            React.createElement(
                "div",
                { className: "close", onClick: props.close },
                "x"
            ),
            React.createElement("img", { className: "modal-image", src: props.image, onClick: function onClick(e) {
                    return e.stopPropagation();
                } })
        )
    ) : React.createElement("div", null);
};

var TreeContainer = function TreeContainer(props) {
    var tree = props.tree;

    var _useState3 = useState(false),
        _useState4 = _slicedToArray(_useState3, 2),
        showEntireText = _useState4[0],
        setShowEntireText = _useState4[1];

    var descLengthLimit = tree.paten.length > 1 ? 150 : 200;

    useEffect(function () {
        if (showEntireText) {
            document.documentElement.style.overflow = 'hidden';
            document.body.scroll = "no";
        } else {
            document.documentElement.style.overflow = 'scroll';
            document.body.scroll = "yes";
        }
    }, [showEntireText]);

    var modal = showEntireText ? React.createElement(
        "div",
        { className: "modal", id: "descriptionModal" },
        React.createElement(
            "div",
            { className: "modal-content" },
            React.createElement(
                "div",
                { className: "close", onClick: function onClick() {
                        return setShowEntireText(false);
                    } },
                "x"
            ),
            React.createElement(
                "div",
                { className: "description-modal-container" },
                React.createElement(
                    "div",
                    null,
                    tree.beschreibung
                )
            )
        )
    ) : React.createElement("div", null);
    return React.createElement(
        "div",
        { className: "tree-container" },
        modal,
        React.createElement(
            "div",
            { className: "tree-container-top" },
            React.createElement(
                "div",
                { className: "tree-id" },
                React.createElement(
                    "div",
                    null,
                    tree.anzahl,
                    React.createElement("img", { src: "images/Baum_Logo.png", height: "20px", style: { marginLeft: "4px", marginBottom: "4px" } }),
                    " "
                )
            ),
            React.createElement(TreeImages, { images: tree.bilder, treeId: tree.id, scrollInterval: props.scrollInterval,
                openImage: props.openImage })
        ),
        React.createElement(
            "div",
            { className: "tree-container-bottom" },
            React.createElement(
                "div",
                { className: "tree-location" },
                React.createElement(
                    "strong",
                    null,
                    "Standort"
                ),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    null,
                    tree.ort.name
                )
            ),
            React.createElement(
                "div",
                { className: "tree-date" },
                React.createElement(
                    "strong",
                    null,
                    "Gepflanzt"
                ),
                React.createElement(
                    "div",
                    null,
                    tree.datum
                )
            ),
            React.createElement(
                "div",
                { className: "tree-description" },
                React.createElement(
                    "strong",
                    null,
                    "Infos"
                ),
                React.createElement("br", null),
                React.createElement(
                    "p",
                    { className: tree.paten.length > 1 ? "desc-100" : "desc-140" },
                    tree.beschreibung.length > descLengthLimit ? React.createElement(
                        "div",
                        { onClick: function onClick() {
                                return setShowEntireText(!showEntireText);
                            } },
                        showEntireText ? tree.beschreibung : React.createElement(
                            "div",
                            null,
                            tree.beschreibung.substr(0, descLengthLimit - 10),
                            "...",
                            React.createElement("br", null),
                            React.createElement(
                                "div",
                                { className: "show-more" },
                                "Mehr Anzeigen..."
                            )
                        )
                    ) : tree.beschreibung.length > 0 ? tree.beschreibung : "-"
                )
            ),
            tree.paten.length > 0 ? React.createElement(
                "div",
                { className: "tree-sponsors" },
                React.createElement(
                    "strong",
                    null,
                    tree.paten.length === 1 ? "Baumpate" : "Baumpaten"
                ),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    null,
                    tree.paten.map(function (p) {
                        return p.name;
                    } /*+ "(" + p.beitrag + ")"*/).join(", ")
                )
            ) : React.createElement(React.Fragment, null)
        )
    );
};

var TreeImages = function TreeImages(props) {
    var _useState5 = useState(0),
        _useState6 = _slicedToArray(_useState5, 2),
        selected = _useState6[0],
        setSelected = _useState6[1];

    var _useState7 = useState(0),
        _useState8 = _slicedToArray(_useState7, 2),
        intervalId = _useState8[0],
        setIntervalId = _useState8[1];

    useEffect(function () {
        window.clearTimeout(intervalId);
        if (props.scrollInterval > 0) {
            setIntervalId(window.setTimeout(function () {
                incrementSelected();
            }, props.scrollInterval));
        }
    }, [selected]);
    var incrementSelected = function incrementSelected() {
        if (selected + 1 < props.images.length) setSelected(selected + 1);else setSelected(0);
    };
    var decrementSelected = function decrementSelected() {
        if (selected - 1 >= 0) setSelected(selected - 1);else setSelected(props.images.length - 1);
    };
    if (props.images.length === 0) return React.createElement("div", { style: { backgroundImage: "url(/images/Logo_Rechteck.png)" },
        className: "tree-imagebox", onClick: function onClick() {
            return props.openImage("/images/Logo_Rechteck.png");
        } });else {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { style: { backgroundImage: "url(" + props.images[selected].src + ")" },
                    className: "tree-imagebox", onClick: function onClick() {
                        return props.openImage(props.images[selected].src);
                    } },
                React.createElement(
                    "div",
                    { className: "dots-container" },
                    props.images.map(function (i, index) {
                        return React.createElement("div", {
                            key: props.treeId + "-" + index,
                            className: "slider-dot " + (i === props.images[selected] ? "selected" : ""),
                            onClick: function onClick(e) {
                                e.stopPropagation();
                                setSelected(index);
                            } });
                    })
                ),
                props.images.length > 1 ? React.createElement(
                    "div",
                    { className: "arrows-container" },
                    React.createElement(
                        "div",
                        { className: "arrow arrow-left", onClick: function onClick(e) {
                                e.stopPropagation();
                                decrementSelected();
                            } },
                        React.createElement(
                            "svg",
                            { width: "100%", height: "100%", viewBox: "0 0 320 512" },
                            React.createElement("path", { fill: "currentColor",
                                d: "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z",
                                className: "" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "arrow arrow-right", onClick: function onClick(e) {
                                e.stopPropagation();
                                incrementSelected();
                            } },
                        React.createElement(
                            "svg",
                            { width: "100%", height: "100%", viewBox: "0 0 320 512" },
                            React.createElement("path", { fill: "currentColor",
                                d: "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",
                                className: "" })
                        )
                    )
                ) : React.createElement(React.Fragment, null)
            )
        );
    }
};

var domContainer = document.getElementById('trees_root');
ReactDOM.render(React.createElement(TreeView, { trees: trees, scrollInterval: scrollInterval }), domContainer);