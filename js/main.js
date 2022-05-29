document.querySelector('.button').addEventListener('click', makeReq)

async function makeReq(){

  const buttons = document.querySelectorAll('span')
  const res = await fetch(`/api`)
  const data = await res.json()
  
  // Then assign identical click events all at once.
  for (const button of buttons) {
    button.addEventListener('click', (e) => {
      // So each time we click a button, we'll run this logic no matter the button.
        const result = Math.ceil(Math.random() * 2) === 1 ? 'You Win' : 'You Lose'
        document.querySelector("p").innerHTML = result
    })
}
}


// function alexIdeas() {
//   // Since our buttons are spans, we can select them all like this.
//   const buttons = document.querySelectorAll('span')
  
//   // Then assign identical click events all at once.
//   for (const button of buttons) {
//     button.addEventListener('click', (e) => {
//       // So each time we click a button, we'll run this logic no matter the button.
//         const result = Math.ceil(Math.random() * 2) === 1 ? 'You Win' : 'You Lose'
//         document.querySelector("p").innerHTML = result
//     })
//   }
// }