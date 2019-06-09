import axios from "axios";

export default {

    //Find pages total
    pageTotal: function() {
        return axios.get(`https://api.scryfall.com/cards/search?unique=cards&order=set&page=1&q=*`)
    },

    // Gets all cards
    getCards: function(pageNum) {
        return axios.get(`https://api.scryfall.com/cards/search?unique=cards&order=set&page=${pageNum}&q=*`)
    }

}


