/*!
engine-blackjack
Copyright (C) 2016 Marco Casula

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/

const assert = require('assert')
import { serializeCard, serializeCards, newDeck, newDecks, shuffle } from '../src'

it('serializeCard should convert a string to a card object', ()=> {
  assert.deepStrictEqual(serializeCard('1-h'), {
    text: 'A',
    suite: 'hearts',
    value: 1,
    color: 'R'
  }, 'serialize 1-h')
  assert.deepStrictEqual(serializeCard('h2'), {
    text: '2',
    suite: 'hearts',
    value: 2,
    color: 'R'
  }, 'serialize h2')
  assert.deepStrictEqual(serializeCard('♣1'), {
    text: 'A',
    suite: 'clubs',
    value: 1,
    color: 'B'
  }, 'serialize ♣1')
  assert.deepStrictEqual(serializeCard('12spades'), {
    text: 'Q',
    suite: 'spades',
    value: 10,
    color: 'B'
  }, 'serialize 12spades')
  assert.deepStrictEqual(serializeCard('♦K'), {
    text: 'K',
    suite: 'diamonds',
    value: 10,
    color: 'R'
  }, 'serialize ♦K')
})

it('serializeCards should convert a string to an array of card objects', ()=> {
  assert.deepStrictEqual(serializeCards('h1 s1'), [
    {
      text: 'A',
      suite: 'hearts',
      value: 1,
      color: 'R'
    },
    {
      text: 'A',
      suite: 'spades',
      value: 1,
      color: 'B'
    }
  ], 'serialize h1 s1')
})

it('newDecks should return and array of 52 card objects', ()=> {
  assert.equal(newDeck().length, 52)
})

it('newDecks should return and array of 52*n card objects', ()=> {
  assert.equal(newDecks(2).length, 52 * 2)
})

test('newDeck returns same length, same positions of cards over time', () => {
  const deck1 = newDeck()
  const deck2 = newDeck()
  assert.deepStrictEqual(deck1, deck2, 'newDeck will always produce the same card sequence')
})

test('shuffle returns same length, different positions', () => {
  const deck1 = newDeck()
  const deck2 = newDeck()
  const shuffledDeck = shuffle(deck1)
  assert.notDeepStrictEqual(deck1, shuffledDeck, 'deck1 should contains different cards compared to shuffledDeck')
  assert.notDeepStrictEqual(deck2, shuffledDeck, 'deck2 should contains different cards compared to shuffledDeck')
})