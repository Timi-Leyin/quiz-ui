import { API } from "../api";
import { formatTime } from "../utils/format-time";

export async function Profile(checkAdmin = false) {
	try {
		const response = await API.get("/profile");
		const profile = response.data.data;
		// console.log(profile);
		const userDisplayNameEl = document.querySelector(
			"#user-name"
		) as HTMLHeadingElement;
		const userDisplayEmailEl = document.querySelector(
			"#display-email"
		) as HTMLHeadingElement;
		const adminContentEL = document.querySelector(
			"#admin-contents"
		) as HTMLHeadingElement;
		const quizPlayedCounter = document.querySelector(
			"#quiz-played-counter"
		) as HTMLHeadingElement;
		const fastestTimeEl = document.querySelector(
			"#fastest-time"
		) as HTMLHeadingElement;
		const correctAnswersEl = document.querySelector(
			"#correct-answers"
		) as HTMLHeadingElement;

		if (
			userDisplayNameEl &&
			userDisplayEmailEl &&
			adminContentEL &&
			quizPlayedCounter &&
			fastestTimeEl &&
            correctAnswersEl
		) {
			userDisplayNameEl.innerHTML = `${profile.firstName} ${profile.lastName}`;
			userDisplayEmailEl.innerHTML = `${profile.email}`;
			quizPlayedCounter.innerHTML = `${profile.quizPlayed}`;
			fastestTimeEl.innerHTML = `${formatTime(profile.fastestTime || 0)}`;
			correctAnswersEl.innerHTML = `${profile.correctAnswers}`;

			const btn = document.createElement("button");
			btn.className = "btn-primary btn text-white py-4 rounded-full";
			btn.innerText = "Create New Quiz";
			btn.addEventListener("click", () => {
				window.location.assign("/dashboard/create-quiz.html");
			});

			profile.type == "ADMIN" && adminContentEL.appendChild(btn);
		}

		if (checkAdmin && profile.type != "ADMIN") {
			alert("You don't have permission to view this page");
			window.location.replace("/dashboard/index.html");
		}
	} catch (error) {
		alert("An Error Occurred, Please Login Again");
		window.location.replace("/auth/login.html");
	}
}

Profile();
