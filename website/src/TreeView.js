const {useState, useEffect} = React

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const TreeView = (props) =>
    <div>
        <div className="container">
            <div className="myheading"><h1>Die bereits gepflanzten Bäume</h1></div>
        </div>
        <div className="trees-view">{props.trees.slice(0, 10).map(t => <TreeContainer tree={t}
                                                                                      key={getRandomInt(1000000)}
                                                                                      scrollInterval={props.scrollInterval}/>)}</div>
    </div>

const TreeContainer = (props) => {
    let {tree} = props;
    return (
        <div className="tree-container">
            <div className="tree-container-top">
                <div className="tree-id">
                    <div>{tree.id}</div>
                </div>
                <TreeImages images={tree.bilder} treeId={tree.id} scrollInterval={props.scrollInterval}/>
            </div>
            <div className="tree-container-bottom">
                <div className="tree-date"><strong>Gepflanzt</strong><br/><span>{tree.datum}</span></div>
                <div className="tree-location">
                    <strong>Standort</strong><br/>
                    <span>{tree.ort.name}</span>
                </div>
                <div className="tree-description"><strong>Infos</strong><br/>
                    <p>{tree.beschreibung.length > 160 ? tree.beschreibung.substr(0, 145) + "..." : tree.beschreibung.length > 0 ? tree.beschreibung : "-"}</p>
                </div>
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
        if (props.scrollInterval > 0) {
            setIntervalId(window.setTimeout(function () {
                incrementSelected()
            }, props.scrollInterval))
        }
    }, [selected])
    const incrementSelected = () => {
        if (selected + 1 < props.images.length) setSelected(selected + 1)
        else setSelected(0)
    }
    const decrementSelected = () => {
        if (selected - 1 >= 0) setSelected(selected - 1)
        else setSelected(props.images.length - 1)
    }
    if (props.images.length == 0) return <div style={{backgroundImage: "url(/images/Logo_Steyr.png)"}}
                                              className="tree-imagebox"/>
    else {
        return (
            <div>
                <div style={{backgroundImage: `url(${props.images[selected].src})`}} src={props.images[selected].src}
                     alt={props.images[selected].alt} className="tree-imagebox">
                    <div className="dots-container">{props.images.map((i, index) => <div
                        key={props.treeId + "-" + index}
                        className={"slider-dot " + (i == props.images[selected] ? "selected" : "")}
                        onClick={() => setSelected(index)}/>)}
                    </div>
                    <div className="arrows-container">
                        <div className="arrow arrow-left" onClick={decrementSelected}>
                            <svg width="100%" height="100%" viewBox="0 0 320 512">
                                <path fill="currentColor"
                                      d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
                                      className=""></path>
                            </svg>
                        </div>
                        <div className="arrow arrow-right" onClick={incrementSelected}>
                            <svg width="100%" height="100%"  viewBox="0 0 320 512">
                                <path fill="currentColor"
                                      d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                                      className=""></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const domContainer = document.getElementById('trees_root');
ReactDOM.render(<TreeView trees={trees} scrollInterval={scrollInterval}/>, domContainer);