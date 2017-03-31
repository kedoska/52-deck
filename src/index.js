// @flow

import type { Card } from './type'

export const isNull = (obj: ?any): boolean => obj === null

export const isUndefined = (obj: ?any): boolean => obj === undefined

export const isNullOrUndef = (obj: ?any): boolean => isUndefined(obj) || isNull(obj)

export const cardName = (number: number): string => {
  if (isNullOrUndef(number)) {
    throw Error('Invalid number')
  }
  switch (number) {
    case 1: {
      return 'A'
    }
    case 11: {
      return 'J'
    }
    case 12: {
      return 'Q'
    }
    case 13: {
      return 'K'
    }
    default: {
      return number.toString()
    }
  }
}

export const suiteName = (suite: string): string => {
  switch (suite.toLowerCase()) {
    case '♥':
    case 'h':
    case 'heart':
    case 'hearts': {
      return 'hearts'
    }
    case '♦':
    case 'd':
    case 'diamond':
    case 'diamonds': {
      return 'diamonds'
    }
    case '♣':
    case 'c':
    case 'club':
    case 'clubs': {
      return 'clubs'
    }
    case '♠':
    case 's':
    case 'spade':
    case 'spades': {
      return 'spades'
    }
    default: {
      throw Error('invalid suite')
    }
  }
}

export const suiteColor = (suite: ?string): string => {
  switch (suite) {
    case 'hearts':
      return 'R'
    case 'diamonds':
      return 'R'
    case 'clubs':
      return 'B'
    case 'spades':
      return 'B'
    default:
      throw Error('invalid suite')
  }
}

export const cardValue = (number: number): number => number < 10 ? number : 10

export const makeCard = (number: number, suite: string): Card => {
  const _suite = suiteName(suite)
  return {
    text: cardName(number),
    suite: _suite,
    value: cardValue(number),
    color: suiteColor(_suite)
  }
}

export const newDecks = (n: number): Array<Card> => {
  let cards = []
  for (let i = 0; i < n; i++) {
    cards = newDeck().concat(cards)
  }
  return cards
}

export const newDeck = (): Array<Card> => {
  return [].concat.apply([],
    [ 'hearts', 'diamonds', 'clubs', 'spades' ]
      .map(suite => {
        return [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]
          .map(number => makeCard(number, suite))
      })
  )
}

export const getRandom = (v: number) => Math.floor(Math.random() * v)

export const shuffle = (original: Array<Card>): Array<Card> => {
  let array = original.slice(0)
  let currentIndex = array.length
  let temporaryValue
  let randomIndex
  while (currentIndex !== 0) {
    randomIndex = getRandom(currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

export const serializeCard = (value: string): Card => {
  const digits: ?Array<any> = value.match(/\d/g)
  const EMPTY: string = ''
  let number: number = 0
  let figure: string
  let suite: string = EMPTY
  if (digits && digits.length > 0) {
    number = Number(digits.join(''))
    suite = value.replace(number.toString(), '')
  } else {
    ['j', 'q', 'k']
      .forEach((x, i) => {
        if (value.indexOf(x) >= 0 || value.indexOf(x.toUpperCase()) >= 0) {
          number = 11 + i
          figure = x
          suite = value
            .replace(figure, EMPTY)
            .replace(figure.toUpperCase(), EMPTY)
        }
      })
  }
  if (number === 0) {
    throw Error('')
  }
  suite = suite.replace('-', EMPTY)
  return makeCard(number, suite)
}

export const serializeCards = (value:string): Array<Card> => {
  if (value === '') {
    throw Error('value should contains a valid raw card/s definition')
  }
  return value.trim().split(' ').map(serializeCard)
}
