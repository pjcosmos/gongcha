const MENU = {
  "밀크티": [
    ["브라운슈가 쥬얼리 밀크티", 5500],
    ["블랙 밀크티", 4500],
    ["타로 밀크티", 4500],
    ["초콜렛 밀크티", 4500],
    ["우롱 밀크티", 4500],
    ["얼그레이 밀크티", 4500],
    ["자스민 밀크티", 4500],
    ["제주 그린 밀크티", 4900],
    ["딸기 듬뿍 밀크티", 5100],
    ["딸기 쥬얼리 밀크티", 5300],
    ["딸기 말차 밀크티", 5300],
    ["미니펄 망고 밀크", 5300],
    ["미니펄 딸기 밀크티", 5300],
    ["피스타치오 밀크티", 4900]
  ],

  "스무디": [
    ["청귤 요거티 크러쉬 + 핑크펄", 6000],
    ["레몬 요구르트 스무디 + 핑크펄", 5500],
    ["딸기 말차 크러쉬", 5500],
    ["딸기 쿠키 스무디", 5700],
    ["초코바른 제주 그린 스무디", 5900],
    ["초코바른 초코 스무디", 5700],
    ["초코바른 피스타치오 스무디", 5700],
    ["제주 그린 스무디", 5700],
    ["미니펄 망고 크러쉬", 5700],
    ["미니펄 딸기 크러쉬", 5700]
  ],

  "오리지널티": [
    ["블랙티", 4000],
    ["얼그레이티", 4000],
    ["우롱티", 4000],
    ["자스민 티", 4000]
  ],

  "프룻티": [
    ["허니 자몽 블랙티", 4800],
    ["자몽 자스민티", 4800],
    ["청포도 자스민티", 4800],
    ["망고 요구르트", 5000]
  ],

  "커피": [
    ["공차슈페너", 4500],
    ["아메리카노", 3900],
    ["얼그레이 아메리카노", 4400],
    ["카페라떼", 4400],
    ["바닐라 카페라떼", 4700],
    ["카페 모카", 4700]
  ]
};

let cart = [];

const menuGrid = document.getElementById("menuGrid");
const cartList = document.getElementById("cartList");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

function renderMenu(category) {
  const items = MENU[category];
  menuGrid.innerHTML = "";

  items.forEach(([name, price]) => {
    const div = document.createElement("div");
    div.className = "menu-card";
    div.innerHTML = `
      <div class="name">${name}</div>
      <div class="price">${price.toLocaleString()}원</div>
    `;
    div.addEventListener("click", () => openOption(name, price));
    menuGrid.appendChild(div);
  });
}

document.querySelectorAll(".category-bar button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".category-bar .active")?.classList.remove("active");
    btn.classList.add("active");
    renderMenu(btn.dataset.cat);
  });
});

// 초기 로딩
renderMenu("밀크티");

/* ------------------------
    옵션 팝업 관련
-------------------------*/

const modal = document.getElementById("optionModal");
const btnCancel = document.getElementById("btnCancel");
const btnAdd = document.getElementById("btnAddCart");

let selectedMenu = {};

function openOption(name, price) {
  selectedMenu = { name, price };
  document.getElementById("optMenuName").innerText = name;
  document.getElementById("optMenuPrice").innerText = price.toLocaleString() + "원";

  resetOptions();
  modal.style.display = "flex";
}

btnCancel.addEventListener("click", () => {
  modal.style.display = "none";
});

function resetOptions() {
  document
    .querySelectorAll(".opt-buttons button")
    .forEach(b => b.classList.remove("selected"));
}

["optCup","optTemp","optSugar","optIce","optTopping"].forEach(id=>{
  document.querySelectorAll(`#${id} button`).forEach(btn=>{
    btn.addEventListener("click",()=>{
      document
        .querySelectorAll(`#${id} button`)
        .forEach(b=>b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });
});

btnAdd.addEventListener("click", ()=>{

  const cup = getSel("optCup");
  const temp = getSel("optTemp");
  const sugar = getSel("optSugar");
  const ice = getSel("optIce");
  const topping = getSel("optTopping");

  const opt = `${cup} / ${temp} / 당도 ${sugar} / 얼음 ${ice} / ${topping}`;

  cart.push({
    name: selectedMenu.name,
    price: selectedMenu.price,
    opt
  });

  renderCart();
  modal.style.display="none";
});

function getSel(id){
  const b = document.querySelector(`#${id} .selected`);
  return b ? b.dataset.value : "-";
}

/* ------------------------
    장바구니
-------------------------*/

function renderCart() {
  cartList.innerHTML = "";

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "slot";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.justifyContent = "center";
    div.style.padding = "6px";

    div.innerHTML = `
      <div style="font-weight:600;">${item.name}</div>
      <div style="font-size:14px">${item.opt}</div>
      <div style="font-weight:600">${item.price.toLocaleString()}원</div>
    `;
    cartList.appendChild(div);
  });

  // 빈 칸 채우기 (6칸)
  for (let i = cart.length; i < 6; i++) {
    cartList.appendChild(Object.assign(document.createElement("div"), {
      className: "slot"
    }));
  }

  cartCount.innerText = `${cart.length}개`;
  cartTotal.innerText = `${cart.reduce((a,b)=>a+b.price, 0).toLocaleString()}원`;
}
