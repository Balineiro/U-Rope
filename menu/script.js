import { db, firebaseAuth } from "./firebase.js";

import {
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ============================================ FLAGS ============================================ */

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
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Crect width='28' height='20' rx='2' fill='%23E6BE53'/%3E%3Crect x='1.4' y='1.4' width='25.2' height='17.2' rx='1.2' fill='%23C8102E'/%3E%3Cg transform='translate(14 10) scale(1.05) translate(-14 -10)'%3E%3Cpath d='M14 2.5l2.4 3.8 4 .9-2.9 2.6.8 3.8-4.3-2.1-4.3 2.1.8-3.8-2.9-2.6 4-.9L14 2.5z' fill='%23E6BE53'/%3E%3Crect x='11.6' y='7.6' width='4.8' height='5' rx='1' fill='%23007ACC' stroke='%23E6BE53' stroke-width='0.7'/%3E%3C/g%3E%3C/svg%3E";
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
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Crect width='28' height='20' rx='2' fill='%23EF264D'/%3E%3Crect x='8' width='4' height='20' fill='%23ffffff'/%3E%3Crect y='8' width='28' height='4' fill='%23ffffff'/%3E%3C/svg%3E";
FLAGS.czechia =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Crect width='28' height='20' rx='2' fill='%23ffffff'/%3E%3Crect y='10' width='28' height='10' fill='%23E8252A'/%3E%3Cpath d='M0 0l14 10L0 20V0Z' fill='%2317579E'/%3E%3C/svg%3E";
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
FLAGS.bosnia_and_herzegovina =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%230B36B2'/%3E%3Cpath d='M22.667 20V0H8.667L22.667 20Z' fill='%23FFD045'/%3E%3Cpath d='M17.333 18.667 16.39 18.943 16.667 18l-.276-.943.943.276.943-.276L18 18l.276.943-.943-.276Z' fill='%23fff'/%3E%3Cpath d='M14.667 14.667 13.724 14.943 14 14l-.276-.943.943.276.943-.276L15.333 14l.276.943-.943-.276Z' fill='%23fff'/%3E%3Cpath d='M12 10.667 11.057 10.943 11.333 10l-.276-.943.943.276.943-.276L12.667 10l.276.943-.943-.276Z' fill='%23fff'/%3E%3Cpath d='M9.333 6.667 8.39 6.943 8.667 6l-.276-.943.943.276.943-.276L10 6l.276.943-.943-.276Z' fill='%23fff'/%3E%3Cpath d='M6.667 2.667 5.724 2.943 6 2l-.276-.943.943.276.943-.276L7.333 2l.276.943-.943-.276Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.belgium =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect x='13.333' width='14.667' height='20' fill='%23FF4453'/%3E%3Crect width='9.333' height='20' fill='%23262626'/%3E%3Crect x='9.333' width='9.333' height='20' fill='%23FFCF3C'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.belarus =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Cpath d='M0 13.333h28V0H0v13.333Z' fill='%23E54252'/%3E%3Cpath d='M0 20h28v-6.667H0V20Z' fill='%235CBE6B'/%3E%3Cpath d='M0 0h4v3l-.667 1L4 5v2l-.667 1L4 9v2l-.667 1L4 13v2l-.667 1L4 17v3H0V0Z' fill='%23fff'/%3E%3Cpath d='M-.667 2-2 4l1.333 2L-2 8l1.333 2L-2 12l1.333 2L-2 16l1.333 2L.667 16l-1.334-2L.667 12l-1.334-2L.667 8l-1.334-2L.667 4-.667 2Z' fill='%23E54252'/%3E%3Cpath d='M.667 2 2 0l1.333 2L2 4 .667 2Zm1.333 6L.667 6 2 4l1.333 2L2 8Zm0 4L.667 10 2 8l1.333 2L2 12Zm0 4 1.333-2L2 12l-1.333 2L2 16Zm0 0 1.333 2L2 20l-1.333-2L2 16Z' fill='%23E54252'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
FLAGS.bulgaria =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='20'%3E%3Cg clip-path='url(%23c)'%3E%3Crect width='28' height='20' fill='%23fff'/%3E%3Cpath d='M0 13.333h28V6.667H0v6.666Z' fill='%2306A77C'/%3E%3Cpath d='M0 20h28v-6.667H0V20Z' fill='%23E32E19'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect width='28' height='20' rx='2'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";

/* ============================================ EUROPE BUTTON ============================================ */

const europeBtn = document.getElementById("europeBtn");
const playerNameInput = document.getElementById("playerName");

if (localStorage.getItem("playerName")) {
  playerNameInput.value = localStorage.getItem("playerName");
}

europeBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim() || "Player";
  localStorage.setItem("playerName", name);
  window.location.href = "europe.html";
});

