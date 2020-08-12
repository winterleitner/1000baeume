const {useState, useEffect} = React

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const TreeView = (props) =>
    <div>
        <div className="container">
            <div className="myheading"><h1>Die bereits gepflanzten Bäume</h1></div>
        </div>
        <div className="trees-view">{props.trees.map(t => <TreeContainer tree={t} key={getRandomInt(1000000)}/>)}</div>
    </div>

const TreeContainer = (props) => {
    let {tree} = props;
    return (
        <div className="tree-container">
            <div className="tree-container-top">
                <div className="tree-id"><div>{tree.id}</div></div>
                <TreeImages images={tree.bilder} treeId={tree.id}/>
            </div>
            <div className="tree-container-bottom">
                <div className="tree-date"><strong>Gepflanzt</strong><br/><span>{tree.datum}</span></div>
                <div className="tree-location">
                    <strong>Standort</strong><br/>
                    <span>{tree.ort.name}</span>
                </div>
                <div className="tree-description"><p>{tree.beschreibung.length > 180 ? tree.beschreibung.substr(0, 165) + "..." : tree.beschreibung}</p></div>
                <div className="tree-sponsors">
                    <strong>{tree.paten.length === 1 ? "Baumpate" : "Baumpaten"}</strong><br/>
                    <span>{tree.paten.map(p => p.name /*+ "(" + p.beitrag + ")"*/).join(", ")}</span>
                </div>
            </div>
        </div>)
}

const TreeImages = props => {
    const [selected, setSelected] = useState(0)
    const [intervalId, setIntervalId] = useState(0)
    useEffect(() => {
        window.clearTimeout(intervalId)
        setIntervalId(window.setTimeout(function () {
            if (selected + 1 < props.images.length) setSelected(selected + 1)
            else setSelected(0)
        }, 5000))
    }, [selected])
    if (props.images.length == 0) return <div style={{backgroundImage: "url(/images/Logo_Steyr.png)"}}
                                              className="tree-imagebox"/>
    else {
        return (
            <div>
                <div style={{backgroundImage: `url(${props.images[selected].src})`}} src={props.images[selected].src}
                     alt={props.images[selected].alt} className="tree-imagebox">
                    <div className="dots-container">{props.images.map((i, index) => <div key={props.treeId + "-" + index}
                        className={"slider-dot " + (i == props.images[selected] ? "selected" : "")}
                        onClick={() => setSelected(index)}/>)}
                    </div>
                </div>
            </div>
        )
    }
}


const domContainer = document.getElementById('trees_root');
ReactDOM.render(<TreeView trees={trees}/>, domContainer);