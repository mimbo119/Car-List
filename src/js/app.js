(function () {
    'use strict'
    //Methods   

    function titleShow() {

        var title = document.getElementsByClassName('title');
        var newTitle = document.createElement('h2');
        var titleName = document.createTextNode('Array of Objects');

        newTitle.appendChild(titleName);
        title[0].appendChild(newTitle);
    }

    function createCarObject() {
        var invalid = document.getElementById('validation');
        var carItem = document.getElementById('item');
        var carModel = document.getElementById('model');
        var carYear = document.getElementById('year');

        if ((carItem.value != null && carItem.value != "" && carItem.value != " " ) && (carModel.value != null && carModel.value != "" && carModel.value != " ") && (carYear.value != null && carYear.value != "")) {
            if(formValidation() === true){

            var newCar = {
                "CAR_NAME": carItem.value,
                "CAR_MODEL": carModel.value,
                "CAR_YEAR": carYear.value
            }
        }
        else {
            invalid.innerHTML = 'Year Not Valid!';
            //showCarList();
        }
            return newCar;
        
        }
         else {
            invalid.innerHTML = 'Fill all the inputs!';
            //showCarList();
            //return undefined;
        }

        showCarList();
    }

    function getLocal() {
        return JSON.parse(localStorage.getItem("carList"));
    }

    function setLocal(arr) {
        localStorage.setItem("carList", JSON.stringify(arr));
    }

    function showCarList(index) {
        var body = document.getElementById('searchContainer')
        var show = document.getElementById('showItem');
        var x = document.getElementById('edit');
        x.style.display = "none";
        show.innerHTML = `<p> Cars Entered: </p>`;
        var carlist = getLocal();
        var newElement = document.createElement("p");
        newElement.classList.add('paragraph');
        var newName = document.createTextNode("Car Name");
        var newName1 = document.createTextNode("Car Model");
        var newName2 = document.createTextNode("Car Year");
        var spans = document.createElement("span");
        var spans1 = document.createElement("span");
        var spans2 = document.createElement("span");

        spans.appendChild(newName);
        newElement.appendChild(spans);
        show.appendChild(newElement);

        spans1.appendChild(newName1);
        newElement.appendChild(spans1);
        show.appendChild(newElement);

        spans2.appendChild(newName2);
        newElement.appendChild(spans2);
        show.appendChild(newElement);

        carlist.forEach(function (cars, index) {
            var newElement = document.createElement("p");
            var newElement2 = document.createElement("p");
            newElement.classList.add('paragraph');
            newElement2.classList.add('paragraph2');
            // var spans = document.createElement("span");
            // var spans1 = document.createElement("span");
            // var spans2 = document.createElement("span");
            var spans3 = document.createElement("span");
            var spans4 = document.createElement("span");
            var spans5 = document.createElement("span");
            var spans6  = document.createElement("span");
            var spans7  = document.createElement("span");
            var editButton = document.createElement('button');
            var editText = document.createTextNode('Edit');
            editButton.setAttribute('id', 'button');
            var deleteButton = document.createElement('button');
            var deleteText = document.createTextNode('Delete');
            deleteButton.setAttribute('id', 'button2');
            var newName = document.createTextNode(Object.keys(cars)[0]);
            var newName1 = document.createTextNode(Object.keys(cars)[1]);
            var newName2 = document.createTextNode(Object.keys(cars)[2]);

            var newTextNode = document.createTextNode(cars.CAR_NAME);
            var newTextNode1 = document.createTextNode(cars.CAR_MODEL);
            var newTextNode2 = document.createTextNode(cars.CAR_YEAR);

            // spans.appendChild(newName);
            // newElement.appendChild(spans);
            // show.appendChild(newElement);
            // spans1.appendChild(newName1);
            // newElement.appendChild(spans1);
            // show.appendChild(newElement);
            // spans2.appendChild(newName2);
            // newElement.appendChild(spans2);
            // show.appendChild(newElement);

            spans3.appendChild(newTextNode);
            newElement2.appendChild(spans3);
            show.appendChild(newElement2);
            spans4.appendChild(newTextNode1);
            newElement2.appendChild(spans4);
            show.appendChild(newElement2);
            spans5.appendChild(newTextNode2);
            newElement2.appendChild(spans5);
            show.appendChild(newElement2);

            editButton.appendChild(editText);
            spans6.appendChild(editButton);
            newElement2.appendChild(spans6);
            show.appendChild(newElement2);
            deleteButton.appendChild(deleteText);
            spans7.appendChild(deleteButton);
            newElement2.appendChild(spans7);
            show.appendChild(newElement2);

            body.appendChild(show);

            editButton.addEventListener("click", function () {
                console.log(index);
                editItem(index);
            });


            deleteButton.addEventListener("click", function () {    
                var carlist = getLocal();
                carlist.splice(index , 1);
                setLocal(carlist);
                showCarList();
            });

        })
       
    }


    function addCars() {
        if (createCarObject()) {
            var car = createCarObject();
            if (getLocal()) {
                var carList = getLocal();
                carList.push(car);
                setLocal(carList);
                showCarList();
            } else {
                var carList = [];
                carList.push(car);
                setLocal(carList);
                showCarList();
            }

            var element = document.querySelectorAll("input");
            element[0].value = "";
            element[1].value = "";
            element[2].value = "";
        }
        else {
            return false;
        }

    }

    function myTrim(x) {
        return x.replace(/^\s+|\s+$/gm,'');
    }

    function editItem(index){
        divShow();
        var invalid = document.getElementById("validation");
        var editcarlist = getLocal();
        var editCar = document.getElementById("editcar");
        var editModel = document.getElementById("editmodel");
        var editYear = document.getElementById("edityear");
        var editSubmit = document.getElementById("submitEdit");

        editCar.setAttribute('value', editcarlist[index].CAR_NAME);
        editModel.setAttribute('value', editcarlist[index].CAR_MODEL);
        editYear.setAttribute('value', editcarlist[index].CAR_YEAR);

        var str = editcar.value;

        console.log(str);

        editSubmit.addEventListener("click", function(){
            var test = myTrim(str);
            console.log(test);

            if ((editCar.value != null && editCar.value != "" && editCar.value != " ") && (editModel.value != null && editModel.value != "" && editModel.value != " ") && (editYear.value != null && editYear.value != "")) {
            editcarlist[index].CAR_NAME = editCar.value;
            editcarlist[index].CAR_MODEL = editModel.value;
            if(formValidation() === true){
            editcarlist[index].CAR_YEAR = editYear.value;
            }
            setLocal(editcarlist);
            //showCarList();
            }
            else{

                invalid.innerHTML = 'Fill all the inputs!';
                showCarList();
            }
        });

        setTimeout(function () {
            document.getElementById('validation').style.display='none';
        }, 5000);

    }

    function divShow() {
        var x = document.getElementById("edit");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
      }

    function displayListItems() {
        var element = document.getElementById('addItemsContainer');
        var newParagraph = document.createElement('p');
        var carItem = document.createElement('input');
        carItem.setAttribute('id', 'item');

        carItem.addEventListener("keypress", function (event) {
            verifyAdd(event);
        });

        var carModel = document.createElement('input');
        carModel.setAttribute('id', 'model');
        carModel.addEventListener("keypress", function (event) {
            verifyAdd(event);

        });


        var carYear = document.createElement('input');
        carYear.setAttribute('id', 'year');
        carYear.addEventListener("keypress", function (event) {
            verifyAdd(event);
        });

        var name = document.createTextNode('Car Name');
        var model = document.createTextNode('Car Model');
        var year = document.createTextNode('Car Release Year');

        element.appendChild(name);
        element.appendChild(carItem);


        //element.appendChild(newParagraph);
        element.appendChild(model);
        element.appendChild(carModel);

        //element.appendChild(newParagraph);
        element.appendChild(year);
        element.appendChild(carYear);
 

    }


    function verifyAdd(event) {
        if (event.key === "Enter") {
            // console.log(event);
            addCars();

        }
    }

    function formValidation(){
        var invalid = document.getElementById("validation");
        // var carName = document.getElementById("item");
        // var carModel = document.getElementById("model");
        var carYear = document.getElementById("year");
        // var editcar = document.getElementById("editcar");
        // var editmodel = document.getElementById("editmodel");
        var edityear = document.getElementById("edityear");

        if (carYear.value > 1500 && carYear.value < 2020) {
            return(true);
        }
        else{
            invalid.innerHTML= 'Year not valid!';
            showCarList();
        }

        if (edityear.value > 1500 && edityear.value < 2020) {
            return(true);
        }
        else{
            invalid.innerHTML= 'Year not valid!';
            showCarList();
            }

        
    }

    
    

    function init() {
        setTimeout(() => {
            titleShow();
            displayListItems();
            showCarList();
           
        }, 300);
        
    }

    init();



})()