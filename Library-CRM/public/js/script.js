document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".login-form");

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.querySelector('input[name="email"]').value.trim();
        const password = document.querySelector('input[name="password"]').value.trim();

        if (email === "" || password === "") {
            alert("Please fill all fields.");
            return;
        }

        const button = document.querySelector("button");

        button.innerHTML = "Logging In...";
        button.disabled = true;

        setTimeout(() => {

            alert("Login Successful");

            window.location.href = "/dashboard";

        }, 1500);

    });
/* ================= Dashboard ================= */

document.addEventListener("DOMContentLoaded", () => {

    // Dashboard Welcome
    if (window.location.pathname.includes("dashboard.html")) {
        console.log("Dashboard Loaded Successfully");
    }

    // Dashboard Cards Animation
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";

        setTimeout(() => {
            card.style.transition = "0.5s";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 200);

    });

    // Logout Button
    const logout = document.querySelector(".logout");

    if (logout) {

        logout.addEventListener("click", (e) => {

            e.preventDefault();

            let confirmLogout = confirm("Are you sure you want to logout?");

            if (confirmLogout) {
                alert("Logged Out Successfully");
                window.location.href = "index.html";
            }

        });

    }

});
/* ================= Add Member ================= */

document.addEventListener("DOMContentLoaded", () => {

    const addForm = document.querySelector('form[action="/add-member"]');

    if(addForm){

        addForm.addEventListener("submit", function(e){

            e.preventDefault();

            const name = document.querySelector('input[name="name"]').value.trim();
            const email = document.querySelector('input[name="email"]').value.trim();
            const phone = document.querySelector('input[name="phone"]').value.trim();

            if(name === "" || email === "" || phone === ""){
                alert("Please fill all required fields.");
                return;
            }

            if(phone.length !== 10){
                alert("Phone number must be 10 digits.");
                return;
            }

            const button = addForm.querySelector("button");

            button.innerHTML = "Adding Member...";
            button.disabled = true;

            setTimeout(() => {

                alert("Member Added Successfully!");

                addForm.reset();

                button.innerHTML = "Add Member";
                button.disabled = false;

            },1500);

        });

    }

});
/* ================= Members Page ================= */

document.addEventListener("DOMContentLoaded", () => {

    // Search Members
    const searchInput = document.querySelector(".search-box input");

    if (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const filter = this.value.toLowerCase();

            const rows = document.querySelectorAll(".member-table tbody tr");

            rows.forEach((row) => {

                const text = row.innerText.toLowerCase();

                if (text.includes(filter)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }

            });

        });

    }

    // Delete Member
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach((button) => {

        button.addEventListener("click", function () {

            const confirmDelete = confirm("Are you sure you want to delete this member?");

            if (confirmDelete) {

                this.closest("tr").remove();

                alert("Member Deleted Successfully!");

            }

        });

    });

});
/* ================= Edit Member ================= */

document.addEventListener("DOMContentLoaded", () => {

    const editForm = document.querySelector('form[action="/update-member"]');

    if (editForm) {

        editForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const name = document.querySelector('input[name="name"]').value.trim();
            const email = document.querySelector('input[name="email"]').value.trim();
            const phone = document.querySelector('input[name="phone"]').value.trim();

            if (name === "" || email === "" || phone === "") {
                alert("Please fill all required fields.");
                return;
            }

            if (phone.length !== 10 || isNaN(phone)) {
                alert("Please enter a valid 10-digit phone number.");
                return;
            }

            const button = editForm.querySelector("button");

            button.innerHTML = "Updating...";
            button.disabled = true;

            setTimeout(() => {

                alert("Member Updated Successfully!");

                button.innerHTML = "Update Member";
                button.disabled = false;

                window.location.href = "members.html";

            }, 1500);

        });

    }

});
});