'use strict'

const fs = require("fs")
const table = 'words'

const normalize_text = (text) => {
  return text.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize().trim().toUpperCase()
}

const is_not_exist = ({ diccionary_word, compare_word}) => {
  return diccionary_word[compare_word] === undefined
}

const convert_dto_object = (list_word) => {
  const words_dto = []
  const diccionary_word = {}
  const size_word_permission = 5

  list_word.forEach(( word ) => {
    const word_normalize = normalize_text(word)
    if(word_normalize.length === size_word_permission){
      if(is_not_exist({ diccionary_word: diccionary_word, compare_word: word_normalize })){
        words_dto.push({ name: word_normalize })
        diccionary_word[word_normalize] = word_normalize
      }
    }
  })

  return words_dto
}

module.exports = {
  async up (queryInterface) {
    const diccionary_file = './data/words.txt'
    const words = fs.readFileSync( diccionary_file, 'utf8')
    const list_word = words.split('\n')
    const words_dto = convert_dto_object(list_word)

    await queryInterface.bulkDelete(table, null, {})
		await queryInterface.bulkInsert(table,words_dto, {})
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete(table, null, {})
  }
}
