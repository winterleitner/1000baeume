const {useState, useEffect} = React

const HighlightView = props => {
    let image = <img src={props.images[0].src} className="d-block w-100 highlight-image"
                     alt="Erster Baum pflanzen Projekt 1000 Bäume für Steyr"/>
    if (!Array.isArray(props.images)){
           image = <img src="images/Baum1.JPG" className="d-block w-100"
                 alt="Erster Baum des Projekts 1000 Bäume für Steyr"/>
    }
    return (<div className="myimagebox">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    {image}
                    <div className="carousel-caption d-none d-md-block mycarouseltext">
                        <h5>{props.text}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

HighlightView.defaultProps = {
    images: ["images/Baum1.JPG"]
}


const dc = document.getElementById('highlight_root');
ReactDOM.render(<HighlightView images={highlight.bilder} text={highlight.beschreibung}/>, dc);