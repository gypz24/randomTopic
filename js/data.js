//  Constants
const lsTopicKey = 'topics'

//  Functions
export function getTopics(){
    return JSON.parse(localStorage.getItem(lsTopicKey))
}

function setTopics(topics){
    localStorage.setItem(lsTopicKey, JSON.stringify(topics))
}

export function saveTopic(topic){
    const topics = getTopics() ?? []
    topics.push(topic)
    setTopics(topics)
}

export function deleteTopic(index){
    const topics = getTopics() ?? []
    topics.splice(index, 1)
    setTopics(topics)
}

