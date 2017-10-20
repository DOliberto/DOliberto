var editing = 0;

$(function() {
    createForm()
    //makeSortable()
})

function createForm() {
    for(i=0;i<dropInput.getConfig().formStructure.length;i++)
        createElement(dropInput.getConfig().formStructure[i])
}

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

    $("#mainForm")[0].append(el)
    $("#mainForm")[0].append(el2)
    $("#mainForm")[0].append(el3)
    $("#mainForm")[0].append(el4)
}

function makeSortable() {
    Sortable.create($('#atosHolder')[0], {
        onStart: function(evt){
            img = new Image()
            img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            //evt.dataTransfer.setDragImage(img,0,0)
            //console.log(evt)
        },
        onUpdate: function(evt){
            console.log(evt)
            for(i=0;i<atosL;i++){
                //console.log($('.atosList')[i].getAttribute('data-in'))
                continue
            }

            return
            o = evt.oldIndex
            n = evt.newIndex
            atos.Atos.splice(n,0, atos.Atos[o])
            atos.Atos.splice(o,1)
            l = Math.min(o,n)
            h = Math.max(o,n)
            if(n < o){
                d = 1
                console.log($('.atosList')[l].getAttribute('data-in'))
                $('.atosList')[l].setAttribute('data-in', n)
                l += 1
            }
            else {
                d = -1
                console.log($('.atosList')[h].getAttribute('data-in'))
                $('.atosList')[h].setAttribute('data-in', n)
                h -= 1
            }
            for(i=l;i<h;i++) {
                a = $('.atosList')[i]
                a.setAttribute('data-in', parseInt(a.getAttribute('data-in')) + d)
            }
        }
    })
}
