$(function() {
	var playing = true;
	var turn = 0;
	var $cells = $('div[class^="cell-"]');
	var wins = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7]
	];

	console.log('$cells:',$cells);
	function checkForWin( cell, mark ) {
		var win = false;
		var possibleWins = getPossibleWins(cell);
		console.log('possibleWins:',possibleWins);
		for (var i=0; i<possibleWins.length; i++ ) {
			if ( checkLine(possibleWins[i], mark ) ) {
				win = true;
				break;
			}
		}
		if (win) {
			console.log(mark + ' won!');
			playing = false
		} else if (turn >= 9) {
			console.log('game over. no one won');
			playing = false
		}
	}
	function getPossibleWins( cell ) {
		var a = [];
		wins.forEach(function (elem, index, array) {
			if ( elem.indexOf(cell) > -1 ) {
				a.push(elem)
			}
		});
		return a;
	}
	function checkLine( possibleWin, mark ) {
		console.log('checkLine, possibleWin:',possibleWin,', mark:',mark );
		for (var i=0; i<possibleWin.length; i++) {
			var cellMark = $cells.eq( possibleWin[i] - 1 ).text();
			console.log('mark:',mark,', cellMark:',cellMark,', mark !== cellMark:',mark !== cellMark);
			if ( mark !== cellMark ) {
				return false;
			}
		}
		return true;		
	}
	function reset() {
		
	}
	$('#grid').on('click', 'div[class^="cell-"]', function() {
		var $cell = $(this);
		if ( !$cell.hasClass('filled') ) {
			var cellNum = parseInt( $cell.attr('class').split('-')[1], 10 );
			var mark = turn % 2 === 1 ? 'o' : 'x';
			$cell.addClass( 'filled '+ mark ).text( mark );
			turn++;
			checkForWin( cellNum, mark );
		}
	})
});