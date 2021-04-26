function load() {
    const container = document.querySelector('.container')
    const imgInput = document.querySelectorAll('.imgInput')
    console.log(imgInput)

    function newNote() {
        container.querySelector('form').classList.toggle('form')
    }

    function moreOptions() {
        document.querySelector('nav').classList.toggle('nav')
        if (imgInput[4].getAttribute('src') === './assets/icon/more-options.svg') {
            imgInput[4].setAttribute('src', './assets/icon/cancel.svg')
        } else {
            imgInput[4].setAttribute('src', './assets/icon/more-options.svg')
        }
    }

    document.addEventListener('click', (e) => {
        if (e.target === imgInput[4]) moreOptions()
    })
}

load()
