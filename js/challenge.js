const counter = document.querySelector("#counter")
const minus = document.querySelector("#minus")
const plus = document.querySelector("#plus")
const heart = document.querySelector("#heart")
const pause = document.querySelector("#pause")
const form = document.querySelector("form")
const likes = {}

document.addEventListener("DOMContentLoaded", () => { 
  let intervalID = setInterval(increment, 1000)
  minus.addEventListener("click", addOne)
  plus.addEventListener("click", subtractOne)
  heart.addEventListener("click", clickLike)
  form.addEventListener("submit", postComment)
  pause.addEventListener("click", () => {
    if (pause.innerText == "pause") {
      clearInterval(intervalID)
      pause.innerText = "resume"
      minus.removeEventListener("click", addOne)
      plus.removeEventListener("click", subtractOne)
      heart.removeEventListener("click", clickLike)
      form.removeEventListener("submit", postComment)
    } else {
      intervalID = setInterval(increment, 1000)
      pause.innerText = "pause"
      minus.addEventListener("click", addOne)
      plus.addEventListener("click", subtractOne)
      heart.addEventListener("click", clickLike)
      form.addEventListener("submit", postComment)
    }
  })
})

const increment = () => counter.textContent = Number.parseInt(counter.textContent, 10) + 1
const addOne = () => {counter.textContent = Number.parseInt(counter.textContent, 10) - 1}
const subtractOne = () => {counter.textContent = Number.parseInt(counter.textContent, 10) + 1}
const clickLike = () => {
  let like = document.createElement("li")
  const exists = Object.keys(likes).find((key) => key == counter.textContent)
  if (exists) {
    document.querySelector(`#number${counter.textContent}`).remove()
    likes[counter.textContent] += 1
    like.id = `number${counter.textContent}`
    like.textContent = `${counter.textContent} has been liked ${likes[counter.textContent]} times`
  } else {
    likes[counter.textContent] = 1
    like.id = `number${counter.textContent}`
    like.textContent = `${counter.textContent} has been liked 1 time`
  }
  document.querySelector("ul").appendChild(like)
}
const postComment = (event) => {
  event.preventDefault()
  const comment = document.createElement("p")
  comment.textContent = document.querySelector("#comment-input").value
  document.querySelector("#list").appendChild(comment)
  form.reset(comment)
}