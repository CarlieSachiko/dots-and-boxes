var html, size;



// constants
var dotTd = '<td>•</td>';

// listeners
document.getElementById('build').addEventListener('click', function() {
  html = '';
  size = parseInt($('#size').eq(0).val());

  for (var row = 0; row < size; row++) {
    html += buildRowPair(row);
  }





  console.log(html);
});

function buildRowPair(row) {
  var sRowPair = '';
  sRowPair = buildRowOne(row);
  sRowPair += buildRowTwo(row);
  return sRowPair;
}

function buildRowTwo(row) {
  var s = '<tr>';
  for (var cellPair = 0; cellPair < size; cellPair++) {
    s += `<td><div id="v${row + (cellPair * size)}" class="line v"></div></td>`;
    s += `<td><div id="${row}-${cellPair}" class="box"></div></td>`;
  }
  s += `<td><div id="v${row + (cellPair * size)}" class="line v"></div></td>`;
  s += '</tr>\n';
  return s;
}

function buildRowOne(row) {
  var s = '<tr>';
  for (var cellPair = 0; cellPair < size; cellPair++) {
    var tmp = `<td><div id="h${row * size + cellPair}" class="line h"></div></td>`;
    s += dotTd;
    s += tmp;
  }
  s += dotTd + '</tr>\n';
  return s;
}









