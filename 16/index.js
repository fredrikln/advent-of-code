const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\r\n')

const aunts = input.map(a => {
  const reg = a.match(/Sue ([0-9]{1,3}): ([a-z]+): ([0-9]+), ([a-z]+): ([0-9]+), ([a-z]+): ([0-9]+)/)
  return {
    name: reg[1],
    [reg[2]]: parseInt(reg[3], 10),
    [reg[4]]: parseInt(reg[5], 10),
    [reg[6]]: parseInt(reg[7], 10),
  }
})

const requirements = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
}

const one = aunts.filter(a => {
  let matches = true

  Object.keys(requirements).forEach(r => {
    if (a[r] && a[r] !== requirements[r]) matches = false
  })

  return matches
})

console.log(one)

const two = aunts
  .filter(a => {
    if (a.children !== undefined && a.children !== 3) return false
    if (a.cats !== undefined && a.cats <= 3) return false
    if (a.samoyeds !== undefined && a.samoyeds !== 2) return false
    if (a.pomeranians !== undefined && a.pomeranians >= 3) return false
    if (a.akitas !== undefined && a.akitas !== 0) return false
    if (a.vizslas !== undefined && a.vizslas !== 0) return false
    if (a.goldfish !== undefined && a.goldfish >= 5) return false
    if (a.trees !== undefined && a.trees <= 3) return false
    if (a.cars !== undefined && a.cars !== 2) return false
    if (a.perfumes !== undefined && a.perfumes !== 1) return false

    return true
  })

console.log(two)
