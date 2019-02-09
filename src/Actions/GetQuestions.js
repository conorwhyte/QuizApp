export function GetQuestions(
  quizCategory,
  numQuestions,
  quizDifficulty,
  quizType,
  callback
) {
  let xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      callback(JSON.parse(xmlHttp.responseText))
    }
  }
  xmlHttp.open(
    'GET',
    `https://opentdb.com/api.php?amount=${numQuestions}&category=${quizCategory}&difficulty=${quizDifficulty}&type=${quizType}`,
    true
  ) // true for asynchronous
  xmlHttp.responseType = 'text'
  xmlHttp.send(null)
}
