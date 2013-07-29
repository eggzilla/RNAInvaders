/* The ViennaRNA Namespace */

// We need this function to easily set characters within a string
String.prototype.replaceAt = function(index, chr) {
	if(index > this.length-1) return str;
  if(index == 0) return chr + this.substr(index+1);
	return this.substr(0,index) + chr + this.substr(index+1);
}

// Here comes the actual implementation of the ViennaRNA stuff
var ViennaRNA = ViennaRNA || {};


ViennaRNA.createNS = function (namespace) {
    var nsparts = namespace.split(".");
    var parent = ViennaRNA;
 
    // we want to be able to include or exclude the root namespace so we strip
    // it if it's in the namespace
    if (nsparts[0] === "ViennaRNA") {
        nsparts = nsparts.slice(1);
    }
 
    // loop through the parts and create a nested namespace if necessary
    for (var i = 0; i < nsparts.length; i++) {
        var partname = nsparts[i];
        // check if the current parent already has the namespace declared
        // if it isn't, then create it
        if (typeof parent[partname] === "undefined") {
            parent[partname] = {};
        }
        // get a reference to the deepest element in the hierarchy so far
        parent = parent[partname];
    }
    // the parent is now constructed with empty namespaces and can be used.
    // we return the outermost namespace
    return parent;
};

/** #########################################
 *  #               OBJECTS                 #
 *  #                                       #
 *  # Some objects the ViennaRNA namespace  #
 *  # functions rely on                     #
 *  #########################################
 */

ViennaRNA.ModelDetails  = function(){
                            this.pair = {
                                          A : { A : 0, C : 0, G : 0, U : 5},
                                          C : { A : 0, C : 0, G : 1, U : 0},
                                          G : { A : 0, C : 2, G : 0, U : 3},
                                          U : { A : 6, C : 0, G : 4, U : 0}
                                        };
                            this.TURN = 3;
                            this.fold_method = "mm";
                          };

ViennaRNA.RNA           = function(sequence){
                            this.model_details = new ViennaRNA.ModelDetails();

                            this.sequence   = sequence.toUpperCase();
                            this.n          = this.sequence.length;
                            this.structure  = new String(sequence);
                            for(var i=0;i<this.structure.length;i++)
                              this.structure = this.structure.replaceAt(i, ".");

                            this.update = function(){
                              if(this.model_details.fold_method === "mm"){
                                this.fold       = ViennaRNA.Algorithms.mm;
                                this.backtrack  = ViennaRNA.Algorithms.mm_bt;
                              }
                            };

                            this.update();
                          };



/** #########################################
 *  #             SUB NAMESPACES            #
 *  #                                       #
 *  #########################################
 */

// Make the namespace that encapsulates the Utility functions
var ns  = ViennaRNA.createNS("ViennaRNA.Utils");

/**
 *  Get a pair table representation of a dot-bracket string
 */
ns.make_pair_table      = function(structure){
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
                          };

// Make the namespace that encapsulates the various folding algorithms
ns = ViennaRNA.createNS("ViennaRNA.Algorithms");

/**
 *  Here comes the implementation of Nussinov Maximum Matching
 */
ns.mm                   = function(){
                            var n = this.n;
                            /* array init */
                            this.mm = new Array(n + 1);
                            for(var i = 0; i <= n; i++){
                              this.mm[i] = new Array(n + 1);
                              for(var j = i; j <= n; j++)
                                this.mm[i][j] = 0;
                            }
                            var maximum = 0;

                            /* actual computation */
                            for(var i = n - this.model_details.TURN - 1; i > 0; i--)
                              for(var j = i + this.model_details.TURN + 1; j <= n; j++){
                                maximum = this.mm[i][j-1];
                                for(var l = j - this.model_details.TURN - 1; l >= i; l--)
                                  if(this.model_details.pair[this.sequence[l-1]][this.sequence[j-1]] != 0)
                                    maximum = Math.max(maximum, ((l > i) ? this.mm[i][l-1] : 0) + 1 + this.mm[l+1][j-1]);
                                this.mm[i][j] = maximum;
                              }

                            maximum = this.mm[1][n];

                            return maximum;

                          };

ns.mm_bt                = function(i, j){
                            if((typeof(i) === "undefined") || (typeof(j) === "undefined")){
                              for(var i = 0; i < this.n; i++)
                                this.structure = this.structure.replaceAt(i, ".");
                              i = 1;
                              j = this.n;
                            }

                            var maximum = this.mm[i][j];

                            if(j - i - 1 < this.model_details.TURN) return;    /* no more pairs */

                            if(this.mm[i][j-1] == maximum){      /* j is unpaired */
                              this.backtrack(i, j-1);
                              return;
                            }

                            for(var q = j - this.model_details.TURN - 1; q >= i; q--){  /* j is paired with some q */

                              var left_part     = (q > i) ? this.mm[i][q-1] : 0;
                              var enclosed_part = this.mm[q+1][j-1];

                              if(left_part + enclosed_part + 1 == maximum){
                                this.structure = this.structure.replaceAt(q - 1, "(");
                                this.structure = this.structure.replaceAt(j - 1, ")");
                                if(i < q) this.backtrack(i, q - 1);
                                this.backtrack(q + 1, j - 1);
                                return;
                              }
                            }

                            alert(i + "," + j + ": backtracking failed!");
                          };

