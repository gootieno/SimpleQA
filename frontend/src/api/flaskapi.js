// fetch questions

export const getAllQuestions = async () => {
	const res = await fetch('http://localhost:5000/api/questions', {})
	if (res.ok) {
		const { questions } = await res.json()
		return questions
	}
}
