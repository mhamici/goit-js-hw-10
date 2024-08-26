import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();

    const delayInput = document.querySelector('input[name="delay"]').value;
    const stateInput = document.querySelector('input[name="state"]:checked').value;
    const delay = parseInt(delayInput);

    createPromise(delay, stateInput)
        .then(message => {
            iziToast.success({
                title: 'Success',
                message: message
            });
        })
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: error
            });
        });
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    });
}
