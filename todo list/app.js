//elements
const input=document.querySelector('.task-typing')
const addButton=document.querySelector('.add-button')
const todoContainer=document.querySelector('.tasks-container')
const icons=document.querySelector('.icons')
const select=document.querySelector('#select-status')

//vars
let elem

//addEventListeners
addButton.addEventListener('click',()=>{
    addButton.innerHTML.toString().includes(`pen`)?modifyTask():newTask()
})
todoContainer.addEventListener('click',activeIcon)
select.addEventListener('click',filterTasks)

//functions
function newTask(){
    //e.preventDefault()
    let elem=document.createElement('div')
    elem.classList.add('task')
    elem.innerHTML=` <p>${input.value}</p>
    <span class="icons"><i class="fa-solid fa-circle-check"></i><i class="fa-solid fa-pen"></i><i class="fa-solid fa-trash"></i></span>
   `
   todoContainer.appendChild(elem)
   input.value=''
   
}

function modifyTask(){
    
    elem.firstElementChild.innerText=input.value//select p tag
    addButton.innerHTML=`<i class="fa-solid fa-circle-plus"></i>`
    input.value=''
}

//to click on one of the icons next to each task
function activeIcon(e){
    let iconClass=[...e.target.classList]
    elem=e.target.parentNode.parentNode
    let l=iconClass.join('')
    if(l.includes('check')){

        elem.classList.toggle('finished')

    } else if(l.includes('trash')){
        
        elem.remove()
    }
     else if(l.includes('pen')){
        
        input.value=elem.innerText
        addButton.innerHTML=`<i class="fa-solid fa-pen"></i>`

    }
}

function filterTasks(e){
    let taskFilter=e.target.value
    let tasks=[...todoContainer.children]
    //console.log(tasks);
    tasks.forEach(task=>{
        //let taskDisplay=task.style.display
        switch (taskFilter){
            case 'all':
                task.style.display='flex';break
            case 'Finished':
                task.classList.contains('finished')?task.style.display='flex':task.style.display='none';break
            case 'Unfinished':
                !task.classList.contains('finished')?task.style.display='flex':task.style.display='none';break

            }
    })
}