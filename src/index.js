// this import statement tells webpack to include styles.css in the build
import css from "./styles.css"

function init() {
    if (!window.addEventListener) return // Check for IE9+

    let options = INSTALL_OPTIONS

    console.log(JSON.parse(JSON.stringify(options)))

    const theme = (({
        detection
    }) => {
        // MacOS CSS media query
        if (detection.query && window.matchMedia('(prefers-color-scheme: dark)').matches) return true

        // High contrast CSS media query
        if (detection.highcontrast && window.matchMedia('(-ms-high-contrast: white-on-black)').matches) return true

        // Class on body
        if (detection.bodyclass && document.getElementsByTagName("body")[0].classList.contains(typeof bodyclass === "boolean" ? "dm-dark" : bodyclass)) return true

        // Night time
        if (detection.time && new Date().getHours() >= time.min ? time.min : 6 && new Date().getHours() >= time.max ? time.max : 20) return true

        // If all checks fail
        return false
    })(options)

    let element

    // updateElement runs every time the options are updated.
    // Most of your code will end up inside this function.
    function updateElement() {
        element = INSTALL.createElement(options.location, element)

        // Set the app attribute to your app's dash-delimited alias.
        element.setAttribute("app", "your-app-name")
        element.innerHTML = options.message
    }

    // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
    window.INSTALL_SCOPE = {
        setOptions(nextOptions) {
            options = nextOptions

            updateElement()
        }
    }

    // This code ensures that the app doesn't run before the page is loaded.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", updateElement)
    } else {
        updateElement()
    }
}

init()
