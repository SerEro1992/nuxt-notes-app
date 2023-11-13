const useAuth = () => {
	const user = useState('user', () => null);
	const router = useRouter();

	const { supabase } = useSupabase();

	supabase.auth.onAuthStateChange((e, session) => {
		user.value = session?.user || null;
	});

	const register = async ({ email, password, ...metadata }) => {
		const { user: u, error } = await supabase.auth.signUp(
			{
				email,
				password,
			},
			{
				data: metadata,
				redirectTo: `${window.location.origin}/myprofile?source=email`,
			}
		);

		if (error) throw error;
		return u;
	};

	const signIn = async ({ email, password }) => {
		const { user: u, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) throw error;

		return u;
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
		router.push('/');
	};

	const isLoggedIn = () => {
		return !!user.value;
	};

	return {
		user,
		register,
		signIn,
		signOut,
		isLoggedIn,
	};
};

export default useAuth;
