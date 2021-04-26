function load() {
    const container = document.querySelector('.container')
    const imgInput = document.querySelectorAll('.imgInput')
    console.log(imgInput)

    function newNote() {
        container.querySelector('form').classList.toggle('form')
    }

    function moreOptions() {
        document.querySelector('nav').classList.toggle('nav')
    }

    document.addEventListener('click', (e) => {
        if (e.target === imgInput[0]) newNote()
        if (e.target === imgInput[4]) moreOptions()
        if (e.target === imgInput[2]) newNote()
    })
}

load()
