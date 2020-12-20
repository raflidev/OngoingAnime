<template>
  <div id="app">
    <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link to="/">
          <a class="navbar-brand">OnGoing</a>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <router-link tag="li" class="nav-item" active-class="active" to="/" exact
              ><a class="nav-link">Beranda</a></router-link
            >
            <router-link tag="li" class="nav-item" active-class="active" to="about" exact
              ><a class="nav-link">About</a></router-link
            >
          </ul>
          <li>
            <div class="custom-control custom-switch mt-2">
              <input
                type="checkbox"
                @click="darkMode()"
                class="custom-control-input"
                id="darkSwitch"
              />
              <label class="custom-control-label" for="darkSwitch"
                >Dark Mode</label
              >
            </div>
          </li>
        </div>
      </div>
    </nav>
    <div class="container mt-3">
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap");
body {
  font-family: "Montserrat", sans-serif !important;
  list-style-type: none;
}
.active > .nav-link {
  border-bottom: 2px solid red;
}
[data-theme="dark"] {
  background-color: #111 !important;
  color: white;
}
[data-theme="dark"] .bg-light {
  background-color: #1d2024 !important;
}
[data-theme="dark"] .bg-white {
  background-color: #1d2024 !important;
}
[data-theme="dark"] .card {
  background-color: #1d2024 !important;
}
[data-theme="dark"] .bg-dark {
  background-color: #ededed !important;
}
[data-theme="dark"] .navbar-light .navbar-brand {
  color: white !important;
}
[data-theme="dark"] .text-dark {
  color: white !important;
}
[data-theme="dark"] a.text-dark:hover {
  color: white !important;
}
[data-theme="dark"] .nav-link{
  color: white !important;
}
[data-theme="dark"] li.list-group-item{
  color: #000 !important;
}
[data-theme="dark"] .navbar-light .navbar-toggler {
  color: rgba(255, 255, 255, 0.5) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}
li.list-group-item:hover{
  background-color:#007bff;
  color:#fff!important
}
</style>
<script>
export default {
  name: "app",
  mounted() {
    if (localStorage.darkSwitch) {
      var darkSwitch = document.getElementById("darkSwitch");
      localStorage.setItem("darkSwitch", "dark");
      var darkThemeSelected =
        localStorage.getItem("darkSwitch") !== null &&
        localStorage.getItem("darkSwitch") === "dark";
      darkSwitch.check = darkThemeSelected
        ? document.body.setAttribute("data-theme", "dark")
        : document.body.removeAttribute("data-theme");
      if (!darkSwitch.checked) {
        darkSwitch.checked = true;
      }
    }
  },
  methods: {
    darkMode() {
      var darkSwitch = document.getElementById("darkSwitch");
      localStorage.setItem("darkSwitch", "dark");
      var darkThemeSelected =
        localStorage.getItem("darkSwitch") !== null &&
        localStorage.getItem("darkSwitch") === "dark";
      darkSwitch.check = darkThemeSelected
        ? document.body.setAttribute("data-theme", "dark")
        : document.body.removeAttribute("data-theme");
      darkSwitch.addEventListener("change", function() {
        if (darkSwitch.checked) {
          document.body.setAttribute("data-theme", "dark");
          localStorage.setItem("darkSwitch", "dark");
        } else {
          document.body.removeAttribute("data-theme");
          localStorage.removeItem("darkSwitch");
        }
      });
    },
  },
};
</script>