/* ============================================ CANVAS BACKGROUND ============================================ */

const canvas = document.getElementById("menuBG");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function presetParticles() {
  const particles = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.3,
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}

function themeParticles() {
  applyUI("#1e90ff");
  const particles = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * menuCanvas.width,
      y: Math.random() * menuCanvas.height,
      r: Math.random() * 3 + 2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      a: Math.random() * 0.5 + 0.3,
    });
  }
  loop();
}

presetParticles();

/* ============================================ USER SESSION ============================================ */

const savedUser = localStorage.getItem("loggedUser");
const profileUsername = document.getElementById("profileUsername");
const profileWindow = document.getElementById("profileWindow");
const profileOverlay = document.getElementById("profileOverlay");

if (!savedUser) {
  const prefixes = ["Bot", "Guest", "Random", "Unknown"];
  const names = [
    "Zeus",
    "Orion",
    "Helios",
    "Astra",
    "Nyx",
    "Vega",
    "Atlas",
    "Lynx",
    "Nova",
  ];
  const generated = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${
    names[Math.floor(Math.random() * names.length)]
  }`;
  playerName.value = generated;
}

if (savedUser) {
  playerName.value = savedUser;
  document.getElementById("loggedUserName").textContent = savedUser;
  document.getElementById("loggedInfo").classList.remove("hidden");
  document.getElementById("logoutBtn").classList.remove("hidden");
}

document
  .getElementById("loggedUserName")
  .addEventListener("click", openProfileWindow);

function openProfileWindow() {
  const username = localStorage.getItem("loggedUser");
  profileUsername.value = username;
  profileOverlay.classList.add("active");
  profileWindow.classList.add("active");
}

function enableUsernameEdit() {
  profileUsername.removeAttribute("readonly");
  profileUsername.style.pointerEvents = "auto";
  profileUsername.focus();
  profileUsername.select();
}

profileOverlay.addEventListener("click", () => {
  profileWindow.classList.remove("active");
  profileOverlay.classList.remove("active");
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedUser");

  document.getElementById("loggedInfo").classList.add("hidden");
  document.getElementById("logoutBtn").classList.add("hidden");

  const prefixes = ["Nomad", "Echo", "Shade", "Rogue", "Specter", "Drifter"];
  const names = [
    "Zeus",
    "Orion",
    "Helios",
    "Astra",
    "Nyx",
    "Vega",
    "Atlas",
    "Nova",
  ];
  const generated = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${
    names[Math.floor(Math.random() * names.length)]
  }`;

  playerName.value = generated;
  showToast("Logged out");
});

/* ============================================ ACCOUNT POPUP (LOGIN / REGISTER) ============================================ */

const accountBtn = document.getElementById("accountBtn");
const accountPopup = document.getElementById("accountPopup");
const closeAccount = document.getElementById("closeAccount");
const accountOverlay = document.getElementById("accountOverlay");
const accUsername = document.getElementById("accUsername");
const accPassword = document.getElementById("accPassword");
const accSubmit = document.getElementById("accSubmit");
const tabLogin = document.getElementById("tabLogin");
const tabRegister = document.getElementById("tabRegister");

let mode = "login";

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

