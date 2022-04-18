const category = [
	{
		title: 'Posts',
		route: 'posts',
		className: 'red'
	},
	{
		title: 'Comments',
		route: 'comments',
		className: 'green'
	},
	{
		title: 'Albums',
		route: 'albums',
		className: 'blue'
	},
	{
		title: 'Photos',
		route: 'photos',
		className: 'black'
	},
	{
		title: 'Todos',
		route: 'todos',
		className: 'gold'
	},
	{
		title: 'Users',
		route: 'users',
		className: 'orange'
	},
]

const container = document.querySelector('.container')
const row = document.querySelector('.row')
const loader = document.querySelector('.loader')
console.log(loader)

// -------------------------------------------------------------------------------


window.addEventListener('load' , () => {
	const btnTemplate = category.map(({title , route , className}) => {
		return BtnTemplate({title , route , className})
	}).join('')
	
	container.innerHTML = btnTemplate
})

window.addEventListener('load' , () => {
	loader.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
	getDB('posts' , res => {
		cardTemplate('posts' , res)
	})
})


function getDB(endPoint , cb) {
	fetch(`https://jsonplaceholder.typicode.com/${endPoint}`)
	.then(data => data.json())
	.then(res => cb(res))
}


function routeTempalte(route) {
	getDB(route , res => {
		cardTemplate(route , res)
	})
}

// -------------------------------------------------------------------------------


function cardTemplate(route , res) {
	if (route === 'posts') {
		const template = res.map(({title , body}) => {
			return cardPosts(title , body)
		}).join('')

		row.innerHTML = template
	} else if (route === 'comments') {
		const template = res.map(({name , body}) => {
			return cardComments(name , body)
		}).join('')

		row.innerHTML = template
	} else if (route === 'photos') {
		const template = res.map(({title , url}) => {
			return cardPhotos(title , url)
		}).join('')

		row.innerHTML = template
	} else if (route === 'todos') {
		const template = res.map(({title , completed}) => {
			return cardTodos(title , completed)
		}).join('')

		row.innerHTML = template
	} else if (route === 'users') {
		const template = res.map(({name , username , email , address}) => {
			return cardUsers(name , username , email , address.city)
		}).join('')

		row.innerHTML = template
	} else if (route === 'albums') {
		const template = res.map(({title}) => {
			return cardAlbums(title)
		}).join('')

		row.innerHTML = template
	}
}

// -------------------------------------------------------------------------------

function cardPosts(title , body) {
	return `
		<div class="card">
			<div class="card-header">
				<h3>${title}</h3>
			</div>
			<div class="card-body">
				<p>${body}</p>
			</div>
		</div>
	`
}

function cardComments(name , body) {
	return `
		<div class="card">
			<div class="card-header">
				<h3>${name}</h3>
			</div>
			<div class="card-body">
				<p>${body}</p>
			</div>
		</div>
	`
}

function cardPhotos(title , url) {
	return `
		<div class="card">
			<div class="card-header">
				<h3>${title}</h3>
			</div>
			<div class="card-body">
				<img src="${url}">
			</div>
		</div>
	`
}

function cardTodos(title , completed) {
	return `
		<div class="card">
			<div class="card-header">
				<h3>${title}</h3>
			</div>
			<div class="card-body">
				<h6>${completed}</h6>
			</div>
		</div>
	`
}

function cardUsers(name , username , email , city) {
	return `
		<div class="card">
			<div class="card-header">
				<h3>${name}</h3>
			</div>
			<div class="card-body">
				<h4>${username}</h4>
				<h4>${email}</h4>
				<p>${city}</p>
			</div>
		</div>
	`
}

function cardAlbums(title) {
	return `
		<div class="card">
			<div class="card-header">
				<h3>${title}</h3>
			</div>
		</div>
	`
}

// -------------------------------------------------------------------------------

function BtnTemplate({title , route , className}) {
	return `
		<button class="btn ${className}" style="background-color: ${className}" onclick="routeTempalte('${route}')">${title}</button>
	`
}