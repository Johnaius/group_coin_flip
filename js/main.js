document.getElementById('headsButton').addEventListener('click', () => {
  let choice = Math.floor(Math.random()* 2) 
  if(choice === 1){
    choice = 'Heads'
    document.querySelector("p").innerHtml = "You Win"
  } else if(choice !== 1){
    document.querySelector('p').innerHTML = "You Lose!"
  }
  console.log(choice)
})

document.getElementById('tailsButton').addEventListener('click', () => {
  let choice = Math.floor(Math.random()* 2)
  if(choice === 1){
    choice = 'Tails'
    document.querySelector("p").innerHtml = "You Win!"
  } else if(choice !== 1){
    document.querySelector('p').innerHTML = "You Lose!"
  }
  console.log(choice)
})



function alexIdeas() {
  // Since our buttons are spans, we can select them all like this.
  const buttons = document.querySelectorAll('span')
  
  // Then assign identical click events all at once.
  for (const button of buttons) {
    button.addEventListener('click', (e) => {
      // So each time we click a button, we'll run this logic no matter the button.
        const result = Math.ceil(Math.random() * 2) === 1 ? 'You Win' : 'You Lose'
        document.querySelector("p").innerHTML = result
    })
  }
}