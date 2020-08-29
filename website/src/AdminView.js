const {useState, useEffect, useRef} = React

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const nTree = {sponsors: [], images: []}

const TreeList = (props) => {
    const [selectedTree, setSelectedTree] = useState(nTree)
    return (
        <div>
            <NewTreeForm/>
            <EditTreeForm tree={selectedTree} modifyTree={setSelectedTree}/>
            <div className="inline"><strong>Baumliste</strong>
                <button className="btn btn-sm btn-outline-primary ml-2" type="button" data-toggle="modal"
                        data-target="#modal-new">Neu
                </button>
            </div>
            <table className="table table-responsive-sm table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Beschreibung</th>
                    <th>Datum</th>
                    <th>Standort</th>
                    <th>Bilder</th>
                    <th>Sponsoren</th>
                </tr>
                </thead>
                <tbody>
                {props.trees.sort((a,b) => a.id < b.id).map(t =>
                    <tr className={"tree-list-tr"} onClick={() => setSelectedTree(t)} data-toggle="modal" data-target="#modal-edit">
                        <td>{t.id}</td>
                        <td>{t.description}</td>
                        <td>{t.date_planted}</td>
                        <td>{t.location_name}</td>
                        <td>{t.images.length}</td>
                        <td>{t.sponsors.map(i => <div>{i.name}({i.contribution})</div>)}</td>
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
    const [sponsors, setSponsors] = useState([])
    const [images, setImages] = useState([])
    const {isNew} = props
    useEffect(() => {
        setSponsors(props.tree.sponsors)
        setImages(props.tree.images)
        setDescription(props.tree.description)
        setDatePlanted(props.tree.date_planted)
        setLocationName(props.tree.location_name)
        setId(props.tree.id)
    }, [props.tree])
    const save = () => {
        const url = isNew ? "create.php" : "edit.php"
        fetch(`/admin/${url}`, {
            method: "POST",
            body: JSON.stringify({id, description: description, date_planted: date_planted, location_name, sponsors, images, x: 22.22, y:33.33})
        }).then(res => res.ok ? window.location.reload() : alert("Das Speichern ist leider fehlgeschlagen."))
    }
    return (
        <div className="tree-form">
            <div>
                <label htmlFor="description">Beschreibung</label><br/>
                <textarea name="description" rows="5" cols="50" defaultValue={props.tree.description} onChange={e => setDescription(e.target.value)}/><br/>
                <label htmlFor="date_planted">Pflanzdatum</label><br/>
                <input type="date" name="date_planted"
                       value={date_planted}
                       onChange={e => setDatePlanted(e.target.value)}/><br/>
                <label htmlFor="description">Standort-Name</label><br/>
                <input type="text" name="location_name" defaultValue={props.tree.location_name} onChange={e => setLocationName(e.target.value)}/><br/>
                <hr/>
                <SponsorsForm sponsors={sponsors} change={setSponsors}/>
                <hr/>
                <ImageUpload images={images} change={setImages} treeId={props.tree.id}/>
                <hr/>
                <button className="btn btn-sm btn-primary" onClick={save}>Speichern</button>
            </div>
        </div>)
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
            <table>
                <tr>
                    <th><label>Name</label></th>
                    <th><label>Beitrag</label></th>
                </tr>
                <tr>
                    <td>
                        <input type="text" value={nSponsorName} onChange={e => setNSponsorName(e.target.value)}/>
                    </td>
                    <td>
                        <input type="text" value={nSponsorContr} onChange={e => setNSponsorContr(e.target.value)}/>
                    </td>
                </tr>
            </table>
            <button className="btn btn-sm btn-outline-primary mt-1" onClick={addSponsor}>Hinzufügen</button>
        </div>
    )
}

const ImageUpload = props => {
    const [selected, setSelected] = useState([])
    const imageInput = useRef(null);
    const upload = (e) => {
        e.preventDefault()
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
                    if (res.ok)
                    {
                        res.text().then(t => props.change([...props.images, {id: t}]))
                    }

                })
            }

            // Die Datei einlesen und in eine Data-URL konvertieren
            reader.readAsDataURL(datei);


        })
    }
    return (
        <div>
            <h4>Bilder</h4>
            <div className="images-list">
                {props.images.length > 0 ? props.images.map(i => <div
                    className="images-list-item mb-3"><img src={i.image} height="180px"/><br/><span>{i.text}</span><br/>
                    <button className="btn btn-sm btn-outline-danger mt-1" onClick={() => props.change(props.images.filter(x => x !== i))}>Löschen</button>
                </div>) : <React.Fragment/>}
            </div>
            <input type="file" multiple ref={imageInput}
                   onChange={(e) => Promise.all([...e.target.files]).then(res => setSelected(res))}/>
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
            <button className="btn btn-sm btn-outline-primary" onClick={upload}>Hochladen</button>
        </div>
    )
}

SponsorsForm.defaultProos = {
    sponsors: []
}

TreeForm.defaultProps = {
    tree: {sponsors: [], images: []}
}

const domContainer = document.getElementById('admin_root');
ReactDOM.render(<TreeList trees={trees}/>, domContainer);