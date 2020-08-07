var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _React = React,
    useState = _React.useState;


var TreeView = function TreeView(props) {
    return React.createElement(
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
        ),
        React.createElement(
            "div",
            { className: "trees-view" },
            props.trees.map(function (t) {
                return React.createElement(TreeContainer, { tree: t });
            })
        )
    );
};

var TreeContainer = function TreeContainer(props) {
    var tree = props.tree;

    return React.createElement(
        "div",
        { className: "tree-container" },
        React.createElement(TreeImages, { images: tree.bilder }),
        React.createElement(
            "h2",
            null,
            "Baum ",
            tree.id
        ),
        React.createElement(
            "h6",
            null,
            "Datum"
        ),
        React.createElement(
            "span",
            null,
            tree.datum
        ),
        React.createElement(
            "h6",
            null,
            "Standort"
        ),
        React.createElement(
            "span",
            null,
            tree.ort.name
        ),
        React.createElement(
            "h6",
            null,
            "Baumpaten"
        ),
        React.createElement(
            "span",
            null,
            tree.paten.map(function (p) {
                return p.name + "(" + p.beitrag + ")";
            }).join(", ")
        )
    );
};

var TreeImages = function TreeImages(props) {
    var _useState = useState(0),
        _useState2 = _slicedToArray(_useState, 2),
        selected = _useState2[0],
        setSelected = _useState2[1];

    if (props.images.length == 0) return React.createElement("img", { src: "/images/Logo_Steyr.png", className: "tree-imagebox" });else {
        window.setTimeout(function () {
            if (selected + 1 < props.images.length) setSelected(selected + 1);else setSelected(0);
        }, 5000);
        return React.createElement("img", { src: props.images[selected].src, alt: props.images[selected].alt, className: "tree-imagebox" });
    }
};

var domContainer = document.getElementById('trees_root');
ReactDOM.render(React.createElement(TreeView, { trees: trees }), domContainer);