# 52-deck

#### Installation

`yarn add 52-deck` or `npm install 52-deck`

### Usage

#### Get 52 cards deck

```javascript
import { newDeck } from '52-deck'

const deck = newDeck()

```

#### Shuffle 2 decks

```javascript
import { shuffle, newDecks } from '52-deck'

const deck = shuffle(newDecks(2))
```

#### Serialize 

```javascript
import { serializeCards } from '52-deck'

const [ firstCard, secondCard ] = serializeCards('♦K ♦2')

```

Valid input strings are:

 - `h1 s1 d12`
 - `11d 9s 9d 4s 12h 13d 13h 11h`
 - `♠10 ♦1 ♥5 ♣6 ♠11 ♦10`
 - `1-h 10-s`
 - `12spades 8diamond`

### Card Model

```javascript
type Card = {
  text: string,
  suite: string,
  value: number,
  color: string
}
```
