const nomPropietario = document.querySelector("#nombre");
const pagina = document.querySelector("#pagina");
const reporPagina = document.querySelector("#repoPagina");


$('form').on('submit', function(ev) {
    ev.preventDefault();

    const valNomProp = nomPropietario.value;
    const valPagina = pagina.value;
    const valRepoPagina = repoPagina.value;

    getUser(valNomProp);
    getRepos(valNomProp);

});

async function getRepos(username) {
    const repos = await request(`${username}/repos`);

    const link = `https://github.com/${username}/`;

    $("#linkRepo").html("");

    for (valRepo of repos) {
        let enlace = link.concat(valRepo.name);

        $("#linkRepo").append(`<li class="list-group-item" ><a href="${enlace}" target="_blank">${valRepo.name}</a></li>`);
    }

}

async function getUser(username) {
    const valGithubs = await request(username);

    // $("#resultados").append(`https://api.github.com/users/${valNomProp}/repos?page=${valPagina}&per_page=${valRepoPagina}`);

    $("#imgUsuario").attr("src", valGithubs.avatar_url);

    $("#nomUsuario").html("Nombre Usuario: " + valGithubs.name);

    $("#nombreLogin").html("Nombre de login: " + valGithubs.login);

    $("#cantRepositorio").html("Cantidad de Repositorios: " + valGithubs.public_repos);

    $("#localidad").html("Localidad: " + valGithubs.location);

    $("#tipoUsuario").html("Tipo de usuario: " + valGithubs.type)

}

async function request(path) {

    try {

        //Obtener los datos del Usuario
        const urlGithub = `https://api.github.com/users/${path}`;
        const datos = await fetch(urlGithub);
        const valGitHubs = await datos.json();
        // console.log(valGitHubs);
        return valGitHubs

    } catch (e) {
        console.log("Se ha producido el siguiente error: " + e);
    }
}