String.prototype.replaceAt = function(index, chr) {
	if(index > this.length-1) return str;
  if(index == 0) return chr + this.substr(index+1);
	return this.substr(0,index) + chr + this.substr(index+1);
}

var pair =  {
              A : { A : 0, C : 0, G : 0, U : 5},
              C : { A : 0, C : 0, G : 1, U : 0},
              G : { A : 0, C : 2, G : 0, U : 3},
              U : { A : 6, C : 0, G : 4, U : 0}
            };

var TURN = 3;

var sequence;   /* the sequence */
var structure;  /* the structure */
var mm;         /* the maximum matching matrix */


function fold(){
  /* get the sequence from input field */
  sequence  = $("#sequence").val().toUpperCase();
  structure = new String(sequence);

  /* call maximum Matching */
  var maximum = maximumMatching();
  maximumMatching_backtrack();

  alert(maximum + "\n" + structure);
  pt = make_pair_table(structure);
  console.log(pt);
  simple_xy_coordinates(pt);
  return false;
}




function maximumMatching(){

  var n = sequence.length;
  /* array init */
  mm = new Array(n + 1);
  for(var i = 0; i <= n; i++){
    mm[i] = new Array(n + 1);
    for(var j = i; j <= n; j++)
      mm[i][j] = 0;
  }
  var maximum = 0;

  /* actual computation */
  for(var i = n - TURN - 1; i > 0; i--)
    for(var j = i + TURN + 1; j <= n; j++){
      maximum = mm[i][j-1];
      for(var l = j - TURN - 1; l >= i; l--)
        if(pair[sequence[l-1]][sequence[j-1]] != 0)
          maximum = Math.max(maximum, ((l > i) ? mm[i][l-1] : 0) + 1 + mm[l+1][j-1]);
      mm[i][j] = maximum;
    }

  maximum = mm[1][n];

  return maximum;

}


function maximumMatching_backtrack(){
  var i, j, l;

  for(var i=0;i<structure.length;i++)
    structure = structure.replaceAt(i, ".");

  mm_bt(1, sequence.length);

  return structure;
}

function mm_bt(i, j){
  var maximum = mm[i][j];

  if(j - i - 1 < TURN) return;    /* no more pairs */

  if(mm[i][j-1] == maximum){      /* j is unpaired */
    mm_bt(i, j-1);
    return;
  }

  for(var q = j - TURN - 1; q >= i; q--){  /* j is paired with some q */

    var left_part     = (q > i) ? mm[i][q-1] : 0;
    var enclosed_part = mm[q+1][j-1];

    if(left_part + enclosed_part + 1 == maximum){
      structure = structure.replaceAt(q - 1, "(");
      structure = structure.replaceAt(j - 1, ")");
      if(i < q) mm_bt(i, q - 1);
      mm_bt(q + 1, j - 1);
      return;
    }
  }

  alert(i + "," + j + ": backtracking failed!");
}

function make_pair_table(structure){
  /* returns array representation of structure.
      table[i] is 0 if unpaired or j if (i.j) pair.  */
  var i,j,hx, length;
  var stack = new Array();
  var table = new Array();

  length    = structure.length;
  table[0]  = length;

  for(hx=0, i=1; i<=length; i++){
    var c = structure[i-1];
    if(c == '('){
      stack[hx++]=i;
    } else if(c == ')'){
      j = stack[--hx];
      if (hx<0){
        alert(structure + "\nunbalanced brackets in make_pair_table");
      }
      table[i]=j;
      table[j]=i;
    } else {
      table[i]= 0;
    }
  }
  if (hx!=0) {
    alert(structure + "\nunbalanced brackets in make_pair_table");
  }
  return table;
}

var angle = new Array();

function simple_xy_coordinates(pair_table){
  var i,j;
  var stems = 0;
  var up    = 0;
  i = 1; j = pair_table[0];
  
  while(i <= j){
    if(i > pair_table[i]) up++;
    else {
      stems++;
      i = pair_table[i];
    }
    i++;
  }
  
  console.log(stems + " stems and " + up + " unpaired in loop");
}
