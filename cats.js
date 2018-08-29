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

var state = {
  cats: [
    { id: 1, position: [200, 200], persona: "standart" },
    { id: 2, position: [500, 200], persona: "partyBoy" },
    { id: 3, position: [800, 200], persona: "saskin" },
    { id: 4, position: [200, 350], persona: "imanli" },
    { id: 5, position: [500, 350], persona: "gurbuz" }
  ],
  cursor: [0, 0],
  isDragging: false
};

var setState = function (newState) {
  state = {
    ...state,
    ...newState
  }
};

var catView = ({ id, persona, position }) => {
  const [x, y] = position;

  return `
      <div id="${id}" class="cat" style="left: ${x}px; top: ${y}px;">
        ${PERSONAS[persona]}
      </div>
  `
}

var render = function () {
  const { cats } = state;

  const catsView = cats.map(catView).join("\n");

  const canvas = document.querySelector(".canvas");
  canvas.innerHTML = catsView;
  // document.querySelector(".cat").style.left = x;
  // document.querySelector(".cat").style.top = y;
  // document.querySelector(".cat").innerHTML = personas["standart"];
};

var bindEvents = function () {
  const canvas = document.querySelector(".canvas");

  canvas.addEventListener("mousedown", function (event) {
    console.log("yoo", event.clientX);

    setState({
      cursor: [event.clientX, event.clientY],
      isDragging: true
    })
  });

  canvas.addEventListener("mouseup", function (event) {
    console.log("MOUSE UP");
    setState({
      isDragging: false
    });
  });

  canvas.addEventListener("mousemove", function (event) {
    if (state.isDragging) {
      const cat = event.target;
      const id = cat.id;

      const { width, height, top, left } = cat.getBoundingClientRect();

      console.log("cat::", width, height, top, left);
      const catRect = [event.clientX - (width / 2), event.clientY - (height / 2)];

      const newCats = state.cats
        .map(cat => {
          if (cat.id == id) {
            cat.position = catRect;
          }

          return cat;
        })

      setState({
        cats: newCats
      });

      render();
    }
  });

}

render();
bindEvents();