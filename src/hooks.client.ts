import { userStore } from "$lib/stores/userStore.svelte";
import { goto } from "$app/navigation";

export async function handleClientSideNavigation({ route }) {
	const user = userStore.currentUser;
	if (
		route.id?.startsWith("#/employee") &&
		(!user || user.role !== "employee")
	) {
		goto("#/");
	}
}
