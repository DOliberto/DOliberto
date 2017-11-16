config = {
    formStructure: [
        {
            elementId: "title",
            internalType: "textInput",
            tip: "Título",
            requiresAfter: null
        },
        {
            elementId: "author",
            internalType: "dropInput",
            tip: "Autor",
            requiresAfter: ["drop", "br"]
        },
        {
            elementId: "role",
            internalType: "dropInput",
            tip: "Cargo do autor",
            requiresAfter: ["drop", "br"]
        },
        {
            elementId: "sec",
            internalType: "dropInput",
            tip: "Secretaria",
            requiresAfter: ["drop", "br"]
        },
        {
            elementId: "text",
            internalType: "largeTextInput",
            tip: "Texto",
            requiresAfter: null
        },
        {
            elementId: "submit",
            internalType: "formSubmit",
            text: "Send",
            requiresAfter: null
        }
    ],

    inputData: {
        sec: [
            "Secretaria 1",
            "Secretaria 2",
            "Secretaria 3",
            "Secretaria 4",
            "Secretaria 5"
        ],
        sec2: [
            "Dardo 1",
            "Cantor 2",
            "Baleia 3",
            "Abobora 4",
            "Teste 5",
            "Teste 6",
        ]
    },

    inputAttr: {
        dropInput: {
            fixed: [
                ["element", "input"],
                ["type", "text"],
                ["class", "dropInput"],
                ["autocomplete", "off"],
                ["oninput", "dropInput.tInput(this.id)"],
                ["onkeydown", "dropInput.keyEO(event)"],
                ["onblur", "dropInput.onBlur(this.id)"]
            ],
            dynamic: [
                ["id", "elementId"],
                ["name", "elementId"],
                ["placeholder", "tip"]
            ]
        },
        drop: {
            fixed: [
                ["element", "div"],
                ["class", "drop"],
            ],
            dynamic: [
                ["id", "drop_", "elementId"]
            ]
        },
        textInput: {
            fixed: [
                ["element", "input"],
                ["type", "text"],
                ["autocomplete", "off"]
            ],
            dynamic: [
                ["id", "elementId"],
                ["name", "elementId"],
                ["placeholder", "tip"]
            ]
        },
        largeTextInput: {
            fixed: [
                ["element", "textarea"]
            ],
            dynamic: [
                ["id", "elementId"],
                ["name", "elementId"],
                ["placeholder", "tip"]
            ]
        },
        formSubmit: {
            fixed: [
                ["element", "input"],
                ["type", "submit"]
            ],
            dynamic: [
                ["id", "elementId"],
                ["text", "text"]
            ]
        }
    }
}

dropInput = {
    tInput: function(sId) {
        this.id = sId
        field = this.getField(this.id)[0];
        v = field.value
        if(v == "") {
            this.collapseOptions(this.id)
        }
        else {
            v = v[0].toUpperCase().concat(v.substr(1,v.length-1))
            options = this.createOptions(v)
            if(options.length)
                this.populateOptions(options)
            else
                this.collapseOptions()
        }
    },

    createOptions: function(v) {
        options = []
        data = this.getAllInputs(this.id)
        if(typeof data != 'undefined'){
            for(i=0;i<data.length;i++) {
                if(data[i].indexOf(v) != -1) {
                    o = document.createElement("div")
                    o.setAttribute("class","option")
                    o.innerText = data[i]
                    options.push(o)
                }
            }
        }
        return options
    },

    populateOptions: function(options) {
        drop = $("#drop_" + this.id)
        drop.empty()
        for(i=0;i<options.length;i++){
            if(i == 0 && i != options.length - 1)
                options[i].setAttribute("class", options[i].getAttribute("class")+" top")
            else if(i > 0 && i < options.length - 1)
                options[i].setAttribute("class", options[i].getAttribute("class")+" middle")
            else if(i != 0 && i == options.length - 1)
                options[i].setAttribute("class", options[i].getAttribute("class")+" bottom")
            drop.append(options[i])
        }
        drop[0].style.visibility = "visible"
        this.optionsSelector.resetPos()
        this.optionsSelector.setActive(true)
    },

    collapseOptions: function() {
        drop = $("#drop_" + this.id)
        drop.empty();
        //console.log("#drop_" + this.id)
        drop[0].style.visibility = "hidden"
        this.optionsSelector.resetPos()
        this.optionsSelector.setActive(false)
    },

    keyEO: function(e) {
        k = e.keyCode
        if(k==27)
            this.collapseOptions()
        else if(k==38) {
            e.preventDefault()
            this.optionsSelector.decrease()
        }
        else if(k==40) {
            e.preventDefault()
            this.optionsSelector.increase()
        }
        else if(k==13) {
            e.preventDefault()
            if(this.optionsSelector.pos > -1)
                this.completeSuggestion($(".option")[this.optionsSelector.pos].innerText)
            else
                this.getField(this.id).blur()
        }
    },

    optionsSelector: {
        pos: -1,
        active: false,
        increase: function() {
            if(dropInput.getField(dropInput.id)[0].value.length > 0){
                if(this.pos < dropInput.getAllInputs(dropInput.id).length - 1) {
                    if(this.active && this.pos > -1){
                        this.removeHighlight()
                    }
                    this.pos++
                if(this.active)
                    this.addHighlight()
                }
            }
        },
        decrease: function() {
            if(dropInput.getField(dropInput.id)[0].value.length > 0){
                if(this.pos > 0) {
                    if(this.active)
                        this.removeHighlight()
                    this.pos--
                }
                if(this.active)
                    this.addHighlight()
            }
        },
        addHighlight: function() {
            options = $(".option")
            if(!options[this.pos].classList.contains("hovered"))
                options[this.pos].classList.add("hovered")
        },
        removeHighlight: function() {
            options = $(".option")
            if(this.active) {
                options[this.pos].classList.remove("hovered")
            }
        },
        resetPos: function() {
            this.pos = -1
        },
        setActive: function(b) {
            this.active = b
        }
    },

    globalClick: function(e) {
        if(e.target.id != "")
            this.id = e.target.id
        this.byOutCollapse(e)
        this.tryCompleteSuggestion(e)
    },

    byOutCollapse: function(e) {
        eClass = e.srcElement.getAttribute("class")
        eId = e.srcElement.getAttribute("id")

        if(this.optionsSelector.active){
            if(eClass == null) {
                if(eId != null) {
                    if(eId != this.id)
                        this.collapseOptions()
                }
            }
            else if(eClass.split(" ").indexOf("option") == -1)
                this.collapseOptions()
        }
    },

    tryCompleteSuggestion: function(e) {
        eClass = e.srcElement.getAttribute("class")
        if(eClass == null)
            return
        if(eClass.split(" ").indexOf("option") != -1) {
            this.completeSuggestion(e.srcElement.innerText)
        }
    },

    completeSuggestion: function(sugg) {
        this.getField(this.id)[0].value = sugg
        setTimeout(function(){dropInput.collapseOptions()},50)
    },

    onBlur: function(id) {
        this.collapseOptions()
    },

    getAllInputs: function(id) {
        return this.getConfig().inputData[id]
    },

    getConfig: function() {
        return config
    },

    getField: function(id2) {
        return ($("#" + this.id))
    },

    id: ""
}
