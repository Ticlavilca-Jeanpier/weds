const firebaseConfig = {
  apiKey: "AIzaSyAOWNiGQjx5TUszlAg9IZCicDymTdPeKg8",
  authDomain: "registroweb-51e4a.firebaseapp.com",
  projectId: "registroweb-51e4a",
  storageBucket: "registroweb-51e4a.appspot.com",
  messagingSenderId: "870791477716",
  appId: "1:870791477716:web:d4aa4990611ddbb2267e41"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();
const db = firebase.firestore();

//llamando elementos
let txtbtnRegistro = document.getElementById('txtbtnRegistro');
let txtbtnIngresarr = document.getElementById('txtbtnIngresarr');
let txtbSalir=document.getElementById('txtbSalir')
let contenidoDeLaWeb = document.getElementById('contenidoDeLaWeb');
let formulario = document.getElementById('formulario');
let txtbtnFace = document.getElementById('txtbtnFace');
let txtbtnGoo = document.getElementById('txtbtnGoo');
let txtdescripcion = document.getElementById('txtdescripcion');
let btnPublicar = document.getElementById('btnPublicar');

//funcion registro
txtbtnRegistro.addEventListener('click',()=>{
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtPassword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log("Crear Usuario");
      contenidoDeLaWeb.classList.replace('ocultar','mostrar');
      formulario.classList.replace('mostrar','ocultar');
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
})



txtbtnIngresarr.addEventListener('click',()=>{
  let email = document.getElementById('txtEmail').value;
  let password = document.getElementById('txtPassword').value;
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    console.log("Inicio sesión correctamente"); 
    cargaJSON();
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');
    var user = userCvredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
})

txtbSalir.addEventListener('click',()=>{
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("Cerraste la sesion");
    contenidoDeLaWeb.classList.replace('mostrar','ocultar');
    formulario.classList.replace('ocultar','mostrar');
  }).catch((error) => {
    // An error happened.
  });  
})
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    var uid = user.uid;
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');
    // ...
  } else {
    // User is signed out
    // ...
    contenidoDeLaWeb.classList.replace('mostrar','ocultar');
    formulario.classList.replace('ocultar','mostrar');
  }
});

txtbtnGoo.addEventListener('click',()=>{
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
console.log("Se inicio correctamente")
  }).catch((error) => {
    console.log("Error de login con Google")
  });
}) 
txtbtnFace.addEventListener('click',()=>{
var provider = new firebase.auth.FacebookAuthProvider();
firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    var user = result.user;
    var accessToken = credential.accessToken;
    console.log("Se inicio correctamente")
  })
  .catch((error) => {
    console.log("Error de login con Facebook")
  });
}) 

function cargaJSON (){
  fetch('data.json')
  .then(function(res){
    return res.json();
  })
  .then((data) =>{
    let html = '';
    data.forEach((productos)=>{
      html +=`
      <div class="producto">
    <p> ${productos.nombre} </p>
   
     <h1 Style="color:red"><img src=${productos.img} width: 20px ;> </h1>

     <strong> ${productos.puesto} </strong>
     
     </div>  
     `;
    })
  document.getElementById('resultado').innerHTML=html;
  })
  btnPublicar.addEventListener('click',()=>{

    db.collection("comentarios").add({
      titulo: txttitulo=document.getElementById('txttitulo').value,
      descripcion: txtdescripcion=document.getElementById('txtdescripcion').value,
      born: 1815
  })
  .then((docRef) => {
      console.log("se guardo correctamente", docRef.id);
      verDatosEnPantalla();
  })
  .catch((error) => {
      console.error("Error al guardar ", error);
  });
  })

  //leer datos
  function verDatosEnPantalla(){
    db.collection("comentarios").get().then((querySnapshot) => {
      let html = '';
     
      querySnapshot.forEach((doc) => {
        console.log(`${doc.data().titulo}`);
        console.log(`${doc.data().descripcion}`);
        var listarDatos = `
        <li class="listarDatos">
          <h5 class="listarDatosH5"> ${doc.data().titulo}</h5>
          <p> ${doc.data().descripcion} </p>
        </li>

        `;
        html += listarDatos;
      }); document.getElementById('verDatosEnPantallaTexto').innerHTML = html;
  });
  }

    }