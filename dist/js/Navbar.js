app.component('navbar', {

    props: {
        username:{
            type: String,
            default: "default user"
        },




    },


    template:

    /*html*/
    ` 
<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-light red-space">
<div class="container-fluid nav-bar">
  <!--Logo-->
  <a class="navbar-brand pe-2 mb-3" href="principal.html">
    <img src="images/logo.png" alt="home img" /></a>

  <!--Menu Hamburguesa-->
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <!--Menu-->
  <div class="collapse navbar-collapse align-menu align-nav-menu" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ps-lg-5 ms-lg-5">
      <li class="nav-item ps-lg-5 ms-lg-5 pe-lg-5 nav-link">
        <a class="nav-link active text-white" aria-current="page" href="principal.html">Home</a>
      </li>
      <li class="nav-item ps-lg-5 ms-lg-2 pe-lg-5 nav-link">
        <a class="nav-link text-white" href="topRecetas.html">Top recipes</a>
      </li>
      <li class="nav-item ps-lg-5 ms-lg-3 pe-lg-3 nav-link">
        <a class="nav-link text-white" href="verRecetas.html"> Our recipes</a>
      </li>


      <li class="nav-item pe-lg-2 nav-link">
        <a class="navbar-brand nav-link text-white" href="inicio.html">
          <img src="images/user.png" alt="img"class="d-inline-block ms-3 round-img"> Log In
        </a>
      </li>

      <li class="nav-item nav-link">
        <a class="navbar-brand nav-link text-white" href="perfil.html">
          <img src="images/fresa.png" alt="img" class="d-inline-block ms-3 round-img">{{username}}
        </a>
      </li>


      <li class="nav-item ps-lg-3 nav-link">
        <a class="navbar-brand nav-link text-white">
          <span class="nav-bar text-white"  v-on:click="$emit('logout')">Logout</span>
        </a>
      </li>


      <!--Menu Hamburguesa, despliega el menu-->
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><a class="dropdown-item" href="#"></a></li>
        <li><a class="dropdown-item" href="#"></a></li>
        <li>
          <hr class="dropdown-divider" />
        </li>
        <li><a class="dropdown-item" href="#"></a></li>
      </ul>
    </ul>
  </div>
</div>
</nav>

`


})