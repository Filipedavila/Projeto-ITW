// Impede alguns erros fáceis de cometer.
"use strict";

/* ------------------------------------------------------------------------- */
/*                                                INICIALIZAÇÃO DA APLICAÇÃO */
/* ------------------------------------------------------------------------- */

window.addEventListener("load", principal);

/* ------------------------------------------------------------------------- */

/**
 * Primeira função a ser executada após o browser completar o carregamento
 * de toda a informação presente no documento HTML.
 */
function principal() {

    document.getElementById('username').innerHTML = JSON.parse(localStorage.getItem('user')) || 'Login';

    if (document.getElementById('username').innerHTML != 'Login') {
        document.getElementById('username').setAttribute('href', 'user.html');
    } else {
        document.getElementById('username').setAttribute('href', 'login.html');
    }

}