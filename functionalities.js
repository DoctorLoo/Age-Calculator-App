let button = document.querySelector("[type=\"submit\"]");

button.onclick = function (event) {
    let condition = true;


    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {

        if (input.value === "") {
            condition = false;
            input.parentElement.classList.remove("non-empty-column");
            input.parentElement.classList.add("empty-column");
            let text = document.createTextNode("This field is required");
            let paraInEmptyColumns = document.querySelectorAll(".empty-column > .empty");
            paraInEmptyColumns.forEach((para) => {
                if (para.innerText === "" || para.innerHTML !== "This field is required") {
                    para.innerHTML = "";
                    para.appendChild(text);
                }
            });

        } else {
            input.parentElement.classList.remove("empty-column");
            input.parentElement.classList.add("non-empty-column")
            let paraInEmptyColumns = document.querySelectorAll(".non-empty-column > .empty");
            paraInEmptyColumns.forEach((para) => {
                para.innerHTML = "";
            });


        }

    });


    let a = new Date();


    let elements = ["day", "month", "year"];
    let validDatesMax = [31, 12, a.getFullYear()];
    let validDateMin = [0, 0, 1900];
    for (let i = 0; i < elements.length; i++) {
        let inputColumn = document.querySelector(`.column-${elements[i]} > input`);

        if (Number.isNaN(Number(inputColumn.value)) || inputColumn.value < validDateMin[i] || inputColumn.value > validDatesMax[i]) {
            inputColumn.parentElement.classList.remove("empty-column");
            inputColumn.parentElement.classList.remove("non-empty-column");
            condition = false;
            inputColumn.style.borderColor = "hsl(0, 100%, 67%)";
            let text = document.createTextNode(`Must be a valid ${elements[i]}`);
            let p = document.querySelector(`.column-${elements[i]} > p`);
            if (p.innerText === "") {
                p.appendChild(text);
            }
            document.querySelector(`.column-${elements[i]} > label`).style.color = "hsl(0, 100%, 67%)";

        }
    }

    if (condition) {
        let year = document.querySelector("[id=\"year\"]").value;
        let month = document.querySelector("[id=\"month\"]").value;
        let day = document.querySelector("[id=\"day\"]").value;


        let dayAnswer, monthAnswer, yearAnswer;

        let dayNow = a.getDate();
        let monthNow = a.getMonth();
        let yearNow = a.getFullYear();

        yearAnswer = yearNow - year;

        if (monthNow === month) {
            monthAnswer = 0;

        } else if (monthNow < month) {
            monthAnswer = 12 - (month - monthNow);
            yearAnswer -= 1;
        } else {
            monthAnswer = monthNow - month;
        }

        if (dayNow === day) {
            dayAnswer = 0;
        } else if (dayNow < day) {
            dayAnswer = 31 - (day - dayNow);
            if (monthNow === month)
                yearAnswer -= 1;
        } else {
            dayAnswer = dayNow - day;
        }

        let arr = [dayAnswer, monthAnswer, yearAnswer];
        let classes = ["days", "months", "years"];
        for (let i = 0; i < arr.length; i++) {
            let text = document.createTextNode(`${arr[i]}`);
            let Span = document.querySelector(`[class=\"${classes[i]}\"]`);
            Span.innerHTML = "";

            Span.appendChild(text);
        }
    }


}


