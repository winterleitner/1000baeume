const {useState, useEffect, useRef} = React

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const nTree = {sponsors: [], images: []}

const TreeList = (props) => {
    const [showForm, setShowForm] = useState(true)
    const [selectedTree, setSelectedTree] = useState(nTree)
    const [sponsors, setSponsors] = useState([])
    return (
        <div>
            {showForm ? <TreeForm tree={selectedTree} modifyTree={setSelectedTree}/> : <div/>}
            <div className="inline"><strong>Baumliste</strong>
                <button onClick={() => setShowForm(true)
                }>Neu
                </button>
            </div>
            <table>
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
                    <tr onClick={() => setSelectedTree(t)}>
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

const TreeForm = props => {
    const isNew = props.tree === nTree
    return (
        <div className="tree-form">
            <h2>{isNew ? "Neuen Baum erstellen." : "Baum bearbeiten."}</h2>
            <form>
                <label htmlFor="description">Beschreibung</label><br/>
                <textarea name="description" rows="5" cols="60" defaultValue={props.tree.description}/><br/>
                <label htmlFor="date_planted">Pflanzdatum</label><br/>
                <input type="date" name="date_planted"
                       onFocus={(e) => (e.target.value.length == 0 ? e.target.value = `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}` : "")}
                       defaultValue={props.tree.date_planted}/><br/>
                <label htmlFor="description">Standort-Name</label><br/>
                <input type="text" name="location_name" defaultValue={props.tree.location_name}/><br/>
                <SponsorsForm sponsors={props.tree.sponsors}/>
                <ImageUpload images={props.tree.images}/>
                <hr/>
                <button>Speichern</button>
            </form>
            {!isNew ? <div>

                    <h3>Sponsoren / Baumpaten</h3>
                    <ul>
                        {props.tree.sponsors && props.tree.sponsors.length > 0 ? props.tree.sponsors.map(i =>
                            <li>{i.name} - {i.contribution}</li>) : <React.Fragment/>}
                    </ul>
                    <input type="text"/>
                    <input type="text"/>
                    <button>Hinzufügen</button>
                </div>
                : <React.Fragment/>}
        </div>)
}

const SponsorsForm = props => {
    const [sponsors, setSponsors] = useState(props.sponsors)
    const [nSponsorName, setNSponsorName] = useState("")
    const [nSponsorContr, setNSponsorContr] = useState("")
    const addSponsor = (e) => {
        e.preventDefault()
        setSponsors([...sponsors, {name: nSponsorName, contribution: nSponsorContr}])
    }
    return (
        <div>
            <strong>Sponsoren</strong>
            <ul>
                {sponsors.map(s =>
                    <li className="sponsor-item">{s.name} - {s.contribution}
                        &nbsp;<i className="fa fa-trash" style={{color: "red"}} aria-hidden="true"
                                 onClick={() => setSponsors(sponsors.filter(x => x !== s))}></i>
                    </li>)}
            </ul>
            <label>Name</label><br/>
            <input type="text" onChange={e => setNSponsorName(e.target.value)}/><br/>
            <label>Beitrag</label><br/>
            <input type="text" onChange={e => setNSponsorContr(e.target.value)}/><br/>
            <button onClick={addSponsor}>Hinzufügen</button>
        </div>
    )
}

const ImageUpload = props => {
    const [images, setImages] = useState(props.images)
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
        reader.onload = function(theFileData) {
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
            <h3>Bilder</h3>
            <div className="images-list">
                {images.length > 0 ? images.map(i => <div
                    className="images-list-item"><img src={i} height="180px"/><br/>
                    <button>Löschen</button>
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
            <button onClick={upload}>Hochladen</button>
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