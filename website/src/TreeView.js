const {useState} = React

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
            <TreeImages images={tree.bilder} mainKey={props.key}/>

            <h2>Baum {tree.id}</h2>
            <h6>Datum</h6>
            <span>{tree.datum}</span>
            <h6>Standort</h6>
            <span>{tree.ort.name}</span>
            <h6>Baumpaten</h6>
            <span>{tree.paten.map(p => p.name + "(" + p.beitrag + ")").join(", ")}</span>
        </div>)
}

const TreeImages = props => {
    const [selected, setSelected] = useState(0)
    if (props.images.length == 0) return <img src={"/images/Logo_Steyr.png"} className="tree-imagebox"/>
    else {
        window.setTimeout(function () {
            if (selected + 1 < props.images.length) setSelected(selected + 1)
            else setSelected(0)
        }, 5000)
        return (
            props.images.map(i =>
                <img src={i.src} alt={i.alt} className="tree-imagebox"/>
            )
        )
    }
}


const domContainer = document.getElementById('trees_root');
ReactDOM.render(<TreeView trees={trees}/>, domContainer);