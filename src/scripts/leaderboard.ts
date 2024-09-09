import { API } from "../api";

const tableBodyEl = document.querySelector("#leaderboard-table-body");

const getLeaderBoard = async () => {
	try {
		const res = await API.get("/quiz/leaderboard");
		const leaderboard = res.data.data;
		leaderboard.map((lb: any) => {
			const tr = document.createElement("tr");
			console.log(leaderboard);
			tr.innerHTML = `<td>${lb.firstName}</td>
                                            <td>${lb.lastName}</td>
                                            <td>${lb.quizPlayed}</td>
                                            <td>${lb.correctAnswers}</td>`;
			tableBodyEl?.appendChild(tr);
		});
	} catch (error) {}
};

getLeaderBoard();
