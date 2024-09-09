import { API } from "../api";

const loginForm = document.querySelector("#login-form-action");

loginForm?.addEventListener("submit", async (ev) => {
	ev.preventDefault();
	ev.stopPropagation();

	// const button = loginForm.querySelector("button");
	// const btnInitialValue = button?.innerHTML;
	const email = loginForm.querySelector(
		"input[name='email']"
	) as HTMLInputElement;
	const password = loginForm.querySelector(
		"input[name='password']"
	) as HTMLInputElement;

	const isValid = email.value && password.value;
	if (!isValid) {
		alert("All Fields are required.");
		return;
	}

	// API CALL
	try {
		const response = await API.post("/auth/login", {
			email: email.value,
			password: password.value,
		});
		alert(response.data.message);
		localStorage.setItem("@token", response.data.accessToken);
		window.location.replace("/dashboard/index.html");
	} catch (error: any) {
		alert(error.response.data.message);
	}
});
