function load() {
    const container = document.querySelector('.container')
    const imgInput = document.querySelectorAll('.imgInput')
    const form = container.querySelector('form')
    const allTasks = []
    function newNote() {
        moreOptions()
        openForm()
    }

    function openForm() {
        container.querySelector('form').classList.toggle('form')
    }

    function newTask(e) {
        e.preventDefault()
        openForm()

        const task = form.querySelector('#task')
        const text = form.querySelector('#text')
        
        createTasks(task, text)
    }
  function createTasks(task, text) {
        if (task.value || text.value) allTasks.push({ title: task.value, text: text.value })
        task.value = text.value = ``
        console.log(allTasks)
        const outTasks = container.querySelector('.outTasks')
        outTasks.innerHTML = ``
        for (let task of allTasks) {
            outTasks.innerHTML += `<div class='tasks'>
                <h3>${task.title}</h3>
                <p>${task.text}</p>
            </div>`
        }
    }
  

    function moreOptions() {
        document.querySelector('nav').classList.toggle('nav')
        imgInput[4].classList.toggle('clicked')
        if (imgInput[4].getAttribute('src') === './assets/icon/more-options.svg') {
            imgInput[4].setAttribute('src', './assets/icon/cancel.svg')
        } else {
            imgInput[4].setAttribute('src', './assets/icon/more-options.svg')
        }
    }

    form.addEventListener('submit', newTask)
    document.addEventListener('click', (e) => {
        if (e.target === imgInput[0]) newNote()
        if (e.target === imgInput[4]) moreOptions()
    })
}

load()
