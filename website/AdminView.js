var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect,
    useRef = _React.useRef;


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var nTree = { sponsors: [], images: [] };

var TreeList = function TreeList(props) {
    var _useState = useState(nTree),
        _useState2 = _slicedToArray(_useState, 2),
        selectedTree = _useState2[0],
        setSelectedTree = _useState2[1];

    return React.createElement(
        "div",
        null,
        React.createElement(NewTreeForm, { tree: nTree }),
        React.createElement(EditTreeForm, { tree: selectedTree, modifyTree: setSelectedTree }),
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
                { className: "btn btn-sm btn-outline-primary", type: "button", "data-toggle": "modal",
                    "data-target": "#modal-new" },
                "Neu"
            )
        ),
        React.createElement(
            "table",
            { className: "table table-responsive-sm table-striped" },
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
                            }, "data-toggle": "modal", "data-target": "#modal-edit" },
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

var NewTreeForm = function NewTreeForm(props) {
    return React.createElement(
        "div",
        { className: "modal fade", id: "modal-new", tabIndex: "-1", role: "dialog", "aria-labelledby": "myModalLabel",
            "aria-hidden": "true" },
        React.createElement(
            "div",
            { className: "modal-dialog modal-primary", role: "document" },
            React.createElement(
                "div",
                { className: "modal-content" },
                React.createElement(
                    "div",
                    { className: "modal-header" },
                    React.createElement(
                        "h4",
                        { className: "modal-title" },
                        "Neuen Baum anlegen"
                    ),
                    React.createElement(
                        "button",
                        { className: "close", type: "button", "data-dismiss": "modal", "aria-label": "Close" },
                        React.createElement(
                            "span",
                            { "aria-hidden": "true" },
                            "\xD7"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "modal-body" },
                    React.createElement(TreeForm, Object.assign({}, props, { isNew: true }))
                )
            )
        )
    );
};

var EditTreeForm = function EditTreeForm(props) {
    return React.createElement(
        "div",
        { className: "modal fade", id: "modal-edit", tabIndex: "-1", role: "dialog", "aria-labelledby": "myModalLabel",
            "aria-hidden": "true" },
        React.createElement(
            "div",
            { className: "modal-dialog modal-primary", role: "document" },
            React.createElement(
                "div",
                { className: "modal-content" },
                React.createElement(
                    "div",
                    { className: "modal-header" },
                    React.createElement(
                        "h4",
                        { className: "modal-title" },
                        "Baum bearbeiten"
                    ),
                    React.createElement(
                        "button",
                        { className: "close", type: "button", "data-dismiss": "modal", "aria-label": "Close" },
                        React.createElement(
                            "span",
                            { "aria-hidden": "true" },
                            "\xD7"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "modal-body" },
                    React.createElement(TreeForm, Object.assign({}, props, { isNew: false }))
                )
            )
        )
    );
};

var TreeForm = function TreeForm(props) {
    var _useState3 = useState(-1),
        _useState4 = _slicedToArray(_useState3, 2),
        id = _useState4[0],
        setId = _useState4[1];

    var _useState5 = useState(""),
        _useState6 = _slicedToArray(_useState5, 2),
        description = _useState6[0],
        setDescription = _useState6[1];

    var _useState7 = useState(new Date().getDate() + "." + new Date().getMonth() + "." + new Date().getFullYear()),
        _useState8 = _slicedToArray(_useState7, 2),
        date_planted = _useState8[0],
        setDatePlanted = _useState8[1];

    var _useState9 = useState(""),
        _useState10 = _slicedToArray(_useState9, 2),
        location_name = _useState10[0],
        setLocationName = _useState10[1];

    var _useState11 = useState([]),
        _useState12 = _slicedToArray(_useState11, 2),
        sponsors = _useState12[0],
        setSponsors = _useState12[1];

    var _useState13 = useState([]),
        _useState14 = _slicedToArray(_useState13, 2),
        images = _useState14[0],
        setImages = _useState14[1];

    var isNew = props.isNew;

    useEffect(function () {
        setSponsors(props.tree.sponsors);
        setImages(props.tree.images);
        setDescription(props.tree.description);
        setDatePlanted(props.tree.date_planted);
        setLocationName(props.tree.location_name);
        setId(props.tree.id);
    }, [props.tree]);
    var save = function save() {
        var url = isNew ? "create.php" : "edit.php";
        fetch("/admin/" + url, {
            method: "POST",
            body: JSON.stringify({ id: id, description: description, date_planted: date_planted, location_name: location_name, sponsors: sponsors, images: images, x: 22.22, y: 33.33 })
        }).then(function (res) {
            return res.ok ? window.location.reload() : alert("Das Speichern ist leider fehlgeschlagen.");
        });
    };
    return React.createElement(
        "div",
        { className: "tree-form" },
        React.createElement(
            "h2",
            null,
            isNew ? "Neuen Baum erstellen." : "Baum bearbeiten."
        ),
        React.createElement(
            "div",
            null,
            React.createElement(
                "label",
                { htmlFor: "description" },
                "Beschreibung"
            ),
            React.createElement("br", null),
            React.createElement("textarea", { name: "description", rows: "5", cols: "50", defaultValue: props.tree.description, onChange: function onChange(e) {
                    return setDescription(e.target.value);
                } }),
            React.createElement("br", null),
            React.createElement(
                "label",
                { htmlFor: "date_planted" },
                "Pflanzdatum"
            ),
            React.createElement("br", null),
            React.createElement("input", { type: "date", name: "date_planted",
                onFocus: function onFocus(e) {
                    return e.target.value.length == 0 ? e.target.value = new Date().getDate() + "." + new Date().getMonth() + "." + new Date().getFullYear() : "";
                },
                defaultValue: props.tree.date_planted,
                onChange: function onChange(e) {
                    return setDatePlanted(e.target.value);
                } }),
            React.createElement("br", null),
            React.createElement(
                "label",
                { htmlFor: "description" },
                "Standort-Name"
            ),
            React.createElement("br", null),
            React.createElement("input", { type: "text", name: "location_name", defaultValue: props.tree.location_name, onChange: function onChange(e) {
                    return setLocationName(e.target.value);
                } }),
            React.createElement("br", null),
            React.createElement("hr", null),
            React.createElement(SponsorsForm, { sponsors: sponsors, change: setSponsors }),
            React.createElement("hr", null),
            React.createElement(ImageUpload, { images: images, change: setImages, treeId: props.tree.id }),
            React.createElement("hr", null),
            React.createElement(
                "button",
                { className: "btn btn-sm btn-primary", onClick: save },
                "Speichern"
            )
        )
    );
};

var SponsorsForm = function SponsorsForm(props) {
    var _useState15 = useState(""),
        _useState16 = _slicedToArray(_useState15, 2),
        nSponsorName = _useState16[0],
        setNSponsorName = _useState16[1];

    var _useState17 = useState(""),
        _useState18 = _slicedToArray(_useState17, 2),
        nSponsorContr = _useState18[0],
        setNSponsorContr = _useState18[1];

    var addSponsor = function addSponsor(e) {
        e.preventDefault();
        props.change([].concat(_toConsumableArray(props.sponsors), [{ name: nSponsorName, contribution: nSponsorContr, id: -1 }]));
        setNSponsorName("");
        setNSponsorContr("");
    };
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h4",
            null,
            "Sponsoren"
        ),
        React.createElement(
            "ul",
            null,
            props.sponsors.map(function (s) {
                return React.createElement(
                    "li",
                    { className: "sponsor-item" },
                    s.name,
                    " - ",
                    s.contribution,
                    "\xA0",
                    React.createElement("i", { className: "fa fa-trash", style: { color: "red" }, "aria-hidden": "true",
                        onClick: function onClick() {
                            return props.change(props.sponsors.filter(function (x) {
                                return x !== s;
                            }));
                        } })
                );
            })
        ),
        React.createElement(
            "table",
            null,
            React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Name"
                    )
                ),
                React.createElement(
                    "th",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Beitrag"
                    )
                )
            ),
            React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    React.createElement("input", { type: "text", value: nSponsorName, onChange: function onChange(e) {
                            return setNSponsorName(e.target.value);
                        } })
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement("input", { type: "text", value: nSponsorContr, onChange: function onChange(e) {
                            return setNSponsorContr(e.target.value);
                        } })
                )
            )
        ),
        React.createElement(
            "button",
            { className: "btn btn-sm btn-outline-primary mt-1", onClick: addSponsor },
            "Hinzuf\xFCgen"
        )
    );
};

