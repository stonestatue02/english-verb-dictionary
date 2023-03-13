const listContainer = document.querySelector(".list-container")
const listTemplate = document.querySelector(".list-template")
const searchInput = document.querySelector(".search-input")

const v1Btn = document.querySelector(".v1-btn")
const v2Btn = document.querySelector(".v2-btn")
const v3Btn = document.querySelector(".v3-btn")
const ingBtn = document.querySelector(".ing-btn")

let contentLists = []

const hideElement = (value, data) => {
	const element = document.querySelectorAll(value)
	for(let i = 0; i < element.length; i++) {
		const isHidden = data === "false"
		element[i].classList.toggle("hidden", isHidden)
	}
}

v1Btn.addEventListener("click", () => {
	v1Btn.dataset.showV1 = v1Btn.dataset.showV1 === "true" ? "false" : "true"
	
	hideElement("p.list-v1", v1Btn.dataset.showV1)
})
v2Btn.addEventListener("click", () => {
	v2Btn.dataset.showV2 = v2Btn.dataset.showV2 === "true" ? "false" : "true"
	
	hideElement("p.list-v2", v2Btn.dataset.showV2)
})
v3Btn.addEventListener("click", () => {
	v3Btn.dataset.showV3 = v3Btn.dataset.showV3 === "true" ? "false" : "true"
	
	hideElement("p.list-v3", v3Btn.dataset.showV3)
})
ingBtn.addEventListener("click", () => {
	ingBtn.dataset.showIng = ingBtn.dataset.showIng === "true" ? "false" : "true"
	
	hideElement("p.list-ing", ingBtn.dataset.showIng)
})
/*
//-------------
const clickButton =  (el, value, data) => {
	console.log(data, el)
	const vBtn = document.querySelector(el)
	console.log(data)
	vBtn.addEventListener("click", () => {
		console.log(data, el)
		//vBtn.dataset.this.data = vBtn.dataset.this.data === "true" ? "false" : "true"
		const element = document.querySelectorAll(value)
		for(let i = 0; i < element.length; i++) {
			const isHidden = data === "false"
			element[i].classList.toggle("hidden", isHidden)
		}
	})
	//const hideElement = (value, data) => {
		
	//}
}

clickButton(".v1-btn", "p.list-v1", `${vBtn.dataset.showV1}`)
//----------
*/
searchInput.addEventListener("input", event => {
	const value = event.target.value.toLowerCase()
	
	contentLists.map(verb => {
		const visible = verb.verbs.toLowerCase().includes(value)
		verb.visibilities.classList.toggle("hidden", !visible)
		
	})
})

fetch("verbsData.json")
	.then(res => res.json())
	.then(data => {
		contentLists = data.map(verb => {
			const contentTemplate = listTemplate.content.cloneNode(true).children[0]
			
			const verbTitle = contentTemplate.querySelector(".list-title")
			const verb1 = contentTemplate.querySelector(".list-content1")
			const verb2 = contentTemplate.querySelector(".list-content2")
			const verb3 = contentTemplate.querySelector(".list-content3")
			const verbIng = contentTemplate.querySelector(".list-content4")
			
			verbTitle.textContent = verb[0]
			verb1.textContent = verb[0]
			verb2.textContent = verb[1]
			verb3.textContent = verb[2]
			verbIng.textContent = verb[3]
			
			listContainer.appendChild(contentTemplate)
			
			return {
				verbs: verb[0],
				visibilities: contentTemplate
			}
			
		})
	})
	.catch(error => console.error(error))
