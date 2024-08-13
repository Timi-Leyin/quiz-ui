const registerForm = document.querySelector("#register-form-action");

registerForm?.addEventListener("submit", (ev) => {
	ev.preventDefault();
	ev.stopPropagation();

	const button = registerForm.querySelector("button");
	const btnInitialValue = button?.innerHTML;
	const email = registerForm.querySelector(
		"input[name='email']"
	) as HTMLInputElement;
	const firstName = registerForm.querySelector(
		"input[name='firstName']"
	) as HTMLInputElement;
	const lastName = registerForm.querySelector(
		"input[name='lastName']"
	) as HTMLInputElement;
	const password = registerForm.querySelector(
		"input[name='password']"
	) as HTMLInputElement;

	const isValid =
		email.value && firstName.value && lastName.value && password.value;
	if (!isValid) {
		alert("All Fields are required.");
		return;
	}
	alert("Submitting.");
});
