$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

var atosL = 0;
var atos = {atos: []};
var csv = null;
var ref;
var eIndex;

function updateJSON(){
    event.preventDefault();
    var json = $('form').serializeObject();
    if(json.title === "") {
        return false;
    }
    json.text = json.text.replace(/\r\n/g, "\n");
    json.csv = csv;
    csv = null;
    ref = (!UI.editing) ? atosL++ : eIndex;
    atos.atos[ref] = json;
    updateAto(ref);
    UI.newAto();
}

function doneLanding() {
    event.preventDefault();
    /*date = new Date()
    console.log(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())*/
    var date = $("#lDate")[0].value;
    var issue = parseInt($("#lIssue")[0].value);
    if (date === "" || isNaN(issue) || issue <= 0) {
        return false;
    }
    atos.date = date;
    atos.issue = issue;
    $("#landing")[0].remove();
}

function updateAto(ref){
    var ato = (!UI.editing) ? document.createElement("div") : $('#atoL' + eIndex)[0];
    if (!UI.editing) {
        ato.setAttribute("class","atosList");
        ato.setAttribute("id","atoL" + ref);
        ato.setAttribute("data-in", ref);
        ato.setAttribute("onclick","atoClick(this)");
        ato.setAttribute("ondragstart", "handledrag(event)");
        ato.setAttribute("ondragend", "handledrag2(event)");
    }
    ato.innerText = atos.atos[ref].title;
    if (!UI.editing) {
        $("#atosHolder")[0].append(ato);
    } else {
        UI.editing = false;
        eIndex = null;
    }
}

function handledrag(e) {
    var img = new Image();
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    e.dataTransfer.setDragImage(img,0,0);
    e.srcElement.classList.add('dragging');
    e.srcElement.classList.remove('atosList');
}

function handledrag2(e) {
    e.srcElement.classList.remove('dragging');
    e.srcElement.classList.add('atosList');
}
// noinspection JSUnusedGlobalSymbols
function atoClick(el){
    ref = parseInt(el.getAttribute("data-in"));
    for (var f in atos.atos[ref]) {
        if (f === 'date') continue;
        $("#" + f)[0].value = atos.atos[ref][f];
    }
    UI.editing = true;
    eIndex = ref;
}

serverURL = "http://localhost:8888"; //"http://104.197.105.228:8888"; 
function sendJson() {
    var header = new Headers();
    header.set('Content-type', 'application/json');
    var init = {
        "method": "POST",
        "headers": header,
        "body": JSON.stringify(atos)
    };
    
    fetch(serverURL + '/generate/doli', init)
        .then(function(resp){return resp.blob()})//.then(resp => resp.blob())   // So my IDE doesn't freak out
        .then(preview);
}

function preview(blob){
    var data = new Blob([blob], {type: "application/pdf"});
    var url = window.URL.createObjectURL(data);
    var link = document.createElement('a');
    link.href = url;
    link.target = "_blank";
    link.rel="noopener noreferrer";
    link.click();
  
    setTimeout(function(){
        window.URL.revokeObjectURL(data);
    }, 100);
}