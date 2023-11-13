<template>
	<UCard class="card">
		<input placeholder="Заголовок" v-model="notesInput.title" />
		<textarea placeholder="Моя заметка" v-model="notesInput.note" />
		<UButton @click="handleSubmit" color="white" variant="solid" class="btn"
			>Сохранить</UButton
		>
	</UCard>
</template>

<script setup lang="ts">
const { supabase } = useSupabase();
const { user } = useAuth();
const notesInput = reactive({
	title: '',
	note: '',
});

const handleSubmit = async () => {
	if (!notesInput.title || !notesInput.note) return;

	await supabase.from('notes').insert({
		title: notesInput.title,
		note: notesInput.note,
		user_id: user.value.id,
	});
	notesInput.title = '';
	notesInput.note = '';
};
</script>

<style scoped>
.card {
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
}

input,
textarea {
	border: 0.1rem solid rgba(0, 0, 0, 0.2);
	width: 100%;
	margin-bottom: 0.5rem;
	border-radius: 0.25rem;
	padding: 0.5rem;
}
.btn:hover {
	background-color: lightgray;
}
</style>
