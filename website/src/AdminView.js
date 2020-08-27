const {useState, useEffect, useRef} = React

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const nTree = {sponsors: [], images: []}

const TreeList = (props) => {
    const [selectedTree, setSelectedTree] = useState(nTree)
    return (
        <div>
            <NewTreeForm tree={nTree}/>
            <EditTreeForm tree={selectedTree} modifyTree={setSelectedTree}/>
            <div className="inline"><strong>Baumliste</strong>
                <button className="btn btn-sm btn-outline-primary" type="button" data-toggle="modal"
                        data-target="#modal-new">Neu
                </button>
            </div>
            <table class="table table-responsive-sm table-striped">
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
                {props.trees.map(t =>
                    <tr onClick={() => setSelectedTree(t)} data-toggle="modal" data-target="#modal-edit">
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
                    <h4 className="modal-title">Baum bearbeiten</h4>
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
    const {isNew} = props
    return (
        <div className="tree-form">
            <h2>{isNew ? "Neuen Baum erstellen." : "Baum bearbeiten."}</h2>
            <div>
                <label htmlFor="description">Beschreibung</label><br/>
                <textarea name="description" rows="5" cols="50" defaultValue={props.tree.description}/><br/>
                <label htmlFor="date_planted">Pflanzdatum</label><br/>
                <input type="date" name="date_planted"
                       onFocus={(e) => (e.target.value.length == 0 ? e.target.value = `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}` : "")}
                       defaultValue={props.tree.date_planted}/><br/>
                <label htmlFor="description">Standort-Name</label><br/>
                <input type="text" name="location_name" defaultValue={props.tree.location_name}/><br/>
                <hr/>
                <SponsorsForm sponsors={props.tree.sponsors}/>
                <hr/>
                <ImageUpload images={props.tree.images}/>
                <hr/>
                <button className="btn btn-sm btn-primary">Speichern</button>
            </div>
        </div>)
}

const SponsorsForm = props => {
    const [sponsors, setSponsors] = useState([])
    const [nSponsorName, setNSponsorName] = useState("")
    const [nSponsorContr, setNSponsorContr] = useState("")
    useEffect(() => {
        setSponsors(props.sponsors);
    }, [props])
    const addSponsor = (e) => {
        e.preventDefault()
        setSponsors([...sponsors, {name: nSponsorName, contribution: nSponsorContr}])
        setNSponsorName("")
        setNSponsorContr("")
    }
    return (
        <div>
            <h4>Sponsoren</h4>
            <ul>
                {sponsors.map(s =>
                    <li className="sponsor-item">{s.name} - {s.contribution}
                        &nbsp;<i className="fa fa-trash" style={{color: "red"}} aria-hidden="true"
                                 onClick={() => setSponsors(sponsors.filter(x => x !== s))}></i>
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
    const [images, setImages] = useState([])
    const [selected, setSelected] = useState([])
    const imageInput = useRef(null);
    useEffect(() => {
        setImages(props.images);
    }, [props])
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
                //Upload
                console.log(theFileData)
            }

            // Die Datei einlesen und in eine Data-URL konvertieren
            reader.readAsDataURL(datei);


        })
    }
    console.log(selected)
    return (
        <div>
            <h4>Bilder</h4>
            <div className="images-list">
                {images.length > 0 ? images.map(i => <div
                    className="images-list-item mb-3"><img src={i.image} height="180px"/><br/><span>{i.text}</span><br/>
                    <button className="btn btn-sm btn-outline-danger mt-1" onClick={() => setImages(images.filter(x => x !== i))}>Löschen</button>
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