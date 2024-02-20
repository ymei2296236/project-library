export default class Panier {
	#_el;
	#_btnPanier;
	#_elPanierDetail;

	constructor(el) {
		this.#_el = el;
		this.#_btnPanier = this.#_el.querySelector("[data-js-panier-bouton]");
		this.#_elPanierDetail = this.#_el.querySelector("[data-js-detail]");

		this.#init();
	}

	/**
	 * Section privée
	 */
	#init() {
		// Ajoute un gestionnaire d'événement à l'icône de panier
		this.#_btnPanier.addEventListener("click", function () {
			this.#controleModal();
		}.bind(this));
	}

	/**
	 * Gère le modal de panier
	 */
	#controleModal() {
		if (this.#_elPanierDetail.classList.contains("panier__detail--ferme")) {
			this.#_elPanierDetail.classList.replace("panier__detail--ferme","panier__detail--ouvert");
			this.#injecteDom();
		} 
		else if (this.#_elPanierDetail.classList.contains("panier__detail--ouvert")) {
			this.#_elPanierDetail.classList.replace("panier__detail--ouvert", "panier__detail--ferme");
			this.#_elPanierDetail.innerHTML = "";
		}
	}

	/**
	 * Crée et injecte le dom au modal de panier
	 */
	#injecteDom() {
		let prixTotal = 0;

		if (!localStorage.panier) {
			this.#_elPanierDetail.innerHTML = `
												<p>Il n'y a aucun livre dans votre panier.</p>
											`;
		} 
		else {
			let aPanier = JSON.parse(localStorage.panier),
				nbLivre = Object.keys(aPanier).length;
			// Crée le dom de panier
			this.#_elPanierDetail.innerHTML = `
												<table>
													<thead>
														<tr>
															<th>Livre${nbLivre > 1 ? "s" : ""}</th>
															<th>Prix</th>
														</tr>
													</thead>
													<tbody>
													</tbody>
												</table>
											`;
			let elTBody = this.#_elPanierDetail.querySelector("tbody");
			// Injecte la liste de livres ajoutés au panier
			for (const cle in aPanier) {
				elTBody.insertAdjacentHTML("beforeend", `<td>${cle}</td><td>${aPanier[cle]} $</td>`);
				prixTotal += parseInt(aPanier[cle]);
			}
			// Injecte le prix total au panier
			elTBody.insertAdjacentHTML("beforeend",`<td>Total</td><td class="panier__prixTotal">${prixTotal} $</td>`);
		}
	}
}
