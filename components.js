import { showModal, makeListItems, listItems, editedItem } from "/todo-list/index.js";

class Modal extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `

            <style>

                .modal {
                    margin: 2rem;
                    padding: 2.5rem;
                    border-radius: 20px;
                    background: #FFFFFF;
                    box-shadow: 0px 30px 60px 20px rgba(77, 108, 203, .33);
                    color: #0F1730;
                }

                .modal p {
                    margin-bottom: .25rem;
                }

                .modal input {
                    border-radius: 5px;
                    border: 1px solid lightgrey;
                }

                .modal button {

                    font-size: 1rem;
                    padding: .5rem 1.75rem; 
                    margin: .5rem;
                    border: none;
                    border-radius: 3px;
                    background-color: #0F1730;
                    color: white;

                }

                .buttons {

                    display: flex;
                    flex-direction: column;
                    margin-top: 2rem;
                    margin-bottom: 2rem;

                }
                
            </style>

            <article class="modal">
                <h3>Task Form</h3>
                <p>task name:</p>
                <input class="name-input"/>
                <div class='buttons'>
                    <button class="add-btn"></button>
                    <button class="cancel-btn">cancel</button>
                </div> 
            </article>

        `
        
       /*  this has to be done in connectedCallback, constructor isn't supposed 
       to read/write its DOM: 
          
        this.cancelBtn.addEventListener('click', this.cancelModal)
        this.addBtn.addEventListener('click', this.addItem.bind(this))
          */
 
        
        this.cancelBtn = this.shadowRoot.querySelector('.cancel-btn')
        this.addBtn = this.shadowRoot.querySelector('.add-btn')
        this.input = this.shadowRoot.querySelector('.name-input')
    }
    
    cancelModal() {
        
        this.setAttribute('addBtnFunction', 'add')
        editedItem.pop()
        const modal = document.querySelector('.modal-component')
        modal.remove()

    }

    addItem() {

        if (this.getAttribute('addBtnFunction') === 'add item') {
        const listItem = {title: this.input.value}
        listItems.push(listItem)
        makeListItems()

        } else {
            
            listItems[Number(editedItem)].title = this.input.value
            this.setAttribute('addBtnFunction', 'add item')
            makeListItems(listItems)
            editedItem.pop()
        }
        this.cancelModal()
    }

    connectedCallback() {
        
        this.cancelBtn.addEventListener('click', this.cancelModal)
        this.addBtn.addEventListener('click', this.addItem.bind(this))
        this.addBtn.innerText = this.getAttribute('addBtnFunction')  
        this.className = 'modal-component'
    }
}
customElements.define('aa-modal', Modal)


class Sidebar extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `

        <style>

            .sidebar-title {
                display: flex;
                height: fit-content;
                color: #909BAD;
                align-items: center; 
            }

            .sidebar-btn {

                margin-left: auto;
                margin-right: 1rem;
                height: fit-content;
                width: fit-content;
                padding: .25rem;
                background-color: #09183F;
                color: white; 
                border: none;
                border-radius: 3px;
            }

        </style>


        <div class="sidebar-title">
            <h2>Tasks</h2>
            <button class='sidebar-btn'>X</button>
        </div>
        
        `
    }

    closeSidebar() {

        const sidebar = document.querySelector('.sidebar-component')
        sidebar.id = ''
    }

    connectedCallback() {

        this.className='sidebar-component'
        this.closeSidebarBtn = this.shadowRoot.querySelector('.sidebar-btn')
        this.closeSidebarBtn.addEventListener('click', this.closeSidebar)
    }
}
customElements.define('aa-sidebar', Sidebar)


class ListItem extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
        <style>
        .list-item {
            display: flex;
            align-items: center;
            color: #34426C;
        }

        .item-title {
            margin-left: .15rem;
            margin-top: 0;
            margin-bottom: 0;
        }
        
        .item-btns {

            margin-left: auto;
            margin-right: .5rem;
           
        }

        .item-btns img {

            width: 15px;
        }

        .item-btns button {
            border: none;
            height: fit-content;
            padding: 0;
            margin: 0; 
        }
        </style>


        <div class="list-item">
            <span class="item-num"></span>
            <p class="item-title"></p>
            <div class="item-btns">
                <button class="delete-btn"><img src="/todo-list/assets/delete_icon.svg"></button>
                <button class="edit-btn"><img src="/todo-list/assets/Edit_icon.svg"></button>
            </div>
        </div>       
        `
    }

   deleteItem = (e) => {
   
        const id = e.currentTarget.id
        listItems.splice(Number(id) , 1)
        makeListItems()
        const modal = document.querySelector('aa-modal')
        if(modal) { modal.remove()}
    
    }
    
    editItem = (e) => {
    
        const id = e.currentTarget.id
        editedItem.push(id)
        const modal = document.querySelector('aa-modal')
        if(modal) { modal.remove()}
        showModal('edit')    
    }

    connectedCallback() {
        
        const childrenArray = Array.from(this.shadowRoot.querySelector('.list-item').children)
        const [itemNum, itemTitle, btns] = childrenArray
        itemNum.innerText = this.getAttribute('itemNum') 
        itemTitle.innerText = this.getAttribute('itemTitle')
        const deleteBtn = btns.querySelector('.delete-btn')
        deleteBtn.id = this.getAttribute('id')
        deleteBtn.addEventListener('click', this.deleteItem.bind(this))
        const editBtn = btns.querySelector('.edit-btn')
        editBtn.id = this.getAttribute('id')
        editBtn.addEventListener('click', this.editItem.bind(this))
    
    }

}
customElements.define('aa-list-item', ListItem)