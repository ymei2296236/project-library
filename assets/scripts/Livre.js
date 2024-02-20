export default class Livre {
	#_el;
	#_indexLivre;
	#_titre;
	#_prix;
	#_image;
	#_auteur;
	#_editeur;
	#_pages;
	#_description;
	#_categorie;
	#_elControlLivres;
	#_elDivModal;
	#_elContenuModal;
	#_elHTML;
	#_elBody;
	#_fermeModal;

	constructor(el, indexLivre) {
		this.#_el = el;
		this.#_indexLivre = indexLivre;
		this.#_titre = this.#_el.titre;
		this.#_prix = this.#_el.prix;
		this.#_image = this.#_el.image;
		this.#_auteur = this.#_el.auteur;
		this.#_editeur = this.#_el.editeur;
		this.#_pages = this.#_el.pages;
		this.#_description = this.#_el.description;
		this.#_categorie = this.#_el.categorie;
		this.#_elControlLivres = document.querySelector("[data-js-control-livres]");
		this.#_elDivModal = document.querySelector("[data-js-modal]");
		this.#_elContenuModal = document.querySelector("[data-js-modal-contenu]");
		this.#_elHTML = document.documentElement;
		this.#_elBody = document.body;
		this.#_fermeModal = this.#fermeModal.bind(this);

		this.#init();
	}

	// Section privée
	#init() {
		this.#creeLivre();
	}

	/**
	 * Section privée
	 * Crée et insère le dom de livre, y ajoutant un gestionnaire d'événement.  
	 */
	#creeLivre() {
		let dom = `
                    <article class="livre" data-js-categorie="${this.#_categorie}|${this.#_indexLivre}">
                        <img src="${this.#_image}" alt="Image de ${this.#_titre}"></img>
                        <div>
							<p>${this.#_titre}</p>
							<div class="livre__flex">
								<small class="livre__prix">${this.#_prix} $</small>
								<button class="livre__button" data-js-bouton>Ajouter</button>
							</div>
                        </div>
                    </article>
        `;
		// Insère le dom de livre au div ciblé
		this.#_elControlLivres.insertAdjacentHTML("beforeend", dom);

		// Crée une délégation d'événements sur la tuile pour gérer le modal et l'ajout du livre au panier
		let elTuile = this.#_elControlLivres.lastElementChild;

		elTuile.addEventListener("click", function(e) {

			// au clic du bouton d'ajouter
			if (e.target.hasAttribute("data-js-bouton")) this.#ajouteAuPanier();
			// au clic d'ailleur sur la tuile
			else this.#afficheModal();

		}.bind(this));
	}

	/**
	 * Section privée
	 * Sauvegarde les infos du livre dans localStorage
	 */
	#ajouteAuPanier() {
		let aPanier;

		// si le panier est vide
		if (!localStorage.panier) aPanier = {};
		// récupère les données du panier si n'est pas vide
		else aPanier = JSON.parse(localStorage.panier);
	
		aPanier[this.#_titre] = `${this.#_prix}`;
		localStorage.setItem("panier", JSON.stringify(aPanier));
	}

	/**
	 * Section privée
	 * Affiche le modal
	 */
	#afficheModal() {
		// Empêche le scroll de l'arrière-plan
		this.#_elHTML.classList.add("overflow-y-hidden");
		this.#_elBody.classList.add("overflow-y-hidden");

		if (this.#_elDivModal.classList.contains("modal--ferme")) 
			this.#_elDivModal.classList.replace("modal--ferme","modal--ouvert");
		
		// Crée et injecte au modal le dom de livre cliqué
		let dom = `
			<div class="modal__img">
				<img src="${this.#_image}" alt="Image de ${this.#_titre}"></img>
			</div>
			<div class="modal__texte">
				<p><small>Titre : </small>${this.#_titre}</p>
				<p><small>Auteur : </small>${this.#_auteur}</p>
				<p><small>Éditeur : </small>${this.#_editeur}</p>
				<p><small>Pages : </small>${this.#_pages}</p>
				<p>${this.#_description}</p>
			</div>
		`;
		this.#_elContenuModal.innerHTML = dom;

		// Ajoute un gestionnaire d'événement pour fermer le modal
		this.#_elDivModal.addEventListener("click", this.#_fermeModal);
	}

	/**
	 * Section privée
	 * Ferme le modal 
	 */
	#fermeModal() {
		if (this.#_elDivModal.classList.contains("modal--ouvert")) {
			this.#_elDivModal.classList.replace("modal--ouvert","modal--ferme");

			// Réactive le scroll de l'arrière-plan
			this.#_elHTML.classList.remove("overflow-y-hidden");
			this.#_elBody.classList.remove("overflow-y-hidden");
		}
	}
}
