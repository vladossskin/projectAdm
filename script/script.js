"use strict"

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        if (error === 0) {
            form.classList.add('_sending');
            // let response = await fetch('sendmail.php', {
            //     method: 'POST',
            //     body: FormData
            // });
            // if (response.ok) {
            //     let result = await response.json();
            //     alert(result.message);
            //     formPrewiew.innerHTML = '';
            //     form.reset();
            // } else {
            //     alert("Ошибка")
            // }
        } else {
            alert('Заполните обязательные поля');
        }

    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req')

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);


            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }

        }
        return error;

    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    };

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    };
    // Функция теста мыла
    function emailTest(input) {
        return !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value);
    }

});