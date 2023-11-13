import { createClient } from '@supabase/supabase-js';

const SUPABASE_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nbHBkYWZ6amZyY2tqaml1aXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NjIwNjEsImV4cCI6MjAxNTQzODA2MX0.Bs6Odtc1is20BPwUyP17UNSdNzx2UM6KkgqIhfTJL-E';

const SUPABASE_URL = 'https://nglpdafzjfrckjjiuiwt.supabase.co';

const useSupabase = () => {
	const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

	return { supabase };
};

export default useSupabase;
