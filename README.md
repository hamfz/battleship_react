This is based on react create app boilerplate. Install dependencies then:
`yarn start` or `npm start`


#### Description
Implementation of classic battleship program.

#### Requirements / Constraints
- 2 players can place ships
- Game begins when ships are placed
- Players take turns choosing an opponents grid to attack
- Attacks are responded to with 'Hit', 'Miss', 'Sunk', 'Win' accordingly
- Game ends when all of opponent's ships are lost

Additional:
- No CSS period, ASCII style "design"
- No dependencies / libraries other than React
- Attempt to keep data flow in a functional style

#### Use Instructions
Tested on Mac OSX Chrome (v64). Start local server and follow game steps.

#### Comments
Opted for less modular components in favor of simplicity in an effort to avoid  many layers of data flow/event bubbling since `App.js` is handling the main game state.