var ImageUpload = function ImageUpload(props) {
    var _useState19 = useState([]),
        _useState20 = _slicedToArray(_useState19, 2),
        selected = _useState20[0],
        setSelected = _useState20[1];

    var imageInput = useRef(null);
    var upload = function upload(e) {
        e.preventDefault();
        selected.forEach(function (datei) {

            // Ein Objekt um Dateien einzulesen
            var reader = new FileReader();

            var senddata = new Object();
            // Auslesen der Datei-Metadaten
            senddata.name = datei.name;
            senddata.date = datei.lastModified;
            senddata.size = datei.size;
            senddata.type = datei.type;

            // Wenn der Dateiinhalt ausgelesen wurde...
            reader.onload = function (theFileData) {
                senddata.fileData = theFileData.target.result; // Ergebnis vom FileReader auslesen
                var fd = new FormData();
                fd.append("tree", props.treeId);
                fd.append("image", datei);
                //Upload
                fetch("/admin/upload_image.php", {
                    method: "POST",
                    body: fd
                }).then(function (res) {
                    if (res.ok) props.change([].concat(_toConsumableArray(props.images), [res]));
                });
            };

            // Die Datei einlesen und in eine Data-URL konvertieren
            reader.readAsDataURL(datei);
        });
    };
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h4",
            null,
            "Bilder"
        ),
        React.createElement(
            "div",
            { className: "images-list" },
            props.images.length > 0 ? props.images.map(function (i) {
                return React.createElement(
                    "div",
                    {
                        className: "images-list-item mb-3" },
                    React.createElement("img", { src: i.image, height: "180px" }),
                    React.createElement("br", null),
                    React.createElement(
                        "span",
                        null,
                        i.text
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "button",
                        { className: "btn btn-sm btn-outline-danger mt-1", onClick: function onClick() {
                                return props.change(props.images.filter(function (x) {
                                    return x !== i;
                                }));
                            } },
                        "L\xF6schen"
                    )
                );
            }) : React.createElement(React.Fragment, null)
        ),
        React.createElement("input", { type: "file", multiple: true, ref: imageInput,
            onChange: function onChange(e) {
                return Promise.all([].concat(_toConsumableArray(e.target.files))).then(function (res) {
                    return setSelected(res);
                });
            } }),
        selected.length > 0 ? React.createElement(
            "div",
            null,
            "Hochzuladende Fotos:",
            React.createElement(
                "ul",
                null,
                selected.map(function (f) {
                    return React.createElement(
                        "li",
                        null,
                        f.name
                    );
                })
            )
        ) : React.createElement(React.Fragment, null),
        React.createElement(
            "button",
            { className: "btn btn-sm btn-outline-primary", onClick: upload },
            "Hochladen"
        )
    );
};

SponsorsForm.defaultProos = {
    sponsors: []
};

TreeForm.defaultProps = {
    tree: { sponsors: [], images: [] }
};

var domContainer = document.getElementById('admin_root');
ReactDOM.render(React.createElement(TreeList, { trees: trees }), domContainer);