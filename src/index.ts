import Board from './modules/board';
import './assets/scss/index.scss';

(function () {
	'use strict'
	
	//Onloading the document render the board.The code starts from here
	document.body.onload = function () {
		var title = 'Add New Board',
			board = new Board(title);
		board.render()
		document.getElementById('container').appendChild(board.node);
	}

}())