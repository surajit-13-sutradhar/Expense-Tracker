// LOCALSTORAGE AND EVENT DELEGATION

document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expenseForm")
    const expenseAmountInput = document.getElementById("expenseAmount")
    const expenseNameInput = document.getElementById("expenseName")
    const expenseList = document.getElementById("expenseList")
    const totalAmountDisplay = document.getElementById("totalAmount")

    let expenses = JSON.parse(localStorage.getItem("expenses")) || []
    let totalAmount = calculateTotal() //this method will loop through the array "expenses" and return the sum and store it in the variable totalAmount

    renderExpenses()

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const name = expenseNameInput.value.trim()
        const amount = parseFloat(expenseAmountInput.value.trim()) //but this will come as a string format which we don't want

        // Check validity of inputs
        if(name!== "" && !isNaN(amount) && amount > 0){
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount,
            }
            expenses.push(newExpense)
            saveExpensesToLocal()
            renderExpenses()
            updateTotalAmount()

            // clear Input
            expenseNameInput.value = ""
            expenseAmountInput.value = ""
        }
        // console.log(expenses)
    })

    // Reduce method in an array
    function calculateTotal(){
        return expenses.reduce((sum, expense) => sum + expense.amount, 0)
    }

    // SAVING TO LOCALSTORAGE
    function saveExpensesToLocal(){
        localStorage.setItem("expenses", JSON.stringify(expenses))
    }

    // Rendering the expenses
    function renderExpenses() {
        expenseList.innerHTML = ""
        expenses.forEach(expense => {
            const li = document.createElement("li")
            li.innerHTML = `
                ${expense.name} - Rs ${expense.amount}
                <button data-id="${expense.id}">Delete</button>
            `
            expenseList.appendChild(li)
        })
    }

    // Updating totalamount
    function updateTotalAmount(){
        totalAmount = calculateTotal()
        totalAmountDisplay.textContent = totalAmount.toFixed()
    }

    expenseList.addEventListener("click", (event) => {
        if(event.target.tagName === "BUTTON") {
            const expenseId = parseInt(event.target.getAttibute("data-id"))
            expenses = expenses.filter(expense => expense.id !== expenseId)

            saveExpensesToLocal()
            renderExpenses()
            updateTotalAmount()
        }
    })

})