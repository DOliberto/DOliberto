var UI = {
    editing: 0,

    newAto: function () {
        $('form').empty();
        UI.editing = false;
        UI.createForm();
    },

    setUpCSVUploader: function () {
        function dragenter(e) {
            e.stopPropagation();e.preventDefault();
            e.target.classList.add('over');
        }
        function dragleave(e) {
            e.stopPropagation();e.preventDefault();
            e.target.classList.remove('over');
        }
        function dragover(e) {
            e.stopPropagation();e.preventDefault();
        }
        function ondrop(e) {
            e.stopPropagation();e.preventDefault();
            e.target.classList.remove('over');

            var dt = e.dataTransfer;
            var files = dt.files;

            var reader = new FileReader();
            reader.onload = function(e){csv = e.target.result};
            reader.readAsText(files[0]);

            $.magnificPopup.close();
            //handleFiles(files);
        }
        var drop = document.getElementById("drop");
        drop.addEventListener("dragenter", dragenter, false);
        drop.addEventListener("dragleave", dragleave, false);
        drop.addEventListener("dragover", dragover, false);
        drop.addEventListener("drop", ondrop, false);
        $('#upCSV').magnificPopup({
            items: {
                src: "#csvDialog",
                type: 'inline',
                closeBtnInside: true
            }
        })
    },

    createForm: function () {
    for(var i = 0; i < dropInput.getConfig().formStructure.length; i++)
        UI.createElement(dropInput.getConfig().formStructure[i])
    },

    createElement: function (element) {
        var attr = dropInput.getConfig().inputAttr[element.internalType];
        var el = document.createElement(attr.fixed[0][1]);

        for(var j = 1; j < attr.fixed.length; j++)
            el.setAttribute(attr.fixed[j][0], attr.fixed[j][1]);

        for( j = 0; j < attr.dynamic.length; j++)
            el.setAttribute(attr.dynamic[j][0], element[attr.dynamic[j][1]]);

        var el2 = document.createElement("div");
        el2.setAttribute("class", "drop");
        el2.setAttribute("id", "drop_" + element.elementId);

        var el3 = document.createElement("br");
        var el4 = document.createElement("br");

        var mainForm = $("#mainForm")[0];
        mainForm.append(el);
        mainForm.append(el2);
        mainForm.append(el3);
        mainForm.append(el4);
    },

    makeSortable: function () {
        Sortable.create($('#atosHolder')[0], {
            onStart: function(evt){
                var img = new Image();
                img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                //evt.dataTransfer.setDragImage(img,0,0)
                //console.log(evt)
            },
            onUpdate: function(evt){
                console.log(evt);
                for(var i=0;i<atosL;i++){
                    //console.log($('.atosList')[i].getAttribute('data-in'))
                    continue
                }

                return;
                var o = evt.oldIndex;
                var n = evt.newIndex;
                atos.atos.splice(n,0, atos.atos[o]);
                atos.atos.splice(o,1);
                var l = Math.min(o, n);
                var h = Math.max(o, n);
                var d;
                if (n < o) {
                    d = 1;
                    //console.log($('.atosList')[l].getAttribute('data-in'))
                    $('.atosList')[l].setAttribute('data-in', n);
                    l += 1
                }
                else {
                    d = -1;
                    //console.log($('.atosList')[h].getAttribute('data-in'))
                    $('.atosList')[h].setAttribute('data-in', n);
                    h -= 1
                }
                var a;
                for (i = l; i < h; i++) {
                    a = $('.atosList')[i];
                    a.setAttribute('data-in', parseInt(a.getAttribute('data-in')) + d)
                }
            }
        })
    }
};

$(function () {      // run on load
    UI.createForm();
    UI.setUpCSVUploader();
    //UI.makeSortable()
});