accountBtn.addEventListener("click", () => {
  accountPopup.classList.add("active");
  accountOverlay.classList.add("active");
  accUsername.value = "";
  accPassword.value = "";

  mode = "login";
  tabLogin.classList.add("active");
  tabRegister.classList.remove("active");
  accountPopup.classList.remove("registerMode");
  accountPopup.classList.add("loginMode");
});

closeAccount.addEventListener("click", () => {
  accountPopup.classList.remove("active");
  accountOverlay.classList.remove("active");
});

tabLogin.addEventListener("click", () => {
  accUsername.value = "";
  accPassword.value = "";
  mode = "login";
  tabLogin.classList.add("active");
  tabRegister.classList.remove("active");
  accountPopup.classList.remove("registerMode");
  accountPopup.classList.add("loginMode");
});

tabRegister.addEventListener("click", () => {
  accUsername.value = "";
  accPassword.value = "";
  mode = "register";
  tabRegister.classList.add("active");
  tabLogin.classList.remove("active");
  accountPopup.classList.remove("loginMode");
  accountPopup.classList.add("registerMode");
});

accSubmit.addEventListener("click", async () => {
  const username = accUsername.value.trim();
  const password = accPassword.value.trim();

  if (!username || !password) {
    showToast("Please fill all fields");
    return;
  }

  try {
    if (mode === "register") {
      const userCredential = await firebaseCreate(
        firebaseAuth,
        username + "@cz.com",
        password
      );

      window.justRegistered = { username, password };

      // 🔥 Crée automatiquement le document Firestore
      await setDoc(doc(db, "users", username + "@cz.com"), {
        requestsSent: [],
        requestsReceived: [],
        friends: [],
      });

      showToast("Account created!");
      if (!window.justRegistered) {
        accUsername.value = "";
        accPassword.value = "";
      }

      mode = "login";
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
      accountPopup.classList.remove("registerMode");
      accountPopup.classList.add("loginMode");
      // Si on vient de register, on garde les valeurs
      if (window.justRegistered) {
        accUsername.value = window.justRegistered.username;
        accPassword.value = window.justRegistered.password;
        window.justRegistered = null; // reset
      }
      return;
    }

    if (mode === "login") {
      await firebaseLogin(firebaseAuth, username + "@cz.com", password);
      showToast("Logged in!");

      localStorage.setItem("loggedUser", username);
      document.getElementById("loggedUserName").textContent = username;
      document.getElementById("loggedInfo").classList.remove("hidden");
      document.getElementById("logoutBtn").classList.remove("hidden");
      playerName.value = username;
      ICI;

      accountPopup.classList.remove("active");
      accountOverlay.classList.remove("active");
      return;
    }
  } catch (err) {
    if (err.code === "auth/wrong-password") showToast("Incorrect password");
    else if (err.code === "auth/user-not-found")
      showToast("Account does not exist");
    else if (err.code === "auth/email-already-in-use")
      showToast("This username is already taken");
    else showToast("Authentication error");
  }
});

accPassword.addEventListener("keydown", (e) => {
  if (e.key === "Enter") accSubmit.click();
});
accUsername.addEventListener("keydown", (e) => {
  if (e.key === "Enter") accSubmit.click();
});

const togglePassword = document.getElementById("togglePassword");
const eyeIcon = togglePassword.querySelector(".eyeIcon");

togglePassword.addEventListener("click", () => {
  const isHidden = accPassword.type === "password";
  accPassword.type = isHidden ? "text" : "password";
});

/* ============================================ PLAY BUTTON ============================================ */

const playBtn = document.getElementById("playBtn");

if (localStorage.getItem("playerName")) {
  playerNameInput.value = localStorage.getItem("playerName");
}

playBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim() || "Player";
  localStorage.setItem("playerName", name);
  window.location.href = "game.html";
});

/* ============================================ SETTINGS MENU ============================================ */

const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");
const settingsCreditsLink = document.getElementById("settingsCreditsLink");

settingsBtn.addEventListener("click", () => {
  if (settingsMenu.classList.contains("active")) closeAllMenus();
  else openMenu("settings");
});

settingsCreditsLink.addEventListener("click", () => {
  openMenu("credits");
});

