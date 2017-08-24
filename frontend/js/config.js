config = {
    secretarias: [
        "Secretaria 1",
        "Secretaria 2",
        "Secretaria 3",
        "Secretaria 4",
        "Secretaria 5"
    ]
}

$(function() {
    return
    secs = $("#secs")[0]
    for(i=0;i<config.secretarias.length;i++) {
        option = document.createElement("option")
        option.text = config.secretarias[i]
        secs.add(option)
    }
})

secInput = function() {
    d = $("#sec")[0];
    v = d.value
    if(v == "") {
        collapseOptions()
    }
    else {
        v = v[0].toUpperCase().concat(v.substr(1,v.length-1))
        drop = $("#drop")
        drop.empty();
        options = createOptions(v)
        populateOptions(options)
        drop[0].style.visibility = "visible"
    }
}

createOptions = function(v) {
    options = []
    secs = config.secretarias
    for(i=0;i<secs.length;i++) {
        if(secs[i].indexOf(v) != -1) {
            o = document.createElement("div")
            o.setAttribute("class","option")
            o.innerText = secs[i]
            options.push(o)
        }
    }
    return options
}

populateOptions = function(options) {
    for(i=0;i<options.length;i++){
        if(i == 0 && i != options.length - 1)
            options[i].setAttribute("class", options[i].getAttribute("class")+" top")
        else if(i > 0 && i < options.length - 1)
            options[i].setAttribute("class", options[i].getAttribute("class")+" middle")
        else if(i != 0 && i == options.length - 1)
            options[i].setAttribute("class", options[i].getAttribute("class")+" bottom")
        $("#drop").append(options[i])
    }
}

collapseOptions = function(e) {
    drop = $("#drop")
    drop.empty();
    drop[0].style.visibility = "hidden"
}

keyEO = function(e) {
    k = e.keyCode
    console.log(k)
    if(k==27)
        collapseOptions()
}

globalClick = function(e) {
    byOutCollapse(e)
    tryCompleteSuggestion(e)
}

byOutCollapse = function(e) {
    eClass = e.srcElement.getAttribute("class")
    eId = e.srcElement.getAttribute("id")
    
    if(eClass == null) {
        if(eId != null) {
            if(eId != "sec")
                collapseOptions()
        }
    }
    else if(eClass.split(" ").indexOf("option") == -1)
        collapseOptions()
}

tryCompleteSuggestion = function(e) {
    eClass = e.srcElement.getAttribute("class")
    if(eClass == null)
        return
    if(eClass.split(" ").indexOf("option") != -1) {
        completeSuggestion(e.srcElement.innerText)
        
    }
}

completeSuggestion = function(sugg) {
    $("#sec")[0].value = sugg
    setTimeout(function(){collapseOptions()},50)
}