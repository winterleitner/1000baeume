var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect;


var HighlightView = function HighlightView(props) {
    var image = React.createElement("img", { src: props.images[0].src, className: "d-block w-100 highlight-image",
        alt: "Erster Baum pflanzen Projekt 1000 B\xE4ume f\xFCr Steyr" });
    if (!Array.isArray(props.images)) {
        image = React.createElement("img", { src: "images/Baum1.JPG", className: "d-block w-100",
            alt: "Erster Baum des Projekts 1000 B\xE4ume f\xFCr Steyr" });
    }
    return React.createElement(
        "div",
        { className: "myimagebox" },
        React.createElement(
            "div",
            { className: "carousel-inner" },
            React.createElement(
                "div",
                { className: "carousel-item active" },
                image,
                React.createElement(
                    "div",
                    { className: "carousel-caption d-none d-md-block mycarouseltext" },
                    React.createElement(
                        "h5",
                        null,
                        props.text
                    )
                )
            )
        )
    );
};

HighlightView.defaultProps = {
    images: ["images/Baum1.JPG"]
};

var dc = document.getElementById('highlight_root');
ReactDOM.render(React.createElement(HighlightView, { images: highlight.bilder, text: highlight.beschreibung }), dc);