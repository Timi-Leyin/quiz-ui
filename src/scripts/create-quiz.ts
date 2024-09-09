import { API } from "../api";
import { Profile } from "./profile";

Profile(true);
const quizForm = document.getElementById("quizForm") as HTMLFormElement;

// let quiz: Quiz[] = [];

quizForm.addEventListener("submit", async function (e) {
	e.preventDefault();

	const question = (document.getElementById("question") as HTMLInputElement)
		.value;
	const explanation = (
		document.getElementById("explanation") as HTMLInputElement
	).value;
	const level = (document.getElementById("level") as HTMLSelectElement).value;
	const answers = [];
	const correctAnswer = document.querySelector(
		'input[name="correct"]:checked'
	) as HTMLInputElement;

	if (!correctAnswer) {
		alert("Please select a correct answer");
		return;
	}

	for (let i = 1; i <= 4; i++) {
		answers.push({
			text: (document.getElementById(`answer${i}`) as HTMLInputElement).value,
			correct: i - 1 === parseInt(correctAnswer.value),
		});
	}

	const quizItem = {
		question,
		answers,
		explanation,
		level,
	};

	try {
		const response = await API.post("/quiz/create", quizItem);
		const confirmation = confirm(
			"Quiz Added Successfully; do you want to add another one?"
		);
		response;
		quizForm.reset();
		if (!confirmation) {
			window.location.replace("/dashboard/index.html");
		}
	} catch (error) {
		alert("Quiz Failed to Add");
	} finally {
	}
	// quiz.push(quizItem);
	// updateQuizJson();
});
