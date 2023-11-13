<template>
	<div>
		<div class="container">
			<h2>Мои заметки</h2>
			<NotesForm />
			<div v-if="notesResponse.data" class="card-container">
				<UCard class="card" v-for="note in notesResponse.data" :key="note.id">
					<h2>{{ note.title }}</h2>
					<p>{{ note.note }}</p>
				</UCard>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const { supabase } = useSupabase();
const { user } = useAuth();

const notesResponse = ref();

if (process.client) {
	notesResponse.value = await supabase
		.from('notes')
		.select()
		.eq('user_id', user.value.id);
}

definePageMeta({
	middleware: 'auth',
});
</script>

<style scoped>
.container {
	width: 50%;
	height: 90vh;
	margin: 0 auto;
	padding: 3rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;

}
.card-container {
	margin-top: 1.5rem;
	width: 100%;


}

h2 {
	font-size: 2rem;
	margin-bottom: 1rem;
}

.card {
	padding: 1rem;
	margin-bottom: 1rem;
}
.card h2 {
	font-weight: bold;
	font-size: 1.5rem;
}
</style>
