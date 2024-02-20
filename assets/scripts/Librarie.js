import { livres } from "./livres.js";
import Livre from "./Livre.js";

export default class Librarie {
	#_el;
	#_elControlLivres;

	constructor(el) {
		this.#_el = el;
		this.#_elControlLivres = document.querySelector("[data-js-control-livres]");

		this.#init();
	}
	
	/**
	 * Section privée
	*/
	#init() {
		// Injecte les 12 premiers livres au chargement de la page
		for (let i = 0, l = 12; i < l; i++) {
			new Livre(livres[i], i);
		}
		this.#afficheLibarieParFiltre();
	}
	
	/**
	 * Section privée
	 * Affiche les livres correspondants au flitre cliqué
	*/
	#afficheLibarieParFiltre() {
		
		this.#_el.addEventListener("click", function(e) {
			let elTarget = e.target;
			
			// Réinitialise la zone d'affichage de livres
			this.#_elControlLivres.innerHTML = "";
			// Gére le style du filtre actif
			let filtreActive = this.#_el.querySelector(".filtreActive");
				
			if (filtreActive !== null) {
				filtreActive.classList.remove("filtreActive");
			}
			elTarget.classList.add("filtreActive");

			/**
			 * Effectue le filtrage en fonction de filtre sélectionné
			 */
			// Détermine lequel filtre est choisi
			let nomFiltre = elTarget.dataset.jsFiltre,
				nomCategorie = elTarget.dataset.jsCategorie;

				for (let i = 0, l = livres.length; i < l; i++) {
					
					if (nomFiltre == "tous" || nomFiltre == "nouveaute" && livres[i][nomFiltre] === true || nomFiltre == "categorie" && nomCategorie && livres[i].categorie == nomCategorie) {
						// Affiche les livres correspondants au filtre choisi
						new Livre(livres[i], i);
				}
			}
		}.bind(this)) ;
	}
}
