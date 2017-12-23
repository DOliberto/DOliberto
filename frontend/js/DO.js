DO = {
    atosL: 0,
    atos: {atos: []},
    csv: null,
    ref: undefined,
    eIndex: undefined,
    serverURL: "http://localhost:8080", //"http://104.197.105.228:8888",

    updateJSON: function () {
        event.preventDefault();
        var json = DO.serializeObject($('form'));
        if(json.title === "") {
            return false;
        }
        json.text = json.text.replace(/\r\n/g, "\n");
        json.csv = DO.csv;
        DO.csv = null;
        DO.ref = (!UI.editing) ? DO.atosL++ : DO.eIndex;
        DO.atos.atos[DO.ref] = json;
        UI.updateSidebarList(DO.ref);
        UI.newAto();
    },

    sendJson: function () {
        var header = new Headers();
        header.set('Content-type', 'application/json');
        var init = {
            "method": "POST",
            "headers": header,
            "body": JSON.stringify(DO.atos)
        };

        fetch(DO.serverURL + '/generate/doli', init)
            .then(function(resp){return resp.blob()})//.then(resp => resp.blob())   // So my IDE doesn't freak out
            .then(DO.showPDF);
    },

    showPDF: function (blob) {
        var data = new Blob([blob], {type: "application/pdf"});
        var url = window.URL.createObjectURL(data);
        var iframe = document.createElement('object');
        iframe.data = url;
        iframe.type = "application/pdf";
        iframe.width = "900px";
        iframe.height = window.innerHeight - 60 + "px";
        $.magnificPopup.open({items:{src:"<div id='cont'/>",type:'inline'}})
        $("#cont")[0].appendChild(iframe);
        //var link = document.createElement('a');
        //link.href = url;
        //link.target = "_blank";
        //link.rel="noopener noreferrer";
        //link.click();

        setTimeout(function(){
            window.URL.revokeObjectURL(data);
        }, 100);
    },

    doneLanding: function () {
        event.preventDefault();
        /*date = new Date()
        console.log(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())*/
        var date = $("#lDate")[0].value;
        var issue = parseInt($("#lIssue")[0].value);
        if (date === "" || isNaN(issue) || issue <= 0) {
            return false;
        }
        DO.atos.date = date;
        DO.atos.issue = issue;
        $("#landing")[0].remove();
    },

    serializeObject: function(obj) {
        var o = {};
        var a = obj.serializeArray();
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
};