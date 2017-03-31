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

### Card Model

```javascript
type Card = {
  text: string,
  suite: string,
  value: number,
  color: string
}
```
