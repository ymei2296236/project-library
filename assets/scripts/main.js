import { appelleTest } from "../tests/appelleTests.test.js";
import Librarie from "./Librarie.js";
import Panier from "./Panier.js";

window.addEventListener("DOMContentLoaded", function () {
	let elWrapperFiltre = document.querySelector("[data-js-control-librarie]"),
		elPanier = document.querySelector("[data-js-panier]");

	new Librarie(elWrapperFiltre);
	new Panier(elPanier);


    /**
     * Appelle les tests automatisés
     */
	appelleTest();
});
