import * as mongoose from 'mongoose';

enum cardType{
    SPY, CITIZEN, ASSASIN
}

interface ICard {
	word: string;
    type: cardType;
    isExposed: boolean;
    positionOnBoard: Number;
}

const CardSchema = new mongoose.Schema({
    word: {type: String, required: true},
    type: {type: String, enum: ['SPY', 'CITIZEN', 'ASSASIN'], required: true},
    isExposed: {type: Boolean, required: true},
    positionOnBoard: {type: Number, required: true}
});

const cardModel = mongoose.model('Card', CardSchema);

export { cardModel, ICard, cardType, CardSchema }