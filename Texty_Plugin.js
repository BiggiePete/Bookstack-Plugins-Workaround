String.prototype.count = function (c) {
    var result = 0, i = 0;
    for (i; i < this.length; i++)if (this[i] == c) result++;
    return result;
};
/*
Next major feature is a drop down menu with fill ins for when the user is typing and wants to know what the options are
when they press "["
*/

function EnumOptions() {
    /*
    GOAL : 
        Make it so that when the user is typing in the document, search for when they type a new "["
        if the latest "[" does not have a closing statemet, this, is where we perform
    
    Feature : 
        make a drop down list using the <ul> and <li> to select what to type and what options are availiable for the user
    */
    var page = document.getElementsByClassName("mce-content-body");
    var page = page[0].innerHTML;
    function CheckForUpdatesThread(){
        var pageold;
        var pagenew = page[0].innerHTML;
        if (pagenew - pageold != 0) {
            console.log(pagenew - pageold);
            pageold = pagenew;
        }

    }
    setTimeout(() => {
        CheckForUpdatesThread();
    }, 0);

}

function NumberNames() {
    try {
        var cont = document.getElementsByClassName("page-content clearfix");
        var Ptags = cont[0].children[0].querySelectorAll("p");
        var litags = cont[0].children[0].querySelectorAll("li");
        const combos = ['0th', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'];
        const replacement = ["0<sup>th</sup>", "1<sup>st</sup>", "2<sup>nd</sup>", "3<sup>rd</sup>", "4<sup>th</sup>", "5<sup>th</sup>", "6<sup>th</sup>", "7<sup>th</sup>", "8<sup>th</sup>", "9<sup>th</sup>"];
        // now since we have all of the p tags, we can try to parse out the text
        for (let i = 0; i < Ptags.length; i++) {
            for (let j = 0; j < combos.length; j++) {
                Ptags[i].innerHTML = Ptags[i].innerHTML.replace(combos[j], replacement[j]);
            }
        }
        for (let k = 0; k < litags.length; k++) {
            for (let l = 0; l < combos.length; l++) {
                litags[k].innerHTML = litags[k].innerHTML.replace(combos[l], replacement[l]);
            }
        }
    }
    catch {
        console.log('oh no');
    }
}

function Carot() {

    var cont = document.getElementsByClassName("page-content clearfix");
    var Ptags = cont[0].children[0].querySelectorAll("p");
    var litags = cont[0].children[0].querySelectorAll("li");
    for (var i = 0; i < Ptags.length; i++) {
        // this loop will help us loop through one line, now we need another for loop to go through each occurance in the line
        var occurances = Ptags[i].innerHTML.count("^");
        Ptags[i].innerHTML += "  ";
        for (let j = 0; j < occurances; j++) {
            //get position of first availiable carot
            // get the starting position of substring
            var start = Ptags[i].innerHTML.indexOf("^") + 1;
            //because we also want to handle parenthesis, we are going to slice from this spot in the string, until the end
            if (Ptags[i].innerHTML[start] == "(") {
                // the data starts with open parethesis, thus we will now rip everything from the first parenthesis to the end
                // from there we will find the next applicible parenthesis, and that will be our end val
                var length = start - 2;
                var substring = Ptags[i].innerHTML.slice(start + 1, length - start); // the string of everything we will be using
                substring = substring.slice(0, substring.indexOf(")")); // this is the string of everything within parenthesis
                var remainderstring = Ptags[i].innerHTML.substr(Ptags[i].innerHTML.indexOf(")") + 1)
                substring = "<sup>" + substring + "</sup>";
                var replacement = Ptags[i].innerHTML
                    .substr(0, Ptags[i].innerHTML.indexOf("^")) + substring + remainderstring;
                Ptags[i].innerHTML = replacement;
            }
            else { // handle if there are no parenthesis, just add the sup tags around the next character

                var subchar = Ptags[i].innerHTML[start];
                var origchar = subchar;
                subchar = "<sup>" + subchar + "</sup>"
                var replacement = Ptags[i].innerHTML
                    .replace("^" + origchar, subchar);
                Ptags[i].innerHTML = replacement;
            }
        }
    }
    // yes this is just a copy of the function above, but with li tags taken into account, idc
    for (var i = 0; i < litags.length; i++) {
        // this loop will help us loop through one line, now we need another for loop to go through each occurance in the line
        var occurances = litags[i].innerHTML.count("^");
        litags[i].innerHTML += "  ";
        for (let j = 0; j < occurances; j++) {
            //get position of first availiable carot
            // get the starting position of substring
            var start = litags[i].innerHTML.indexOf("^") + 1;
            //because we also want to handle parenthesis, we are going to slice from this spot in the string, until the end
            if (litags[i].innerHTML[start] == "(") {
                // the data starts with open parethesis, thus we will now rip everything from the first parenthesis to the end
                // from there we will find the next applicible parenthesis, and that will be our end val
                var length = start - 2;
                var substring = litags[i].innerHTML.slice(start + 1, length - start); // the string of everything we will be using
                substring = substring.slice(0, substring.indexOf(")")); // this is the string of everything within parenthesis
                var remainderstring = litags[i].innerHTML.substr(litags[i].innerHTML.indexOf(")") + 1)
                substring = "<sup>" + substring + "</sup>";
                var replacement = litags[i].innerHTML
                    .substr(0, litags[i].innerHTML.indexOf("^")) + substring + remainderstring;
                litags[i].innerHTML = replacement;
            }
            else { // handle if there are no parenthesis, just add the sup tags around the next character

                var subchar = litags[i].innerHTML[start];
                var origchar = subchar;
                subchar = "<sup>" + subchar + "</sup>"
                var replacement = litags[i].innerHTML
                    .replace("^" + origchar, subchar);
                litags[i].innerHTML = replacement;
            }
        }
    }

}
function Underscore() { //handle anything with an _ inront of some text
    var cont = document.getElementsByClassName("page-content clearfix");
    var Ptags = cont[0].children[0].querySelectorAll("p");
    var litags = cont[0].children[0].querySelectorAll("li");
    for (var i = 0; i < Ptags.length; i++) {
        // this loop will help us loop through one line, now we need another for loop to go through each occurance in the line
        var occurances = Ptags[i].innerHTML.count("_");
        Ptags[i].innerHTML += "  ";
        for (let j = 0; j < occurances; j++) {
            //get position of first availiable carot
            // get the starting position of substring
            var start = Ptags[i].innerHTML.indexOf("_") + 1;
            //because we also want to handle parenthesis, we are going to slice from this spot in the string, until the end
            if (Ptags[i].innerHTML[start] == "(") {
                // the data starts with open parethesis, thus we will now rip everything from the first parenthesis to the end
                // from there we will find the next applicible parenthesis, and that will be our end val
                var length = start - 2;
                var substring = Ptags[i].innerHTML.slice(start + 1, length - start); // the string of everything we will be using
                substring = substring.slice(0, substring.indexOf(")")); // this is the string of everything within parenthesis
                var remainderstring = Ptags[i].innerHTML.substr(Ptags[i].innerHTML.indexOf(")") + 1)
                substring = "<sub>" + substring + "</sub>";
                var replacement = Ptags[i].innerHTML
                    .substr(0, Ptags[i].innerHTML.indexOf("_")) + substring + remainderstring;
                Ptags[i].innerHTML = replacement;
            }
            else { // handle if there are no parenthesis, just add the sup tags around the next character

                var subchar = Ptags[i].innerHTML[start];
                var origchar = subchar;
                subchar = "<sub>" + subchar + "</sub>"
                var replacement = Ptags[i].innerHTML
                    .replace("_" + origchar, subchar);
                Ptags[i].innerHTML = replacement;
            }
        }
    }
    // yes this is just a copy of the function above, but with li tags taken into account, idc
    for (var i = 0; i < litags.length; i++) {
        // this loop will help us loop through one line, now we need another for loop to go through each occurance in the line
        var occurances = litags[i].innerHTML.count("_");
        litags[i].innerHTML += "  ";
        for (let j = 0; j < occurances; j++) {
            //get position of first availiable carot
            // get the starting position of substring
            var start = litags[i].innerHTML.indexOf("_") + 1;
            //because we also want to handle parenthesis, we are going to slice from this spot in the string, until the end
            if (litags[i].innerHTML[start] == "(") {
                // the data starts with open parethesis, thus we will now rip everything from the first parenthesis to the end
                // from there we will find the next applicible parenthesis, and that will be our end val
                var length = start - 2;
                var substring = litags[i].innerHTML.slice(start + 1, length - start); // the string of everything we will be using
                substring = substring.slice(0, substring.indexOf(")")); // this is the string of everything within parenthesis
                var remainderstring = litags[i].innerHTML.substr(litags[i].innerHTML.indexOf(")") + 1)
                substring = "<sub>" + substring + "</sub>";
                var replacement = litags[i].innerHTML
                    .substr(0, litags[i].innerHTML.indexOf("_")) + substring + remainderstring;
                litags[i].innerHTML = replacement;
            }
            else { // handle if there are no parenthesis, just add the sup tags around the next character

                var subchar = litags[i].innerHTML[start];
                var origchar = subchar;
                subchar = "<sub>" + subchar + "</sub>"
                var replacement = litags[i].innerHTML
                    .replace("_" + origchar, subchar);
                litags[i].innerHTML = replacement;
            }
        }
    }
}
function Symbols() {
    try {
        var cont = document.getElementsByClassName("page-content clearfix");
        var Ptags = cont[0].children[0].querySelectorAll("p");
        var litags = cont[0].children[0].querySelectorAll("li");
        for (let i = 0; i < Ptags.length; i++) {
            var occurances = Ptags[i].innerHTML.count("[");
            for (let j = 0; j < occurances; j++) {
                // for every occurance of "["
                var symbolstring = Ptags[i].innerHTML.slice(Ptags[i].innerHTML.indexOf("[") + 1, Ptags[i].innerHTML.indexOf("]"));
                for (let k = 0; k < SymbolName.length; k++) {
                    if (SymbolName[k].toLowerCase() == symbolstring.toLowerCase()) {
                        //now we know what symbol it is, now we just perform the operation
                        Ptags[i].innerHTML = Ptags[i].innerHTML.replace("[" + symbolstring + "]", SymbolSymbol[k]);
                    }

                }
            }
        }
        for (let i = 0; i < litags.length; i++) {
            var occurances = litags[i].innerHTML.count("[");
            for (let j = 0; j < occurances; j++) {
                // for every occurance of "["
                var symbolstring = litags[i].innerHTML.slice(litags[i].innerHTML.indexOf("[") + 1, litags[i].innerHTML.indexOf("]"));
                for (let k = 0; k < SymbolName.length; k++) {
                    if (SymbolName[k].toLowerCase() == symbolstring.toLowerCase()) {
                        //now we know what symbol it is, now we just perform the operation
                        litags[i].innerHTML = litags[i].innerHTML.replace("[" + symbolstring + "]", SymbolSymbol[k]);
                    }

                }
            }
        }
    } catch (error) {
        console.log("symbols failed")
    }

}
var SymbolSymbol = [
    '??',
    '??',
    '??',
    '??',
    '??',
    '??',
    '??',
    '??',
    '???',
    '??',
    '??',
    '???'
]
var SymbolName = [
    "Alpha",
    "Beta",
    "Gamma",
    "Delta",
    "Pi",
    "Theta",
    "Omega",
    "Lambda",
    "Int",
    "Sigma",
    "Epsilon",
    "Ininity"
]
function TextFixes() {
    Symbols();
    Carot();
    Underscore();
    NumberNames();
}
function UpdatePage() {
    document.innerHTML += "<style>::-webkit-scrollbar {width: 5px;}img .Fixed-Image- :hover {cursor: pointer;}::-webkit-scrollbar-thumb {background: #c3c3c3;border-radius: 7px;}</style>"
    //EnumOptions();
    AddWebPrev();
    TextFixes();
}
function AddWebPrev() {
    PrepareTags();
    AddPreview();
}
function OpenUrl(url) {
    window.open(url, '_blank');
}
function PrepareTags() {
    try {
        var cont = document.getElementsByClassName("page-content clearfix")
        var Atags = cont[0].children[0].querySelectorAll("a")
        for (let i = 0; i < Atags.length; i++) {
            if (Atags[i].href.endsWith(".png") || Atags[i].href.endsWith(".jpg") ||
                Atags[i].href.endsWith(".jpeg") || Atags[i].href.endsWith(".webm") ||
                Atags[i].href.endsWith(".gif") || Atags[i].href.endsWith(".svg")) {
                var Preserve = Atags[i].href;
                try {
                    var W = Atags[i].children[0].width;
                    var H = Atags[i].children[0].height;
                }
                catch {
                    console.log("There seems to be no height and width data")
                }
                Atags[i].insertAdjacentHTML('afterend', "<img class='Fixed-Image-' src=" + Preserve + " onclick='OpenUrl(" + '"' + Preserve + '"' + ");' Width = " + W + "  Height = " + H + ">");
                Atags[i].remove();
            }
        }
        var Imgs = cont[0].children[0].querySelectorAll("img");
        for (let j = 0; j < Imgs.length; j++) {
            Imgs[j].style.cursor = "pointer";
        }
    }
    catch { console.log("Img Conversion Failed") }
}
function AddPreview() {
    try {
        var cont = document.getElementsByClassName("page-content clearfix")
        var Atags = cont[0].children[0].querySelectorAll("a")
        for (let i = 0; i < Atags.length; i++) {
            var link = Atags[i].href;
            Atags[i].className = "intext";
            Atags[i].insertAdjacentHTML('afterend', "<div class='previewbox'><iframe src=" + link + " width=100%; height=500px></iframe></div><style>.previewbox{display: none;width: 100%;}a.intext:hover + .previewbox,.previewbox:hover{display: block;position: relative;z-index: 100;margin-top:-5px;}</style>");
        }
    }
    catch { console.log("Looks like there are no a tags to fix here") }
}
window.onload = (event) => { UpdatePage(); };
