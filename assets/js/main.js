function load() {
    //constantes e variáveis

    const container = document.querySelector('.container');
    const imgInput = document.querySelectorAll('.imgInput');
    const form = container.querySelector('form');
    const liInput = document.querySelectorAll('li');
    const outTasks = container.querySelector('.outTasks');
    const allTasks = [];
    let tasks;

    //constantes e variáveis

    function newNote() {
        moreOptions()
        openForm()
    }

    // formulário

    function openForm() {
        container.querySelector('form').classList.toggle('form')
    }

    // formulário



    //criar uma tarefa nova

    function newNote() {
        moreOptions()
        openForm()
    };

    function newTask(e) {
        e.preventDefault();
        openForm()

        const task = form.querySelector('#task');
        const text = form.querySelector('#text');

        createTasks(task, text)
    }

    function createTasks(task, text) {
        if (task.value || text.value) allTasks.push({ title: task.value, text: text.value })
        task.value = text.value = ``

        setTasks(outTasks, allTasks)

        localStorage.setItem(`task${allTasks.length}`, JSON.stringify(allTasks[allTasks.length - 1]))
    }

    function setTasks(body, value, onload) {
        if (onload) value = transformObj(value)

        body.innerHTML = ``

        for (let task of value) {
            outTasks.innerHTML += `
                <div class='tasks'>
                    <h3>${task.title}</h3>
                    <p>${task.text}</p>
                </div>
            `
        };

        setEventListener()
    }

    // criar uma tarefa nova

    //Storage

    function loadTasksStorage() {
        const len = localStorage.length;

        if (!len) return;

        const keys = Object.keys(localStorage);

        setTasks(outTasks, keys, true);
    }

    loadTasksStorage()

    function transformObj(value) {
        const obj = []

        for (let values of value) {
            obj.push(JSON.parse(eval(`localStorage.${values}`)))
        }

        for (let i of obj) {
            allTasks.push(i)
        }

        return obj
    }

    //Storage


    //btn de mais opções

    function moreOptions() {
        document.querySelector('nav').classList.toggle('nav')
        imgInput[4].classList.toggle('clicked')

        if (imgInput[4].getAttribute('src') === './assets/icon/more-options.svg') {
            imgInput[4].setAttribute('src', './assets/icon/cancel.svg')
        } else {
            imgInput[4].setAttribute('src', './assets/icon/more-options.svg')
        }
    };

    //btn de mais opções

    //ouvidores para as tasks

    function setEventListener() {
        tasks = outTasks.querySelectorAll('.tasks')

        for (let task of tasks) {
            task.addEventListener('click', openTask)
        }
    }

    function openTask() {
        const tar = this
        const task = container.querySelector('.task')
        task.innerHTML = '<button class="btn">Voltar</button>'
        const btn = container.querySelector('.btn')
        btn.addEventListener('click', closeTask)
        task.appendChild(tar)
        tar.setAttribute(`style`, `overflow: auto;
            animation: toFrom 1s;
            cursor: auto; 
            height: 85vh; 
            margin: 1em;
        `);
        
        removeOrAddDisplay(outTasks, true);
        removeOrAddDisplay(task, false);
    }

    function removeOrAddDisplay(body, value) {
        if (value) return body.style.display = 'none'
        body.style.display = 'grid'
    }

    function closeTask() {
        const task = container.querySelector('.task')
        setTasks(outTasks, allTasks)
        removeOrAddDisplay(task, true)
        removeOrAddDisplay(outTasks, false)
    }

    //ouvidores para as tasks

    //ouvidores

    form.addEventListener('submit', newTask);
    document.addEventListener('click', (e) => {
        if (e.target === imgInput[0] || e.target === liInput[0]) newNote()
        if (e.target === imgInput[4]) moreOptions()
    })

    //ouvidores 

}

load()
