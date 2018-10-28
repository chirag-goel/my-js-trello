import Board from "../board";

function CardEdit (card) { 
	this.node = document.getElementById('card-edit');
	this.windowOverlay = document.getElementById('container-main');
	this.titleNode = document.getElementById('card-edit-title');
	this.card = card;
}

CardEdit.prototype.clearInputs = function () {
	this.titleNode.value = '';
}

//This will called on the close button
CardEdit.prototype.close = function() {
	this.card = undefined
	this.clearInputs()
	this.node.style.display = 'none'
	this.windowOverlay.style.display = 'none'
}

//This function will show the edited text on the card on submit
CardEdit.prototype.show = function () {
	this.windowOverlay.style.display = 'block'
	this.node.style.display = 'block';
	this.titleNode.value = this.card.title;
	document.getElementById('card-edit-close').onclick = () => {
		this.close();
	};
	document.getElementById('card-edit-submit').onclick = () => {
		this.submit(); 
	};
	document.getElementById('card-edit-delete').onclick = () => {
		this.delete(); 
	};
}

//This function will submit the edited text
CardEdit.prototype.submit = function () {
	var title = this.titleNode.value.trim();

	if (title) {
		this.card.title = title
		this.card.titleNode.replaceChild(document.createTextNode(title),
			this.card.titleNode.childNodes[0])
	}
	this.close()
}

CardEdit.prototype.getActiveCardIndex = function () {
	for (var i = 0; i< this.card.list.cards.length; i++) {
		if (this.card.list.cards[i] === this.card.id) {
			return i;
		}
	}
	return 0;
}

CardEdit.prototype.delete = function () {
	console.log(this.card);
	var index = this.getActiveCardIndex();
	this.card.list.cardsNode.removeChild(this.card.node)
	this.card.list.cards.splice(index, 1)
	var currentBoard = new Board(this.card.list.board.title);
	currentBoard.unregisterCard(this.card);
	currentBoard.reregisterSubsequent(this.card.list, index + 1, -1);
	this.close();
}

export default CardEdit;