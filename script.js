let computers = [
    {
        id: 1,
        name: "PC-01",
        specification: "Core i5 / 8GB RAM",
        location: "Lab Oracle",
        status: "available"
    },
    {
        id: 2,
        name: "PC-02",
        specification: "Core i5 / 8GB RAM",
        location: "Lab Oracle",
        status: "used"
    },
    {
        id: 3,
        name: "PC-03",
        specification: "Core i5 / 8GB RAM",
        location: "Lab Oracle",
        status: "broken"
    }
];

// Menampilkan data
function displayComputer(data = computers) {
    const table = document.getElementById("computerTable");

    table.innerHTML = "";

    data.forEach(function(computer) {
        let statusText = "";

        if (computer.status === "available") {
            statusText = "Available";
        } else if (computer.status === "used") {
            statusText = "Used";
        } else if (computer.status === "required") {
            statusText = "Required";
        } else {
            statusText = "Broken";
        }

        table.innerHTML += `
            <tr>
                <td>${computer.id}</td>
                <td>${computer.name}</td>
                <td>${computer.specification}</td>
                <td>${computer.location}</td>
                <td>
                    <span class="status ${computer.status}">
                        ${statusText}
                    </span>
                </td>
                <td>
                    <button 
                        class="action-btn delete" 
                        onclick="deleteComputer(${computer.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

    updateStatistics();
}

// Statistics
function updateStatistics() {
    const total = computers.length;

    const available = computers.filter(function(computer) {
        return computer.status === "available";
    }).length;

    const used = computers.filter(function(computer) {
        return computer.status === "used";
    }).length;

    const broken = computers.filter(function(computer) {
        return computer.status === "broken";
    }).length;

    //Masukkan data ke dasboard
    document.getElementById("totalComputer").textContent = total;
    document.getElementById("usedComputer").textContent = used;
    document.getElementById("brokenComputer").textContent = broken;
    document.getElementById("availableComputer").textContent = available;
}
// Modal
function openModal() {
    document.getElementById("computerModal").classList.add("modal-show");
}

function closeModal() {
    document.getElementById("computerModal").classList.remove("modal-show");
}
//ADD Computer
document.getElementById("computerForm").addEventListener("submit", function(event){
    event.preventDefault();
    const name = document.getElementById("computerName").value;
    const specification = document.getElementById("computerspecification").value;
    const location = document.getElementById("location").value;
    const status = document.getElementById("status").value;

    const newid = computers.length > 0
        ? Math.max(...computers.map(computer => computer.id)) + 1
        : 1;

    const newComputer = {
        id: newid,
        name: name,
        specification: specification,
        location: location,
        status: status
    };

    computers.push(newComputer);
    displayComputer();
    this.reset();
    closeModal();
});

// Delete computer
function deleteComputer(id) {
    const confirmDelete = confirm("Yakin data ini dihapus?");
    if (!confirmDelete){
        return;
    } 
    computers = computers.filter(function(computer) {
        return computer.id !== id;
    });
    displayComputer();
}
//SEARCH
function searchComputer() {

    const searchInput = document.getElementById("searchInput")
        .value
        .toLowerCase();

    const result = computers.filter(function (computer) {
        return (
            computer.name.toLowerCase().includes(searchInput) ||
            computer.specification.toLowerCase().includes(searchInput) ||
            computer.location.toLowerCase().includes(searchInput) ||
            computer.status.toLowerCase().includes(searchInput)
        );
    });
    displayComputer(result);
}
//Filter status
function filterComputer() {
    const selectedStatus = document.getElementById("filterStatus").value;
    if (selectedStatus === "all") {
        displayComputer();
        return;
    }
    const result = computers.filter(function(computer) {
        return computer.status === selectedStatus;
    });
    displayComputer(result);
}
displayComputer();
