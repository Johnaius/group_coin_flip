const title = document.querySelector('h1')
const buttons = document.querySelector('section')

// This is called event delegation, where we can assign one click event to handle many elements.
// In this case, we're assigning a click event to the section, that the buttons are inside.
// We can access the individual buttons clicked by using the e.target property.
// e is a shorthand for event, ie the target of the click event.
buttons.addEventListener('click', async (e) => {
    // We can get the user's choice straight from the text inside the button they clicked on.
    const coinText = e.target.innerText
    const choice = coinText.toString().toLowerCase()

    // We'll send off our coinflip selection. The server will determine who wins.
    // Check how the server response is handled/determined in server.js: serveAPIResponse().
    const response = await fetch(`/api?flip=${choice}`)
    // Now we update the h1 title element with the server's response.
    title.innerText = await response.text()
})