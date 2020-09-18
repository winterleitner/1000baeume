const {useState, useEffect, useRef} = React

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const nTree = {sponsors: [], images: []}

const TreeList = (props) => {
    const [selectedTree, setSelectedTree] = useState(nTree)
    const setHighlight = (id) => {
        console.log("here")
        const fd = new FormData
        fd.append("id", id)
        fetch(`/admin/set_highlight.php`, {
            method: "POST",
            body: fd
        }).then(res => {
            if (res.ok) {
                window.location.reload()
            }
        })
    }
    const deleteEntry = id => {
        if (!window.confirm(`Den Eintrag mit der Id ${id} wirklich löschen?`)) return
        console.log(`Deleted ${id}`);
        const fd = new FormData
        fd.append("id", id)
        fetch(`/admin/delete.php`, {
            method: "POST",
            body: fd
        }).then(res => {
            if (res.ok) {
                window.location.reload()
            }
        })
    }
    return (
        <div>
            <NewTreeForm/>
            <EditTreeForm tree={selectedTree} modifyTree={setSelectedTree}/>
            <div className="inline"><strong>Baumliste</strong>
                <button className="btn btn-sm btn-outline-primary ml-2" type="button" data-toggle="modal"
                        data-target="#modal-new">Neu
                </button>
            </div>
            <table className="table table-responsive-sm table-striped mt-1">
                <thead>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Beschreibung</th>
                    <th>Datum</th>
                    <th>Standort</th>
                    <th>Bilder</th>
                    <th>Sponsoren</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {props.trees.sort((a, b) => a.id < b.id).map(t =>
                    <tr className={"tree-list-tr"}>
                        <td onClick={() => {
                            setHighlight(t.id);
                        }}>{t.id == highlight ? <span className="fa fa-star checked highlight-star clickable"></span> :
                            <span className="fa fa-star highlight-star clickable"></span>}</td>
                        <td onClick={() => setSelectedTree(t)} data-toggle="modal"
                            data-target="#modal-edit">{t.id}</td>
                        <td onClick={() => setSelectedTree(t)} data-toggle="modal"
                            data-target="#modal-edit">{t.description}</td>
                        <td onClick={() => setSelectedTree(t)} data-toggle="modal"
                            data-target="#modal-edit">{t.date_planted}</td>
                        <td onClick={() => setSelectedTree(t)} data-toggle="modal"
                            data-target="#modal-edit">{t.location_name}</td>
                        <td onClick={() => setSelectedTree(t)} data-toggle="modal"
                            data-target="#modal-edit">{t.images.length}</td>
                        <td onClick={() => setSelectedTree(t)} data-toggle="modal"
                            data-target="#modal-edit">{t.sponsors.map(i => <div>{i.name}({i.contribution})</div>)}</td>
                        <td onClick={() => deleteEntry(t.id)}><span className="fa fa-trash clickable"/></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>)
}

const NewTreeForm = props =>
    <div className="modal fade" id="modal-new" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true">
        <div className="modal-dialog modal-primary" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Neuen Baum anlegen</h4>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <TreeForm {...props} isNew={true}/>
                </div>
            </div>
        </div>
    </div>

const EditTreeForm = props =>
    <div className="modal fade" id="modal-edit" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true">
        <div className="modal-dialog modal-primary" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Baum {props.tree.id} bearbeiten</h4>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <TreeForm {...props} isNew={false}/>
                </div>
            </div>
        </div>
    </div>

const TreeForm = props => {
    const [id, setId] = useState(-1)
    const [description, setDescription] = useState("")
    const [date_planted, setDatePlanted] = useState(`${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`)
    const [location_name, setLocationName] = useState("")
    const [x, setX] = useState(0.0)
    const [y, setY] = useState(0.0)
    const [sponsors, setSponsors] = useState([])
    const [images, setImages] = useState([])
    const {isNew} = props
    useEffect(() => {
        if (typeof props.tree != "undefined" && props.tree != null) {
            if (typeof props.tree.sponsors != "undefined") setSponsors(props.tree.sponsors)
            if (typeof props.tree.images != "undefined") setImages(props.tree.images)
            if (typeof props.tree.description != "undefined") setDescription(props.tree.description)
            if (typeof props.tree.date_planted != "undefined") setDatePlanted(props.tree.date_planted)
            if (typeof props.tree.location_name != "undefined") setLocationName(props.tree.location_name)
            if (typeof props.tree.id != "undefined") setId(props.tree.id)
            if (typeof props.tree.x != "undefined") setX(props.tree.x)
            if (typeof props.tree.y != "undefined") setY(props.tree.y)
        }
    }, [props])
    const save = () => {
        const url = isNew ? "create.php" : "edit.php"
        fetch(`/admin/${url}`, {
            method: "POST",
            body: JSON.stringify({
                id,
                description: description,
                date_planted: date_planted,
                location_name,
                sponsors,
                images: images.map(i => {return {id: i.id, text: ""}}),
                x,
                y
            })
        }).then(res => res.ok ? window.location.reload() : alert("Das Speichern ist leider fehlgeschlagen."))
    }
    return (
        <div className="tree-form">
            <div>
                <label htmlFor="description">Beschreibung</label><br/>
                <textarea className="form-control" name="description" rows="5" cols="50" defaultValue={description}
                          onChange={e => setDescription(e.target.value)}/><br/>
                <label htmlFor="date_planted">Pflanzdatum</label><br/>
                <input className="form-control" type="date" name="date_planted"
                       value={date_planted}
                       onChange={e => setDatePlanted(e.target.value)}/><br/>
                <h4>Standort</h4>
                <label htmlFor="description">Standort-Name</label><br/>
                <input className="form-control" type="text" name="location_name" defaultValue={location_name}
                       onChange={e => setLocationName(e.target.value)}/><br/>

                <CoordinatesForm x={x} y={y} setX={setX} setY={setY}/>
                <hr/>
                <SponsorsForm sponsors={sponsors} change={setSponsors}/>
                <hr/>
                <ImageUpload images={images} change={setImages} treeId={id}/>
                <hr/>
                <button className="btn btn-primary" onClick={save}>Speichern</button>
            </div>
        </div>)
}

const CoordinatesForm = props => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const search = () => {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURI(query)}`).then(res => res.json()).then(res => setResults(res))
    }
    const handlePaste = e => {
        const val = e.clipboardData.getData("Text")
        const parts = val.split(",");
        if (parts.length !== 2) return
        e.stopPropagation();
        e.preventDefault();
        const x = parseFloat(parts[0])
        const y = parseFloat(parts[1])
        props.setX(x)
        props.setY(y)
    }
    return (
        <div>
            <label>Standort-Koordinaten</label><br/>
            <input className="form-control" type="text" onChange={e => setQuery(e.target.value)} value={query}
                   placeholder="Suchbegriff..."/>
            <button onClick={search} className="btn btn-sm btn-outline-primary mt-1">Suchen</button>
            {results.length > 0 ? <div>
                <strong>Ergebnisse</strong>
                <ul className="location-resultlist">
                    {results.map(r =>
                        <li className="location-result clickable">
                            <i className="fa fa-search mr-2" onClick={() => {
                                const url = `https://www.openstreetmap.org/?mlat=${r.lat}&mlon=${r.lon}#map=19/${r.lat}/${r.lon}`;
                                console.log("Open", url);
                                window.open(url);
                            }}/>
                            <span onClick={() => {
                                props.setX(r.lat)
                                props.setY(r.lon)
                            }}>{r.display_name}</span>
                        </li>)}
                </ul>
            </div> : <React.Fragment/>}
            <table style={{width: "100%"}}>
                <thead>
                <tr>
                    <th><label>Lat</label></th>
                    <th><label>Long</label></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <input className="form-control" type="text" value={props.x}
                               onChange={e => props.setX(e.target.value)}
                               onPaste={e => handlePaste(e)}
                        />
                    </td>
                    <td>
                        <input className="form-control" type="text" value={props.y}
                               onChange={e => props.setY(e.target.value)}
                               onPaste={e => handlePaste(e)}
                        />
                    </td>
                    <td>
                        <button className="btn btn-primary"><i className="fa fa-search" onClick={() => {
                            const url = `https://www.openstreetmap.org/?mlat=${props.x}&mlon=${props.y}#map=19/${props.x}/${props.y}`;
                            console.log("Open", url);
                            window.open(url);
                        }}/></button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

