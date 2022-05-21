// Impede alguns erros fáceis de cometer.
"use strict";

/* ------------------------------------------------------------------------- */
/*                                                INICIALIZAÇÃO DA APLICAÇÃO */
/* ------------------------------------------------------------------------- */

window.addEventListener("DOMContentLoaded", principal);

/* ------------------------------------------------------------------------- */

/**
 * Primeira função a ser executada após o browser completar o carregamento
 * de toda a informação presente no documento HTML.
 */
function principal() {
    if(isLoggedIn()){
        $('#frmLogin').hide();
        $('.modos_jogo').show();
    document.getElementById('username').innerHTML = JSON.parse(sessionStorage.getItem('user'));
    let tema = JSON.parse(sessionStorage.getItem("theme"));
    console.log(tema);
    if(tema === "lightTheme"){
        $("body").addClass("darkTheme");
    }else if (tema == "darkTheme"){
        $('body').addClass("darkTheme");

    }

    document.getElementById('username').setAttribute('href', 'user.html');

    }else{
      $(".modos_jogo").hide();
        document.getElementById('username').innerHTML = "Login";
        document.getElementById('username').setAttribute('href', 'index.html');

    }

    /**Função que verifica se o utilizador está autenticado ou seja se existe registro no sessionStorage
     *
     * @returns {boolean}
     */
    function isLoggedIn(){
        var response =  false;
        if(!(sessionStorage.getItem("user") == undefined)){
        response = true;
        }
        return response;
    }

}