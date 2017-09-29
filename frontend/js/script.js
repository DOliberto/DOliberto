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
var atosL = 1
var atos = {Atos: {}}
var atosReference = []

function gather(a){
    event.preventDefault()
    json = $('form').serializeObject()
    //console.log(json)
    ref = "Ato" + atosL++
    atos.Atos[ref] = json
    newAto(ref, atosL-1)
    //$('#json').text(JSON.stringify(json))
    toml = tomlify(atos,null,2)
    //console.log(toml)
    console.log(JSON.stringify(atos))
    $('#json')[0].innerText = JSON.stringify(atos)
    $("#text").value = JSON.stringify(atos)
    //$('#toml').text(toml)
}

function newAto(ref,i){
    atosReference.push(ref)
    ato = document.createElement("div")
    ato.setAttribute("class","atosList")
    ato.setAttribute("id",ref)
    ato.setAttribute("onclick","atoClick(this)")
    ato.innerText = ref + ": " + atos.Atos[ref].titulo
    $("#sidePanel")[0].append(ato)
}

function atoClick(el){
    ref = el.id
    for(f in atos.Atos[ref]){
        $("#" + f)[0].value = atos.Atos[ref][f]
    }

}
