interface Answer {
	text: any;
	correct: boolean;
}
interface Quiz {
	question: any;
	answers: Answer[];
	explanation: any;
}
