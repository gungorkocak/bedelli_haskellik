import { h, app } from "hyperapp";

const PERSONAS = {
  "standart": "චᆽච",
  "yorgun": "(ﾐචᆽචﾐ)",
  "merakli": "(=චᆽච=)",
  "yanakli": "(₌චᆽච₌)",
  "suikastci": "(≈චᆽච≈)",
  "gurbuz": "(◍චᆽච◍)",
  "azGurbuz": "(๑චᆽච๑)",
  "halayli": "ฅ(=චᆽච=ฅ)",
  "artist": "(ﾐටᆽටﾐ)",
  "nyanlik": "(=ච㉨ච=)",
  "imanli": "(=ච ω ච=)",
  "kuskulu": "(=ච ﻌ ච=)",
  "hovarda": "(=ච⊱ච=)",
  "ilgili": "(=චᆽච=)",
  "saskin": "(=මᆽම=)",
  "kaotik": "(=මිᆽමි=)",
  "duvare": "(=ඒᆽඒ=)",
  "soke": "(=ඔᆽඔ=)",
  "partyBoy": "(=🝦 ༝ 🝦=)",
  "sikkin": "(ﾐㅇ ༝ ㅇﾐ)",
  "bigarip": "(=ලᆽල=)"
}

const CAT_BOX = [250, 100]

const state = {
  cats: [
    { id: 1, position: [200, 200], persona: "standart" },
    { id: 2, position: [500, 200], persona: "partyBoy" },
    { id: 3, position: [800, 200], persona: "saskin" },
    { id: 4, position: [200, 350], persona: "imanli" },
    { id: 5, position: [500, 350], persona: "gurbuz" }
  ],
  cursor: [0, 0],
  isDragging: false
}

const updateCatById = (id, cat, position) => (
  cat && cat.id == parseInt(id)
  ? Object.assign({},cat, {position})
  : cat
)

const actions = {
  drop: () => ({isDragging: false}),
  move: ({id, x, y}) => state => (
    id && state.isDragging
    ? {cats: state.cats.map(cat => updateCatById(id, cat, [x, y]))}
    : {}
  ),
  drag: ({id, x, y, cursorX, cursorY}) => state => ({
    cats: state.cats.map(cat => updateCatById(id, cat, [x, y])),
    cursor: [cursorX, cursorY],
    isDragging: true
  })
}

const Cat = ({id, persona, position} = cat) => (state, actions) => {
  const [x, y] = position
  const [cursorX, cursorY] = state.cursor

  return (
    <div
      id={id}
      class="cat"
      style={{left: x - cursorX + 'px', top: y - cursorY + 'px'}}
      onmousedown={e => {
        actions.drag({
          id,
          x, y,
          cursorX: e.offsetX,
          cursorY: e.offsetY
        })
      }}
    >
      {PERSONAS[persona]}
    </div>
  )
}

const view = (state, actions) => (
  <main>
    {state.cats.map(cat => {
      return <Cat id={cat.id} persona={cat.persona} position={cat.position} />
    })}
  </main>
)

const main = app(state, actions, view, document.body)

addEventListener("mouseup", main.drop)
addEventListener("mousemove", e => main.move({x: e.pageX, y: e.pageY, id: e.target.id}))