import db from "./db.js"

export const resolvers = {
    Query: {
        games() {
            return db.games
        },
        authors() {
            return db.authors
        },
        reviews() {
            return db.reviews
        },
        game(_, args) {
            return db.games.find(game => game.id === args.id)
        },
        author(_, args) {
            return db.authors.find(author => author.id === args.id)
        },
        review(_, args) {
            return db.reviews.find(review => review.id === args.id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter(review => review.game_id === parent.id)
        }
    },
    Review: {
        game(parent) {
            return db.games.find(game => game.id === parent.id)
        },
        author(parent) {
            return db.authors.find(author => author.id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter(review => review.id === parent.id)
        }
    },
    Mutation: {
        addGame(_, args) {
            const game = { 
                ...args.game, 
                id: Math.floor(Math.random() * 100).toString()
            }
            db.games.push(game)
            return game
        },
        updateGame(_, args) {
            db.games = db.games.map(game => {
                if (game.id === args.id) {
                    return { ...game, ...args.input }
                }
                return game
            })
            
            return db.games.find(game => game.id === args.id)
        },
        deleteGame(_, args) {
            db.games = db.games.filter(game => game.id !== args.id)
            return db.games
        }
    }

}