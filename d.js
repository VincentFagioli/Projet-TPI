var texte = 'Un texte\net un autre\r\npuis ensuite\rla fin';
var lignes = texte.split(/\r\n|\r|\n/);
console.log(lignes); // affiche [ 'Un texte', 'et un autre', 'puis ensuite', 'la fin' ]



const regex = /\·\w\s/g;
var chaine = "les utilisateurs·trice ";
var resultat = chaine.split(regex); 
console.log(resultat);


var regex = /(\S*)+(?:\·)+(\S*\s)/mg;
var chaine = "Les utilisateurs·trices sont jamais là et du coup";
var resultat = chaine.match(regex);
console.log(resultat);





var regex = /(\S*)+(?:\·)+(\S*)/mg;
var regex2 = /\S*\·+\S*/m;
var str = `les utilisatrices les utilisateurs·trices les utilisateurs·trices les utilisateurs·trices`;
var temp=str;
var m;
var resultat;

while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        console.log(`${groupIndex}`);

        if(`${groupIndex}`== 2) {
            if (m[groupIndex] === "e") {
                resultat = m[1] + m[groupIndex];
                // alert(resultat);
            }
            else if (m[groupIndex] === "es") {
                resultat = m[1].replace(/s+$/g, m[groupIndex]);
                // alert(resultat);
            }
            else {
                alert(m[1]);
                alert(m[2]);
                resultat = m[1].substring(0, m[1].lastIndexOf(m[groupIndex].charAt(0))) + m[groupIndex]; //début à caractère trouver
                alert(resultat);
                temp = temp.replace("utilisateurs·trices", resultat);
                alert(str);
            }
        }

    });
    //alert("ok");
}


const regex = /\·\w\s/g;

var regex = /\·\w\s/g;
var chaine = "Les utilisateurs·trices ne sont jamais là et du coup ils·elles ont changés·es ";
var resultat = chaine.replace(regex, "s");
console.log(resultat);


var regex = /(\·\w*)/g;
var rer = "";
var chaine = "Les utilisateurs·trices ne sont jamais là et du coup ils·elles ont changés·es ";
var resultat = chaine.replace(regex, rer);
console.log(resultat);