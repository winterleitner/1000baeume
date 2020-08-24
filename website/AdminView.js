var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect;


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var TreeList = function TreeList(props) {
    var _useState = useState(true),
        _useState2 = _slicedToArray(_useState, 2),
        showForm = _useState2[0],
        setShowForm = _useState2[1];

    var _useState3 = useState({}),
        _useState4 = _slicedToArray(_useState3, 2),
        selectedTree = _useState4[0],
        setSelectedTree = _useState4[1];

    var _useState5 = useState([]),
        _useState6 = _slicedToArray(_useState5, 2),
        sponsors = _useState6[0],
        setSponsors = _useState6[1];

    return React.createElement(
        "div",
        null,
        showForm ? React.createElement(TreeForm, { tree: selectedTree, modifyTree: setSelectedTree }) : React.createElement("div", null),
        React.createElement(
            "div",
            { className: "inline" },
            React.createElement(
                "strong",
                null,
                "Baumliste"
            ),
            React.createElement(
                "button",
                { onClick: function onClick() {
                        return setShowForm(true);
                    } },
                "Neu"
            )
        ),
        React.createElement(
            "table",
            null,
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        "ID"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Beschreibung"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Datum"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Standort"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Bilder"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Sponsoren"
                    )
                )
            ),
            React.createElement(
                "tbody",
                null,
                props.trees.map(function (t) {
                    return React.createElement(
                        "tr",
                        { onClick: function onClick() {
                                return setSelectedTree(t);
                            } },
                        React.createElement(
                            "td",
                            null,
                            t.id
                        ),
                        React.createElement(
                            "td",
                            null,
                            t.description
                        ),
                        React.createElement(
                            "td",
                            null,
                            t.date_planted
                        ),
                        React.createElement(
                            "td",
                            null,
                            t.location_name
                        ),
                        React.createElement(
                            "td",
                            null,
                            t.images.length
                        ),
                        React.createElement(
                            "td",
                            null,
                            t.sponsors.map(function (i) {
                                return React.createElement(
                                    "div",
                                    null,
                                    i.name,
                                    "(",
                                    i.contribution,
                                    ")"
                                );
                            })
                        )
                    );
                })
            )
        )
    );
};

var TreeForm = function TreeForm(props) {
    var isNew = Object.keys(props.tree).length === 0 && props.tree.constructor === Object;
    return React.createElement(
        "div",
        { className: "tree-form" },
        React.createElement(
            "h2",
            null,
            isNew ? "Neuen Baum erstellen." : "Baum bearbeiten."
        ),
        React.createElement(
            "form",
            null,
            React.createElement(
                "label",
                { htmlFor: "description" },
                "Beschreibung"
            ),
            React.createElement("br", null),
            React.createElement("textarea", { name: "description", rows: "5", cols: "60", defaultValue: props.tree.description }),
            React.createElement("br", null),
            React.createElement(
                "label",
                { htmlFor: "date_planted" },
                "Pflanzdatum"
            ),
            React.createElement("br", null),
            React.createElement("input", { type: "date", name: "date_planted", onFocus: function onFocus(e) {
                    console.log(e.target.value.length);
                    if (e.target.value.length == 0) e.target.value = new Date().getDate() + "." + new Date().getMonth() + "." + new Date().getFullYear();
                }, defaultValue: props.tree.date_planted }),
            React.createElement("br", null),
            React.createElement(
                "label",
                { htmlFor: "description" },
                "Location-Name"
            ),
            React.createElement("br", null),
            React.createElement("input", { type: "text", name: "location_name", defaultValue: props.tree.location_name }),
            React.createElement("br", null),
            React.createElement("input", { type: "submit" })
        ),
        !isNew ? React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Bilder"
            ),
            React.createElement(
                "div",
                { className: "images-list" },
                props.tree.images && props.tree.images.length > 0 ? props.tree.images.map(function (i) {
                    return React.createElement(
                        "div",
                        {
                            className: "images-list-item" },
                        React.createElement("img", { src: i, height: "180px" }),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            null,
                            "L\xF6schen"
                        )
                    );
                }) : React.createElement(React.Fragment, null)
            ),
            React.createElement("input", { type: "file", multiple: true }),
            React.createElement(
                "button",
                null,
                "Hochladen"
            ),
            React.createElement(
                "h3",
                null,
                "Sponsoren / Baumpaten"
            ),
            React.createElement(
                "ul",
                null,
                props.tree.sponsors && props.tree.sponsors.length > 0 ? props.tree.sponsors.map(function (i) {
                    return React.createElement(
                        "li",
                        null,
                        i.name,
                        " - ",
                        i.contribution
                    );
                }) : React.createElement(React.Fragment, null)
            ),
            React.createElement("input", { type: "text" }),
            React.createElement("input", { type: "text" }),
            React.createElement(
                "button",
                null,
                "Hinzuf\xFCgen"
            )
        ) : React.createElement(React.Fragment, null)
    );
};

TreeForm.defaultProps = {
    tree: {}
};

var domContainer = document.getElementById('admin_root');
ReactDOM.render(React.createElement(TreeList, { trees: trees }), domContainer);