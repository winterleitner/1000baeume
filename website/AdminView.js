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

    var setHighlight = function setHighlight(id) {
        console.log("here");
        var fd = new FormData();
        fd.append("id", id);
        fetch("/admin/set_highlight.php", {
            method: "POST",
            body: fd
        }).then(function (res) {
            if (res.ok) {
                window.location.reload();
            }
        });
    };
    return React.createElement(
        "div",
        null,
        React.createElement(NewTreeForm, null),
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
                { className: "btn btn-sm btn-outline-primary ml-2", type: "button", "data-toggle": "modal",
                    "data-target": "#modal-new" },
                "Neu"
            )
        ),
        React.createElement(
            "table",
            { className: "table table-responsive-sm table-striped mt-1" },
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement("th", null),
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
                props.trees.sort(function (a, b) {
                    return a.id < b.id;
                }).map(function (t) {
                    return React.createElement(
                        "tr",
                        { className: "tree-list-tr" },
                        React.createElement(
                            "td",
                            { onClick: function onClick() {
                                    setHighlight(t.id);
                                } },
                            t.id == highlight ? React.createElement("span", { className: "fa fa-star checked highlight-star" }) : React.createElement("span", { className: "fa fa-star highlight-star" })
                        ),
                        React.createElement(
                            "td",
                            { onClick: function onClick() {
                                    return setSelectedTree(t);
                                }, "data-toggle": "modal",
                                "data-target": "#modal-edit" },
                            t.id
                        ),
                        React.createElement(
                            "td",
                            { onClick: function onClick() {
                                    return setSelectedTree(t);
                                }, "data-toggle": "modal",
                                "data-target": "#modal-edit" },
                            t.description
                        ),
                        React.createElement(
                            "td",
                            { onClick: function onClick() {
                                    return setSelectedTree(t);
                                }, "data-toggle": "modal",
                                "data-target": "#modal-edit" },
                            t.date_planted
                        ),
                        React.createElement(
                            "td",
                            { onClick: function onClick() {
                                    return setSelectedTree(t);
                                }, "data-toggle": "modal",
                                "data-target": "#modal-edit" },
                            t.location_name
                        ),
                        React.createElement(
                            "td",
                            { onClick: function onClick() {
                                    return setSelectedTree(t);
                                }, "data-toggle": "modal",
                                "data-target": "#modal-edit" },
                            t.images.length
                        ),
                        React.createElement(
                            "td",
                            { onClick: function onClick() {
                                    return setSelectedTree(t);
                                }, "data-toggle": "modal",
                                "data-target": "#modal-edit" },
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
                        "Baum ",
                        props.tree.id,
                        " bearbeiten"
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

    var _useState11 = useState(0.0),
        _useState12 = _slicedToArray(_useState11, 2),
        x = _useState12[0],
        setX = _useState12[1];

    var _useState13 = useState(0.0),
        _useState14 = _slicedToArray(_useState13, 2),
        y = _useState14[0],
        setY = _useState14[1];

    var _useState15 = useState([]),
        _useState16 = _slicedToArray(_useState15, 2),
        sponsors = _useState16[0],
        setSponsors = _useState16[1];

    var _useState17 = useState([]),
        _useState18 = _slicedToArray(_useState17, 2),
        images = _useState18[0],
        setImages = _useState18[1];

    var isNew = props.isNew;

    useEffect(function () {
        if (typeof props.tree != "undefined" && props.tree != null) {
            if (typeof props.tree.sponsors != "undefined") setSponsors(props.tree.sponsors);
            if (typeof props.tree.images != "undefined") setImages(props.tree.images);
            if (typeof props.tree.description != "undefined") setDescription(props.tree.description);
            if (typeof props.tree.date_planted != "undefined") setDatePlanted(props.tree.date_planted);
            if (typeof props.tree.location_name != "undefined") setLocationName(props.tree.location_name);
            if (typeof props.tree.id != "undefined") setId(props.tree.id);
            if (typeof props.tree.x != "undefined") setX(props.tree.x);
            if (typeof props.tree.y != "undefined") setY(props.tree.y);
        }
    }, [props]);
    var save = function save() {
        var url = isNew ? "create.php" : "edit.php";
        fetch("/admin/" + url, {
            method: "POST",
            body: JSON.stringify({
                id: id,
                description: description,
                date_planted: date_planted,
                location_name: location_name,
                sponsors: sponsors,
                images: images.map(function (i) {
                    return { id: i.id, text: "" };
                }),
                x: x,
                y: y
            })
        }).then(function (res) {
            return res.ok ? window.location.reload() : alert("Das Speichern ist leider fehlgeschlagen.");
        });
    };
    return React.createElement(
        "div",
        { className: "tree-form" },
        React.createElement(
            "div",
            null,
            React.createElement(
                "label",
                { htmlFor: "description" },
                "Beschreibung"
            ),
            React.createElement("br", null),
            React.createElement("textarea", { className: "form-control", name: "description", rows: "5", cols: "50", defaultValue: description,
                onChange: function onChange(e) {
                    return setDescription(e.target.value);
                } }),
            React.createElement("br", null),
            React.createElement(
                "label",
                { htmlFor: "date_planted" },
                "Pflanzdatum"
            ),
            React.createElement("br", null),
            React.createElement("input", { className: "form-control", type: "date", name: "date_planted",
                value: date_planted,
                onChange: function onChange(e) {
                    return setDatePlanted(e.target.value);
                } }),
            React.createElement("br", null),
            React.createElement(
                "h4",
                null,
                "Standort"
            ),
            React.createElement(
                "label",
                { htmlFor: "description" },
                "Standort-Name"
            ),
            React.createElement("br", null),
            React.createElement("input", { className: "form-control", type: "text", name: "location_name", defaultValue: location_name,
                onChange: function onChange(e) {
                    return setLocationName(e.target.value);
                } }),
            React.createElement("br", null),
            React.createElement(CoordinatesForm, { x: x, y: y, setX: setX, setY: setY }),
            React.createElement("hr", null),
            React.createElement(SponsorsForm, { sponsors: sponsors, change: setSponsors }),
            React.createElement("hr", null),
            React.createElement(ImageUpload, { images: images, change: setImages, treeId: id }),
            React.createElement("hr", null),
            React.createElement(
                "button",
                { className: "btn btn-primary", onClick: save },
                "Speichern"
            )
        )
    );
};

var CoordinatesForm = function CoordinatesForm(props) {
    var _useState19 = useState(""),
        _useState20 = _slicedToArray(_useState19, 2),
        query = _useState20[0],
        setQuery = _useState20[1];

    var _useState21 = useState([]),
        _useState22 = _slicedToArray(_useState21, 2),
        results = _useState22[0],
        setResults = _useState22[1];

    var search = function search() {
        fetch("https://nominatim.openstreetmap.org/search?format=json&q=" + encodeURI(query)).then(function (res) {
            return res.json();
        }).then(function (res) {
            return setResults(res);
        });
    };
    return React.createElement(
        "div",
        null,
        React.createElement(
            "label",
            null,
            "Standort-Koordinaten"
        ),
        React.createElement("br", null),
        React.createElement("input", { className: "form-control", type: "text", onChange: function onChange(e) {
                return setQuery(e.target.value);
            }, value: query,
            placeholder: "Suchbegriff..." }),
        React.createElement(
            "button",
            { onClick: search, className: "btn btn-sm btn-outline-primary mt-1" },
            "Suchen"
        ),
        results.length > 0 ? React.createElement(
            "div",
            null,
            React.createElement(
                "strong",
                null,
                "Ergebnisse"
            ),
            React.createElement(
                "ul",
                { className: "location-resultlist" },
                results.map(function (r) {
                    return React.createElement(
                        "li",
                        { className: "location-result" },
                        React.createElement("i", { className: "fa fa-search mr-2", onClick: function onClick() {
                                var url = "https://www.openstreetmap.org/?mlat=" + r.lat + "&mlon=" + r.lon + "#map=19/" + r.lat + "/" + r.lon;
                                console.log("Open", url);
                                window.open(url);
                            } }),
                        React.createElement(
                            "span",
                            { onClick: function onClick() {
                                    props.setX(r.lat);
                                    props.setY(r.lon);
                                } },
                            r.display_name
                        )
                    );
                })
            )
        ) : React.createElement(React.Fragment, null),
        React.createElement(
            "table",
            { style: { width: "100%" } },
            React.createElement(
                "thead",
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
                            "Lat"
                        )
                    ),
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "label",
                            null,
                            "Long"
                        )
                    ),
                    React.createElement("th", null)
                )
            ),
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        React.createElement("input", { className: "form-control", type: "text", value: props.x,
                            onChange: function onChange(e) {
                                return props.setX(e.target.value);
                            } })
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement("input", { className: "form-control", type: "text", value: props.y,
                            onChange: function onChange(e) {
                                return props.setY(e.target.value);
                            } })
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "button",
                            { className: "btn btn-primary" },
                            React.createElement("i", { className: "fa fa-search", onClick: function onClick() {
                                    var url = "https://www.openstreetmap.org/?mlat=" + props.x + "&mlon=" + props.y + "#map=19/" + props.x + "/" + props.y;
                                    console.log("Open", url);
                                    window.open(url);
                                } })
                        )
                    )
                )
            )
        )
    );
};

