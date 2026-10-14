/**
 * @jest-environment jsdom
 */

test('El DOM es modifica correctament en carregar', () => {
  // 1. Muntem el "teatre" (l'HTML fals on actuarà el nostre JS)
  document.body.innerHTML = `
    <h1 id="titolPrincipal">El Cartero Invisible</h1>
    <p class="info">Benvingut</p>
    <div id="contenidorCartes"></div>
  `;

  // 2. Simulem l'execució del teu script.js
  const titol = document.querySelector("#titolPrincipal");
  titol.textContent = "📮 El Cartero Invisible – Setmana 2";
  titol.setAttribute("data-role", "banner");

  const contenidor = document.querySelector("#contenidorCartes");
  contenidor.innerHTML = "<p>Cartes pendents: 0</p>";

  const info = document.querySelector(".info");
  info.style.color = "#2c3e50";

  // 3. Els Expects (Les comprovacions del test)
  
  // Comprovem el text
  expect(titol.textContent).toBe("📮 El Cartero Invisible – Setmana 2");
  
  // Comprovem l'atribut
  expect(titol.getAttribute("data-role")).toBe("banner");
  
  // Comprovem l'HTML injectat
  expect(contenidor.innerHTML).toContain("Cartes pendents: 0");
  
  // Comprovem l'estil (Ull! jsdom converteix els colors HEX a RGB automàticament)
  expect(info.style.color).toBe("rgb(44, 62, 80)"); 
});