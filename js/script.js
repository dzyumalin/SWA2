'use strict';

document.addEventListener('DOMContentLoaded', function() {

    let setSelector = (selector) => {   // Получение всех селекторов с помощью ф-ии
        return document.querySelector(selector);
    };

    let section = setSelector('section'),
        header = setSelector('header'),
        h1 = document.createElement('h1'),
        itsDiv = document.createElement('div'),
        fileInput = setSelector('#input__file');
    
    fileInput.addEventListener('change', function (e) { 
    
        let file = fileInput.files[0]; // Псевдомассив выбранных файлов. В данном случае файл 1
        let reader = new FileReader(); // Объект позволит прочитать содержимое файлов
        reader.readAsText(file); // Получим строку
        reader.onload = function() {   // Файл прочитан
            let jsonOutput = JSON.parse(reader.result); // Разбиваем строку json
            headerNames(jsonOutput);
            sectionFields(jsonOutput);
            console.log(jsonOutput);
        };
    
    });
    
    let headerNames = (jsonObject) => { // Создадим тег h1 с элементом name из файла json
        h1.textContent = jsonObject['name']; 
        header.appendChild(h1);
    };

    let sectionFields = (jsonObject) => {   // Создадим секции массива fields с его элементами
        let fields = jsonObject['fields'],
            references = jsonObject['references'],
            buttons = jsonObject['buttons'],
            itsButton = document.createElement('button');
    
        for (let a = 0; a < fields.length; a++) {
            let itsP = document.createElement('p'),
                itsInput = document.createElement('input');

                itsDiv = document.createElement('div');
                itsP.textContent = fields[a].label;

                let input = fields[a].input;
                itsInput.placeholder = input.placeholder || ' ';
                itsInput.type = input.type;
            
                itsDiv.appendChild(itsP);
                itsDiv.appendChild(itsInput);
                section.appendChild(itsDiv);
        }

        if (!references) {
                return false;
        } else {
            for (let j = 0; j < references.length; j++) {
                let itsReferences = document.createElement('input');
                    itsReferences.innerText = references[j].text;
                    itsReferences.type = references[j].type;
                    itsReferences.required = references[j].required;
                    itsReferences.checked = references[j].checked;
                    itsReferences.ref = references[j].ref;
                    itsDiv.appendChild(itsReferences);
                    section.appendChild(itsDiv);
                    console.log(itsReferences);
            }   
        }
        
        for (let i = 0; i < buttons.length; i++) {
            itsButton.innerText = buttons[i].text;
            itsDiv.appendChild(itsButton); 
        }
    };
});