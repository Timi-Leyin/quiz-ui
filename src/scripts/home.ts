import { API } from "../api";

// featured quizes;
const getQuiz = async () => {
	const featuredQuizes = document.querySelector("#f_quizes");
	try {
		const res = await API.get("/quiz");
		console.log(res.data);
		res.data.data.forEach((data: any) => {
			const el = document.createElement("div");
			el.innerHTML = `<div
							class="bg-purple-700 text-white rounded-lg overflow-hidden relative"
						>
							
							<div class="p-4">
								<h4 class="font-bold mb-2">
									${data.question}
								</h4>
								<p class="text-sm">${data.level}</p>
								<p class="text-sm font-bold">${new Date(data.createdAt).toDateString()}</p>
								<p data-id="${
									data.uuid
								}" id="delete-quiz" class="text-sm font-bold text-red-600 cursor-pointer mt-3">DELETE</p>
							</div>
						</div>`;

			featuredQuizes?.appendChild(el);
		});
	} catch (error) {
	} finally {
		const deleteQuiz = document.querySelectorAll("#delete-quiz");

		deleteQuiz.forEach((deleteQ) => {
			const uuid = deleteQ.getAttribute("data-id");

			deleteQ.addEventListener("click", async () => {
				const _confirm = confirm(
					"Are you sure you want to delete Quiz with the ID of " + uuid
				);
				if (!_confirm) return;

				try {
					await API.delete("/quiz/" + uuid);
					window.location.reload();
				} catch (error) {}
			});
		});
	}
};

getQuiz();
