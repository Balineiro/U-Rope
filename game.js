/* ======================================   FIREBASE INITIALIZATION   ====================================== */

const firebaseConfig = {
  apiKey: "TA_CLE",
  authDomain: "TON_PROJET.firebaseapp.com",
  databaseURL: "https://TON_PROJET.firebaseio.com",
  projectId: "TON_PROJET",
  storageBucket: "TON_PROJET.appspot.com",
  messagingSenderId: "XXX",
  appId: "XXX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/* ======================================   MULTIPLAYER SETUP   ====================================== */

// ID unique pour ce joueur
const myId = "player_" + Math.random().toString(36).substr(2, 9);

// Position initiale
let playerX = 300;
let playerY = 300;
let playerAngle = 0;

// Enregistrer ce joueur dans Firebase
db.ref("players/" + myId).set({
  x: playerX,
  y: playerY,
  angle: playerAngle,
  team: "none" // on ajoutera les équipes ensuite
});

// Supprimer le joueur quand il quitte la page
db.ref("players/" + myId).onDisconnect().remove();

setInterval(() => {
  db.ref("players/" + myId).update({
    x: player.offsetLeft,
    y: player.offsetTop,
    angle: currentAngle
  });
}, 50); // 20 FPS réseau



// === DRAPEAU FIXE (DATA URL) ===
const FLAG_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="20" viewBox="0 0 28 20">
  <g clip-path="url(#clip0_1310_8031)">
    <path xmlns="http://www.w3.org/2000/svg" d="M27.999 0H-0.000976562V20H27.999V0Z" fill="url(#paint0_linear_1310_8031)"/>
    <path d="M27.999 0H13.3324V20H27.999V0Z" fill="url(#paint1_linear_1310_8031)"/>
    <path d="M9.33236 0H-0.000976562V20H9.33236V0Z" fill="url(#paint2_linear_1310_8031)"/>
    <path d="M18.6657 0H9.33237V20H18.6657V0Z" fill="url(#paint3_linear_1310_8031)"/>
  </g>
</svg>
`;

const FLAGS = {};
FLAGS.ukraine =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20' viewBox='0 0 28 20'%3E%3Cg clip-path='url(%23clip0)'%3E%3Crect width='28' height='20' rx='2' fill='white'/%3E%3Cmask id='m0' maskUnits='userSpaceOnUse' x='0' y='0' width='28' height='20'%3E%3Crect width='28' height='20' rx='2' fill='white'/%3E%3C/mask%3E%3Cg mask='url(%23m0)'%3E%3Cpath d='M0 10.6667H28V0H0V10.6667Z' fill='%23156DD1'/%3E%3Cpath d='M0 20H28V10.6667H0V20Z' fill='%23FFD948'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='28' height='20' rx='2' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.romania =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20' viewBox='0 0 28 20'%3E%3Cg clip-path='url(%23clip0)'%3E%3Crect width='28' height='20' rx='2' fill='white'/%3E%3Cmask id='m0' maskUnits='userSpaceOnUse' x='0' y='0' width='28' height='20'%3E%3Crect width='28' height='20' rx='2' fill='white'/%3E%3C/mask%3E%3Cg mask='url(%23m0)'%3E%3Crect x='13.3335' width='14.6667' height='20' fill='%23DE1D42'/%3E%3Cpath d='M0 20H9.33333V0H0V20Z' fill='%23083780'/%3E%3Cpath d='M9.3335 20H18.6668V0H9.3335V20Z' fill='%23FFD147'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='28' height='20' rx='2' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.turkey =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%23E92434'/%3E%3Cpath d='M19.02 10.768 17.796 12.253l.083-1.923-1.79-.706 1.854-.515.118-1.921 1.063 1.605 1.864-.482-1.198 1.507 1.034 1.624-1.803-.674Z' fill='%23fff'/%3E%3Cpath d='M17.403 13.684C16.305 15.093 14.592 16 12.667 16 9.353 16 6.667 13.314 6.667 10c0-3.314 2.686-6 6-6 1.925 0 3.638.907 4.736 2.316-.847-.616-1.912-.983-3.07-.983-2.761 0-5 2.09-5 4.667 0 2.577 2.239 4.666 5 4.666 1.157 0 2.223-.366 3.07-.982Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.norway =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20' viewBox='0 0 28 20'%3E%3Cg clip-path='url(%23clip0)'%3E%3Cpath d='M28 0H0V20H28V0Z' fill='%23F14247'/%3E%3Cpath d='M0 12H8V20H12V12H28V8H12V0H8V8H0V12Z' fill='white'/%3E%3Cpath d='M0 10.6667H9.33333V20H10.6667V10.6667H28V9.33333H10.6667V0H9.33333V9.33333H0V10.6667Z' fill='%230A3A85'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='28' height='20' rx='2' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.slovakia =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20' viewBox='0 0 28 20'%3E%3Cg clip-path='url(%23clip0)'%3E%3Crect x='0.25' y='0.25' width='27.5' height='19.5' rx='1.75' fill='white' stroke='%23F5F5F5' stroke-width='0.5'/%3E%3Cg mask='url(%23mask0)'%3E%3Cpath d='M0 13.3333H28V6.66667H0V13.3333Z' fill='%230C47B7'/%3E%3Cpath d='M0 20H28V13.3333H0V20Z' fill='%23E53B35'/%3E%3Cpath d='M13.0503 3.33333H6.94971C5.87505 3.33333 4.99249 4.1826 4.95119 5.25647L4.69194 11.9969C4.66847 12.6073 4.92515 13.1948 5.38888 13.5923L8.26456 16.0572C9.2632 16.9132 10.7368 16.9132 11.7355 16.0572L14.6111 13.5923C15.0749 13.1948 15.3315 12.6073 15.3081 11.9969L15.0488 5.25647C15.0075 4.1826 14.125 3.33333 13.0503 3.33333Z' fill='%23F73744' stroke='white' stroke-width='1.33333'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='28' height='20' rx='2' fill='white'/%3E%3C/clipPath%3E%3Cmask id='mask0'%3E%3Crect width='28' height='20' fill='white'/%3E%3C/mask%3E%3C/defs%3E%3C/svg%3E";
FLAGS.sweden =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20' viewBox='0 0 28 20'%3E%3Cg clip-path='url(%23clip0)'%3E%3Crect width='28' height='20' fill='%23157CBB'/%3E%3Cpath d='M0 12H8V20H12V12H28V8H12V0H8V8H0V12Z' fill='%23FFD34D'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='28' height='20' rx='2' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.slovenia =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20' viewBox='0 0 28 20'%3E%3Cg clip-path='url(%23clip0)'%3E%3Crect x='0.25' y='0.25' width='27.5' height='19.5' rx='1.75' fill='white' stroke='%23F5F5F5' stroke-width='0.5'/%3E%3Cg mask='url(%23mask0)'%3E%3Cpath d='M0 13.3333H28V6.66667H9.24398V5.33334C9.24398 5.33334 8.30367 4.66667 7.33333 4.66667C6.36299 4.66667 5.33333 5.33334 5.33333 5.33334V6.66667H0V13.3333Z' fill='%230C47B7'/%3E%3Cpath d='M0 20H28V13.3333H0V20Z' fill='%23E53B35'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='28' height='20' rx='2' fill='white'/%3E%3C/clipPath%3E%3Cmask id='mask0'%3E%3Crect width='28' height='20' fill='white'/%3E%3C/mask%3E%3C/defs%3E%3C/svg%3E";
FLAGS.serbia =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20' viewBox='0 0 28 20'%3E%3Cg clip-path='url(%23clip0)'%3E%3Cpath d='M28 0H0V20H28V0Z' fill='%23FFFFFF'/%3E%3Cpath d='M28 6.66667H0V13.3333H28V6.66667Z' fill='%2317508F'/%3E%3Cpath d='M28 0H0V6.66667H28V0Z' fill='%23E1444D'/%3E%3Cpath d='M28 13.3333H0V20H28V13.3333Z' fill='%23FFFFFF'/%3E%3Cmask id='m0' x='6' y='6' width='6' height='9'%3E%3Cpath d='M6 10c0-.9.5-2.7.5-2.7.1-.36.46-.66.83-.66h2.68c.36 0 .73.28.82.64 0 0 .5 1.77.5 2.66 0 .86-.5 2.7-.5 2.7-.09.35-.36.87-.61 1.13 0 0-.56.84-1.56.84s-1.56-.84-1.56-.84c-.24-.27-.52-.78-.61-1.14 0 0-.5-1.8-.5-2.7Z' fill='%23fff'/%3E%3C/mask%3E%3Cg mask='url(%23m0)'%3E%3Cpath d='M6 10c0-.9.5-2.7.5-2.7.1-.36.46-.66.83-.66h2.68c.36 0 .73.28.82.64 0 0 .5 1.77.5 2.66 0 .86-.5 2.7-.5 2.7-.09.35-.36.87-.61 1.13 0 0-.56.84-1.56.84s-1.56-.84-1.56-.84c-.24-.27-.52-.78-.61-1.14 0 0-.5-1.8-.5-2.7Z' fill='%23FFFFFF'/%3E%3Cpath d='M11.23 6.4 5.06 14.1l1.04.83 6.17-7.7-1.04-.83Z' fill='%23C43840'/%3E%3Cpath d='M5.06 7.23l6.17 7.7 1.04-.83-6.17-7.7-1.04.83Z' fill='%23C43840'/%3E%3C/g%3E%3Cpath d='M8.67 12c.74 0 1.33-.9 1.33-2s-.6-2-1.33-2c-.74 0-1.33.9-1.33 2s.6 2 1.33 2Z' fill='%23fff'/%3E%3Cpath d='M6.67 5.33 6 4l1.33.67L8.67 4l1.33.67L11.33 4l-.67 1.33v.67c0 .37-.29.67-.66.67H7.33c-.36 0-.66-.31-.66-.67v-.67Z' fill='%23D1A43A'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='28' height='20' rx='2' fill='%23fff'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.poland =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23clip0)'%3E%3Crect width='28' height='20' fill='%23fff'/%3E%3Cpath d='M0 20h28V9.333H0V20Z' fill='%23EB2A50'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.russia =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23clip0)'%3E%3Crect width='28' height='20' fill='%23fff'/%3E%3Cpath d='M0 13.333h28V6.667H0v6.666Z' fill='%230C47B7'/%3E%3Cpath d='M0 20h28v-6.667H0V20Z' fill='%23E53B35'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.portugal =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23clip0)'%3E%3Crect width='28' height='20' fill='%23FF2936'/%3E%3Cpath d='M0 20h10.667V0H0v20Z' fill='%23128415'/%3E%3Ccircle cx='10.667' cy='10' r='3.333' stroke='%23FAF94F' stroke-width='1.333' fill='none'/%3E%3Cpath d='M9.333 8.333c0-.184.15-.333.334-.333h2c.184 0 .333.149.333.333v2.334c0 .736-.597 1.333-1.333 1.333s-1.334-.597-1.334-1.333V8.333Z' fill='%23fff'/%3E%3Cpath d='M10.667 10.667c.369 0 .667-.965.667-1.334 0-.368-.298-.666-.667-.666-.368 0-.667.298-.667.666 0 .369.299 1.334.667 1.334Z' fill='%231D50B5'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.netherlands =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23clip0)'%3E%3Crect width='28' height='20' fill='%23fff'/%3E%3Cpath d='M0 6.667h28V0H0v6.667Z' fill='%23CA2B39'/%3E%3Cpath d='M0 20h28v-6.667H0V20Z' fill='%232C56A2'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.moldova =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23clip0)'%3E%3Crect width='28' height='20' fill='%23EB1C43'/%3E%3Cpath d='M0 20h9.333V0H0v20Z' fill='%23115BCB'/%3E%3Cpath d='M9.333 20h9.333V0H9.333v20Z' fill='%23FFD953'/%3E%3Cpath d='M13.333 8H12v4l2 1.333L16 12V8h-1.333L14 6l-.667 2Zm1.333 3.333V9.333h-1.333v2h1.333Z' fill='%23AF7F59'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.kosovo =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%232F5FBF'/%3E%3Cpath d='M12 4.667 11.058 4.943 11.334 4l-.276-.943L12 3.333l.944-.276L12.667 4l.277.943L12 4.667Zm4 0L15.058 4.943 15.334 4l-.276-.943L16 3.333l.944-.276L16.667 4l.277.943L16 4.667Zm4 1.333L19.058 6.276 19.334 5.333l-.276-.943L20 4.667l.944-.277L20.667 5.333l.277.943L20 6Zm2.667 2.667L21.725 8.943 22 8l-.275-.943L22.667 7.333l.944-.276L23.334 8l.277.943L22.667 9.333ZM5.334 9.333 4.392 9.61 4.667 8l-.275-.943L5.334 7.333l.943-.276L6 8l.277.943L5.334 9.333ZM8 6l-.942.276L7.334 5.333l-.276-.943L8 4.667l.944-.277L8.667 5.333l.277.943L8 6Z' fill='%23fff'/%3E%3Cpath d='M12 13.333 10.667 12.667 9.334 10h1.333L12 8.667l.667-1.334L14 6.667l.667.666L16 8v.667l.667.666 2 1.334-.667 2-2 2-.667-1.333-2 1.333V16l-.667-.667L12 13.333Z' fill='%23E9C072'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.north_macedonia =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%23E81B26'/%3E%3Ccircle cx='14' cy='10' r='3.333' fill='%23FFE94F'/%3E%3Cpath d='M10.21 7.28 1.96-3.53-0.715-.558 10.21 7.28Zm.69 6.206L-0.715 20.558 1.96 23.53l8.94-10.044ZM13.085 14.577 12 20h4l-1.085-5.423A8 8 0 0 1 14 14.667c-.313 0-.619-.03-.915-.09Zm4.707-1.856 8.946 10.044 2.676-2.972-10.923-7.837Zm-8.412-2.06A5.3 5.3 0 0 1 9.333 10c0-.224.016-.444.046-.66L0 8v4l9.38-1.34ZM13.085 5.423 12 0h4l-1.085 5.423A8 8 0 0 0 14 5.333c-.313 0-.619.03-.915.09Zm5.536 3.917L28 8v4l-9.38-1.34c.03-.216.046-.436.046-.66Zm-.83-2.06L26.038-3.53 28.715-.558 17.792 7.28Z' fill='%23FFE94F'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.montenegro =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23clip0)'%3E%3Crect width='28' height='20' fill='%23E6BE53'/%3E%3Cpath d='M1.333 17.667c0 .553.448 1 1 1h23.334c.552 0 1-.447 1-1V2.333c0-.552-.448-1-1-1H2.333c-.552 0-1 .448-1 1v15.334Z' fill='%23E01826'/%3E%3Cpath d='M13.023 3.659c-.47.156-.61.753-.26 1.103l.375.375c.125.125.295.195.472.195h.781c.177 0 .347-.07.472-.195l.375-.375c.35-.35.21-.947-.26-1.103l-.766-.255a.667.667 0 0 0-.422 0l-.767.255Zm1.449 3.203c-.26.26-.682.26-.943 0l-.195-.195-1-.994a.667.667 0 0 0-.77-.125l-.076.038c-.407.203-.495.746-.173 1.068l.012.012 1 .994c.203.203.253.513.125.77l-.414.828a.667.667 0 0 0 .52.94l.323.162a.667.667 0 0 0 .875-.652c0-.056-.013-.111-.038-.161l-.414-.828a.667.667 0 0 1 .125-.77l1-.994.012-.012c.322-.322.234-.865-.173-1.068l-.076-.038a.667.667 0 0 0-.77.125l-1 .994-.195.195Z' fill='%23E6BE53'/%3E%3Cpath d='M12.667 11.333c0 .246.413.327.533.113.232-.417.516-.78.8-.78.284 0 .568.363.8.78.12.214.533.133.533-.113 0-1.104-.597-2-1.333-2-.736 0-1.333.896-1.333 2Z' fill='%23215F90'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.latvia =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23clip0)'%3E%3Crect width='28' height='20' fill='%23fff'/%3E%3Cpath d='M0 8h28V0H0v8Z' fill='%23B9414B'/%3E%3Cpath d='M0 20h28v-8H0v8Z' fill='%23B9414B'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.lithuania =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23clip0)'%3E%3Cpath d='M0 6.667h28V0H0v6.667Z' fill='%23FEC34B'/%3E%3Cpath d='M0 13.333h28V6.667H0v6.666Z' fill='%23118357'/%3E%3Cpath d='M0 20h28v-6.667H0V20Z' fill='%23D8343D'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.luxembourg =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%23fff'/%3E%3Cpath d='M0 6.667h28V0H0v6.667Z' fill='%23F14455'/%3E%3Cpath d='M0 20h28v-6.667H0V20Z' fill='%2329B4EE'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.iceland =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%230E4CB5'/%3E%3Cpath d='M0 12h8v8h4v-8h16V8H12V0H8v8H0v4Z' fill='%23fff'/%3E%3Cpath d='M0 10.667h9.333V20h1.334V10.667H28V9.333H10.667V0H9.333v9.333H0v1.334Z' fill='%23EB363A'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.italy =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%23fff'/%3E%3Crect x='18.667' width='9.333' height='20' fill='%23E43D4C'/%3E%3Crect width='9.333' height='20' fill='%231BB65D'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.croatia =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%23fff'/%3E%3Cpath d='M0 6.667h28V0H0v6.667Z' fill='%23FF202D'/%3E%3Cpath d='M0 20h28v-6.667H0V20Z' fill='%232027AC'/%3E%3Cpath d='M12 6.667h-1.333L10.667 8H12v1.333h-1.333v1.334H12V12h-1.333v1.333H12v1.334h1.333v-1.334h1.334v1.334H16v-1.334h1.333V12H16v-1.333h1.333V9.333H16V8h1.333L16.667 6.667H16V8h-1.333V6.667h-1.334V8H12V6.667Zm1.333 2.666V8h1.334v1.333h-1.334Zm0 1.334V9.333H12v1.334h1.333Zm1.334 0h-1.334V12H12v1.333h1.333V12h1.334v1.333H16V12h-1.333v-1.333Zm0 0H16V9.333h-1.333v1.334Z' fill='%23FD0D1B'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.ireland =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%23fff'/%3E%3Crect x='18.667' width='9.333' height='20' fill='%23FF8515'/%3E%3Crect width='9.333' height='20' fill='%2307BB59'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.hungary =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%23fff'/%3E%3Cpath d='M0 6.667h28V0H0v6.667Z' fill='%23E03D52'/%3E%3Cpath d='M0 20h28v-6.667H0V20Z' fill='%235A9165'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.greece =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%23fff'/%3E%3Cpath d='M5.333 0H0v5.333h5.333V0Zm8 0H8v5.333h5.333V0Zm0 0h14.667v2.667H13.333V0Zm14.667 5.333H13.333V8h14.667V5.333Zm-14.667 5.333h14.667v2.667H13.333v-2.667ZM28 16H0v2.667h28V16ZM8 8h5.333v5.333H8V8Zm-2.667 0H0v5.333h5.333V8Z' fill='%231C6DC1'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.switzerland =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%23FF0000'/%3E%3Cpath d='M12 12H8.333a.333.333 0 0 1-.333-.333V8.333c0-.184.149-.333.333-.333H12V4.333c0-.184.149-.333.333-.333h3.334c.184 0 .333.149.333.333V8h3.667c.184 0 .333.149.333.333v3.334c0 .184-.149.333-.333.333H16v3.667c0 .184-.149.333-.333.333h-3.334A.333.333 0 0 1 12 15.667V12Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.denmark =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Cpath d='M2 0C.895 0 0 .895 0 2v6h8V0H2Zm10 0v8h16V2c0-1.105-.895-2-2-2H12Zm16 12H12v8h14c1.105 0 2-.895 2-2v-6ZM8 20v-8H0v6c0 1.105.895 2 2 2h6Z' fill='%23EF264D'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.czechia =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Cpath d='M0 20h28V10H0v10Z' fill='%23E8252A'/%3E%3Cpath d='M0 0l13.333 10L0 20V0Z' fill='%2317579E'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.germany =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Cpath d='M0 6.667h28V0H0v6.667Z' fill='%23262626'/%3E%3Cpath d='M0 13.333h28V6.667H0v6.666Z' fill='%23F01515'/%3E%3Cpath d='M0 20h28v-6.667H0V20Z' fill='%23FFD521'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.france =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%23fff'/%3E%3Crect width='9.333' height='20' fill='%231035BB'/%3E%3Crect x='18.667' width='9.333' height='20' fill='%23F44653'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.spain =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Cpath d='M0 5.333h28V0H0v5.333Z' fill='%23DD172C'/%3E%3Cpath d='M0 20h28v-5.333H0V20Z' fill='%23DD172C'/%3E%3Cpath d='M0 14.667h28V5.333H0v9.334Z' fill='%23FFD133'/%3E%3Cpath d='M7.333 9.333h1.334V10H7.333V9.333Z' fill='%23FFEDB1'/%3E%3Cpath d='M6.39 9h1.885c.195 0 .348.167.332.361l-.17 2.055c-.043.518-.476.917-.996.917h-.213c-.52 0-.953-.399-.996-.917L6.06 9.361C6.043 9.167 6.197 9 6.39 9Z' stroke='%23A41517' stroke-width='.667'/%3E%3Cpath d='M6 10h2.667v.667H8l-.667 1.333L6.667 10.667H6V10Z' fill='%23A41517'/%3E%3Crect x='4' y='8' width='1.333' height='4.667' rx='.667' fill='%23A41517'/%3E%3Crect x='9.333' y='8' width='1.333' height='4.667' rx='.667' fill='%23A41517'/%3E%3Cpath d='M6 7.733c0-.589.478-1.066 1.067-1.066H7.6c.589 0 1.067.477 1.067 1.066 0 .148-.12.267-.267.267H6.267A.267.267 0 0 1 6 7.733Z' fill='%23A41517'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.estonia =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Cpath d='M0 6.667h28V0H0v6.667Z' fill='%235DA8F1'/%3E%3Cpath d='M0 13.333h28V6.667H0v6.666Z' fill='%23262626'/%3E%3Cpath d='M0 20h28v-6.667H0V20Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.finland =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%23fff'/%3E%3Cpath d='M-1.333 12H8v9.333h4V12h17.333V8H12V-1.333H8V8H-1.333V12Z' fill='%230848A6'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.united_kingdom =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%230A17A7'/%3E%3Cpath d='M-1.282-1.916 10.667 6.143V-1.333h6.667V6.143L29.283-1.916l1.49 2.21L21.326 6.667H28v6.666h-6.674l9.447 6.372-1.49 2.21L17.334 13.857V21.333H10.667V13.857L-1.282 21.916l-1.491-2.21L6.674 13.333H0V6.667h6.674L-2.773.294l1.491-2.21Z' fill='%23fff'/%3E%3Cpath d='M18.668 6.332 31.333-2' stroke='%23DB1F35' stroke-width='.667' stroke-linecap='round'/%3E%3Cpath d='M20.013 13.697l11.354 7.653' stroke='%23DB1F35' stroke-width='.667' stroke-linecap='round'/%3E%3Cpath d='M8.006 6.31-3.837-1.67' stroke='%23DB1F35' stroke-width='.667' stroke-linecap='round'/%3E%3Cpath d='M9.29 13.605-3.837 22.31' stroke='%23DB1F35' stroke-width='.667' stroke-linecap='round'/%3E%3Cpath d='M0 12h12v8h4v-8h12V8H16V0h-4v8H0v4Z' fill='%23E6273E'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.georgia =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Cpath d='M16 21.333h-4V12H-1.333V8H12V-1.333h4V8h13.333v4H16v9.333Z' fill='%23FF2B37'/%3E%3Cpath d='M21.6 4.4 20 4.667V3.333l1.6.267L21.333 2h1.334l-.267 1.6L24 3.333v1.334l-1.6-.267L22.667 6h-1.334l.267-1.6Z' fill='%23FD0D1B'/%3E%3Cpath d='M5.6 4.4 4 4.667V3.333l1.6.267L5.333 2h1.334l-.267 1.6L8 3.333v1.334l-1.6-.267L6.667 6H5.333l.267-1.6Z' fill='%23FD0D1B'/%3E%3Cpath d='M5.6 16.4 4 16.667v-1.334l1.6.267L5.333 14h1.334l-.267 1.6L8 15.333v1.334l-1.6-.267L6.667 18H5.333l.267-1.6Z' fill='%23FD0D1B'/%3E%3Cpath d='M21.6 16.4 20 16.667v-1.334l1.6.267L21.333 14h1.334l-.267 1.6L24 15.333v1.334l-1.6-.267L22.667 18h-1.334l.267-1.6Z' fill='%23FD0D1B'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.armenia =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Cpath d='M0 6.667h28V0H0v6.667Z' fill='%23F01C31'/%3E%3Cpath d='M0 13.333h28V6.667H0v6.666Z' fill='%231047B9'/%3E%3Cpath d='M0 20h28v-6.667H0V20Z' fill='%23FECB2F'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.austria =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Cpath d='M0 6.667h28V0H0v6.667Z' fill='%23F64253'/%3E%3Cpath d='M0 20h28v-6.667H0V20Z' fill='%23F64253'/%3E%3Cpath d='M0 13.333h28V6.667H0v6.666Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.albania =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Crect width='28' height='20' fill='%23EE343C'/%3E%3Cpath d='M12.386 4.386c-.224-.224-.576-.259-.84-.083l-.59.393c-.426.284-.386.922.072 1.151l1.27.635c.226.113.369.344.369.597v.254c0 .368-.299.667-.667.667h-.509a.667.667 0 0 1-.298-.07L9.096 6.882c-.256-.128-.566-.078-.769.125l-.34.34c-.322.322-.234.865.173 1.068l.944.472c.399.2.434.756.063 1.003-.43.288-.298.952.21 1.054l.562.112c.54.108.698.804.258 1.134l-.503.378c-.328.246-.154.768.256.768.035 0 .07-.004.104-.012l1.262-.316c.478-.12.853.412.58.822-.239.358.018.839.449.839h.584c.244 0 .46.156.537.387.172.517.903.517 1.075 0a.563.563 0 0 1 .538-.387h.584c.431 0 .688-.48.449-.839-.273-.41.102-.942.58-.822l1.262.316c.034.008.069.012.104.012.41 0 .584-.522.256-.768l-.503-.378c-.44-.33-.282-1.026.258-1.134l.562-.112c.508-.102.64-.766.21-1.054-.371-.247-.336-.803.063-1.003l.944-.472c.407-.203.495-.746.173-1.068l-.34-.34c-.203-.203-.513-.253-.769-.125l-2.096 1.048a.667.667 0 0 1-.298.07H16c-.368 0-.667-.299-.667-.667v-.254c0-.253.143-.484.369-.597l1.27-.635c.458-.229.498-.867.072-1.151l-.59-.393c-.264-.176-.616-.141-.84.083l-1.142 1.142a.667.667 0 0 1-.942 0L12.386 4.386Z' fill='%23262626'/%3E%3C/svg%3E";
FLAGS.azerbaijan =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Cpath d='M0 6.667h28V0H0v6.667Z' fill='%2324AAD5'/%3E%3Cpath d='M0 13.333h28V6.667H0v6.666Z' fill='%23ED1845'/%3E%3Cpath d='M0 20h28v-6.667H0V20Z' fill='%2321BF75'/%3E%3Cpath d='M14 12c.411 0 .794-.124 1.111-.337a1.667 1.667 0 1 1 0-2.326A2 2 0 1 0 14 12Zm2-.667a.667.667 0 1 1 0-1.333.667.667 0 0 1 0 1.333Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.bosnia =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%230B36B2'/%3E%3Cpath d='M22.667 20V0H8.667L22.667 20Z' fill='%23FFD045'/%3E%3Cpath d='M17.333 18.667 16.39 18.943 16.667 18l-.276-.943.943.276.943-.276L18 18l.276.943-.943-.276Z' fill='%23fff'/%3E%3Cpath d='M14.667 14.667 13.724 14.943 14 14l-.276-.943.943.276.943-.276L15.333 14l.276.943-.943-.276Z' fill='%23fff'/%3E%3Cpath d='M12 10.667 11.057 10.943 11.333 10l-.276-.943.943.276.943-.276L12.667 10l.276.943-.943-.276Z' fill='%23fff'/%3E%3Cpath d='M9.333 6.667 8.39 6.943 8.667 6l-.276-.943.943.276.943-.276L10 6l.276.943-.943-.276Z' fill='%23fff'/%3E%3Cpath d='M6.667 2.667 5.724 2.943 6 2l-.276-.943.943.276.943-.276L7.333 2l.276.943-.943-.276Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.belgium =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect x='13.333' width='14.667' height='20' fill='%23FF4453'/%3E%3Crect width='9.333' height='20' fill='%23262626'/%3E%3Crect x='9.333' width='9.333' height='20' fill='%23FFCF3C'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.belarus =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Cpath d='M0 13.333h28V0H0v13.333Z' fill='%23E54252'/%3E%3Cpath d='M0 20h28v-6.667H0V20Z' fill='%235CBE6B'/%3E%3Cpath d='M0 0h4v3l-.667 1L4 5v2l-.667 1L4 9v2l-.667 1L4 13v2l-.667 1L4 17v3H0V0Z' fill='%23fff'/%3E%3Cpath d='M-.667 2-2 4l1.333 2L-2 8l1.333 2L-2 12l1.333 2L-2 16l1.333 2L.667 16l-1.334-2L.667 12l-1.334-2L.667 8l-1.334-2L.667 4-.667 2Z' fill='%23E54252'/%3E%3Cpath d='M.667 2 2 0l1.333 2L2 4 .667 2Zm1.333 6L.667 6 2 4l1.333 2L2 8Zm0 4L.667 10 2 8l1.333 2L2 12Zm0 4 1.333-2L2 12l-1.333 2L2 16Zm0 0 1.333 2L2 20l-1.333-2L2 16Z' fill='%23E54252'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.bulgaria =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%23fff'/%3E%3Cpath d='M0 13.333h28V6.667H0v6.666Z' fill='%2306A77C'/%3E%3Cpath d='M0 20h28v-6.667H0V20Z' fill='%23E32E19'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";



/* ============================================ PLAYER SETUP ============================================ */

let mouseX = 0;
let mouseY = 0;
const player = document.getElementById("player");

// Créer un conteneur pour le corps (rotation)
let playerBody = document.createElement("div");
playerBody.id = "player-body";
playerBody.style.position = "absolute";
playerBody.style.left = "0";
playerBody.style.top = "0";
playerBody.style.width = "100%";
playerBody.style.height = "100%";

// Déplacer l'arme dans player-body
const weapon = document.getElementById("weapon");
playerBody.appendChild(weapon);

// Insérer player-body dans #player
player.prepend(playerBody);

const map = document.querySelector(".map");
const zones = Array.from(document.querySelectorAll(".zone"));
const obstacles = [];
const binds = {
  up: "keyw",
  down: "keys",
  left: "keya",
  right: "keyd",
  ability: "space",
};
const playerRot = document.getElementById("player-rot");

let mouseSensitivity = 0.4;
let virtualMouseX = window.innerWidth / 2;
let virtualMouseY = window.innerHeight / 2;

let clampRadius = 200; // distance max autour du joueur
let currentAngle = 0;

/* ============================================ POINTER LOCK ============================================ */

window.addEventListener("load", () => {
  document.body.classList.add("no-cursor");
  document.body.requestPointerLock();
});

document.body.addEventListener("click", () => {
  document.body.requestPointerLock();
});

document.addEventListener("pointerlockchange", () => {
  if (document.pointerLockElement !== document.body) {
    console.log("Pointer lock désactivé");
  }
});

window.addEventListener("click", () => {
  document.body.classList.add("no-cursor");
});

/* ============================================ SHOOTING & AMMO ============================================ */

function shootBullet() {
  const bullet = document.createElement("div");
  bullet.className = "bullet";

  // 1) Position du barrel (pointe du canon)
  const barrelRect = barrel.getBoundingClientRect();
  const bx0 = barrelRect.left;
  const by0 = barrelRect.top;

  // 2) Angle actuel du joueur (parfait)
  const angle = currentAngle;
  const dirX = Math.cos(angle - Math.PI / 2);
  const dirY = Math.sin(angle - Math.PI / 2);

  // 3) Décalage caméra
  const transform = map.style.transform;
  const match = transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
  const offsetX = match ? parseFloat(match[1]) : 0;
  const offsetY = match ? parseFloat(match[2]) : 0;

  // 4) Position réelle dans la map (depuis le barrel)
  bullet.style.left = bx0 - offsetX - 6 + "px";
  bullet.style.top = by0 - offsetY - 6 + "px";

  map.appendChild(bullet);

  // 5) Mouvement de la balle
  const speed = 10;
  const maxDistance = 600;
  let traveled = 0;

  function moveBullet() {
    traveled += speed;

    if (traveled > maxDistance) {
      bullet.remove();
      return;
    }

    const bx = parseFloat(bullet.style.left) + dirX * speed;
    const by = parseFloat(bullet.style.top) + dirY * speed;

    bullet.style.left = bx + "px";
    bullet.style.top = by + "px";

    // --- Collision balle → obstacles ---
    for (const o of obstacles) {
      const ox = o.x;
      const oy = o.y;
      const or = o.r;

      const bx = parseFloat(bullet.style.left);
      const by = parseFloat(bullet.style.top);

      const dx = bx - ox;
      const dy = by - oy;
      const dist = Math.hypot(dx, dy);

      if (dist < or) {
        // Afficher la barre de HP
        o.el.hpBar.style.display = "block";

        // Reset du timer si le bloc reprend un coup
        clearTimeout(o.el.hideHpTimeout);

        // Cacher la barre après 2 secondes
        o.el.hideHpTimeout = setTimeout(() => {
          o.el.hpBar.style.display = "none";
        }, 2000);

        // Enlever 20% HP
        o.el.hp -= 20;
        if (o.el.hp < 0) o.el.hp = 0;

        // Mettre à jour la barre
        o.el.hpFill.style.width = o.el.hp + "%";

        // Réduire luminosité de 10%
        o.el.brightness -= 10;
        if (o.el.brightness < 0) o.el.brightness = 0;

        o.el.style.filter = `brightness(${o.el.brightness}%)`;

        // Détruire la balle
        bullet.remove();

        // Détruire le bloc si HP = 0
        if (o.el.hp <= 0) {
          o.el.remove();
          obstacles.splice(obstacles.indexOf(o), 1);
        }

        return;
      }
    }

    requestAnimationFrame(moveBullet);
  }

  moveBullet();
}

let canShoot = true;
const shootCooldown = 200; // 5 balles/sec

let ammo = 10;
let maxAmmo = 10;
let reloading = false;

function updateAmmoHUD() {
  ammoText.textContent = ammo + "/" + maxAmmo;
}
updateAmmoHUD();

document.addEventListener("mousedown", (e) => {
  if (e.button !== 0) return;
  if (!canShoot || reloading) return;

  if (ammo <= 0) {
    if (!reloading) startReload();
    return;
  }

  ammo--;
  updateAmmoHUD();

  if (ammo <= 0) {
    startReload();
  }

  canShoot = false;
  shootBullet();

  setTimeout(() => {
    canShoot = true;
  }, shootCooldown);
});

window.addEventListener("keydown", (e) => {
  if (e.code === "KeyR") {
    if (!reloading && ammo < maxAmmo) {
      startReload();
    }
  }
});

function startReload() {
  if (reloading) return;
  reloading = true;

  const reloadDuration = 2000;
  reloadOverlay.style.width = "0%";
  reloadOverlay.style.display = "block";

  let start = null;

  function animateReload(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / reloadDuration, 1);

    // Progression horizontale
    reloadOverlay.style.width = progress * 100 + "%";

    if (progress < 1) {
      requestAnimationFrame(animateReload);
    } else {
      // Fin du reload
      ammo = maxAmmo;
      updateAmmoHUD();
      reloading = false;

      // Effet "pop" comme les zones
      ammoHUD.style.animation = "ammoPop 0.3s ease";
      setTimeout(() => {
        ammoHUD.style.animation = "";
      }, 300);

      // Disparition overlay
      reloadOverlay.style.display = "none";
    }
  }

  requestAnimationFrame(animateReload);

  // Animation arme : avance de 10px
  weapon.style.transition = "transform 0.2s";
  weapon.style.transform = "translateY(-10px)";
  weapon.style.background = "#5a5a5a";

  // Retour arme après 2s
  setTimeout(() => {
    weapon.style.transform = "translateY(0px)";
    weapon.style.background = "#000";
  }, reloadDuration);
}

/* ============================================ MOUSE & AIM ============================================ */

window.addEventListener("mousemove", (e) => {
  if (document.pointerLockElement !== document.body) return;

  // Déplacement souris virtuelle avec sensibilité
  virtualMouseX += e.movementX * mouseSensitivity;
  virtualMouseY += e.movementY * mouseSensitivity;

  const rect = player.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  let dx = virtualMouseX - cx;
  let dy = virtualMouseY - cy;
  let dist = Math.hypot(dx, dy);

  // Clamp dans un cercle
  if (dist > clampRadius) {
    dx = (dx / dist) * clampRadius;
    dy = (dy / dist) * clampRadius;
    virtualMouseX = cx + dx;
    virtualMouseY = cy + dy;
  }

  // Angle direct (sans smoothing)
  currentAngle = Math.atan2(dy, dx) + Math.PI / 2;

  // Rotation du joueur
  player.style.transform = `rotate(${currentAngle}rad)`;
});

/* ============================================ PLAYER HUD ============================================ */

// --- HUD attaché au player (création) ---
if (!player.querySelector(".player-hud")) {
  const hud = document.createElement("div");
  hud.className = "player-hud";

  // --- PSEUDO + DRAPEAU ---
  const nameWrap = document.createElement("div");
  nameWrap.className = "player-name-wrap";

  // Image du drapeau
  const flagImg = document.createElement("img");
  flagImg.className = "player-flag";
  const chosenCountry = localStorage.getItem("chosenCountry");
  if (chosenCountry && FLAGS[chosenCountry]) {
    flagImg.src = FLAGS[chosenCountry];
  } else {
    flagImg.style.display = "none"; // aucun drapeau si aucun pays choisi
  }

  // Pseudo
  const nameEl = document.createElement("span");
  nameEl.className = "player-name";
  nameEl.textContent = localStorage.getItem("playerName") || "Player";

  nameWrap.appendChild(flagImg);
  nameWrap.appendChild(nameEl);
  hud.appendChild(nameWrap);

  // conteneur des barres
  const healthWrap = document.createElement("div");
  healthWrap.className = "health-wrap";

  // barre 1
  const hb1 = document.createElement("div");
  hb1.className = "health-bar";
  const hb1fill = document.createElement("div");
  hb1fill.className = "health-fill";
  hb1fill.style.width = "100%"; // full au début
  hb1fill.style.background = "#4ba9d4";
  hb1.appendChild(hb1fill);

  // barre 2
  const hb2 = document.createElement("div");
  hb2.className = "health-bar";
  const hb2fill = document.createElement("div");
  hb2fill.className = "health-fill";
  hb2fill.style.width = "100%";
  hb2.appendChild(hb2fill);

  healthWrap.appendChild(hb1);
  healthWrap.appendChild(hb2);

  hud.appendChild(healthWrap);

  player.parentElement.appendChild(hud); // ✔️ on garde, mais maintenant hud n'est plus dans player-body

  // expose references si tu veux manipuler plus tard
  player._hud = {
    root: hud,
    nameEl,
    healthWrap,
    hb1fill,
    hb2fill,
  };
}

/* ============================================ PLAYER MOVEMENT ============================================ */

// Mettre à jour la position du pseudo à chaque frame
function updatePlayerPosition() {
  let vx = 0;
  let vy = 0;

  if (keys[binds.up]) vy -= 1;
  if (keys[binds.down]) vy += 1;
  if (keys[binds.left]) vx -= 1;
  if (keys[binds.right]) vx += 1;

  const len = Math.hypot(vx, vy);
  if (len > 0) {
    vx = (vx / len) * speed;
    vy = (vy / len) * speed;
  }

  posX += vx;
  posY += vy;

  // Collision avec obstacles (cercle vs cercle + glissement)
  for (const o of obstacles) {
    const dx = posX - o.x;
    const dy = posY - o.y;
    const dist = Math.hypot(dx, dy);
    const minDist = 50 + o.r; // 50 = rayon joueur

    if (dist < minDist && dist > 0) {
      // vecteur normalisé du centre de l'obstacle vers le joueur
      const nx = dx / dist;
      const ny = dy / dist;

      // profondeur d'intersection
      const overlap = minDist - dist;

      // on repousse le joueur juste assez pour sortir du bloc
      posX += nx * overlap;
      posY += ny * overlap;
    }
  }

  // Limite circulaire
  const cx = map.clientWidth / 2;
  const cy = map.clientHeight / 2;
  const maxR = 2500 - 50;

  const dx = posX - cx;
  const dy = posY - cy;
  const dist = Math.hypot(dx, dy);

  if (dist > maxR) {
    const a = Math.atan2(dy, dx);
    posX = cx + Math.cos(a) * maxR;
    posY = cy + Math.sin(a) * maxR;
  }

  // Position
  player.style.left = posX - 50 + "px";
  player.style.top = posY - 50 + "px";

  // Caméra
  const camX = window.innerWidth / 2 - posX;
  const camY = window.innerHeight / 2 - posY;
  map.style.transform = `translate(${camX}px, ${camY}px)`;

  const hud = player._hud.root;
  hud.style.left = posX + 4 + "px";
  hud.style.top = posY - 85 + "px"; // un peu au-dessus du player

  function syncPlayerToFirebase() {
    db.ref("players/" + myId).update({
      x: player.offsetLeft,
      y: player.offsetTop,
      angle: playerAngle
    });
  }
}

const speed = 6;
let posX, posY; // position joueur sur la grande map

let keys = {};
let captures = {};
let capturedZones = new Set();

const storedBinds = JSON.parse(localStorage.getItem("binds"));
if (storedBinds) {
  binds = storedBinds; // utilise la variable binds déjà existante
}

/* ============================================ KEY BINDINGS ============================================ */

let lastObstacleTime = 0;
const obstacleCooldown = 5000; // en ms

window.addEventListener("keydown", (e) => {
  const k = e.code.toLowerCase(); // ex: "space", "keyz", "keyg"
  keys[k] = true;

  if (k === binds.ability && abilityReady) {
    const now = Date.now();
    if (now - lastObstacleTime > obstacleCooldown) {
      spawnObstacle();
      triggerAbilityCooldown();
      lastObstacleTime = now;
    }
  }
});

window.addEventListener("keyup", (e) => {
  const k = e.code.toLowerCase();
  keys[k] = false;
});

/* ============================================ ZONES & CAPTURE ============================================ */

// Position des zones sur la grande map (fixe)
function positionZones() {
  const centerX = map.clientWidth / 2;
  const centerY = map.clientHeight / 2;

  // Zone principale (id 0)
  const mainZone = zones[0];
  mainZone.style.left = centerX - 500 + "px";
  mainZone.style.top = centerY - 500 + "px";

  // Zones secondaires autour
  const distance = 2000;
  const angles = [270, 315, 180, 225, 90, 135, 0, 45];

  for (let i = 1; i < zones.length; i++) {
    const zone = zones[i];
    const angleRad = (angles[i - 1] * Math.PI) / 180;
    const x = centerX + distance * Math.cos(angleRad) - 250;
    const y = centerY + distance * Math.sin(angleRad) - 250;
    zone.style.left = x + "px";
    zone.style.top = y + "px";
  }
}

// Vérifie si le joueur est dans une zone (distance au centre)
function isPlayerInZone(zone) {
  const zoneLeft = parseFloat(zone.style.left);
  const zoneTop = parseFloat(zone.style.top);
  const zoneRadius = zone.clientWidth / 2;

  const dx = posX - (zoneLeft + zoneRadius);
  const dy = posY - (zoneTop + zoneRadius);
  const dist = Math.sqrt(dx * dx + dy * dy);

  return dist < zoneRadius;
}

// Mise à jour captures zones (progression)
function updateCaptures() {
  const fps = 60;
  zones.forEach((zone) => {
    const id = zone.dataset.id;
    if (!captures[id]) captures[id] = 0;

    const isMain = zone.classList.contains("main-zone");
    const increment = isMain ? 100 / (fps * 10) : 100 / (fps * 5);
    const decrement = increment / 2;

    if (isPlayerInZone(zone)) {
      if (!capturedZones.has(id)) {
        captures[id] += increment;
        if (captures[id] >= 100) {
          captures[id] = 100;
          capturedZones.add(id);
          zone.classList.add("captured");
          // Effet flash
          const flash = document.createElement("div");
          flash.classList.add("zone-flash");
          zone.appendChild(flash);

          setTimeout(() => {
            flash.remove();
          }, 400);
          // Effet particules
          for (let i = 0; i < 15; i++) {
            const particle = document.createElement("div");
            particle.classList.add("zone-particle");
            zone.appendChild(particle);

            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * 150 + 50;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            particle.style.setProperty("--x", `${x}px`);
            particle.style.setProperty("--y", `${y}px`);

            setTimeout(() => {
              particle.remove();
            }, 800);
          }
          // Effet vague circulaire
          const wave = document.createElement("div");
          wave.classList.add("zone-wave");
          zone.appendChild(wave);

          setTimeout(() => {
            wave.remove();
          }, 1000);
        }
      }
    } else {
      if (!capturedZones.has(id)) {
        captures[id] -= decrement;
        if (captures[id] < 0) captures[id] = 0;
      }
    }
  });
}

// Dessine la progression sur les zones (arcs)
function drawCaptureProgress() {
  zones.forEach((zone) => {
    const id = zone.dataset.id;
    const progress = captures[id] || 0;
    const canvas = zone.querySelector(".zone-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    ctx.clearRect(0, 0, size, size);

    if (progress <= 0) return;

    const lineWidth = 14;
    const radius = size / 2 - lineWidth / 2;
    const center = size / 2;

    let color = "rgba(30, 144, 255, 0.7)";
    if (capturedZones.has(id)) color = "dodgerblue";

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.arc(
      center,
      center,
      radius,
      -Math.PI / 2,
      -Math.PI / 2 + (2 * Math.PI * progress) / 100
    );
    ctx.stroke();
  });
}

/* ============================================ ABILITY & COOLDOWN ============================================ */

const cooldownOverlay = document.querySelector(".cooldownOverlay");
let abilityReady = true;
const cooldownDuration = 5000;

function triggerAbilityCooldown() {
  abilityReady = false;
  cooldownOverlay.style.opacity = "1";

  let start = null;
  function animateCooldown(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / cooldownDuration, 1);
    const angle = progress * 360;

    // Inversion : cercle noir plein qui se vide
    cooldownOverlay.style.background = `conic-gradient(transparent ${angle}deg, black ${angle}deg)`;

    abilityHUD.style.backgroundColor = "#525252";

    if (progress < 1) {
      requestAnimationFrame(animateCooldown);
    } else {
      cooldownOverlay.style.opacity = "0";
      const abilityHUD = document.getElementById("abilityHUD");
      abilityHUD.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      abilityReady = true;

      // Vibration + morphose
      abilityHUD.style.animation = "vibrate 0.3s ease, morphFade 0.6s ease";
      setTimeout(() => {
        abilityHUD.style.animation = ""; // reset
      }, 600);
    }
  }
  abilityHUD.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
  requestAnimationFrame(animateCooldown);
}

/* ============================================ OBSTACLES ============================================ */

function spawnObstacle() {
  const obstacle = document.createElement("div");
  obstacle.className = "obstacle";

  // --- HP BAR ---
  const hpBar = document.createElement("div");
  hpBar.className = "obstacle-hpbar";
  hpBar.style.display = "none"; // invisible au début

  const hpFill = document.createElement("div");
  hpFill.className = "obstacle-hpfill";
  hpFill.style.width = "100%";

  hpBar.appendChild(hpFill);
  obstacle.appendChild(hpBar);

  // HP interne
  obstacle.hp = 100;
  obstacle.brightness = 100; // 100% au début
  obstacle.hpFill = hpFill;
  obstacle.hpBar = hpBar;

  const playerRect = player.getBoundingClientRect();
  const px = playerRect.left + playerRect.width / 2;
  const py = playerRect.top + playerRect.height / 2;

  // Direction vers la souris virtuelle
  const dx = virtualMouseX - px;
  const dy = virtualMouseY - py;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const dirX = dx / dist;
  const dirY = dy / dist;

  const spawnX = px + dirX * 120;
  const spawnY = py + dirY * 120;

  const transform = map.style.transform;
  const match = transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
  const offsetX = match ? parseFloat(match[1]) : 0;
  const offsetY = match ? parseFloat(match[2]) : 0;

  const mapX = spawnX - offsetX - 55;
  const mapY = spawnY - offsetY - 55;

  obstacle.style.left = mapX + "px";
  obstacle.style.top = mapY + "px";

  map.appendChild(obstacle);

  obstacles.push({
    el: obstacle,
    x: mapX + 60,
    y: mapY + 55,
    r: 55,
  });
}

/* ============================================ MINI-MAP ============================================ */

const miniMapSize = 200; // 200x200 px
const miniMapCanvas = document.createElement("canvas");
miniMapCanvas.width = miniMapSize;
miniMapCanvas.height = miniMapSize;
miniMapCanvas.style.position = "fixed";
miniMapCanvas.style.top = "10px";
miniMapCanvas.style.right = "10px";
miniMapCanvas.style.borderRadius = "50%";
miniMapCanvas.style.zIndex = 1000;
miniMapCanvas.style.pointerEvents = "none";
document.body.appendChild(miniMapCanvas);

const miniCtx = miniMapCanvas.getContext("2d");

// Centre et rayon de la map dans le mini-map (échelle)
const mapRadius = 2500; // grande map rayon (5000/2)
const miniMapRadius = miniMapSize / 2 - 10; // marge pour contour

function drawMiniMap() {
  miniCtx.clearRect(0, 0, miniMapSize, miniMapSize);

  // Cercle de fond blanc uni
  miniCtx.fillStyle = "white";
  miniCtx.beginPath();
  miniCtx.arc(miniMapSize / 2, miniMapSize / 2, miniMapRadius, 0, 2 * Math.PI);
  miniCtx.fill();

  // Contour noir circulaire
  miniCtx.lineWidth = 4;
  miniCtx.strokeStyle = "black";
  miniCtx.beginPath();
  miniCtx.arc(miniMapSize / 2, miniMapSize / 2, miniMapRadius, 0, 2 * Math.PI);
  miniCtx.stroke();

  // Dessiner zones sur mini-map
  zones.forEach((zone) => {
    const id = zone.dataset.id;
    const zoneLeft = parseFloat(zone.style.left);
    const zoneTop = parseFloat(zone.style.top);
    const zoneRadius = zone.clientWidth / 2;

    const centerX = map.clientWidth / 2;
    const centerY = map.clientHeight / 2;

    const relX = zoneLeft + zoneRadius - centerX;
    const relY = zoneTop + zoneRadius - centerY;

    const scale = miniMapRadius / mapRadius;
    const miniX = miniMapSize / 2 + relX * scale;
    const miniY = miniMapSize / 2 + relY * scale;
    const miniRadius = zoneRadius * scale;

    let fillColor = "rgba(128, 128, 128, 0.3)"; // grise si non capturée
    if (capturedZones.has(id)) fillColor = "dodgerblue";

    miniCtx.beginPath();
    miniCtx.arc(miniX, miniY, miniRadius, 0, 2 * Math.PI);
    miniCtx.fillStyle = fillColor;
    miniCtx.fill();
    miniCtx.lineWidth = 2;
    miniCtx.strokeStyle = "black";
    miniCtx.stroke();
  });

  // Dessiner joueur sur mini-map
  const centerX = map.clientWidth / 2;
  const centerY = map.clientHeight / 2;
  const relPlayerX = posX - centerX;
  const relPlayerY = posY - centerY;

  const scale = miniMapRadius / mapRadius;
  const playerMiniX = miniMapSize / 2 + relPlayerX * scale;
  const playerMiniY = miniMapSize / 2 + relPlayerY * scale;

  miniCtx.beginPath();
  miniCtx.arc(playerMiniX, playerMiniY, 6, 0, 2 * Math.PI);
  miniCtx.fillStyle = "dodgerblue";
  miniCtx.shadowColor = "dodgerblue";
  miniCtx.shadowBlur = 8;
  miniCtx.fill();
  miniCtx.shadowBlur = 0;
}

/* ============================================ INIT & GAME LOOP ============================================ */

// Spawn joueur dans le cercle central de la map
function spawnPlayerRandom() {
  const radiusMap = 2500 - 50;

  let x, y;
  do {
    x = Math.random() * 2 * radiusMap - radiusMap;
    y = Math.random() * 2 * radiusMap - radiusMap;
  } while (x * x + y * y > radiusMap * radiusMap);

  const centerX = map.clientWidth / 2;
  const centerY = map.clientHeight / 2;

  posX = centerX + x;
  posY = centerY + y;
}

// Setup initial
positionZones();
spawnPlayerRandom();
updatePlayerPosition();

// Loop principal
function gameLoop() {
  updatePlayerPosition();
  updateCaptures();
  drawCaptureProgress();
  drawMiniMap();
  requestAnimationFrame(gameLoop);
}

gameLoop();
