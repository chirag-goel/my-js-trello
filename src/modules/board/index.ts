import List from './list';
import { addListTrello } from './add';

//Board constructor object and assign some properties to its prototype
function Board(title) {
    var nextId = 0

    this.title = title
    this.lists = []
    this.cards = {}

    this.node = document.createElement('div')
    this.titleNode = document.createElement('div')
    this.listsNode = document.createElement('div')

    this.node.id = 'board'
    this.titleNode.id = 'trello-title-board'
    this.listsNode.id = 'trello-canvas-board'

    // new list title form
    this.titleFormNode = buildListTitleForm()
    this.titleNode.appendChild(document.createTextNode(this.title))

    this.getNextId = function () {
        return '_' + (nextId++).toString()
    }
}

Board.prototype.render = function () {
    this.lists.push(new List(this, 'Add a list...', 0, true))
    for (var i = 0; i < this.lists.length; ++i) {
        this.listsNode.appendChild(this.lists[i].node)
    }
    this.lists[this.lists.length - 1].node.appendChild(this.titleFormNode)
    this.lists[this.lists.length - 1].titleNode.onclick = addListTrello(this)
    this.node.appendChild(this.titleNode)
    this.node.appendChild(this.listsNode)
}

Board.prototype.registerCard = function (card, index) {
    this.cards[card.id] =
    {
        card: card
        , list: card.list
        , index: index
    }
}

Board.prototype.reregisterSubsequent = function (list, index, shift) {
    for (var i = index; i < list.cards.length; ++i) {
        this.registerCard(list.cards[i], i + shift)
    }
}

Board.prototype.unregisterCard = function (card) {
    delete this.cards[card.id]
}

/*
This function will build the form for list,It is called by addList
 */
function buildListTitleForm() {
	var node = document.createElement('form')
	node.innerHTML =
		'<div class="newitem-title-wrapper">' +
		'<input id="trello-list-title-input" type="text">' +
		'<input id="trello-list-title-submit" type="submit" value="Save">' +
		'</div>'
	node.style.display = 'none'
	return node
}

export default Board;
