//$(document).ready(function(){
    $.fn.serializeObject = function()
{
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
}

var b
var atosL = 0
//var atos = {atos: {}}
var atos = {atos: []}
//var atosReference = []

function gather(a){
    event.preventDefault()
    json = $('form').serializeObject()
    b = json
    if(json.title == "") {
        return false
    }
    //console.log(json)
    ref = (!editing)? atosL++ : eIndex
    atos.atos[ref] = json
    updateAto(ref)
    //$('#json').text(JSON.stringify(json))
    toml = tomlify(atos,null,2)
    //console.log(toml)
    console.log(JSON.stringify(atos))
    //$('#json')[0].innerText = JSON.stringify(atos)
    //$("#text").value = JSON.stringify(atos)
    //$('#toml').text(toml)
    newAto()
}

function doneLanding(form) {
    event.preventDefault()
    /*date = new Date()
    console.log(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())*/
    date = $("#lDate")[0].value
    issue = parseInt($("#lIssue")[0].value)
    if(date == "" || isNaN(issue) || issue <= 0) {
        return false
    }
    atos.date = date
    atos.issue = issue
    $("#landing")[0].remove()

}

function updateAto(ref){
    //atosReference.push(ref)
    ato = (!editing)? document.createElement("div") : $('#atoL' + eIndex)[0]
    if(!editing) {
        ato.setAttribute("class","atosList")
        ato.setAttribute("id","atoL" + ref)
        ato.setAttribute("data-in", ref)
        ato.setAttribute("onclick","atoClick(this)")
        ato.setAttribute("ondragstart", "handledrag(event)")
        ato.setAttribute("ondragend", "handledrag2(event)")
    }
    ato.innerText = atos.atos[ref].title
    if(!editing)
        $("#atosHolder")[0].append(ato)
    else {
        editing = false
        eIndex = null
    }
}

function handledrag(e) {
    console.log('a');
    img = new Image()
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
    console.log(e);
    e.dataTransfer.setDragImage(img,0,0)
    e.srcElement.classList.add('dragging')
        e.srcElement.classList.remove('atosList')
}
function handledrag2(e) {
    e.srcElement.classList.remove('dragging')
    e.srcElement.classList.add('atosList')
}
function atoClick(el){
    ref = parseInt(el.getAttribute("data-in"))
    for(f in atos.atos[ref]){
        if(f == 'date') continue
        $("#" + f)[0].value = atos.atos[ref][f]
    }
    editing = true
    eIndex = ref
}

function newAto() {
    $('form').empty()
    createForm()
}

function sendJson() {
    var request = new XMLHttpRequest();
    request.onload = function () {
        var status = request.status; 
        var data = this.responseText;
        console.log(data)
        alert(data)
    }
    request.open("POST", "/generate", 1);
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(atos))
}
