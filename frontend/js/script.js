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

function gather(a){
    event.preventDefault()
    json = $('form').serializeObject()
    //console.log(json)
    atos.Atos["Ato" + atosL++] = json
    //$('#json').text(JSON.stringify(json))
    toml = tomlify(atos,null,2)
    console.log(toml)
    //$('#toml').text(toml)
}