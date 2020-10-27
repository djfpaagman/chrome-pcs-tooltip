var debounce = require('lodash.debounce')

function addTooltip(link) {
  const controller = new AbortController()
  const {
    signal
  } = controller

  // remove all other tooltips
  document.querySelectorAll(".pcs-chrome--tooltip-container").forEach(el => el.remove())

  let container = document.createElement("div")
  container.classList.add("pcs-chrome--tooltip-container")

  let tooltip = document.createElement("div")
  tooltip.classList.add("pcs-chrome--tooltip")

  container.appendChild(tooltip)
  link.insertAdjacentElement('beforebegin', container)

  link.addEventListener("mouseout", () => {
    controller.abort()
    container.remove()
  }, {
    once: true
  })

  fetch(link.href, {
      signal
    })
    .then(response => response.text())
    .then(page => {
      let parser = new DOMParser()
      let rider = parser.parseFromString(page, "text/html")
      let profile = rider.querySelector(".rdr-info")

      // Remove header
      profile.querySelector("h3").remove()

      tooltip.innerHTML = profile.innerHTML
    })
    .catch(e => console.log(e))
}

let debouncedAddTooltip = debounce(addTooltip, 500)

document.addEventListener("mouseover", (e) => {
  var target;

  if (e.target && e.target.matches("a[href^=rider]")) {
    target = e.target
  } else if (e.target && e.target.parentNode.matches("a[href^=rider]")) {
    target = e.target.parentNode
  }

  if (target) {
    debouncedAddTooltip(target)

    e.target.addEventListener("mouseout", (e) => {
      debouncedAddTooltip.cancel
    }, {
      once: true
    })
  }
}
)