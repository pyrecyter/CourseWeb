const express = require('express');
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const router = express.Router();

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const Student = require('../../models/Student');

//@route  POST api/post
//@desc   Create post
//@acces  Private

router.post('/',[auth, [
    check('text','Text is Required')
    .not()
    .isEmpty()

    ]
],
async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const student = await Student.findById(req.student.id).select('-password');

     const newPost = new Post({
         text: req.body.text,
         name : student.name,
         avatar: student.avatar,
         student: req.student.id
     })
     const post  = await newPost.save();

     res.json(post);  
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
});
//@route  GET api/post
//@desc   get post
//@acces  Private

router.get('/',auth, async (req, res) =>{
    try {
        const posts = await Post.find().sort({date: -1});
        res.json(posts);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');       
    }
});


//@route  Post api/post/:id
//@desc   get post by id 
//@acces  Private

router.get('/:id',auth, async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post){
            return res.status(404).json({msg : ' No Post '  });
        }
        res.json(post);
        
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId'){
            return res.status(404).json({msg : ' No Post '  });
        }
        res.status(500).send('Server Error');       
    }
});
//@route  DELETE api/post/:id
//@desc   delete post
//@acces  Private

router.delete('/:id',auth, async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);

        if (!post){
            return res.status(404).json({msg : ' No Post '  });
        }

        //checking user 
        if(post.student.toString() !== req.student.id){
            return res.status(404).json({ msg:'Not Authorized'});

        }

        await post.remove();


        res.json({msg : 'Post Removed Succesfull!'});
        
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId'){
            return res.status(404).json({msg : ' No Post '  });
        }
        res.status(500).send('Server Error');       
    }
});
//@route  PUT api/post/like/:id
//@desc   likw post
//@acces  Private

router.put('/like/:id',auth,async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        //checking if the user like the post before 

        if(post.likes.filter(like => like.student.toString()  === req.student.id).length > 0){
            return res.status(400).json({ msg:'You have liked this Post already !'});
        }
        post.likes.unshift({student: req.student.id});
        //saving to database
        await post.save();

        res.json(post.likes);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
//@route  DELETE api/post/unlike/:id
//@desc   delete like
//@acces  Private

router.put('/unlike/:id',auth,async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        //checking if the user like the post before 

        if(post.likes.filter(like => like.student.toString()  === req.student.id).length == 0){
            return res.status(400).json({ msg:'You Havent like this Post !'});
        }
        //get removed index 
        const removeIndex =post.likes.map(like => like.student.toString()).indexOf(req.student.id);

        post.likes.splice(removeIndex, 1 );

        //saving to database
        await post.save();

        res.json(post.likes);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//Adding comment 

//@route  POST api/post/comment/:id
//@desc   Comment on post
//@acces  Private

router.post('/comment/:id',[auth, [
    check('text','Text is Required')
    .not()
    .isEmpty()

    ]
],
async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const student = await Student.findById(req.student.id).select('-password');
        const  post = await Post.findById(req.params.id);
     
        const newComment = {
         text: req.body.text,
         name : student.name,
         avatar: student.avatar,
         student: req.student.id
     }
     post.comments.unshift(newComment);
     await post.save();

     res.json(post.comments);  
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
});

//@route  DELETE api/post/comment/:id/:comment_id
//@desc   Delete comment 
//@acces  Private

router.delete('/comment/:id/:comment_id',auth,async(req,res) =>{
    try {
        const  post = await Post.findById(req.params.id);

        //pull comments 
        const comment = post.comments.find( comment => comment.id === req.params.comment_id);

        //checking if comment is there 
        if(!comment){
            return res.status(404).json({msg: 'Comment not there'});
        }

        //check user 
        if(comment.student.toString() !== req.student.id){
            return res.status(401).json({msg:'User not authorized'});

        }
        const removeIndex =post.comments.map(comment => comment.student.toString()).indexOf(req.student.id);

        post.comments.splice(removeIndex, 1 );

        //saving to database
        await post.save();

        res.json(post.comments);

        
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
});



module.exports = router;