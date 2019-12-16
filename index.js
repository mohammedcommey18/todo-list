// U I   C O N T R O L L E R

var UIController = (function() {
    
    var Todo = function(description, id) {
        this.description = description;
        this.id = id;
    }

    var data = {
        allTodos: []
    };

   return {
       getInput: function() {
           return{
               description: document.querySelector('.add__description').value,
               id: 0
           };
       },

       addTodo: function(des, id) {

        // Create HTML string with some placeholder text
        var html = '<div class="items clearfix" id="item-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__delete"> <button class="item__delete--btn"> <i class="fa fa-times-circle"></i> </button> </div> </div> </div>';

        //Creating newID
        if (data.allTodos.length > 0) {
            var ID = data.allTodos[data.allTodos.length - 1].id + 1;
        }
        else {
            ID = 0
        }
        

        var newTodo = new Todo(des, ID);

         // Replace the placeholder text with some actual data 
         newHTML = html.replace('%description%', des);
         newHTML = newHTML.replace('%id%', ID);


         // Push into the allTodos structure
            data.allTodos.push(newTodo);  //this.getInput()

         //Insert HTML into the DOM
         document.querySelector('.container').insertAdjacentHTML('beforeend', newHTML);

         // Return newTodo
         return newTodo, ID;


       },

       deleteTodo: function(id) {
        
        var ids = data.allTodos.map(function(current) {
            return current.id;
        });

        var index = ids.indexOf(id);

        if (index !== -1) {
            data.allTodos.splice(index, 1);
        }

       },

       deleteListItem: function(selectorID) {

        var el = document.getElementById(selectorID);
        el.parentNode.removeChild(el);

       },

       clearFields: function() {

        var field = document.querySelectorAll('.add__description');

        var fieldArr = Array.prototype.slice.call(field);

        // fieldArr.forEach(function(current, index, array) {
        //     current.value = ''
        // });

                    //OR

        fieldArr.map(function(current, index, array) {
            current.value = ''
        });
        
           
       },

       testing: function() {
        console.log(data);
       }

   };

   
   


})();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// G L O B A L  A P P  C O N T R O L L E R
var globalController = (function (UICtrl) {

    var globalAddItem = function() {

        // 1. Get the inputed data
        var input = UICtrl.getInput();
        // console.log(input); 

            if (input.description) {

            // 2. Display on the UI
            var display = UICtrl.addTodo(input.description);

            // 3. Clear field
            UICtrl.clearFields();
            
            }
            else {
                var warningtext = 'Please enter a TODO item!!';
                alert(warningtext);
            }
        
    };


    var ctrlDeleteItem = function(event) {
        var itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;


        if (itemID) {
            splitID = itemID.split('-');
            ID = parseInt(splitID[1]);
        }

        // Delete item from the console view
       var remove = UICtrl.deleteTodo(ID);
       
       // Delete from the UI
       UICtrl.deleteListItem(itemID);
      
    };

    document.querySelector('.container').addEventListener('click', ctrlDeleteItem); 

    document.querySelector('.add__btn').addEventListener('click', globalAddItem);

    document.addEventListener('keypress', function(event) {

        if (event.keycode === 13 || event.which === 13) {
            globalAddItem();
        }

    });

    return {
        init: function() {
            console.log('App has started');
        }
    }
    

})(UIController);

globalController.init();