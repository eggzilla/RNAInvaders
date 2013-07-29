
function fold(){
  /* get the sequence from input field */
  var seq     = $("#sequence").val();
  var result  = seq.match(/[^ACGU]/gi);
  if(!result){
    var rna = new ViennaRNA.RNA(seq);

    /* call maximum Matching */
    rna.fold();
    rna.backtrack();

    console.log(rna.sequence + "\n" + rna.structure);

    pt = ViennaRNA.Utils.make_pair_table(rna.structure);
    console.log(pt);
    simple_xy_coordinates(pt);
  } else {
    console.log("provided sequence is not an RNA sequence");
  }
  return false;
}

var angle = new Array();

function simple_xy_coordinates(pair_table){
  var i,j;
  var stems = 0;
  var up    = 0;
  i = 1; j = pair_table[0];

  loop_coords(i, j, pair_table, 0, 0, -1, 0);
}


function loop_coords(i, j, pt, prev_x, prev_y, n_x, n_y){
  /* check the number of elements in the loop */
  var stems = 0;
  var up = 0;
  while(i <= j){
    if(i > pt[i]) up++;
    else{
      stems++;
      i = pt[i];
    }
    i++;
  }

  /* map all elements on a circle */
  var u = 2*stems + up;
  var r = u/(2*Math.PI);
  var alpha = (2*Math.PI)/u;
  var center_x = prev_x + r*n_x;
  var center_y = prev_y + r*n_y;
  var initial_rotation = Math.atan(n_y/n_x);

  console.log(stems + " stems and " + up + " unpaired in loop");
  console.log(u + " circumference " + r + " radius " + alpha + " delta_degree " + center_x + " center_x " + center_y + " center_y " + initial_rotation + " initit_alpha");

  if(u == 2){
    
  
  } else {
  
  
  }

}
