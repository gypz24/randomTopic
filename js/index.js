import { saveTopic, deleteTopic, getTopics } from './data.js'

window.onload = function () {

    //  DOM Elements
    const inTopic = document.querySelector('#inTopic')
    const formTopic = document.querySelector('#formTopic')
    const listTopics = document.querySelector('#listTopics')
    const pSubtitle = document.querySelector('#conListTopics .pSubtitle')
    const conteMessage = document.querySelector('#conteMessage')
    const pMessage = document.querySelector('#conteMessage .pMessage')
    formTopic.onsubmit = formTopicClickController

    //  Constants
    //  btnTopicKey-(index)
    const btnTopicKey = 'btnTopic-'

    //  Main Function
    function main() {
        const topics = getTopics() ?? []
        topics.forEach((t) => paintTopic(t))
        assignSubtitle()
    }
    main()

    //  DOM Controllers
    function formTopicClickController(e) {
        try {
            const topic = inTopic.value
            if (topic) {
                saveTopic(topic)
                paintTopic(topic)
                showMessage('Saved!')
                resetFormTopic()
                assignSubtitle()
            }
        } catch (error) {
            console.log(error)
            showMessage('Sorry!, Something went wrong. Please, try again.', true)
        } finally {
            e.preventDefault()
        }
    }

    function btnTopicClickController(e){
        try {
            paintOptionButtons(e.target)
        } catch (error) {
            console.log(error)
            showMessage('Sorry!, Something went wrong. Please, try again.', true)
        }
    }

    function btnConfirmDeleteController(btnDom){
        paintSuccessButton(btnDom, () => {
            const index = btnDom.id.substring(btnTopicKey.length)
            deleteTopic(index)
            unPaintTopic(btnDom)
            assignSubtitle()
        })
    }

    //  Helper Functions

    function paintTopic(topic) {
        //Index
        const index = listTopics.children?.length
        //Button container
        const conteBtn = document.createElement('div') 
        conteBtn.className = 'col-sm-12 col-md-6 col-lg-4'
        //Button
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.className = 'w-100 btn btn-dark'
        btn.textContent = topic
        btn.id = btnTopicKey + index
        conteBtn.onclick = btnTopicClickController
        //Button to its Container
        conteBtn.append(btn)
        //Button Container to TopicsContainer
        listTopics.append(conteBtn)
    }

    function paintOptionButtons(btnDom){
        const topic = btnDom.textContent
        const btnReturn = document.createElement('button')
        btnReturn.type = 'button'
        btnReturn.className = 'btn border-white text-white btn-sm rounded-circle'
        const iconReturn = document.createElement('i')
        iconReturn.className = 'fa-solid fa-rotate-left'
        btnReturn.append(iconReturn)
        btnReturn.onclick = () => unPaintOptionButtons(btnDom, topic)

        const btnConfirmDelete = document.createElement('button')
        btnConfirmDelete.type = 'button'
        btnConfirmDelete.className = 'btn border-white text-white btn-sm rounded-circle'
        const iconDelete = document.createElement('i')
        iconDelete.className = 'fa-solid fa-delete-left'
        btnConfirmDelete.append(iconDelete)
        btnConfirmDelete.onclick = () => btnConfirmDeleteController(btnDom)

        btnDom.textContent = ''
        btnDom.classList.remove('btn-dark')
        btnDom.classList.add('btn-danger')
        btnDom.classList.add('options')
        btnDom.append(btnReturn, btnConfirmDelete)
    }

    function paintSuccessButton(btnDom, callback){
        Array.from(btnDom.children).forEach(e => e.remove())
        const iconSuccess = document.createElement('i')
        iconSuccess.className = 'fa-sharp fa-solid fa-thumbs-up'
        
        const text = document.createTextNode(' Deleted ')
        
        btnDom.append(text, iconSuccess)
        btnDom.classList.remove('options')
        btnDom.classList.remove('btn-danger')
        btnDom.classList.add('btn-success')
        setTimeout(() => {
            callback()
        }, 1000)
    }

    function unPaintOptionButtons(btnDom, topic){
        Array.from(btnDom.children).forEach(e => e.remove())
        btnDom.textContent = topic
        btnDom.classList.remove('options')
        btnDom.classList.remove('btn-danger')
        btnDom.classList.add('btn-dark')
    }

    function unPaintTopic(btn) {
        btn.parentNode.remove()
    }

    function resetFormTopic() {
        formTopic.reset()
        inTopic.blur()
    }

    function showMessage(msj, isError = false){
        pMessage.textContent = msj
        conteMessage.classList.add(isError ? 'bg-danger' : 'bg-success')
        conteMessage.classList.remove(!isError ? 'bg-danger' : 'bg-success')
        const toast = new bootstrap.Toast(conteMessage)
        toast.show()
    }

    function assignSubtitle(){
        pSubtitle.textContent = listTopics.children?.length ? 'If you want to delete one, click it' : 'Start and save your first topic' 
    }

}