/* ============================================ MENU MANAGER ============================================ */

const menus = {
  settings: document.getElementById("settingsMenu"),
  friends: document.getElementById("friendsMenu"),
  chat: document.getElementById("chatWindow"),
  country: document.getElementById("countryDropdown"),
  credits: document.getElementById("creditsPopup"),
};

function closeAllMenus() {
  Object.values(menus).forEach((menu) =>
    menu.classList.remove("active", "open")
  );
}

function openMenu(name) {
  closeAllMenus();
  const menu = menus[name];
  if (!menu) return;

  if (name === "country") menu.classList.add("open");
  else menu.classList.add("active");
}

/* ============================================ CREDITS POPUP ============================================ */

const creditsPopup = document.getElementById("creditsPopup");
const closeCredits = document.getElementById("closeCredits");

closeCredits.addEventListener("click", () => {
  creditsPopup.classList.remove("active");
});

/* ============================================ COUNTRY SELECTION ============================================ */

const countrySelectContainer = document.getElementById(
  "countrySelectContainer"
);
const countryBtn = document.getElementById("countrySelectBtn");
const countryDropdown = document.getElementById("countryDropdown");

countryBtn.addEventListener("click", () => {
  if (countryDropdown.classList.contains("open")) closeAllMenus();
  else openMenu("country");
});

countryDropdown.querySelectorAll("li").forEach((li) => {
  li.addEventListener("click", () => {
    countryBtn.textContent = li.textContent + " ▼";
    countryDropdown.classList.remove("open");
    countryDropdown
      .querySelectorAll("li")
      .forEach((l) => l.classList.remove("selected"));
    li.classList.add("selected");

    const country = li.textContent.trim().toLowerCase().replace(/\s+/g, "_");
    localStorage.setItem("chosenCountry", country);
    updateFlagPreview();
    ICI;
  });
});

function updateFlagPreview() {
  const chosenCountry = localStorage.getItem("chosenCountry");
  const flagPreview = document.getElementById("flagPreview");

  // Reset
  flagPreview.innerHTML = "";

  // Si aucun pays choisi → rien
  if (!chosenCountry || !FLAGS[chosenCountry]) return;

  // Sinon → afficher le drapeau
  const img = document.createElement("img");
  img.src = FLAGS[chosenCountry];
  img.alt = chosenCountry;

  flagPreview.appendChild(img);
}

// Appeler au chargement du menu
updateFlagPreview();

/* ============================================ FRIENDS MENU ============================================ */

const friendsBtn = document.getElementById("friendsBtn");
const friendsMenu = document.getElementById("friendsMenu");

const addFriendBtn = document.getElementById("addFriendBtn");
const addFriendBar = document.getElementById("addFriendBar");
const addFriendInput = document.getElementById("addFriendInput");
const addFriendConfirm = document.getElementById("addFriendConfirm");

const friendsTabs = document.querySelectorAll(".friendsTab");
const friendsList = document.getElementById("friendsList");
const friendsRequests = document.getElementById("friendsRequests");
const requestsReceived = document.getElementById("requestsReceived");
const requestsSent = document.getElementById("requestsSent");

/* --- REAL-TIME FRIEND REQUESTS LISTENER (Firebase) --- */

const loggedUser = localStorage.getItem("loggedUser");

