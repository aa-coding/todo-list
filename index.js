/* to do:
responsive design */

/* "global mutable state" */

const editedItem = []
const listItems = []

/* global functions  */

const showModal = (edit) => {
    const modal = document.createElement('aa-modal')
    if (edit === 'edit') {
        modal.setAttribute('addBtnFunction', 'edit')
    } else modal.setAttribute('addBtnFunction', 'add item')
    const wrapper = document.querySelector('.wrapper')
    wrapper.appendChild(modal)
    
}

const toggleSidebar = () => {

    const sidebar = document.querySelector('.sidebar-component')
    sidebar.id ? sidebar.id = '' : sidebar.id = 'show-sidebar-component'

}

const showModalBtn = document.querySelector('.show-modal-btn')
showModalBtn.addEventListener('click', () => showModal('add item'))

const toggleSidebarBtn = document.querySelector(".toggle-sidebar-btn")
toggleSidebarBtn.addEventListener('click', toggleSidebar)


const makeListItems = () => {

        const sidebar = document.querySelector('aa-sidebar')
        
        const removeList = (nodeList) => {
            nodeList.forEach(item => item.remove())
        }
        removeList(sidebar.shadowRoot.querySelectorAll('.list-item'))
       
        listItems.forEach((item, index) => {
            
            const listItem = document.createElement('aa-list-item')
            listItem.setAttribute('itemNum', `${index+1}.`)
            listItem.setAttribute('itemTitle', item.title)
            listItem.setAttribute('id', index)
            listItem.className = 'list-item'
            sidebar.shadowRoot.appendChild(listItem)
           
        })
    }


export { showModal, makeListItems, listItems, editedItem}