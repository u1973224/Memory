class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
    }	

    preload (){	
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
	}
	
    create (){	
    	var save = function(){
			localStorage.setItem("numCartes", JSON.stringify(cuantosPares));
		}

		console.log("entra a create")
		let totescartes = ['co', 'co', 'cb', 'cb', 'sb', 'sb', 'so', 'so', 'tb', 'tb', 'to', 'to'];
		this.cameras.main.setBackgroundColor(0xBFbCFF);
		var json = localStorage.getItem("numCartes") || '{"numCartes":2}';
		var options_data = JSON.parse(json);
		var cuantosPares = options_data.numCartes;
		var dificultat = options_data.dificulty;
		var arraycards = totescartes.slice(0, cuantosPares * 2)
		var espaciadoX = cuantosPares/2 * 96;
		var espaciadoY = cuantosPares/2 * 128;
		if (cuantosPares > 5){
			var files = 3
			var columnes = 4
		}
		else{ 
			var files = 2
		  	var columnes = cuantosPares
		}

		var quin = 0;

		arraycards.sort((a, b) => 0.5 - Math.random());

		for (let iterador = 0; iterador < columnes; iterador++){
			for (let j = 0; j < files; j++){

				this.add.image(iterador*125 + this.cameras.main.centerX - espaciadoX, j*150 + this.cameras.main.centerY - espaciadoY/2, arraycards[quin]);
				quin += 1;	
			}
		}

		this.cards = this.physics.add.staticGroup();

		for (let iterador1 = 0; iterador1 < columnes; iterador1++){
			for (let j = 0; j < files; j++){
				this.cards.create(iterador1*125 + this.cameras.main.centerX - espaciadoX, j*150 + this.cameras.main.centerY - espaciadoY/2, 'back');
			}
		}

		let i = 0;

		this.cards.children.iterate((card)=>{
			card.card_id = arraycards[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						this.score -= puntuacioPerd;
						this.firstClick.enableBody(false, 0, 0, true, true);

						card.enableBody(false, 0, 0, true, true);

						if (this.score <= 0){
							alert("Game Over");
							loadpage("../");
						}
					}
					else{
						this.correct++;
						if (this.correct >= cuantosPares){
							if (cuantosPares < 6) cuantosPares++;
							else{
								puntuacioPerd += 10;
							}
						}
						else{	
							numCartes.numCartes = this.cuantosPares;
							numCartes.puntuacio = this.puntuacioPerd;
							save();
						}
					this.firstClick = null;
				}
				else{
					console.log(card);
					this.firstClick = card;
				}
			}, card);
		});
	}
	
//	update (){	}
}

