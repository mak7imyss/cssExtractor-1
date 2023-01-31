const $ = (selector, event, callback) =>{
    let selectors = document.querySelectorAll(selector);
    let len = selectors.length;
    const cssSet = new Set()
    for(let i=0; i<len; ++i){
        if(event){
            cssSet.add(selectors[i].addEventListener(event, (e)=>callback(e, selectors[i])).toString());
        }else{
            cssSet.add(callback(selectors[i]).toString());
        }
    }
    var cssBlob = new Blob([[...cssSet].join('\n')], { type: "text/css" });
    var downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(cssBlob);
    downloadLink.download = "style.css";
    downloadLink.click();
}
function cssExtract(el) {
    var sheets = document.styleSheets, ret = [];
    for (var i in sheets) {
        var rules = sheets[i].rules || sheets[i].cssRules;
        for (var r in rules) {
            if (el.matches(rules[r].selectorText)) {
                ret.push(rules[r].cssText);
            }
        }
    }
    return ret;
}
$('div', null, cssExtract);
