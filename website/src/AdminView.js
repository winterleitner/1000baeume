const {useState, useEffect} = React

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const TreeList = (props) => {
    const [showForm, setShowForm] = useState(true)
    const [selectedTree, setSelectedTree] = useState({})
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
    const isNew = Object.keys(props.tree).length === 0 && props.tree.constructor === Object
    return (
        <div className="tree-form">
            <h2>{isNew ? "Neuen Baum erstellen." : "Baum bearbeiten."}</h2>
            <form>
                <label htmlFor="description">Beschreibung</label><br/>
                <textarea name="description" rows="5" cols="60" defaultValue={props.tree.description}/><br/>
                <label htmlFor="date_planted">Pflanzdatum</label><br/>
                <input type="date" name="date_planted" onFocus={(e) => (e.target.value.length == 0 ? e.target.value = `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}` : ""} defaultValue={props.tree.date_planted}/><br/>
                <label htmlFor="description">Standort-Name</label><br/>
                <input type="text" name="location_name" defaultValue={props.tree.location_name}/><br/>
                <input type="submit"/>
            </form>
            {!isNew ? <div>
                    <h3>Bilder</h3>
                    <div className="images-list">
                        {props.tree.images && props.tree.images.length > 0 ? props.tree.images.map(i => <div
                            className="images-list-item"><img src={i} height="180px"/><br/>
                            <button>Löschen</button>
                        </div>) : <React.Fragment/>}
                    </div>
                    <input type="file" multiple/>
                    <button>Hochladen</button>

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

TreeForm.defaultProps = {
    tree: {}
}

const domContainer = document.getElementById('admin_root');
ReactDOM.render(<TreeList trees={trees}/>, domContainer);