$(document).ready(function() {
    const apiUrl = "http://localhost:8081/api/todos";
    let sortOrder = "desc"; // Default sort order

    $("#calendar").datepicker({
        onSelect: function(dateText) {
            const date = $(this).datepicker('getDate');
            const from = date.getTime();
            const to = from + 24 * 60 * 60 * 1000 - 1;
            loadTasksByDateRange(from, to);
        }
    });

    $("#todayBtn").click(function() {
        const today = new Date();
        const from = today.getTime();
        const to = from + 24 * 60 * 60 * 1000 - 1;
        loadTasksByDateRange(from, to);
    });

    $("#weekBtn").click(function() {
        const today = new Date();
        const from = today.getTime();
        const to = from + 7 * 24 * 60 * 60 * 1000 - 1;
        loadTasksByDateRange(from, to);
    });

    $("#search").on("input", function() {
        const query = $(this).val();
        if (query.length > 0) {
            searchTasks(query);
        } else {
            loadAllTasks();
        }
    });

    $("#onlyIncomplete").change(function() {
        loadAllTasks();
    });

    $("#modalDoneBtn").click(function() {
        $("#taskModal").hide();
    });

    $("#sortDate").click(function() {
        sortOrder = sortOrder === "desc" ? "asc" : "desc";
        $(this).text(sortOrder === "desc" ? "⬇ Сортировать по дате" : "⬆ Сортировать по дате");
        loadAllTasks();
    });

    function loadAllTasks() {
        const status = $("#onlyIncomplete").is(":checked") ? false : null;
        let url = apiUrl;
        if (status !== null) {
            url += `?status=${status}`;
        }
        $.get(url, function(tasks) {
            displayTasks(tasks);
        });
    }

    function loadTasksByDateRange(from, to) {
        const status = $("#onlyIncomplete").is(":checked") ? false : null;
        let url = `${apiUrl}/date?from=${from}&to=${to}`;
        if (status !== null) {
            url += `&status=${status}`;
        }
        $.get(url, function(tasks) {
            displayTasks(tasks);
        });
    }

    function searchTasks(query) {
        $.get(`${apiUrl}/find?q=${query}`, function(tasks) {
            displayTasks(tasks);
        });
    }

    function truncateText(text, limit) {
        if (text.length > limit) {
            return text.substring(0, limit).split(" ").slice(0, -1).join(" ") + '...';
        }
        return text;
    }

    function displayTasks(tasks) {
        const taskList = $("#taskList");
        taskList.empty();
        tasks.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
        });
        tasks.forEach(task => {
            const shortDesc = truncateText(task.shortDesc, 100);
            const taskElement = `
                <div class="task" data-id="${task.id}">
                    <div class="task-content">
                        <div class="title">${task.name}</div>
                        <div class="description">${shortDesc}</div>
                        <div class="date">${new Date(task.date).toLocaleString()}</div>
                    </div>
                    <input type="checkbox" class="status" id="status-${task.id}" ${task.status ? 'checked' : ''} disabled>
                    <label for="status-${task.id}"></label>
                </div>`;
            taskList.append(taskElement);
        });

        $(".task").click(function() {
            const taskId = $(this).data("id");
            const task = tasks.find(t => t.id === taskId);
            $("#modalTitle").text(task.name);
            $("#modalDate").text(new Date(task.date).toLocaleString());
            $("#modalStatus").prop("checked", task.status);
            $("#modalDescription").text(task.fullDesc);
            $("#taskModal").show();
        });
    }

    loadAllTasks();
});
