'use strict';

let body = document.querySelector('body'),
    block = document.createElement('block');

    block.className = "resume"
    body.appendChild(block);
    
    const request = new XMLHttpRequest();
        request.open('GET', 'js/json/interview.json', false);
        request.send();
    const interview = JSON.parse(request.responseText);
    
    let title = document.createElement('h1');
    title.className = "resume__title";
    title.textContent = interview.name;
    block.appendChild(title);
    
    let fields = interview.fields;

    for (let i = 0; i < fields.length; i++) { 
        let label = document.createElement('label'),
            input = document.createElement('input'),
            subTitle = document.createElement('p');

        label.className = "resume__label";
        input.className = "resume__input";
        subTitle.textContent = fields[i].label;
        input.type = fields[i].input.type;

    if (input.type === "number")   { 
        input.type = "text";
        input.id = fields[i].input.type + `${i}`;
        $(function(){
            $("#number"+ `${i}`).mask(fields[i].input.mask); 
        });
    }

    input.required = fields[i].input.required;

    if ((input.placeholder = fields[i].input.placeholder) === undefined)  {
        input.placeholder = "";
    }
    
    input.filetype = fields[i].input.filetype;

    if ("technologies" in fields[i].input)  {
    } else if(fields[i].input.type == "file")   {
        input.className = "resume__input-file";
        block.appendChild(label);
        label.appendChild(subTitle);
        label.appendChild(input);
    } else{
        block.appendChild(label);
        label.appendChild(subTitle);
        label.appendChild(input);
    }
}
