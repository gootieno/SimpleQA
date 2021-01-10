// fetch questions

export const getAllQuestions = async () => {
	const res = await fetch('http://localhost:5000/api/questions', {})
	const { questions } = await res.json()
	console.log('Questions', questions)
	return questions
}