var SponsorsForm = function SponsorsForm(props) {
    var _useState23 = useState(""),
        _useState24 = _slicedToArray(_useState23, 2),
        nSponsorName = _useState24[0],
        setNSponsorName = _useState24[1];

    var _useState25 = useState(""),
        _useState26 = _slicedToArray(_useState25, 2),
        nSponsorContr = _useState26[0],
        setNSponsorContr = _useState26[1];

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
            { style: { width: "100%" } },
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
                    React.createElement("input", { className: "form-control", type: "text", value: nSponsorName,
                        onChange: function onChange(e) {
                            return setNSponsorName(e.target.value);
                        } })
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement("input", { className: "form-control", type: "text", value: nSponsorContr,
                        onChange: function onChange(e) {
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
    var _useState27 = useState([]),
        _useState28 = _slicedToArray(_useState27, 2),
        selected = _useState28[0],
        setSelected = _useState28[1];

    var _useState29 = useState(false),
        _useState30 = _slicedToArray(_useState29, 2),
        loading = _useState30[0],
        setLoading = _useState30[1];

    var imageInput = useRef(null);
    var upload = function upload(e) {
        e.preventDefault();
        setLoading(true);
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
                    if (res.ok) {
                        res.text().then(function (t) {
                            return props.change([].concat(_toConsumableArray(props.images), [{ id: t, image: senddata.fileData }]));
                        }).then(function () {
                            return setLoading(false);
                        });
                    }
                });
            };

            // Die Datei einlesen und in eine Data-URL konvertieren
            reader.readAsDataURL(datei);
        });
        setSelected([]);
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
            props.images.length > 0 ? props.images.sort(function (a, b) {
                return a.id < b.id;
            }).map(function (i) {
                return React.createElement(
                    "div",
                    {
                        className: "images-list-item mb-3" },
                    React.createElement("img", { src: i.image.startsWith("uploads") ? "../" + i.image : i.image, height: "180px" }),
                    React.createElement("br", null),
                    React.createElement(
                        "span",
                        null,
                        i.text
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "button",
                        { className: "btn btn-sm btn-outline-danger mt-1",
                            onClick: function onClick() {
                                return props.change(props.images.filter(function (x) {
                                    return x !== i;
                                }));
                            } },
                        "L\xF6schen"
                    )
                );
            }) : React.createElement(React.Fragment, null)
        ),
        React.createElement("input", { hidden: true, type: "file", ref: imageInput, accept: "image/*",
            onChange: function onChange(e) {
                return Promise.all([].concat(_toConsumableArray(e.target.files))).then(function (res) {
                    return setSelected(res);
                });
            } }),
        React.createElement(
            "button",
            { className: "btn btn-sm btn-outline-primary", onClick: function onClick() {
                    return imageInput.current.click();
                } },
            "Fotos ausw\xE4hlen"
        ),
        React.createElement("br", null),
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
        loading ? React.createElement(
            "button",
            { className: "btn btn-sm btn-primary mt-1", type: "button" },
            React.createElement("span", { className: "spinner-border spinner-border-sm", role: "status", "aria-hidden": "true" }),
            React.createElement(
                "span",
                { className: "ml-2" },
                "Lade hoch..."
            )
        ) : selected.length > 0 ? React.createElement(
            "button",
            { className: "btn btn-sm btn-primary mt-1", onClick: upload },
            "Hochladen"
        ) : React.createElement(React.Fragment, null)
    );
};

SponsorsForm.defaultProos = {
    sponsors: []
};

TreeList.defaultProps = {
    highlight: 1
};

var domContainer = document.getElementById('admin_root');
ReactDOM.render(React.createElement(TreeList, { trees: trees, highlight: highlight }), domContainer);