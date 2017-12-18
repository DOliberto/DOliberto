$(
    function(){
        var drop = document.getElementById("drop");
        drop.addEventListener("dragenter", dragenter, false);
        drop.addEventListener("dragleave", dragleave, false);
        drop.addEventListener("dragover", dragover, false);
        drop.addEventListener("drop", ondrop, false);
        function dragenter(e) {
            e.stopPropagation();
            e.preventDefault();
            e.target.classList.add('over');
        }

        function dragleave(e) {
            e.stopPropagation();
            e.preventDefault();
            e.target.classList.remove('over');
        }

        function dragover(e) {
            e.stopPropagation();
            e.preventDefault();
        }
        function ondrop(e) {
            e.stopPropagation();
            e.preventDefault();
            e.target.classList.remove('over');

            var dt = e.dataTransfer;
            var files = dt.files;

            console.log(files.length);

            var reader = new FileReader();
            reader.onload = function(e){csv = e.target.result};
            reader.readAsText(files[0]);

            $.magnificPopup.close();
            //handleFiles(files);
        }
        $('#upCSV').magnificPopup({
            items: {
                src: "#csvDialog",
                type: 'inline',
                closeBtnInside: true
            }
        })
    }
);


$.fn.serializeObject = function() {
   o = {};
   a = this.serializeArray();
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

atosL = 0;
atos = {atos: []};
var csv = null;

function gather(a){
    event.preventDefault();
    json = $('form').serializeObject();
    if(json.title == "") {
        return false;
    }
    json.text = json.text.replace(/\r\n/g, "\n");
    json.csv = csv;
    csv = null;
    ref = (!editing)? atosL++ : eIndex;
    atos.atos[ref] = json;
    updateAto(ref);
    newAto();
};

function doneLanding(form) {
    event.preventDefault();
    /*date = new Date()
    console.log(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())*/
    date = $("#lDate")[0].value;
    issue = parseInt($("#lIssue")[0].value);
    if (date == "" || isNaN(issue) || issue <= 0) {
        return false;
    }
    atos.date = date;
    atos.issue = issue;
    $("#landing")[0].remove();
};

function updateAto(ref){
    ato = (!editing)? document.createElement("div") : $('#atoL' + eIndex)[0];
    if (!editing) {
        ato.setAttribute("class","atosList");
        ato.setAttribute("id","atoL" + ref);
        ato.setAttribute("data-in", ref);
        ato.setAttribute("onclick","atoClick(this)");
        ato.setAttribute("ondragstart", "handledrag(event)");
        ato.setAttribute("ondragend", "handledrag2(event)");
    }
    ato.innerText = atos.atos[ref].title;
    if (!editing) {
        $("#atosHolder")[0].append(ato);
    } else {
        editing = false;
        eIndex = null;
    };
};

function handledrag(e) {
    img = new Image();
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    e.dataTransfer.setDragImage(img,0,0);
    e.srcElement.classList.add('dragging');
    e.srcElement.classList.remove('atosList');
}

function handledrag2(e) {
    e.srcElement.classList.remove('dragging');
    e.srcElement.classList.add('atosList');
}
function atoClick(el){
    ref = parseInt(el.getAttribute("data-in"));
    for (f in atos.atos[ref]) {
        if (f == 'date') continue
        $("#" + f)[0].value = atos.atos[ref][f];
    }
    editing = true;
    eIndex = ref;
}

function newAto() {
    $('form').empty();
    createForm();
}

function expectCSV() {

}

serverURL = "http://localhost:8888"; //"http://104.197.105.228:8888"; 
function sendJson() {
    header = new Headers();
    header.set('Content-type', 'application/json');
    init = {"method": "POST",
            "headers": header,
            "body": JSON.stringify(atos)};
    
    fetch(serverURL + '/generate/doli', init)
        .then(resp => resp.blob())
        .then(preview);
};

function preview(blob){
    data = new Blob([blob], {type: "application/pdf"});
    url = window.URL.createObjectURL(data);
    link = document.createElement('a');
    link.href = url;
    link.target = "_blank";
    link.rel="noopener noreferrer";
    link.click();
  
    setTimeout(function(){
        window.URL.revokeObjectURL(data);
    }, 100);
};
