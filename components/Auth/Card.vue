<template>
	<div>
		<UCard class="card">
			<div v-if="!showConfirmEmailMessage">
				<h3>{{ authState }}</h3>
				<div class="input-container">
					<input type="email" placeholder="Email" v-model="input.email" />
					<input
						type="password"
						placeholder="Password"
						v-model="input.password"
					/>
				</div>
				<UButton class="btn" color="white" variant="solid" @click="handleSubmit"
					>Submit</UButton
				>
				<p class="error" v-if="authError">{{ authError }}</p>

				<p @click="toggleAuthState">
					{{
						authState === 'Login'
							? "Don't have an account? Create one now"
							: 'Already have an account? Go a head an  log in'
					}}
				</p>
			</div>
			<div v-else>
				<h3>Check email for confirmation message</h3>
			</div>
		</UCard>
	</div>
</template>

<script setup lang="ts">
const authState = ref<'Login' | 'Register'>('Login');
const authError = ref('');
const showConfirmEmailMessage = ref(false);
const input = reactive({
	password: '',
	email: '',
});
const router = useRouter();

const { register, signIn, signOut, user } = useAuth();

const handleSubmit = async () => {
	try {
		if (authState.value === 'Login') {
			await signIn({
				email: input.email,
				password: input.password,
			});
			router.push('/myprofile');
		} else {
			await register({
				email: input.email,
				password: input.password,
			});
			showConfirmEmailMessage.value = true;
		}
		input.email = '';
		input.password = '';
	} catch (error) {
		authError.value = error.message;
	}
};

const toggleAuthState = () => {
	if (authState.value === 'Login') authState.value = 'Register';
	else authState.value = 'Login';
	authError.value = '';
};
</script>

<style scoped>
.card {
	padding: 1rem;
	width: 30rem;
}

.card h3 {
	font-size: 1.75rem;
	font-weight: bold;

}
.input-container {
	display: flex;
	flex-direction: column;
}

.input-container input {
	padding: 0.5rem;
	margin-bottom: 0.5rem;
	outline: none;
	border: 0.1rem solid rgba(0, 0, 0, 0.1);
	border-radius: 0.3rem;
}
.btn:hover {
	background-color: lightgray;
}
p {
	color: blue;
	font-size: 0.7rem;
	cursor: pointer;
}

.error {
	color: red;
}
</style>
