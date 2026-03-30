(function () {
    var html = document.documentElement;

    function applyStored() {
        if (localStorage.getItem("theme") === "light") {
            html.classList.remove("dark");
        } else {
            html.classList.add("dark");
        }
    }

    applyStored();

    document.addEventListener("DOMContentLoaded", function () {
        var toggles = document.querySelectorAll("#theme-toggle, #theme-toggle-mobile");
        toggles.forEach(function (btn) {
            btn.addEventListener("click", function () {
                html.classList.toggle("dark");
                localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
                if (typeof lucide !== "undefined") lucide.createIcons();
            });
        });

        var menuBtn = document.getElementById("mobile-menu-btn");
        var mobileMenu = document.getElementById("mobile-menu");
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener("click", function () {
                mobileMenu.classList.toggle("hidden");
            });
        }
    });
})();
