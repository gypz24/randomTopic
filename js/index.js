import { saveTopic, deleteTopic, getTopics } from './data.js'

window.onload = function () {

    //  DOM Elements
    const inTopic = document.querySelector('#inTopic')
    const formTopic = document.querySelector('#formTopic')
    const conListTopics = document.querySelector('#conListTopics')
    formTopic.onsubmit = formTopicClickController

    //  Constants
    //  btnTopicKey-(index)
    const btnTopicKey = 'btnTopic-'

    //  Main Function
    function main() {
        getTopics()?.forEach((t) => paintTopic(t))
    }
    main()

    //  DOM Controllers
    function formTopicClickController(e) {
        try {
            const topic = inTopic.value
            if (topic) {
                saveTopic(topic)
                paintTopic(topic)
                resetFormTopic()
            }
        } catch (error) {
            showMessage('Sorry, Something went wrong. Please, try again.', true)
            console.log(error)
        } finally {
            e.preventDefault()
        }
    }

    function btnTopicClickController(e){
        const index = e.target.id.substring(btnTopicKey.length)
        try {
            deleteTopic(index)
            unPaintTopic(e.target)
        } catch (error) {
            showMessage('Sorry, Something went wrong. Please, try again.', true)
            console.log(error)
        }
    }

    //  Helper Functions

    function paintTopic(topic) {
        //Index
        const index = conListTopics.children.length
        //Button
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.className = 'btn btn-primary'
        btn.textContent = topic
        btn.id = btnTopicKey + index
        btn.onclick = btnTopicClickController
        //Icon
        const ico = document.createElement('i')
        ico.className = 'fa-solid fa-delete-left'
        //Icon to Button
        btn.append(ico)
        //Button to Container
        conListTopics.append(btn)
    }

    function unPaintTopic(btn) {
        btn.remove()
    }

    function resetFormTopic() {
        formTopic.reset()
    }

    function showMessage(msj, isError){
        alert(msj)
    }

}