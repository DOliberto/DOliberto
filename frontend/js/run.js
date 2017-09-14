$(function() {
    //return
    for(i=0;i<dropInput.getConfig().formStructure.length;i++)
        createElement(dropInput.getConfig().formStructure[i])
})

createElement = function(element) {
    attr = dropInput.getConfig().inputAttr[element.internalType]
    el = document.createElement(attr.fixed[0][1])
    
    for(j=1;j<attr.fixed.length;j++)
        el.setAttribute(attr.fixed[j][0], attr.fixed[j][1])    
    
    for(j=0;j<attr.dynamic.length;j++)
        el.setAttribute(attr.dynamic[j][0], element[attr.dynamic[j][1]])
    
    el2 = document.createElement("div")
    el2.setAttribute("class", "drop")
    el2.setAttribute("id", "drop_" + element.elementId)
    
    el3 = document.createElement("br")
    el4 = document.createElement("br")
    
    $("form")[0].append(el)
    $("form")[0].append(el2)
    $("form")[0].append(el3)
    $("form")[0].append(el4)
}