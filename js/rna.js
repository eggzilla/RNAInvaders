
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
    rna.plot();

  } else {
    console.log("provided sequence is not an RNA sequence");
  }
  return false;
}