if (loggedUser) {
  const loggedEmail = loggedUser + "@cz.com";

  onSnapshot(doc(db, "users", loggedEmail), (docSnap) => {
    if (!docSnap.exists()) return;

    const data = docSnap.data();

    // RECEIVED
    requestsReceived.innerHTML = "";

    if (data.requestsReceived?.length) {
      data.requestsReceived.forEach((email) => {
        const pseudo = email.replace("@cz.com", "");

        const div = document.createElement("div");
        div.classList.add("friendRequestCard");

        div.innerHTML = `
          <span class="requestName">${pseudo}</span>
          <div class="requestActions">
            <button class="acceptBtn" data-user="${email}">
              <svg viewBox="0 0 24 24" class="iconCheck">
                <path xmlns="http://www.w3.org/2000/svg" d="M9.00001 18.25C8.8993 18.2466 8.80034 18.2227 8.70921 18.1797C8.61807 18.1367 8.53667 18.0756 8.47001 18L3.47001 13C3.37467 12.9382 3.29463 12.8556 3.23592 12.7583C3.17721 12.661 3.14136 12.5517 3.13109 12.4385C3.12082 12.3254 3.13639 12.2114 3.17663 12.1051C3.21686 11.9989 3.28071 11.9031 3.36336 11.8252C3.446 11.7472 3.54528 11.689 3.65369 11.6551C3.76211 11.6211 3.87682 11.6122 3.98918 11.629C4.10155 11.6458 4.20861 11.688 4.3023 11.7523C4.39599 11.8165 4.47385 11.9013 4.53001 12L9.00001 16.44L19.47 6.00003C19.611 5.90864 19.7785 5.86722 19.9458 5.88241C20.1131 5.89759 20.2705 5.96851 20.3927 6.08379C20.5149 6.19907 20.5948 6.35203 20.6197 6.51817C20.6446 6.68431 20.613 6.85399 20.53 7.00003L9.53001 18C9.46334 18.0756 9.38194 18.1367 9.29081 18.1797C9.19967 18.2227 9.10072 18.2466 9.00001 18.25Z" fill="white"/>
              </svg>
            </button>

            <button class="declineBtn" data-user="${email}">
              <svg viewBox="0 0 32 32" class="iconCross">
                <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7
                        c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1
                        s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4
                        C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0
                        c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>
              </svg>
            </button>
          </div>
        `;

        requestsReceived.appendChild(div);
      });
    } else {
      requestsReceived.innerHTML = `<p class="emptyMsg">No received requests</p>`;
    }

    // SENT
    requestsSent.innerHTML = "";
    if (data.requestsSent?.length) {
      data.requestsSent.forEach((email) => {
        const div = document.createElement("div");
        div.classList.add("requestItem");
        div.textContent = email.replace("@cz.com", "");
        requestsSent.appendChild(div);
      });
    } else {
      requestsSent.innerHTML = `<p class="emptyMsg">No sent requests</p>`;
    }

    // Accept friend request
    document.querySelectorAll(".acceptBtn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const fromEmail = btn.dataset.user;
        const meEmail = loggedUser + "@cz.com";

        try {
          // 1. Ajouter chacun dans la friendlist de l'autre
          await updateDoc(doc(db, "users", meEmail), {
            friends: arrayUnion(fromEmail),
            requestsReceived: arrayRemove(fromEmail),
          });

          await updateDoc(doc(db, "users", fromEmail), {
            friends: arrayUnion(meEmail),
            requestsSent: arrayRemove(meEmail),
          });

          showToast("Friend added!");
        } catch (err) {
          console.error(err);
        }
      });
    });

    // Decline friend request
    document.querySelectorAll(".declineBtn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const fromEmail = btn.dataset.user;
        const meEmail = loggedUser + "@cz.com";

        try {
          await updateDoc(doc(db, "users", meEmail), {
            requestsReceived: arrayRemove(fromEmail),
          });

          await updateDoc(doc(db, "users", fromEmail), {
            requestsSent: arrayRemove(meEmail),
          });

          showToast("Request declined");
        } catch (err) {
          console.error(err);
        }
      });
    });
  });
}

/* --- OPEN FRIENDS MENU --- */
friendsBtn.addEventListener("click", () => {
  if (friendsMenu.classList.contains("active")) closeAllMenus();
  else openMenu("friends");
});

/* --- ADD FRIEND BAR --- */
addFriendBtn.addEventListener("click", () => {
  addFriendBar.classList.toggle("active");
  addFriendInput.focus();
});

