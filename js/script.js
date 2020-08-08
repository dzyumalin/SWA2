'use strict';

document.addEventListener('DOMContentLoaded', function() {

    let section = document.querySelector('section'),
        header = document.querySelector('header'),
        h1 = document.createElement('h1'),
        div = document.createElement('div'),
        fileInput = document.querySelector('#input__file');
    
    fileInput.addEventListener('change', function (event) { // Получаем файл
    
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

    let sectionFields =(jsonObject) => {   // Создадим секции массива fields с его элементами
        let fields = jsonObject['fields'],
            references = jsonObject['references'],
            buttons = jsonObject['buttons'],
            myButton = document.createElement('button');
    
        for (let elements = 0; elements < fields.length; elements++) {
            let p = document.createElement('p'),
                input = document.createElement('input');

                div = document.createElement('div');
                p.textContent = fields[elements].label;
                input.placeholder = input.placeholder || ' ';
                section.appendChild(div);
                div.appendChild(p);
                div.appendChild(input);
        }
        for (let i = 0; i < fields.length; i++) {
            myButton.innerText = buttons[i].text;
            div.appendChild(myButton); 
        }
    };
});