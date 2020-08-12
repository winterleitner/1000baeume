var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect;


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var TreeView = function TreeView(props) {
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
                return React.createElement(TreeContainer, { tree: t, key: getRandomInt(1000000) });
            })
        )
    );
};

var TreeContainer = function TreeContainer(props) {
    var tree = props.tree;

    return React.createElement(
        "div",
        { className: "tree-container" },
        React.createElement(
            "div",
            { className: "tree-container-top" },
            React.createElement(
                "div",
                { className: "tree-id" },
                React.createElement(
                    "div",
                    null,
                    tree.id
                )
            ),
            React.createElement(TreeImages, { images: tree.bilder, treeId: tree.id })
        ),
        React.createElement(
            "div",
            { className: "tree-container-bottom" },
            React.createElement(
                "div",
                { className: "tree-date" },
                React.createElement(
                    "strong",
                    null,
                    "Gepflanzt"
                ),
                React.createElement("br", null),
                React.createElement(
                    "span",
                    null,
                    tree.datum
                )
            ),
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
                    "span",
                    null,
                    tree.ort.name
                )
            ),
            React.createElement(
                "div",
                { className: "tree-description" },
                React.createElement(
                    "p",
                    null,
                    tree.beschreibung.length > 180 ? tree.beschreibung.substr(0, 165) + "..." : tree.beschreibung
                )
            ),
            React.createElement(
                "div",
                { className: "tree-sponsors" },
                React.createElement(
                    "strong",
                    null,
                    tree.paten.length === 1 ? "Baumpate" : "Baumpaten"
                ),
                React.createElement("br", null),
                React.createElement(
                    "span",
                    null,
                    tree.paten.map(function (p) {
                        return p.name;
                    } /*+ "(" + p.beitrag + ")"*/).join(", ")
                )
            )
        )
    );
};

var TreeImages = function TreeImages(props) {
    var _useState = useState(0),
        _useState2 = _slicedToArray(_useState, 2),
        selected = _useState2[0],
        setSelected = _useState2[1];

    var _useState3 = useState(0),
        _useState4 = _slicedToArray(_useState3, 2),
        intervalId = _useState4[0],
        setIntervalId = _useState4[1];

    useEffect(function () {
        window.clearTimeout(intervalId);
        setIntervalId(window.setTimeout(function () {
            if (selected + 1 < props.images.length) setSelected(selected + 1);else setSelected(0);
        }, 5000));
    }, [selected]);
    if (props.images.length == 0) return React.createElement("div", { style: { backgroundImage: "url(/images/Logo_Steyr.png)" },
        className: "tree-imagebox" });else {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { style: { backgroundImage: "url(" + props.images[selected].src + ")" }, src: props.images[selected].src,
                    alt: props.images[selected].alt, className: "tree-imagebox" },
                React.createElement(
                    "div",
                    { className: "dots-container" },
                    props.images.map(function (i, index) {
                        return React.createElement("div", { key: props.treeId + "-" + index,
                            className: "slider-dot " + (i == props.images[selected] ? "selected" : ""),
                            onClick: function onClick() {
                                return setSelected(index);
                            } });
                    })
                )
            )
        );
    }
};

var domContainer = document.getElementById('trees_root');
ReactDOM.render(React.createElement(TreeView, { trees: trees }), domContainer);