/* --- SEND FRIEND REQUEST --- */
addFriendConfirm.addEventListener("click", async () => {
  const target = addFriendInput.value.trim();
  const me = localStorage.getItem("loggedUser");

  if (!me || !target || target === me) return;

  const meEmail = me + "@cz.com";
  const targetEmail = target + "@cz.com";

  try {
    await updateDoc(doc(db, "users", meEmail), {
      requestsSent: arrayUnion(targetEmail),
    });

    await updateDoc(doc(db, "users", targetEmail), {
      requestsReceived: arrayUnion(meEmail),
    });

    addFriendInput.value = "";
    addFriendBar.classList.remove("active");
    showToast("Friend request sent!");
  } catch (err) {
    console.error("Erreur en envoyant la demande :", err);
    showToast("User not found");
  }
});

/* --- SWITCH TABS --- */
friendsTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    friendsTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const target = tab.dataset.tab;

    friendsList.classList.toggle("active", target === "list");
    friendsRequests.classList.toggle("active", target === "requests");
  });
});

/* ============================================ CHAT ============================================ */

const chatBtn = document.getElementById("chatBtn");
const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");
const chatSendBtn = document.getElementById("chatSendBtn");
const chatMessages = document.getElementById("chatMessages");

chatBtn.addEventListener("click", () => {
  if (chatWindow.classList.contains("active")) closeAllMenus();
  else openMenu("chat");
});

function addChatMessage(text) {
  const div = document.createElement("div");
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatSendBtn.addEventListener("click", () => {
  const msg = chatInput.value.trim();
  if (!msg) return;
  addChatMessage("Vous : " + msg);
  chatInput.value = "";
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") chatSendBtn.click();
});

/* ============================================ KEY BINDINGS ============================================ */

const defaultBindings = {
  keyUp: "Z",
  keyLeft: "Q",
  keyDown: "S",
  keyRight: "D",
  keyCenter: "SPACE",
};

const bindings = JSON.parse(localStorage.getItem("playerBindings")) || {
  ...defaultBindings,
};

document.querySelector(".key-up .key-label").textContent = bindings.keyUp;
document.querySelector(".key-left .key-label").textContent = bindings.keyLeft;
document.querySelector(".key-down .key-label").textContent = bindings.keyDown;
document.querySelector(".key-right .key-label").textContent = bindings.keyRight;
document.querySelector(".key-center .key-label").textContent =
  bindings.keyCenter;

let activeSquare = null;

document.querySelectorAll(".key-square").forEach((square) => {
  square.addEventListener("click", () => {
    if (activeSquare) activeSquare.classList.remove("waiting");
    activeSquare = square;
    square.classList.add("waiting");
    square.querySelector(".key-label").textContent = "";
  });
});

window.addEventListener("keydown", (e) => {
  if (!activeSquare) return;

  let newKey = e.code;
  if (newKey.startsWith("Key")) newKey = newKey.slice(3);
  else if (newKey === "Space") newKey = "SPACE";
  else if (newKey.startsWith("Arrow")) newKey = newKey.replace("Arrow", "");

  activeSquare.querySelector(".key-label").textContent = newKey;

  if (activeSquare.classList.contains("key-up")) bindings.keyUp = newKey;
  else if (activeSquare.classList.contains("key-left"))
    bindings.keyLeft = newKey;
  else if (activeSquare.classList.contains("key-down"))
    bindings.keyDown = newKey;
  else if (activeSquare.classList.contains("key-right"))
    bindings.keyRight = newKey;
  else if (activeSquare.classList.contains("key-center"))
    bindings.keyCenter = newKey;

  localStorage.setItem("playerBindings", JSON.stringify(bindings));
  activeSquare.classList.remove("waiting");
  activeSquare = null;
});

/* ============================================ GLOBAL CLICK HANDLER ============================================ */

document.addEventListener("click", (e) => {
  const clickedInsideMenu = Object.values(menus).some((menu) =>
    menu.contains(e.target)
  );

  const clickedButton =
    settingsBtn.contains(e.target) ||
    friendsBtn.contains(e.target) ||
    chatBtn.contains(e.target) ||
    countryBtn.contains(e.target);

  if (!clickedInsideMenu && !clickedButton) {
    closeAllMenus();
  }
});

/* ============================================ GLOBAL ESCAPE KEY ============================================ */

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllMenus();
});