const SponsorsForm = props => {
    const [nSponsorName, setNSponsorName] = useState("")
    const [nSponsorContr, setNSponsorContr] = useState("")
    const addSponsor = (e) => {
        e.preventDefault()
        props.change([...props.sponsors, {name: nSponsorName, contribution: nSponsorContr, id: -1}])
        setNSponsorName("")
        setNSponsorContr("")
    }
    return (
        <div>
            <h4>Sponsoren</h4>
            <ul>
                {props.sponsors.map(s =>
                    <li className="sponsor-item">{s.name} - {s.contribution}
                        &nbsp;<i className="fa fa-trash" style={{color: "red"}} aria-hidden="true"
                                 onClick={() => props.change(props.sponsors.filter(x => x !== s))}></i>
                    </li>)}
            </ul>
            <table style={{width: "100%"}}>
                <tr>
                    <th><label>Name</label></th>
                    <th><label>Beitrag</label></th>
                </tr>
                <tr>
                    <td>
                        <input className="form-control" type="text" value={nSponsorName}
                               onChange={e => setNSponsorName(e.target.value)}/>
                    </td>
                    <td>
                        <input className="form-control" type="text" value={nSponsorContr}
                               onChange={e => setNSponsorContr(e.target.value)}/>
                    </td>
                </tr>
            </table>
            <button className="btn btn-sm btn-outline-primary mt-1" onClick={addSponsor}>Hinzufügen</button>
        </div>
    )
}

