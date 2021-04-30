function load() {
    //constantes e variáveis

    const container = document.querySelector('.container');
    const imgInput = document.querySelectorAll('.imgInput');
    const form = container.querySelector('form');
    const liInput = document.querySelectorAll('li');
    const outTasks = container.querySelector('.outTasks');
    const task = container.querySelector('.task')
    const allTasks = [];
    let tasks;

    //constantes e variáveis

    function newNote() {
        moreOptions()
        openForm()
    }

    // formulário

    function openForm() {
        removeOrAddDisplay(outTasks, true)
        removeOrAddDisplay(document.querySelector('footer'), true)
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
        removeOrAddDisplay(outTasks, false)
        removeOrAddDisplay(document.querySelector('footer'), false)

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
            body.innerHTML += `
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

    function setStorageTasks() {
        localStorage.clear()
        for (let setT in allTasks) {
            localStorage.setItem(`task${setT}`, JSON.stringify(allTasks[setT]))
        }
    }

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
        task.innerHTML = ``
        task.appendChild(tar)
        tar.setAttribute(`style`, `overflow: auto;
            animation: toFrom 1s;
            z-index: 9;
            cursor: auto; 
            height: 85vh; 
            margin: 1em;
        `);
        
        removeOrAddDisplay(outTasks, true);
        removeOrAddDisplay(task, false);
        btnTask()
    }

    function removeOrAddDisplay(body, value) {
        if (value) return body.style.display = 'none'
        body.style.display = 'grid'
    }

    function closeTask() {
        setTasks(outTasks, allTasks)
        removeOrAddDisplay(task, true)
        removeOrAddDisplay(outTasks, false)
    }

    function btnTask() {
        task.innerHTML += '<button class="btn">Voltar</button>'
        const btn = container.querySelector('.btn')
        btn.addEventListener('click', closeTask)
    }

    //ouvidores para as tasks

    //edite tasks 

    function editeTask() {
        moreOptions();
        removeOrAddDisplay(outTasks, true);
        removeOrAddDisplay(task, false);
        task.innerHTML = ``;
        const newForm = document.createElement('form');
        const btnOk = document.createElement('button')
        btnOk.innerHTML = 'OK'
        let i = 0;

        for(let inTask of allTasks) {
            const apen = document.createElement('div')

            apen.setAttribute('style', `
                border-bottom: 1px solid var(--primary-color-font);
                margin-bottom: 1em; 
                padding: .5em;
            `);

            apen.innerHTML = `
                <input type="text" id="in${i}" value="${inTask.title}" autocomplete="off" maxlength="21">
                <textarea id="text${i}"class="textarea">${inTask.text}</textarea>
            `
            i++
            newForm.appendChild(apen);
        };

        newForm.setAttribute('class', 'form');
        newForm.setAttribute('style', 'z-index: 100');
        newForm.appendChild(btnOk);
        task.appendChild(newForm);

        btnTask();
        
        const submitForm = task.querySelector('form');
        submitForm.addEventListener('submit', saveTasks);
    }

    function saveTasks(e) {
        e.preventDefault()

        for (let i = 0; i < allTasks.length; i++) {
            allTasks[i].title = document.getElementById(`in${i}`).value
            allTasks[i].text = document.getElementById(`text${i}`).value
        }

        setTasks(outTasks, allTasks)
        removeOrAddDisplay(outTasks, false);
        removeOrAddDisplay(task, true);
        
        setStorageTasks()
    }

    //edite tasks 

    //delete task

    function deleteTask() {
        moreOptions()
        removeOrAddDisplay(outTasks, true);
        removeOrAddDisplay(task, false);
        task.innerHTML = ''
        setTasks(task, allTasks)
        btnTask()
        let i = 0;
        const delTa = task.querySelectorAll('.tasks')
        
        for(let del of delTa) {
            const delT = i
            del.addEventListener('click', () => {
                allTasks.splice(delT, 1)
                removeOrAddDisplay(outTasks, false);
                removeOrAddDisplay(task, true);
                setTasks(outTasks, allTasks)
                setStorageTasks()
            })
            i++
        }
    }

    //delete task

    //sobre nós

    function aboutUs() {
        moreOptions()
        window.open('https://github.com/oGabrielSilva')
    }

    //sobre nós

    //ouvidores

    form.addEventListener('submit', newTask);
    document.addEventListener('click', (e) => {
        if (e.target === imgInput[0] || e.target === liInput[0]) newNote()
        if (e.target === imgInput[1] || e.target === liInput[1]) editeTask()
        if (e.target === imgInput[2] || e.target === liInput[2]) deleteTask()
        if (e.target === imgInput[3] || e.target === liInput[3]) aboutUs()
        if (e.target === imgInput[4]) moreOptions()
    })

    //ouvidores 
    // console.log(allTasks)
}

load()
