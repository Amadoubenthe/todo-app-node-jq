"use strict"

$(document).ready(function() {
    loadData();

    // Soumission du formulaire
    $("form").submit(function(event){
        event.preventDefault()
    
        const todName = $("#todoName").val()
    
        const todo = {
            "title": todName,
            "completed": false
        }
    
        $.ajax({
            url: "http://localhost:8000/api/todos",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(todo),
            success: function(res){
                console.log("res: ", res);
                $("#todoName").val(""); // Efface la valeur de l'input après soumission
                loadData()
            },
            error: function(err) {
                console.error("Error: ", err);
            }
        })
    })

    // Action pour la suppression
    $(document).ready(function () {
        // Écouteur d'événement pour la suppression
        $(document).on("click", ".remove", function () {
            const todoElement = $(this).closest(".todo-element");
            const id = todoElement.data("id");
            
            const todoId = todoElement.find(".hidden").text(); // Récupère l'id mais qui est cacher a l'affichage
            
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
    });

});

$(document).on("change", ".todo-checkbox", function () {
    const todoElement = $(this).closest(".todo-element");
    const completed = $(this).prop("checked");
    const todoId = todoElement.find(".hidden").text(); // Récupère l'id mais qui est cacher a l'affichage

    if (!todoId) {
        console.error("Impossible de modifier : ID introuvable.");
        return;
    }

    updateTodoStatus(todoId, completed, todoElement);
});




// Chargement des données
function loadData() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/todos",
        success: function(response) {
            console.log("Réponse de l'API:", response);
            if (Array.isArray(response) && response.length > 0) {
                $("#todos").empty(); // Vider avant d'ajouter
                response.forEach(element => {
                    $("#todos").append(
                        `<div class="todo-element ${element.completed ? "completed-task" : ""}">
                            <div class="flex">
                                <span><input class="todo-checkbox" type="checkbox" ${element.completed ? "checked" : ""}></span>
                                <div>
                                    <p>${element.title}</p>
                                    <span class="date">Créer le: ${element.createdAt}</span>
                                </div>
                            </div>
                            <span class="remove">
                                <i class="fa-solid fa-trash">
                                    <span class='hidden'>${element._id}</span>
                                </i>
                            </span>
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




