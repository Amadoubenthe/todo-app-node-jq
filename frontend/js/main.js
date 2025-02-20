"use strict"

const baseUrl = "http://localhost:8000/api/todos"

$(document).ready(function() {
    loadData();

    $("form").submit(function (event) {
        event.preventDefault();

        const editMode = localStorage.getItem("editMode")
    
        if (!editMode) {
            const todoName = $("#todoName").val();
    
            const todo = {
                title: todoName,
                completed: false
            };
        
            saveTodo(baseUrl, "POST", todo);
        }else {
            const taskId = localStorage.getItem("taskId")
            const taskName = $("#todoName").val();

            const updatedTask = {
                title: taskName
            };
        
            console.log(`Le monde : ${baseUrl}/${taskId}`);
            
            saveTodo(`${baseUrl}/${taskId}`, "PUT", updatedTask);
            localStorage.clear()
        }
    });

    // Action pour la suppression
    $(document).on("click", ".remove", function () {
        const todoElement = $(this).closest(".todo-element");  
        const todoId = todoElement.find(".hidden-remove").text(); // Récupère l'id mais qui est cacher a l'affichage
            
        if (!todoId) {
            console.error("Impossible de supprimer : ID introuvable.");
            return;
        }
    
        // Confirmer la suppression
        if (!confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
            return;
        }
    
        deleteTodo(todoId, todoElement);
    });

    // Action sur l'edition
    $(document).on("click", ".edit", function (){
        const id = $(this).closest(".todo-element").find(".hidden-edit").text();
        const taskText = $(this).closest(".todo-element").find("p").text();
        $("#todoName").val(taskText);
        localStorage.setItem("taskId", id)
        localStorage.setItem("editMode", true)
    })

    // Action sur le check
    $(document).on("change", ".todo-checkbox", function () {
        const todoElement = $(this).closest(".todo-element");
        const completed = $(this).prop("checked");
        const todoId = todoElement.find(".hidden-edit").text(); // Récupère l'id mais qui est cacher a l'affichage
    
        if (!todoId) {
            console.error("Impossible de modifier : ID introuvable.");
            return;
        }
    
        updateTodoStatus(todoId, completed, todoElement);
    });

});

// Function to add a todo
function saveTodo(url, method, todoData) {
    $.ajax({
        url: url,
        method: method,
        contentType: "application/json",
        data: JSON.stringify(todoData),
        success: function (res) {
            console.log("Réponse de l'API:", res);
            $("#todoName").val(""); // Efface l'input après soumission
            loadData(); // Recharge la liste des tâches
        },
        error: function (err) {
            console.error("Erreur:", err);
        }
    });
}

// Fonction pour le chargement des données
function loadData() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/todos",
        success: function(response) {
            if (Array.isArray(response) && response.length > 0) {
                $("#todos").empty(); // Vider avant d'ajouter
                response.forEach(element => {
                    $("#todos").append(
                        `<div class="todo-element ${element.completed ? "completed-task" : ""}">
                            <div class="flex">
                                <span><input class="todo-checkbox" id="todo-checkbox" type="checkbox" ${element.completed ? "checked" : ""}></span>
                                <div>
                                    <p>${element.title}</p>
                                    <span class="date">Créer le: ${element.createdAt}</span>
                                </div>
                            </div>
                            <div>
                                <span class="remove">
                                    <i class="fa-solid fa-trash">
                                        <span class='hidden-remove'>${element._id}</span>
                                    </i>
                                </span>
                                <span class="edit">
                                    <i class="fa-solid fa-pen">
                                        <span class='hidden-edit'>${element._id}</span>
                                    </i>
                                </span>
                            </div>
                        </div>`
                    );
                });
            }
        },
        error: function(err) {
            console.error("Erreur lors du chargement des données:", err);
        }
    });
}

/*
Fonction pour supprimer une tâche
*/
function deleteTodo(todoId, todoElement) {
    console.log("id: ", todoId);
    
    $.ajax({
        url: `http://localhost:8000/api/todos/${todoId}`,
        method: "DELETE",
        success: function () {
            console.log(`Tâche ${todoId} supprimée avec succès.`);
            todoElement.remove(); // Supprime l'élément du DOM après suppression côté serveur
        },
        error: function (err) {
            console.error("Erreur lors de la suppression :", err);
            alert("La suppression a échoué. Veuillez réessayer.");
        }
    });
}

/*
Fonction pour modifier le statut d'une tâche
*/
function updateTodoStatus(todoId, completed, todoElement) {
    console.log(todoId, completed, todoElement);
    
    $.ajax({
        url: `http://localhost:8000/api/todos/${todoId}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({ completed }),
        success: function () {
            console.log(`Tâche ${todoId} mise à jour : completed = ${completed}`);
            // Optionnel : Appliquer un style différent si la tâche est complétée
            if (completed) {
                todoElement.addClass("completed-task");
            } else {
                todoElement.removeClass("completed-task");
            }
        },
        error: function (err) {
            console.error("Erreur lors de la mise à jour :", err);
            alert("La mise à jour a échoué. Veuillez réessayer.");
        }
    });
}




