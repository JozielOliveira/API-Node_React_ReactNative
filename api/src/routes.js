const router = require('express').Router()

const TweetController = require('./controllers/TweetController')
const LinkeController = require('./controllers/LikeController')

router.get('/', (req,res) => {
    res.send("Hello world")
})

router.get('/tweet', TweetController.index)
router.post('/tweet', TweetController.store)


router.post('/like/:id', LinkeController.store)

module.exports = router