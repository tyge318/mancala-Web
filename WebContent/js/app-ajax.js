/**
 * 
 */
var rowA = "4 4 4 4 4 4";
var rowB = "4 4 4 4 4 4";
var manA = "0";
var manB = "0";
$(document).ready(function(event) {
	$('#buttonBegin').click(function(){
		var body = document.getElementById('ajaxGetUserServletResponse');
		body.innerHTML="";
		var tbl = document.createElement('table');
		tbl.setAttribute('id', 'boardState');
		tbl.setAttribute('border', '1');
		var tbdy = document.createElement('tbody');
		var tr = document.createElement('tr');
		for(var j=1; j<8; j++) {
			var td = document.createElement('td');
			td.appendChild(document.createTextNode('A'+j));
			tr.appendChild(td);
		}
		var td = document.createElement('td');
		td.setAttribute('rowspan', '3');
		td.setAttribute('id', 'mancalaB');
		td.appendChild(document.createTextNode(manB));
		tr.appendChild(td);
		tbdy.appendChild(tr);
		
		var tr = document.createElement('tr');
		var td = document.createElement('td');
		td.setAttribute('rowspan', '3');
		td.setAttribute('id', 'mancalaA');
		td.appendChild(document.createTextNode(manB));
		tr.appendChild(td);
		var values = rowA.split(" ");
		for(var j=2; j<=7; j++) {
			var td = document.createElement('td');
			td.appendChild(document.createTextNode(values[j-2]));
			td.setAttribute('id', 'A'+j);
			tr.appendChild(td);
		}
		tr.appendChild(td);
		tbdy.appendChild(tr);
		//second row
		var tr = document.createElement('tr');
		var values = rowB.split(" ");
		for(var j=2; j<=7; j++) {
			var td = document.createElement('td');
			td.appendChild(document.createTextNode(values[j-2]));
			td.setAttribute('id', 'B'+j);
			tr.appendChild(td);
		}
		tbdy.appendChild(tr);
		
		var tr = document.createElement('tr');
		for(var j=2; j<8; j++) {
			var td = document.createElement('td');
			var btn = document.createElement('button');
			btn.setAttribute('id', 'moveB'+j);
			//btn.setAttribute('onClick', test(j));
			btn.appendChild(document.createTextNode('B'+j));
			td.appendChild(btn);
			tr.appendChild(td);
		}
		var td = document.createElement('td');
		td.appendChild(document.createTextNode('B8'));
		tr.appendChild(td);
		tbdy.appendChild(tr);
		
		tbl.appendChild(tbdy);
		var title = document.createElement('h2');
		title.appendChild(document.createTextNode('Current Board State:'))
		
		body.appendChild(title);
		var message = document.createElement('h3');
		message.setAttribute('id', 'message');
		message.appendChild(document.createTextNode('You go first'));
		body.appendChild(message);
		var wrapTable = document.createElement('div');
		wrapTable.setAttribute('id', 'wrapTable');
		wrapTable.setAttribute('align', 'right');
		var checkBox = document.createElement('input');
		checkBox.setAttribute('type', 'checkbox');
		checkBox.setAttribute('id', 'showLog');
		checkBox.setAttribute('onChange', 'displayLog(this.checked)');
		wrapTable.appendChild(checkBox);
		wrapTable.appendChild(document.createTextNode('Show AI log (miniMax depth 2 with alpha-beta pruning).'));
		wrapTable.appendChild(tbl);
		body.appendChild(wrapTable); 
	});
	$(document).on('click', "button[id^='moveB']", function test() {
		//alert('You clicked '+$(this).attr('id'));
		$.ajax({
			url: 'mancalaServlet',
			data: {
				isAI: false,
				rowA: rowA,
				rowB: rowB,
				mancalaA: manA,
				mancalaB: manB,
				moveID: $(this).attr('id')
			},
			success : function(responseText) {
				//console.log(responseText);
				//$('#responseSection').text(responseText);
				var tokens = responseText.split(";");
				rowA = tokens[0];
				rowB = tokens[1];
				manA = tokens[2];
				manB = tokens[3];
				again = tokens[4];
				fillRow(rowA, 0);
				fillRow(rowB, 1);
				$('#mancalaA').text(manA);
				$('#mancalaB').text(manB);
				var message = document.getElementById('message');
				message.innerHTML="";
				if( endGameCheck() == false) {
					if(again == 'true') {
						message.appendChild(document.createTextNode('You get extra round.'));
					}
					else {
						message.appendChild(document.createTextNode('AI\'s turn now.'));
						lockButton();
						AIplayer();				
					}
				}
				else {
					lockButton();
					var yourScore = (manB-manA);
					if( yourScore > 0 ) {
						alert("You win AI by "+yourScore +"!! Great Job!\nRefresh to start a new game.");
					}
					else {
						alert("Ooops! You lose AI by " + (-1*yourScore) + ". Come back to play again.\nRefresh to start a new game.");
					}
				}

			}
		});
	});
	/*
	$("#moveB2").click(function(){
		alert('You clicked moveB');
	});*/
	//for(var x=2; x<8; x++) {
		
	//}
    /*    $('#userName').blur(function(event) {
                var name = $('#userName').val();
                $.get('GetUserServlet', {
                        userName : name
                }, function(responseText) {
                        $('#ajaxGetUserServletResponse').text(responseText);
                });
        }); */
});
function fillRow(row, rowID) {
	var values = row.split(" ");
	if( rowID == 0) { //rowA
		for(var i=2; i<=7; i++) {
			$('#A'+i).text(values[i-2]);
		}
	}
	else {	//rowB
		for(var i=2; i<=7; i++) {
			$('#B'+i).text(values[i-2]);
		}
	}
}
function lockButton() {
	for(var i=2; i<=7; i++) {
		document.getElementById('moveB'+i).disabled = true;
	}
}
function unlockButton() {
	for(var i=2; i<=7; i++) {
		document.getElementById('moveB'+i).disabled = false;
	}
}
function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}
function endGameCheck() {
	if( rowA == "0 0 0 0 0 0" || rowB == "0 0 0 0 0 0") {
		return true;
	}
	return false;
}
function moveOneStep(nextMove) {
	$.ajax({
		url: 'mancalaServlet',
		data: {
			isAI: false,
			rowA: rowA,
			rowB: rowB,
			mancalaA: manA,
			mancalaB: manB,
			moveID: nextMove
		},
		success: function(responseText) {
			var tokens = responseText.split(";");
			rowA = tokens[0];
			rowB = tokens[1];
			manA = tokens[2];
			manB = tokens[3];
			again = tokens[4];
			fillRow(rowA, 0);
			fillRow(rowB, 1);
			$('#mancalaA').text(manA);
			$('#mancalaB').text(manB);
		}
	})
}
function displayLog(status) {
	if( status) {
		$('#wrapTable').css('padding-right', '30%');
		$('#log').show();
	}
	else {
		$('#wrapTable').css('padding-right', '0');
		$('#log').hide();
	}
}
function updateLog(logMessage) {
	//alert("@@@@@");
	var logSection = document.getElementById('log');
	logSection.innerHTML = "";
	var textSection = document.createElement('pre');
	textSection.innerHTML = "Best Moves: "+ logMessage;
	logSection.appendChild(textSection);
}
function AIplayer() {
	$.ajax({
		url: 'mancalaServlet',
		data: {
			isAI: true,
			rowA: rowA,
			rowB: rowB,
			mancalaA: manA,
			mancalaB: manB
		},
		success: function(responseText) {
			var tokens = responseText.split(";");
			var AImoves = tokens[4].replace("root=>", "").split("=>");
			//alert("AImoves = " + AImoves)
			var logMessage = tokens[4].replace("root=>", "") + "\n" + "Traverse Log:\nNode, Depth, Value, Alpha, Beta+\n" + tokens[5];
			updateLog(logMessage);
			var message = document.getElementById('message');
			for(var i=0; i<=AImoves.length+1; i++) {
				(function(i){
					setTimeout(function(){
						if( i == 0) ;
						else if( i > 0 && i<= AImoves.length) {
							message.innerHTML="";
							message.appendChild(document.createTextNode('AI moves '+AImoves[i-1]));
							moveOneStep(AImoves[i-1]);
						}
						else {
							message.innerHTML="";
							message.appendChild(document.createTextNode('Your turn now.'));
							unlockButton();
						}
				}, i * 5000);
			  }(i));
			}
		}
	});
}