const ImageUpload = props => {
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)
    const imageInput = useRef(null);
    const upload = (e) => {
        e.preventDefault()
        setLoading(true)
        selected.forEach(datei => {

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

                const fd = new FormData()
                fd.append("tree", props.treeId)
                fd.append("image", datei)
                //Upload
                fetch("/admin/upload_image.php", {
                    method: "POST",
                    body: fd
                }).then(res => {
                    if (res.ok) {
                        res.text().then(t => props.change([...props.images, {id: t, image: senddata.fileData}])).then(() => setLoading(false))
                    }

                })
            }

            // Die Datei einlesen und in eine Data-URL konvertieren
            reader.readAsDataURL(datei);


        })
        setSelected([])
    }
    return (
        <div>
            <h4>Bilder</h4>
            <div className="images-list">
                {props.images.length > 0 ? props.images.sort((a, b) => a.id < b.id).map(i => <div
                    className="images-list-item mb-3"><img src={i.image.startsWith("uploads") ? "../" + i.image : i.image} height="180px"/><br/><span>{i.text}</span><br/>
                    <button className="btn btn-sm btn-outline-danger mt-1"
                            onClick={() => props.change(props.images.filter(x => x !== i))}>Löschen
                    </button>
                </div>) : <React.Fragment/>}
            </div>
            <input hidden type="file" ref={imageInput} accept="image/*"
                   onChange={(e) => Promise.all([...e.target.files]).then(res => setSelected(res))}/>
            <button className="btn btn-sm btn-outline-primary" onClick={() => imageInput.current.click()}>Fotos
                auswählen
            </button>
            <br/>
            {selected.length > 0 ?
                <div>
                    Hochzuladende Fotos:
                    <ul>
                        {selected.map(f => <li>
                            {f.name}
                        </li>)}
                    </ul>
                </div> : <React.Fragment/>
            }
            {loading ? <button className="btn btn-sm btn-primary mt-1" type="button">
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="ml-2">Lade hoch...</span>
                </button> :
                (selected.length > 0 ?
                    <button className="btn btn-sm btn-primary mt-1" onClick={upload}>Hochladen</button> :
                    <React.Fragment/>)}
        </div>
    )
}

SponsorsForm.defaultProos = {
    sponsors: []
}

TreeList.defaultProps = {
    highlight: 1
}


const domContainer = document.getElementById('admin_root');
ReactDOM.render(<TreeList trees={trees} highlight={highlight}/>, domContainer);