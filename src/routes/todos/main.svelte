<script>
	let todoItems = [];
	let newTodo = '';

	function addTodo() {
		newTodo = newTodo.trim();
		if (!newTodo) return;

		const todo = {
			text: newTodo,
			checked: false,
			id: Date.now()
		};

		todoItems = [...todoItems, todo];
		newTodo = '';
	}
	function toggleDone(id) {
		const index = todoItems.findIndex((item) => item.id === Number(id));
		todoItems[index].checked = !todoItems[index].checked;
	}
	function deleteTodo(id) {
		todoItems = todoItems.filter((item) => item.id !== Number(id));
	}
	function toggle() {
		window.document.body.classList.toggle('dark-mode');
		document.getElementById('mode').innerHTML = 'Entered Light Mode!';
	}
</script>

<button on:click={toggle} class="toggler" id="mode">
	<slot />
</button>

<main>
	<div>
		<h1>todos</h1>
		<ul>
			{#each todoItems as todo (todo.id)}
				<li class="todo-item {todo.checked ? 'done' : ''}">
					<input id={todo.id} type="checkbox" />
					<label for={todo.id} class="tick" on:click={() => toggleDone(todo.id)} />
					<span>{todo.text}</span>
					<button on:click={() => deleteTodo(todo.id)} class="btn">
						<use href="#delete-icon" />
						Delete
					</button>
				</li>
			{/each}
		</ul>
		<div>
			<svg class="checklist-icon"><use href="#checklist-icon" /></svg>
			<h2 class="empty-state__title">Add your first todo</h2>
			<p class="empty-state__description">What do you want to get done today?</p>
		</div>
		<form on:submit|preventDefault={addTodo}>
			<input
				type="text"
				aria-label="Enter a new todo"
				placeholder="E.g. Run on poop"
				bind:value={newTodo}
			/>
		</form>
	</div>
</main>

<!-- component markup -->
<style lang="scss">
	@import '../../lib/styles/global.scss';
</style>
