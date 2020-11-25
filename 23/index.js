const fs = require('fs')
const instructions = fs.readFileSync('input.txt', 'utf-8').trim().split('\r\n')

let pointer = 0
let a = 1
let b = 0

while (true) {
  console.log('pointer = ', pointer)
  const instruction = instructions[pointer];
  const ins = instruction.substring(0,3);
  const params = instruction.substring(3).trim()

  console.log('a,b = ', a, b)
  console.log('instruction = ', instruction)

  switch (ins) {
    case 'hlf':
      if (params == 'a') a = Math.floor(a/2)
      if (params == 'b') b = Math.floor(b/2)
      pointer += 1
      break

    case 'tpl':
      if (params == 'a') a = a * 3
      if (params == 'b') b = b * 3
      pointer += 1
      break

    case 'inc':
      if (params == 'a') a = a + 1
      if (params == 'b') b = b + 1
      pointer += 1
      break

    case 'jmp':
      var dir = parseInt(params)
      pointer += dir
      break

    case 'jie':
      var [register,dir] = params.split(', ')
      dir = parseInt(dir)

      if (register == 'a' && a % 2 === 0) pointer += dir
      else if (register == 'b' && b % 2 === 0) pointer += dir
      else { pointer += 1 }
      break

    case 'jio':
      var [register,dir] = params.split(', ')
      dir = parseInt(dir)

      if (register == 'a' && a === 1) pointer += dir
      else if (register == 'b' && b === 1) pointer += dir
      else { pointer += 1 }
      break

    default:
      console.error(`Unknown instruction ${ins}`);
  }

  if (pointer > instructions.length - 1) {
    break
  }
}

console.log(a, b)
